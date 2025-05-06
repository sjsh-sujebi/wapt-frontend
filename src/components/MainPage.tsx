import React from "react"
import "../styles/MainPage.css"

export default function MainPage() {
    let printer = "/printer"
    let user = "/login"

    // TODO: just for free version
    const poop = localStorage.getItem("poop")
    if (!poop) {
        localStorage.setItem("poop", "💩")
        localStorage.setItem("studentHash", "0x20115e200f8a438ea21c2efc76035655623c2d8d3a83f6cfc5f9334ca37e50bd")
    }

    const hash = localStorage.getItem("studentHash")
    if (hash) {
        user = "/user"
    }

    return (
        <div className="mp_container">
            <div className="mp_start_page_wrapper">
                <div className="mp_title_card">
                    <h1 className="mp_title upfont">
                        WFT
                    </h1>
                    <div className="mdownfont mp_title_desc">프린터를 위한 <span className="upfont">USB</span> 없는 파일 전송 서비스</div>
                </div>
                <div className="mp_button_group">
                    <div className="mp_action_btn_group">
                        <button className="mp_get_started_btn" onClick={() => window.location.href = printer}>프린터에서 다운받기</button>
                        <button className="mp_get_started_btn" onClick={() => window.location.href = user}>내 컴퓨터에서 업로드하기</button>
                    </div>
                    <button className="mp_get_started_reverse_btn" onClick={() => window.location.href = "/sujebi"}><span className="upfont">SUJEBI</span> 기술에 대해 알아보기</button>
                </div>
            </div>
        </div>
    )
}