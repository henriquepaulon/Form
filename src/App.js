import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CatsAccordion from './CatsAccordion';
import MultiStepForm from './MultiStepForm';
import styles from './App.module.css'; // importa os estilos

function App() {
  return (
    <Router>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.navLink}>Lista de Gatos</Link>
        <Link to="/formulario" className={styles.navLink}>Formulário</Link>
      </nav>

      <div className={styles.pageContent}>
        <Routes>
          <Route path="/" element={<CatsAccordion />} />
          <Route path="/formulario" element={<MultiStepForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
