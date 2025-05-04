import React, { ReactElement, useEffect, useState } from "react"
import "../styles/Printer.css"
import axios from "axios";
import { createRandomCode, openChannel } from "../utils/firebase";

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
                const parsedData = JSON.parse(data.data.toString())
                
                const byteCharacters = atob(parsedData.base64Data)
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }

                const blob = new Blob([new Uint8Array(byteNumbers)], { type : data.headers["Content-Type"]?.toString() ?? "application/octet-stream" })

                const url = window.URL.createObjectURL(blob)
                const a = React.createElement('a', { href: url, download: parsedData.fileName }, parsedData.fileName) as ReactElement
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
            <h1 className="pt_title"><span className="upfont">{code}</span>에 연결하기</h1>

            <div className="pt_download_links">
                {downloadLinks}
            </div>
        </div>
    )

    return default_return
}