import { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard.jsx';
import NDISOfficeHub from './NDISOfficeHub.jsx';
import TimesheetAuditQueue from './TimesheetAuditQueue.jsx';
import ParticipantBudgetTracker from './ParticipantBudgetTracker.jsx';
import ProgressNoteGenerator from './ProgressNoteGenerator.jsx';
import WorkflowAutomation from './WorkflowAutomation.jsx';
import KnowledgeAssistant from './KnowledgeAssistant.jsx';
import DocumentUploadModal from './DocumentUploadModal.jsx';
import StaffOnboarding from './StaffOnboarding.jsx';
import StaffRostering from './StaffRostering.jsx';

export default function CareFlowApp() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [officeHubSubTab, setOfficeHubSubTab] = useState('Overview'); // Track sub-tabs inside NDIS Office Hub

  // Shared State: Central source of truth for shifts
  const [shifts, setShifts] = useState([
    { id: 1, staff: 'Chloe Vance', participant: 'Marcus Brody', date: '6 Sept 2026', rosteredHours: 4.0, actualHours: 5.5, noteStatus: 'Missing Progress Note', status: 'Flagged for Review' },
    { id: 2, staff: 'Liam Smith', participant: 'Sophie Turner', date: '5 Sept 2026', rosteredHours: 3.0, actualHours: 3.0, noteStatus: 'Verified & Attached', status: 'Ready for Payroll' },
    { id: 3, staff: 'Sarah Jenkins', participant: 'David Miller', date: '6 Sept 2026', rosteredHours: 6.0, actualHours: 6.0, noteStatus: 'Missing Progress Note', status: 'Flagged for Review' }
  ]);

  const handleOverrideClear = (id) => {
    setShifts(prev => prev.map(s => s.id === id ? { ...s, status: 'Ready for Payroll', noteStatus: 'Overridden & Approved' } : s));
  };

  // Wrapper to support main tabs and sub-tab parameters passed from Dashboard alerts
  const handleNavChange = (tab, subTab) => {
    setActiveNav(tab);
    if (subTab) {
      setOfficeHubSubTab(subTab);
    } else if (tab === 'NDIS Office Hub') {
      setOfficeHubSubTab('Overview'); // Default fallback if clicked normally from sidebar
    }
  };

  const navItems = [
    'Dashboard', 
    'NDIS Office Hub', 
    'Timesheet & Shift Audit', 
    'Plan Budget Trackers', 
    'AI Progress Notes', 
    'Cloud Automation', 
    'Knowledge Assistant', 
    'Upload Documents', 
    'Staff Onboarding', 
    'Weekly Rostering'
  ];

  return (
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh', background: '#0f172a' }}>
      
      {/* Single Unified Left-Hand Navigation Panel */}
      <div 
        className="sidebar"
        style={{
          width: '260px',
          background: '#0f172a',
          color: '#ffffff',
          padding: '24px 16px',
          borderRight: '1px solid #1e293b',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto'
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px 12px', letterSpacing: '-0.02em', color: '#ffffff' }}>
          CareFlow AI
        </h2>
        <div className="nav-menu" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const isActive = activeNav === item;
            return (
              <button
                key={item}
                onClick={() => handleNavChange(item)}
                className={`nav-item ${isActive ? 'active' : ''}`}
                style={{
                  textAlign: 'left',
                  border: 'none',
                  background: isActive ? '#1e293b' : 'transparent',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  cursor: 'pointer',
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'background 0.15s ease, color 0.15s ease'
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content" style={{ flex: 1, background: '#f8fafc', minHeight: '100vh', overflowY: 'auto' }}>
        <div className="content-area" style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
          
          {activeNav === 'Dashboard' && <Dashboard setActiveTab={handleNavChange} />}
          {activeNav === 'NDIS Office Hub' && <NDISOfficeHub initialTab={officeHubSubTab} />}
          {activeNav === 'Timesheet & Shift Audit' && <TimesheetAuditQueue shifts={shifts} onOverrideClear={handleOverrideClear} />}
          {activeNav === 'Plan Budget Trackers' && <ParticipantBudgetTracker />}
          {activeNav === 'AI Progress Notes' && <ProgressNoteGenerator />}
          {activeNav === 'Cloud Automation' && <WorkflowAutomation />}
          {activeNav === 'Knowledge Assistant' && <KnowledgeAssistant />}
          {activeNav === 'Upload Documents' && <DocumentUploadModal />}
          {activeNav === 'Staff Onboarding' && <StaffOnboarding />}
          {activeNav === 'Weekly Rostering' && <StaffRostering shifts={shifts} setShifts={setShifts} />}

        </div>
      </div>
    </div>
  );
}