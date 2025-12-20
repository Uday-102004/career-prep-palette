import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { CompanyCard } from '@/components/CompanyCard';
import { SearchBar } from '@/components/SearchBar';
import { AddCompanyDialog } from '@/components/AddCompanyDialog';
import { useCompanies } from '@/contexts/CompanyContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Building2, FileText, Users } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { companies } = useCompanies();
  const [searchQuery, setSearchQuery] = useState('');

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  const filteredCompanies = useMemo(() => {
    if (!searchQuery) return companies;
    return companies.filter(company =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [companies, searchQuery]);

  const totalPdfs = companies.reduce((acc, company) => acc + company.pdfs.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Building2, label: 'Total Companies', value: companies.length, color: 'bg-card-blue' },
            { icon: FileText, label: 'Total PDFs', value: totalPdfs, color: 'bg-card-purple' },
            { icon: Users, label: 'Total Users', value: 24, color: 'bg-accent' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl card-shadow p-5 flex items-center gap-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Header with Search and Add Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Companies</h2>
            <p className="text-muted-foreground">Manage your company resources</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <AddCompanyDialog />
          </div>
        </div>

        {/* Company Grid */}
        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map(company => (
              <CompanyCard key={company.id} company={company} isAdmin />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-xl card-shadow">
            <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {searchQuery ? 'No companies found' : 'No companies yet'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery 
                ? 'Try adjusting your search query' 
                : 'Click "Add Company" to add your first company'
              }
            </p>
            {!searchQuery && <AddCompanyDialog />}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
