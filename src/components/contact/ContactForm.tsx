'use client';

import { useState } from 'react';
import {useTranslations} from 'next-intl';
import { CheckCircle } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const t = useTranslations('ContactForm');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = t('nameRequired');
    }
    if (!email.trim()) {
      newErrors.email = t('emailRequired');
    } else if (!email.includes('@')) {
      newErrors.email = t('emailInvalid');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  }

  function handleReset() {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setErrors({});
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className={styles.success}>
        <CheckCircle size={48} color="var(--color-accent)" />
        <p className={styles.successTitle}>{t('successTitle')}</p>
        <p className={styles.successSub}>{t('successSubtitle')}</p>
        <Button variant="outline" onClick={handleReset}>
          {t('sendAnother')}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <Input
        label={t('name')}
        name="name"
        placeholder={t('namePlaceholder')}
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />
      <Input
        label={t('email')}
        name="email"
        type="email"
        placeholder={t('emailPlaceholder')}
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <Input
        label={t('phone')}
        name="phone"
        type="tel"
        placeholder={t('phonePlaceholder')}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Input
        label={t('message')}
        name="message"
        placeholder={t('messagePlaceholder')}
        textarea
        value={message}
        onChange={(e) => setMessage((e as unknown as React.ChangeEvent<HTMLTextAreaElement>).target.value)}
      />
      <Button type="submit">{t('send')}</Button>
    </form>
  );
}
