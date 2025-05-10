import { JSX } from "react";
import TopNav from "./components/TopNav";
import BottomFooter from "./components/BottomFooter";

function App({child}: {child: JSX.Element}) {
  const hash = localStorage.getItem("studentHash")

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY != 0) {
      document.querySelector(".navbar")?.classList.add("darknav")
    } else {
      document.querySelector(".navbar")?.classList.remove("darknav")
    }
  });

  return (
    <div className="App">
      <TopNav hash={hash} toggleMyPage={() => window.location.href = "/mypage"} toggleHome={() => window.location.href = "/"} toggleMenu={() => {}} toggleLogin={() => window.location.href = "/login"} />
      {child}
      <BottomFooter />
    </div>
  );
}

export default App;
