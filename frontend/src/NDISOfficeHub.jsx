import { useState } from 'react';
import './App.css';

export default function NDISOfficeHub() {
  const [activeSubTab, setActiveSubTab] = useState('budgets');

  // Module 1: Timesheet Audit Queue
  const [timesheets, setTimesheets] = useState([
    { id: 1, worker: 'Chloe Vance', participant: 'Marcus Brody', date: '6 Sept 2026', issue: 'Missing Case Note', status: 'Pending Review' },
    { id: 2, worker: 'Liam Smith', participant: 'Sophie Turner', date: '5 Sept 2026', issue: 'Roster Overtime Mismatch (+1.5 hrs)', status: 'Flagged' },
  ]);

  // Module 2: Participant Plan Budgets
  const [budgets, setBudgets] = useState([
    { id: 1, name: 'Marcus Brody', coreUsed: 88, capacityUsed: 45, planExpiry: 'Nov 2026', status: 'High Utilisation', totalBudget: '$54,000' },
    { id: 2, name: 'Sophie Turner', coreUsed: 62, capacityUsed: 70, planExpiry: 'Feb 2027', status: 'On Track', totalBudget: '$48,000' },
    { id: 3, name: 'David Miller', coreUsed: 94, capacityUsed: 80, planExpiry: 'Oct 2026', status: 'Critical Alert', totalBudget: '$72,000' },
  ]);

  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [clientName, setClientName] = useState('');
  const [coreBudget, setCoreBudget] = useState('');

  const handleEnroll = (e) => {
    e.preventDefault();
    if (!clientName) return;

    const newClient = {
      id: Date.now(),
      name: clientName,
      coreUsed: 0,
      capacityUsed: 0,
      planExpiry: '12 Months',
      status: 'On Track',
      totalBudget: coreBudget ? `$${Number(coreBudget).toLocaleString()}` : '$40,000'
    };

    setBudgets([newClient, ...budgets]);
    setClientName('');
    setCoreBudget('');
    setShowEnrollForm(false);
  };

  // Module 3: Safeguards & Incident Register
  const [incidents, setIncidents] = useState([
    { 
      id: 1, 
      participant: 'David Miller', 
      category: 'Category 1 - Reportable (Behavioral / Harm)', 
      reportedDate: '04 Sept 2026', 
      deadline: '24 hrs (Submitted Late)', 
      commissionStatus: 'Submitted to Portal', 
      reportFile: 'Incident_Report_David_Miller.pdf' 
    },
    { 
      id: 2, 
      participant: 'Marcus Brody', 
      category: 'Category 2 - Injury / Property Damage', 
      reportedDate: '06 Sept 2026', 
      deadline: 'Due in 5 Days (5-day Report)', 
      commissionStatus: 'Drafting 5-Day Form', 
      reportFile: null 
    }
  ]);

  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [incidentParticipant, setIncidentParticipant] = useState('');
  const [incidentCategory, setIncidentCategory] = useState('Category 1 - Reportable (Behavioral / Harm)');
  const [incidentDeadline, setIncidentDeadline] = useState('24 hrs Urgent Notification');

  const handleAddIncident = (e) => {
    e.preventDefault();
    if (!incidentParticipant) return;

    const newIncident = {
      id: Date.now(),
      participant: incidentParticipant,
      category: incidentCategory,
      reportedDate: 'Today',
      deadline: incidentDeadline,
      commissionStatus: 'Drafting 5-Day Form',
      reportFile: null
    };

    setIncidents([newIncident, ...incidents]);
    setIncidentParticipant('');
    setShowIncidentForm(false);
  };

  const handleIncidentUpload = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIncidents(incidents.map(inc => {
      if (inc.id === id) {
        return { ...inc, reportFile: file.name, commissionStatus: 'Submitted & Verified' };
      }
      return inc;
    }));
  };

  const handleViewIncidentFile = (fileName) => {
    alert(`Opening NDIS Commission Report Preview: ${fileName}`);
  };

  // Module 4: Service Agreements & Bookings
  const [agreements, setAgreements] = useState([
    { id: 1, participant: 'Marcus Brody', signedDate: '12 Nov 2025', renewalDue: '12 Nov 2026', bookingStatus: 'Active ($45k)', fileName: 'Marcus_Brody_Agreement_2025.pdf' },
    { id: 2, participant: 'Sophie Turner', signedDate: '01 Feb 2026', renewalDue: '01 Feb 2027', bookingStatus: 'Active ($30k)', fileName: 'Sophie_Turner_Signed.pdf' },
    { id: 3, participant: 'David Miller', signedDate: '15 Oct 2025', renewalDue: '15 Oct 2026', bookingStatus: 'Action Required (Expiring)', fileName: null },
  ]);

  const handleFileUpload = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAgreements(agreements.map(ag => {
      if (ag.id === id) {
        return { ...ag, fileName: file.name, bookingStatus: 'Active & Verified' };
      }
      return ag;
    }));
  };

  const handleViewFile = (fileName) => {
    alert(`Opening document preview for: ${fileName}`);
  };

  // Module 5: Automated Travel & Transport Claim Audit
  const [travelClaims, setTravelClaims] = useState([
    { id: 1, worker: 'Chloe Vance', participant: 'Marcus Brody', kms: 42, rate: 0.96, claimAmount: '$40.32', complianceCheck: 'Passed NDIS Limit' },
    { id: 2, worker: 'Liam Smith', participant: 'Sophie Turner', kms: 85, rate: 0.96, claimAmount: '$81.60', complianceCheck: 'Review Limit Exceeded' },
  ]);

  const [showTravelForm, setShowTravelForm] = useState(false);
  const [travelWorker, setTravelWorker] = useState('');
  const [travelParticipant, setTravelParticipant] = useState('');
  const [travelKms, setTravelKms] = useState('');

  const handleAddTravelClaim = (e) => {
    e.preventDefault();
    if (!travelWorker || !travelKms) return;

    const kmNum = parseFloat(travelKms) || 0;
    const standardRate = 0.96; 
    const calculatedTotal = (kmNum * standardRate).toFixed(2);
    const statusCheck = kmNum > 50 ? 'Review Limit Exceeded' : 'Passed NDIS Limit';

    const newClaim = {
      id: Date.now(),
      worker: travelWorker,
      participant: travelParticipant || 'General Participant',
      kms: kmNum,
      rate: standardRate,
      claimAmount: `$${calculatedTotal}`,
      complianceCheck: statusCheck
    };

    setTravelClaims([newClaim, ...travelClaims]);
    setTravelWorker('');
    setTravelParticipant('');
    setTravelKms('');
    setShowTravelForm(false);
  };

  const resolveTimesheet = (id) => {
    setTimesheets(timesheets.map(t => t.id === id ? { ...t, status: 'Approved & Cleared' } : t));
  };

  // Helper to color progress bars dynamically based on usage
  const getProgressColor = (val) => {
    if (val >= 90) return '#dc2626'; // Red for critical
    if (val >= 75) return '#d97706'; // Amber for high
    return '#2563eb'; // Blue for normal/healthy
  };

  return (
    <div className="workflow-container">
      <h2>NDIS Office Operations Center</h2>
      <p className="workflow-subtitle">Comprehensive command hub for administrators, roster schedulers, and registered managers.</p>
      
      {/* Metric Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px', marginTop: '16px' }}>
        <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #dc2626' }}>
          <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Timesheet Flags</span>
          <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
            {timesheets.filter(t => t.status !== 'Approved & Cleared').length} Pending
          </div>
        </div>
        <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #d97706' }}>
          <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Critical Budgets</span>
          <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
            {budgets.filter(b => b.status.includes('Critical') || b.status.includes('High')).length} Active Alerts
          </div>
        </div>
        <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #2563eb' }}>
          <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Safeguard Logs</span>
          <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
            {incidents.length} Registered
          </div>
        </div>
        <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', borderLeft: '4px solid #059669' }}>
          <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Service Agreements</span>
          <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
            {agreements.length} Tracked
          </div>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
        <button 
          onClick={() => setActiveSubTab('timesheets')} 
          className="action-btn"
          style={{ backgroundColor: activeSubTab === 'timesheets' ? '#0f172a' : '#64748b', fontSize: '0.8rem', padding: '6px 12px' }}
        >
          Timesheet Audit Queue
        </button>
        <button 
          onClick={() => setActiveSubTab('budgets')} 
          className="action-btn"
          style={{ backgroundColor: activeSubTab === 'budgets' ? '#0f172a' : '#64748b', fontSize: '0.8rem', padding: '6px 12px' }}
        >
          Plan Budgets
        </button>
        <button 
          onClick={() => setActiveSubTab('agreements')} 
          className="action-btn"
          style={{ backgroundColor: activeSubTab === 'agreements' ? '#0f172a' : '#64748b', fontSize: '0.8rem', padding: '6px 12px' }}
        >
          Service Agreements
        </button>
        <button 
          onClick={() => setActiveSubTab('travel')} 
          className="action-btn"
          style={{ backgroundColor: activeSubTab === 'travel' ? '#0f172a' : '#64748b', fontSize: '0.8rem', padding: '6px 12px' }}
        >
          Travel & Transport Audit
        </button>
        <button 
          onClick={() => setActiveSubTab('incidents')} 
          className="action-btn"
          style={{ backgroundColor: activeSubTab === 'incidents' ? '#0f172a' : '#64748b', fontSize: '0.8rem', padding: '6px 12px' }}
        >
          Safeguards Register
        </button>
      </div>

      {/* Tab 1: Timesheets */}
      {activeSubTab === 'timesheets' && (
        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1.1rem', color: '#0f172a' }}>Admin Exception Queue (Roster vs Timesheet Mismatches)</h3>
          <div className="table-responsive">
            <table className="workflow-table">
              <thead>
                <tr>
                  <th>Support Worker</th>
                  <th>Participant</th>
                  <th>Shift Date</th>
                  <th>Compliance Issue</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {timesheets.map((row) => (
                  <tr key={row.id}>
                    <td style={{ fontWeight: 600 }}>{row.worker}</td>
                    <td>{row.participant}</td>
                    <td>{row.date}</td>
                    <td><span style={{ color: '#dc2626', fontWeight: 500 }}>{row.issue}</span></td>
                    <td>
                      <span className={`status-badge ${row.status.includes('Approved') ? 'badge-success' : 'badge-danger'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td>
                      {row.status !== 'Approved & Cleared' && (
                        <button className="action-btn" onClick={() => resolveTimesheet(row.id)} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                          Verify & Clear
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Budgets (Enhanced & Polished) */}
      {activeSubTab === 'budgets' && (
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' }}>
          
          {/* Header Banner inside Plan Budgets */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#0f172a', fontWeight: 700 }}>Active Participant Plan Burn-Rates</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0 0' }}>Monitor core budgets and capacity building utilisation thresholds across active plans.</p>
            </div>
            <button 
              className="action-btn" 
              onClick={() => setShowEnrollForm(!showEnrollForm)}
              style={{ backgroundColor: showEnrollForm ? '#475569' : '#059669', fontSize: '0.85rem', padding: '8px 16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {showEnrollForm ? 'Cancel Form' : '+ Enroll New Client Budget'}
            </button>
          </div>

          {/* Interactive Enrollment Card */}
          {showEnrollForm && (
            <form onSubmit={handleEnroll} style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #cbd5e1', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.01)' }}>
              <div style={{ flex: '1 1 220px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Client Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Jessica Taylor" 
                  value={clientName} 
                  onChange={(e) => setClientName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', backgroundColor: '#fff' }}
                />
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Initial Total Budget ($)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 50000" 
                  value={coreBudget} 
                  onChange={(e) => setCoreBudget(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', backgroundColor: '#fff' }}
                />
              </div>
              <button type="submit" className="action-btn" style={{ backgroundColor: '#2563eb', height: '38px', padding: '0 20px', fontWeight: 600 }}>
                Save Client Budget
              </button>
            </form>
          )}

          {/* Table Container */}
          <div className="table-responsive">
            <table className="workflow-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Participant Name</th>
                  <th style={{ padding: '12px', width: '25%' }}>Core Budget Used</th>
                  <th style={{ padding: '12px', width: '25%' }}>Capacity Building Used</th>
                  <th style={{ padding: '12px' }}>Plan Expiry</th>
                  <th style={{ padding: '12px' }}>Utilisation Status</th>
                </tr>
              </thead>
              <tbody>
                {budgets.map((b) => {
                  const coreVal = typeof b.coreUsed === 'number' ? b.coreUsed : parseInt(b.coreUsed) || 0;
                  const capVal = typeof b.capacityUsed === 'number' ? b.capacityUsed : parseInt(b.capacityUsed) || 0;

                  return (
                    <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 12px' }}>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{b.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Total Plan: {b.totalBudget || '$50,000'}</div>
                      </td>

                      {/* Core Budget Progress Bar Column */}
                      <td style={{ padding: '14px 12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                          <span style={{ color: getProgressColor(coreVal) }}>{coreVal}%</span>
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Cap: 100%</span>
                        </div>
                        <div style={{ width: '100%', background: '#e2e8f0', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                          <div style={{ width: `${coreVal}%`, background: getProgressColor(coreVal), height: '100%', borderRadius: '999px', transition: 'width 0.4s ease' }} />
                        </div>
                      </td>

                      {/* Capacity Building Progress Bar Column */}
                      <td style={{ padding: '14px 12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
                          <span style={{ color: getProgressColor(capVal) }}>{capVal}%</span>
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Cap: 100%</span>
                        </div>
                        <div style={{ width: '100%', background: '#e2e8f0', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                          <div style={{ width: `${capVal}%`, background: getProgressColor(capVal), height: '100%', borderRadius: '999px', transition: 'width 0.4s ease' }} />
                        </div>
                      </td>

                      <td style={{ padding: '14px 12px', fontWeight: 500, color: '#334155' }}>{b.planExpiry}</td>
                      
                      <td style={{ padding: '14px 12px' }}>
                        <span className={`status-badge ${b.status.includes('Critical') || b.status.includes('High') ? 'badge-danger' : 'badge-success'}`} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Service Agreements */}
      {activeSubTab === 'agreements' && (
        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1.1rem', color: '#0f172a' }}>Participant Service Agreements & Document Management</h3>
          <div className="table-responsive">
            <table className="workflow-table">
              <thead>
                <tr>
                  <th>Participant Name</th>
                  <th>Signed Date</th>
                  <th>Renewal / Expiry Date</th>
                  <th>Agreement Document</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {agreements.map((ag) => (
                  <tr key={ag.id}>
                    <td style={{ fontWeight: 600 }}>{ag.participant}</td>
                    <td>{ag.signedDate}</td>
                    <td style={{ fontWeight: 500 }}>{ag.renewalDue}</td>
                    <td>
                      {ag.fileName ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <button 
                            onClick={() => handleViewFile(ag.fileName)}
                            style={{ background: 'none', border: 'none', color: '#2563eb', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.85rem', padding: 0, fontWeight: 500 }}
                            title="Preview file"
                          >
                            📄 {ag.fileName}
                          </button>
                          
                          <label style={{ background: '#e2e8f0', color: '#334155', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>
                            🔄 Replace
                            <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={(e) => handleFileUpload(ag.id, e)} />
                          </label>
                        </div>
                      ) : (
                        <label style={{ display: 'inline-block', background: '#2563eb', color: '#ffffff', padding: '5px 12px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>
                          + Upload PDF
                          <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={(e) => handleFileUpload(ag.id, e)} />
                        </label>
                      )}
                    </td>
                    <td>
                      <span className={`status-badge ${ag.bookingStatus.includes('Action') ? 'badge-danger' : 'badge-success'}`}>
                        {ag.bookingStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Automated Travel & Transport Claim Audit */}
      {activeSubTab === 'travel' && (
        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#0f172a' }}>Automated Support Worker Travel & Kilometrage Audit</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Auto-calculated against NDIS Price Limit standard per-km rates ($0.96/km cap).</p>
            </div>
            <button className="action-btn" onClick={() => setShowTravelForm(!showTravelForm)} style={{ backgroundColor: showTravelForm ? '#475569' : '#059669', fontSize: '0.85rem', padding: '6px 14px' }}>
              {showTravelForm ? 'Cancel' : '+ Log New Travel Claim'}
            </button>
          </div>

          {showTravelForm && (
            <form onSubmit={handleAddTravelClaim} style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ flex: '1 1 200px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Support Worker Name</label>
                <input type="text" placeholder="e.g. Sam Wilson" value={travelWorker} onChange={(e) => setTravelWorker(e.target.value)} required style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', marginTop: '4px', fontSize: '0.9rem' }} />
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Participant Name</label>
                <input type="text" placeholder="e.g. Marcus Brody" value={travelParticipant} onChange={(e) => setTravelParticipant(e.target.value)} style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', marginTop: '4px', fontSize: '0.9rem' }} />
              </div>
              <div style={{ flex: '1 1 150px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Kilometers Driven (km)</label>
                <input type="number" placeholder="e.g. 35" value={travelKms} onChange={(e) => setTravelKms(e.target.value)} required style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', marginTop: '4px', fontSize: '0.9rem' }} />
              </div>
              <button type="submit" className="action-btn" style={{ backgroundColor: '#2563eb', height: '34px' }}>Calculate & Save Claim</button>
            </form>
          )}

          <div className="table-responsive">
            <table className="workflow-table">
              <thead>
                <tr>
                  <th>Support Worker</th>
                  <th>Participant</th>
                  <th>Distance Claimed</th>
                  <th>NDIS Rate / km</th>
                  <th>Auto-Calculated Total</th>
                  <th>Compliance Check</th>
                </tr>
              </thead>
              <tbody>
                {travelClaims.map((tc) => (
                  <tr key={tc.id}>
                    <td style={{ fontWeight: 600 }}>{tc.worker}</td>
                    <td>{tc.participant}</td>
                    <td>{tc.kms} km</td>
                    <td style={{ color: '#64748b' }}>${tc.rate.toFixed(2)}</td>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{tc.claimAmount}</td>
                    <td>
                      <span className={`status-badge ${tc.complianceCheck.includes('Review') ? 'badge-danger' : 'badge-success'}`}>
                        {tc.complianceCheck}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Safeguards Register */}
      {activeSubTab === 'incidents' && (
        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#0f172a' }}>NDIS Commission Reportable Incidents & Restrictive Practices Register</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Compliant with NDIS Quality and Safeguards Commission reporting rules.</p>
            </div>
            <button className="action-btn" onClick={() => setShowIncidentForm(!showIncidentForm)} style={{ backgroundColor: showIncidentForm ? '#475569' : '#059669', fontSize: '0.85rem', padding: '6px 14px' }}>
              {showIncidentForm ? 'Cancel' : '+ Log New Incident Record'}
            </button>
          </div>

          {showIncidentForm && (
            <form onSubmit={handleAddIncident} style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ flex: '1 1 200px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Participant Name</label>
                <input type="text" placeholder="e.g. Lucas Green" value={incidentParticipant} onChange={(e) => setIncidentParticipant(e.target.value)} required style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', marginTop: '4px', fontSize: '0.9rem' }} />
              </div>
              <div style={{ flex: '1 1 220px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Incident / Safeguard Category</label>
                <select value={incidentCategory} onChange={(e) => setIncidentCategory(e.target.value)} style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', marginTop: '4px', fontSize: '0.85rem', background: '#fff' }}>
                  <option value="Category 1 - Reportable (Behavioral / Harm)">Category 1 - Reportable (Behavioral / Harm)</option>
                  <option value="Category 2 - Injury / Property Damage">Category 2 - Injury / Property Damage</option>
                  <option value="Restrictive Practice (Chemical / PRN)">Restrictive Practice (Chemical / PRN)</option>
                </select>
              </div>
              <div style={{ flex: '1 1 180px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>Statutory Deadline</label>
                <select value={incidentDeadline} onChange={(e) => setIncidentDeadline(e.target.value)} style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', border: '1px solid #cbd5e1', marginTop: '4px', fontSize: '0.85rem', background: '#fff' }}>
                  <option value="24 hrs Urgent Notification">24 hrs Urgent Notification</option>
                  <option value="Due in 5 Days (5-day Report)">Due in 5 Days (5-day Report)</option>
                </select>
              </div>
              <button type="submit" className="action-btn" style={{ backgroundColor: '#2563eb', height: '34px' }}>Save Incident Entry</button>
            </form>
          )}

          <div className="table-responsive">
            <table className="workflow-table">
              <thead>
                <tr>
                  <th>Participant</th>
                  <th>Category</th>
                  <th>Date Logged</th>
                  <th>Deadline</th>
                  <th>Portal Record</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((inc) => (
                  <tr key={inc.id}>
                    <td style={{ fontWeight: 600 }}>{inc.participant}</td>
                    <td>{inc.category}</td>
                    <td>{inc.reportedDate}</td>
                    <td style={{ color: '#b91c1c', fontWeight: 600 }}>{inc.deadline}</td>
                    <td>
                      {inc.reportFile ? (
                        <button onClick={() => handleViewIncidentFile(inc.reportFile)} style={{ background: 'none', border: 'none', color: '#2563eb', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.8rem' }}>
                          📋 {inc.reportFile}
                        </button>
                      ) : (
                        <label style={{ display: 'inline-block', background: '#dc2626', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>
                          + Upload 5-Day Report
                          <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={(e) => handleIncidentUpload(inc.id, e)} />
                        </label>
                      )}
                    </td>
                    <td>
                      <span className={`status-badge ${inc.commissionStatus.includes('Submitted') || inc.commissionStatus.includes('Verified') ? 'badge-success' : 'badge-danger'}`}>
                        {inc.commissionStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}