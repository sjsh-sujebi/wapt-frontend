import { getStore } from '@netlify/blobs'
import { v4 as uuidv4 } from 'uuid'
import { Web3 } from 'web3'
import { TamperProofABI } from '../../globals';

async function blobToBase64(blob) {
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer.toString('base64');
}

exports.handler = async (event) => {
    const CONTRACT_ADDRESS = process.env.CONTRACT_TAMPER_PROOF
    const contractOwnerKey = process.env.CONTRACT_OWNER_ACCOUNT
    const web3 = new Web3(process.env.INFURA_RPC_URL)

    const wallet = await web3.eth.accounts.decrypt(contractOwnerKey, "gom123#")
    const contract = new web3.eth.Contract(TamperProofABI, CONTRACT_ADDRESS);

    const store = await getStore({ name: "uploads", siteID: process.env.siteID, token: process.env.TOKEN })
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const jsonBody = JSON.parse(event.body)
    const { fileName, contentType, base64File, code } = jsonBody

    // TODO: file tamper verification code
    try {
        const toHash = `${code}/tralarelotralala/${base64File}`

        const fileHash = web3.utils.sha3(toHash)

        const feeData = await web3.eth.calculateFeeData()
        
        const tx = {
            from: wallet.address,
            to: CONTRACT_ADDRESS,
            maxFeePerGas: feeData.maxFeePerGas,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
            data: contract.methods.uploadFileHash(fileHash).encodeABI()
        }

        const signtx = await web3.eth.accounts.signTransaction(tx, wallet.privateKey)
        
        console.log("signed a transaction")
        
        await web3.eth.sendSignedTransaction(signtx.rawTransaction)
    
        console.log("successfully sent signed transaction?")
    } catch (e) {
        console.log(e)
    }
    // TODO: file tamper verification code end
    
    const fileBuffer = Buffer.from(base64File, 'base64'); // Lambda sends body as base64
    const blobId = uuidv4()
    
    try {
        await store.set(blobId, fileBuffer, {
            metadata: { contentType, fileName },
        });

        const { data, metadata } = await store.getWithMetadata(blobId, { type: 'blob' })
    
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                is_success: true,
                payload: {
                    blobId,
                    base64Data: await blobToBase64(data),
                    contentType: metadata.contentType || 'application/octet-stream',
                    fileName: metadata.fileName || fileName,
                }
            }),
        };
    } catch (err) {
        console.log(err)
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                is_success: false,
                payload: "something went wrong"
            }),
        };
    }
};