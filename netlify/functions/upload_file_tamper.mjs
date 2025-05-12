import 'dotenv/config'
import { Web3 } from 'web3'
import { TamperProofABI } from '../../globals'

exports.handler = async (event) => {
    const jsonBody = JSON.parse(event.body)
    const { fileHash } = jsonBody
    
    // TODO: file tamper verification code
    try {
        const CONTRACT_ADDRESS = process.env.CONTRACT_TAMPER_PROOF
        const contractOwnerKey = process.env.CONTRACT_OWNER_ACCOUNT
        const web3 = new Web3(process.env.INFURA_RPC_URL)

        const wallet = await web3.eth.accounts.decrypt(contractOwnerKey, "gom123#")
        const contract = new web3.eth.Contract(TamperProofABI, CONTRACT_ADDRESS);

        const fees = await web3.eth.calculateFeeData()
        
        const tx = {
            from: wallet.address,
            to: CONTRACT_ADDRESS,
            maxFeePerGas: fees.maxFeePerGas * 3,
            maxPriorityFeePerGas: fees.maxPriorityFeePerGas * 3,
            data: contract.methods.uploadFileHash(fileHash).encodeABI()
        }

        const signtx = await web3.eth.accounts.signTransaction(tx, wallet.privateKey)
        
        console.log("signed a transaction")
        
        await web3.eth.sendSignedTransaction(signtx.rawTransaction)
    
        console.log("successfully sent signed transaction?")

        return {
            statusCode: 200,
            body: JSON.stringify({
                is_success: true,
                payload: "successfully uploaded to blockchain"
            })
        }
    } catch (e) {
        console.log(e)
        return {
            statusCode: 200,
            body: JSON.stringify({
                is_success: false,
                payload: "error has occurred"
            })
        }
    }
    // TODO: file tamper verification code end
}