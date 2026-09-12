import { useState, useEffect } from 'react';
import { getStaff } from '../services/api';

export default function StaffDirectory() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStaff().then((data) => {
      setStaffList(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading staff...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Staff Directory (MongoDB Live)</h2>
      {staffList.length === 0 ? (
        <p>No staff found in database.</p>
      ) : (
        <ul>
          {staffList.map((s) => (
            <li key={s._id}>
              <strong>{s.name}</strong> — {s.role} ({s.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}