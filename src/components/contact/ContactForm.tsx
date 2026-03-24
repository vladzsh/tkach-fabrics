'use client';

import { useState } from 'react';
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!email.includes('@')) {
      newErrors.email = 'Enter a valid email address';
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
        <p className={styles.successTitle}>Message sent!</p>
        <p className={styles.successSub}>We&apos;ll get back to you soon.</p>
        <Button variant="outline" onClick={handleReset}>
          Send Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <Input
        label="Name"
        name="name"
        placeholder="Your name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="your@email.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <Input
        label="Phone"
        name="phone"
        type="tel"
        placeholder="+1 (555) 000-0000"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Input
        label="Message"
        name="message"
        placeholder="Your message..."
        textarea
        value={message}
        onChange={(e) => setMessage((e as unknown as React.ChangeEvent<HTMLTextAreaElement>).target.value)}
      />
      <Button type="submit">Send Message</Button>
    </form>
  );
}
