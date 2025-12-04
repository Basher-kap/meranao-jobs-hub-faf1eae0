import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Briefcase, Users, BarChart3, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const getNavLinks = () => {
    if (!isAuthenticated) {
      return [{ href: "/", label: "Home", icon: null }];
    }

    switch (user?.role) {
      case "student":
        return [
          { href: "/jobs", label: "Find Jobs", icon: Briefcase },
        ];
      case "hirer":
        return [
          { href: "/hire", label: "Post Jobs", icon: Users },
        ];
      case "admin":
        return [
          { href: "/admin", label: "Dashboard", icon: BarChart3 },
        ];
      default:
        return [{ href: "/", label: "Home", icon: null }];
    }
  };

  const navLinks = getNavLinks();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-maroon-deep/95 backdrop-blur-md border-b border-gold-warm/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
              <span className="font-display font-bold text-maroon-deep text-lg md:text-xl">M</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-gold-bright text-lg md:text-xl font-semibold tracking-wide">
                MSU JobApp
              </h1>
              <p className="text-gold-muted/80 text-xs tracking-widest uppercase">Part-Time Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2",
                  location.pathname === link.href
                    ? "bg-gold-warm/20 text-gold-bright"
                    : "text-gold-muted hover:text-gold-bright hover:bg-gold-warm/10"
                )}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gold-warm/10 rounded-full">
                  <User className="w-4 h-4 text-gold-bright" />
                  <span className="text-gold-bright text-sm font-medium">
                    {user?.name}
                  </span>
                  <span className="text-gold-muted text-xs px-2 py-0.5 bg-gold-warm/20 rounded-full capitalize">
                    {user?.role}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout} className="border-gold-warm/30 text-gold-bright hover:bg-gold-warm/10">
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="gold" size="sm">
                  Login / Sign Up
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gold-bright hover:bg-gold-warm/10 rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gold-warm/20 animate-fade-up">
            <div className="flex flex-col gap-2">
              {isAuthenticated && (
                <div className="flex items-center gap-2 px-4 py-2 mb-2 bg-gold-warm/10 rounded-lg">
                  <User className="w-4 h-4 text-gold-bright" />
                  <span className="text-gold-bright text-sm font-medium">{user?.name}</span>
                  <span className="text-gold-muted text-xs px-2 py-0.5 bg-gold-warm/20 rounded-full capitalize">
                    {user?.role}
                  </span>
                </div>
              )}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-3",
                    location.pathname === link.href
                      ? "bg-gold-warm/20 text-gold-bright"
                      : "text-gold-muted hover:text-gold-bright hover:bg-gold-warm/10"
                  )}
                >
                  {link.icon && <link.icon className="w-5 h-5" />}
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 mt-2 border-t border-gold-warm/20">
                {isAuthenticated ? (
                  <Button variant="outline" className="w-full border-gold-warm/30 text-gold-bright" onClick={() => { handleLogout(); setIsOpen(false); }}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="gold" className="w-full">
                      Login / Sign Up
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
