type AppStoreBadgeProps = {
  href: string;
  label: string;
};

export function AppStoreBadge({ href, label }: AppStoreBadgeProps) {
  return (
    <a className="app-store-badge" href={href} aria-label={`${label} on the App Store`}>
      <img
        src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
        alt=""
        width={120}
        height={40}
      />
    </a>
  );
}
