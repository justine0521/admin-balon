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
import Transactions from './pages/Transactions';
import Logout from './pages/Logout';
import Login from './auth/Login';

//CERTIFICATE PAGES
import RequestedCertificate from './pages/RequestedCertificate';

import BarangayClearance from './pages/CertificatePages/BarangayClearance';
import BusinessClearance from './pages/CertificatePages/BusinessClearance';
import CertificateIndigency from './pages/CertificatePages/CertificateIndigency';
import CommonLaw from './pages/CertificatePages/CommonLaw';
import CertificateResidency from './pages/CertificatePages/CertificateResidency';
import CertificateSoloParent from './pages/CertificatePages/CertificateSoloParent';
import Guardianship from './pages/CertificatePages/Guardianship';
import JobSeeker from './pages/CertificatePages/JobSeeker';
import TravelPermit from './pages/CertificatePages/TravelPermit';

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

import EditResidence from './Modal/EditResidenceModal';
import Settings from './pages/Settings';
import BarangayInfo from './settings/BarangayInfo';
import Profile from './pages/Profile';
import Accounts from './settings/Accounts';
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
              <Route path='/transactions' element={<Transactions />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/logout' element={<Logout onLogout={handleLogout} />} />
              <Route path='profile' element={<Profile />} />

              <Route path='/view-resident-profile' element={<ViewResidentProfile />} />
              <Route path='/edit-residence-profile' element={<EditResidence />} />

              {/* Certificate Pages */}
              <Route path='/barangay-clearance' element={<BarangayClearance />} />
              <Route path='/certificate-of-residency' element={<CertificateResidency />} />
              <Route path='/certificate-of-indigency' element={<CertificateIndigency />} />
              <Route path='/guardianship' element={<Guardianship />} />
              <Route path='/business-clearance' element={<BusinessClearance />} />
              <Route path='/travel-permit' element={<TravelPermit />} />
              <Route path='/common-law' element={<CommonLaw />} />
              <Route path='/job-seeker' element={<JobSeeker />} />
              <Route path='/certificate-for-solo-parent' element={<CertificateSoloParent />} />
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

              //VIEW DETAILS PATH
              <Route path="/view-details-barangay-clearance/:id" element={<BarangayClearanceViewDetails />} />
              <Route path='/view-details-residency/:id' element={<ResidencyViewDetails />}/>
              <Route path='/view-details-indigency/:id' element={<IndigencyViewDetails />}/>
              <Route path='/view-details-common-law/:id'element={<CommonLawViewDetails />}/>
              <Route path='/view-details-business-clearance/:id' element={<BusinessClearanceViewDetails />}  />
              <Route path='/view-details-travel-permit/:id' element={<TravelPermitViewDetails />}/>
              <Route path='/view-details-guardianship/:id' element={<GuardianshipViewDetails />}/>
              <Route path='/view-details-job-seeker/:id' element={<JobSeekerViewDetails />}/>
              <Route path='/view-details-solo-parent/:id' element={<SoloParentViewDetails />}/>

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
