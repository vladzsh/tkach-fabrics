"use client";

import { useState } from "react";
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
      newErrors.name = "Name is required";
    }
    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!values.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
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
    <Modal isOpen={isOpen} onClose={handleClose} title="Request Quote">
      {submitted ? (
        <div className={styles.success}>
          <CheckCircle size={48} className={styles.successIcon} />
          <p className={styles.successTitle}>Your quote request has been submitted!</p>
          <p className={styles.successSubtitle}>We&apos;ll get back to you within 24 hours.</p>
          <Button variant="primary" onClick={handleClose} className={styles.closeBtn}>
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <Input
            label="Product"
            name="product"
            value={productName}
            disabled
            readOnly
            className={styles.readOnly}
          />
          <Input
            label="Name"
            name="name"
            placeholder="Your full name"
            required
            value={values.name}
            error={errors.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            value={values.email}
            error={errors.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <Input
            label="Quantity needed"
            name="quantity"
            placeholder="e.g. 10 rolls"
            value={values.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
          />
          <Input
            label="Message"
            name="message"
            placeholder="Any additional details or questions..."
            textarea
            value={values.message}
            onChange={(e) => handleChange("message", (e as unknown as React.ChangeEvent<HTMLTextAreaElement>).target.value)}
          />
          <Button type="submit" variant="primary" className={styles.submitBtn}>
            Submit Request
          </Button>
        </form>
      )}
    </Modal>
  );
}
