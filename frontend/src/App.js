import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'

// components:
import Home from './pages/Home'
import PaperDetails from './pages/PaperDetails'
import Navbar from './components/Navbar'

function App() {

  const [chosenPaper, setChosenPaper] = useState(null) // das vom User ausgewählte paper, von dem die Details in PaperDetails angezeigt werden sollen

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
              path="/home"
              element={<Home setChosenPaper={setChosenPaper}/>}
            />
            <Route path="/detail"
            element={<PaperDetails paper={chosenPaper}/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
