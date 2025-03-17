import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/sidebar';
import './dashboard.css'; // Ensure you have the right CSS import

const DashboardLayout = () => {
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content">
                <Outlet /> {/* This will render the nested route component */}
            </div>
        </div>
    );
};

export default DashboardLayout;