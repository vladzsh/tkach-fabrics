"use client";

import { useState } from "react";
import {useTranslations} from 'next-intl';
import { CheckCircle } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import styles from "./QuoteModal.module.css";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  quantity: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

const emptyForm: FormValues = {
  name: "",
  email: "",
  phone: "",
  quantity: "",
  message: "",
};

export default function QuoteModal({ isOpen, onClose, productName }: QuoteModalProps) {
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations('QuoteModal');

  function handleClose() {
    setValues(emptyForm);
    setErrors({});
    setSubmitted(false);
    onClose();
  }

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!values.name.trim()) {
      newErrors.name = t('nameRequired');
    }
    if (!values.email.trim()) {
      newErrors.email = t('emailRequired');
    } else if (!values.email.includes("@")) {
      newErrors.email = t('emailInvalid');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={t('title')}>
      {submitted ? (
        <div className={styles.success}>
          <CheckCircle size={48} className={styles.successIcon} />
          <p className={styles.successTitle}>{t('successTitle')}</p>
          <p className={styles.successSubtitle}>{t('successSubtitle')}</p>
          <Button variant="primary" onClick={handleClose} className={styles.closeBtn}>
            {t('close')}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <Input
            label={t('product')}
            name="product"
            value={productName}
            disabled
            readOnly
            className={styles.readOnly}
          />
          <Input
            label={t('name')}
            name="name"
            placeholder={t('namePlaceholder')}
            required
            value={values.name}
            error={errors.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <Input
            label={t('email')}
            name="email"
            type="email"
            placeholder={t('emailPlaceholder')}
            required
            value={values.email}
            error={errors.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Input
            label={t('phone')}
            name="phone"
            type="tel"
            placeholder={t('phonePlaceholder')}
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <Input
            label={t('quantity')}
            name="quantity"
            placeholder={t('quantityPlaceholder')}
            value={values.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
          />
          <Input
            label={t('message')}
            name="message"
            placeholder={t('messagePlaceholder')}
            textarea
            value={values.message}
            onChange={(e) => handleChange("message", (e as unknown as React.ChangeEvent<HTMLTextAreaElement>).target.value)}
          />
          <Button type="submit" variant="primary" className={styles.submitBtn}>
            {t('submit')}
          </Button>
        </form>
      )}
    </Modal>
  );
}
