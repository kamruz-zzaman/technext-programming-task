import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import { Container } from 'react-bootstrap';
function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Container>
  );
}

export default App;
