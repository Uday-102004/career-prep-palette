import { Button } from '@/components/ui/button';
import { Shield, User, BookOpen, FileText, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Logo & Title */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 gradient-hero rounded-2xl mb-6 animate-float">
              <span className="text-3xl font-bold text-primary-foreground">PM</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              PrepMaster
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your one-stop platform for company preparation materials, resources, and application guides.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {[
              { icon: Briefcase, title: 'Company Resources', desc: 'Access materials from top companies' },
              { icon: FileText, title: 'PDF Downloads', desc: 'Get interview guides and prep docs' },
              { icon: BookOpen, title: 'Easy Access', desc: 'Everything organized in one place' },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card p-6 rounded-xl card-shadow text-center animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Login Options */}
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-center text-foreground mb-8">
              Choose Your Login
            </h2>
            
            <div className="grid gap-4">
              {/* Admin Login */}
              <button
                onClick={() => navigate('/admin/login')}
                className="group relative overflow-hidden bg-card p-6 rounded-xl card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 text-left animate-fade-in"
                style={{ animationDelay: '400ms' }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-14 h-14 gradient-hero rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">Admin Login</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage companies, upload resources, and control content
                    </p>
                  </div>
                  <div className="text-muted-foreground group-hover:text-primary transition-colors">
                    →
                  </div>
                </div>
              </button>

              {/* User Login */}
              <button
                onClick={() => navigate('/user/login')}
                className="group relative overflow-hidden bg-card p-6 rounded-xl card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 text-left animate-fade-in"
                style={{ animationDelay: '500ms' }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-14 h-14 gradient-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <User className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">User Login</h3>
                    <p className="text-sm text-muted-foreground">
                      Access company resources, download PDFs, and apply
                    </p>
                  </div>
                  <div className="text-muted-foreground group-hover:text-accent transition-colors">
                    →
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-20">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 PrepMaster. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
