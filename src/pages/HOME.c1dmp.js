import wixLocation from 'wix-location';

const PAGE_CONTENT = {
  hero: {
    eyebrow: "JPV-OS ACCESS GATEWAY",
    title: "Welcome to the Venture",
    subtitle: "Scalable digital infrastructure, ecosystem coordination, and connected operational systems."
  },
  cta: {
    primary: { label: "Explore the Ecosystem", link: "/ecosystem" },
    secondary: { label: "View Architecture", link: "/architecture" }
  }
};

function setText(id, value) {
  try {
    const el = $w(id);
    if (el && "text" in el) el.text = value;
  } catch {}
}

function setButton(id, label, link) {
  try {
    const el = $w(id);
    if (!el) return;
    if ("label" in el) el.label = label;
    el.onClick(() => wixLocation.to(link));
  } catch {}
}

$w.onReady(function () {
  setText("#heroEyebrow", PAGE_CONTENT.hero.eyebrow);
  setText("#heroTitle", PAGE_CONTENT.hero.title);
  setText("#heroSubtitle", PAGE_CONTENT.hero.subtitle);

  setButton("#primaryCta", PAGE_CONTENT.cta.primary.label, PAGE_CONTENT.cta.primary.link);
  setButton("#secondaryCta", PAGE_CONTENT.cta.secondary.label, PAGE_CONTENT.cta.secondary.link);
});