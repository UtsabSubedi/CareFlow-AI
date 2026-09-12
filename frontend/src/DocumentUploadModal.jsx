import { useState } from 'react';
import './App.css';

export default function DocumentUploadModal({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('NDIS Pricing & Travel');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  // Initial mock list of uploaded organizational documents
  const [documents, setDocuments] = useState([
    { id: 1, name: 'NDIS_Price_Guide_2026.pdf', category: 'NDIS Pricing & Travel', date: '2026-06-15', status: 'Indexed & Active' },
    { id: 2, name: 'Category_1_Incident_SOP.docx', category: 'Quality & Incidents', date: '2026-07-01', status: 'Indexed & Active' },
    { id: 3, name: 'Zero_Retention_Privacy_Policy.pdf', category: 'Data Privacy & SOPs', date: '2026-08-10', status: 'Indexed & Active' }
  ]);

  // Track editing state
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a document to upload.');
      return;
    }

    setUploading(true);
    setMessage('Scrubbing PII & generating secure vector embeddings...');

    setTimeout(() => {
      // Add the new file to our active document list
      const newDoc = {
        id: Date.now(),
        name: file.name,
        category: category,
        date: new Date().toISOString().split('T')[0],
        status: 'Indexed & Active'
      };

      setDocuments(prev => [newDoc, ...prev]);
      setUploading(false);
      setMessage(`Successfully indexed "${file.name}" to secure tenant knowledge base!`);
      setFile(null);
      if (onUploadSuccess) onUploadSuccess();
    }, 1200);
  };

  const handleDelete = (id) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const startEditing = (doc) => {
    setEditingId(doc.id);
    setEditName(doc.name);
    setEditCategory(doc.category);
  };

  const saveEdit = (id) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.id === id) {
        return { ...doc, name: editName, category: editCategory };
      }
      return doc;
    }));
    setEditingId(null);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Upload Box */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>📁 Manager Document Uploader</h3>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
          Upload official SOPs, price guides, or internal memos. Documents are automatically tokenized, encrypted, and made searchable across authorized staff profiles.
        </p>

        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Select Category Tag
            </label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#fff' }}
            >
              <option value="NDIS Pricing & Travel">NDIS Pricing & Travel</option>
              <option value="Quality & Incidents">Quality & Incidents</option>
              <option value="Data Privacy & SOPs">Data Privacy & SOPs</option>
              <option value="Cancellations">Cancellations</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Upload Document (PDF, DOCX, XLSX)
            </label>
            <input 
              type="file" 
              accept=".pdf,.docx,.xlsx,.txt"
              onChange={handleFileChange}
              style={{ width: '100%', padding: '8px', border: '1px dashed #cbd5e1', borderRadius: '6px', fontSize: '0.85rem', background: '#f8fafc' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={uploading}
            className="action-btn"
            style={{ backgroundColor: '#2563eb', padding: '10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', border: 'none', color: '#fff' }}
          >
            {uploading ? 'Processing Secure Ingestion...' : 'Upload & Index to AI Knowledge Base'}
          </button>

          {message && (
            <div style={{ fontSize: '0.8rem', color: message.includes('Successfully') ? '#166534' : '#b91c1c', background: message.includes('Successfully') ? '#dcfce7' : '#fee2e2', padding: '8px 12px', borderRadius: '6px' }}>
              {message}
            </div>
          )}
        </form>
      </div>

      {/* Uploaded Documents List & Management Table */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
        <h3 style={{ margin: '0 0 12px 0', color: '#0f172a', fontSize: '1.1rem' }}>📋 Managed Organisational Files & Documents</h3>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
          Review active source files currently accessible by the AI Knowledge Assistant. You can edit names, change categories, or remove outdated documents.
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '10px' }}>Document Name</th>
                <th style={{ padding: '10px' }}>Category</th>
                <th style={{ padding: '10px' }}>Upload Date</th>
                <th style={{ padding: '10px' }}>Status</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 500, color: '#0f172a' }}>
                    {editingId === doc.id ? (
                      <input 
                        type="text" 
                        value={editName} 
                        onChange={(e) => setEditName(e.target.value)}
                        style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #2563eb', width: '100%' }}
                      />
                    ) : (
                      doc.name
                    )}
                  </td>
                  <td style={{ padding: '12px 10px', color: '#334155' }}>
                    {editingId === doc.id ? (
                      <select 
                        value={editCategory} 
                        onChange={(e) => setEditCategory(e.target.value)}
                        style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #2563eb', background: '#fff' }}
                      >
                        <option value="NDIS Pricing & Travel">NDIS Pricing & Travel</option>
                        <option value="Quality & Incidents">Quality & Incidents</option>
                        <option value="Data Privacy & SOPs">Data Privacy & SOPs</option>
                        <option value="Cancellations">Cancellations</option>
                      </select>
                    ) : (
                      <span style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
                        {doc.category}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px 10px', color: '#64748b' }}>{doc.date}</td>
                  <td style={{ padding: '12px 10px', color: '#166534', fontWeight: 600, fontSize: '0.75rem' }}>
                    <span style={{ background: '#dcfce7', padding: '4px 8px', borderRadius: '12px' }}>{doc.status}</span>
                  </td>
                  <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                    {editingId === doc.id ? (
                      <button 
                        onClick={() => saveEdit(doc.id)}
                        style={{ background: '#166534', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, marginRight: '6px' }}
                      >
                        Save
                      </button>
                    ) : (
                      <button 
                        onClick={() => startEditing(doc)}
                        style={{ background: '#e2e8f0', color: '#334155', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, marginRight: '6px' }}
                      >
                        Edit
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(doc.id)}
                      style={{ background: '#fee2e2', color: '#991b1b', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
                    >
                      Delete
                    </button>
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