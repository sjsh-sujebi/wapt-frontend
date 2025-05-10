import React from "react"
import "../styles/TopNav.css"

function applyDarkMode() {
  const scrollY = window.scrollY;

  if (scrollY != 0) {
    document.querySelector(".navbar")?.classList.add("darknav")
    document.querySelector(".navbar-menu-expanded")?.classList.add("darknav-expanded")
    document.querySelector(".navbar-burger")?.classList.add("darknav-burger")
  } else {
    document.querySelector(".navbar")?.classList.remove("darknav")
    document.querySelector(".navbar-menu")?.classList.remove("darknav-expanded")
    document.querySelector(".navbar-burger")?.classList.remove("darknav-burger")
  }
}

const burgerClick = (callback: () => void) => {
    let burger = document.querySelector(".navbar-burger")!!
    const contents = document.querySelector(".navbar-menu")!!
    contents.classList.toggle("navbar-menu-expanded")

    for (const child of burger.children) {
        child.classList.toggle("navbar-burger-line-active")
        callback()
    }
    
    applyDarkMode()
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
    const userOrLoginURL = hash ? "/user" : "/login#svcrq"

    return (
        <div className="navbar">
            <h1 className="navbar-title" onClick={() => burgerDefault(toggleHome)}><span className="sdownfont">WFT</span></h1>
            <div className="navbar-menu">
                <span className="navbar-menu-help sdownfont" onClick={() => window.location.href = "/usage"}>사용법</span>
                {/* <span className="navbar-menu-help sdownfont" onClick={() => window.location.href = "/sujebi"}>기술</span> */}
                <span className="navbar-menu-help sdownfont" onClick={() => window.location.href = userOrLoginURL}>내 컴퓨터용</span>
                <span className="navbar-menu-help sdownfont" onClick={() => window.location.href = "/printer"}>프린터용</span>
                { 
                    // hash ? null : <span className="navbar-menu-register" onClick={() => window.location.href = "/register"}>회원가입</span>
                }
                { 
                    // hash ? <span className="navbar-menu-login sdownfont" onClick={() => burgerDefault(toggleMyPage)}>마이 페이지</span> : <span className="navbar-menu-login" onClick={() => burgerDefault(toggleLogin)}>로그인</span> 
                }
                
            </div>
            <div className="navbar-burger" onClick={() => burgerClick(toggleMenu)}>
              <span className="navbar-burger-line"></span>
              <span className="navbar-burger-line"></span>
              <span className="navbar-burger-line"></span>
            </div>
        </div>
    )
}
