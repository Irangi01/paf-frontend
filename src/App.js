import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CommunityList from '../src/components/CommunityList';
import CreateCommunity from './pages/CreateCommunity';
import './App.css';

function App() {
  const [communities, setCommunities] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const showAlert = (message, severity = 'success') => {
    setAlert({ open: true, message, severity });
    setTimeout(() => setAlert({ ...alert, open: false }), 3000);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={
            <CommunityList 
              communities={communities} 
              setCommunities={setCommunities} 
              alert={alert}
              showAlert={showAlert}
            />
          } 
        />
        <Route 
          path="/create-community" 
          element={
            <CreateCommunity 
              setCommunities={setCommunities} 
              showAlert={showAlert}
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;