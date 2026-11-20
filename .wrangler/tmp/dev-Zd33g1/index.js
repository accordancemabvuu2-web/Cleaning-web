var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker/index.ts
var DEFAULT_RECIPIENT = "accordancemabvuu@gmail.com";
var MAX_BODY_LENGTH = 2e4;
var limits = {
  fullName: 100,
  phoneNumber: 32,
  email: 254,
  service: 120,
  propertyType: 40,
  location: 200,
  preferredDate: 32,
  message: 2e3
};
var rateLimitStore = /* @__PURE__ */ new Map();
function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...headers }
  });
}
__name(json, "json");
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
__name(escapeHtml, "escapeHtml");
function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}
__name(cleanString, "cleanString");
function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}
__name(isEmail, "isEmail");
function isValidDate(value) {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = /* @__PURE__ */ new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
__name(isValidDate, "isValidDate");
function isAllowedOrigin(request, env, url) {
  const origin = request.headers.get("Origin");
  if (!origin) return true;
  const allowed = /* @__PURE__ */ new Set([url.origin]);
  for (const item of (env.ALLOWED_ORIGINS || "").split(",")) {
    const trimmed = item.trim();
    if (trimmed) allowed.add(trimmed.replace(/\/$/, ""));
  }
  return allowed.has(origin.replace(/\/$/, ""));
}
__name(isAllowedOrigin, "isAllowedOrigin");
function corsHeaders(request, env, url) {
  const origin = request.headers.get("Origin");
  if (!origin || !isAllowedOrigin(request, env, url)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}
__name(corsHeaders, "corsHeaders");
function isRateLimited(request) {
  const ip = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "unknown";
  const now = Date.now();
  const existing = rateLimitStore.get(ip);
  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + 6e4 });
    return false;
  }
  if (existing.count >= 5) return true;
  existing.count += 1;
  return false;
}
__name(isRateLimited, "isRateLimited");
var worker_default = {
  async fetch(request, env) {
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
        Allow: "POST"
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
    let payload;
    try {
      const text2 = await request.text();
      if (text2.length > MAX_BODY_LENGTH) {
        return json({ error: "Request body is too large." }, 413, cors);
      }
      payload = JSON.parse(text2);
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
      message: cleanString(payload.message)
    };
    const fieldErrors = {};
    for (const [field, max] of Object.entries(limits)) {
      const value = data[field];
      if (value.length > max) fieldErrors[field] = `This field is too long.`;
    }
    if (!data.fullName) fieldErrors.fullName = "Full name is required.";
    if (!data.phoneNumber) {
      fieldErrors.phoneNumber = "Phone number is required.";
    } else if (!/^[0-9+\s().-]+$/.test(data.phoneNumber) || data.phoneNumber.replace(/[^0-9]/g, "").length < 8) {
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
    const submittedAt = /* @__PURE__ */ new Date();
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
      ["Submission date and time", escapeHtml(submittedAt.toUTCString())]
    ];
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:680px;color:#111827">
        <h2 style="color:#0A2E73">New Cleaning Quotation Request</h2>
        <table style="width:100%;border-collapse:collapse">
          ${htmlRows.map(
      ([label, value]) => `<tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;font-weight:bold;width:180px">${label}</td><td style="padding:8px;border-bottom:1px solid #e5e7eb">${value.replace(/\n/g, "<br>")}</td></tr>`
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
      `Submission date and time: ${submittedAt.toUTCString()}`
    ].join("\n");
    const configuredRecipient = cleanString(env.CONTACT_TO_EMAIL);
    const recipient = isEmail(configuredRecipient) ? configuredRecipient : DEFAULT_RECIPIENT;
    const resendPayload = {
      from: env.RESEND_FROM_EMAIL,
      to: [recipient],
      subject: `New Cleaning Quotation Request \u2013 ${data.fullName}`,
      html,
      text
    };
    if (data.email) resendPayload.reply_to = data.email;
    let resendResponse;
    try {
      resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(resendPayload)
      });
    } catch {
      return json({ error: "The email provider is currently unavailable. Please try again." }, 502, cors);
    }
    if (!resendResponse.ok) {
      console.error(`Resend email request failed with status ${resendResponse.status}`);
      return json({ error: "We could not send your enquiry. Please try again shortly." }, 502, cors);
    }
    return json({ success: true, message: "Quotation request sent successfully." }, 200, cors);
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-h0RsVR/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-h0RsVR/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
