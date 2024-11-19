import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Import components
import Logout from './pages/Logout';
import Login from './auth/Login';
import OTPVerification from './auth/OTP-Verification';

//CERTIFICATES
import BrgyClearance from './Certificates/BrgyClearance';
import CertificateOfRecidency from './Certificates/CertificateOfRecidency';
import CertificateOfIndigency from './Certificates/CertificateOfIndigency';
import GuardianshipCertificate from './Certificates/GuardianshipCertificate';
import CertificateOfBusinessClearance from './Certificates/CertificateOfBusinessClearance';
import TravelpermitCertificate from './Certificates/TravelPermitCertificate';
import CommonLawCertificate from './Certificates/CommonLawCertificate';
import JobSeekerCertificate from './Certificates/JobSeekerCertificate';
import CertificateForSoloParent from './Certificates/CertificateForSoloParent';

import CreateAccount from './auth/CreateAccount';

//VIEW DETAILS IMPORT 
import BarangayClearanceViewDetails from './view/BarangayClearanceViewDetails';
import ResidencyViewDetails from './view/ResidencyViewDetails';
import IndigencyViewDetails from './view/IndigencyViewDetails';
import CommonLawViewDetails from './view/CommonLawViewDetails';
import BusinessClearanceViewDetails from './view/BusinessClearanceViewDetails';
import TravelPermitViewDetails from './view/TravelPermitViewDetails';
import GuardianshipViewDetails from './view/GuardianshipViewDetails';
import JobSeekerViewDetails from './view/JobSeekerViewDetails';
import SoloParentViewDetails from './view/SoloParentViewDetails';
import NewHome from './pages/New-Home';
import NewHeader from './pages/New-Header';
import NewSidebar from './pages/New-Sidebar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const location = useLocation();

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <main>
      {isLoggedIn && location.pathname !== '/otp-verification' && (
        <>
          <NewHeader />
        </>
      )}

      <Routes>
        {isLoggedIn ? (
          <>
          <Route path="/" element={<NewHome />} />
          <Route path="/new-header" element={<NewHeader />} />
          <Route path="/new-sidebar" element={<NewSidebar />} />

            <Route path='/signup' element={<CreateAccount />} />
            <Route path='/logout' element={<Logout onLogout={handleLogout} />} />

            {/* Barangay Certificates */}
            <Route path='/barangay-clearance-certificate/:id' element={<BrgyClearance />} />
            <Route path='/barangay-certificate-of-residency/:id' element={<CertificateOfRecidency />} />
            <Route path='/barangay-certificate-of-indigency/:id' element={<CertificateOfIndigency />} />
            <Route path='/barangay-guardianship-certificate/:id' element={<GuardianshipCertificate />} />
            <Route path='/barangay-certificate-of-business-clearance/:id' element={<CertificateOfBusinessClearance />} />
            <Route path='/barangay-travel-permit-certificate/:id' element={<TravelpermitCertificate />} />
            <Route path='/barangay-common-law-certificate/:id' element={<CommonLawCertificate />} />
            <Route path='/barangay-job-seeker-certificate/:id' element={<JobSeekerCertificate />} />
            <Route path='/barangay-certificate-for-solo-parent/:id' element={<CertificateForSoloParent />} />

            {/* View Details */}
            <Route path="/view-details-barangay-clearance/:id" element={<BarangayClearanceViewDetails />} />
            <Route path='/view-details-residency/:id' element={<ResidencyViewDetails />} />
            <Route path='/view-details-indigency/:id' element={<IndigencyViewDetails />} />
            <Route path='/view-details-common-law/:id' element={<CommonLawViewDetails />} />
            <Route path='/view-details-business-clearance/:id' element={<BusinessClearanceViewDetails />} />
            <Route path='/view-details-travel-permit/:id' element={<TravelPermitViewDetails />} />
            <Route path='/view-details-guardianship/:id' element={<GuardianshipViewDetails />} />
            <Route path='/view-details-job-seeker/:id' element={<JobSeekerViewDetails />} />
            <Route path='/view-details-solo-parent/:id' element={<SoloParentViewDetails />} />

            <Route path='/otp-verification' element={<OTPVerification />} />
          </>
        ) : (
          <Route path='/login' element={<Login onLogin={handleLogin} />} />
        )}

        <Route path="*" element={<Navigate to={isLoggedIn ? '/' : '/login'} />} />
      </Routes>
    </main>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
