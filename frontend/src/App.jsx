import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contato from './pages/Contato';
import MentoriaDetail from './pages/MentoriaDetail';
import Dashboard from './pages/Dashboard';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#0b0f19] text-slate-100 selection:bg-primary selection:text-dark">
        {/* Floating background glows */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-primary/5 blur-[140px]"></div>
        </div>

        {/* Global Navigation Header */}
        <Header />

        {/* Main Route Content */}
        <main className="flex-grow z-10 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/mentoria/:slug" element={<MentoriaDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
