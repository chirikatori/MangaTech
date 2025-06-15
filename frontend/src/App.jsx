import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Project from './pages/Project'
import TextDetection from './pages/TextDetection'


function App() {

  return (
    <Router>
    <Header />
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Routes>
        <Route path="/" element={<div className='bg-amber-100 min-h-full'><Home /></div>} />
        <Route path="/projects" element={<Project />} />
        <Route path="/text-detection" element={<TextDetection />} />
      </Routes>
    </main>
    <Footer></Footer>
  </Router>
  )
}

export default App
