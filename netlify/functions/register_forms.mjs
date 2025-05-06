import { getDB } from "../../globals.js"
import { ref, onValue, set } from "firebase/database"
import { v4 as uuidv4 } from "uuid"

exports.handler = async (event) => {
    const db = getDB()
    const jsonBody = JSON.parse(event.body)

    const studentData = jsonBody

    const userAlreadyExists = await new Promise((resolve, reject) => {
        const searchRef = ref(db, `${process.env.SECRET_FIREBASE_KEY}/registered_users/${studentData.gradeNumber}/${studentData.classNumber}/${studentData.studentNumber}`)
        onValue(searchRef, snapshot => {
            if (snapshot.val() != null) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })

    if (userAlreadyExists) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                is_success: false,
                payload: "User Already Exists"
            })
        }
    }

    await new Promise((resolve, reject) => {
        const uuid = uuidv4()
        const messageRef = ref(db, `${process.env.SECRET_FIREBASE_KEY}/register_candidates/${uuid}`)

        set(messageRef, studentData).then(() => {    
            resolve(studentData)
        })
    })

    await new Promise((resolve, reject) => {
        const searchRef = ref(db, `${process.env.SECRET_FIREBASE_KEY}/registered_users/${studentData.gradeNumber}/${studentData.classNumber}/${studentData.studentNumber}`)
        set(searchRef, "will_be_user").then(() => {
            resolve()
        })
    })

    return {
        statusCode: 200,
        body: JSON.stringify({
            is_success: true,
            payload: {
                studentData
            }
        })
    }
}