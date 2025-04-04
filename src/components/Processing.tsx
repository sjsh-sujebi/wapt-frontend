import React from "react"
import "../styles/Processing.css"

export default function Processing() {
    return (
        <div className="pr_container">
            <div className="pr_title_card">
                <h1>성공 😎</h1>
                <div>매일 밤 12시에 신원 확인 후 처리됩니다. 조금 있다 만나요!</div>
            </div>
            <div className="pr_status_text">
                <div>승인 대기</div>
                <div>블록체인에 업로드중</div>
                <div>처리 완료</div>
            </div>
            <div className="pr_status_bar">
                <span className="pr_done"></span>
                <span className="pr_not_done"></span>
            </div>
            <div className="pr_return_card">
                <button onClick={() => window.location.href = "/"}>돌아가기</button>
            </div>
        </div>
    )
}