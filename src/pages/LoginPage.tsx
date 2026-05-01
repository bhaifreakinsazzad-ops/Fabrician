import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Eye, EyeOff, LogIn, UserPlus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/store/useAuth';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (isLogin) {
        const success = login(formData.email, formData.password);
        if (success) { toast.success('Welcome back!'); navigate('/'); }
        else toast.error('Invalid credentials. Try demo@fabrician.com / demo123');
      } else {
        const success = signup(formData.name, formData.email, formData.phone, formData.password);
        if (success) { toast.success('Account created! Welcome to Fabrician.'); navigate('/'); }
        else toast.error('Email already exists');
      }
      setIsLoading(false);
    }, 500);
  };

  const update = (key: string, val: string) => setFormData(d => ({ ...d, [key]: val }));

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Warm ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(200,165,122,0.10)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(184,146,74,0.07)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        {/* Card */}
        <div className="rounded-3xl bg-card border border-border/40 shadow-card-hover overflow-hidden">
          {/* Warm gradient strip */}
          <div className="h-1" style={{ background: 'linear-gradient(90deg, #C8A57A 0%, #D4B896 50%, #B8924A 100%)' }} />

          <div className="p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex flex-col items-center gap-2">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)',
                    boxShadow: '0 4px 18px rgba(184,146,74,0.30)',
                  }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-display font-semibold" style={{ color: '#202432' }}>
                  Fabrician
                </span>
                <p className="text-xs text-muted-foreground -mt-1">
                  Premium baby fashion · Free delivery in Bangladesh
                </p>
              </Link>
            </div>

            {/* Tab switcher */}
            <div className="flex bg-muted rounded-full p-1 mb-6">
              {[{ label: 'Sign In', val: true }, { label: 'Create Account', val: false }].map(({ label, val }) => (
                <button
                  key={label}
                  onClick={() => setIsLogin(val)}
                  className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isLogin === val
                      ? 'bg-white dark:bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Form */}
            <AnimatePresence mode="wait">
              <motion.form
                key={String(isLogin)}
                initial={{ opacity: 0, x: isLogin ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 10 : -10 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {!isLogin && (
                  <div>
                    <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Full Name</Label>
                    <Input id="name" placeholder="Your name" value={formData.name} onChange={e => update('name', e.target.value)} required className="mt-1.5 rounded-xl border-border/60 focus:border-primary/40" />
                  </div>
                )}
                <div>
                  <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={e => update('email', e.target.value)} required className="mt-1.5 rounded-xl border-border/60 focus:border-primary/40" />
                </div>
                {!isLogin && (
                  <div>
                    <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Phone Number</Label>
                    <Input id="phone" placeholder="+880 1XXX-XXXXXX" value={formData.phone} onChange={e => update('phone', e.target.value)} required className="mt-1.5 rounded-xl border-border/60 focus:border-primary/40" />
                  </div>
                )}
                <div>
                  <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Password</Label>
                  <div className="relative mt-1.5">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={e => update('password', e.target.value)}
                      required
                      className="rounded-xl border-border/60 pr-10 focus:border-primary/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(s => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-2xl py-5 font-semibold gap-2 mt-2 text-white"
                  style={{
                    background: 'linear-gradient(135deg, #C8A57A 0%, #B8924A 100%)',
                    boxShadow: '0 4px 20px rgba(184,146,74,0.30)',
                  }}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isLogin ? (
                    <><LogIn className="w-4 h-4" /> Sign In</>
                  ) : (
                    <><UserPlus className="w-4 h-4" /> Create Account</>
                  )}
                </Button>
              </motion.form>
            </AnimatePresence>

            {/* Demo credentials */}
            <div className="mt-6 p-3 rounded-xl bg-muted/60 text-xs text-muted-foreground text-center space-y-0.5">
              <p className="font-semibold text-foreground text-[11px] uppercase tracking-wide mb-1">Demo Credentials</p>
              <p>Customer: demo@fabrician.com / demo123</p>
              <p>Admin: admin@fabrician.com / admin123</p>
            </div>

            {/* Shop link */}
            <div className="mt-4 text-center">
              <Link
                to="/shop"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Browse without account <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
