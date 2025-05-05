require("dotenv").config()
const { ABI } = require("../../globals.js")
const { Web3 } = require('web3')

const isBytes32 = (str) => {
    return /^0x[a-fA-F0-9]{64}$/.test(str);
};

exports.handler = async (event) => {
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
    const contractOwnerKey = process.env.CONTRACT_OWNER_ACCOUNT
    const web3 = new Web3("http://localhost:8545")

    const wallet = await web3.eth.accounts.decrypt(contractOwnerKey, "gom123#")
    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    const jsonBody = JSON.parse(event.body)
    const { userHash } = jsonBody

    if (!isBytes32(userHash)) {
        return {
            statusCode: 500,
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
                    statusCode: 500,
                    body: JSON.stringify({
                        is_success: false,
                        payload: "Insufficient Token Balance"
                    })
                }
            } else {
                await contract.methods.useToken(userHash).send({ from : wallet.address })
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
                statusCode: 500,
                body: JSON.stringify({
                    is_success: false,
                    payload: "No Such User"
                })
            }
        }
    }
}