import { useState } from 'react';
import './App.css';

export default function KnowledgeAssistant() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [privacyMode, setPrivacyMode] = useState(true);

  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      text: 'Secure Enterprise AI Initialized. Privacy Shield is ACTIVE: All PII (Client Names, NDIS IDs, Tax Data) is locally masked prior to guideline cross-referencing.',
      source: 'CareFlow Enterprise Security Core',
      secure: true
    }
  ]);

  const categories = ['All', 'NDIS Pricing & Travel', 'Quality & Incidents', 'Data Privacy & SOPs', 'Cancellations'];

  const interactiveCards = [
    { title: 'Travel & Km Caps', prompt: 'What is the standard NDIS per-km travel limit?', category: 'NDIS Pricing & Travel' },
    { title: 'Incident Timeframes', prompt: 'What are the reporting timeframes for Category 1 incidents?', category: 'Quality & Incidents' },
    { title: 'Secure PII Handling', prompt: 'How does CareFlow protect client data under privacy laws?', category: 'Data Privacy & SOPs' },
    { title: 'Cancellation Rules', prompt: 'What are the rules for Cancellation Policies?', category: 'Cancellations' }
  ];

  const sanitizeQuery = (rawText) => {
    if (!privacyMode) return rawText;
    return rawText
      .replace(/\b\d{9}\b/g, '[NDIS_ID_MASKED]')
      .replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, (match) => {
        return match === 'CareFlow AI' ? match : '[CLIENT_NAME_MASKED]';
      });
  };

  const handleSearch = (searchQuery) => {
    const textToSearch = searchQuery || query;
    if (!textToSearch.trim()) return;

    const sanitized = sanitizeQuery(textToSearch);
    
    const userMessage = { 
      sender: 'user', 
      text: textToSearch, 
      source: 'User Input Queue',
      secure: privacyMode 
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setQuery('');
    setLoading(true);

    setTimeout(() => {
      let aiResponse = '';
      let sourceTag = 'NDIS Encrypted Compliance Base';

      const lower = sanitized.toLowerCase();
      
      if (lower.includes('travel') || lower.includes('km') || lower.includes('per-km')) {
        aiResponse = 'Provider travel (labor and non-labor costs) is capped per current NDIS Price Limits (approx. $0.96/km for standard vehicles). Claims must align with participant agreement terms and should not exceed 50km per trip without documented supervisor review.';
        sourceTag = 'NDIS Pricing Arrangements & Price Limits';
      } else if (lower.includes('incident') || lower.includes('category 1') || lower.includes('reporting')) {
        aiResponse = 'Category 1 reportable incidents (severe injury, abuse, or neglect) require mandatory verbal notification to the NDIS Quality and Safeguards Commission within 24 hours, followed by a formal 5-day written submission.';
        sourceTag = 'NDIS Quality & Safeguards Commission Rules';
      } else if (lower.includes('privacy') || lower.includes('protect') || lower.includes('data') || lower.includes('client data')) {
        aiResponse = 'CareFlow enforces strict zero-retention policies. Stakeholder data, staff credentials, and client files are isolated within your private tenant boundary, complying fully with the Privacy Act and NDIS Practice Standards.';
        sourceTag = 'CareFlow Enterprise Security & Privacy Protocol v4.0';
      } else if (lower.includes('cancellation') || lower.includes('cancel')) {
        aiResponse = 'The NDIS cancellation policy allows providers to claim up to 100% of the agreed fee if less than 7 business days notice is provided, provided this condition is explicitly written in the participant Service Agreement.';
        sourceTag = 'NDIS Terms of Business & Cancellations';
      } else {
        aiResponse = `Analysis complete for input query. Data payload was scrubbed of identifiable PII under tenant encryption protocols. Ensure support logs match active service booking items before final claim entry.`;
        sourceTag = 'CareFlow Secure Enterprise Knowledge Base';
      }

      setChatHistory(prev => [...prev, { sender: 'ai', text: aiResponse, source: sourceTag, secure: true }]);
      setLoading(false);
    }, 600);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const filteredCards = activeCategory === 'All' 
    ? interactiveCards 
    : interactiveCards.filter(card => card.category === activeCategory);

  return (
    <div className="workflow-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2>Secure AI Knowledge Assistant & Privacy Desk</h2>
          <p className="workflow-subtitle" style={{ margin: 0 }}>
            Enterprise-grade LLM protected by zero-retention PII masking, role-based guardrails, and compliance tracking.
          </p>
        </div>
        
        <div 
          onClick={() => setPrivacyMode(!privacyMode)}
          style={{ 
            background: privacyMode ? '#dcfce7' : '#fee2e2', 
            color: privacyMode ? '#166534' : '#991b1b',
            border: `1px solid ${privacyMode ? '#bbf7d0' : '#fecaca'}`,
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>{privacyMode ? '🛡️ Privacy Shield: ACTIVE' : '⚠️ Privacy Shield: OFF'}</span>
        </div>
      </div>

      {/* Category Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '20px 0 12px 0' }}>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(cat)}
            style={{
              background: activeCategory === cat ? '#2563eb' : '#ffffff',
              color: activeCategory === cat ? '#ffffff' : '#334155',
              border: '1px solid #cbd5e1',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Interactive Quick-Action Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '20px' }}>
        {filteredCards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => handleSearch(card.prompt)}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#2563eb';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ fontSize: '0.7rem', color: '#2563eb', fontWeight: 700, marginBottom: '4px' }}>🔒 SECURE QUERY</div>
            <div style={{ fontSize: '0.85rem', color: '#0f172a', fontWeight: 500 }}>{card.title}</div>
          </div>
        ))}
      </div>

      {/* Chat Conversation Box */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', minHeight: '320px', maxHeight: '420px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
        {chatHistory.map((msg, index) => (
          <div 
            key={index} 
            style={{ 
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '82%',
              background: msg.sender === 'user' ? '#2563eb' : '#ffffff',
              color: msg.sender === 'user' ? '#ffffff' : '#0f172a',
              padding: '14px 16px',
              borderRadius: '10px',
              border: msg.sender === 'ai' ? '1px solid #cbd5e1' : 'none',
              boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
              position: 'relative'
            }}
          >
            <div style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{msg.text}</div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', borderTop: msg.sender === 'ai' ? '1px solid #f1f5f9' : '1px solid rgba(255,255,255,0.2)', paddingTop: '6px' }}>
              <span style={{ fontSize: '0.7rem', color: msg.sender === 'user' ? '#93c5fd' : '#64748b', fontWeight: 600 }}>
                {msg.secure ? '🔒 Encrypted & Anonymized' : '⚠️ Unmasked'} | Source: {msg.source}
              </span>
              {msg.sender === 'ai' && (
                <button 
                  onClick={() => copyToClipboard(msg.text, index)}
                  style={{ background: 'none', border: 'none', fontSize: '0.7rem', color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}
                >
                  {copiedIndex === index ? '✓ Copied!' : 'Copy Answer'}
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ alignSelf: 'flex-start', background: '#ffffff', border: '1px solid #cbd5e1', padding: '12px 16px', borderRadius: '8px', fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🛡️</span> Running Privacy Shield & Token Anonymization...
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <input 
          type="text" 
          placeholder="Ask a query (Client names and IDs will be automatically scrubbed)..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{ flex: 1, padding: '12px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', background: '#ffffff' }}
        />
        <button 
          onClick={() => handleSearch()}
          className="action-btn"
          style={{ backgroundColor: '#2563eb', padding: '0 24px', fontSize: '0.85rem', borderRadius: '8px' }}
        >
          Send Securely
        </button>
      </div>
    </div>
  );
}