import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, LogIn, AlertCircle } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect immediately if already logged in
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('admin_token', data.token);
        // Force header update by triggering storage event or redirecting
        window.dispatchEvent(new Event('storage'));
        navigate('/dashboard', { replace: true });
      } else {
        setError(data.error || 'Credenciais inválidas. Tente novamente.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Erro de conexão com o servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background glow accent */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[30vw] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Title / Logo Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="font-display font-extrabold text-3xl text-white tracking-tight">
            Área Administrativa
          </h2>
          <p className="text-sm text-slate-400">
            Acesse o painel de controle e monitoramento do WhatsApp.
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-panel rounded-2xl p-8 border border-dark-border/80 shadow-2xl shadow-black/40">
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Username Input */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-xs font-semibold text-slate-300">
                Usuário
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-4 text-slate-500 w-4 h-4" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-dark/40 border border-dark-border text-slate-100 placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-semibold text-slate-300">
                Senha
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 text-slate-500 w-4 h-4" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-dark/40 border border-dark-border text-slate-100 placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm disabled:opacity-50"
                />
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-xs animate-fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="font-semibold">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full py-4 rounded-xl bg-primary text-dark font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-primary/95 active:scale-[0.99] transition-all disabled:opacity-50 disabled:scale-100 cursor-pointer shadow-lg shadow-primary/10"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-dark/20 border-t-dark rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Entrar no Painel</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
