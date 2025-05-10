import { getStore } from '@netlify/blobs'
import { v4 as uuidv4 } from 'uuid'
import { Web3 } from 'web3'
import { TamperProofABI } from '../../globals';

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

        console.log("eh?-")
        
        const block = await web3.eth.getBlock();
        
        console.log("eh?--")
        
        const tx = {
            from: wallet.address,
            to: CONTRACT_ADDRESS,
            maxFeePerGas: block.baseFeePerGas * 2n,
            maxPriorityFeePerGas: 1,
            data: contract.methods.uploadFileHash(fileHash).encodeABI()
        }

        console.log("eh?")
        
        const signtx = await web3.eth.accounts.signTransaction(tx, wallet.privateKey)
        
        console.log("eh??")
        
        await web3.eth.sendSignedTransaction(signtx.rawTransaction)
    
        console.log("eh??")
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
    
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                is_success: true,
                payload: {
                    blobId,
                    fileName
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