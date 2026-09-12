import { useState } from 'react';
import './App.css';

export default function TimesheetAuditQueue() {
  const [discrepancies, setDiscrepancies] = useState([
    { 
      id: 1, 
      worker: 'Chloe Vance', 
      participant: 'Marcus Brody', 
      shiftDate: '6 Sept 2026', 
      rosteredHours: '4.0 hrs', 
      timesheetHours: '5.5 hrs', 
      issue: 'Overtime Mismatch (+1.5 hrs unapproved)', 
      noteStatus: 'Missing Progress Note',
      status: 'Flagged for Review' 
    },
    { 
      id: 2, 
      worker: 'Liam Smith', 
      participant: 'Sophie Turner', 
      shiftDate: '5 Sept 2026', 
      rosteredHours: '3.0 hrs', 
      timesheetHours: '3.0 hrs', 
      issue: 'Exact Match', 
      noteStatus: 'Verified & Attached',
      status: 'Ready for Payroll' 
    },
    { 
      id: 3, 
      worker: 'Sarah Jenkins', 
      participant: 'David Miller', 
      shiftDate: '6 Sept 2026', 
      rosteredHours: '6.0 hrs', 
      timesheetHours: '6.0 hrs', 
      issue: 'Exact Match', 
      noteStatus: 'Missing Progress Note',
      status: 'Flagged for Review' 
    }
  ]);

  const handleResolve = (id) => {
    setDiscrepancies(discrepancies.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          issue: 'Resolved by Admin', 
          noteStatus: 'Verified & Attached', 
          status: 'Cleared for Payroll' 
        };
      }
      return item;
    }));
  };

  return (
    <div className="workflow-container">
      <h2>Roster vs. Timesheet Discrepancy & Shift Note Audit</h2>
      <p className="workflow-subtitle">Automated exception queue for office admin to catch shift discrepancies, unapproved overtime, and missing notes before payroll processing.</p>
      
      <div style={{ marginTop: '20px' }}>
        <div className="table-responsive">
          <table className="workflow-table">
            <thead>
              <tr>
                <th>Support Worker</th>
                <th>Participant</th>
                <th>Date</th>
                <th>Rostered vs Timesheet</th>
                <th>Audit Issue</th>
                <th>Progress Note</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {discrepancies.map((row) => (
                <tr key={row.id}>
                  <td style={{ fontWeight: 600 }}>{row.worker}</td>
                  <td>{row.participant}</td>
                  <td>{row.shiftDate}</td>
                  <td>{row.rosteredHours} ➔ <strong>{row.timesheetHours}</strong></td>
                  <td>
                    <span style={{ color: row.issue.includes('Match') ? '#059669' : '#dc2626', fontWeight: 500 }}>
                      {row.issue}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: row.noteStatus.includes('Missing') ? '#b45309' : '#059669', fontSize: '0.85rem', fontWeight: 600 }}>
                      {row.noteStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${row.status.includes('Cleared') || row.status.includes('Ready') ? 'badge-success' : 'badge-danger'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    {row.status !== 'Cleared for Payroll' && (
                      <button className="action-btn" onClick={() => handleResolve(row.id)}>
                        Override & Clear
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}