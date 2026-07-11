export type OnboardingIntent = "free" | "premium" | "ambassador";
export type OnboardingPlacement = "hero" | "mid" | "footer" | "sticky" | "pricing" | "ambassadors";
export type OnboardingLanguage = "es" | "en";

interface StartOnboardingParams {
  intent: OnboardingIntent;
  language: OnboardingLanguage;
  placement: OnboardingPlacement;
  /** Attribution override, e.g. "event:pamplona-jul23" | "amb:maria". Defaults to the captured URL source. */
  source?: string;
}

const SOURCE_STORAGE_KEY = "andes_source";
const SOURCE_PATTERN = /^[a-zA-Z0-9:_-]{1,64}$/;

/**
 * Captures `?source=` from the URL (QR codes, ambassador links) and keeps it for the
 * session so the attribution survives navigation until a CTA is clicked.
 */
export const getTrackedSource = (): string | undefined => {
  if (typeof window === "undefined") return undefined;
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("source");
    if (fromUrl && SOURCE_PATTERN.test(fromUrl)) {
      window.sessionStorage.setItem(SOURCE_STORAGE_KEY, fromUrl);
      return fromUrl;
    }
    return window.sessionStorage.getItem(SOURCE_STORAGE_KEY) ?? undefined;
  } catch {
    return undefined;
  }
};

interface OnboardingResponse {
  success?: boolean;
  whatsappLink?: string;
  error?: string;
}

const API_BASE_URL = import.meta.env.VITE_ONBOARDING_API_BASE_URL ?? "https://v3-production-2670.up.railway.app";

const emitEvent = (name: string, params: Record<string, unknown>) => {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", name, params);
};

const CTA_EVENT_BY_INTENT: Record<OnboardingIntent, string> = {
  free: "cta_free_click_rate",
  premium: "cta_premium_click_rate",
  ambassador: "cta_ambassador_click",
};

export const startOnboarding = async ({ intent, language, placement, source }: StartOnboardingParams) => {
  const attributionSource = source ?? getTrackedSource();

  emitEvent(CTA_EVENT_BY_INTENT[intent], {
    intent,
    language,
    placement,
    source: attributionSource,
    page_location: window.location.href,
  });

  if (placement === "pricing") {
    emitEvent("pricing_view_to_whatsapp_start", {
      intent,
      language,
      page_location: window.location.href,
    });
  }

  const response = await fetch(`${API_BASE_URL}/onboarding/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(attributionSource ? { intent, language, source: attributionSource } : { intent, language }),
  });

  if (!response.ok) {
    emitEvent("onboarding_start_error", {
      intent,
      language,
      placement,
      status: response.status,
    });
    throw new Error(`Onboarding request failed with status ${response.status}`);
  }

  const data = (await response.json()) as OnboardingResponse;

  if (!data.success || !data.whatsappLink) {
    emitEvent("onboarding_start_error", {
      intent,
      language,
      placement,
      error: data.error ?? "missing_whatsapp_link",
    });
    throw new Error(data.error ?? "Onboarding response missing WhatsApp link");
  }

  emitEvent("conversation_started", {
    intent,
    language,
    placement,
    page_location: window.location.href,
  });

  window.location.href = data.whatsappLink;
};

