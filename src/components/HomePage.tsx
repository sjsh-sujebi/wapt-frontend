import React, { useEffect, useState } from "react"
import "../styles/HomePage.css"
import axios from "axios"

type Compliment = {
    from: string,
    message: string,
    timestamp: string
}

function logout() {
    localStorage.removeItem("studentHash")
    window.location.href = "/"
}

function approveStudent(adminHash: string, studentData: any) {
    const dataUUID = studentData["uuid"]
    delete studentData["uuid"]
    axios.post("/.netlify/functions/register_admin", JSON.stringify({
        adminHash,
        studentData,
        dataUUID
    }), {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(data => {
        const response = data.data as APIResponse

        if (response.is_success) {
            alert("success!")
        } else {
            alert("failed!")
        }
    })
}

export default function HomePage() {
    const [isAdmin, setIsAdmin] = useState(false)
    const [candidates, setCandidates] = useState<any[]>([])

    const hash = localStorage.getItem("studentHash")

    useEffect(() => {
        if (!hash) {
            localStorage.removeItem("studentHash")
            window.location.href = "/"
            return
        }
    }, [])

    useEffect(() => {
        axios.post('/.netlify/functions/is_admin', JSON.stringify({ adminHash: hash }), {
            headers: {
                "Content-Type": 'application/json'
            }
        }).then(ia_data => {
            const ia_response = ia_data.data as APIResponse

            if (ia_response.is_success) {
                setIsAdmin(true)

                axios.post("/.netlify/functions/register_candidates", JSON.stringify({ adminHash: hash }), {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(rc_data => {
                    const rc_response = rc_data.data as APIResponse

                    if (rc_response.is_success) {
                        let candidates_obj = []
                        for (let [key, e] of Object.entries(rc_response.payload.candidates)) {
                            (e as any)["uuid"] = key
                            candidates_obj.push(e)
                        }
                        setCandidates(candidates_obj)
                    } else {
                        alert("Something went wrong")
                    }
                })
            }
        })
    }, [])
    
    return (
        <div className="hp_container">
            <h1><span className="mdownfont">나의</span> <span className="upfont">SuJeBI QR Code</span></h1>
            <img width={200} height={200} src={`https://api.qrserver.com/v1/create-qr-code/?size=300X300&data=${encodeURIComponent(hash!!)}`} alt="" />
            <button className="hp_logout" onClick={logout}>로그아웃</button>

            <h1 className="mdownfont">남은 토큰</h1>

            {(() => {
                if (isAdmin) {
                    return candidates.map(e => (
                        <div>
                            <img src={e.base64Image} width="400" />
                            <div>{e.gradeNumber}학년 {e.classNumber}반 {e.studentNumber}번</div>
                            <button onClick={() => { approveStudent(hash!!, e) }}>승인</button>
                        </div>
                    ))
                }
            })()}
        </div>
    )
}