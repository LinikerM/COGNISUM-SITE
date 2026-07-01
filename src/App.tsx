import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Contato } from './pages/Contato';
import { Cursos } from './pages/Cursos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cursos" element={<Cursos />} />
          <Route path="contato" element={<Contato />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
