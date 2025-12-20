import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Upload, X } from 'lucide-react';
import { useCompanies } from '@/contexts/CompanyContext';
import { toast } from 'sonner';

interface AddCompanyDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AddCompanyDialog = ({ open, onOpenChange }: AddCompanyDialogProps) => {
  const { addCompany } = useCompanies();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    applicationLink: '',
    logo: '',
  });
  const [pdfNames, setPdfNames] = useState<string[]>([]);

  const dialogOpen = open !== undefined ? open : isOpen;
  const setDialogOpen = onOpenChange || setIsOpen;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.applicationLink) {
      toast.error('Please fill in all required fields');
      return;
    }

    addCompany({
      name: formData.name,
      description: formData.description,
      applicationLink: formData.applicationLink,
      logo: formData.logo,
      pdfs: pdfNames.map((name, index) => ({
        id: `pdf-${Date.now()}-${index}`,
        name,
        url: '#',
        size: 'Pending upload',
      })),
    });

    toast.success('Company added successfully!');
    setFormData({ name: '', description: '', applicationLink: '', logo: '' });
    setPdfNames([]);
    setDialogOpen(false);
  };

  const addPdfName = () => {
    setPdfNames(prev => [...prev, `Document ${prev.length + 1}.pdf`]);
  };

  const removePdf = (index: number) => {
    setPdfNames(prev => prev.filter((_, i) => i !== index));
  };

  const updatePdfName = (index: number, name: string) => {
    setPdfNames(prev => prev.map((n, i) => i === index ? name : n));
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="accent" size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Add Company
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Company</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Company Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Google"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description about the company..."
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="applicationLink">Application Link *</Label>
            <Input
              id="applicationLink"
              type="url"
              value={formData.applicationLink}
              onChange={(e) => setFormData(prev => ({ ...prev, applicationLink: e.target.value }))}
              placeholder="https://careers.company.com"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL (optional)</Label>
            <Input
              id="logo"
              type="url"
              value={formData.logo}
              onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
              placeholder="https://company.com/logo.png"
              className="h-11"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>PDF Documents</Label>
              <Button type="button" variant="outline" size="sm" onClick={addPdfName}>
                <Upload className="h-4 w-4 mr-2" />
                Add PDF
              </Button>
            </div>
            
            {pdfNames.length > 0 && (
              <div className="space-y-2">
                {pdfNames.map((name, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={name}
                      onChange={(e) => updatePdfName(index, e.target.value)}
                      placeholder="Document name.pdf"
                      className="h-10 flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removePdf(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {pdfNames.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No PDFs added yet. Click "Add PDF" to add documents.
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" className="flex-1">
              Add Company
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
