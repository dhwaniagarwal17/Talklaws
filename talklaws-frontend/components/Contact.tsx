"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { fadeInUp, fadeInRight, staggerContainer, viewportConfig } from "@/lib/animations";

const serviceOptions = [
  "Corporate Advisory",
  "Startup & Venture Legal",
  "Regulatory Compliance",
  "M&A & Transactions",
  "Contracts & Agreements",
  "IP & Technology Law",
  "FDI & Cross-Border",
  "Employment & HR Law",
];

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}

// Field-level error map
interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

// ─── Client-side validation ───────────────────────────────────────────────────
function validateForm(form: FormData): FormErrors {
  const errors: FormErrors = {};
  const trimmed = {
    name:    form.name.trim(),
    email:   form.email.trim(),
    phone:   form.phone.trim(),
    message: form.message.trim(),
  };

  if (!trimmed.name) {
    errors.name = "Full name is required.";
  }

  if (!trimmed.email) {
    errors.email = "Email address is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(trimmed.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (trimmed.phone) {
    // Strip all non-digit characters (spaces, +, dashes, brackets) then check exactly 10 digits
    const digitsOnly = trimmed.phone.replace(/\D/g, "");
    if (digitsOnly.length !== 10) {
      errors.phone = "Phone number must be exactly 10 digits.";
    }
  }

  if (!trimmed.message) {
    errors.message = "Please describe your requirement.";
  } else if (trimmed.message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "", email: "", company: "", phone: "", service: "", message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error for the field being edited
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trim all text fields before validation + submission
    const trimmedForm: FormData = {
      name:    form.name.trim(),
      email:   form.email.trim(),
      company: form.company.trim(),
      phone:   form.phone.trim(),
      service: form.service,
      message: form.message.trim(),
    };

    const validationErrors = validateForm(trimmedForm);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop — do not submit
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(trimmedForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.errors
          ? data.errors.map((e: { field: string; message: string }) => e.message).join(", ")
          : data.message || "Something went wrong. Please try again.";
        throw new Error(errorMsg);
      }

      setSubmitted(true);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // Base input class — error variant adds red border
  const inputBase =
    "w-full bg-[var(--bg)] border text-[var(--text-primary)] text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-1 transition-all placeholder:text-[var(--text-tertiary)] font-light";

  const inputClass = (field?: string) =>
    errors[field as keyof FormErrors]
      ? `${inputBase} border-red-400 focus:border-red-500 focus:ring-red-200`
      : `${inputBase} border-[var(--border-strong)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/20`;

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 bg-[var(--card)]"
      aria-label="Contact TALKLAWS"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="space-y-10"
          >
            <div className="space-y-4">
              <motion.span variants={fadeInUp} className="text-xs font-semibold tracking-widest uppercase text-[var(--luxury-text)]">
                Get In Touch
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]"
                style={{ letterSpacing: "-0.03em" }}
              >
                Start a
                <br />
                conversation.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-[var(--text-secondary)] text-base leading-relaxed max-w-md">
                Whether you are a founder preparing for your first fundraise, an
                enterprise navigating a complex transaction, or an investor
                structuring a fund — we are here to help.
              </motion.p>
            </div>

            <motion.div variants={staggerContainer} className="space-y-4">
              {[
                { Icon: Mail,    label: "Email",  value: "talklaws@gmail.com" },
                { Icon: Phone,   label: "Phone",  value: "+91 9839778060" },
                { Icon: MapPin,  label: "Office", value: "301, 3rd Floor, Prince Complex, Hazratganj, Lucknow" },
              ].map(({ Icon, label, value }) => (
                <motion.div key={label} variants={fadeInUp} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center shrink-0 group-hover:border-[var(--primary)]/40 group-hover:bg-[var(--primary)]/5 transition-all duration-200">
                    <Icon size={16} className="text-[var(--text-secondary)] group-hover:text-[var(--primary)] transition-colors" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide mb-0.5">{label}</div>
                    <div className="text-sm text-[var(--text-primary)] font-medium">{value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Map — Google Maps embed + Open in Maps button */}
            <motion.div
              variants={fadeInUp}
              className="space-y-3"
            >
              {/* Embedded Google Map */}
              <div className="relative h-52 rounded-2xl overflow-hidden border border-[var(--border)]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d56940.305070136674!2d80.9018937679068!3d26.879077226538282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m3!3m2!1d26.9073039!2d80.9374601!4m5!1s0x399bfd1cfa574135%3A0x7bada00c69d4cbbc!2sTalklaws%2C%203rd%20floor%2C%20Prince%20Complex%2C%20301%2C%20Hazratganj%2C%20Lucknow%2C%20Uttar%20Pradesh%20226001!3m2!1d26.848762699999998!2d80.9447052!5e0!3m2!1sen!2sin!4v1783780384368!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="TALKLAWS office location — Prince Complex, Hazratganj, Lucknow"
                />
              </div>

              {/* Open in Google Maps button */}
              <motion.a
                href="https://maps.app.goo.gl/hR2jQupKBtnzyDL7A"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 w-full border border-[var(--border-strong)] bg-[var(--bg)] text-[var(--text-primary)] text-sm font-semibold py-3 rounded-xl hover:border-[var(--primary)]/40 hover:bg-[var(--primary)]/5 hover:text-[var(--primary)] transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Open in Google Maps
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInRight}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6 bg-[var(--bg)] border border-[var(--border)] rounded-3xl p-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle2 size={56} className="text-[var(--primary)]" aria-hidden="true" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]" style={{ letterSpacing: "-0.02em" }}>
                    Message received.
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm font-light">
                    We will review your enquiry and reach out within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", phone: "", service: "", message: "" }); }}
                  className="text-sm text-[var(--primary)] font-medium underline underline-offset-2"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[var(--bg)] border border-[var(--border)] rounded-3xl p-8 space-y-5"
                noValidate
                aria-label="Contact form"
              >
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2" style={{ letterSpacing: "-0.02em" }}>
                  Book a consultation
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                      Full Name *
                    </label>
                    <input
                      id="name" name="name" type="text" required
                      value={form.name} onChange={handleChange}
                      placeholder="John Doe"
                      className={inputClass("name")}
                      autoComplete="name"
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-red-500 mt-0.5">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      id="email" name="email" type="email" required
                      value={form.email} onChange={handleChange}
                      placeholder="john@example.com"
                      className={inputClass("email")}
                      autoComplete="email"
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-red-500 mt-0.5">{errors.email}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <label htmlFor="company" className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                      Company
                    </label>
                    <input
                      id="company" name="company" type="text"
                      value={form.company} onChange={handleChange}
                      placeholder="ABC Technologies Pvt. Ltd."
                      className={inputClass()}
                      autoComplete="organization"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                      Phone
                    </label>
                    <input
                      id="phone" name="phone" type="tel"
                      value={form.phone} onChange={handleChange}
                      placeholder="+91 xxxxxxxxxx"
                      className={inputClass("phone")}
                      autoComplete="tel"
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-xs text-red-500 mt-0.5">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Area of Interest */}
                <div className="space-y-1.5">
                  <label htmlFor="service" className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                    Area of Interest
                  </label>
                  <select
                    id="service" name="service"
                    value={form.service} onChange={handleChange}
                    className={inputClass()}
                    aria-label="Select service area"
                  >
                    <option value="">Select a practice area</option>
                    {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                    Message *
                  </label>
                  <textarea
                    id="message" name="message" required rows={4}
                    value={form.message} onChange={handleChange}
                    placeholder="Briefly describe your legal or compliance requirement."
                    className={`${inputClass("message")} resize-none`}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-xs text-red-500 mt-0.5">{errors.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] text-white font-semibold py-4 rounded-xl transition-all shadow-[0_4px_20px_rgba(107,0,26,0.2)] hover:bg-[var(--secondary)] hover:shadow-[0_8px_32px_rgba(107,0,26,0.3)] disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        aria-hidden="true"
                      />
                      Sending...
                    </>
                  ) : (
                    <>Send Message <ArrowRight size={16} /></>
                  )}
                </motion.button>

                <p className="text-xs text-[var(--text-tertiary)] text-center">
                  We respect your privacy. Your information will never be shared.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
