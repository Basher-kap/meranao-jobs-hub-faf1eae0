import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Building2, Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { OkirPattern } from "@/components/decorative/OkirPattern";
import { useToast } from "@/hooks/use-toast";

const roles: { id: UserRole; label: string; icon: typeof User; description: string }[] = [
  { id: "student", label: "Student", icon: User, description: "Find part-time jobs" },
  { id: "hirer", label: "Hirer", icon: Building2, description: "Post job openings" },
  { id: "admin", label: "Admin", icon: Shield, description: "Manage the system" },
];

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    idNumber: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (isLogin) {
      const success = login({
        idNumber: selectedRole === "student" ? formData.idNumber : undefined,
        email: selectedRole !== "student" ? formData.email : undefined,
        password: formData.password,
        role: selectedRole,
      });

      if (success) {
        toast({ title: "Welcome back!", description: "Login successful" });
        navigateByRole(selectedRole);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } else {
      const success = signup({
        idNumber: selectedRole === "student" ? formData.idNumber : undefined,
        email: selectedRole !== "student" ? formData.email : undefined,
        name: formData.name,
        password: formData.password,
        role: selectedRole,
      });

      if (success) {
        toast({ title: "Account created!", description: "Welcome to MSU Part-Time JobApp" });
        navigateByRole(selectedRole);
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  const navigateByRole = (role: UserRole) => {
    switch (role) {
      case "student":
        navigate("/jobs");
        break;
      case "hirer":
        navigate("/hire");
        break;
      case "admin":
        navigate("/admin");
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-maroon flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-10">
        <OkirPattern variant="corner" className="w-full h-full" />
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10 rotate-180">
        <OkirPattern variant="corner" className="w-full h-full" />
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-gold-bright">
            MSU Part-Time JobApp
          </h1>
          <p className="text-gold-muted/80 mt-2">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-card rounded-2xl shadow-maroon border border-border/50 p-6 relative">
          <OkirPattern variant="corner" className="absolute top-2 right-2 w-12 h-12 opacity-20" />

          {/* Role Selection */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-foreground mb-3 block">
              I am a...
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-3 rounded-xl border-2 transition-all text-center ${
                    selectedRole === role.id
                      ? "border-gold-warm bg-gold-warm/10"
                      : "border-border hover:border-gold-warm/50"
                  }`}
                >
                  <role.icon className={`w-6 h-6 mx-auto mb-1 ${
                    selectedRole === role.id ? "text-gold-warm" : "text-muted-foreground"
                  }`} />
                  <span className={`text-xs font-medium ${
                    selectedRole === role.id ? "text-gold-warm" : "text-muted-foreground"
                  }`}>
                    {role.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field (signup only) */}
            {!isLogin && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Juan Dela Cruz"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
            )}

            {/* ID Number (students) or Email (hirers/admin) */}
            {selectedRole === "student" ? (
              <div>
                <Label htmlFor="idNumber">Student ID Number</Label>
                <Input
                  id="idNumber"
                  type="text"
                  placeholder="2024-0001"
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={selectedRole === "admin" ? "admin@msu.edu.ph" : "hr@company.com"}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
            )}

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (signup only) */}
            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
            )}

            {/* Error message */}
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            {/* Demo credentials hint */}
            {isLogin && (
              <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
                <p className="font-medium mb-1">Demo Credentials:</p>
                {selectedRole === "student" && <p>ID: 2024-0001 | Pass: student123</p>}
                {selectedRole === "hirer" && <p>Email: hirer@msu.edu.ph | Pass: hirer123</p>}
                {selectedRole === "admin" && <p>Email: admin@msu.edu.ph | Pass: admin123</p>}
              </div>
            )}

            {/* Submit button */}
            <Button type="submit" variant="gold" className="w-full">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          {/* Toggle login/signup */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-gold-warm hover:text-gold-bright font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {/* Back to home */}
        <p className="text-center mt-6">
          <a href="/" className="text-gold-muted/80 hover:text-gold-bright text-sm">
            ← Back to Home
          </a>
        </p>
      </div>
    </div>
  );
}
