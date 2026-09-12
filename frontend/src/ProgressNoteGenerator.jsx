import { useState } from 'react';
import './App.css';

export default function ProgressNoteGenerator() {
  const [incomingNotes, setIncomingNotes] = useState([
    { 
      id: 1, 
      worker: 'Chloe Vance', 
      participant: 'Marcus Brody', 
      rawText: 'Went for walk at Mulligans Flat. Anna was happy. Had lunch when came back. No incidents.',
      polishedText: '',
      status: 'Pending Office Review'
    },
    { 
      id: 2, 
      worker: 'Liam Smith', 
      participant: 'Sophie Turner', 
      rawText: 'Participated in community arts program. Refused morning medication initially but took it later after gentle encouragement.',
      polishedText: '',
      status: 'Pending Office Review'
    }
  ]);

  const [selectedNoteId, setSelectedNoteId] = useState(1);
  const [isPolishing, setIsPolishing] = useState(false);

  const currentNote = incomingNotes.find(n => n.id === selectedNoteId);

  const handleAIPolish = () => {
    setIsPolishing(true);
    setTimeout(() => {
      let enhanced = '';
      if (selectedNoteId === 1) {
        enhanced = `[Compliance Polished] Support worker Chloe Vance accompanied participant Marcus Brody to Mulligans Flat for a community walking activity. Participant displayed positive affect and engaged well. Returned for scheduled lunch. No critical incidents or restrictive practices observed.`;
      } else {
        enhanced = `[Compliance Polished] Support worker Liam Smith supported participant Sophie Turner during community arts program. Minor initial reluctance regarding scheduled medication was successfully managed via person-centred de-escalation; medication subsequently administered as prescribed.`;
      }

      setIncomingNotes(incomingNotes.map(n => {
        if (n.id === selectedNoteId) {
          return { ...n, polishedText: enhanced };
        }
        return n;
      }));
      setIsPolishing(false);
    }, 700);
  };

  const handleApproveAndArchive = () => {
    setIncomingNotes(incomingNotes.map(n => {
      if (n.id === selectedNoteId) {
        return { ...n, status: 'Approved & Locked to NDIS File' };
      }
      return n;
    }));
  };

  return (
    <div className="workflow-container">
      <h2>Office Audit & Compliance Progress Note Review</h2>
      <p className="workflow-subtitle">Review, polish, and audit notes submitted by support workers from the field before final sign-off into client records.</p>
      
      {/* SECTION 1: Selector Cards (Compact, Tab-like selection) */}
      <div style={{ marginTop: '20px', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
          1. Select Submission to Review ({incomingNotes.length} pending)
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {incomingNotes.map((note) => {
            const isSelected = selectedNoteId === note.id;
            return (
              <div 
                key={note.id}
                onClick={() => setSelectedNoteId(note.id)}
                style={{ 
                  background: isSelected ? '#ffffff' : '#f8fafc', 
                  padding: '16px', 
                  borderRadius: '8px', 
                  border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 4px 12px rgba(37, 99, 235, 0.08)' : 'none',
                  transition: 'all 0.2s ease',
                  borderLeft: isSelected ? '6px solid #2563eb' : '1px solid #e2e8f0'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{note.participant}</span>
                  <span className={`status-badge ${note.status.includes('Approved') ? 'badge-success' : 'badge-danger'}`}>
                    {note.status}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px' }}>
                  Worker: <strong>{note.worker}</strong>
                </p>
                <p style={{ fontSize: '0.8rem', color: '#475569', fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  "{note.rawText}"
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Distinct Active Workspace Panel */}
      <div style={{ 
        background: '#ffffff', 
        padding: '32px', 
        borderRadius: '12px', 
        border: '2px solid #0f172a', 
        boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.08)',
        position: 'relative'
      }}>
        {/* Workspace Header Tag */}
        <div style={{ 
          position: 'absolute', 
          top: '-14px', 
          left: '28px', 
          background: '#0f172a', 
          color: '#ffffff', 
          padding: '4px 14px', 
          borderRadius: '6px', 
          fontSize: '0.75rem', 
          fontWeight: 700, 
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          Active Audit Workbench
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', marginTop: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 700 }}>
              {currentNote.participant}
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '2px' }}>
              Submitted by Support Worker: <strong style={{ color: '#334155' }}>{currentNote.worker}</strong>
            </p>
          </div>
          <span className={`status-badge ${currentNote.status.includes('Approved') ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
            {currentNote.status}
          </span>
        </div>

        {/* Two-Column Workspace Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          
          {/* Left Column: Read-Only Original */}
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Original Field Submission
            </label>
            <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.6', fontStyle: 'italic' }}>
              "{currentNote.rawText}"
            </p>
          </div>

          {/* Right Column: Editable Polished Note */}
          <div style={{ background: '#f0fdf4', padding: '20px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#166534', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Audit-Ready Note (Admin Editable)
            </label>
            <textarea 
              rows="5"
              value={currentNote.polishedText}
              placeholder="Click 'Polish with AI' below to generate the compliance-checked version, or edit directly here..."
              onChange={(e) => {
                setIncomingNotes(incomingNotes.map(n => n.id === selectedNoteId ? { ...n, polishedText: e.target.value } : n));
              }}
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #86efac', fontSize: '0.95rem', lineHeight: '1.5', background: '#ffffff', color: '#14532d' }}
            />
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '16px 20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <button 
            className="action-btn" 
            onClick={handleAIPolish}
            disabled={isPolishing}
            style={{ backgroundColor: '#0f172a', padding: '10px 20px', fontWeight: 600 }}
          >
            {isPolishing ? '✨ Polishing Note...' : '✨ Polish with AI (Check NDIS Audit Standard)'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
              🔒 Ensures compliance prior to billing reconciliation.
            </span>
            <button 
              className="action-btn" 
              onClick={handleApproveAndArchive}
              disabled={currentNote.status.includes('Approved')}
              style={{ backgroundColor: currentNote.status.includes('Approved') ? '#059669' : '#2563eb', padding: '10px 24px', fontWeight: 600 }}
            >
              {currentNote.status.includes('Approved') ? '✓ Approved & Archived' : 'Approve & Lock Note'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}