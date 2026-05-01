import { useLocation } from 'react-router-dom';
import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

/**
 * Magazine-page transition — soft fade + rise on route change.
 * Restarts the .page-rise CSS animation every navigation.
 */
export function PageTransition({ children }: Props) {
  const location = useLocation();
  const key = `${location.pathname}${location.search}`;

  return (
    <div key={key} className="page-rise">
      {children}
    </div>
  );
}
