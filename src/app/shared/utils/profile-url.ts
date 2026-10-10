export function resolveProfileUrl(currentUrl: string, canonicalUrl: string | null): string {
  const current = new URL('/', currentUrl);
  if (canonicalUrl) {
    try {
      const canonical = new URL(canonicalUrl, current);
      if (
        ['http:', 'https:'].includes(canonical.protocol) &&
        !canonical.username &&
        !canonical.password
      ) {
        return new URL('/', canonical).href;
      }
    } catch {
      // A missing or invalid canonical URL must not prevent sharing the profile.
    }
  }
  return current.href;
}
