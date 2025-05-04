import React, { ReactElement, useEffect, useState } from "react"
import "../styles/Printer.css"
import axios from "axios";
import { createRandomCode, openChannel } from "../utils/firebase";
import { Buffer } from 'buffer'

export default function HomePage() {
    const [code, setCode] = useState(createRandomCode().toString())
    const [status, setStatus] = useState(0)  // 0: initial, 1: blob downloaded
    const [downloadLinks, setDownloadLinks] = useState<ReactElement[]>([])

    useEffect(() => {
        openChannel(code, (blobId, fileName) => {
            setStatus(1)
            axios.post("/.netlify/functions/download", JSON.stringify({ blobId, fileName }), {
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((data) => {
                const response = data.data as APIResponse
                
                const buffer = Buffer.from(response.payload.base64Data.split(`${response.payload.contentType}base64`)[1], 'base64')
                const blob = new Blob([buffer], { type : response.payload.contentType })

                const url = window.URL.createObjectURL(blob)
                const a = React.createElement('a', { href: url, download: response.payload.fileName, className: 'pt_download_link' }, response.payload.fileName) as ReactElement
                // a.href = url
                // a.download = parsedData.fileName
                // a.click()
                // a.remove()
                // window.URL.revokeObjectURL(url);

                setDownloadLinks((p) => [...p, a])
            })
        })
    }, [code])
    
    const default_return = (
        <div className="pt_container">
            <h1 className="pt_title">프린터 번호 : <span className="upfont pt_gray">{code}</span>에 연결하기</h1>

            {
                (() => {
                    if (downloadLinks.length == 0) {
                        return <div className="pt_empty_links">파일을 받을 준비가 되었습니다!</div>
                    } else {
                        return (<div className="pt_download_links">
                            {downloadLinks}
                        </div>)
                    }
                })()
            }
        </div>
    )

    return default_return
}