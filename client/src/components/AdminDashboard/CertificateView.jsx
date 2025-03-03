import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { SlBadge } from "react-icons/sl";
import * as htmlToImage from 'html-to-image';

function CertificateView() {
    const location = useLocation();
    const navigate = useNavigate();
    const certificate = location.state?.certificate;
    const certificateContainerRef = useRef(null);

    const downloadCertificate = async () => {
        if (certificateContainerRef.current) {
            try {
                const dataUrl = await htmlToImage.toPng(certificateContainerRef.current, {
                    backgroundColor: '#ffffff',
                    style: {
                        background: '#ffffff',
                    },
                    quality: 1.0,
                });
                const link = document.createElement('a');
                link.download = `${certificate.donorName}-certificate.png`;
                link.href = dataUrl;
                link.click();
            } catch (error) {
                console.error('Error downloading certificate:', error);
            }
        }
    };

    if (!certificate) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Certificate not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-end items-center mb-6 lg:mt-14">
                    {/* <button
                        onClick={() => navigate("/admin")}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Certificates
                    </button> */}
                    <button
                        onClick={downloadCertificate}
                        className="flex items-center gap-2 bg-[#fca311] text-white px-4 py-2 rounded-md hover:bg-[#1c2b4a] transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Download Certificate
                    </button>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div 
                        ref={certificateContainerRef}
                        className="bg-white"
                        style={{
                            backgroundColor: '#ffffff',
                            width: '100%',
                            maxWidth: '800px',
                            margin: '0 auto',
                            padding: '20px'
                        }}
                    >
                        <div 
                            className="relative border-4 border-[#14213d] p-8 rounded-lg bg-white mb-8"
                        >
                            <div className="text-center mb-8">
                                <h1
                                    className="text-[#2b2c43] mb-2"
                                    style={{ fontFamily: "Inter" }}
                                >
                                    <span className="text-sm md:text-lg lg:text-5xl font-bold ">CERTIFICATE</span>
                                    <br />
                                    <span className="font-semibold text-sm">Of Achievement</span>
                                </h1>

                                <p className="text-gray-600">
                                    This Certificate is Proudly Presented To
                                </p>
                            </div>

                            {/* Donor Name */}
                            <div className="text-center mb-8">
                                <h2
                                    className="text-4xl text-[#2b2c43]"
                                    style={{ fontFamily: "Dancing Script" }}
                                >
                                    {certificate.donorName}
                                </h2>
                                <h1 className="border-t md:w-[260px] lg:w-[300px] mx-auto border-[#2b2c43]"></h1>
                            </div>

                            {/* Certificate Details */}
                            <div className="text-center mb-8">
                                <p className="text-gray-700 leading-relaxed">
                                    In recognition of their generous{" "}
                                    {certificate.donationId.itemName.toLowerCase() === "money"
                                        ? `donation of ${certificate.donationId.amount}`
                                        : `contribution of ${certificate.donationId.count} ${certificate.donationId.itemName}`},
                                </p>
                            </div>
                            <div className="flex justify-end items-center gap-10 lg:mr-24">
                                <SlBadge className="h-24 w-24 text-[#fecd2e]" />
                                <div className="text-right">
                                    {certificate.signature && (
                                        <div className="mb-2">
                                            <img
                                                src={certificate.signature}
                                                alt="Signature"
                                                className="h-16 object-contain"
                                            />
                                        </div>
                                    )}
                                    <h1 className="border-t md:w-[130px] mx-auto border-[#2b2c43]"></h1>
                                    <h1 className="mt-2 text-center">{certificate.issuedBy}</h1>
                                </div>
                            </div>

                            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#14213d]"></div>
                            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#14213d]"></div>
                            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#14213d]"></div>
                            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#14213d]"></div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <div className="grid md:grid-cols-2 lg:flex items-end gap-6">
                                <div>
                                    <p className="text-gray-600">Issued by:</p>
                                    <p className="font-medium text-xs">{certificate.issuedBy}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Issued Date:</p>
                                    <p className="font-medium text-xs">
                                        {new Date(certificate.issuedDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Donation ID:</p>
                                    <p className="font-medium text-xs">{certificate._id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CertificateView;