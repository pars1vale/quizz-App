import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) {
            setError('Nama dan email harus diisi');
            return;
        }
        setUser({ name, email });
        navigate('/');
    };

    return (
        <div className="login-container">
            <h1>Login Kuis</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nama:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan nama Anda"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan email Anda"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Masuk</button>
            </form>
        </div>
    );
};

export default Login;