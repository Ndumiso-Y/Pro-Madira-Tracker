import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './modules/dashboard/Dashboard';
import JobList from './modules/jobs/JobList';
import JobDetail from './modules/jobs/JobDetail';
import NewJobForm from './modules/jobs/NewJobForm';
import OEMList from './modules/oems/OEMList';
import QuotesList from './modules/quotes/QuotesList';
import WaybillsList from './modules/waybills/WaybillsList';
import DocumentList from './modules/documents/DocumentList';
import ClientList from './modules/clients/ClientList';
import Reports from './modules/reports/Reports';
import Settings from './modules/settings/Settings';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
