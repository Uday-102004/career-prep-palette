export interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  applicationLink: string;
  pdfs: PDFFile[];
  createdAt: Date;
  colorIndex: number;
}

export interface PDFFile {
  id: string;
  name: string;
  url: string;
  size: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export type CardColor = 'orange' | 'purple' | 'blue' | 'maroon' | 'teal' | 'indigo';

export const CARD_COLORS: CardColor[] = ['orange', 'purple', 'blue', 'maroon', 'teal', 'indigo'];
