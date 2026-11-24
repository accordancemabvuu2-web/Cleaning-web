import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Phone, Send } from 'lucide-react';
import { CUSTOM_SCOPE_LABEL, servicesData } from '../config/services';
import { businessConfig } from '../config/business';
import type { QuoteFormData } from '../utils/whatsapp';
import { Button } from './ui/Button';

interface QuoteFormProps {
  preselectedService?: string;
}

const defaultService = servicesData[0]?.title ?? 'Post-Construction Cleanup';

const labelClass = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/70';

const controlClass = (hasError: boolean) =>
  `w-full rounded-md border bg-white px-3.5 py-2.5 text-[15px] text-ink transition-colors placeholder:text-navy/70 focus:outline-none focus:ring-2 focus:ring-azure/25 ${
    hasError ? 'border-red-400 focus:border-red-500' : 'border-navy/15 focus:border-azure'
  }`;

export const QuoteForm = ({ preselectedService }: QuoteFormProps) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    service: preselectedService || defaultService,
    propertyType: 'Residential',
    location: '',
    preferredDate: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [submittedAttempt, setSubmittedAttempt] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const submissionInProgress = useRef(false);
  const confirmationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  /* The confirmation replaces a much taller form, so bring it into view. */
  useEffect(() => {
    if (!isSent) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    confirmationRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'center',
    });
  }, [isSent]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof QuoteFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length > 100) {
      newErrors.fullName = 'Please keep your name to 100 characters or fewer.';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Please provide your contact phone number.';
    } else {
      const cleanPhone = formData.phoneNumber.replace(/[^0-9+]/g, '');
      if (cleanPhone.length < 8) {
        newErrors.phoneNumber = 'Please enter a valid phone number (at least 8 digits).';
      }
    }

    if (!formData.service) {
      newErrors.service = 'Please choose a cleaning service.';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Please state your Toronto-area location or project address.';
    } else if (formData.location.trim().length > 200) {
      newErrors.location = 'Please keep the location to 200 characters or fewer.';
    }

    if (!formData.propertyType) {
      newErrors.propertyType = 'Please choose a property type.';
    }

    if (formData.email && formData.email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please provide a valid email address, or leave blank.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (submissionInProgress.current) return;

    setSubmittedAttempt(true);
    setSuccessMessage('');
    setSubmitError('');

    if (!validate()) return;

    submissionInProgress.current = true;
    setIsSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website: honeypot }),
      });

      const result = (await response.json().catch(() => null)) as
        | { message?: string; error?: string; fields?: Record<string, string> }
        | null;

      if (!response.ok) {
        if (result?.fields) {
          setErrors((prev) => ({ ...prev, ...result.fields }));
        }
        setSubmitError(result?.error || 'We could not send your enquiry. Please try again.');
        return;
      }

      setSuccessMessage('Thank you! Your quotation request has been sent successfully. Our team will contact you shortly.');
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        service: preselectedService || defaultService,
        propertyType: 'Residential',
        location: '',
        preferredDate: '',
        message: '',
      });
      setErrors({});
      setSubmittedAttempt(false);
      setHoneypot('');
      setIsSent(true);
    } catch {
      setSubmitError('We could not connect to the email service. Please check your connection and try again.');
    } finally {
      submissionInProgress.current = false;
      setIsSending(false);
    }
  };

  const handleInputChange = (field: keyof QuoteFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (submittedAttempt) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSent) {
    return (
      <div
        ref={confirmationRef}
        role="status"
        aria-live="polite"
        className="rounded-lg border border-navy/10 bg-white p-6 shadow-subtle sm:p-8"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-azureSoft text-azure">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-[21px] font-bold text-navy">Request sent</h3>
        <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.7] text-muted">{successMessage}</p>
        <p className="mt-3 flex items-center gap-2 text-[13px] text-navy/70">
          <Phone className="h-3.5 w-3.5 text-azure" aria-hidden="true" />
          Need to add something? Call {businessConfig.contact.phoneDisplay}.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setIsSent(false)}>
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-navy/10 bg-white p-5 shadow-subtle sm:p-7 lg:p-8">
      <div>
        <h3 className="text-[21px] font-bold text-navy sm:text-[23px]">Request a Quotation</h3>
        <p className="mt-1.5 max-w-[46ch] text-[13.5px] leading-[1.6] text-muted">
          Complete the details below. Submitting is an enquiry for a quotation, not a confirmed booking.
        </p>
      </div>

      {submitError ? (
        <div
          role="alert"
          className="mt-5 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3.5 text-[13px] text-red-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{submitError}</span>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Full name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              required
              maxLength={100}
              autoComplete="name"
              value={formData.fullName}
              onChange={(event) => handleInputChange('fullName', event.target.value)}
              placeholder="e.g. Alex Morgan"
              aria-invalid={Boolean(errors.fullName)}
              className={controlClass(Boolean(errors.fullName))}
            />
            {errors.fullName ? (
              <p className="mt-1 flex items-center gap-1 text-[12px] text-red-600">
                <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{errors.fullName}</span>
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="phoneNumber" className={labelClass}>
              Phone number <span className="text-red-500">*</span>
            </label>
            <input
              id="phoneNumber"
              type="tel"
              required
              maxLength={32}
              autoComplete="tel"
              value={formData.phoneNumber}
              onChange={(event) => handleInputChange('phoneNumber', event.target.value)}
              placeholder="e.g. +1 416 555 0123"
              aria-invalid={Boolean(errors.phoneNumber)}
              className={controlClass(Boolean(errors.phoneNumber))}
            />
            {errors.phoneNumber ? (
              <p className="mt-1 flex items-center gap-1 text-[12px] text-red-600">
                <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{errors.phoneNumber}</span>
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <span className={labelClass}>
            Property type <span className="text-red-500">*</span>
          </span>
          <div className="grid grid-cols-2 gap-2">
            {(['Residential', 'Commercial'] as const).map((type) => {
              const isSelected = formData.propertyType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleInputChange('propertyType', type)}
                  aria-pressed={isSelected}
                  className={`rounded-md border px-3 py-2.5 text-[13.5px] font-semibold transition-colors ${
                    isSelected
                      ? 'border-navy bg-navy text-white'
                      : 'border-navy/15 bg-white text-navy/75 hover:border-navy/35 hover:text-navy'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="service" className={labelClass}>
              Cleaning service <span className="text-red-500">*</span>
            </label>
            <select
              id="service"
              required
              value={formData.service}
              onChange={(event) => handleInputChange('service', event.target.value)}
              className={`${controlClass(false)} cursor-pointer`}
            >
              {servicesData.map((service) => (
                <option key={service.id} value={service.title}>
                  {service.title}
                </option>
              ))}
              <option value={CUSTOM_SCOPE_LABEL}>{CUSTOM_SCOPE_LABEL}</option>
            </select>
          </div>

          <div>
            <label htmlFor="location" className={labelClass}>
              Location / suburb <span className="text-red-500">*</span>
            </label>
            <input
              id="location"
              type="text"
              required
              maxLength={200}
              autoComplete="address-level2"
              value={formData.location}
              onChange={(event) => handleInputChange('location', event.target.value)}
              placeholder="e.g. North York, Vaughan"
              aria-invalid={Boolean(errors.location)}
              className={controlClass(Boolean(errors.location))}
            />
            {errors.location ? (
              <p className="mt-1 flex items-center gap-1 text-[12px] text-red-600">
                <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{errors.location}</span>
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email address <span className="font-normal normal-case tracking-normal text-navy/70">(optional)</span>
            </label>
            <input
              id="email"
              type="email"
              maxLength={254}
              autoComplete="email"
              value={formData.email}
              onChange={(event) => handleInputChange('email', event.target.value)}
              placeholder="e.g. alex@example.com"
              aria-invalid={Boolean(errors.email)}
              className={controlClass(Boolean(errors.email))}
            />
            {errors.email ? (
              <p className="mt-1 flex items-center gap-1 text-[12px] text-red-600">
                <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{errors.email}</span>
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="preferredDate" className={labelClass}>
              Preferred date <span className="font-normal normal-case tracking-normal text-navy/70">(optional)</span>
            </label>
            <input
              id="preferredDate"
              type="date"
              value={formData.preferredDate}
              onChange={(event) => handleInputChange('preferredDate', event.target.value)}
              className={`${controlClass(false)} tabular`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Project details <span className="font-normal normal-case tracking-normal text-navy/70">(optional)</span>
          </label>
          <textarea
            id="message"
            rows={3}
            maxLength={2000}
            value={formData.message}
            onChange={(event) => handleInputChange('message', event.target.value)}
            placeholder="Number of units or rooms, approximate square footage, focus areas, or site access notes"
            className={`${controlClass(false)} resize-none`}
          />
        </div>

        <div className="pt-1">
          <p className="mb-3 text-[12px] leading-[1.6] text-muted">
            By submitting this enquiry, you agree that ID TID Services may use the information provided only to
            respond to your request and prepare a quotation. This does not subscribe you to marketing emails.
            Please see our <a href="/privacy" className="font-semibold text-navy underline">Privacy Policy</a>.
          </p>
          <button
            type="submit"
            disabled={isSending}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-azure px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Send className="h-4 w-4" aria-hidden="true" />
            )}
            <span>{isSending ? 'Sending…' : 'Send quote request'}</span>
          </button>
          <p className="mt-3 text-center text-[12px] leading-[1.6] text-muted">
            Submitting sends your enquiry directly to the business by email.
          </p>
        </div>
      </form>
    </div>
  );
};
