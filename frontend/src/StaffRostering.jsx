import React, { useState } from 'react';

export default function CareFlowRosteringPortal({ shifts = [], setShifts }) {
  // Current Week Generator (Mon – Sun) & Date calculation
  const getMondayOfCurrentWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + distanceToMonday);
    return monday;
  };

  const getCurrentWeekString = () => {
    const monday = getMondayOfCurrentWeek();
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const options = { month: 'short', day: 'numeric' };
    return `${monday.toLocaleDateString('en-US', options)} – ${sunday.toLocaleDateString('en-US', options)}, ${sunday.getFullYear()}`;
  };

  // Generate specific dates for Mon-Sun
  const getDayDatesMap = () => {
    const monday = getMondayOfCurrentWeek();
    const map = {};
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    days.forEach((day, index) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + index);
      map[day] = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    return map;
  };

  const dayDates = getDayDatesMap();

  const [activeTab, setActiveTab] = useState('matrix'); // 'matrix' or 'batch'
  const [searchQuery, setSearchQuery] = useState(''); // Staff search filter
  const [selectedShiftForEdit, setSelectedShiftForEdit] = useState(null); // Full edit modal state
  
  // Batch Form State (Monday to Sunday)
  const [targetStaff, setTargetStaff] = useState('Chloe Vance');
  const [targetParticipant, setTargetParticipant] = useState('Marcus Brody');
  const [targetRole, setTargetRole] = useState('Support Worker');
  const [selectedDays, setSelectedDays] = useState({
    Mon: { active: true, hours: 8, time: '08:00 - 16:00' },
    Tue: { active: true, hours: 8, time: '08:00 - 16:00' },
    Wed: { active: false, hours: 8, time: '08:00 - 16:00' },
    Thu: { active: false, hours: 8, time: '08:00 - 16:00' },
    Fri: { active: false, hours: 8, time: '08:00 - 16:00' },
    Sat: { active: false, hours: 6, time: '09:00 - 15:00' },
    Sun: { active: false, hours: 6, time: '09:00 - 15:00' },
  });

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Distinct Color Palette for each day of the week
  const dayColorThemes = {
    Mon: { bg: '#eff6ff', border: '#bfdbfe', header: '#1e40af', accent: '#3b82f6' }, // Blue
    Tue: { bg: '#f0fdf4', border: '#bbf7d0', header: '#166534', accent: '#22c55e' }, // Green
    Wed: { bg: '#fdf4ff', border: '#f5d0fe', header: '#86198f', accent: '#d946ef' }, // Fuchsia
    Thu: { bg: '#fffbeb', border: '#fde68a', header: '#92400e', accent: '#f59e0b' }, // Amber
    Fri: { bg: '#fef2f2', border: '#fecaca', header: '#991b1b', accent: '#ef4444' }, // Red
    Sat: { bg: '#f5f3ff', border: '#ddd6fe', header: '#5b21b6', accent: '#8b5cf6' }, // Purple
    Sun: { bg: '#ecfeff', border: '#a5f3fc', header: '#155e75', accent: '#06b6d4' }  // Cyan
  };

  const toggleDayActive = (day) => {
    setSelectedDays(prev => ({
      ...prev,
      [day]: { ...prev[day], active: !prev[day].active }
    }));
  };

  const parseAndFormatTime = (rawInput) => {
    const cleaned = rawInput.toLowerCase().replace(/\s+/g, '');
    let startHour = 8, startMin = 0, endHour = 16, endMin = 0;

    const parts = cleaned.split(/-|to/);
    if (parts.length === 2) {
      const parseSingle = (str, defaultH) => {
        let h = defaultH, m = 0;
        let isPm = str.includes('pm');
        let isAm = str.includes('am');
        let numericStr = str.replace(/am|pm/g, '');
        
        if (numericStr.includes(':')) {
          const sub = numericStr.split(':');
          h = parseInt(sub[0]) || defaultH;
          m = parseInt(sub[1]) || 0;
        } else {
          h = parseInt(numericStr) || defaultH;
        }

        if (isPm && h < 12) h += 12;
        if (isAm && h === 12) h = 0;
        return { h, m };
      };

      const start = parseSingle(parts[0], 8);
      const end = parseSingle(parts[1], 16);

      startHour = start.h;
      startMin = start.m;
      endHour = end.h;
      endMin = end.m;
    }

    const pad = (n) => String(n).padStart(2, '0');
    const formattedTime = `${pad(startHour)}:${pad(startMin)} - ${pad(endHour)}:${pad(endMin)}`;

    const startDecimal = startHour + startMin / 60;
    const endDecimal = endHour + endMin / 60;
    let diff = endDecimal - startDecimal;
    if (diff < 0) diff += 24;

    return {
      formattedTime,
      calculatedHours: Math.round(diff * 100) / 100
    };
  };

  const handleTimeBlur = (day, rawValue) => {
    const { formattedTime, calculatedHours } = parseAndFormatTime(rawValue);
    setSelectedDays(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        time: formattedTime,
        hours: calculatedHours > 0 ? calculatedHours : prev[day].hours
      }
    }));
  };

  const handleDayChange = (day, field, value) => {
    setSelectedDays(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const handlePublishWeeklyBatch = (e) => {
    e.preventDefault();
    const newShifts = [];
    
    Object.entries(selectedDays).forEach(([day, data]) => {
      if (data.active) {
        newShifts.push({
          id: Date.now() + Math.random() + day,
          staff: targetStaff,
          participant: targetParticipant,
          day: day,
          timeSlot: data.time,
          hours: parseFloat(data.hours) || 8,
          role: targetRole
        });
      }
    });

    if (newShifts.length === 0) return;

    if (setShifts) {
      setShifts(prev => [...newShifts, ...prev]);
    }
    setActiveTab('matrix');
  };

  const handleDeleteShift = (shiftId) => {
    if (setShifts) {
      setShifts(prev => prev.filter(s => s.id !== shiftId));
    }
    setSelectedShiftForEdit(null);
  };

  const handleSaveEditedShift = (e) => {
    e.preventDefault();
    if (!selectedShiftForEdit) return;

    const { formattedTime, calculatedHours } = parseAndFormatTime(selectedShiftForEdit.timeSlot);
    const updatedShift = {
      ...selectedShiftForEdit,
      timeSlot: formattedTime,
      hours: calculatedHours > 0 ? calculatedHours : selectedShiftForEdit.hours
    };

    if (setShifts) {
      setShifts(prev => prev.map(s => s.id === updatedShift.id ? updatedShift : s));
    }
    setSelectedShiftForEdit(null);
  };

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'Senior Support':
        return { bg: '#fef3c7', color: '#d97706', border: '#fde68a' };
      case 'Registered Nurse':
        return { bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0' };
      default:
        return { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe' };
    }
  };

  // Aggregate Hours calculation per staff member
  const staffSummary = {};
  shifts.forEach(s => {
    const name = s.staff || 'Unknown';
    staffSummary[name] = (staffSummary[name] || 0) + parseFloat(s.hours || 0);
  });

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const batchTotalHours = Object.values(selectedDays).reduce((sum, d) => sum + (d.active ? parseFloat(d.hours || 0) : 0), 0);
  const batchActiveDaysCount = Object.values(selectedDays).filter(d => d.active).length;

  const allStaffList = Array.from(new Set([...Object.keys(staffSummary), 'Liam Smith', 'Chloe Vance', 'Sarah Jenkins']))
    .filter(name => name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={{ width: '100%', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#0f172a' }}>
      
      {/* Top Header & View Switcher */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 10px', borderRadius: '20px', background: '#eff6ff', color: '#2563eb', fontSize: '0.7rem', fontWeight: 700, marginBottom: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563eb' }}></span>
            Enterprise Rostering Suite
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: '800', color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
            Weekly Roster Control
          </h2>
          <p style={{ margin: '2px 0 0 0', color: '#64748b', fontSize: '0.85rem' }}>
            Manage staff allocations, monitor weekly caps, and eliminate scheduling conflicts.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: '8px', textAlign: 'right' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', display: 'block' }}>Active Window (Mon – Sun)</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>{getCurrentWeekString()}</span>
          </div>

          <div style={{ background: '#f1f5f9', padding: '3px', borderRadius: '8px', display: 'flex', gap: '4px', border: '1px solid #cbd5e1' }}>
            <button
              onClick={() => setActiveTab('matrix')}
              style={{ background: activeTab === 'matrix' ? '#ffffff' : 'transparent', color: activeTab === 'matrix' ? '#0f172a' : '#64748b', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', boxShadow: activeTab === 'matrix' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none' }}
            >
              📊 Roster Matrix
            </button>
            <button
              onClick={() => setActiveTab('batch')}
              style={{ background: activeTab === 'batch' ? '#2563eb' : 'transparent', color: activeTab === 'batch' ? '#ffffff' : '#64748b', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', boxShadow: activeTab === 'batch' ? '0 1px 2px rgba(37,99,235,0.2)' : 'none' }}
            >
              ⚡ Quick Batch Assign
            </button>
          </div>
        </div>
      </header>

      {/* VIEW 1: QUICK BATCH ASSIGN WIZARD WITH DATES */}
      {activeTab === 'batch' && (
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px', marginBottom: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>⚡ Quick Batch Assign Wizard</h3>
              <p style={{ margin: '3px 0 0 0', color: '#64748b', fontSize: '0.85rem' }}>Rapidly configure and publish recurring or multi-day shifts across specific dates.</p>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '6px 12px', borderRadius: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#2563eb', display: 'block', textTransform: 'uppercase' }}>Active Days</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e40af' }}>{batchActiveDaysCount} / 7 Days</span>
              </div>
              <div style={{ background: batchTotalHours > 38 ? '#fef2f2' : '#f0fdf4', border: `1px solid ${batchTotalHours > 38 ? '#fecaca' : '#bbf7d0'}`, padding: '6px 12px', borderRadius: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: batchTotalHours > 38 ? '#dc2626' : '#16a34a', display: 'block', textTransform: 'uppercase' }}>Batch Total</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: batchTotalHours > 38 ? '#b91c1c' : '#15803d' }}>{batchTotalHours} hrs</span>
              </div>
            </div>
          </div>

          <form onSubmit={handlePublishWeeklyBatch}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '22px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#475569', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Staff Member
                </label>
                <input
                  type="text"
                  value={targetStaff}
                  onChange={(e) => setTargetStaff(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', background: '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#475569', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Assigned Participant
                </label>
                <input
                  type="text"
                  value={targetParticipant}
                  onChange={(e) => setTargetParticipant(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', background: '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#475569', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Role Classification
                </label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', background: '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
                >
                  <option value="Support Worker">Support Worker</option>
                  <option value="Senior Support">Senior Support</option>
                  <option value="Registered Nurse">Registered Nurse</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {daysOfWeek.map((day) => {
                const dayData = selectedDays[day];
                const theme = dayColorThemes[day];
                const dateLabel = dayDates[day];

                return (
                  <div 
                    key={day} 
                    onClick={() => toggleDayActive(day)}
                    style={{ display: 'grid', gridTemplateColumns: '150px 1fr 120px auto', gap: '14px', alignItems: 'center', background: dayData.active ? theme.bg : '#ffffff', border: `1px solid ${dayData.active ? theme.border : '#e2e8f0'}`, padding: '10px 16px', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.15s ease' }}
                  >
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={dayData.active}
                        onChange={() => toggleDayActive(day)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: theme.accent }}
                      />
                      <div>
                        <div style={{ fontWeight: 800, color: theme.header, fontSize: '0.85rem' }}>{day}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>{dateLabel}</div>
                      </div>
                    </div>

                    <div onClick={(e) => e.stopPropagation()}>
                      <span style={{ fontSize: '0.65rem', color: '#64748b', display: 'block', marginBottom: '2px', fontWeight: 700 }}>TIME WINDOW</span>
                      <input
                        type="text"
                        value={dayData.time}
                        disabled={!dayData.active}
                        onChange={(e) => handleDayChange(day, 'time', e.target.value)}
                        onBlur={(e) => handleTimeBlur(day, e.target.value)}
                        placeholder="e.g. 8-16"
                        style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#ffffff', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div onClick={(e) => e.stopPropagation()}>
                      <span style={{ fontSize: '0.65rem', color: '#64748b', display: 'block', marginBottom: '2px', fontWeight: 700 }}>HOURS</span>
                      <input
                        type="number"
                        step="0.5"
                        value={dayData.hours}
                        disabled={!dayData.active}
                        onChange={(e) => handleDayChange(day, 'hours', e.target.value)}
                        style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#ffffff', fontWeight: 'bold', color: theme.header, boxSizing: 'border-box' }}
                      />
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', background: dayData.active ? theme.border : '#f1f5f9', color: dayData.active ? theme.header : '#94a3b8' }}>
                        {dayData.active ? 'Scheduled' : 'Off Day'}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
              <button
                type="button"
                onClick={() => setActiveTab('matrix')}
                style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 2px 4px rgba(37,99,235,0.2)' }}
              >
                Publish Weekly Schedule ({batchActiveDaysCount} Shifts)
              </button>
            </div>
          </form>
        </div>
      )}

      {/* VIEW 2: ROSTER MATRIX WITH TRUE GRID STRUCTURE */}
      {activeTab === 'matrix' && (
        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          
          {/* Header Controls */}
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>Active Shift Roster Matrix (Mon – Sun)</h3>
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Grid-aligned layout with distinct day colors. Click any shift card to edit.</span>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="🔍 Search staff member..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.78rem', outline: 'none', background: '#ffffff', width: '180px', boxSizing: 'border-box' }}
              />

              <button
                onClick={() => window.print()}
                style={{ background: '#ffffff', color: '#475569', border: '1px solid #cbd5e1', padding: '6px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
              >
                🖨️ Print
              </button>
              <button
                onClick={() => setActiveTab('batch')}
                style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
              >
                + Add Shifts
              </button>
            </div>
          </div>

          {/* Grid Table Header Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '200px repeat(7, 1fr)', background: '#f1f5f9', borderBottom: '2px solid #cbd5e1', textAlign: 'center' }}>
            <div style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 800, fontSize: '0.75rem', color: '#475569', borderRight: '1px solid #cbd5e1', textTransform: 'uppercase' }}>
              Staff Member
            </div>
            {daysOfWeek.map(day => (
              <div key={day} style={{ padding: '10px 4px', fontWeight: 800, fontSize: '0.75rem', color: dayColorThemes[day].header, borderRight: '1px solid #cbd5e1', background: `${dayColorThemes[day].bg}80` }}>
                {day} <span style={{ fontSize: '0.6rem', opacity: 0.8, display: 'block' }}>{dayDates[day]}</span>
              </div>
            ))}
          </div>

          {/* Grid Rows per Staff */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {allStaffList.length === 0 ? (
              <div style={{ padding: '36px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                No staff found matching "{searchQuery}".
              </div>
            ) : (
              allStaffList.map((staffName, idx, arr) => {
                const staffShifts = shifts.filter(s => (s.staff || 'Unassigned') === staffName);
                const staffTotal = staffShifts.reduce((sum, s) => sum + parseFloat(s.hours || 0), 0);
                const isOvertime = staffTotal > 38;

                const staffAccents = ['#2563eb', '#16a34a', '#9333ea', '#ea580c', '#0891b2', '#db2777'];
                const staffBorderColor = staffAccents[idx % staffAccents.length];

                return (
                  <div 
                    key={staffName} 
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '200px repeat(7, 1fr)', 
                      borderBottom: idx === arr.length - 1 ? 'none' : '1px solid #cbd5e1',
                      background: idx % 2 === 0 ? '#ffffff' : '#fafafa',
                      alignItems: 'stretch'
                    }}
                  >
                    
                    {/* Staff Profile Cell */}
                    <div style={{ padding: '12px 14px', borderRight: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', gap: '10px', borderLeft: `4px solid ${staffBorderColor}` }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `${staffBorderColor}15`, color: staffBorderColor, fontWeight: 700, fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${staffBorderColor}40`, flexShrink: 0 }}>
                        {getInitials(staffName)}
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{staffName}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1px' }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: isOvertime ? '#dc2626' : '#0f172a' }}>{staffTotal}h</span>
                          {isOvertime ? (
                            <span style={{ background: '#fef2f2', color: '#dc2626', fontSize: '0.58rem', fontWeight: 700, padding: '1px 3px', borderRadius: '3px', border: '1px solid #fecaca' }}>
                              OT
                            </span>
                          ) : (
                            <span style={{ background: '#f0fdf4', color: '#16a34a', fontSize: '0.58rem', fontWeight: 700, padding: '1px 3px', borderRadius: '3px' }}>
                              Opt
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Day Cells (Grid Columns Mon-Sun) */}
                    {daysOfWeek.map(dayName => {
                      const dayShifts = staffShifts.filter(s => s.day === dayName);
                      const theme = dayColorThemes[dayName];

                      return (
                        <div 
                          key={dayName} 
                          style={{ 
                            padding: '8px 6px', 
                            borderRight: '1px solid #cbd5e1', 
                            background: dayShifts.length > 0 ? theme.bg : '#ffffff',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px',
                            justifyContent: 'center',
                            minHeight: '64px'
                          }}
                        >
                          {dayShifts.length === 0 ? (
                            <div style={{ textAlign: 'center', opacity: 0.3 }}>
                              <span style={{ fontSize: '0.6rem', color: '#94a3b8' }}>—</span>
                            </div>
                          ) : (
                            dayShifts.map(shift => {
                              const badgeStyle = getRoleBadgeStyle(shift.role);
                              return (
                                <div
                                  key={shift.id}
                                  onClick={() => setSelectedShiftForEdit({ ...shift })}
                                  style={{ 
                                    background: '#ffffff', 
                                    border: `1.5px solid ${theme.border}`, 
                                    borderRadius: '6px', 
                                    padding: '5px 6px', 
                                    cursor: 'pointer', 
                                    transition: 'transform 0.1s ease, box-shadow 0.1s ease', 
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)' 
                                  }}
                                  title={`Click to edit shift (${shift.day})`}
                                >
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                                    <span style={{ fontWeight: 800, fontSize: '0.6rem', color: theme.header }}>{shift.role.split(' ')[0]}</span>
                                    <span style={{ fontSize: '0.58rem', fontWeight: 700, background: badgeStyle.bg, color: badgeStyle.color, border: `1px solid ${badgeStyle.border}`, padding: '1px 3px', borderRadius: '3px' }}>
                                      {shift.hours}h
                                    </span>
                                  </div>
                                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {shift.participant}
                                  </div>
                                  <div style={{ fontSize: '0.58rem', color: '#475569', marginTop: '1px', fontWeight: 500 }}>
                                    {shift.timeSlot}
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      );
                    })}

                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* FULL SHIFT EDIT & UPDATE MODAL */}
      {selectedShiftForEdit && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>Edit Shift Details</h3>
            <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '0.8rem' }}>
              Updating shift for <b>{selectedShiftForEdit.staff}</b> on <b>{selectedShiftForEdit.day}</b>
            </p>

            <form onSubmit={handleSaveEditedShift}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Assigned Participant
                </label>
                <input
                  type="text"
                  value={selectedShiftForEdit.participant}
                  onChange={(e) => setSelectedShiftForEdit({ ...selectedShiftForEdit, participant: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', outline: 'none', background: '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
                  required
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Role Classification
                </label>
                <select
                  value={selectedShiftForEdit.role || 'Support Worker'}
                  onChange={(e) => setSelectedShiftForEdit({ ...selectedShiftForEdit, role: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', outline: 'none', background: '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
                >
                  <option value="Support Worker">Support Worker</option>
                  <option value="Senior Support">Senior Support</option>
                  <option value="Registered Nurse">Registered Nurse</option>
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Time Window (Auto-calculates hours)
                </label>
                <input
                  type="text"
                  value={selectedShiftForEdit.timeSlot}
                  onChange={(e) => setSelectedShiftForEdit({ ...selectedShiftForEdit, timeSlot: e.target.value })}
                  placeholder="e.g. 08:00 - 16:00"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', outline: 'none', background: '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => handleDeleteShift(selectedShiftForEdit.id)}
                  style={{ background: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca', padding: '8px 12px', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Delete Shift
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedShiftForEdit(null)}
                    style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}