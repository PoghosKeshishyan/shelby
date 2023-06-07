import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage'
import { TourDetailPage } from './pages/TourDetailPage';
import { AboutPage } from './pages/AboutPage';
import { AdminBookingPage } from './admin/AdminBookingPage';
import { AdminAddPackagesPage } from './admin/AdminAddPackagesPage';
import axios from './axios';

export function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [navbar, setNavbar] = useState([]);
  const [footer, setFooter] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('shelby-Language')) {
      localStorage.setItem('shelby-Language', 'en');
    }
    
    loadingData();
    setCurrentLanguage(localStorage.getItem('shelby-Language'));
  }, [currentLanguage])

  async function loadingData() {
    const navbarData = await axios.get(`navbar?lang=${currentLanguage}`);
    setNavbar(navbarData.data);
    const footerData = await axios.get(`footer?lang=${currentLanguage}`);
    setFooter(footerData.data);
  }

  return (
    <div className='App'>
      <Header navbar={navbar} />

      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/booking' element={<BookingPage />} />
          <Route path='/booking/:id' element={<TourDetailPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/45a5ds4fsdd5sdf545sd/admin/booking' element={<AdminBookingPage />} />
          <Route path='/56s4df45d64f5d45f546/admin/add/packages' element={<AdminAddPackagesPage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </main>
      
      <Footer footer={footer} />
    </div>
  );
}