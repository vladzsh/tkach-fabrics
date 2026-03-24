import {Link} from '@/i18n/navigation';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'outline' | 'ghost';

type ButtonProps = {
  variant?: Variant;
  href?: string;
  className?: string;
  children?: React.ReactNode;
} & ComponentPropsWithoutRef<'button'>;

export default function Button({
  variant = 'primary',
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ');

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
