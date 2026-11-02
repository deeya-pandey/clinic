import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildEmailUrl,
  buildRequestMessage,
  buildSummary,
  buildWhatsappUrl,
  emptyAppointment,
  isValidEmail,
  isValidPhone,
  todayInNepal,
  validateAppointment,
} from "./appointment.ts";

const valid = {
  ...emptyAppointment,
  fullName: "Test Patient",
  phone: "9800000000",
  service: "dermatology",
  date: "2026-11-02",
  timeSlot: "morning",
  consent: true,
};

test("accepts Nepali and international phone formats", () => {
  for (const phone of ["9800000000", "+977 980-000-0000", "977 9700000000", "071 540 000", "+977 71540000", "+44 20 7946 0000"]) {
    assert.equal(isValidPhone(phone), true, phone);
  }
});

test("rejects malformed phone numbers", () => {
  for (const phone of ["", "12345", "phone", "9000000000", "98000000001", "+1", "98000abc00"]) {
    assert.equal(isValidPhone(phone), false, phone);
  }
});

test("validates email format", () => {
  assert.equal(isValidEmail("a.person@example.com"), true);
  assert.equal(isValidEmail("a.person@example"), false);
  assert.equal(isValidEmail("a person@example.com"), false);
});

test("a complete request has no errors", () => {
  assert.deepEqual(validateAppointment(valid, "2026-11-01"), {});
});

test("reports every missing required field", () => {
  const errors = validateAppointment(emptyAppointment, "2026-11-01");
  assert.deepEqual(Object.keys(errors).sort(), ["consent", "date", "fullName", "phone", "service", "timeSlot"]);
});

test("rejects past and impossible dates but allows today", () => {
  assert.ok(validateAppointment({ ...valid, date: "2026-10-31" }, "2026-11-01").date);
  assert.ok(validateAppointment({ ...valid, date: "2026-02-30" }, "2026-01-01").date);
  assert.equal(validateAppointment({ ...valid, date: "2026-11-01" }, "2026-11-01").date, undefined);
});

test("today is calculated in Nepal time", () => {
  assert.equal(todayInNepal(new Date("2026-11-01T18:20:00Z")), "2026-11-02");
  assert.equal(todayInNepal(new Date("2026-11-01T18:10:00Z")), "2026-11-01");
});

test("the message omits blank optional fields and encodes safely in links", () => {
  const rows = buildSummary(valid, { service: "Dermatology & Skin", timeSlot: "Morning", patientType: "", clinician: "" });
  assert.equal(rows.some((row) => row.label === "Email"), false);

  const message = buildRequestMessage("YETI Skin and Hair Clinic", rows);
  assert.match(message, /Preferred service: Dermatology & Skin/);
  assert.match(message, /Please reply to confirm/);

  const whatsapp = new URL(buildWhatsappUrl("9779800000000", message));
  assert.equal(whatsapp.searchParams.get("text"), message);
  assert.equal(whatsapp.pathname, "/9779800000000");

  assert.ok(buildEmailUrl("clinic@example.com", "YETI", message).startsWith("mailto:clinic@example.com?subject="));
});
