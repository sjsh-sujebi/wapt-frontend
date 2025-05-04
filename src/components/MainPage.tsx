import React from "react"
import "../styles/MainPage.css"

export default function MainPage() {
    let printer = "/printer"
    let user = "/register"

    const hash = localStorage.getItem("studentHash")
    if (hash) {
        user = "/user"
    }

    return (
        <div className="mp_container">
            <div className="mp_start_page_wrapper">
                <div className="mp_title_card">
                    <h1>
                        <span className="sdownfont">와파트</span>: Wireless File Transfer
                    </h1>
                    <div className="sdownfont">프린터를 위한 USB 없는 파일 전송 서비스</div>
                </div>
                <div className="mp_button_group">
                    <button className="mp_get_started_btn" onClick={() => window.location.href = printer}>프린터에서 다운받기</button>
                    <button className="mp_get_started_btn" onClick={() => window.location.href = user}>내 컴퓨터에서 업로드하기</button>
                </div>
            </div>
        </div>
    )
}