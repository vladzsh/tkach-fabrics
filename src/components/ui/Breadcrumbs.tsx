import {Link} from '@/i18n/navigation';
import { Home } from 'lucide-react';
import styles from './Breadcrumbs.module.css';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
      <Link href="/" className={styles.homeLink} aria-label="Home">
        <Home size={20} strokeWidth={2} />
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} style={{ display: 'contents' }}>
            <span className={styles.separator} aria-hidden="true">&gt;</span>
            {isLast || !item.href ? (
              <span className={styles.current}>{item.label}</span>
            ) : (
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
