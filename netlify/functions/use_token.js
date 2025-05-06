require("dotenv").config()
const { ABI } = require("../../globals.js")
const { Web3 } = require('web3')

const isBytes32 = (str) => {
    return /^0x[a-fA-F0-9]{64}$/.test(str);
};

exports.handler = async (event) => {
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
    const contractOwnerKey = process.env.CONTRACT_OWNER_ACCOUNT
    const web3 = new Web3(process.env.INFURA_RPC_URL)

    const wallet = await web3.eth.accounts.decrypt(contractOwnerKey, "gom123#")
    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    const jsonBody = JSON.parse(event.body)
    const { userHash } = jsonBody

    const useToken = async (userHash) => {
        const block = await web3.eth.getBlock();
    
        const tx = {
            from: wallet.address,
            to: CONTRACT_ADDRESS,
            maxFeePerGas: block.baseFeePerGas * 2n,
            maxPriorityFeePerGas: 100000,
            data: contract.methods.useToken(userHash).encodeABI()
        }
    
        const signtx = await web3.eth.accounts.signTransaction(tx, wallet.privateKey)
    
        return await web3.eth.sendSignedTransaction(signtx.rawTransaction)
    }

    if (!isBytes32(userHash)) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                is_success: false,
                payload: "Invalid Hash Format"
            })
        }
    } else {
        if (await contract.methods.verifyStudent(userHash).call({ from : wallet.address})) {
            const tokenCount = await contract.methods.getTokenBalance(userHash).call({ from : wallet.address})
            if (tokenCount == 0) {
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        is_success: false,
                        payload: "Insufficient Token Balance"
                    })
                }
            } else {
                await useToken()

                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        is_success: true,
                        payload: {
                            numTokens: parseInt(tokenCount.toString()) - 1
                        }
                    })
                }
            }
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    is_success: false,
                    payload: "No Such User"
                })
            }
        }
    }
}