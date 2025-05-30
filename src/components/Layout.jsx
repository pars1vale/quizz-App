import { Link } from 'react-router-dom';

const Layout = ({ children, user, setUser }) => {
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('quizUser');
        localStorage.removeItem('quizData');
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Kuis Film</h1>
                {user && (
                    <div className="user-info">
                        <span>Halo, {user.name}</span>
                        <button onClick={handleLogout}>Keluar</button>
                    </div>
                )}
            </header>
            <main className="app-main">
                {children}
            </main>
        </div>
    );
};

export default Layout;