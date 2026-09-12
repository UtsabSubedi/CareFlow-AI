import { useState } from 'react';
import './App.css';

export default function ParticipantBudgetTracker() {
  const [participants, setParticipants] = useState([
    { 
      id: 1, 
      name: 'Marcus Brody', 
      coreTotal: 45000, 
      coreUsed: 39600, // 88%
      capacityTotal: 12000, 
      capacityUsed: 5400, // 45%
      planExpiry: 'Nov 2026', 
      status: 'High Utilisation Alert' 
    },
    { 
      id: 2, 
      name: 'Sophie Turner', 
      coreTotal: 30000, 
      coreUsed: 18600, // 62%
      capacityTotal: 8500, 
      capacityUsed: 5950, // 70%
      planExpiry: 'Feb 2027', 
      status: 'On Track' 
    },
    { 
      id: 3, 
      name: 'David Miller', 
      coreTotal: 60000, 
      coreUsed: 56400, // 94%
      capacityTotal: 15000, 
      capacityUsed: 12000, // 80%
      planExpiry: 'Oct 2026', 
      status: 'Critical Burn Risk' 
    }
  ]);

  // Form state for enrolling a new participant budget
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCoreTotal, setNewCoreTotal] = useState('');
  const [newCapacityTotal, setNewCapacityTotal] = useState('');
  const [newExpiry, setNewExpiry] = useState('');

  const handleAddParticipant = (e) => {
    e.preventDefault();
    if (!newName || !newCoreTotal) return;

    const coreT = parseFloat(newCoreTotal) || 0;
    const capT = parseFloat(newCapacityTotal) || 0;

    const newEntry = {
      id: Date.now(),
      name: newName,
      coreTotal: coreT,
      coreUsed: 0, // Starts at 0% spent upon enrollment
      capacityTotal: capT,
      capacityUsed: 0,
      planExpiry: newExpiry || '12 Months',
      status: 'On Track'
    };

    setParticipants([newEntry, ...participants]);
    
    // Reset form and close
    setNewName('');
    setNewCoreTotal('');
    setNewCapacityTotal('');
    setNewExpiry('');
    setShowForm(false);
  };

  return (
    <div className="workflow-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2>Participant Budget Burn-Rate & Plan Tracker</h2>
          <p className="workflow-subtitle">Monitor NDIS plan utilisation rates in real time and enroll new client budgets upon onboarding.</p>
        </div>
        <button 
          className="action-btn" 
          onClick={() => setShowForm(!showForm)}
          style={{ backgroundColor: showForm ? '#475569' : '#2563eb' }}
        >
          {showForm ? 'Cancel' : '+ Enroll New Client Budget'}
        </button>
      </div>

      {/* Enrollment Form Drawer */}
      {showForm && (
        <form onSubmit={handleAddParticipant} style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Participant Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. John Doe"
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              required
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '4px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Core Supports Budget ($)</label>
            <input 
              type="number" 
              placeholder="e.g. 40000"
              value={newCoreTotal} 
              onChange={(e) => setNewCoreTotal(e.target.value)} 
              required
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '4px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Capacity Building ($)</label>
            <input 
              type="number" 
              placeholder="e.g. 10000"
              value={newCapacityTotal} 
              onChange={(e) => setNewCapacityTotal(e.target.value)} 
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '4px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Plan Expiry Date</label>
            <input 
              type="text" 
              placeholder="e.g. Aug 2027"
              value={newExpiry} 
              onChange={(e) => setNewExpiry(e.target.value)} 
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', marginTop: '4px' }}
            />
          </div>
          <button type="submit" className="action-btn" style={{ backgroundColor: '#059669', height: '38px' }}>
            Save & Track Budget
          </button>
        </form>
      )}
      
      {/* Table Display */}
      <div>
        <div className="table-responsive">
          <table className="workflow-table">
            <thead>
              <tr>
                <th>Participant Name</th>
                <th>Core Supports Utilisation</th>
                <th>Capacity Building Utilisation</th>
                <th>Plan Expiry</th>
                <th>Burn-Rate Status</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => {
                const corePct = p.coreTotal > 0 ? Math.round((p.coreUsed / p.coreTotal) * 100) : 0;
                const capPct = p.capacityTotal > 0 ? Math.round((p.capacityUsed / p.capacityTotal) * 100) : 0;
                const isCritical = p.status.includes('Critical') || p.status.includes('High');

                return (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{p.name}</td>
                    
                    {/* Core Burn Progress */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ flex: 1, background: '#e2e8f0', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                          <div style={{ width: `${corePct}%`, background: corePct > 85 ? '#dc2626' : '#2563eb', height: '100%' }}></div>
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: '36px' }}>{corePct}%</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        Total: ${p.coreTotal.toLocaleString()}
                      </span>
                    </td>

                    {/* Capacity Building Burn Progress */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ flex: 1, background: '#e2e8f0', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                          <div style={{ width: `${capPct}%`, background: capPct > 80 ? '#d97706' : '#059669', height: '100%' }}></div>
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: '36px' }}>{capPct}%</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        Total: ${p.capacityTotal.toLocaleString()}
                      </span>
                    </td>

                    <td style={{ fontWeight: 500 }}>{p.planExpiry}</td>

                    <td>
                      <span className={`status-badge ${isCritical ? 'badge-danger' : 'badge-success'}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}