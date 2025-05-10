import "dotenv/config"
import { getDB } from "../../globals"
import { onValue, ref, remove } from "firebase/database"

exports.handler = async (event) => {
    const db = getDB()

    const jsonBody = JSON.parse(event.body)

    const { code } = jsonBody

    const messageRef = ref(db, `/uuids/${code}`)

    const uuid = await new Promise((resolve, reject) => {
        onValue(messageRef, snapshot => {
            resolve(snapshot)
        })
    })

    if (!uuid.exists()) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                is_success: false,
                payload: "Invalid Code"
            })
        }
    } else {
        await remove(messageRef)

        return {
            statusCode: 200,
            body: JSON.stringify({
                is_success: true,
                payload: {
                    uuid
                }
            })
        }
    }

}