import { useEffect, useState, useCallback } from 'react';
import api from '../api';

export default function LoansList() {
  const [status, setStatus] = useState('');
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/loans', { params: status ? { status } : {} });
      setLoans(data);
    } catch (e) {
      setError(e?.response?.data?.message || 'Failed to load loans');
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => { load(); }, [load]);

  async function setLoanStatus(id, s) {
    try {
      await api.put(`/loans/${id}/status`, { status: s });
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to update status');
    }
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <label>Status:</label>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value=''>All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
        <button onClick={load} disabled={loading}>Refresh</button>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      {!loading && !error && (
        <table width="100%" cellPadding={8}>
          <thead>
            <tr>
              <th>Application #</th>
              <th>Applicant</th>
              <th>Amount</th>
              <th>Status</th>
              <th style={{ width: 200 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', color: '#666' }}>No loans</td></tr>
            ) : loans.map(l => (
              <tr key={l.id}>
                <td>{l.application_number}</td>
                <td>{l.applicant_name}</td>
                <td>{Number(l.loan_amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>{l.status}</td>
                <td>
                  {l.status === 'Pending'
                    ? (<>
                        <button onClick={() => setLoanStatus(l.id, 'Approved')}>Approve</button>{' '}
                        <button onClick={() => setLoanStatus(l.id, 'Rejected')}>Reject</button>
                      </>)
                    : <em>—</em>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}