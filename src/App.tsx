import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { YouTubeForm } from "./components/YouTubeForm";
import { YupYouTubeForm } from "./components/YupYoutubeForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <YouTubeForm />
        <br />
        <YupYouTubeForm />
      </div>
    </>
  );
}

export default App;
