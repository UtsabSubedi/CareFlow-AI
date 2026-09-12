import { useState } from 'react';
import './App.css';

export default function StaffOnboarding() {
  const [staffList, setStaffList] = useState([
    { 
      id: 1, 
      name: 'Sarah Jenkins', 
      email: 'sarah.j@careflow.com', 
      phone: '0412 345 678', 
      address: '14 Banksia St, Canberra ACT', 
      dob: '1992-04-12', 
      role: 'Support Worker', 
      progress: '75%', 
      status: 'In Progress', 
      compliance: 'Verified' 
    },
    { 
      id: 2, 
      name: 'Liam O’Connor', 
      email: 'liam.o@careflow.com', 
      phone: '0498 765 432', 
      address: '8/22 King Street, Canberra ACT', 
      dob: '1988-11-20', 
      role: 'Senior Coordinator', 
      progress: '100%', 
      status: 'Completed', 
      compliance: 'Verified' 
    }
  ]);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [role, setRole] = useState('Support Worker');
  const [message, setMessage] = useState('');

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setMessage('Please fill in the full name and email address.');
      return;
    }

    const newMember = {
      id: Date.now(),
      name: fullName,
      email: email,
      phone: phone || 'N/A',
      address: address || 'N/A',
      dob: dob || 'N/A',
      role: role,
      progress: '0%',
      status: 'Not Started',
      compliance: 'Pending Check'
    };

    setStaffList(prev => [newMember, ...prev]);
    setFullName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setDob('');
    setRole('Support Worker');

    setMessage(`Successfully enrolled ${fullName}!`);
    setTimeout(() => setMessage(''), 3000);
  };

  const updateProgress = (id, newProgress, newStatus) => {
    setStaffList(prev => staffList.map(staff => {
      if (staff.id === id) {
        return { ...staff, progress: newProgress, status: newStatus };
      }
      return staff;
    }));
  };

  const handleDeleteStaff = (id) => {
    setStaffList(prev => prev.filter(staff => staff.id !== id));
  };

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Top Banner / Intro */}
      <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
        <h2 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '1.25rem' }}>Staff Onboarding & Compliance Hub</h2>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b', lineHeight: '1.5' }}>
          Onboard new support staff, track mandatory NDIS orientation phases, and manage profile records securely.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Column: Enrollment Form */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#0f172a', fontSize: '0.95rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
            ✨ Enroll New Team Member
          </h3>

          <form onSubmit={handleAddStaff} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Full Name *</label>
              <input 
                type="text" 
                placeholder="e.g. Jane Doe" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Email Address *</label>
              <input 
                type="email" 
                placeholder="e.g. jane@careflow.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Phone</label>
              <input 
                type="text" 
                placeholder="0400 000 000" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Date of Birth</label>
              <input 
                type="date" 
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#fff' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Residential Address</label>
              <input 
                type="text" 
                placeholder="Street address, Suburb, State" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>Role</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#fff' }}
              >
                <option value="Support Worker">Support Worker</option>
                <option value="Senior Coordinator">Senior Coordinator</option>
                <option value="Registered Nurse">Registered Nurse</option>
                <option value="Admin / Compliance">Admin / Compliance</option>
              </select>
            </div>

            <button 
              type="submit" 
              style={{ backgroundColor: '#2563eb', padding: '9px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#fff', border: 'none', cursor: 'pointer', marginTop: '6px' }}
            >
              Register & Start Onboarding
            </button>

            {message && (
              <div style={{ fontSize: '0.75rem', color: '#166534', background: '#dcfce7', padding: '6px 10px', borderRadius: '6px', textAlign: 'center' }}>
                {message}
              </div>
            )}
          </form>
        </div>

        {/* Right Column: Clean Organized Roster Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1rem' }}>📋 Active Onboarding Roster ({staffList.length})</h3>
          </div>

          {staffList.map((staff) => (
            <div key={staff.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Card Top Row: Name, Role & Status Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>{staff.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600, marginTop: '2px' }}>{staff.role}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ 
                    background: staff.status === 'Completed' ? '#dcfce7' : '#fef3c7', 
                    color: staff.status === 'Completed' ? '#166534' : '#92400e', 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.75rem',
                    fontWeight: 600 
                  }}>
                    {staff.status} ({staff.progress})
                  </span>
                </div>
              </div>

              {/* Card Structured Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem', color: '#334155' }}>
                <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Email</span>
                  {staff.email}
                </div>
                <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Phone</span>
                  {staff.phone}
                </div>
                <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Residential Address</span>
                  {staff.address}
                </div>
                <div style={{ background: '#f8fafc', padding: '8px 10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#64748b', display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 600, marginBottom: '2px' }}>Date of Birth & Compliance</span>
                  🎂 {staff.dob} &nbsp;|&nbsp; 🔒 {staff.compliance}
                </div>
              </div>

              {/* Card Bottom Row: Action Controls */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                <button 
                  onClick={() => updateProgress(staff.id, '100%', 'Completed')}
                  style={{ background: '#166534', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
                >
                  ✓ Mark Complete
                </button>
                <button 
                  onClick={() => updateProgress(staff.id, '50%', 'In Progress')}
                  style={{ background: '#f1f5f9', color: '#334155', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
                >
                  Set In-Progress
                </button>
                <button 
                  onClick={() => handleDeleteStaff(staff.id)}
                  style={{ background: '#fee2e2', color: '#991b1b', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
                >
                  Remove Record
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}