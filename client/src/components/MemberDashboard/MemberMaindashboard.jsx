import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MemberSidebar from './layout/MemberSidebar';
import MemberDashboard from './MemberDashboard';
import MemberSubmitRequest from './MemberSubmitrequest';
import MemberDonor from './MemberDonorRequest';
import Accounts from './MemberAccount';
import MemberSubmitHistory from './MemberSubmitHistory';
import MemberDonorHistory from './MemberDonorHistory';
import Certificate from './MemberCertificate';
import MemberProfile from './MemberProfile';
import MemberHeader from './layout/MemberHeader';
import MemberCertificateView from './memberCertificateView';

const MemberMainDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const location = useLocation();
    const navigate = useNavigate();

    // Update active tab when returning from profile
    useEffect(() => {
        if (location.pathname === '/member') {
            setActiveTab('dashboard');
        }
    }, [location.pathname]);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        if (location.pathname === '/member/profile'|| location.pathname.includes('/membercertificate')) {
            navigate('/member');
        }
    };

    const renderContent = () => {
        if (location.pathname === '/member/profile') {
            return <MemberProfile />;
        }
        if (location.pathname.includes('/membercertificate')) {
            return <MemberCertificateView />;
        }

        switch (activeTab) {
            case 'dashboard':
                return <MemberDashboard />;
            case 'submit-request':
                return <MemberSubmitRequest />;
            case 'doner-request':
                return <MemberDonor />;
            case 'accounts':
                return <Accounts />;
            case 'submit-history':
                return <MemberSubmitHistory />;
            case 'Donor-history':
                return <MemberDonorHistory />;
            case 'certificate':
                return <Certificate />;
            default:
                return <MemberDashboard />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <MemberSidebar activeTab={activeTab} setActiveTab={handleTabChange} />
            <main className="flex-1 md:ml-64 overflow-y-auto">
                <MemberHeader/>
                <div className="p-6">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default MemberMainDashboard;