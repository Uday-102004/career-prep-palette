import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Company, PDFFile } from '@/types';

interface CompanyContextType {
  companies: Company[];
  addCompany: (company: Omit<Company, 'id' | 'createdAt' | 'colorIndex'>) => void;
  updateCompany: (id: string, updates: Partial<Company>) => void;
  deleteCompany: (id: string) => void;
  getCompany: (id: string) => Company | undefined;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

// Mock data for demo
const initialCompanies: Company[] = [
  {
    id: '1',
    name: 'Google',
    description: 'Google LLC is an American multinational technology company focusing on artificial intelligence, online advertising, search engine technology, cloud computing, and more.',
    applicationLink: 'https://careers.google.com',
    logo: '',
    colorIndex: 0,
    pdfs: [
      { id: 'p1', name: 'Interview Guide.pdf', url: '#', size: '2.4 MB' },
      { id: 'p2', name: 'Coding Questions.pdf', url: '#', size: '1.8 MB' },
    ],
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Microsoft',
    description: 'Microsoft Corporation is an American multinational technology corporation producing computer software, consumer electronics, and personal computers.',
    applicationLink: 'https://careers.microsoft.com',
    logo: '',
    colorIndex: 1,
    pdfs: [
      { id: 'p3', name: 'System Design.pdf', url: '#', size: '3.1 MB' },
    ],
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Amazon',
    description: 'Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, and digital streaming.',
    applicationLink: 'https://www.amazon.jobs',
    logo: '',
    colorIndex: 2,
    pdfs: [
      { id: 'p4', name: 'Leadership Principles.pdf', url: '#', size: '1.2 MB' },
      { id: 'p5', name: 'Behavioral Questions.pdf', url: '#', size: '980 KB' },
    ],
    createdAt: new Date(),
  },
  {
    id: '4',
    name: 'Meta',
    description: 'Meta Platforms, Inc., doing business as Meta, is an American multinational technology conglomerate based in Menlo Park, California.',
    applicationLink: 'https://www.metacareers.com',
    logo: '',
    colorIndex: 3,
    pdfs: [
      { id: 'p6', name: 'Product Sense Guide.pdf', url: '#', size: '2.8 MB' },
    ],
    createdAt: new Date(),
  },
  {
    id: '5',
    name: 'Apple',
    description: 'Apple Inc. is an American multinational technology company headquartered in Cupertino, California. Apple designs, develops, and sells consumer electronics.',
    applicationLink: 'https://jobs.apple.com',
    logo: '',
    colorIndex: 4,
    pdfs: [
      { id: 'p7', name: 'Design Philosophy.pdf', url: '#', size: '4.2 MB' },
    ],
    createdAt: new Date(),
  },
  {
    id: '6',
    name: 'Netflix',
    description: 'Netflix, Inc. is an American over-the-top content platform and production company headquartered in Los Gatos, California.',
    applicationLink: 'https://jobs.netflix.com',
    logo: '',
    colorIndex: 5,
    pdfs: [
      { id: 'p8', name: 'Culture Deck.pdf', url: '#', size: '1.5 MB' },
    ],
    createdAt: new Date(),
  },
];

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);

  const addCompany = (company: Omit<Company, 'id' | 'createdAt' | 'colorIndex'>) => {
    const newCompany: Company = {
      ...company,
      id: `company-${Date.now()}`,
      createdAt: new Date(),
      colorIndex: companies.length % 6,
    };
    setCompanies(prev => [...prev, newCompany]);
  };

  const updateCompany = (id: string, updates: Partial<Company>) => {
    setCompanies(prev => 
      prev.map(company => 
        company.id === id ? { ...company, ...updates } : company
      )
    );
  };

  const deleteCompany = (id: string) => {
    setCompanies(prev => prev.filter(company => company.id !== id));
  };

  const getCompany = (id: string) => {
    return companies.find(company => company.id === id);
  };

  return (
    <CompanyContext.Provider value={{ companies, addCompany, updateCompany, deleteCompany, getCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanies = () => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompanies must be used within a CompanyProvider');
  }
  return context;
};
