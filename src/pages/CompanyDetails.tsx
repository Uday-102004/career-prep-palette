import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useCompanies } from '@/contexts/CompanyContext';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2, Download, ExternalLink, FileText, Trash2, Edit } from 'lucide-react';
import { CARD_COLORS } from '@/types';
import { toast } from 'sonner';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const colorClasses: Record<string, string> = {
  orange: 'bg-card-orange',
  purple: 'bg-card-purple',
  blue: 'bg-card-blue',
  maroon: 'bg-card-maroon',
  teal: 'bg-card-teal',
  indigo: 'bg-card-indigo',
};

const CompanyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getCompany, deleteCompany } = useCompanies();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const isAdmin = user?.role === 'admin';
  const company = getCompany(id || '');

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <Building2 className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-foreground mb-4">Company Not Found</h1>
          <p className="text-muted-foreground mb-8">The company you're looking for doesn't exist.</p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const colorKey = CARD_COLORS[company.colorIndex % CARD_COLORS.length];
  const bgClass = colorClasses[colorKey];

  const handleDownload = (pdfName: string) => {
    toast.success(`Downloading ${pdfName}...`);
    // In production, this would trigger actual file download
  };

  const handleApply = () => {
    window.open(company.applicationLink, '_blank');
    toast.success('Opening application page...');
  };

  const handleDelete = () => {
    deleteCompany(company.id);
    toast.success('Company deleted successfully');
    navigate(isAdmin ? '/admin/dashboard' : '/user/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        {/* Company Header Card */}
        <div className="bg-card rounded-xl card-shadow overflow-hidden mb-8 animate-fade-in">
          <div className={`${bgClass} h-40 relative`}>
            <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiLz48L2c+PC9zdmc+')]" />
            
            <div className="relative z-10 h-full flex items-center p-8">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="h-20 w-20 object-contain rounded-xl bg-primary-foreground/20 p-2"
                />
              ) : (
                <div className="h-20 w-20 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                  <Building2 className="h-10 w-10 text-primary-foreground" />
                </div>
              )}
              <div className="ml-6">
                <h1 className="text-3xl font-bold text-primary-foreground mb-2">
                  {company.name}
                </h1>
                <p className="text-primary-foreground/80">
                  {company.pdfs.length} PDF{company.pdfs.length !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">About</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {company.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button variant="accent" onClick={handleApply}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Apply Now
              </Button>
              
              {isAdmin && (
                <>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Company
                  </Button>
                  <Button variant="outline" onClick={() => setShowDeleteDialog(true)} className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* PDFs Section */}
        <div className="bg-card rounded-xl card-shadow p-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" />
            Preparation Materials
          </h2>

          {company.pdfs.length > 0 ? (
            <div className="space-y-3">
              {company.pdfs.map((pdf, index) => (
                <div
                  key={pdf.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors animate-fade-in"
                  style={{ animationDelay: `${(index + 2) * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{pdf.name}</p>
                      <p className="text-sm text-muted-foreground">{pdf.size}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(pdf.name)}
                    className="text-accent hover:text-accent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-secondary/50 rounded-lg">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No PDFs available for this company yet.</p>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Company</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {company.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" className="flex-1" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyDetails;
