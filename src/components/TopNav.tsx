import React from "react"
import "../styles/TopNav.css"

const burgerClick = (callback: () => void) => {
    let burger = document.querySelector(".navbar-burger")!!
    const contents = document.querySelector(".navbar-menu")!!
    contents.classList.toggle("navbar-menu-expanded")

    for (const child of burger.children) {
        child.classList.toggle("navbar-burger-line-active")
        callback()
    }
}

const burgerDefault = (callback: () => void) => {
    let burger = document.querySelector(".navbar-burger")!!
    const contents = document.querySelector(".navbar-menu")!!
    contents.classList.remove("navbar-menu-expanded")
    
    for (const child of burger.children) {
        child.classList.remove("navbar-burger-line-active")
        callback()
    }
}

export default function TopNav({hash, toggleHome, toggleMenu, toggleLogin, toggleMyPage}: {hash: string | null, toggleHome: () => void, toggleMenu: () => void, toggleLogin: () => void, toggleMyPage: () => void}) {
    return (
        <div className="navbar">
            <h1 className="navbar-title" onClick={() => burgerDefault(toggleHome)}><span className="upfont">SuJeBI</span></h1>
            <div className="navbar-menu">
                <span className="navbar-menu-help sdownfont" onClick={() => window.location.href = "/usage"}>사용법</span>
                <span className="navbar-menu-help sdownfont" onClick={() => window.location.href = "/verify"}>칭찬하기</span>
                { hash ? <span className="navbar-menu-login sdownfont" onClick={() => burgerDefault(toggleMyPage)}>마이 페이지</span> : <span className="navbar-menu-login" onClick={() => burgerDefault(toggleLogin)}>로그인</span> }
                
            </div>
            <div className="navbar-burger" onClick={() => burgerClick(toggleMenu)}>
              <span className="navbar-burger-line"></span>
              <span className="navbar-burger-line"></span>
              <span className="navbar-burger-line"></span>
            </div>
        </div>
    )
}