import React from 'react';
import { Layout } from './components/layout';
import  InvitationDashboard from './components/dashboard/InvitationDashboard';

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <InvitationDashboard />
    </Layout>
  );
};

export default DashboardPage;