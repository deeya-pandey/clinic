/**
 * Privacy policy template. Items in `needsApproval` are shown on the page with an
 * approval label until `privacyPolicyApproved` is set to true in ../clinic.ts.
 */

export const privacyPolicy = {
  title: "Privacy Policy",
  intro:
    "This policy explains what happens to the information you provide when you request an appointment through this website.",
  sections: [
    {
      heading: "Appointment request information",
      paragraphs: [
        "The appointment form asks for your name, phone number and appointment preferences. You may also choose to give your email address, whether you are a new or returning patient, and a short reason for your visit.",
        "The form does not ask for detailed medical history or photographs. Please do not include sensitive medical details in your request. You can discuss them with the clinician in person.",
      ],
    },
    {
      heading: "Why this information is collected",
      paragraphs: [
        "The information is used to respond to your request, arrange an appointment and contact you about it. It is not used for marketing as part of this request.",
      ],
    },
    {
      heading: "How the clinic receives and handles requests",
      paragraphs: [
        "This website has no database and does not store your request. Your details stay in your browser while you complete the form and are cleared when you leave or reload the page.",
        "When you choose to send your request, your own WhatsApp or email application opens with a prepared message. Nothing reaches the clinic until you send that message yourself. Your request is not a confirmed appointment until the clinic responds.",
      ],
      needsApproval: "The clinic's internal handling of the requests it receives, including who can read them.",
    },
    {
      heading: "Retention and deletion",
      paragraphs: [
        "Requests should be kept only for as long as they are needed to arrange and manage your appointment, or as required by applicable law and medical record-keeping obligations. You may ask the clinic to delete a request that is no longer needed, where the law allows it.",
      ],
      needsApproval: "The clinic's retention period and deletion process.",
    },
    {
      heading: "The limits of a static website and external messaging services",
      paragraphs: [
        "When you send a request by WhatsApp or email, it is handled by that service and by your device under their own terms and privacy policies. The prepared message text is passed to that service through a link, and it may remain in your sent messages and in your browser or device history. The clinic does not control these services.",
        "The contact page includes an embedded Google Map, and directions links open Google Maps. Google may receive technical data such as your IP address when these load, under its own privacy policy. This website does not use advertising or analytics tools to collect appointment details.",
      ],
    },
    {
      heading: "Questions about your privacy",
      paragraphs: [
        "For privacy questions, or to ask about a request you have sent, please contact the clinic using the details on the contact page, or visit the clinic at Puspa Lal Park, Hospital Line, Butwal, Nepal.",
      ],
      needsApproval: "A named privacy contact and a dedicated contact method, if the clinic wishes to provide them.",
    },
  ] as { heading: string; paragraphs: string[]; needsApproval?: string }[],
};
