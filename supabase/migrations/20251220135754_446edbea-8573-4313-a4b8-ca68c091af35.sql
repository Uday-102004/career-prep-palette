-- Create companies table
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  application_link TEXT NOT NULL,
  logo TEXT,
  color_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create company_pdfs table
CREATE TABLE public.company_pdfs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  size TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_pdfs ENABLE ROW LEVEL SECURITY;

-- Companies: Anyone can read (users need to see them)
CREATE POLICY "Anyone can read companies" 
ON public.companies FOR SELECT 
USING (true);

-- Companies: Only authenticated users can insert/update/delete (admin check in app layer)
CREATE POLICY "Authenticated users can insert companies" 
ON public.companies FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update companies" 
ON public.companies FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete companies" 
ON public.companies FOR DELETE 
TO authenticated
USING (true);

-- Company PDFs: Anyone can read
CREATE POLICY "Anyone can read company PDFs" 
ON public.company_pdfs FOR SELECT 
USING (true);

-- Company PDFs: Only authenticated users can manage
CREATE POLICY "Authenticated users can insert PDFs" 
ON public.company_pdfs FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete PDFs" 
ON public.company_pdfs FOR DELETE 
TO authenticated
USING (true);

-- Create storage bucket for company PDFs
INSERT INTO storage.buckets (id, name, public) VALUES ('company-pdfs', 'company-pdfs', false);

-- Storage policies: Only authenticated users can access
CREATE POLICY "Authenticated users can read PDFs"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'company-pdfs');

CREATE POLICY "Authenticated users can upload PDFs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'company-pdfs');

CREATE POLICY "Authenticated users can delete PDFs"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'company-pdfs');

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_companies_updated_at
BEFORE UPDATE ON public.companies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();