import type { ImageKey } from "../images";

export type TreatmentOption = {
  name: string;
  description: string;
  /** Unconfirmed options never appear in a page's "Treatment options" section. */
  confirmed: boolean;
};

export type Faq = { question: string; answer: string };

export type Service = {
  slug: string;
  title: string;
  categoryId: CategoryId;
  image: ImageKey;
  cardDescription: string;
  intro: string;
  /** Shown as a notice when the clinic has not yet confirmed this service is offered. */
  availabilityNote?: string;
  reasons: string[];
  consultation: string[];
  options: TreatmentOption[];
  faqs: Faq[];
  seo: { title: string; description: string };
};

export type CategoryId = "medical" | "hair" | "aesthetic" | "laser";

export type ServiceCategory = {
  id: CategoryId;
  title: string;
  description: string;
  image: ImageKey;
  href: string;
  /** Topics listed under the category. `whereAvailable` adds an availability label. */
  topics: { label: string; whereAvailable?: boolean }[];
  emptyTopicsMessage?: string;
};

const suitabilityFaq: Faq = {
  question: "How do I know whether a treatment is right for me?",
  answer:
    "Suitability depends on your skin or hair, your health and your goals, so it can only be judged in a professional consultation. The clinician will explain what may be appropriate, along with its limits and possible side effects.",
};

const costFaq: Faq = {
  question: "How much will it cost?",
  answer:
    "Prices depend on what is recommended for you. Please ask the clinic directly, as this website does not list prices.",
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "medical",
    title: "Medical Dermatology",
    description:
      "Assessment and care for everyday and persistent skin concerns, from acne and rashes to pigmentation and scalp problems.",
    image: "skinExamination",
    href: "/services/dermatology",
    topics: [
      { label: "Acne and acne-related concerns" },
      { label: "Skin allergies and rashes" },
      { label: "Pigmentation concerns" },
      { label: "General skin-condition consultations" },
      { label: "Scalp and dandruff concerns" },
    ],
  },
  {
    id: "hair",
    title: "Hair Restoration",
    description:
      "A careful look at why hair is thinning or shedding, followed by a discussion of the options that may suit you.",
    image: "hairConcern",
    href: "/services/hair-restoration",
    topics: [
      { label: "Hair-loss evaluation" },
      { label: "Hair and scalp consultations" },
      { label: "PRP or GFC treatments", whereAvailable: true },
      { label: "Hair transplantation", whereAvailable: true },
    ],
  },
  {
    id: "aesthetic",
    title: "Aesthetic Dermatology",
    description:
      "Medically guided cosmetic care, considered only after a consultation about your skin and what you hope to change.",
    image: "aestheticTreatment",
    href: "/services/aesthetic-treatments",
    topics: [
      { label: "HydraFacial", whereAvailable: true },
      { label: "Chemical peels", whereAvailable: true },
      { label: "Microneedling", whereAvailable: true },
      { label: "Botox and other approved cosmetic procedures", whereAvailable: true },
    ],
  },
  {
    id: "laser",
    title: "Laser Treatments",
    description:
      "Light-based procedures need careful selection and skin assessment. Only procedures the clinic has confirmed will be listed.",
    image: "laserDevice",
    href: "/services/laser-treatments",
    topics: [],
    emptyTopicsMessage: "The clinic is confirming which laser procedures it offers.",
  },
];

export const services: Service[] = [
  {
    slug: "dermatology",
    title: "Dermatology Consultation",
    categoryId: "medical",
    image: "skinExamination",
    cardDescription:
      "Assessment of rashes, allergies, pigmentation, scalp problems and other skin concerns.",
    intro:
      "Many skin concerns look alike but have different causes. A dermatology consultation in Butwal gives you the chance to have your skin examined, ask questions and understand what may be going on before any treatment is chosen.",
    reasons: [
      "A rash, itching or irritation that keeps returning",
      "A suspected skin allergy or reaction to a product",
      "Dark patches, uneven tone or other pigmentation changes",
      "Dryness, flaking, dandruff or scalp discomfort",
      "A new or changing mark on the skin that you would like checked",
    ],
    consultation: [
      "A conversation about your concern, when it began and what you have already tried",
      "A look at the affected skin or scalp",
      "Questions about relevant health history, medicines and skin products",
      "An explanation of likely causes, and any tests that may be useful",
      "A care plan in plain language, with time to ask questions",
    ],
    options: [
      {
        name: "Topical and oral medicines",
        description: "Prescribed where a clinician considers them appropriate.",
        confirmed: false,
      },
      {
        name: "Skin-care guidance",
        description: "Advice on suitable products, sun protection and daily routine.",
        confirmed: false,
      },
    ],
    faqs: [
      {
        question: "What should I bring to my appointment?",
        answer:
          "It helps to bring any medicines and skin products you currently use, along with earlier prescriptions or test reports. Please confirm any other requirements with the clinic.",
      },
      {
        question: "Should I stop my skin products before I come?",
        answer:
          "Please do not stop a prescribed medicine without medical advice. If you are unsure about anything before your visit, ask the clinic when your appointment is confirmed.",
      },
      suitabilityFaq,
      costFaq,
    ],
    seo: {
      title: "Dermatology Consultation in Butwal",
      description:
        "Have skin rashes, allergies, pigmentation or scalp concerns assessed at a dermatology consultation at YETI Skin and Hair Clinic in Butwal, Nepal.",
    },
  },
  {
    slug: "acne-treatment",
    title: "Acne Care",
    categoryId: "medical",
    image: "skinCare",
    cardDescription:
      "Understand what is driving your breakouts or marks, and which next steps may help.",
    intro:
      "Acne is common and can affect teenagers and adults alike. It can also affect how people feel about themselves. A consultation looks at your acne type, skin and routine so that care can be planned around you.",
    reasons: [
      "Breakouts that persist despite over-the-counter products",
      "Painful or deep spots",
      "Marks or scars left behind by earlier acne",
      "Acne that began or changed in adulthood",
      "Uncertainty about which products are suitable",
    ],
    consultation: [
      "A review of your acne history, routine and earlier treatments",
      "An examination of the skin to understand the type of acne",
      "A discussion of possible contributing factors",
      "An explanation of options, how long they may take and possible side effects",
      "A plan for follow-up, if needed",
    ],
    options: [
      {
        name: "Topical or oral treatment",
        description: "Selected by a clinician according to the type and severity of acne.",
        confirmed: false,
      },
      {
        name: "In-clinic procedures",
        description: "Considered for some patients after assessment.",
        confirmed: false,
      },
    ],
    faqs: [
      {
        question: "How long does acne care take to show change?",
        answer:
          "It varies from person to person and between treatments, and many take weeks or longer. Your clinician can explain what is realistic for you. No clinic can promise a specific result.",
      },
      {
        question: "Can acne marks be treated?",
        answer:
          "Options depend on the type of mark and on your skin. A clinician can tell you what may be suitable after examining them.",
      },
      suitabilityFaq,
      costFaq,
    ],
    seo: {
      title: "Acne Care and Consultation in Butwal",
      description:
        "Book a consultation about acne, breakouts and acne marks at YETI Skin and Hair Clinic in Butwal. Care is planned around your skin after assessment.",
    },
  },
  {
    slug: "hair-restoration",
    title: "Hair Loss and Restoration",
    categoryId: "hair",
    image: "scalpTreatment",
    cardDescription:
      "An evaluation of thinning or shedding hair, and a discussion of options that may suit you.",
    intro:
      "Hair loss has many possible causes, and the right next step depends on which one applies to you. A hair and scalp consultation starts by trying to understand the cause rather than assuming a treatment.",
    availabilityNote:
      "PRP and GFC treatments are listed subject to availability. Please check with the clinic when you request an appointment.",
    reasons: [
      "Increased shedding or a widening parting",
      "A receding hairline or thinning crown",
      "Patches of hair loss",
      "An itchy, flaky or uncomfortable scalp",
      "Questions about whether a procedure might be suitable",
    ],
    consultation: [
      "A conversation about how and when the hair change began",
      "A review of family history, health, medicines and hair care",
      "An examination of the hair and scalp",
      "Discussion of whether any tests may be useful",
      "An explanation of options and realistic expectations",
    ],
    options: [
      {
        name: "PRP treatment",
        description: "A procedure that uses a preparation made from the patient's own blood.",
        confirmed: false,
      },
      {
        name: "GFC treatment",
        description: "A procedure that uses growth factors prepared from the patient's own blood.",
        confirmed: false,
      },
    ],
    faqs: [
      {
        question: "Is hair loss always permanent?",
        answer:
          "Not always. Some types of hair loss can settle while others are progressive, which is why a proper assessment comes first.",
      },
      {
        question: "Will I need a procedure?",
        answer:
          "Not necessarily. Many people only need assessment and advice at first. A procedure is only worth discussing if it may be suitable for your type of hair loss.",
      },
      suitabilityFaq,
      costFaq,
    ],
    seo: {
      title: "Hair Loss Evaluation and Restoration in Butwal",
      description:
        "Consult about hair thinning, shedding and scalp concerns at YETI Skin and Hair Clinic in Butwal. Options are discussed only after an evaluation.",
    },
  },
  {
    slug: "hair-transplant",
    title: "Hair Transplant Consultation",
    categoryId: "hair",
    image: "scalpReview",
    cardDescription:
      "Find out whether hair transplantation may be suitable, and what the process would involve.",
    intro:
      "A hair transplant is a surgical procedure that moves hair follicles from one part of the scalp to another. It does not suit everyone, so a careful consultation in Butwal comes first, with a realistic discussion of what it can and cannot do.",
    availabilityNote:
      "The clinic is confirming whether hair transplantation is currently offered. Please check before requesting an appointment for this service.",
    reasons: [
      "Long-standing hair loss in a defined pattern",
      "Wanting to understand what a transplant involves",
      "Wanting to know whether non-surgical care should be tried first",
      "Questions about recovery and aftercare",
    ],
    consultation: [
      "An assessment of the cause and pattern of your hair loss",
      "An examination of the donor area and the area of concern",
      "A review of your health and medicines",
      "A discussion of goals, limits, risks and recovery",
      "Time to consider your decision, with no obligation to proceed",
    ],
    options: [],
    faqs: [
      {
        question: "Is everyone suitable for a hair transplant?",
        answer:
          "No. Suitability depends on factors such as the cause of hair loss, the donor area and your health. A clinician assesses this in person.",
      },
      {
        question: "Are results guaranteed?",
        answer:
          "No surgical procedure has a guaranteed result. Your clinician should explain likely benefits and risks so that you can decide with realistic expectations.",
      },
      suitabilityFaq,
      costFaq,
    ],
    seo: {
      title: "Hair Transplant Consultation in Butwal",
      description:
        "Learn what a hair transplant consultation involves, who may be suitable and what to ask. Information from YETI Skin and Hair Clinic in Butwal, Nepal.",
    },
  },
  {
    slug: "aesthetic-treatments",
    title: "Aesthetic Treatments",
    categoryId: "aesthetic",
    image: "facialCare",
    cardDescription:
      "Medically guided cosmetic skin care, considered after a personal consultation.",
    intro:
      "Aesthetic dermatology is about helping you make an informed decision about your appearance. Any procedure should follow a consultation about your skin, your goals and the risks involved.",
    availabilityNote:
      "HydraFacial, chemical peels, microneedling and Botox are listed subject to availability. Please check with the clinic when you request an appointment.",
    reasons: [
      "Dull or uneven-looking skin",
      "Fine lines or other visible signs of ageing",
      "Enlarged pores or uneven skin texture",
      "Wanting medical advice before trying a cosmetic procedure",
    ],
    consultation: [
      "A conversation about what you would like to change and why",
      "An assessment of your skin type and any active skin concerns",
      "A review of medicines, allergies and earlier procedures",
      "An honest discussion of options, including not having a procedure",
      "Information on risks, aftercare and any sun-protection needs",
    ],
    options: [
      {
        name: "HydraFacial",
        description: "A device-based facial cleansing and hydration procedure.",
        confirmed: false,
      },
      {
        name: "Chemical peels",
        description: "Controlled application of a solution to the outer layers of skin.",
        confirmed: false,
      },
      {
        name: "Microneedling",
        description: "A procedure that makes tiny, controlled punctures in the skin.",
        confirmed: false,
      },
      {
        name: "Botox and other approved cosmetic procedures",
        description: "Injectable and other procedures performed under medical guidance.",
        confirmed: false,
      },
    ],
    faqs: [
      {
        question: "Are aesthetic procedures safe for everyone?",
        answer:
          "Every procedure has possible side effects, and some are unsuitable for certain skin types or health conditions. This is why they are considered only after assessment.",
      },
      {
        question: "Can I have a procedure on the same day as my consultation?",
        answer:
          "This depends on the procedure and on your assessment. Please ask the clinic when your appointment is confirmed.",
      },
      suitabilityFaq,
      costFaq,
    ],
    seo: {
      title: "Aesthetic Skin Treatments in Butwal",
      description:
        "Consult about medically guided aesthetic skin care at YETI Skin and Hair Clinic in Butwal. Suitability is assessed in a professional consultation.",
    },
  },
  {
    slug: "laser-treatments",
    title: "Laser Treatments",
    categoryId: "laser",
    image: "laserDevice",
    cardDescription:
      "Information about laser consultations. Only procedures confirmed by the clinic are listed.",
    intro:
      "Lasers use focused light for specific skin and hair concerns. The right device and settings depend on the concern and on your skin, so an assessment is important, particularly for deeper skin tones.",
    availabilityNote:
      "The clinic is confirming which laser procedures it offers. Please check with the clinic before requesting an appointment for a specific procedure.",
    reasons: [
      "Wanting to know whether a laser procedure might suit your concern",
      "Questions about risks for your skin type",
      "Wanting to understand the preparation and aftercare involved",
    ],
    consultation: [
      "A discussion of your concern and goals",
      "An assessment of your skin type and sun exposure",
      "A review of medicines and any history of scarring or pigmentation changes",
      "An explanation of whether a laser is appropriate, or whether another approach may be better",
      "Information on risks, aftercare and sun protection",
    ],
    options: [],
    faqs: [
      {
        question: "Are laser treatments suitable for all skin types?",
        answer:
          "Not all procedures suit all skin types, and some carry a risk of pigmentation changes. A clinician should assess your skin before any laser procedure.",
      },
      {
        question: "How many sessions would I need?",
        answer:
          "It depends on the procedure and on the individual, so it can only be discussed after assessment. Results cannot be guaranteed.",
      },
      suitabilityFaq,
      costFaq,
    ],
    seo: {
      title: "Laser Treatment Consultation in Butwal",
      description:
        "Learn what to expect from a laser treatment consultation and why skin assessment matters. Information from YETI Skin and Hair Clinic in Butwal, Nepal.",
    },
  },
];

export const getService = (slug: string) => services.find((service) => service.slug === slug);

export const servicesInCategory = (id: CategoryId) =>
  services.filter((service) => service.categoryId === id);

/** Options for the appointment form's "Preferred service" dropdown. */
export const appointmentServiceOptions = [
  ...services.map((service) => ({ value: service.slug, label: service.title })),
  { value: "not-sure", label: "Not sure, please advise" },
];
