import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function AddLoan() {
  const nav = useNavigate();
  const [application_number, setApplicationNumber] = useState('');
  const [applicant_name, setApplicantName] = useState('');
  const [loan_amount, setLoanAmount] = useState('');
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await api.post('/loans', {
        application_number: Number(application_number),
        applicant_name,
        loan_amount: Number(loan_amount),
        status: 'Pending'
      });
      nav('/');
    } catch (e) {
      setError(e?.response?.data?.message || 'Could not create loan');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: 480 }}>
      <h3>Add Loan</h3>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10 }}>
        <input placeholder="Application Number" value={application_number} onChange={e=>setApplicationNumber(e.target.value)} />
        <input placeholder="Applicant Name" value={applicant_name} onChange={e=>setApplicantName(e.target.value)} />
        <input placeholder="Loan Amount" value={loan_amount} onChange={e=>setLoanAmount(e.target.value)} />
        <button disabled={saving} type="submit">Save</button>
        {error && <div style={{ color: 'crimson' }}>{error}</div>}
      </form>
    </div>
  );
}