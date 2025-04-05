import React, { useState } from "react"
import "../styles/Verify.css"
import QrScanner from "qr-scanner";
import axios from "axios";
import ProcessingCompliment from "./ProcessingCompliment";

function startQR(setStatus: (status: number) => void, setStudentHash: (studentHash: string) => void, setSuccess: (successMsg: string) => void) {
    setStatus(1)

    const video = document.getElementById('video') as HTMLVideoElement

    const qrScanner = new QrScanner(video, (decodedText) => {
        axios.post("https://api.sujebi.tech:8443/verify", JSON.stringify({ hash: decodedText }), {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            const response = (res.data as APIResponse) 
            if (response.is_success) {
                setStudentHash(response.payload["hash"] as string)
                setStatus(2)
                setSuccess("신원 확인이 완료되었습니다.");
                (document.querySelector(".vf_qr") as HTMLButtonElement).style.display = "none"
            } else {
                alert("존재하지 않는 사용자입니다.")
            }
        })

        qrScanner.stop()
    })

    qrScanner.start()
}

export default function HomePage() {
    const [status, setStatus] = useState(0)
    const [studentHash, setStudentHash] = useState("")
    const [success, setSuccess] = useState("")

    const myHash = localStorage.getItem("studentHash")

    if (!myHash) {
        alert("로그인이 필요한 서비스입니다")
        window.location.href = "/"
    }
    
    const default_return = (
        <div className="vf_container">
            <h1>SuJeBI로 친구 칭찬하기</h1>
            <button className="vf_qr" onClick={() => startQR(setStatus, setStudentHash, setSuccess)}>칭찬 받을 친구의 QR 코드 촬영</button>

            <video id="video" className="vf_video" style={status == 1 ? {display: "block"} : {display: "none"}}></video>

            { success ? <div className="vf_success">{success}</div> : null }

            {status == 2 && myHash ? 
            <div className="vf_new_input_card">
                <input type="text" className="vf_new_input" placeholder="예) 체육시간에 넘어졌을 때 같이 보건실에 가준 민수를 칭찬합니다." />
                <button className="vf_submit" onClick={() => setStatus(3)}>칭찬하기</button>
            </div>
            : ""}
        </div>
    )

    if (status == 3) {
        const value = (document.querySelector('.vf_new_input') as HTMLInputElement).value
        return <ProcessingCompliment msg={value} hashTo={studentHash} />
    }

    return default_return
}