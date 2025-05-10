import React from "react"
import "../styles/MainPage.css"

function clip(tag: string) {
    window.location.href = `#${tag}`
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
                        WFT
                    </h1>
                    <div className="mdownfont mp_title_desc">프린터를 위한 <span className="upfont">USB</span> 없는 파일 전송 서비스</div>
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
                    <h2 id="whatisthis" onClick={() => clip("whatisthis")}># <span className="upfont">WFT</span></h2>
                    <div className="mdownfont">
                        <span className="upfont">USB</span>나 소셜 계정을 사용하지 않고도 프린터에 파일을 간편하게 전송할 수 있도록 해주는 서비스입니다<span className="upfont">. USB</span>가 없을 때 출력을 하지 못하는 불상사를 막기 위해서<span className="upfont">,</span> 그리고 프린터 컴퓨터에서 소셜 계정 로그인 시의 보안 문제를 해결하기 위해 제작되었습니다<span className="upfont">.</span>
                    </div>
                    <br />
                </div>
                <h1 className="mp_explanation_topic_title upfont">Features</h1>
                <div className="htu_container">
                    <h2 id="web" onClick={() => clip("web")}># <span className="upfont">Web</span></h2>
                    <div className="mdownfont">
                        브라우저와 인터넷만 있다면 별도 설치 과정 없이 언제 어디서든지 사용 가능합니다<span className="upfont">!</span>
                    </div>
                    <br />
                </div>
                <div className="htu_container">
                    <h2 id="realtime" onClick={() => clip("realtime")}># <span className="upfont">Realtime</span></h2>
                    <div className="mdownfont">
                        <span className="upfont">Google Firebase API</span>를 활용하여 실시간 파일 공유를 구현하였습니다<span className="upfont">. P2P</span> 통신 방식보다 더욱 안정적인 파일 전송을 진행할 수 있습니다<span className="upfont">.</span>
                    </div>
                    <br />
                </div>
                <div className="htu_container">
                    <h2 id="blockchain" onClick={() => clip("blockchain")}># <span className="upfont">Blockchain</span></h2>
                    <div className="mdownfont">
                        파일이 전송 과정에서 손상되거나 일부 손상되지 않았는지 확인하기 위해 블록체인 기술을 활용하여 데이터 무결성을 보장합니다<span className="upfont">.</span> 이를 무시하고 빠른 공유를 원한다면 해당 기능을 비활성화할 수 있습니다<span className="upfont">.</span>
                    </div>
                    <br />
                </div>
                <h1 className="mp_explanation_topic_title upfont">Open Source</h1>
                <div className="htu_container">
                    <h2 id="sponsor" onClick={() => clip("sponsor")}># <span className="upfont">Sponsor</span></h2>
                    <div className="mdownfont">
                        <span className="upfont">WFT</span>는 공익을 위해 제작된 서비스로 모든 소스코드가 공개되어 있으며<span className="upfont">,</span> 무료로 사용하실 수 있습니다<span className="upfont">.</span> 하지만 여러분의 지원 없이는 본 프로젝트가 지속되기 어렵습니다<span className="upfont">.</span> 후원은 개발자를 춤추게 합니다<span className="upfont">.</span> 아래 링크로 저를 지원해 주세요<span className="upfont">.</span>
                        <br />
                        <br />
                        <a href="https://www.buymeacoffee.com/dolphin2410" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/arial-blue.png" alt="Buy Me A Coffee" style={{height: '30px', width: '110px'}} /></a>
                        <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="dolphin2410" data-color="#5F7FFF" data-emoji="" data-font="Arial" data-text="Buy me a coffee" data-outline-color="#000000" data-font-color="#ffffff" data-coffee-color="#FFDD00" ></script>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    )
}
