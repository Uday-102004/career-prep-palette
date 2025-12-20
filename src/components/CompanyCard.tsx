import { Company, CARD_COLORS } from '@/types';
import { Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CompanyCardProps {
  company: Company;
  isAdmin?: boolean;
}

const colorClasses: Record<string, string> = {
  orange: 'bg-card-orange',
  purple: 'bg-card-purple',
  blue: 'bg-card-blue',
  maroon: 'bg-card-maroon',
  teal: 'bg-card-teal',
  indigo: 'bg-card-indigo',
};

export const CompanyCard = ({ company, isAdmin = false }: CompanyCardProps) => {
  const navigate = useNavigate();
  const colorKey = CARD_COLORS[company.colorIndex % CARD_COLORS.length];
  const bgClass = colorClasses[colorKey];

  const handleClick = () => {
    const basePath = isAdmin ? '/admin/company' : '/user/company';
    navigate(`${basePath}/${company.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-card rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${company.colorIndex * 50}ms` }}
    >
      {/* Colored Header */}
      <div className={`${bgClass} h-28 p-5 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiLz48L2c+PC9zdmc+')]" />
        
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-primary-foreground mb-1 line-clamp-2">
            {company.name}
          </h3>
          {company.logo ? (
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="h-8 w-8 object-contain rounded bg-primary-foreground/20"
            />
          ) : (
            <Building2 className="h-8 w-8 text-primary-foreground/80" />
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {company.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-accent font-semibold">
            {company.pdfs.length} PDF{company.pdfs.length !== 1 ? 's' : ''} available
          </span>
          <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
};
