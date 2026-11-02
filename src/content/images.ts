/**
 * Photo registry. Every current photo is licensed stock (see CREDITS.md), so
 * `illustrative` is true and the site labels it as such. When the clinic supplies
 * genuine photos, add them to assets/photos, run `npm run images`, and set
 * `illustrative: false` here.
 */

export type SiteImage = {
  src: string;
  alt: string;
  illustrative: boolean;
};

const stock = (name: string, alt: string): SiteImage => ({
  src: `/images/${name}.webp`,
  alt,
  illustrative: true,
});

export const images = {
  doctorPortrait: {
    src: "/images/doctor-portrait.webp",
    alt: "Portrait of Dr. Chandra Mohan Sah wearing glasses, a white coat and a stethoscope",
    illustrative: false,
  },
  consultationNotes: stock(
    "consultation-notes",
    "A doctor in a white coat taking notes at a desk while talking with a patient",
  ),
  consultationRoom: stock(
    "consultation-room",
    "A smiling clinician in a white coat reviewing a paper with a patient in a consulting room",
  ),
  skinExamination: stock(
    "skin-examination",
    "A gloved clinician examining a small mark on a patient's skin through a magnifying glass",
  ),
  skinCare: stock(
    "skin-care",
    "A smiling woman with her hand against her cheek and a little cream on her skin",
  ),
  aestheticTreatment: stock(
    "aesthetic-treatment",
    "A gloved practitioner using a handheld device on a patient's face during a skin treatment",
  ),
  facialCare: stock(
    "facial-care",
    "A woman in a surgical cap lying back while a gloved practitioner treats her cheek",
  ),
  hairConcern: stock(
    "hair-concern",
    "A man looking at loose strands of hair in his fingers as he runs a hand through his hair",
  ),
  scalpReview: stock(
    "scalp-review",
    "Hands parting tightly coiled hair to show the scalp underneath",
  ),
  scalpTreatment: stock(
    "scalp-treatment",
    "A gloved practitioner holding an applicator near the hairline of a woman with her eyes closed",
  ),
  laserDevice: stock(
    "laser-device",
    "A handheld laser device being used on a person's leg, which rests on a white towel",
  ),
  waitingArea: stock(
    "waiting-area",
    "A clean waiting area with teal sofas, a wall clock and a potted plant",
  ),
  treatmentRoom: stock(
    "treatment-room",
    "A warmly lit treatment room with wooden shelving, a counter and a padded couch",
  ),
  clinicalTeam: stock(
    "clinical-team",
    "Two clinicians, one in scrubs and one in a white coat, reading a tablet together",
  ),
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
