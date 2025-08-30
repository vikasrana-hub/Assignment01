import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './page/Dashboard'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/Property/:id' element={<Dashboard/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
