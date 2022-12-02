import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <div className="flex flex-col bg-[#FFFFFF]">
      <Header />
      <h1>Content</h1>
      <Sidebar />
    </div>
  )
}

export default App
