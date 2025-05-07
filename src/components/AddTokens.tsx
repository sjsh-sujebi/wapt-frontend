import React, { useEffect, useState } from "react"
import "../styles/AddTokens.css"
import QrScanner from "qr-scanner";
import axios from "axios";

function startQR(setStatus: (status: number) => void, setStudentHash: (studentHash: string) => void, setSuccess: (successMsg: string) => void) {
    setStatus(1)

    const video = document.getElementById('video') as HTMLVideoElement

    const qrScanner = new QrScanner(video, (decodedText) => {
        axios.post("/.netlify/functions/verify_student", JSON.stringify({ userHash: decodedText }), {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            const response = (res.data as APIResponse) 
            if (response.is_success) {
                setStudentHash(response.payload["hash"] as string)
                setStatus(2)
                setSuccess("신원 확인이 완료되었습니다.");
                (document.querySelector(".at_qr") as HTMLButtonElement).style.display = "none"
            } else {
                alert("존재하지 않는 사용자입니다.")
            }
        })

        qrScanner.stop()
    })

    qrScanner.start()
}

export default function AddTokens() {
    const [status, setStatus] = useState(0)
    const [studentHash, setStudentHash] = useState("")
    const [success, setSuccess] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const [valueS, setValueS] = useState(0)

    const saveValue = () => {
        const value = parseInt((document.querySelector('.at_new_input') as HTMLInputElement).value)
        if (isNaN(value)) {
            setStatus(2)
        }

        setValueS(value)
        setStatus(3)
    }

    const myHash = localStorage.getItem("studentHash")

    useEffect(() => {
        axios.post('/.netlify/functions/is_admin', JSON.stringify({ adminHash: myHash }), {
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(ia_data => {
            const ia_response = ia_data.data as APIResponse
    
            if (ia_response.is_success) {
                setIsAdmin(true)
            }
        })
    }, [])
    
    const default_return = (
        <div className="at_container">
            <h1 className="at_title"><span className="upfont">SuJeBI</span>로 친구 칭찬하기</h1>
            <button className="at_qr" onClick={() => startQR(setStatus, setStudentHash, setSuccess)}>칭찬 받을 친구의 QR 코드 촬영</button>

            <video id="video" className="at_video" style={status == 1 ? {display: "block"} : {display: "none"}}></video>

            { success ? <div className="at_success">{success}</div> : null }

            {status == 2 && myHash ? 
            <div className="at_new_input_card">
                <input type="text" className="at_new_input" placeholder="100" />
                <button className="at_submit" onClick={() => saveValue()}>토큰 충전하기</button>
            </div>
            : ""}
        </div>
    )

    useEffect(() => {
        if (status == 3) {
            if (!isAdmin) {
                alert("관리자만 이 함수를 실행할 수 있습니다!")
                return
            }

            axios.post("/.netlify/functions/charge_token", JSON.stringify({
                userHash: studentHash,
                tokenCount: valueS
            }), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(data => {
                const response = data.data as APIResponse
                
                if (response.is_success) {
                    alert("충전 완료!")
                } else {
                    alert("충전 과정에 오류가 발생했습니다.")
                }
            })
            
        }
    }, [status])

    return default_return
}