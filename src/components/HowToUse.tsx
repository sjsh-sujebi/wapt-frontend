import React from "react"
import "../styles/HowToUse.css"

function clip(tag: string) {
    window.location.href = `#${tag}`
}

export default function HowToUse() {
    return (
        <div className="htu_container">
            <h1>수제비 사용법! 😎</h1>

            <h2 id="register" onClick={() => clip("register")}>회원가입</h2>
            <img src="/0.png" alt="" />
            <div>
            처음 들어왔을 때는 "블록체인 인증 시작하기" 버튼을 눌렀을 때, 바로 회원가입 페이지로 넘어갑니다.
            </div>
            <img src="/1.png" alt="" />
            <div>
            수제비는 하나의 비밀번호 대신에 3개의 보안 코드를 활용합니다. 3개의 아무 단어나 입력하여 보안 코드를 지정하세요!
            </div>
            <img src="/2.png" alt="" />
            <div>
            학년, 반, 번호를 정확하게 입력해주세요. 승인을 진행할 때 잘못된 정보가 포함되면 거절당할 수 있습니다
            </div>
            <img src="/3.png" alt="" />
            <div>
            학생증의 뒷면을 촬영해 주세요. 본인인증을 위해 사용됩니다.
            </div>
            <img src="/4.png" alt="" />
            <div>
            끝입니다! CPU 부원에 의해 인증 절차 및 블록체인 등록이 진행될 것이며, 시간이 걸릴 수 있습니다.
            </div>
            <br />
            <br />

            <h2 id="login" onClick={() => clip("login")}>로그인</h2>
            <img src="/0.png" alt="" />
            <div>
            우측 상단의 로그인 버튼을 클릭하고 로그인을 진행합니다. 회원가입을 한 지 얼마 되지 않았다면, 승인이 아직 진행되지 않아 로그인이 되지 않을 수 있습니다.
            </div>
            <br />
            <br />

            <h2 id="mypage" onClick={() => clip("mypage")}>마이 페이지</h2>
            <img src="/5.png" alt="" />
            <div>
            우측 상단에서 로그인 버튼이 마이 페이지 버튼으로 바뀐 것을 확인합니다.
            </div>
            <img src="/6.png" alt="" />
            <div>
            나를 인증할 수 있는 QR 코드와 로그아웃 버튼이 있는 것을 확인합니다.
            </div>
            <img src="/7.png" alt="" />
            <div>
            아래로 살짝 내리면 친구들이 나에게 한 칭찬들의 목록을 볼 수 있습니다. 처음이라면 아무것도 없는 것이 정상입니다.
            </div>
            <br />
            <br />

            <h2 id="compliment" onClick={() => clip("compliment")}>칭찬하기</h2>
            <img src="/5.png" alt="" />
            <div>
            우측 상단에서 칭찬하기 버튼을 클릭합니다.
            </div>
            <img src="/8.png" alt="" />
            <div>
            버튼을 눌러 칭찬할 친구의 QR코드를 촬영합니다. 카메라 권한을 허용해 주세요. QR코드가 자동으로 인식되면 카메라가 닫힙니다.
            </div>
            <img src="/9.png" alt="" />
            <div>
            신원 확인이 완료되면 칭찬을 입력할 수 있습니다.
            </div>
            <img src="/10.png" alt="" />
            <div>
            업로드를 하면 이런 페이지가 뜹니다. 돌아가기를 눌러도 칭찬은 전달이 되며, 전달 완료 시 자동으로 리다이렉트 됩니다.
            </div>
            <img src="/11.png" alt="" />
            <div>
            칭찬을 받은 친구의 마이페이지에는 이렇게 내가 한 칭찬이 표시됩니다.
            </div>
        </div>
    )
}