import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Home2 from './pages/Home2';
import About from './pages/About';
import Contact from './pages/Contact';
import WeddingQuotation from './pages/WeddingQuotation';

function AppShell() {
  const { pathname } = useLocation();
  const isHome = pathname === '/' || pathname === '/home';

  return (
    <div className="app-shell">
      {!isHome && <Header />}
      <main className={isHome ? 'main-full' : 'main-content'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home2 />} />
          <Route path="/wedding-quotation" element={<WeddingQuotation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
