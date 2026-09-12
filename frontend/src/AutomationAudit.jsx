import { useState } from 'react';
import './App.css';

export default function AutomationAudit() {
  const [hours, setHours] = useState(2);
  const [rate, setRate] = useState(40);

  const annualHours = hours * 52;
  const annualCost = annualHours * rate;
  const estimatedSavings = Math.round(annualHours * 0.769); // Roughly 80 hours saved for every 104 spent

  return (
    <div className="audit-container">
      <h2>Automation Audit Calculator</h2>
      
      <div className="audit-grid">
        <div className="audit-form">
          <label>Process Name</label>
          <input type="text" defaultValue="Staff training reminders" />
          
          <label>Hours spent per week</label>
          <input type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
          
          <label>Hourly staff cost ($)</label>
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        </div>

        <div className="audit-results">
          <div className="result-item">
            <span>Annual hours:</span>
            <strong>{annualHours} hours</strong>
          </div>
          <div className="result-item">
            <span>Annual labour cost:</span>
            <strong>${annualCost.toLocaleString()}</strong>
          </div>
          <div className="result-item">
            <span>Potential automation:</span>
            <strong className="high-priority">High</strong>
          </div>
          <div className="result-item highlight">
            <span>Estimated saving:</span>
            <strong>~{estimatedSavings} hours/year</strong>
          </div>
        </div>
      </div>
    </div>
  );
}