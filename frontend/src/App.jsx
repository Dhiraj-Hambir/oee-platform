import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import PermissionProtectedRoute from './components/PermissionProtectedRoute';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import EMSLayout from './pages/EMS/EMSLayout';
import DigitalInput from './pages/EMS/DigitalInput';
import DigitalOutput from './pages/EMS/DigitalOutput';
import Page2 from './pages/EMS/Page2';
import AnalogOutput from './pages/EMS/AnalogOutput';
import MachineDashboard from './pages/EMS/MachineDashboard';
import OeeDashboard from './pages/EMS/OeeDashboard';
import Report from './pages/EMS/Report';
import EnergyConsumption from './pages/EMS/EnergyConsumption';
import EnergyMonitoringDashboard from './pages/EMS/EnergyMonitoringDashboard/EnergyMonitoringDashboard';
import Alerts from './pages/EMS/Alerts/Alerts';
import PowerQualityMonitoring from './pages/EMS/PowerQualityMonitoring/powerQualityMonitoring';
import EventData from './pages/EMS/EventData/EventData';
import AlertSetup from './pages/EMS/AlertSetup/AlertSetup';
import Admin from './pages/Admin/Admin';
import Configuration from './pages/Configuration/Configuration';
import Checklist from './pages/CHECKLIST/Checklist';
import Mint from './pages/Mint/Mint';
import Quality from './pages/QUALITY/Quality';
import Console from './pages/Console/Console';
import Productivity from './pages/Productivity/Productivity';
import DFX_AI from './pages/DFX_AI/DFX_AI';
import DATONIS_BI from './pages/DATONIS_BI/DATONIS_BI';
import Documents from './pages/Documents/Documents';
import Maintenance from './pages/Maintenance/Maintenance';
import Designer from './pages/Designer/Designer';
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />
        {/* Other Module Routes - Each has its own Header and Sidebar */}
        <Route
          path="/admin"
          element={
            <PermissionProtectedRoute route="/admin">
              <Admin />
            </PermissionProtectedRoute>
          }
        />
        <Route
          path="/configuration"
          element={
            <AdminProtectedRoute>
              <Configuration />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/checklist"
          element={
            <PermissionProtectedRoute route="/checklist">
              <Checklist />
            </PermissionProtectedRoute>
          }
        />
        <Route
          path="/mint"
          element={
            <PermissionProtectedRoute route="/mint">
              <Mint />
            </PermissionProtectedRoute>
          }
        />
        <Route
          path="/quality"
          element={
            <PermissionProtectedRoute route="/quality">
              <Quality />
            </PermissionProtectedRoute>
          }
        />
        <Route
          path="/console"
          element={
            <PermissionProtectedRoute route="/console">
              <Console />
            </PermissionProtectedRoute>
          }
        />
        <Route
          path="/productivity"
          element={
            <PermissionProtectedRoute route="/productivity">
              <Productivity />
            </PermissionProtectedRoute>
          }
        />
        <Route
          path="/dfx-ai"
          element={
            <PermissionProtectedRoute route="/dfx-ai">
              <DFX_AI />
            </PermissionProtectedRoute>
          }
        />
        <Route
          path="/datonis-bi"
          element={
            <PermissionProtectedRoute route="/datonis-bi">
              <DATONIS_BI />
            </PermissionProtectedRoute>
          }
        />
        <Route
          path="/documents"
          element={
            <PermissionProtectedRoute route="/documents">
              <Documents />
            </PermissionProtectedRoute>
          }
        />
        <Route
          path="/maintenance"
          element={
            <PermissionProtectedRoute route="/maintenance">
              <Maintenance />
            </PermissionProtectedRoute>
          }
        />
        <Route
          path="/designer"
          element={
            <PermissionProtectedRoute route="/designer">
              <Designer />
            </PermissionProtectedRoute>
          }
        />
        {/* EMS Routes with shared Header and Sidebar */}
        <Route
          element={
            <ProtectedRoute>
              <EMSLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/digital-input"
            element={
              <PermissionProtectedRoute route="digital-input">
                <DigitalInput />
              </PermissionProtectedRoute>
            }
          />
          <Route
            path="/digital-output"
            element={
              <PermissionProtectedRoute route="digital-output">
                <DigitalOutput />
              </PermissionProtectedRoute>
            }
          />
          <Route
            path="/analog-input"
            element={
              <PermissionProtectedRoute route="analog-input">
                <Page2 />
              </PermissionProtectedRoute>
            }
          />
          <Route
            path="/analog-output"
            element={
              <PermissionProtectedRoute route="analog-output">
                <AnalogOutput />
              </PermissionProtectedRoute>
            }
          />
          <Route
            path="/machine-dashboard"
            element={
              <PermissionProtectedRoute route="machine-dashboard">
                <MachineDashboard />
              </PermissionProtectedRoute>
            }
          />
          <Route
            path="/oee-dashboard"
            element={
              <PermissionProtectedRoute route="oee-dashboard">
                <OeeDashboard />
              </PermissionProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <PermissionProtectedRoute route="report">
                <Report />
              </PermissionProtectedRoute>
            }
          />
          <Route
            path="/energy-consumption"
            element={
              <PermissionProtectedRoute route="energy-consumption">
                <EnergyConsumption />
              </PermissionProtectedRoute>
            }
          />
          <Route
            path="/energy-monitoring-dashboard"
            element={
              <PermissionProtectedRoute route="energy-monitoring-dashboard">
                <EnergyMonitoringDashboard />
              </PermissionProtectedRoute>
            }
          />
          <Route
            path="/power-quality-monitoring"
            element={
              <PermissionProtectedRoute route="power-quality-monitoring">
                <PowerQualityMonitoring />
              </PermissionProtectedRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <PermissionProtectedRoute route="alerts">
                <Alerts />
              </PermissionProtectedRoute>
            }
          />
          <Route
            path="/alert-setup"
            element={
              <PermissionProtectedRoute route="alert-setup">
                <AlertSetup />
              </PermissionProtectedRoute>
            }
          />
          <Route
            path="/event-data"
            element={
              <PermissionProtectedRoute route="event-data">
                <EventData />
              </PermissionProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
