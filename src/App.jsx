import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Residence from './pages/Residence';
import Deceased from './pages/Deceased';
import Certificates from './pages/Certificates';
import Blotter from './pages/Blotter';
import Officials from './pages/Officials';
import Revenue from './pages/Revenue';
import Footer from './components/Footer';
import ViewResidentProfile from './view/ViewResidentProfile';
import Announcement from './pages/Announcement';
import Blocked from './pages/Blocked';
import Logout from './pages/Logout';
import Login from './auth/Login';
import RequestedCertificate from './pages/RequestedCertificate';
import BarangayClearance from './pages/CertificatePages/BarangayClearance';
import BusinessClearance from './pages/CertificatePages/BusinessClearance';
import DeathCertificate from './pages/CertificatePages/DeathCertificate';
import CertificateIndigency from './pages/CertificatePages/CertificateIndigency';
import CertificateLowIncome from './pages/CertificatePages/CertificateLowIncome';
import CertificateResidency from './pages/CertificatePages/CertificateResidency';
import CertificateSoloParent from './pages/CertificatePages/CertificateSoloParent';
import GoodMoralCertificate from './pages/CertificatePages/GoodMoralCertificate';
import NewResidentCertificate from './pages/CertificatePages/NewResidentCertificate';
import NoPropertyCertificate from './pages/CertificatePages/NoPropertyCertificate';
import BrgyClearance from './Certificates/BrgyClearance';
import CertificateOfRecidency from './Certificates/CertificateOfRecidency';
import CertificateOfIndigency from './Certificates/CertificateOfIndigency';
import CertificateOfGoodMoral from './Certificates/CertificateOfGoodMoral';
import CertificateOfBusinessClearance from './Certificates/CertificateOfBusinessClearance';
import CertificateOfDeath from './Certificates/CertificateOfDeath';
import CertificateOfNoProperty from './Certificates/CertificateOfNoProperty';
import CertificateOfLowIncome from './Certificates/CertificateOfLowIncome';
import CertificateOfNewResident from './Certificates/CertificateOfNewResident';
import CertificateForSoloParent from './Certificates/CertificateForSoloParent';
import EditResidence from './Modal/EditResidenceModal';
import Settings from './pages/Settings';
import BarangayInfo from './settings/BarangayInfo';
import Profile from './pages/Profile';
import Accounts from './settings/Accounts';
import CreateAccount from './auth/CreateAccount';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <main>
        {isLoggedIn ? (
          <>
            <Header />
            <Sidebar />

            <Routes>
              <Route path='signup' element={<CreateAccount />} />

              {/* Sidebar Routes */}
              <Route path="/" element={<Home />} />
              <Route path='/residence-Record' element={<Residence />} />
              <Route path='/deceased' element={<Deceased />} />
              <Route path='/certificates' element={<Certificates />} />
              <Route path='/blotter' element={<Blotter />} />
              <Route path='/officials-and-staff' element={<Officials />} />
              <Route path='/revenue' element={<Revenue />} />
              <Route path='/requested-certificate' element={<RequestedCertificate />} />
              <Route path='/announcement' element={<Announcement />} />
              <Route path='/blocklisted' element={<Blocked />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/logout' element={<Logout onLogout={handleLogout} />} />
              <Route path='profile' element={<Profile />} />

              <Route path='/view-resident-profile' element={<ViewResidentProfile />} />
              <Route path='/edit-residence-profile' element={<EditResidence />} />

              {/* Certificate Pages */}
              <Route path='/barangay-clearance' element={<BarangayClearance />} />
              <Route path='/certificate-of-residency' element={<CertificateResidency />} />
              <Route path='/certificate-of-indigency' element={<CertificateIndigency />} />
              <Route path='/certificate-of-good-moral-character' element={<GoodMoralCertificate />} />
              <Route path='/business-clearance' element={<BusinessClearance />} />
              <Route path='/certificate-of-death' element={<DeathCertificate />} />
              <Route path='/certificate-of-no-property' element={<NoPropertyCertificate />} />
              <Route path='/certificate-of-low-income' element={<CertificateLowIncome />} />
              <Route path='/certificate-of-registration-for-new-residents' element={<NewResidentCertificate />} />
              <Route path='/certificate-for-solo-parent' element={<CertificateSoloParent />} />
              {/* Barangay Certificates */}
              <Route path='/barangay-clearance-certificate/:id' element={<BrgyClearance />} />
              <Route path='/barangay-certificate-of-residency' element={<CertificateOfRecidency />} />
              <Route path='/barangay-certificate-of-indigency' element={<CertificateOfIndigency />} />
              <Route path='/barangay-certificate-of-good-moral' element={<CertificateOfGoodMoral />} />
              <Route path='/barangay-certificate-of-business-clearance' element={<CertificateOfBusinessClearance />} />
              <Route path='/barangay-certificate-of-death' element={<CertificateOfDeath />} />
              <Route path='/barangay-certificate-of-no-property' element={<CertificateOfNoProperty />} />
              <Route path='/barangay-certificate-of-low-income' element={<CertificateOfLowIncome />} />
              <Route path='/barangay-certificate-of-new-resident' element={<CertificateOfNewResident />} />
              <Route path='/barangay-certificate-for-solo-parent' element={<CertificateForSoloParent />} />

              {/* Settings */}
              <Route path='/barangayInfo' element={<BarangayInfo />} />
              <Route path='/accounts' element={<Accounts />} />
            </Routes>
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </main>
    </BrowserRouter>
  );
}

export default App;
