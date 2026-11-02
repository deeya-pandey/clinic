export const appointmentCopy = {
  page: {
    title: "Request an Appointment",
    intro:
      "Share a few details and your preferred time. Your appointment is not confirmed until the clinic responds.",
    asideTitle: "How it works",
    asideSteps: [
      "Fill in the form and check your details.",
      "Send the prepared message to the clinic yourself.",
      "Wait for the clinic to reply and confirm a time.",
    ],
    privacyTitle: "Your privacy",
    privacyText:
      "This website does not store your request. Details stay on this page until you choose to send them, and are cleared when you leave or reload it.",
    privacyLink: "Read the privacy notice",
    callTitle: "Prefer to call?",
    callPending: "The clinic's phone number is being confirmed. You can also visit the clinic in person.",
  },
  notActive: {
    title: "Online requests are not active yet",
    text: "The clinic's WhatsApp and email details are still being confirmed, so this form cannot send a request yet. You can still prepare your details, then contact the clinic directly.",
  },
  sections: {
    patient: "Your details",
    appointment: "Your appointment preferences",
    additional: "Optional information",
  },
  fields: {
    fullName: { label: "Patient full name", required: true },
    phone: { label: "Phone number", hint: "For example, 98XXXXXXXX or +977 98XXXXXXXX." },
    email: { label: "Email address" },
    service: { label: "Preferred service", placeholder: "Select a service" },
    clinician: { label: "Preferred clinician", noPreference: "No preference" },
    date: { label: "Preferred appointment date", hint: "In Nepal Standard Time." },
    timeSlot: {
      label: "Preferred time of day",
      hint: "The clinic will confirm the exact time according to its opening hours.",
    },
    patientType: { label: "Have you visited this clinic before?" },
    reason: {
      label: "Short reason for consultation",
      hint: "One or two lines are enough. Please do not include detailed medical history.",
    },
    consent: {
      before: "I have read the ",
      link: "privacy notice",
      after: " and understand that my details will be sent to the clinic to arrange an appointment.",
    },
  },
  optional: "Optional",
  required: "Required",
  timeSlots: [
    { value: "morning", label: "Morning" },
    { value: "midday", label: "Around midday" },
    { value: "afternoon", label: "Afternoon" },
  ],
  patientTypes: [
    { value: "first-time", label: "First-time patient" },
    { value: "returning", label: "Returning patient" },
  ],
  errorSummary: "Please correct the following before continuing:",
  continue: "Review My Request",
  review: {
    title: "Check your request",
    text: "Please make sure these details are correct. Nothing has been sent yet.",
    edit: "Edit Details",
    notConfirmed: "This is a request only. Your appointment is not confirmed until the clinic responds.",
    sendTitle: "Send Appointment Request",
    sendWhatsapp: "Send via WhatsApp",
    sendEmail: "Send via Email",
    sendHint: "This opens your own app with a prepared message. You then need to press send.",
    noChannelTitle: "Please contact the clinic directly",
    noChannelPhone: "Online sending is not active yet, and your request has not been sent. Please call the clinic with the details above.",
    noChannelVisit:
      "Online sending is not active yet, and your request has not been sent. The clinic's phone number is also being confirmed, so please visit the clinic in person with the details above.",
  },
  success: {
    title: "Your request is ready to send",
    text: "We have opened your messaging app with your request. Please check that the message has actually been sent.",
    notConfirmed: "Your appointment is not confirmed until the clinic responds.",
    nextTitle: "What happens next",
    next: [
      "Press send in WhatsApp or your email app, if you have not already.",
      "The clinic reviews your request and replies to you.",
      "Your appointment is confirmed only once you hear from the clinic.",
    ],
    summaryTitle: "Your request",
    contactTitle: "Clinic contact details",
    retry: "Didn't open? Try again",
    newRequest: "Start a New Request",
  },
  loading: "Loading the appointment form",
};
