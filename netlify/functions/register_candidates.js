const { db } = require("../../globals.js")
const { ref, onValue, set } = require("firebase/database")

exports.handler = async (event) => {
    const messageRef = ref(db, "/register_candidates")

    const jsonBody = JSON.parse(event.body)

    const { adminHash } = jsonBody

    if (adminHash != process.env.ADMIN_HASH) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                is_success: false,
                payload: "Only admins are allowed to run this function"
            })
        }
    }

    const candidates = await new Promise((resolve, reject) => {
        onValue(messageRef, snapshot => {
            const candidates = snapshot.val()

            resolve(candidates ?? {})
        })
    })

    return {
        statusCode: 200,
        body: JSON.stringify({
            is_success: true,
            payload: {
                candidates: candidates ?? {}
            }
        })
    }
}