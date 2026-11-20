import React, { useState, useEffect, useRef } from 'react';
import { Send, AlertCircle, MessageSquare, CheckCircle } from 'lucide-react';
import { servicesData } from '../config/services';
import { QuoteFormData } from '../utils/whatsapp';

interface QuoteFormProps {
  preselectedService?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    service: preselectedService || (servicesData[0]?.title ?? 'Post-Construction Cleanup'),
    propertyType: 'Residential',
    location: '',
    preferredDate: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [submittedAttempt, setSubmittedAttempt] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const submissionInProgress = useRef(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submissionInProgress.current) {
      return;
    }

    setSubmittedAttempt(true);
    setSuccessMessage('');
    setSubmitError('');

    if (!validate()) {
      return;
    }

    submissionInProgress.current = true;
    setIsSending(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website: honeypot }),
      });
      const result = await response.json().catch(() => null) as
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
        service: preselectedService || (servicesData[0]?.title ?? 'Post-Construction Cleanup'),
        propertyType: 'Residential',
        location: '',
        preferredDate: '',
        message: '',
      });
      setErrors({});
      setSubmittedAttempt(false);
      setHoneypot('');
    } catch {
      setSubmitError('We could not connect to the email service. Please check your connection and try again.');
    } finally {
      submissionInProgress.current = false;
      setIsSending(false);
    }
  };

  const handleInputChange = (
    field: keyof QuoteFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (submittedAttempt) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-premium">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-[#0A2E73] font-heading">
          Request a Quotation
        </h3>
        <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
          Complete the details below. Submitting sends your enquiry directly to our team by email.
        </p>
      </div>

      {successMessage && (
        <div role="status" className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-900 text-xs sm:text-sm flex items-start gap-2">
          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {submitError && (
        <div role="alert" className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>
        
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-bold text-[#111827] mb-1.5 uppercase tracking-wider">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            required
            maxLength={100}
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="e.g. Alex Morgan"
            className={`w-full px-4 py-3 rounded-xl border text-sm text-[#111827] bg-[#F7F4EC]/70 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1348B8] transition-colors ${
              errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-gray-200 focus:border-[#1348B8]'
            }`}
          />
          {errors.fullName && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Contact Phone & Email Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phoneNumber" className="block text-xs font-bold text-[#111827] mb-1.5 uppercase tracking-wider">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phoneNumber"
              type="tel"
              required
              maxLength={32}
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="e.g. +1 416 555 0123"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-[#111827] bg-[#F7F4EC]/70 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1348B8] transition-colors ${
                errors.phoneNumber ? 'border-red-400 bg-red-50/20' : 'border-gray-200 focus:border-[#1348B8]'
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.phoneNumber}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-bold text-[#111827] mb-1.5 uppercase tracking-wider">
              Email Address <span className="text-gray-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              id="email"
              type="email"
              maxLength={254}
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="e.g. alex@example.com"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-[#111827] bg-[#F7F4EC]/70 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1348B8] transition-colors ${
                errors.email ? 'border-red-400 bg-red-50/20' : 'border-gray-200 focus:border-[#1348B8]'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>
        </div>

        {/* Property Type Radio Selector */}
        <div>
          <label className="block text-xs font-bold text-[#111827] mb-2 uppercase tracking-wider">
            Property Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['Residential', 'Commercial'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleInputChange('propertyType', type)}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border transition-all ${
                  formData.propertyType === type
                    ? 'border-[#1348B8] bg-[#1348B8] text-white shadow-xs'
                    : 'border-gray-200 bg-[#F7F4EC]/70 text-[#111827] hover:bg-white'
                }`}
              >
                {formData.propertyType === type && <CheckCircle className="w-4 h-4 text-white" />}
                <span>{type}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cleaning Service Dropdown & Location Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="service" className="block text-xs font-bold text-[#111827] mb-1.5 uppercase tracking-wider">
              Cleaning Service <span className="text-red-500">*</span>
            </label>
            <select
              id="service"
              required
              value={formData.service}
              onChange={(e) => handleInputChange('service', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#111827] bg-[#F7F4EC]/70 focus:outline-none focus:ring-2 focus:ring-[#1348B8]"
            >
              {servicesData.map((svc) => (
                <option key={svc.id} value={svc.title}>
                  {svc.title}
                </option>
              ))}
              <option value="Custom Cleaning Request">Custom Cleaning Request</option>
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-xs font-bold text-[#111827] mb-1.5 uppercase tracking-wider">
              Location / Suburb <span className="text-red-500">*</span>
            </label>
            <input
              id="location"
              type="text"
              required
              maxLength={200}
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="e.g. North York, Downtown Toronto, Vaughan"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-[#111827] bg-[#F7F4EC]/70 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1348B8] transition-colors ${
                errors.location ? 'border-red-400 bg-red-50/20' : 'border-gray-200 focus:border-[#1348B8]'
              }`}
            />
            {errors.location && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.location}</span>
              </p>
            )}
          </div>
        </div>

        {/* Preferred Cleaning Date */}
        <div>
          <label htmlFor="preferredDate" className="block text-xs font-bold text-[#111827] mb-1.5 uppercase tracking-wider">
            Preferred Cleaning Date <span className="text-gray-400 font-normal lowercase">(optional)</span>
          </label>
          <input
            id="preferredDate"
            type="date"
            maxLength={32}
            value={formData.preferredDate}
            onChange={(e) => handleInputChange('preferredDate', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#111827] bg-[#F7F4EC]/70 focus:outline-none focus:ring-2 focus:ring-[#1348B8]"
          />
        </div>

        {/* Additional Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-bold text-[#111827] mb-1.5 uppercase tracking-wider">
            Additional Message / Special Requirements <span className="text-gray-400 font-normal lowercase">(optional)</span>
          </label>
          <textarea
            id="message"
            rows={3}
            maxLength={2000}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder="Tell us about number of rooms, square meters, focus areas, or access considerations..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#111827] bg-[#F7F4EC]/70 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1348B8] resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSending}
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-bold text-white bg-[#1348B8] hover:bg-[#0A2E73] shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1348B8] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Send className={`w-4 h-4 text-white ${isSending ? 'animate-pulse' : ''}`} />
            <span>{isSending ? 'Sending...' : 'Send Quote Request'}</span>
          </button>
        </div>

        {/* Reassurance note */}
        <div className="text-center pt-2">
          <p className="text-xs text-[#4B5563] flex items-center justify-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-[#1348B8]" />
            <span>Submitting sends your enquiry directly to the business by email.</span>
          </p>
        </div>

      </form>
    </div>
  );
};
