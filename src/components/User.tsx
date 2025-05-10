import React, { useEffect, useState } from "react"
import "../styles/User.css"
import axios from "axios";
import { uploadToChannel } from "../utils/firebase";
import { Web3 } from 'web3'

const connectToPrinter = async (setUUID: (uuid: string) => void, setCode: (code: number) => void, setWarning: (warning: string) => void, setStatus: (status: number) => void) => {
    const printerNumberString = (document.querySelector("#printerNumber") as HTMLInputElement).value
    const printerNumberInt = parseInt(printerNumberString, 10)

    document.querySelector(".us_submit")?.classList.add("us_submit_deactivated")

    if (isNaN(printerNumberInt)) {
        setWarning("유효하지 않은 숫자입니다.")
        return
    }

    if (printerNumberInt < 1000 || printerNumberInt > 9999) {
        setWarning("유효하지 않은 프린터 번호입니다.")
        return
    }

    const data = await axios.post("/.netlify/functions/get_uuid", JSON.stringify({ code: printerNumberInt }), {
        headers: {
            "Content-Type": "application/json"
        }
    })

    const response = data.data as APIResponse

    if (!response.is_success) {
        alert("존재하지 않는 코드입니다")
        return 
    }

    setCode(printerNumberInt)
    setUUID(response.payload.uuid)
    setStatus(1)
    setWarning("")
}

function transaction(userHash: string, callback: () => void) {
    // TODO: Free version only
    callback()
    // TODO end


    // TODO: uncomment below for non-free version
    // axios.post("/.netlify/functions/use_token", JSON.stringify({ userHash }), {
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // }).then(data => {
    //     const response = data.data as APIResponse
    
    //     if (!response.is_success) {
    //         alert("PaymentError: 개발자에게 문의해 주세요")
    //     } else {
    //         callback()
    //     }
    // })
    // TODO end
}

function sign_transaction(set_success: (msg: string) => void, myHash: string, selectedFile: File, uuid: string, code: string) {
    document.querySelector("#verify_payment")?.classList.add("us_submit_deactivated")
    transaction(myHash, () => {
        const reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onload = async function (e) {
            const base64File = reader.result
            console.log(selectedFile.type)
            console.log(base64File)
            const data = { fileName: selectedFile.name, contentType: selectedFile.type, base64File, code }
            
            axios.post("/.netlify/functions/upload", JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async res => {
                const response = res.data as APIResponse
                if (response.is_success) {
                    if ((document.querySelector("#blockchain") as HTMLInputElement).checked) {
                        const toHash = `${code}/tralarelotralala/${response.payload.base64Data}`
                        const web3 = new Web3(process.env.INFURA_RPC_URL)
                        
                        const fileHash = web3.utils.sha3(toHash)
                        const tamper_results = (await axios.post("/.netlify/functions/upload_file_tamper", JSON.stringify({ fileHash }), {
                            headers: {
                                "Content-Type": 'application/json'
                            }
                        })).data as APIResponse

                        if (!tamper_results.is_success) {
                            alert("failed to upload to blockchain")
                        }
                    }

                    uploadToChannel(uuid.toString(), response.payload.blobId, response.payload.fileName)
                    set_success(`성공적으로 파일을 전송하였습니다!`)
                    document.querySelector("#file_selection_btn")?.classList.remove("us_submit_deactivated")
                    document.querySelector(".us_file_send_popup")?.classList.add("us_no_display")
                    document.querySelector(".us_file_send_popup_background")?.classList.add("us_no_display")
                } else {
                    alert("BlobUploadError: 오류가 발생했습니다. 개발자에게 문의해주세요.")
                }
            })
        }
    })
}

export default function User() {
    const [code, setCode] = useState(0)
    const [status, setStatus] = useState(0)  // 0: initial, 1: blob downloaded
    const [warning, setWarning] = useState("")
    const [success, setSuccess] = useState("")
    const [currentTokens, setCurrentTokens] = useState(-1)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [uuid, setUUID] = useState("")

    const myHash = localStorage.getItem("studentHash")

    useEffect(() => {
        if (currentTokens == 0 || currentTokens == -1 || selectedFile == null) {
            document.querySelector("#verify_payment")?.classList.add("us_submit_deactivated")
        } else {
            document.querySelector("#verify_payment")?.classList.remove("us_submit_deactivated")
        }
    }, [currentTokens, selectedFile])

    useEffect(() => {
        axios.post("/.netlify/functions/get_token_balance", JSON.stringify({ userHash: myHash }), {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(data => {
            const response = data.data as APIResponse
            setCurrentTokens(parseInt(response.payload.numTokens))
        })
    }, []);

    useEffect(() => {
        document.querySelector(".us_file_send_popup_background")?.addEventListener("click", e => {
            e.preventDefault()
            document.querySelector(".us_file_send_popup")?.classList.add("us_no_display")
            document.querySelector(".us_file_send_popup_background")?.classList.add("us_no_display")
        })
        
        document.querySelector('#printerFileInput')?.addEventListener('change', e => {
            document.querySelector("#file_selection_btn")?.classList.add("us_submit_deactivated")
            setSuccess("")
            const target: HTMLInputElement | null = e.target as HTMLInputElement
            if (target?.files && target?.files[0]) {
                const selectedFile = target.files[0]
                setSelectedFile(selectedFile)
                
                // TODO: Free version only
                sign_transaction(setSuccess, myHash!!, selectedFile, uuid, code.toString())
                // TODO end
            } else {
                return
            }
            
            // TODO: Uncomment below for non-free version
            // document.querySelector(".us_file_send_popup")?.classList.remove("us_no_display")
            // document.querySelector(".us_file_send_popup_background")?.classList.remove("us_no_display")
            // TODO end
        });

        document.querySelector("#nothingtodoform")?.addEventListener("submit", e => e.preventDefault())
    }, [status])

    if (!myHash) {
        alert("로그인이 필요한 서비스입니다!")
        window.location.href = "/login"
        return
    }
    
    const status_0 = (
        <div className="us_container">
            <h1 className="us_title">프린터 컴퓨터에 제시된 번호를 입력하세요</h1>
            { warning ? <div className="us_warning">{warning}</div> : null }
            <input type="text" className="us_new_input" id="printerNumber" autoComplete="off" placeholder="예시) 8080" />
            <input type="button" className='us_submit' onClick={() => connectToPrinter(setUUID, setCode, setWarning, setStatus)} value="프린터와 연결하기" />
        </div>
    )

    const status_1 = (
        <div className="us_container">
            <h1 className="us_title">프린터로 전송할 파일을 선택하세요</h1>
            { warning ? <div className="us_warning">{warning}</div> : null }
            { success ? <div className="us_success">{success}</div> : null }
            
            <form id="nothingtodoform">
                <input type="checkbox" id="blockchain" checked />
                <label htmlFor="blockchain">블록체인으로 위조 방지하기</label>
                <label htmlFor="printerFileInput">
                    <div id="file_selection_btn" className='us_submit us_file_input'>
                        파일 선택하기
                    </div>
                </label>

                <input type="file" className="us_file_input" hidden id="printerFileInput" />

                <button type="submit" hidden></button>
            </form>

            <div className="us_file_send_popup_background us_no_display"></div>
            <div className="us_file_send_popup us_container us_no_display">
                <h1 className="us_weak_h1">결제하기</h1>
                <div className="us_container us_even_container">
                    {
                        (() => {
                            if (currentTokens == -1) {
                                return <div className="us_curr_token_div">결제 후 토큰: &lt;불러오는 중...&gt;</div>
                            }
                            return <div className="us_curr_token_div">결제 후 토큰: {currentTokens} - 1 = {currentTokens - 1}</div> 
                        })()
                    }
                    {
                        (() => {
                            if (selectedFile != null) {
                                return (<>
                                    <div className="us_curr_token_div">선택된 파일: {selectedFile.name}</div>
                                    <button className="us_submit" id="verify_payment" onClick={() => sign_transaction(setSuccess, myHash, selectedFile, uuid, code.toString())}>승인</button>
                                </>)
                            }

                            return (<>
                                <div className="us_curr_token_div">선택된 파일: &lt;null&gt;</div>
                                <button className="us_submit us_submit_deactivated" id="verify_payment">승인</button>
                            </>)
                        })()
                    }
                    
                </div>
            </div>
        </div>
    )

    let to_return = (<></>)

    if (status == 0) {
        to_return = status_0
    } else if (status == 1) {
        to_return = status_1
    }

    return to_return
}