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
            
            return { from: c.from, message: c.message, timestamp: date }
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
            <h1>나의 SuJeBI QR Code</h1>
            <img width={200} height={200} src={`https://api.qrserver.com/v1/create-qr-code/?size=300X300&data=${encodeURIComponent(hash!!)}`} alt="" />
            <button className="hp_logout" onClick={logout}>로그아웃</button>

            <h1>나의 칭찬 리스트</h1>
            { compliments.map(c => 
                <div className="hp_compliment_card">
                    <h2 className="hp_compliment_title">From: {c.from}</h2>
                    <p className="hp_compliment_timestamp">{c.timestamp}</p>
                    <p className="hp_compliment_msg">{c.message}</p>
                </div>)
            }
        </div>
    )
}