import { useEffect, useState } from 'react';
import { Settings2, X } from 'lucide-react';

const STORAGE_KEY = 'id-tid-cookie-preferences';

type Preferences = { essential: true; analytics: boolean };

export const CookieConsent = () => {
  const [open, setOpen] = useState(false);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    let saved: Preferences | null = null;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') as Preferences | null;
    } catch {
      saved = null;
    }
    setAnalytics(saved?.analytics === true);
    setOpen(saved === null);
    const handleOpen = () => {
      setManage(true);
      setOpen(true);
    };
    window.addEventListener('open-cookie-preferences', handleOpen);
    return () => window.removeEventListener('open-cookie-preferences', handleOpen);
  }, []);

  const save = (analyticsChoice: boolean) => {
    const preferences: Preferences = { essential: true, analytics: analyticsChoice };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    setAnalytics(analyticsChoice);
    setOpen(false);
    setManage(false);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => {
          setManage(true);
          setOpen(true);
        }}
        className="fixed bottom-20 right-5 z-30 inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-3 py-2 text-[12px] font-semibold text-navy shadow-subtle hover:border-azure sm:bottom-24 sm:right-6"
        aria-label="Open cookie preferences"
      >
        <Settings2 className="h-4 w-4" aria-hidden="true" />
        Cookie preferences
      </button>
    );
  }

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed bottom-4 left-4 right-4 z-[90] mx-auto max-w-[620px] rounded-lg border border-navy/15 bg-white p-5 shadow-elevated sm:bottom-6 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="cookie-title" className="text-[18px] font-bold text-navy">Your privacy choices</h2>
          <p className="mt-2 text-[13px] leading-[1.65] text-muted">
            We use essential hosting security and remember your cookie preference. We do not currently use optional analytics or advertising.
          </p>
        </div>
        {manage ? (
          <button type="button" onClick={() => setOpen(false)} className="rounded-md p-1 text-navy hover:bg-navy/5" aria-label="Close cookie preferences">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {manage ? (
        <label className="mt-4 flex items-start gap-3 rounded-md border border-navy/10 p-3">
          <input
            type="checkbox"
            checked={analytics}
            onChange={(event) => setAnalytics(event.target.checked)}
            className="mt-0.5 h-4 w-4 accent-azure"
          />
          <span>
            <span className="block text-[13px] font-semibold text-navy">Optional analytics</span>
            <span className="mt-1 block text-[12px] leading-[1.5] text-muted">No analytics provider is currently enabled.</span>
          </span>
        </label>
      ) : null}

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {manage ? (
          <button type="button" onClick={() => save(analytics)} className="rounded-md bg-navy px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-azure">
            Save preferences
          </button>
        ) : (
          <>
            <button type="button" onClick={() => save(true)} className="rounded-md bg-navy px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-azure">
              Accept all
            </button>
            <button type="button" onClick={() => save(false)} className="rounded-md border border-navy/20 bg-white px-4 py-2.5 text-[13px] font-semibold text-navy hover:border-azure">
              Reject non-essential
            </button>
            <button type="button" onClick={() => setManage(true)} className="rounded-md px-4 py-2.5 text-[13px] font-semibold text-navy underline hover:text-azure">
              Manage preferences
            </button>
          </>
        )}
      </div>
    </aside>
  );
};
