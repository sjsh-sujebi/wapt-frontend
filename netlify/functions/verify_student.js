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
            return {
                statusCode: 200,
                body: JSON.stringify({
                    is_success: true,
                    payload: "Success!"
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