import React, { useState } from "react"
import "../styles/HomePage.css"

function logout() {
    localStorage.removeItem("studentHash")
    window.location.href = "/"
}

export default function HomePage() {
    const hash = localStorage.getItem("studentHash")

    if (!hash) {
        localStorage.removeItem("studentHash")
        window.location.href = "/"
    }
    
    return (
        <div className="hp_container">
            <h1>SuJeBI QR Code</h1>
            <img width={200} height={200} src={`https://api.qrserver.com/v1/create-qr-code/?size=300X300&data=${encodeURIComponent(hash!!)}`} alt="" />
            <button className="hp_logout" onClick={logout}>로그아웃</button>
        </div>
    )
}