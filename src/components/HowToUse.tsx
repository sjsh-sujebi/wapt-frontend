import React from "react"
import "../styles/HowToUse.css"

function clip(tag: string) {
    window.location.href = `#${tag}`
}

export default function HowToUse() {
    return (
        <div className="htu_container">
            <h1><span className="upfont">WFT</span> <span className="mdownfont">사용 매뉴얼</span></h1>

            <h2 id="register" onClick={() => clip("register")}># 회원가입</h2>
            <img src="/0.png" alt="" />
            <div>
            처음 들어왔을 때는 우측 상단에 회원가입 버튼을 눌렀을 때, 바로 회원가입 페이지로 넘어갑니다. 모바일의 경우 이 옵션은 우측 상단의 더보기 아이콘을 클릭하면 볼 수 있습니다.
            </div>
            <img src="/1.png" alt="" />
            <div>
            <span className="upfont">WFT</span>는 회원 관리를 위해 <a href="/sujebi">수제비 서비스</a>를 이용합니다. 수제비는 하나의 비밀번호 대신에 <span className="upfont">3</span>개의 보안 코드를 활용합니다. <span className="upfont">3</span>개의 아무 단어나 입력하여 보안 코드를 지정하세요!
            </div>
            <img src="/2.png" alt="" />
            <div>
            학생 정보를 정확하게 입력해주세요. 승인을 진행할 때 잘못된 정보가 포함되면 승인 거절당할 수 있습니다
            </div>
            <img src="/3.png" className="htu_width_image" alt="" />
            <div>
            학생증의 뒷면을 촬영해 주세요. 본인인증을 위해 사용됩니다.
            </div>
            <img src="/4.png" alt="" />
            <div>
            끝입니다<span className="upfont">! CPU </span>부원에 의해 인증 및 블록체인 등록이 진행될 것이며, 시간이 걸릴 수 있습니다.
            </div>
            <br />
            <br />

            <h2 id="login" onClick={() => clip("login")}># 로그인</h2>
            <img src="/0.png" alt="" />
            <div>
            우측 상단의 로그인 버튼을 클릭하고 로그인을 진행합니다. 회원가입을 한 지 얼마 되지 않았다면, 승인이 아직 진행되지 않아 로그인이 되지 않을 수 있습니다.
            </div>
            <br />
            <br />

            <h2 id="mypage" onClick={() => clip("mypage")}># 마이 페이지</h2>
            <img src="/5.png" alt="" />
            <div>
            우측 상단에서 로그인 버튼이 마이 페이지 버튼으로 바뀐 것을 확인합니다.
            </div>
            <img src="/6.png" alt="" />
            <div>
            나를 인증할 수 있는 <span className="upfont">QR</span> 코드와 로그아웃 버튼이 있는 것을 확인합니다. 이 <span className="upfont">QR</span> 코드는 절대 공유하지 마십시오.
            </div>
            <br />
            <br />

            <h2 id="filetransfer" onClick={() => clip("filetransfer")}># 파일 주고 받기</h2>
            <img src="/5.png" alt="" />
            <div>
            <span className="htu_highlight">프린터 측의 컴퓨터</span>에서 <span className="htu_highlight">로그인 없이</span> 우측 상단에서 "프린터용"을 클릭합니다. 또는, 중앙에 "프린터에서 다운받기"를 클릭해도 됩니다.
            </div>
            <img src="/7.png" alt="" />
            <div>
            여기에 뜬 숫자를 기억하고 파일을 보낼 컴퓨터로 넘어갑니다.
            </div>
            <img src="/5.png" alt="" />
            <div>
            <span className="htu_highlight">파일을 보낼 컴퓨터</span>에서 <span className="htu_highlight">로그인을 하고</span> 우측 상단에서 "내 컴퓨터용"을 클릭합니다. 또는, 중앙에 "내 컴퓨터에서 업로드하기"를 클릭해도 됩니다.
            </div>
            <img src="/8.png" alt="" />
            <div>
            아까 프린터 측 컴퓨터에 뜬 숫자를 입력합니다.
            </div>
            <img src="/9.png" alt="" />
            <div>
            프린터로 출력할 파일을 선택합니다. 
            </div>
            <img src="/10.png" alt="" />
            <div>
            파일을 선택하면 자동으로 업로드 됩니다. 완료가 되면 완료 되었다고 초록색 상자가 표시됩니다. 여기에서 더 업로드하여도 좋고 그만하여도 좋습니다.
            </div>
            <img src="/11.png" alt="" />
            <div>
            <span className="htu_highlight">다시 프린터 측 컴퓨터</span>로 돌아오면, 파일이 뜬 것을 확인할 수 있습니다. 그 박스를 눌러 파일을 다운받습니다.
            </div>
        </div>
    )
}