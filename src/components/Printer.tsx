import React, { ReactElement, useEffect, useState } from "react"
import "../styles/Printer.css"
import axios from "axios";
import { createRandomCode, openChannel } from "../utils/firebase";
import { Buffer } from 'buffer'
import { v4 as uuidv4 } from 'uuid'

export default function HomePage() {
    const [code, setCode] = useState(createRandomCode().toString())
    const myUUID = uuidv4()
    const [status, setStatus] = useState(0)  // 0: initial, 1: blob downloaded
    const [downloadLinks, setDownloadLinks] = useState<ReactElement[]>([])

    useEffect(() => {
        openChannel(code, myUUID, async (blobIds, _fileName) => {
            setStatus(1)
            let isBlockchainValidated = true
            let contentType = ""
            let fileName = ""
            let mainBuffer = ""

            for (const blobId of blobIds) {
                const data = await axios.post("/.netlify/functions/download", JSON.stringify({ blobId, fileName, uuid: myUUID }), {
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                
                const response = data.data as APIResponse

                let verify_response = {
                    is_success: false,
                    payload: "Fake payload"
                }

                if ((document.querySelector("#blockchain") as HTMLInputElement).checked) {
                    verify_response = (await axios.post("/.netlify/functions/file_verify", JSON.stringify({
                        base64File: response.payload.base64Data,
                        code: code
                    }))).data as APIResponse
                }

                isBlockchainValidated = isBlockchainValidated && verify_response.is_success
                contentType = response.payload.contentType
                fileName = response.payload.fileName

                // TODO: file tamper verification code
                    

                // TODO: code end

                mainBuffer += response.payload.base64Data
            }

            const blob = new Blob([Buffer.from(mainBuffer.split("base64,")[1], 'base64')], { type : contentType })

            const url = window.URL.createObjectURL(blob)
            const uuid = uuidv4()
            const a = React.createElement('a', { href: url, download: fileName, className: 'pt_download_link', id: uuid, hidden: true }, fileName)
            let className = "sdowntfont pt_link_wrapper"
            let title = ''
            if (isBlockchainValidated) {
                className = "sdownfont pt_link_wrapper pt_blockchain_secured"
                title = '블록체인으로 위조 방지된 파일입니다'
            }
            const wrappedElement = <div className={className} title={title} onClick={() => document.getElementById(uuid)?.click()}>
                {a}{fileName}
            </div>
            // a.href = url
            // a.download = parsedData.fileName
            // a.click()
            // a.remove()
            // window.URL.revokeObjectURL(url);

            setDownloadLinks((p) => [...p, wrappedElement])
        }, () => {
            const newCode = createRandomCode()
            setCode(newCode.toString())
        })
    }, [code])
    
    const default_return = (
        <div className="pt_container">
            <div className="pt_wrapped_section">
                <h1 className="pt_title mdownfont">프린터 번호 <span className="upfont">:</span> <span className="upfont pt_gray">{code}</span></h1>
                <div className="us_checkbox_group">
                    <input type="checkbox" id="blockchain" />
                    <label htmlFor="blockchain" className="mdownfont" title="블록체인을 사용하므로 시간이 걸릴 수 있습니다.">블록체인 위조 방지 검사하기</label>
                </div>
            </div>
            {
                (() => {
                    if (downloadLinks.length == 0) {
                        return <div className="pt_empty_links mdownfont">다른 기기에서 파일을 보내보세요<span className="upfont">!</span></div>
                    } else {
                        (document.querySelector(".pt_title")!! as HTMLTitleElement).style.marginBottom = "30px";
                        (document.querySelector(".pt_title")!! as HTMLTitleElement).style.marginTop = "70px"

                        return (<>
                            <h2 className="pt_file_list_title mdownfont">파일 목록</h2>
                            <div className="pt_download_hint mdownfont"><span className="upfont">(</span>클릭해서 다운로드하세요<span className="upfont">)</span></div>
                            <div className="pt_download_links">
                                {downloadLinks}
                            </div>
                        </>)
                    }
                })()
            }
        </div>
    )

    return default_return
}