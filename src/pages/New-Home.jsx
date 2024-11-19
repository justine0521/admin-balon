import React, { useState, useEffect } from "react";
import NewHeader from "./New-Header";
import NewSidebar from "./New-Sidebar";
import NewHero from "./New-Hero";
import Residence from "./Residence";
import Certificates from "./Certificates";
import Officials from "./Officials";
import Announcements from "./Announcement";
import Blocked from "./Blocked";
import Transaction from "./Transactions";

import Profile from "./Profile";
import Settings from "./Settings";

import BarangayClearance from "./CertificatePages/BarangayClearance";
import CertificateOfResidency from "./CertificatePages/CertificateResidency";
import CertificateOfIndigency from "./CertificatePages/CertificateIndigency";
import CommonLaw from "./CertificatePages/CommonLaw";
import BusinessClearance from "./CertificatePages/BusinessClearance";
import TravelPermit from "./CertificatePages/TravelPermit";
import Guardianship from "./CertificatePages/Guardianship";
import JobSeeker from "./CertificatePages/JobSeeker"
import CertificateSoloParent from "./CertificatePages/CertificateSoloParent";

import "../App.css";

function NewHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("Dashboard");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="h-screen">
      <NewHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} setActiveSection={setActiveSection} />

      <div className="flex w-full h-full pt-20 pb-5 px-3">
        <div>
          <NewSidebar isSidebarOpen={isSidebarOpen} activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>

        <div className={`w-full h-fit bg-gray-100 rounded-lg p-3 transition-all duration-300 ${ isSidebarOpen ? "ml-64" : "ml-14"}`}>
          {activeSection === "Dashboard" && <NewHero />}
          {activeSection === "Residence Record" && <Residence />}
          {activeSection === "Certificates" && <Certificates />}
          {activeSection === "Officials" && <Officials />}
          {activeSection === "Announcement" && <Announcements />}
          {activeSection === "Block listed" && <Blocked />}
          {activeSection === "Transaction History" && <Transaction />}

          {activeSection === "Profile" && <Profile />}
          {activeSection === "Settings" && <Settings />}

          {activeSection === "BarangayClearance" && <BarangayClearance />}
          {activeSection === "CertificateOfResidency" && <CertificateOfResidency />}
          {activeSection === "CertificateOfIndigency" && <CertificateOfIndigency />}
          {activeSection === "CommonLaw" && <CommonLaw />}
          {activeSection === "BusinessClearance" && <BusinessClearance />}
          {activeSection === "TravelPermit" && <TravelPermit />}
          {activeSection === "Guardianship" && <Guardianship />}
          {activeSection === "JobSeeker" && <JobSeeker />}
          {activeSection === "CertificateSoloParent" && <CertificateSoloParent />}
        </div>
      </div>
    </main>
  );
}

export default NewHome;
