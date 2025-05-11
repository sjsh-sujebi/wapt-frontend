import React from "react"
import "../styles/MainPage.css"

function clip(tag: string) {
    window.location.href = `#${tag}`
    window.scrollBy({
        top: -120,
        behavior: 'smooth'
    })
}

export default function MainPage() {
    let printer = "/printer"
    let user = "/login"

    // TODO: just for free version
    const poop = localStorage.getItem("poop")
    if (!poop) {
        localStorage.setItem("poop", "💩")
        localStorage.setItem("studentHash", "0x20115e200f8a438ea21c2efc76035655623c2d8d3a83f6cfc5f9334ca37e50bd")
        // alert("베타테스터 계정으로 자동 로그인 되었습니다")
        window.location.reload()
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
                        Pigeon
                    </h1>
                    <div className="mdownfont mp_title_desc">파일을 전달하는 <span className="upfont">21</span>세기 비둘기</div>
                </div>
                <div className="mp_button_group">
                    <div className="mp_action_btn_group">
                        <button className="mp_get_started_btn" onClick={() => window.location.href = printer}>프린터에서 다운받기</button>
                        <button className="mp_get_started_btn" onClick={() => window.location.href = user}>내 컴퓨터에서 업로드하기</button>
                    </div>
                    <button className="mp_get_started_reverse_btn" onClick={() => window.location.href = "/usage"}>사용 방법 익히기</button>
                </div>
            </div>
            <div className="mp_explanation_page_wrapper">
                <h1 className="mp_explanation_topic_title upfont">Introduction</h1>
                <div className="htu_container">
                    <h2 id="whatisthis" onClick={() => clip("whatisthis")}># <span className="upfont">Pigeon</span></h2>
                    <img src="/dove.png" width={300} alt="" />
                    <div className="textAlignCenter">
                        <h3 className="mdownfont"><span className="upfont">USB</span>가 없다고요<span className="upfont">? </span>비둘기에게 부탁해보세요<span className="upfont">!</span></h3>
                    </div>
                    <br />
                    <br />
                </div>
                <h1 className="mp_explanation_topic_title upfont">Features</h1>
                <div className="htu_container">
                    <h2 id="web" onClick={() => clip("web")}># <span className="upfont">Web</span></h2>
                    <img src="/saturn.png" width={300} alt="" />
                    <div className="textAlignCenter">
                        <h3 className="mdownfont">브라우저와 인터넷만 있다면 언제 어디서나<span className="upfont">!</span></h3>
                    </div>
                    <br />
                    <br />
                </div>
                <div className="htu_container">
                    <h2 id="realtime" onClick={() => clip("realtime")}># <span className="upfont">Realtime</span></h2>
                    <img src="/clock.png" width={220} alt="" />
                    <div className="textAlignCenter">
                        <h3 className="mdownfont"><span className="upfont">Google Firebase API</span>를 활용한 안정적인 실시간 파일 공유<span className="upfont">!</span></h3>
                    </div>
                    <br />
                    <br />
                </div>
                <div className="htu_container">
                    <h2 id="blockchain" onClick={() => clip("blockchain")}># <span className="upfont">Blockchain</span></h2>
                    <img src="/chain.png" width={300} alt="" />
                    <div className="textAlignCenter">
                        <h3 className="mdownfont">블록체인 기술을 활용한 데이터 무결성 보장<span className="upfont">!</span></h3>
                    </div>
                    <br />
                    <br />
                </div>
                <h1 className="mp_explanation_topic_title upfont">Open Source</h1>
                <div className="htu_container">
                    <h2 id="sponsor" onClick={() => clip("sponsor")}># <span className="upfont">Sponsor</span></h2>
                    <div className="textAlignCenter">
                        <h3 className="mdownfont">비둘기에게 밥을 나누어 주시는 것은 어떤가요<span className="upfont">?</span></h3>
                        <br />
                        <a href="https://www.buymeacoffee.com/dolphin2410" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/arial-blue.png" alt="Buy Me A Coffee" style={{height: '40px', width: '150px'}} /></a>
                        <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="dolphin2410" data-color="#5F7FFF" data-emoji="" data-font="Arial" data-text="Feed Pigeon" data-outline-color="#000000" data-font-color="#ffffff" data-coffee-color="#FFDD00" ></script>
                    </div>
                    <br />
                    <br />
                </div>
            </div>
        </div>
    )
}
