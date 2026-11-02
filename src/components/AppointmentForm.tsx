"use client";

import { CheckCircle2, CircleAlert, Pencil, Phone } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { appointmentCopy as copy } from "@/content/en/appointment";
import {
  REASON_MAX_LENGTH,
  buildRequestMessage,
  buildSummary,
  emptyAppointment,
  todayInNepal,
  validateAppointment,
  type AppointmentErrors,
  type AppointmentValues,
} from "@/lib/appointment";
import { buttonClass } from "./ui";
import {
  WhatsAppOrEmailRequestHelper,
  type ClinicDetails,
  type RequestChannels,
} from "./WhatsAppOrEmailRequestHelper";

type Step = "form" | "review" | "sent";

const inputClass =
  "mt-1.5 block min-h-11 w-full rounded-md border border-[#8d9794] bg-paper px-3 py-2 text-base text-charcoal aria-invalid:border-danger";

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-medium">
        {label}{" "}
        <span className="text-sm font-normal text-muted">{required ? `(${copy.required})` : `(${copy.optional})`}</span>
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-0.5 text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-sm text-danger">
      <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
      {children}
    </p>
  );
}

function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-lg border border-line bg-paper p-5 shadow-card sm:p-7">
      <legend className="float-left mb-5 w-full font-serif text-2xl">{title}</legend>
      <div className="clear-both grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function RequestSummary({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {rows.map((row) => (
        <div key={row.label} className="grid gap-0.5 py-3 sm:grid-cols-[13rem_1fr] sm:gap-4">
          <dt className="text-sm font-semibold">{row.label}</dt>
          <dd className="break-words text-muted">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

const fieldOrder: (keyof AppointmentValues)[] = [
  "fullName",
  "phone",
  "email",
  "service",
  "clinician",
  "date",
  "timeSlot",
  "patientType",
  "reason",
  "consent",
];

/**
 * Patient details are held only in this component's state. They must never be
 * written to browser storage, analytics or logs.
 */
export function AppointmentForm({
  channels,
  clinic,
  serviceOptions,
  clinicianNames,
}: {
  channels: RequestChannels;
  clinic: ClinicDetails;
  serviceOptions: { value: string; label: string }[];
  clinicianNames: string[];
}) {
  const requestedService = useSearchParams().get("service") ?? "";
  const initialValues = () => ({
    ...emptyAppointment,
    service: serviceOptions.some((option) => option.value === requestedService) ? requestedService : "",
  });

  const [values, setValues] = useState<AppointmentValues>(initialValues);
  const [errors, setErrors] = useState<AppointmentErrors>({});
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [step, setStep] = useState<Step>("form");
  const summaryRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const today = todayInNepal();

  // Move focus to the new step's heading so screen reader users hear the change.
  useEffect(() => {
    if (step !== "form") {
      stepHeadingRef.current?.focus();
      window.scrollTo({ top: 0 });
    }
  }, [step]);

  useEffect(() => {
    if (failedAttempts > 0) summaryRef.current?.focus();
  }, [failedAttempts]);

  const update = <K extends keyof AppointmentValues>(key: K, value: AppointmentValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current));
  };

  const summaryRows = buildSummary(values, {
    service: serviceOptions.find((option) => option.value === values.service)?.label ?? "",
    timeSlot: copy.timeSlots.find((option) => option.value === values.timeSlot)?.label ?? "",
    patientType: copy.patientTypes.find((option) => option.value === values.patientType)?.label ?? "",
    clinician: values.clinician,
  });
  const message = buildRequestMessage(clinic.name, summaryRows);

  const describedBy = (id: keyof AppointmentValues, hasHint = false) =>
    [hasHint ? `${id}-hint` : null, errors[id] ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;

  const errorList = fieldOrder.flatMap((key) => (errors[key] ? [{ key, message: errors[key] }] : []));

  if (step === "sent") {
    const { success } = copy;
    return (
      <div className="rounded-lg border border-line bg-paper p-5 shadow-card sm:p-8">
        <CheckCircle2 aria-hidden className="size-9 stroke-[1.5] text-forest" />
        <h2 ref={stepHeadingRef} tabIndex={-1} className="mt-4 text-3xl outline-none sm:text-4xl">
          {success.title}
        </h2>
        <p className="mt-3 text-muted">{success.text}</p>
        <p className="mt-4 rounded-md bg-champagne-soft px-4 py-3 font-medium">{success.notConfirmed}</p>

        <h3 className="mt-8 text-2xl">{success.nextTitle}</h3>
        <ol className="mt-3 list-inside list-decimal space-y-1.5 text-muted">
          {success.next.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>

        <h3 className="mt-8 mb-3 text-2xl">{success.summaryTitle}</h3>
        <RequestSummary rows={summaryRows} />

        <h3 className="mt-8 text-2xl">{success.contactTitle}</h3>
        <address className="mt-2 text-muted not-italic">
          {clinic.name}
          <br />
          {clinic.address}
        </address>
        {clinic.phone && (
          <a href={`tel:${clinic.phone.e164}`} className="mt-2 inline-flex items-center gap-2 text-forest underline underline-offset-4">
            <Phone aria-hidden className="size-4" />
            {clinic.phone.display}
          </a>
        )}

        <div className="mt-8 border-t border-line pt-6">
          <p className="mb-3 text-sm text-muted">{success.retry}</p>
          <WhatsAppOrEmailRequestHelper channels={channels} clinic={clinic} message={message} />
        </div>

        <button
          type="button"
          onClick={() => {
            setValues(initialValues());
            setFailedAttempts(0);
            setStep("form");
          }}
          className={`${buttonClass("secondary")} mt-6`}
        >
          {success.newRequest}
        </button>
      </div>
    );
  }

  if (step === "review") {
    const { review } = copy;
    return (
      <div className="rounded-lg border border-line bg-paper p-5 shadow-card sm:p-8">
        <h2 ref={stepHeadingRef} tabIndex={-1} className="text-3xl outline-none sm:text-4xl">
          {review.title}
        </h2>
        <p className="mt-2 mb-5 text-muted">{review.text}</p>
        <RequestSummary rows={summaryRows} />
        <p className="mt-5 rounded-md bg-champagne-soft px-4 py-3 font-medium">{review.notConfirmed}</p>
        <div className="mt-7">
          <WhatsAppOrEmailRequestHelper
            channels={channels}
            clinic={clinic}
            message={message}
            onHandOff={() => setStep("sent")}
          />
        </div>
        <button type="button" onClick={() => setStep("form")} className={`${buttonClass("secondary")} mt-6`}>
          <Pencil aria-hidden className="size-4" />
          {review.edit}
        </button>
      </div>
    );
  }

  const { fields } = copy;
  return (
    <form
      noValidate
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        const nextErrors = validateAppointment(values, today);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) {
          setFailedAttempts((count) => count + 1);
          return;
        }
        setFailedAttempts(0);
        setStep("review");
      }}
    >
      {failedAttempts > 0 && errorList.length > 0 && (
        <div
          // Re-mounting on each attempt makes screen readers announce it again.
          key={failedAttempts}
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-md border border-danger/50 bg-paper p-4 outline-none"
        >
          <p className="font-medium text-danger">{copy.errorSummary}</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
            {errorList.map((error) => (
              <li key={error.key}>
                <a href={`#${error.key}`} className="text-danger underline underline-offset-2">
                  {error.message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <FormSection title={copy.sections.patient}>
        <div className="sm:col-span-2">
          <Field id="fullName" label={fields.fullName.label} required error={errors.fullName}>
            <input
              id="fullName"
              name="fullName"
              autoComplete="name"
              required
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={describedBy("fullName")}
              value={values.fullName}
              onChange={(event) => update("fullName", event.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
        <Field id="phone" label={fields.phone.label} required hint={fields.phone.hint} error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone", true)}
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field id="email" label={fields.email.label} error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            className={inputClass}
          />
        </Field>
      </FormSection>

      <FormSection title={copy.sections.appointment}>
        <Field id="service" label={fields.service.label} required error={errors.service}>
          <select
            id="service"
            name="service"
            required
            aria-invalid={Boolean(errors.service)}
            aria-describedby={describedBy("service")}
            value={values.service}
            onChange={(event) => update("service", event.target.value)}
            className={inputClass}
          >
            <option value="">{fields.service.placeholder}</option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="clinician" label={fields.clinician.label}>
          <select
            id="clinician"
            name="clinician"
            value={values.clinician}
            onChange={(event) => update("clinician", event.target.value)}
            className={inputClass}
          >
            <option value="">{fields.clinician.noPreference}</option>
            {clinicianNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </Field>
        <Field id="date" label={fields.date.label} required hint={fields.date.hint} error={errors.date}>
          <input
            id="date"
            name="date"
            type="date"
            min={today}
            required
            aria-invalid={Boolean(errors.date)}
            aria-describedby={describedBy("date", true)}
            value={values.date}
            onChange={(event) => update("date", event.target.value)}
            className={inputClass}
          />
        </Field>
        <fieldset aria-describedby={describedBy("timeSlot", true)}>
          <legend className="font-medium">
            {fields.timeSlot.label} <span className="text-sm font-normal text-muted">({copy.required})</span>
          </legend>
          <p id="timeSlot-hint" className="mt-0.5 text-sm text-muted">
            {fields.timeSlot.hint}
          </p>
          <div id="timeSlot" tabIndex={-1} className="mt-2 flex flex-wrap gap-x-5 gap-y-1 outline-none">
            {copy.timeSlots.map((slot) => (
              <label key={slot.value} className="inline-flex min-h-11 cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="timeSlot"
                  value={slot.value}
                  checked={values.timeSlot === slot.value}
                  onChange={() => update("timeSlot", slot.value)}
                  className="size-4 accent-forest"
                />
                {slot.label}
              </label>
            ))}
          </div>
          {errors.timeSlot && <FieldError id="timeSlot-error">{errors.timeSlot}</FieldError>}
        </fieldset>
      </FormSection>

      <FormSection title={copy.sections.additional}>
        <fieldset className="sm:col-span-2">
          <legend className="font-medium">
            {fields.patientType.label} <span className="text-sm font-normal text-muted">({copy.optional})</span>
          </legend>
          <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
            {copy.patientTypes.map((type) => (
              <label key={type.value} className="inline-flex min-h-11 cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="patientType"
                  value={type.value}
                  checked={values.patientType === type.value}
                  onChange={() => update("patientType", type.value)}
                  className="size-4 accent-forest"
                />
                {type.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="sm:col-span-2">
          <Field id="reason" label={fields.reason.label} hint={fields.reason.hint} error={errors.reason}>
            <textarea
              id="reason"
              name="reason"
              rows={3}
              maxLength={REASON_MAX_LENGTH}
              aria-invalid={Boolean(errors.reason)}
              aria-describedby={describedBy("reason", true)}
              value={values.reason}
              onChange={(event) => update("reason", event.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      </FormSection>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent")}
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            className="mt-1 size-5 shrink-0 accent-forest"
          />
          <span>
            {fields.consent.before}
            <Link href="/privacy" target="_blank" className="text-forest underline underline-offset-2">
              {fields.consent.link}
            </Link>
            {fields.consent.after} <span className="text-sm text-muted">({copy.required})</span>
          </span>
        </label>
        {errors.consent && <FieldError id="consent-error">{errors.consent}</FieldError>}
      </div>

      <button type="submit" className={`${buttonClass()} w-full sm:w-auto`}>
        {copy.continue}
      </button>
    </form>
  );
}
