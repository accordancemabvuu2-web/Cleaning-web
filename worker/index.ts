interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
  ALLOWED_ORIGINS?: string;
}

interface ContactPayload {
  fullName: string;
  phoneNumber: string;
  email: string;
  service: string;
  propertyType: string;
  location: string;
  preferredDate: string;
  message: string;
  website?: string;
}

const DEFAULT_RECIPIENT = "accordancemabvuu@gmail.com";
const MAX_BODY_LENGTH = 20_000;
const limits = {
  fullName: 100,
  phoneNumber: 32,
  email: 254,
  service: 120,
  propertyType: 40,
  location: 200,
  preferredDate: 32,
  message: 2000,
};

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function json(body: unknown, status = 200, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...headers },
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function cleanString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function isValidDate(value: string): boolean {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function isAllowedOrigin(request: Request, env: Env, url: URL): boolean {
  const origin = request.headers.get("Origin");
  if (!origin) return true;

  const allowed = new Set<string>([url.origin]);
  for (const item of (env.ALLOWED_ORIGINS || "").split(",")) {
    const trimmed = item.trim();
    if (trimmed) allowed.add(trimmed.replace(/\/$/, ""));
  }
  return allowed.has(origin.replace(/\/$/, ""));
}

function corsHeaders(request: Request, env: Env, url: URL): HeadersInit {
  const origin = request.headers.get("Origin");
  if (!origin || !isAllowedOrigin(request, env, url)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function isRateLimited(request: Request): boolean {
  const ip =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For") ||
    "unknown";
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (existing.count >= 5) return true;
  existing.count += 1;
  return false;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== "/api/contact") {
      return env.ASSETS.fetch(request);
    }

    const cors = corsHeaders(request, env, url);
    if (!isAllowedOrigin(request, env, url)) {
      return json({ error: "Request origin is not allowed." }, 403, cors);
    }
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") {
      return json({ error: "Method not allowed." }, 405, {
        ...cors,
        Allow: "POST",
      });
    }

    const contentType = request.headers.get("Content-Type") || "";
    if (!contentType.toLowerCase().startsWith("application/json")) {
      return json({ error: "Content-Type must be application/json." }, 415, cors);
    }

    const contentLength = request.headers.get("Content-Length");
    if (contentLength && Number(contentLength) > MAX_BODY_LENGTH) {
      return json({ error: "Request body is too large." }, 413, cors);
    }

    let payload: ContactPayload;
    try {
      const text = await request.text();
      if (text.length > MAX_BODY_LENGTH) {
        return json({ error: "Request body is too large." }, 413, cors);
      }
      payload = JSON.parse(text);
    } catch {
      return json({ error: "Malformed JSON request." }, 400, cors);
    }

    if (!payload || typeof payload !== "object" || cleanString(payload.website)) {
      return json({ error: "Unable to accept this enquiry." }, 400, cors);
    }

    const data = {
      fullName: cleanString(payload.fullName),
      phoneNumber: cleanString(payload.phoneNumber),
      email: cleanString(payload.email).toLowerCase(),
      service: cleanString(payload.service),
      propertyType: cleanString(payload.propertyType),
      location: cleanString(payload.location),
      preferredDate: cleanString(payload.preferredDate),
      message: cleanString(payload.message),
    };

    const fieldErrors: Record<string, string> = {};
    for (const [field, max] of Object.entries(limits)) {
      const value = data[field as keyof typeof data];
      if (value.length > max) fieldErrors[field] = `This field is too long.`;
    }
    if (!data.fullName) fieldErrors.fullName = "Full name is required.";
    if (!data.phoneNumber) {
      fieldErrors.phoneNumber = "Phone number is required.";
    } else if (!/^[0-9+\s().-]+$/.test(data.phoneNumber) ||
      data.phoneNumber.replace(/[^0-9]/g, "").length < 8) {
      fieldErrors.phoneNumber = "Please provide a valid phone number.";
    }
    if (!data.service) fieldErrors.service = "Cleaning service is required.";
    if (!data.propertyType) {
      fieldErrors.propertyType = "Property type is required.";
    } else if (!["Residential", "Commercial"].includes(data.propertyType)) {
      fieldErrors.propertyType = "Property type is invalid.";
    }
    if (!data.location) fieldErrors.location = "Location is required.";
    if (data.email && !isEmail(data.email)) {
      fieldErrors.email = "Please provide a valid email address.";
    }
    if (!isValidDate(data.preferredDate)) {
      fieldErrors.preferredDate = "Preferred date is invalid.";
    }
    if (Object.keys(fieldErrors).length) {
      return json({ error: "Please correct the highlighted fields.", fields: fieldErrors }, 400, cors);
    }

    if (isRateLimited(request)) {
      return json({ error: "Too many requests. Please try again shortly." }, 429, cors);
    }

    if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
      return json({ error: "Email service is not configured." }, 503, cors);
    }

    const submittedAt = new Date();
    const customerEmail = data.email ? escapeHtml(data.email) : "Not supplied";
    const preferredDate = data.preferredDate || "Not specified";
    const message = data.message || "No additional requirements provided";

    const htmlRows = [
      ["Customer name", escapeHtml(data.fullName)],
      ["Phone number", escapeHtml(data.phoneNumber)],
      ["Customer email", customerEmail],
      ["Cleaning service", escapeHtml(data.service)],
      ["Property type", escapeHtml(data.propertyType)],
      ["Location / suburb", escapeHtml(data.location)],
      ["Preferred cleaning date", escapeHtml(preferredDate)],
      ["Additional message", escapeHtml(message)],
      ["Submission date and time", escapeHtml(submittedAt.toUTCString())],
    ];
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:680px;color:#111827">
        <h2 style="color:#0A2E73">New Cleaning Quotation Request</h2>
        <table style="width:100%;border-collapse:collapse">
          ${htmlRows.map(([label, value]) =>
            `<tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;font-weight:bold;width:180px">${label}</td><td style="padding:8px;border-bottom:1px solid #e5e7eb">${value.replace(/\n/g, "<br>")}</td></tr>`
          ).join("")}
        </table>
      </div>`;

    const text = [
      "NEW CLEANING QUOTATION REQUEST",
      "",
      `Customer name: ${data.fullName}`,
      `Phone number: ${data.phoneNumber}`,
      `Customer email: ${data.email || "Not supplied"}`,
      `Cleaning service: ${data.service}`,
      `Property type: ${data.propertyType}`,
      `Location / suburb: ${data.location}`,
      `Preferred cleaning date: ${preferredDate}`,
      `Additional message: ${message}`,
      `Submission date and time: ${submittedAt.toUTCString()}`,
    ].join("\n");

    const configuredRecipient = cleanString(env.CONTACT_TO_EMAIL);
    const recipient = isEmail(configuredRecipient) ? configuredRecipient : DEFAULT_RECIPIENT;

    const resendPayload: Record<string, unknown> = {
      from: env.RESEND_FROM_EMAIL,
      to: [recipient],
      subject: `New Cleaning Quotation Request – ${data.fullName}`,
      html,
      text,
    };
    if (data.email) resendPayload.reply_to = data.email;

    let resendResponse: Response;
    try {
      resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resendPayload),
      });
    } catch {
      return json({ error: "The email provider is currently unavailable. Please try again." }, 502, cors);
    }

    if (!resendResponse.ok) {
      console.error(`Resend email request failed with status ${resendResponse.status}`);
      return json({ error: "We could not send your enquiry. Please try again shortly." }, 502, cors);
    }

    return json({ success: true, message: "Quotation request sent successfully." }, 200, cors);
  },
};
