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
        openChannel(code, myUUID, (blobId, fileName) => {
            setStatus(1)
            axios.post("/.netlify/functions/download", JSON.stringify({ blobId, fileName, uuid: myUUID }), {
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(async (data) => {
                const response = data.data as APIResponse

                const verify_response = (await axios.post("/.netlify/functions/file_verify", JSON.stringify({
                    base64File: response.payload.base64Data,
                    code: code
                }))).data as APIResponse

                if (!verify_response.is_success) {
                    alert("File Tampered!")
                }
                
                const buffer = Buffer.from(response.payload.base64Data.split(`${response.payload.contentType}base64`)[1], 'base64')
                const blob = new Blob([buffer], { type : response.payload.contentType })

                const url = window.URL.createObjectURL(blob)
                const uuid = uuidv4()
                const a = React.createElement('a', { href: url, download: response.payload.fileName, className: 'pt_download_link', id: uuid, hidden: true }, response.payload.fileName)
                const wrappedElement = <div className="pt_link_wrapper" onClick={() => document.getElementById(uuid)?.click()}>
                    {a}{fileName}
                </div>
                // a.href = url
                // a.download = parsedData.fileName
                // a.click()
                // a.remove()
                // window.URL.revokeObjectURL(url);

                setDownloadLinks((p) => [...p, wrappedElement])
            })
        })
    }, [code])
    
    const default_return = (
        <div className="pt_container">
            <h1 className="pt_title">프린터 번호 : <span className="upfont pt_gray">{code}</span></h1>

            {
                (() => {
                    if (downloadLinks.length == 0) {
                        return <div className="pt_empty_links">파일을 받을 준비가 되었습니다!</div>
                    } else {
                        (document.querySelector(".pt_title")!! as HTMLTitleElement).style.marginBottom = "30px";
                        (document.querySelector(".pt_title")!! as HTMLTitleElement).style.marginTop = "70px"

                        return (<>
                            <h2 className="pt_file_list_title">파일 목록</h2>
                            <div className="pt_download_hint mdownfont">(클릭해서 다운로드하세요)</div>
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