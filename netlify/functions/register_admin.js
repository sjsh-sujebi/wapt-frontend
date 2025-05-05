require("dotenv").config()
const { ABI } = require("../../globals.js")
const { Web3 } = require('web3')

exports.handler = async (event) => {
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
    const contractOwnerKey = process.env.CONTRACT_OWNER_ACCOUNT
    const web3 = new Web3(process.env.INFURA_RPC_URL)

    const wallet = await web3.eth.accounts.decrypt(contractOwnerKey, "gom123#")
    const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    const uploadStudent = async (userHash, signature) => {
        const block = await web3.eth.getBlock();
    
        const tx = {
            from: wallet.address,
            to: CONTRACT_ADDRESS,
            maxFeePerGas: block.baseFeePerGas * 2n,
            maxPriorityFeePerGas: 100000,
            data: contract.methods.uploadStudent(userHash, signature.v, signature.r, signature.s).encodeABI()
        }
    
    
        const signtx = await web3.eth.accounts.signTransaction(tx, wallet.privateKey)
    
        return await web3.eth.sendSignedTransaction(signtx.rawTransaction)
    }

    const jsonBody = JSON.parse(event.body)
    const { adminHash, studentData } = jsonBody

    if (adminHash != process.env.ADMIN_HASH) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                is_success: false,
                payload: "Only admins can run this function"
            })
        }
    }

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

    await uploadStudent(userHash, signature)

    const searchRef = ref(db, `/registered_users/${studentData.gradeNumber}/${studentData.classNumber}/${studentData.studentNumber}`)
    set(searchRef, "is_user")
    
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