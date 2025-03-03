import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { SlBadge } from "react-icons/sl";
import * as htmlToImage from 'html-to-image';

function MemberCertificateView() {
    const location = useLocation();
    const navigate = useNavigate();
    const certificate = location.state?.certificate;
    const certificateContainerRef = useRef(null);

    const downloadCertificate = async () => {
        if (certificateContainerRef.current) {
            try {
                // Create a temporary container for the download version
                const tempContainer = document.createElement('div');
                tempContainer.style.position = 'absolute';
                tempContainer.style.left = '-9999px';
                tempContainer.style.top = '-9999px';
                document.body.appendChild(tempContainer);

                // Clone the certificate content
                const certificateClone = certificateContainerRef.current.cloneNode(true);
                
                // Set fixed dimensions and styles for the download version
                certificateClone.style.width = '800px';
                certificateClone.style.height = '600px';
                certificateClone.style.transform = 'none';
                certificateClone.style.position = 'relative';
                certificateClone.style.backgroundColor = '#ffffff';
                certificateClone.style.padding = '32px'; // Add consistent padding

                // Find the inner border container and adjust its styles
                const innerContainer = certificateClone.querySelector('.border-4');
                if (innerContainer) {
                    innerContainer.style.height = 'calc(100% - 64px)'; // Adjust for padding
                    innerContainer.style.margin = '0';
                    innerContainer.style.padding = '48px 32px';
                }

                // Ensure all child elements are properly scaled
                const elements = certificateClone.getElementsByTagName('*');
                for (let el of elements) {
                    el.style.transform = 'none';
                    if (el.style.fontSize) {
                        const size = parseInt(el.style.fontSize);
                        if (!isNaN(size)) {
                            el.style.fontSize = `${size}px`;
                        }
                    }
                }

                tempContainer.appendChild(certificateClone);

                // Generate the image with fixed dimensions
                const dataUrl = await htmlToImage.toPng(certificateClone, {
                    width: 800,
                    height: 600,
                    backgroundColor: '#ffffff',
                    quality: 1.0,
                    style: {
                        transform: 'none',
                        zoom: 1,
                    },
                    fontEmbedCSS: '',
                    pixelRatio: 2,
                });

                document.body.removeChild(tempContainer);

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
        <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 px-2 sm:px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mb-6 lg:mt-14">
                    {/* <button
                        onClick={() => navigate("/member")}
                        className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Certificates
                    </button> */}
                    <button
                        onClick={downloadCertificate}
                        className="flex items-center gap-2 bg-[#fca311] text-white px-4 py-2 rounded-md hover:bg-[#1c2b4a] transition-colors w-full sm:w-auto justify-center"
                    >
                        <Download className="w-4 h-4" />
                        Download Certificate
                    </button>
                </div>

                <div className="bg-white p-2 sm:p-4 lg:p-8 rounded-lg shadow-lg">
                    <div 
                        ref={certificateContainerRef}
                        className="bg-white aspect-[4/3] w-full"
                        style={{
                            backgroundColor: '#ffffff',
                            maxWidth: '800px',
                            margin: '0 auto',
                        }}
                    >
                        <div className="relative border-4 border-[#14213d] p-4 sm:p-6 lg:p-8 rounded-lg bg-white md:h-[450px] lg:h-[500px]">
                            <div className="text-center mb-4 sm:mb-8">
                                <h1
                                    className="text-[#2b2c43] mb-2"
                                    style={{ fontFamily: "Inter" }}
                                >
                                    <span className="text-xl sm:text-3xl lg:text-5xl font-bold">CERTIFICATE</span>
                                    <br />
                                    <span className="font-semibold text-xs sm:text-sm">Of Appreciation</span>
                                </h1>

                                <p className="text-gray-600 text-sm sm:text-base">
                                    This Certificate is Proudly Presented To
                                </p>
                            </div>

                            {/* Donor Name */}
                            <div className="text-center mb-4">
                                <h2
                                    className="text-lg md:text-xl lg:text-4xl text-[#2b2c43]"
                                    style={{ fontFamily: "Dancing Script" }}
                                >
                                    {certificate.donorName}
                                </h2>
                                <h1 className="border-t w-[200px] sm:w-[260px] lg:w-[300px] mx-auto border-[#2b2c43]"></h1>
                            </div>

                            {/* Certificate Details */}
                            <div className="text-center mb-4 sm:mb-8">
                                <p className="text-gray-700 leading-relaxed text-xs lg:text-base">
                                    In recognition of their generous donation {" "}
                                    {certificate.donationId.itemName.toLowerCase() === "money"
                                        ? `donation of ${certificate.donationId.amount}`
                                        : `contribution of ${certificate.donationId.count} ${certificate.donationId.itemName}`}, making a difference in the lives of those in need. Your kindness fuels hope and change.
                                </p>
                            </div>

                            <div className="flex justify-between items-end mb-4">
                                <div className="grid gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600 text-xs sm:text-sm">Issued by:</p>
                                        <p className="font-medium text-xs">{certificate.issuedBy}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-xs sm:text-sm">Issued Date:</p>
                                        <p className="font-medium text-xs">
                                            {new Date(certificate.issuedDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 sm:gap-8">
                                    <SlBadge className="h-10 w-10 lg:h-16 lg:w-16 text-[#fecd2e]" />
                                    <div className="text-right">
                                        {certificate.signature && (
                                            <div className="mb-2">
                                                <img
                                                    src={certificate.signature}
                                                    alt="Signature"
                                                    className="h-6 md:h-10 object-contain"
                                                />
                                            </div>
                                        )}
                                        <h1 className="border-t w-[100px] sm:w-[120px] mx-auto border-[#2b2c43]"></h1>
                                        <h1 className="mt-2 text-center text-sm">{certificate.issuedBy}</h1>
                                    </div>
                                </div>
                            </div>

                            {/* Corner Decorations */}
                            <div className="absolute top-0 left-0 w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 border-t-4 border-l-4 border-[#14213d]"></div>
                            <div className="absolute top-0 right-0 w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 border-t-4 border-r-4 border-[#14213d]"></div>
                            <div className="absolute bottom-0 left-0 w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 border-b-4 border-l-4 border-[#14213d]"></div>
                            <div className="absolute bottom-0 right-0 w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 border-b-4 border-r-4 border-[#14213d]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MemberCertificateView;