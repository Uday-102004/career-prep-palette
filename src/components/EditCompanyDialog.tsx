import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Link2, X } from 'lucide-react';
import { useCompanies } from '@/contexts/CompanyContext';
import { Company } from '@/types';
import { toast } from 'sonner';

interface PDFLink {
  id?: string;
  name: string;
  url: string;
}

interface EditCompanyDialogProps {
  company: Company;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditCompanyDialog = ({ company, open, onOpenChange }: EditCompanyDialogProps) => {
  const { updateCompany } = useCompanies();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    applicationLink: '',
    logo: '',
  });
  const [pdfLinks, setPdfLinks] = useState<PDFLink[]>([]);

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name,
        description: company.description,
        applicationLink: company.applicationLink,
        logo: company.logo || '',
      });
      setPdfLinks(company.pdfs.map(pdf => ({
        id: pdf.id,
        name: pdf.name,
        url: pdf.url,
      })));
    }
  }, [company]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.applicationLink) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Filter out empty PDF links
    const validPdfs = pdfLinks.filter(pdf => pdf.name && pdf.url);

    updateCompany(company.id, {
      name: formData.name,
      description: formData.description,
      applicationLink: formData.applicationLink,
      logo: formData.logo || undefined,
      pdfs: validPdfs.map((pdf, index) => ({
        id: pdf.id || `pdf-${Date.now()}-${index}`,
        name: pdf.name,
        url: pdf.url,
        size: 'External Link',
      })),
    });

    toast.success('Company updated successfully!');
    onOpenChange(false);
  };

  const addPdfLink = () => {
    setPdfLinks(prev => [...prev, { name: '', url: '' }]);
  };

  const removePdfLink = (index: number) => {
    setPdfLinks(prev => prev.filter((_, i) => i !== index));
  };

  const updatePdfLink = (index: number, field: 'name' | 'url', value: string) => {
    setPdfLinks(prev => prev.map((pdf, i) => 
      i === index ? { ...pdf, [field]: value } : pdf
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Company</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Company Name *</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Google"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description *</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description about the company..."
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-applicationLink">Application Link *</Label>
            <Input
              id="edit-applicationLink"
              type="url"
              value={formData.applicationLink}
              onChange={(e) => setFormData(prev => ({ ...prev, applicationLink: e.target.value }))}
              placeholder="https://careers.company.com"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-logo">Logo URL (optional)</Label>
            <Input
              id="edit-logo"
              type="url"
              value={formData.logo}
              onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
              placeholder="https://company.com/logo.png"
              className="h-11"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>PDF Links (optional)</Label>
              <Button type="button" variant="outline" size="sm" onClick={addPdfLink}>
                <Link2 className="h-4 w-4 mr-2" />
                Add PDF Link
              </Button>
            </div>
            
            {pdfLinks.length > 0 && (
              <div className="space-y-3">
                {pdfLinks.map((pdf, index) => (
                  <div key={index} className="space-y-2 p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-2">
                      <Input
                        value={pdf.name}
                        onChange={(e) => updatePdfLink(index, 'name', e.target.value)}
                        placeholder="PDF Name (e.g., Interview Guide)"
                        className="h-10 flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removePdfLink(index)}
                        className="text-destructive hover:text-destructive shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      value={pdf.url}
                      onChange={(e) => updatePdfLink(index, 'url', e.target.value)}
                      placeholder="PDF URL (e.g., https://drive.google.com/...)"
                      className="h-10"
                      type="url"
                    />
                  </div>
                ))}
              </div>
            )}
            
            {pdfLinks.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No PDF links. Click "Add PDF Link" to add document links.
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" className="flex-1">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
