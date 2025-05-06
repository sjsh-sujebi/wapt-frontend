import "dotenv/config"
import { ABI } from "../../globals.js"
import { Web3 } from 'web3'

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
    const { userHash, tokenCount } = jsonBody

    if (userHash != process.env.ADMIN_HASH) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                is_success: false,
                payload: "Only admins can run this function"
            })
        }
    }

    const addTokens = async () => {
        const block = await web3.eth.getBlock();
    
        const tx = {
            from: wallet.address,
            to: CONTRACT_ADDRESS,
            maxFeePerGas: block.baseFeePerGas * 2n,
            maxPriorityFeePerGas: 100000,
            data: contract.methods.addTokens(userHash, tokenCount).encodeABI()
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
            await addTokens()

            return {
                statusCode: 200,
                body: JSON.stringify({
                    is_success: true,
                    payload: "Successfully added tokens"
                })
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