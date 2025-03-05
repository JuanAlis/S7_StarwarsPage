import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Starships from './pages/Starships';
import StarshipsDetail from './pages/StarshipsDetails';
import ProtectedRoute from './components/ProtectedRoute'; 
import AuthModal from './components/AuthModal'; 

function App() {
  return (
    <Router>
      <div className="container-fluid px-0 mx-0">
        <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<AuthModal closeModal={() => {}} />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/starships" element={<Starships />} />
            <Route path="/starships/:id" element={<StarshipsDetail />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
