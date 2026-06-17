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
import PortfolioList from './pages/PortfolioList/PortfolioList';
import PortfolioGallery from './pages/PortfolioGallery/PortfolioGallery';
import ClientGallery from './pages/ClientGallery/ClientGallery';

function AppShell() {
  const { pathname } = useLocation();
  const isHome      = pathname === '/' || pathname === '/home';
  // /portfolio (list page) shows site header; /portfolio/:slug (individual gallery) does not
  const isGalleryPage = /^\/portfolio\/.+/.test(pathname) || pathname.startsWith('/client');
  const isFullPage  = isHome || isGalleryPage;

  return (
    <div className="app-shell">
      {!isFullPage && <Header />}
      <main className={isFullPage ? 'main-full' : 'main-content'}>
        <Routes>
          <Route path="/"                       element={<Home />} />
          <Route path="/home"                   element={<Home2 />} />
          <Route path="/studios"                element={<Studios />} />
          <Route path="/media"                  element={<Media />} />
          <Route path="/digitals"               element={<Digitals />} />
          <Route path="/about"                  element={<About />} />
          <Route path="/contact"                element={<Contact />} />
          <Route path="/wedding-quotation"      element={<WeddingQuotation />} />
          {/* Portfolio list (with site header) and individual gallery (own header) */}
          <Route path="/portfolio"              element={<PortfolioList />} />
          <Route path="/portfolio/:slug"        element={<PortfolioGallery />} />
          <Route path="/client/:galleryId"      element={<ClientGallery />} />
          <Route path="/client"                 element={<ClientGallery />} />
        </Routes>
      </main>
      {/* Hide footer on standalone client gallery */}
      {!pathname.startsWith('/client') && <Footer />}
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
