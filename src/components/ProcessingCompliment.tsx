import React, { useEffect, useState } from "react"
import "../styles/Processing.css"
import axios from "axios"

function submitCompliment(value: string, hash: string, myHash: string, setSuccess: (success: string) => void) {
    axios.post("https://api.sujebi.tech:8443/createCompliment", JSON.stringify({ value, hash, myHash }), {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        (document.querySelector(".pr_done") as HTMLSpanElement).style.width = "60vw";
        (document.querySelector(".pr_not_done") as HTMLSpanElement).style.width = "0vw";
        (document.querySelector(".pr_title_card") as HTMLDivElement).style.marginBottom = "15px";
        (document.querySelector(".pr_title_card > h1") as HTMLDivElement).innerHTML = "블록체인에 칭찬 등록 완료!";
        (document.querySelector(".pr_title_card > div") as HTMLDivElement).style.display = "none"
        setSuccess("칭찬하기 성공! 4초 후 자동으로 리다이렉트 됩니다.")

        setInterval(() => {
            setSuccess("칭찬하기 성공! 3초 후 자동으로 리다이렉트 됩니다.")

            setInterval(() => {
                setSuccess("칭찬하기 성공! 2초 후 자동으로 리다이렉트 됩니다.")

                setInterval(() => {
                    setSuccess("칭찬하기 성공! 1초 후 자동으로 리다이렉트 됩니다.")

                    setInterval(() => {
                        window.location.href = "/mypage"
                    }, 1000)
                }, 1000)
            }, 1000)
        }, 1000)
    })
}

export default function ProcessingCompliment({ msg, hashTo }: { msg: string, hashTo: string }) {
    const hash = localStorage.getItem("studentHash")

    const [success, setSuccess] = useState("")

    useEffect(() => {
        if (!hash) {
            alert("로그인이 필요한 서비스입니다")
            window.location.href = "/"
            return
        }

        submitCompliment(msg, hashTo, hash, setSuccess);
        (document.querySelector(".pr_done") as HTMLSpanElement).style.width = "30vw";
        (document.querySelector(".pr_not_done") as HTMLSpanElement).style.width = "30vw";
    }, [hash])

    return (
        <div className="pr_container">
            <div className="pr_title_card">
                <h1>블록체인에 칭찬 등록중</h1>
                <div>잠시만 기다려 주세요!</div>
            </div>
            { success ? <div className="pr_success">{success}</div> : null }
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