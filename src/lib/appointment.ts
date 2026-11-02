/**
 * Validation and message formatting for the appointment request. Pure functions
 * with no storage or logging: patient details must stay in component memory.
 */

export type AppointmentValues = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  clinician: string;
  date: string;
  timeSlot: string;
  patientType: string;
  reason: string;
  consent: boolean;
};

export type AppointmentErrors = Partial<Record<keyof AppointmentValues, string>>;

export const emptyAppointment: AppointmentValues = {
  fullName: "",
  phone: "",
  email: "",
  service: "",
  clinician: "",
  date: "",
  timeSlot: "",
  patientType: "",
  reason: "",
  consent: false,
};

export const REASON_MAX_LENGTH = 300;

/** Accepts Nepali mobile and landline numbers, and international numbers with a +. */
export function isValidPhone(input: string) {
  const trimmed = input.trim();
  if (!/^\+?[\d\s()-]+$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "");
  const local = digits.startsWith("977") ? digits.slice(3) : digits;
  if (/^9[6-8]\d{8}$/.test(local)) return true;
  if (/^0?[1-9]\d{6,8}$/.test(local) && (digits.startsWith("977") || local.startsWith("0"))) {
    return true;
  }
  return trimmed.startsWith("+") && !digits.startsWith("977") && digits.length >= 8 && digits.length <= 15;
}

export function isValidEmail(input: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.trim());
}

/** Today's date as YYYY-MM-DD in Nepal, regardless of the visitor's time zone. */
export function todayInNepal(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kathmandu",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function isRealDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

export function validateAppointment(values: AppointmentValues, today = todayInNepal()) {
  const errors: AppointmentErrors = {};

  if (values.fullName.trim().length < 2) errors.fullName = "Please enter the patient's full name.";

  if (!values.phone.trim()) {
    errors.phone = "Please enter a phone number so the clinic can reach you.";
  } else if (!isValidPhone(values.phone)) {
    errors.phone = "Please enter a valid phone number, for example 98XXXXXXXX or +977 98XXXXXXXX.";
  }

  if (values.email.trim() && !isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address, or leave this blank.";
  }

  if (!values.service) errors.service = "Please choose a service, or select “Not sure”.";

  if (!values.date) {
    errors.date = "Please choose your preferred date.";
  } else if (!isRealDate(values.date)) {
    errors.date = "Please enter a valid date.";
  } else if (values.date < today) {
    errors.date = "Please choose today or a future date.";
  }

  if (!values.timeSlot) errors.timeSlot = "Please choose a preferred time of day.";

  if (values.reason.length > REASON_MAX_LENGTH) {
    errors.reason = `Please keep this to ${REASON_MAX_LENGTH} characters or fewer.`;
  }

  if (!values.consent) errors.consent = "Please confirm that you have read the privacy notice.";

  return errors;
}

export function formatPreferredDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00Z`));
}

export type SummaryRow = { label: string; value: string };

/** Human-readable rows, shared by the review screen and the outgoing message. */
export function buildSummary(
  values: AppointmentValues,
  labels: { service: string; timeSlot: string; patientType: string; clinician: string },
): SummaryRow[] {
  const rows: SummaryRow[] = [
    { label: "Patient name", value: values.fullName.trim() },
    { label: "Phone", value: values.phone.trim() },
    { label: "Email", value: values.email.trim() },
    { label: "Preferred service", value: labels.service },
    { label: "Preferred clinician", value: labels.clinician },
    { label: "Preferred date", value: values.date ? formatPreferredDate(values.date) : "" },
    { label: "Preferred time", value: labels.timeSlot },
    { label: "Patient type", value: labels.patientType },
    { label: "Reason for consultation", value: values.reason.trim() },
  ];
  return rows.filter((row) => row.value);
}

export function buildRequestMessage(clinicName: string, rows: SummaryRow[]) {
  return [
    `Appointment request for ${clinicName}`,
    "",
    ...rows.map((row) => `${row.label}: ${row.value}`),
    "",
    "Date and time preferences are in Nepal Standard Time.",
    "Please reply to confirm whether this appointment is available.",
  ].join("\n");
}

export function buildWhatsappUrl(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildEmailUrl(address: string, clinicName: string, message: string) {
  const subject = encodeURIComponent(`Appointment request for ${clinicName}`);
  return `mailto:${address}?subject=${subject}&body=${encodeURIComponent(message)}`;
}
