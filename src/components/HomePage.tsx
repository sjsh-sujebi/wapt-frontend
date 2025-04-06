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

function getCompliments(setCompliments: (compliments: Compliment[]) => void, hash: string) {
    axios.post("https://api.sujebi.tech:8443/getCompliments", JSON.stringify({ hash }), {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        setCompliments(((res.data as APIResponse).payload.msg.compliments as Compliment[]).map(c => {
            const myDate = new Date(parseInt(c.timestamp))
            const date = myDate.getFullYear() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getDate() + " " + myDate.getHours() + "시 " + myDate.getMinutes() + "분";
            
            return { from: c.from.slice(0, 8), message: c.message, timestamp: date }
        }).reverse())
    })
}

export default function HomePage() {
    const [compliments, setCompliments] = useState<Compliment[]>([])

    const hash = localStorage.getItem("studentHash")

    useEffect(() => {
        if (!hash) {
            localStorage.removeItem("studentHash")
            window.location.href = "/"
            return
        }

        getCompliments(setCompliments, hash)
    }, [])
    
    return (
        <div className="hp_container">
            <h1><span className="mdownfont">나의</span> <span className="upfont">SuJeBI QR Code</span></h1>
            <img width={200} height={200} src={`https://api.qrserver.com/v1/create-qr-code/?size=300X300&data=${encodeURIComponent(hash!!)}`} alt="" />
            <button className="hp_logout" onClick={logout}>로그아웃</button>

            <h1 className="mdownfont">나의 칭찬 리스트</h1>
            { compliments.map(c => 
                <div className="hp_compliment_card">
                    <p className="hp_compliment_title">발행자: <span className="mdownfont">{c.from}</span></p>
                    <p className="hp_compliment_timestamp">발행 시각: <span className="sdownfont">{c.timestamp}</span></p>
                    <p className="hp_compliment_msg">칭찬 내용: <span className="sdownfont">{c.message}</span></p>
                </div>)
            }
        </div>
    )
}