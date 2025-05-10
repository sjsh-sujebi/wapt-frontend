import React from "react"
import "../styles/HowToUse.css"

function clip(tag: string) {
    window.location.href = `#${tag}`
}

export default function HowToUse() {
    return (
        <div className="htu_wrapper">
            <h1 className="htu_topic"><span className="upfont">WFT</span> <span className="mdownfont">사용 매뉴얼</span></h1>
            <div className="htu_container">
                <h2 id="filetransfer1" onClick={() => clip("filetransfer1")}># 파일 주고 받기 <span className="upfont">1</span></h2>
                <img src="/5.png" alt="" />
                <div className="mdownfont">
                    <span className="htu_highlight">프린터 측의 컴퓨터</span>에서 우측 상단에서 "프린터용"을 클릭합니다. 또는, 중앙에 "프린터에서 다운받기"를 클릭해도 됩니다.
                </div>
                <br />
            </div>
            <div className="htu_container">
                <h2 id="filetransfer2" onClick={() => clip("filetransfer2")}># 파일 주고 받기 <span className="upfont">2</span></h2>
                <img src="/7.png" alt="" />
                <div className="mdownfont">
                    여기에 뜬 숫자를 기억하고 파일을 보낼 컴퓨터로 넘어갑니다.
                </div>
                <br />
            </div>
            <div className="htu_container">
                <h2 id="filetransfer3" onClick={() => clip("filetransfer3")}># 파일 주고 받기 <span className="upfont">3</span></h2>
                <img src="/5.png" alt="" />
                <div className="mdownfont">
                    <span className="htu_highlight">파일을 보낼 컴퓨터</span>에서 우측 상단에서 "내 컴퓨터용"을 클릭합니다. 또는, 중앙에 "내 컴퓨터에서 업로드하기"를 클릭해도 됩니다.
                </div>
                <br />
            </div>
            <div className="htu_container">
                <h2 id="filetransfer4" onClick={() => clip("filetransfer4")}># 파일 주고 받기 <span className="upfont">4</span></h2>
                <img src="/8.png" alt="" />
                <div className="mdownfont">
                    아까 프린터 측 컴퓨터에 뜬 숫자를 입력합니다.
                </div>
                <br />
            </div>
            <div className="htu_container">
                <h2 id="filetransfer5" onClick={() => clip("filetransfer5")}># 파일 주고 받기 <span className="upfont">5</span></h2>
                <img src="/9.png" alt="" />
                <div className="mdownfont">
                프린터로 출력할 파일을 선택합니다. 
                </div>
                <br />
            </div>
            <div className="htu_container">
                <h2 id="filetransfer6" onClick={() => clip("filetransfer6")}># 파일 주고 받기 <span className="upfont">6</span></h2>
                <img src="/10.png" alt="" />
                <div className="mdownfont">
                파일을 선택하면 자동으로 업로드 됩니다. 완료가 되면 완료 되었다고 초록색 상자가 표시됩니다. 여기에서 더 업로드하여도 좋고 그만하여도 좋습니다.
                </div>
                <br />
            </div>
            <div className="htu_container">
                <h2 id="filetransfer7" onClick={() => clip("filetransfer7")}># 파일 주고 받기 <span className="upfont">7</span></h2>
                <img src="/11.png" alt="" />
                <div className="mdownfont">
                    <span className="htu_highlight">다시 프린터 측 컴퓨터</span>로 돌아오면, 파일이 뜬 것을 확인할 수 있습니다. 그 박스를 눌러 파일을 다운받습니다.
                </div>
                <br />
            </div>
        </div>
    )
}