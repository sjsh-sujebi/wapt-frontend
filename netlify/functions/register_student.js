require("dotenv").config()
const { ABI } = require("../../globals.js")
const { Web3 } = require('web3')

exports.handler = async (event) => {
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
    const contractOwnerKey = process.env.CONTRACT_OWNER_ACCOUNT
    const web3 = new Web3("http://127.0.0.1:8545")

    const wallet = await web3.eth.accounts.decrypt(contractOwnerKey, "gom123#")
    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    const jsonBody = JSON.parse(event.body)
    const { studentData } = jsonBody

    const userHash = web3.utils.sha3(studentData);
    const signature = await web3.eth.accounts.sign(userHash, wallet.privateKey)

    if (await contract.methods.verifyStudent(userHash).call({ from : wallet.address})) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                is_success: false,
                payload: "User already exists"
            })
        }
    }

    await contract.methods.uploadStudent(userHash, signature.v, signature.r, signature.s).send({ from : wallet.address })
        
    return {
        statusCode: 200,
        body: JSON.stringify({
            is_success: true,
            payload: {
                userHash
            }
        })
    }
}