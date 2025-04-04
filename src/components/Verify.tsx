import React, { useState } from "react"
import "../styles/Verify.css"
import QrScanner from "qr-scanner";
import axios from "axios";

function startQR(setQR: (qr: number) => void, setStudentHash: (studentHash: string) => void) {
    setQR(1)

    const video = document.getElementById('video') as HTMLVideoElement

    const qrScanner = new QrScanner(video, (decodedText) => {
        axios.post("http://188.166.215.158:8080/verify", JSON.stringify({ hash: decodedText }), {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            const split = (res.data as string).split("ok:") 
            if ((res.data as string).startsWith("ok:") && split[1] == 'true') {
               setStudentHash(split[2])
               setQR(2)
            } else {
                alert("something went wrong")
            }
        })

        qrScanner.stop()
    })

    qrScanner.start()
}

function submitCompliment(hash: string, myHash: string) {
    const value = (document.querySelector('.vf_new_input') as HTMLInputElement).value

    axios.post("http://188.166.215.158:8080/createCompliment", JSON.stringify({ value, hash, myHash }), {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        alert("success!")
        // todo: check whether success
    })
}

export default function HomePage() {
    const [qr, setQR] = useState(0)
    const [studentHash, setStudentHash] = useState("")

    const myHash = localStorage.getItem("studentHash")
    
    return (
        <div className="vf_container">
            <h1>SuJeBI 인증하기</h1>
            <button className="vf_qr" onClick={() => startQR(setQR, setStudentHash)}>QR 코드 촬영</button>

            <video id="video" width="300" height="200" style={qr ? {display: "block"} : {display: "none"}}></video>

            {qr == 2 && myHash ? 
            <div className="vf_new_input_card">
                <input type="text" className="vf_new_input" />
                <button className="vf_submit" onClick={() => submitCompliment(studentHash, myHash)}>칭찬하기</button>
            </div>
            : ""}
        </div>
    )
}