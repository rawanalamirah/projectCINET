import {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const loc = useLocation();
    const next = new URLSearchParams(loc.search).get('next') || '/';

    async function onSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            console.log('[Login] POST', import.meta.env.VITE_API_URL + '/auth/login', { username, password });
            const {data} = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', data.token);
            nav(next);
        } catch (err) {
            console.error('[Login] error:', err?.response || err);
            setError(err?.response?.data?.message || 'login failed');
        } finally {
            setLoading(false);
        }
    }

    return (<div style={{ maxWidth: 380, margin: '15vh auto' }}>
      <h3>Branch Manager Login</h3>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10 }}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button disabled={loading} type="submit">Login</button>
        {error && <div style={{ color: 'crimson' }}>{error}</div>}
      </form>
      <p style={{ marginTop: 8, color: '#666' }}>Try: <code>manager / manager123</code></p>
    </div>
  );
}