import React, { useState } from "react"
import "../styles/StudentLogin.css"
import axios from "axios"

function clickListener(setWarning: (msg: string) => void) {
    const keyword1 = (document.querySelector("#keyword1") as HTMLInputElement).value
    const keyword2 = (document.querySelector("#keyword2") as HTMLInputElement).value
    const keyword3 = (document.querySelector("#keyword3") as HTMLInputElement).value

    const gradeNumber = (document.querySelector("#grade") as HTMLInputElement).value
    const classNumber = (document.querySelector("#class") as HTMLInputElement).value
    const studentNumber = (document.querySelector("#student_number") as HTMLInputElement).value

    const data = { keyword1, keyword2, keyword3, gradeNumber, classNumber, studentNumber }

    if (!keyword1 || !keyword2 || !keyword3 || !gradeNumber || !classNumber || !studentNumber) {
        setWarning("필수 내용을 빠짐 없이 입력해주세요")
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        return
    }

    axios.post("https://api.sujebi.tech/login", JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log(res)
        if ((res.data as string).startsWith('ok:')) {
            window.localStorage.setItem("studentHash", (res.data as string).split("ok:")[1])
            window.location.href = "/mypage"
        }
    })
}

export default function StudentRegistration() {
    const [warning, setWarning] = useState("")
    
    return (
        <div className="sl_container">
            <div className="sl_start_page_wrapper">
                <h1 className="sl_title">
                    로그인
                </h1>
                { warning ? <div className="sr_warning">{warning}</div> : null }
                <div className="sl_input_hint">
                    <h2>로그인 키워드</h2>
                    <div>로그인을 위한 키워드를 기재하여 주세요</div>
                </div>
                <div className="sl_input_forms">
                    <label htmlFor="keyword1">키워드 1</label>
                    <input type="text" id="keyword1" placeholder="예) 바나나" className="sl_input_text sl_input" />
                    <label htmlFor="keyword2">키워드 2</label>
                    <input type="text" id="keyword2" placeholder="예) 스테이크" className="sl_input_text sl_input" />
                    <label htmlFor="keyword3">키워드 3</label>
                    <input type="text" id="keyword3" placeholder="예) 호박" className="sl_input_text sl_input" />
                </div>
                <div className="sl_input_hint">
                    <h2>학생 정보 입력하기</h2>
                    <div>본인의 학번, 이름을 기재하여 주세요</div>
                </div>
                <div className="sl_input_forms">
                    <label htmlFor="grade">학년</label>
                    <input type="text" id="grade" placeholder="예) 2" className="sl_input_text sl_input" />
                    <label htmlFor="class">반</label>
                    <input type="text" id="class" placeholder="예) 4" className="sl_input_text sl_input" />
                    <label htmlFor="student_number">번호</label>
                    <input type="text" id="student_number" placeholder="예) 17" className="sl_input_text sl_input" />
                </div>

                <div className="sl_btn_footer">
                    <button className="sl_submit_btn" onClick={() => clickListener(setWarning)}>제출</button>
                </div>
            </div>
        </div>
    )
}