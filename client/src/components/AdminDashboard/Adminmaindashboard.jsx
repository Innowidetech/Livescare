import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminSidebar from './layout/AdminSidebar';
import AdminDashboard from './AdminDashboardHome';
import Inventory from './AdminInventory';
import SubmitRequest from './SubmitRequest';
import Donor from './DonorRequest';
import Members from './Members';
import Accounts from './Accounts';
import SubmitRequestHistory from './SubmitRequestHistory';
import DonorRequestHistory from './DonorRequestHistory';
import Certificate from './Certificate';
import Header from './layout/AdminHeader';
import AdminProfile from './AdminProfile';
import Blog from './Blog';
import Program from './Program';
import CertificateView from './CertificateView';

const MainDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/admin') {
            setActiveTab('dashboard');
        }
    }, [location.pathname]);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        if (location.pathname === '/admin/profile' || location.pathname.includes('/certificate/')) {
            navigate('/admin');
        }
    };

    const renderContent = () => {
        if (location.pathname === '/admin/profile') {
            return <AdminProfile />;
        }
        if (location.pathname.includes('/certificate/')) {
            return <CertificateView />;
        }
        switch (activeTab) {
            case 'dashboard':
                return <AdminDashboard />;
            case 'inventory':
                return <Inventory />;
            case 'submit-request':
                return <SubmitRequest />;
            case 'doner-request':
                return <Donor />;
            case 'members':
                return <Members />;
            case 'accounts':
                return <Accounts />;
            case 'submit-history':
                return <SubmitRequestHistory />;
            case 'Donor-history':
                return <DonorRequestHistory />;
            case 'certificate':
                return <Certificate />;
            case 'blog':
                return <Blog />;
            case 'program':
                return <Program />;   
            default:
                return <AdminDashboard />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar activeTab={activeTab} setActiveTab={handleTabChange}/>
            <main className="flex-1 md:ml-64 overflow-y-auto">
                <Header/>
                <div className="p-6">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default MainDashboard;