import React, { useState } from 'react';
import './App.css';

export default function WorkflowAutomation() {
  // Initial active workflows & automation opportunities
  const [workflows, setWorkflows] = useState([
    { id: 1, name: 'NDIS Plan Budget Auto-Sync', category: 'Finance', status: 'Active', lastRun: '10 mins ago', successRate: '99%' },
    { id: 2, name: 'Staff Compliance & Credential Checker', category: 'HR', status: 'Active', lastRun: '1 hour ago', successRate: '95%' },
    { id: 3, name: 'Automated Shift & Timesheet Audit', category: 'Operations', status: 'Active', lastRun: '3 hours ago', successRate: '98%' },
    { id: 4, name: 'Client Progress Note Summarizer', category: 'Clinical', status: 'Paused', lastRun: '2 days ago', successRate: '90%' }
  ]);

  const [opportunities, setOpportunities] = useState([
    { id: 101, title: 'Bulk Invoice Reconciliation', impact: 'High', estimatedHoursSaved: '4.5 hrs/week' },
    { id: 102, title: 'Participant Document Expiry Alerts', impact: 'Medium', estimatedHoursSaved: '2.0 hrs/week' }
  ]);

  const [runningId, setRunningId] = useState(null);
  const [executionLogs, setExecutionLogs] = useState([]);

  // Simulate real-world execution
  const handleRunWorkflow = async (workflow) => {
    setRunningId(workflow.id);
    
    // Simulate backend execution delay
    setTimeout(() => {
      const timeStr = new Date().toLocaleTimeString();
      setExecutionLogs(prev => [
        { id: Date.now(), text: `✅ Successfully executed: ${workflow.name}`, time: timeStr },
        ...prev
      ]);
      setRunningId(null);
    }, 1000);
  };

  // Convert an opportunity into an active workflow
  const handleDeployOpportunity = (opp) => {
    const newWorkflow = {
      id: Date.now(),
      name: opp.title,
      category: 'Newly Automated',
      status: 'Active',
      lastRun: 'Just now',
      successRate: '100%'
    };
    setWorkflows([newWorkflow, ...workflows]);
    setOpportunities(opportunities.filter(o => o.id !== opp.id));
  };

  return (
    <div className="workflow-container" style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: 'Inter, sans-serif', padding: '20px' }}>
      <h2>CareFlow Automation Studio</h2>
      <p style={{ color: '#64748b' }}>Manage, deploy, and trigger real-world intelligent care workflows.</p>

      {/* Active Workflows Section */}
      <div style={{ marginTop: '24px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Active Workflows ({workflows.length})</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {workflows.map(wf => (
            <div key={wf.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <div>
                <strong style={{ color: '#0f172a' }}>{wf.name}</strong>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                  Category: {wf.category} | Last Run: {wf.lastRun} | Success Rate: <span style={{ color: '#059669', fontWeight: 600 }}>{wf.successRate}</span>
                </div>
              </div>
              <button 
                onClick={() => handleRunWorkflow(wf)}
                disabled={runningId === wf.id}
                style={{ background: runningId === wf.id ? '#94a3b8' : '#2563eb', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
              >
                {runningId === wf.id ? 'Running...' : '⚡ Run Now'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Automation Opportunities Section */}
      <div style={{ marginTop: '24px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Discovered Automation Opportunities ({opportunities.length})</h3>
        {opportunities.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>All opportunities have been deployed into active workflows!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {opportunities.map(opp => (
              <div key={opp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '8px' }}>
                <div>
                  <strong style={{ color: '#9f1239' }}>{opp.title}</strong>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                    Impact: {opp.impact} | Projected Savings: <span style={{ fontWeight: 600, color: '#059669' }}>{opp.estimatedHoursSaved}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeployOpportunity(opp)}
                  style={{ background: '#059669', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
                >
                  🚀 Deploy Workflow
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Live Execution Terminal */}
      <div style={{ marginTop: '24px', background: '#0f172a', color: '#f8fafc', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ marginBottom: '12px', fontSize: '1.1rem', color: '#38bdf8' }}>Live Execution Terminal</h3>
        <div style={{ background: '#020617', padding: '12px', borderRadius: '8px', minHeight: '100px', maxHeight: '150px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.8rem' }}>
          {executionLogs.length === 0 ? (
            <span style={{ color: '#64748b' }}>Awaiting workflow triggers... Click 'Run Now' on any active workflow above.</span>
          ) : (
            executionLogs.map(log => (
              <div key={log.id} style={{ marginBottom: '6px' }}>
                <span style={{ color: '#94a3b8' }}>[{log.time}]</span> {log.text}
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}