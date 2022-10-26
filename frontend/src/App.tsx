import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Configuration } from './api';
import { HealthApi } from './api/api/health-api';
import './App.css';
import { AppContext } from './contexts/AppContext';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';

export default function App() {
  const configuration = new Configuration({
    basePath: 'http://localhost:3000',
  });
  const healthApi = new HealthApi(configuration);
  const [health, setHealth] = useState('loading');

  React.useEffect(() => {
    healthApi.healthControllerCheck().then((res) => {
      if (res.data.status) {
        setHealth(res.data.status);
      }
    });
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}
