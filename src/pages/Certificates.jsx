import React, { useState } from "react";
import "../App.css";
import BarangayClearance from "./CertificatePages/BarangayClearance";
import CertificateOfResidency from "./CertificatePages/CertificateResidency";
import CertificateOfIndigency from "./CertificatePages/CertificateIndigency";
import CommonLaw from "./CertificatePages/CommonLaw";
import BusinessClearance from "./CertificatePages/BusinessClearance";
import TravelPermit from "./CertificatePages/TravelPermit";
import Guardianship from "./CertificatePages/Guardianship";
import JobSeeker from "./CertificatePages/JobSeeker";
import CertificateSoloParent from "./CertificatePages/CertificateSoloParent";

function Certificates() {
  const certificates = [
    {
      title: "Barangay Clearance",
      description: "This is a general clearance that verifies the person has no pending cases or derogatory records in the barangay.",
      component: <BarangayClearance />,
    },
    {
      title: "Certificate of Residency",
      description: "This certifies that a person is a resident of the barangay.",
      component: <CertificateOfResidency />,
    },
    {
      title: "Certificate of Indigency",
      description: "This certifies that the person or family belongs to the indigent sector of the community.",
      component: <CertificateOfIndigency />,
    },
    {
      title: "Common Law",
      description: "This certificate pertains to common law details.",
      component: <CommonLaw />,
    },
    {
      title: "Business Clearance",
      description: "This is issued to business owners within the barangay as a requirement for a business permit.",
      component: <BusinessClearance />,
    },
    {
      title: "Travel Permit",
      description: "This certifies permission for specific travel purposes.",
      component: <TravelPermit />,
    },
    {
      title: "Guardianship",
      description: "This certifies guardianship details as recognized by the barangay.",
      component: <Guardianship />,
    },
    {
      title: "First Time Job Seeker",
      description: "This certificate is issued for first-time job seekers in the barangay.",
      component: <JobSeeker />,
    },
    {
      title: "Certificate for Solo Parents",
      description: "This certifies that the person is a solo parent as defined by law.",
      component: <CertificateSoloParent />,
    },
  ];

  const [activeCertificate, setActiveCertificate] = useState(null);

  return (
    <section className="hide-scrollbar">
      {activeCertificate === null && (
        <div className="h-14 flex items-center border-b-2 border-gray-400">
          <h1 className="text-2xl font-semibold text-gray-800">
            Certificate Issuance
          </h1>
        </div>
      )}

      {activeCertificate === null ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
          {certificates.map((certificate, index) => (
            <div key={index} className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <div className="p-5">
                <h5 className="text-lg font-semibold text-Green mb-3">
                  {certificate.title}
                </h5>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {certificate.description}
                </p>
              </div>

              <button onClick={() => setActiveCertificate(certificate)} className="mt-auto bg-Green text-white text-center py-3 text-sm font-bold uppercase hover:bg-green-600 transition-colors duration-300">
                Issue Certificate
              </button>
            </div>
          ))}
        </div>
      ) : (
        React.cloneElement(activeCertificate.component, {
          setActiveCertificate,
        })
      )}
    </section>
  );
}

export default Certificates;
