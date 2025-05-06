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
    const { userHash } = jsonBody

    const getTokenBalance = async () => {
        return await contract.methods.getTokenBalance(userHash).call({ from : wallet.address })
    }

    if (!isBytes32(userHash)) {
        console.log("ea")
        return {
            statusCode: 200,
            body: JSON.stringify({
                is_success: false,
                payload: "Invalid Hash Format"
            })
        }
    } else {
        if (await contract.methods.verifyStudent(userHash).call({ from : wallet.address})) {
            const tokenCount = await getTokenBalance()
            return {
                statusCode: 200,
                body: JSON.stringify({
                    is_success: true,
                    payload: {
                        numTokens: tokenCount.toString()
                    }
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