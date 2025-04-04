import React, { useState } from "react"
import "../styles/StudentRegistration.css"
import axios from "axios"

function clickListener(setWarning: (msg: string) => void) {
    const keyword1 = (document.querySelector("#keyword1") as HTMLInputElement).value
    const keyword2 = (document.querySelector("#keyword2") as HTMLInputElement).value
    const keyword3 = (document.querySelector("#keyword3") as HTMLInputElement).value

    const gradeNumber = (document.querySelector("#grade") as HTMLInputElement).value
    const classNumber = (document.querySelector("#class") as HTMLInputElement).value
    const studentNumber = (document.querySelector("#student_number") as HTMLInputElement).value

    const files = (document.querySelector("#cert_image") as HTMLInputElement).files

    if (!keyword1 || !keyword2 || !keyword3 || !gradeNumber || !classNumber || !studentNumber || files == null || files.length == 0) {
        setWarning("학생증 파일을 입력하여 주세요")
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        return
    }

    const reader = new FileReader()
	reader.readAsDataURL(files[0])
	reader.onload = function (e) {
		const base64Image = reader.result

        const data = { keyword1, keyword2, keyword3, gradeNumber, classNumber, studentNumber, base64Image }

        axios.post("http://188.166.215.158:8080/register", JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.data == 'ok') {
                window.location.href = "/processing"
            }
        })
	}
}

export default function StudentRegistration() {
    const [warning, setWarning] = useState("")

    return (
        <div className="sr_container">
            <div className="sr_start_page_wrapper">
                <h1 className="sr_title">
                    학생증 등록하기
                </h1>
                { warning ? <div className="sr_warning">{warning}</div> : null }
                <div className="sr_input_hint">
                    <h2>로그인 키워드 설정하기</h2>
                    <div>SuJeBI 로그인을 위한 비밀 키워드를 설정해주세요</div>
                </div>
                <div className="sr_input_forms">
                    <label htmlFor="keyword1">키워드 1</label>
                    <input type="text" id="keyword1" placeholder="예) 바나나" className="sr_input_text sr_input" />
                    <label htmlFor="keyword2">키워드 2</label>
                    <input type="text" id="keyword2" placeholder="예) 스테이크" className="sr_input_text sr_input" />
                    <label htmlFor="keyword3">키워드 3</label>
                    <input type="text" id="keyword3" placeholder="예) 호박" className="sr_input_text sr_input" />
                </div>
                <div className="sr_input_hint">
                    <h2>학생 정보 입력하기</h2>
                    <div>본인의 학번, 이름을 기재하여 주세요</div>
                </div>
                <div className="sr_input_forms">
                    <label htmlFor="grade">학년</label>
                    <input type="text" id="grade" placeholder="예) 2" className="sr_input_text sr_input" />
                    <label htmlFor="class">반</label>
                    <input type="text" id="class" placeholder="예) 4" className="sr_input_text sr_input" />
                    <label htmlFor="student_number">번호</label>
                    <input type="text" id="student_number" placeholder="예) 17" className="sr_input_text sr_input" />
                </div>
                <div className="sr_input_hint">
                    <h2>학생증 촬영하기</h2>
                    <div>본인이 세종과학고 재학생임을 증명하기 위해 학생증 <b className="backside">뒷면</b>을 촬영하여 주세요</div>
                </div>
                <div className="sr_input_forms">
                    <input type="file" className="sr_input" id="cert_image" accept="image/png, image/gif, image/jpeg" />
                </div>

                <div className="sr_btn_footer">
                    <button className="sr_submit_btn" onClick={() => clickListener(setWarning)}>제출</button>
                </div>
            </div>
        </div>
    )
}