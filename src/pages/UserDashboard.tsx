import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { CompanyCard } from '@/components/CompanyCard';
import { SearchBar } from '@/components/SearchBar';
import { useCompanies } from '@/contexts/CompanyContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Building2, Sparkles } from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const { companies } = useCompanies();
  const [searchQuery, setSearchQuery] = useState('');

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/user/login" replace />;
  }

  const filteredCompanies = useMemo(() => {
    if (!searchQuery) return companies;
    return companies.filter(company =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [companies, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-card rounded-xl card-shadow p-6 mb-8 relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-14 h-14 gradient-accent rounded-xl flex items-center justify-center">
              <Sparkles className="h-7 w-7 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Welcome back!</h2>
              <p className="text-muted-foreground">
                Browse {companies.length} companies and download preparation materials
              </p>
            </div>
          </div>
        </div>

        {/* Header with Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">All Companies</h2>
            <p className="text-muted-foreground">Click on a company to view resources</p>
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Company Grid */}
        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-xl card-shadow">
            <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {searchQuery ? 'No companies found' : 'No companies available'}
            </h3>
            <p className="text-muted-foreground">
              {searchQuery 
                ? 'Try adjusting your search query' 
                : 'Check back later for new companies'
              }
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
