const API_BASE_URL = 'http://localhost:5000/api';

// Fetch all participants/budgets from MongoDB
export async function getParticipants() {
  try {
    const res = await fetch(`${API_BASE_URL}/participants`);
    return await res.json();
  } catch (err) {
    console.error('Error fetching participants:', err);
    return [];
  }
}

// Fetch all staff members from MongoDB (New Function)
export async function getStaff() {
  try {
    const res = await fetch(`${API_BASE_URL}/staff`);
    if (!res.ok) throw new Error('Failed to fetch staff records');
    return await res.json();
  } catch (err) {
    console.error('Error fetching staff:', err);
    return [];
  }
}