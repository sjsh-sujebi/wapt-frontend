import { JSX } from "react";
import TopNav from "./components/TopNav";

function App({child}: {child: JSX.Element}) {
  const hash = localStorage.getItem("studentHash")

  return (
    <div className="App">
      <TopNav hash={hash} toggleMyPage={() => window.location.href = "/mypage"} toggleHome={() => window.location.href = "/"} toggleMenu={() => {}} toggleLogin={() => window.location.href = "/login"} />
      {child}
    </div>
  );
}

export default App;
