import React from 'react';
import './App.css';

export default function Dashboard({ setActiveTab }) {
  // Enhanced navigation handler to support optional sub-tabs/views
  const handleNavigation = (tab, subTab) => {
    if (setActiveTab) {
      // If your router accepts a second argument or object for sub-views:
      setActiveTab(tab, subTab);
    }
  };

  const moduleCards = [
    {
      title: 'NDIS Office Operations Center',
      description: 'Central hub for timesheet audit queues, active participant plan burn-rates, and service agreements.',
      value: '5',
      label: 'Active Workstreams',
      tab: 'NDIS Office Hub',
      icon: '🏢',
      badge: 'Core Operations',
      badgeBg: '#eff6ff',
      badgeColor: '#1d4ed8',
    },
    {
      title: 'Timesheet & Shift Audit',
      description: 'Review overtime mismatches, verify billable hours, and clear missing case note exceptions.',
      value: '2',
      label: 'Pending Flags',
      tab: 'Timesheet & Shift Audit',
      icon: '⏱️',
      badge: 'Action Required',
      badgeBg: '#fef2f2',
      badgeColor: '#dc2626',
    },
    {
      title: 'Knowledge Assistant & PII Shield',
      description: 'Cross-reference NDIS price caps, support catalogs, and organizational policy documents securely.',
      value: '24',
      label: 'Indexed Files',
      tab: 'Knowledge Assistant',
      icon: '🛡️',
      badge: 'AI Powered',
      badgeBg: '#faf5ff',
      badgeColor: '#7e22ce',
    },
  ];

  const alerts = [
    {
      title: 'Timesheet overtime mismatch flagged',
      count: 2,
      type: 'Timesheet Audit',
      accentColor: '#ef4444',
      bgTint: '#fef2f2',
      tab: 'Timesheet & Shift Audit',
    },
    {
      title: 'Participant plan burn-rate critical',
      count: 1,
      type: 'Plan Budgets',
      accentColor: '#f59e0b',
      bgTint: '#fffbeb',
      tab: 'NDIS Office Hub',
      subTab: 'Plan Budgets',
    },
    {
      title: 'Service agreements due for renewal',
      count: 1,
      type: 'Compliance',
      accentColor: '#3b82f6',
      bgTint: '#eff6ff',
      tab: 'NDIS Office Hub',
      subTab: 'Service Agreements', // Target sub-tab inside the NDIS Office Hub
    },
    {
      title: 'Verified timesheets cleared today',
      count: 14,
      type: 'Completed',
      accentColor: '#10b981',
      bgTint: '#ecfdf5',
      tab: 'Timesheet & Shift Audit',
    },
  ];

  const stats = [
    { label: 'Active Participants', value: '27', trend: '+2 this month', color: '#0f172a' },
    { label: 'Support Workers Scheduled', value: '32', trend: '100% rostered', color: '#0f172a' },
    { label: 'Active Service Plans', value: '5', trend: '3 high burn alerts', color: '#2563eb' },
    { label: 'Compliance Audit Rate', value: '94%', trend: 'Target: 95%', color: '#16a34a' },
  ];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#0f172a',
        paddingBottom: '32px',
      }}
    >
      {/* Top Banner / Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '28px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          padding: '24px 32px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '20px',
              background: '#f0fdf4',
              color: '#15803d',
              fontSize: '0.78rem',
              fontWeight: 700,
              marginBottom: '8px',
              border: '1px solid #bbf7d0',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }}></span>
            NDIS Provider Portal • System Online
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: '1.8rem',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.02em',
            }}
          >
            Executive Operations Dashboard
          </h1>

          <p style={{ margin: '6px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            Real-time oversight for support coordinators, roster schedulers, and registered managers.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => handleNavigation('NDIS Office Hub')}
            style={{
              background: '#0f172a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 16px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(15, 23, 42, 0.1)',
            }}
          >
            Open Office Hub
          </button>
          
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              padding: '10px 16px',
              textAlign: 'right',
            }}
          >
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
              Canberra Support Services
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Provider ID: 4050-9921
            </div>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '18px 20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              borderTop: '3px solid #2563eb',
            }}
          >
            <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              {stat.label}
            </div>

            <div
              style={{
                marginTop: '8px',
                fontSize: '1.85rem',
                fontWeight: 800,
                color: stat.color,
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>

            <div
              style={{
                marginTop: '8px',
                color: '#64748b',
                fontSize: '0.78rem',
                fontWeight: 500,
              }}
            >
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Alerts (Left 1/3) + Modules (Right 2/3) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
          marginBottom: '28px',
        }}
      >
        {/* Alerts Section */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                Operational Queue
              </h2>
              <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.8rem' }}>
                Items requiring compliance verification
              </p>
            </div>
            <span style={{ fontSize: '0.75rem', background: '#f1f5f9', padding: '2px 8px', borderRadius: '6px', fontWeight: 600, color: '#475569' }}>
              Live Feed
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {alerts.map((alert) => (
              <div
                key={alert.title}
                onClick={() => handleNavigation(alert.tab, alert.subTab)}
                style={{
                  background: alert.bgTint,
                  borderLeft: `4px solid ${alert.accentColor}`,
                  borderRadius: '10px',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'transform 0.1s ease',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: alert.accentColor,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {alert.type}
                  </div>
                  <div style={{ marginTop: '3px', color: '#334155', fontSize: '0.85rem', fontWeight: 600 }}>
                    {alert.title}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: alert.accentColor,
                    paddingLeft: '12px',
                  }}
                >
                  {alert.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modules Section */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            gridColumn: 'span 2',
          }}
        >
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
              Primary Management Hubs
            </h2>
            <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.8rem' }}>
              Direct access to operational compliance tools and AI assistants
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {moduleCards.map((module) => (
              <div
                key={module.title}
                style={{
                  border: '1px solid #e2e8f0',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 280px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '10px',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.3rem',
                      flexShrink: 0,
                    }}
                  >
                    {module.icon}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <h3 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 700, color: '#0f172a' }}>
                        {module.title}
                      </h3>
                      <span
                        style={{
                          background: module.badgeBg,
                          color: module.badgeColor,
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '12px',
                        }}
                      >
                        {module.badge}
                      </span>
                    </div>

                    <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.82rem', lineHeight: 1.4 }}>
                      {module.description}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0, marginLeft: 'auto' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2563eb' }}>
                      {module.value}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>
                      {module.label}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleNavigation(module.tab)}
                    style={{
                      background: '#2563eb',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 18px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
                    }}
                  >
                    Open Hub
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Compliance Notice */}
      <div
        style={{
          padding: '14px 20px',
          background: '#f1f5f9',
          border: '1px solid #cbd5e1',
          borderRadius: '12px',
          color: '#475569',
          fontSize: '0.8rem',
          lineHeight: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>🛡️</span>
        <div>
          <strong>NDIS Quality and Safeguards Compliance Notice:</strong> All simulated participant records, timesheet audits, and incident reports are protected under local PII data governance standards.
        </div>
      </div>
    </div>
  );
}