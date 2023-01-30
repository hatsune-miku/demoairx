import "./App.scss"
import Main from "./components/Main"
import { useColorScheme } from "@mui/joy"

function App() {
  const { mode, setMode } = useColorScheme()
  function toggleMode() {
    setMode(mode === "light" ? "dark" : "light")
  }
  setMode("dark")
  return (
    <div className="main-div">
      <Main></Main>
    </div>
  )
}

export default App
