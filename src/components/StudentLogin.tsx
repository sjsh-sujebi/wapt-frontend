import React, { useEffect, useState } from "react"
import "../styles/StudentLogin.css"
import axios from "axios"

function clickListener(target: HTMLButtonElement, setWarning: (msg: string) => void) {
    target.classList.add("sl_btn_deactivated")
    
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

    axios.post("/.netlify/functions/login", JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        const response = res.data as APIResponse
        if (response.is_success) {
            window.localStorage.setItem("studentHash", response.payload.userHash)
            window.location.href = "/mypage"
        } else {
            setWarning("로그인에 실패하였습니다.")
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
            target.classList.remove("sl_btn_deactivated")
        }
    })
}

export default function StudentLogin() {
    const [warning, setWarning] = useState("")

    if (window.location.hash == "#svcrq") {
        window.location.hash = ""
        setWarning("로그인이 필요한 서비스입니다")
    }

    window.addEventListener("hashchange", e => {
        if (window.location.hash == "#svcrq") {
            window.location.hash = ""
            setWarning("로그인이 필요한 서비스입니다")
        }
    })

    return (
        <div className="sl_container">
            <div className="sl_start_page_wrapper">
                <h1 className="sl_title">
                    로그인
                </h1>
                { warning ? <div className="sr_warning">{warning}</div> : null }
                <div className="sl_input_hint">
                    <h2>로그인 키워드</h2>
                    <div className="mdownfont">로그인을 위한 키워드를 기재하여 주세요</div>
                </div>
                <div className="sl_input_forms">
                    <label htmlFor="keyword1">키워드 <span className="upfont">1</span></label>
                    <input type="text" id="keyword1" placeholder="예) 바나나" className="sl_input_text sl_input" />
                    <label htmlFor="keyword2">키워드 <span className="upfont">2</span></label>
                    <input type="text" id="keyword2" placeholder="예) 스테이크" className="sl_input_text sl_input" />
                    <label htmlFor="keyword3">키워드 <span className="upfont">3</span></label>
                    <input type="text" id="keyword3" placeholder="예) 호박" className="sl_input_text sl_input" />
                </div>
                <div className="sl_input_hint">
                    <h2>학생 정보 입력하기</h2>
                    <div className="mdownfont">본인의 학생 정보를 기재하여 주세요</div>
                </div>
                <div className="sl_input_forms">
                    <label htmlFor="grade">기수</label>
                    <input type="text" id="grade" placeholder="예) 18" className="sl_input_text sl_input" />
                    <label htmlFor="class"><span className="upfont">1</span>학년 때의 반</label>
                    <input type="text" id="class" placeholder="예) 9" className="sl_input_text sl_input" />
                    <label htmlFor="student_number"><span className="upfont">1</span>학년 때의 번호</label>
                    <input type="text" id="student_number" placeholder="예) 1" className="sl_input_text sl_input" />
                </div>

                <div className="sl_btn_footer">
                    <button className="sl_submit_btn" onClick={e => clickListener(e.target as HTMLButtonElement, setWarning)}>제출</button>
                </div>

                <div className="sl_register_footer">
                    <span className="mdownfont sl_rhint_l">아직 회원이 아닌가요?</span><a className="sl_underline " href="/register">회원가입</a>
                </div>
            </div>
        </div>
    )
}