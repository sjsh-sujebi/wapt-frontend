import React, { useEffect, useState } from "react"
import "../styles/HomePage.css"
import axios from "axios"

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
        },
        timeout: 10000000000
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
    const [tokens, setTokens] = useState(-1)

    const hash = localStorage.getItem("studentHash")

    useEffect(() => {
        if (!hash) {
            localStorage.removeItem("studentHash")
            window.location.href = "/"
            return
        }
    }, [])

    useEffect(() => {
        axios.post("/.netlify/functions/get_token_balance", JSON.stringify({ userHash: hash }), {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(data => {
            const response = data.data as APIResponse
            setTokens(parseInt(response.payload.numTokens))
        })
    }, []);

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
            <h1 className="hp_qr_title"><span className="mdownfont">나의</span> <span className="upfont">SuJeBI QR Code</span></h1>
            <img width={200} height={200} src={`https://api.qrserver.com/v1/create-qr-code/?size=300X300&data=${encodeURIComponent(hash!!)}`} alt="" />
            <button className="hp_logout" onClick={logout}>로그아웃</button>

            <h1 className="mdownfont acc_info_title">계정 정보</h1>
            <div className="hp_acc_info_card">
                    <span className="hp_acc_info_element">토큰: <span><span className="upfont">{tokens == -1 ? <>&lt;<span className="mdownfont">불러오는 중</span>&gt;</> : tokens}</span>개</span></span>
                    <button onClick={() => alert("토큰 없이도 서비스 사용이 가능합니다!")}>충전하기</button>
            </div>

            {
                (() => {
                    if (isAdmin) {
                        return <h1 className="upfont hp_admin_panel_title">ADMIN PANEL</h1>
                    }
                })()
            }

            {(() => {
                if (isAdmin) {
                    return candidates.map(e => (
                        <div className="hp_admin_panel">
                            <img src={e.base64Image} width="100" />
                            <div className="hp_admin_panel_info_card">
                                <span className="hp_admin_panel_info_element"><span className="upfont">{e.gradeNumber}</span>기 <span className="upfont">1</span>학년 <span className="upfont">{e.classNumber}</span>반 <span className="upfont">{e.studentNumber}</span>번</span>
                                <button onClick={() => { approveStudent(hash!!, e) }}>승인</button>
                            </div>
                        </div>
                    ))
                }
            })()}
        </div>
    )
}