import './App.scss'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Mainpage from './pages/Mainpage'
import Outfitpage from './pages/Outfitpage'
import Closetpage from './pages/Closetpage'
import Header from './utilities/Header'
import Footer from './utilities/Footer'


function App() {
  // const location = useLocation()
  const style = {}
  // if (location === '/' || location === 'outfit')
  //   style.height = '100vh'


  return (
    <Router >
      <div className="App" style={style}>
        <Header />
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='/outfit' element={<Outfitpage />} />
          <Route path='/closet' element={<Closetpage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;