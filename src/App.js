import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Home2 from './pages/Home2';
import About from './pages/About';
import Contact from './pages/Contact';
import WeddingQuotation from './pages/WeddingQuotation';
import Studios from './pages/Studios';
import Media from './pages/Media';
import Digitals from './pages/Digitals';

function AppShell() {
  const { pathname } = useLocation();
  const isHome = pathname === '/' || pathname === '/home';

  return (
    <div className="app-shell">
      {!isHome && <Header />}
      <main className={isHome ? 'main-full' : 'main-content'}>
        <Routes>
          <Route path="/"                   element={<Home />} />
          <Route path="/home"               element={<Home2 />} />
          <Route path="/studios"            element={<Studios />} />
          <Route path="/media"              element={<Media />} />
          <Route path="/digitals"           element={<Digitals />} />
          <Route path="/about"              element={<About />} />
          <Route path="/contact"            element={<Contact />} />
          <Route path="/wedding-quotation"  element={<WeddingQuotation />} />
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
