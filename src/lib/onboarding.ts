export type OnboardingIntent = "free" | "premium";
export type OnboardingPlacement = "hero" | "mid" | "footer" | "sticky" | "pricing";
export type OnboardingLanguage = "es" | "en";

interface StartOnboardingParams {
  intent: OnboardingIntent;
  language: OnboardingLanguage;
  placement: OnboardingPlacement;
}

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

export const startOnboarding = async ({ intent, language, placement }: StartOnboardingParams) => {
  emitEvent(intent === "free" ? "cta_free_click_rate" : "cta_premium_click_rate", {
    intent,
    language,
    placement,
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
    body: JSON.stringify({ intent, language }),
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

