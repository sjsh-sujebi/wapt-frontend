import { Web3 } from "web3"
import { TamperProofABI } from "../../globals"

exports.handler = async (event) => {
    const CONTRACT_ADDRESS = process.env.CONTRACT_TAMPER_PROOF
    const contractOwnerKey = process.env.CONTRACT_OWNER_ACCOUNT
    const web3 = new Web3(process.env.INFURA_RPC_URL)

    const wallet = await web3.eth.accounts.decrypt(contractOwnerKey, "gom123#")
    const contract = new web3.eth.Contract(TamperProofABI, CONTRACT_ADDRESS);

    const jsonBody = JSON.parse(event.body)
    const { base64File, code } = jsonBody

    const toHash = `${code}/tralarelotralala/${base64File}`

    const fileHash = web3.utils.sha3(toHash)

    if (await contract.methods.verifyFileHash(fileHash).call({ from : wallet.address })) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                is_success: true,
                payload: "File not tampered"
            })
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            is_success: false,
            payload: "File has been tampered or not registered"
        })
    }
}