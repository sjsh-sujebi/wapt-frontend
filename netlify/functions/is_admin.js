require("dotenv").config()

exports.handler = async (event) => {
    const jsonBody = JSON.parse(event.body)

    const { adminHash } = jsonBody

    if (adminHash != process.env.ADMIN_HASH) {
        console.log(process.env.ADMIN_HASH)
        console.log(adminHash)
        return {
            statusCode: 500,
            body: JSON.stringify({
                is_success: false,
                payload: "Only admins are allowed to run this function"
            })
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            is_success: true,
            payload: "Success!"
        })
    }
}