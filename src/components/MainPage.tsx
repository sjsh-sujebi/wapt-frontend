import React from "react"
import "../styles/MainPage.css"

export default function MainPage() {
    let whereToGo = "/register"

    const hash = localStorage.getItem("studentHash")
    if (hash) {
        whereToGo = "/mypage"
    }

    return (
        <div className="mp_container">
            <div className="mp_start_page_wrapper">
                <div className="mp_title_card">
                    <h1>
                        SeJong Blockchain Identification
                    </h1>
                    <div className="sdownfont">세종과학고등학교 재학생 인증 서비스</div>
                </div>
                <div className="mp_button_group">
                    <button className="mp_get_help_btn" onClick={() => window.location.href = "/usage"}>수제비 사용법 익히기</button>
                    <button className="mp_get_started_btn" onClick={() => window.location.href = whereToGo}>블록체인 인증 시작하기</button>
                </div>
            </div>
        </div>
    )
}