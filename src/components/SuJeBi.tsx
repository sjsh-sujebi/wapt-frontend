import React from "react"
import "../styles/SuJeBi.css"

function clip(tag: string) {
    window.location.href = `#${tag}`
}

export default function SuJeBi() {
    return (
        <div className="sjb_container">
            <h1><span className="upfont">SUJEBI</span><span className="mdownfont">란</span><span className="upfont">?</span></h1>

            <h2 id="blockchain" onClick={() => clip("blockchain")}># <span className="upfont">Blockchain</span></h2>
            <img src="/blockchain.png" alt="" />
            <div className="mdownfont">
            코인, 비트코인에 대해서 자주 들어보았다면, 블록체인이라는 말도 자주 들어보았을 것입니다. 블록체인은 아마 대충 보안에 관련된 기술이라고 알고 계실 것입니다. <span className="upfont">SUJEBI</span>는 바로 이 블록체인 기술을 활용하여 세종과학고등학교 재학생들을 중앙 서버 없이 인증해주는 서비스입니다.
            </div>
            <br />
            <br />

            <h2 id="web3" onClick={() => clip("web3")}># <span className="upfont">WEB 3.0</span></h2>
            <img src="/web3.png" className="sjb_little_img" alt="" />
            <div className="mdownfont">
            분산된 웹, 또는 <span className="upfont">Web 3.0</span>에 대해 들어보셨나요? 기존의 인터넷은 양방향 통신이긴 하나, 네트워크 전체에서 보았을 때, 중앙 서버가 통신을 주도하였습니다. 즉, 우리가 쓰는 컴퓨터 한 대가 접속이 끊어지는 것은 별 문제가 되지 않지만, 중앙 서버가 다운되는 것은 큰 문제를 일으켰지요. 또한, 중앙 서버가 해킹당하면, 우리 모두의 데이터가 털렸습니다. 즉, 너무 과도한 권한이 중앙 서버에 집중되었습니다. <span className="upfont">Web3.0</span>은 이 권한을 다시 우리의 컴퓨터로 가져오고자 하는 기술입니다. 즉, 중앙의 서버를 없애고, 우리의 컴퓨터와 같은 작은 기기들이 통신을 주도하는 것이지요. 
            </div>
            <br />
            <br />

            <h2 id="did" onClick={() => clip("did")}># <span className="upfont">Distributed Identification</span></h2>
            <img src="/coov.png" alt="" />
            <div className="mdownfont">
            코로나 시절, 백신을 맞았다는 것을 인증해주던 앱 <span className="upfont">COOV</span>를 기억하시나요? 뉴스에도 나왔던 <span className="upfont">COOV</span>는 <span className="upfont">Distributed Identification</span>, 줄여서 <span className="upfont">DID</span>라고 불리는 기술을 활용하여 만들어진 서비스입니다. 블록체인의 핵심은 그 무엇보다도 위조 불가능성입니다. 즉, 한 번 블록체인에 업로드된 데이터는 그 누구도 다른 데이터로 수정할 수 없다는 것이지요. 이것을 이용해서 위조 불가능한 인증서를 제작할 수 있습니다. 보건복지부가 인증서를 한 번 블록체인에 업로드하고 업로드된 주소를 국민에게 주면, 그 국민을 포함하는 누구든지, 그 주소에 저장된 데이터가 절대 위조되지 않았다는 것을 믿을 수 있습니다. 또한 대칭키 <span className="upfont">Signature</span>를 활용한다면, 서명을 한 주체가 보건복지부라는 것 또한 모두가 믿을 수 있게 됩니다. 이것이 <span className="upfont">DID</span>의 원리입니다.
            </div>
            <br />
            <br />

            <h2 id="sujebi" onClick={() => clip("sujebi")}># <span className="upfont">SUJEBI</span></h2>
            <img src="/sjsh.png" alt="" />
            <div className="mdownfont">
            <span className="upfont">SUJEBI</span>도 비슷합니다. 보건복지부 대신 세종과학고 <span className="upfont">CPU</span> 동아리가 사람들의 신원을 파악해 블록체인에 업로드합니다. 그러면 누구든지 <span className="upfont">CPU</span>를 신뢰한다면, 그 학생이 세종과학고의 재학생이라는 사실을 인정할 수 있게 됩니다. 조금 더 구체적으로는, 사용자의 기수, 반, 번호, 비밀 키 <span className="upfont">3</span>개를 해싱하고, 그것을 <span className="upfont">CPU</span> 동아리가 블록체인에 업로드하는데, 그렇게 되면 반대로 그 해싱한 값이 블록체인에 존재한다면, <span className="upfont">CPU</span>가 인증한 세종과학고등학교의 재학생이라는 것을 알 수 있습니다. 이러한 방식으로 인증을 진행하면, 중앙 서버가 없으므로, 비밀번호가 해킹될 위험이 없다는 장점이 있습니다.
            </div>
        </div>
    )
}