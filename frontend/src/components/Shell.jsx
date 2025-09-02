import { Link, useNavigate } from 'react-router-dom';

export default function Shell ({ children}) {
    const nav = useNavigate();
    function logout() {
        localStorage.removeItem('token');
        nav('/login');
    }
    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24}}>
            <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
                <h2 style={{ margin:0}}>Loan Manager</h2>
                <nav style={{display: 'flex', gap: 12}}>
                    <Link to="/">Loans</Link>
                    <Link to="/add">Add Loan</Link>
                    <button onClick={logout}>Logout</button>
                </nav>
            </header>
            {children}
        </div>
    );
}