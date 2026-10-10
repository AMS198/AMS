'use client';

// src/components/ui/BreadcrumbNav.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function BreadcrumbNav() {
  const pathname = usePathname();
  
  if (pathname === '/') return null;

  const paths = pathname.split('/').filter(Boolean);
  
  return (
    <nav aria-label="Breadcrumb" className="absolute top-[112px] md:top-[120px] w-full z-30 py-3 px-4 bg-white/5 border-y border-white/10 overflow-x-auto whitespace-nowrap">
      <ol className="flex items-center space-x-2 text-sm text-slate-400 container-custom">
        <li>
          <Link prefetch={false} href="/" className="hover:text-orange-400 transition-colors flex items-center gap-1">
            <Home size={14} />
            <span>Home</span>
          </Link>
        </li>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join('/')}`;
          const isLast = index === paths.length - 1;
          const label = path.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

          return (
            <li key={path} className="flex items-center space-x-2">
              <ChevronRight size={14} className="text-slate-600" />
              {isLast ? (
                <span className="text-white font-medium" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link prefetch={false} href={href} className="hover:text-orange-400 transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
