import "dotenv/config"
import { ABI } from "../../globals.js"
import { Web3 } from 'web3'

exports.handler = async (event) => {
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
    const contractOwnerKey = process.env.CONTRACT_OWNER_ACCOUNT
    const web3 = new Web3(process.env.INFURA_RPC_URL)

    const wallet = await web3.eth.accounts.decrypt(contractOwnerKey, "gom123#")
    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    const jsonBody = JSON.parse(event.body)
    const studentData = jsonBody

    const { keyword1, keyword2, keyword3, gradeNumber, classNumber, studentNumber } = studentData
    const data = { keyword1, keyword2, keyword3, gradeNumber, classNumber, studentNumber }

    console.log(JSON.stringify(data))

    const userHash = web3.utils.sha3(JSON.stringify(data));

    if (await contract.methods.verifyStudent(userHash).call({ from : wallet.address })) {
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

    return {
        statusCode: 200,
        body: JSON.stringify({
            is_success: false,
            payload: "Failed"
        })
    }
}