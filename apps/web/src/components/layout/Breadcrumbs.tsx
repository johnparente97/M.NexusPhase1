import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center gap-1.5 py-3 px-6 text-[10px] font-medium text-zinc-500 max-w-7xl mx-auto w-full">
      <Link to="/" className="hover:text-zinc-300 flex items-center gap-1">
        <Home className="h-3.5 w-3.5" />
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const formattedName = value.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

        return (
          <div key={to} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 text-zinc-600 shrink-0" />
            {isLast ? (
              <span className="text-zinc-300 select-none truncate max-w-[150px]">{formattedName}</span>
            ) : (
              <Link to={to} className="hover:text-zinc-300 truncate max-w-[150px]">
                {formattedName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
