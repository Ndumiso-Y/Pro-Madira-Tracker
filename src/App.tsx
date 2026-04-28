import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './modules/dashboard/Dashboard';
import JobList from './modules/jobs/JobList';
import NewJobForm from './modules/jobs/NewJobForm';
import JobDetail from './modules/jobs/JobDetail';
import OEMList from './modules/oems/OEMList';
import QuotesList from './modules/quotes/QuotesList';
import WaybillsList from './modules/waybills/WaybillsList';
import DocumentList from './modules/documents/DocumentList';
import ClientList from './modules/clients/ClientList';
import Reports from './modules/reports/Reports';
import Settings from './modules/settings/Settings';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="jobs" element={<JobList />} />
              <Route path="jobs/new" element={<NewJobForm />} />
              <Route path="jobs/:id" element={<JobDetail />} />
              <Route path="oems" element={<OEMList />} />
              <Route path="quotes" element={<QuotesList />} />
              <Route path="waybills" element={<WaybillsList />} />
              <Route path="documents" element={<DocumentList />} />
              <Route path="clients" element={<ClientList />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
