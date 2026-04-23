// Homepage content controller for JayPVentures LLC
// Built for Wix Velo
// Purpose:
// - Replace placeholder homepage text with enterprise-ready brand messaging
// - Safely populate matching elements only if they exist on the page
// - Support multiple possible element IDs without breaking preview/publish
// - Animate hero and brand card elements on page load

import wixLocation from 'wix-location';

const HOME_CONTENT = {
    heroTitle: 'Production-ready digital infrastructure for brands built to scale.',
    heroSubtitle:
        'JayPVentures LLC designs conversion-focused Wix environments, automation systems, and monetization architecture that reduce manual work, improve clarity, and support growth without operational drag.',
    heroEyebrow: 'JayPVentures LLC',
    trustLine:
        'Wix Velo • Automation-ready architecture • Stripe-ready monetization • Performance-tested systems',

    primaryCtaLabel: 'Book a Strategy Call',
    primaryCtaLink: '/contact',

    secondaryCtaLabel: 'View Services',
    secondaryCtaLink: '/services',

    sectionOneTitle: 'Systems-first digital infrastructure',
    sectionOneBody:
        'This is not a template-driven build. Every layer is designed to align frontend experience with backend logic so the site can convert, automate, and support revenue with less manual intervention.',

    sectionTwoTitle: 'What this website is built to do',
    sectionTwoBody:
        'From onboarding and bookings to monetization flows and API-ready architecture, the environment is structured to support scalable operations instead of one-off admin work.',

    capabilitiesTitle: 'Core capabilities',
    capabilitiesHtml: `
        <ul style="padding-left:18px; margin:0;">
            <li>Conversion-focused web environments built on Wix Velo</li>
            <li>Structured client and user flows for forms, onboarding, and booking</li>
            <li>Stripe-ready monetization architecture</li>
            <li>Automation-ready systems for APIs, webhooks, and workflow expansion</li>
            <li>Performance support through load testing and operational validation</li>
        </ul>
    `,

    philosophyTitle: 'Precision is a standard, not a feature.',
    philosophyBody:
        'Every layer of the environment is designed to reduce friction, increase clarity, and create repeatable infrastructure that performs beyond manual dependency.'
};

const ELEMENTS = {
    heroEyebrow: ['heroEyebrow', 'textHeroEyebrow', 'homeEyebrow', 'eyebrowText'],
    heroTitle: ['heroTitle', 'homeHeroTitle', 'headingHero', 'heroHeading', 'textHeroTitle'],
    heroSubtitle: ['heroSubtitle', 'homeHeroSubtitle', 'textHeroSubtitle', 'heroBody', 'subheadingHero'],
    trustLine: ['trustLine', 'textTrustLine', 'homeTrustLine', 'heroTrustText'],

    primaryCta: ['primaryCtaButton', 'heroPrimaryButton', 'buttonPrimary', 'bookCallButton', 'ctaPrimary', 'heroCtaButton'],
    secondaryCta: ['secondaryCtaButton', 'heroSecondaryButton', 'buttonSecondary', 'servicesButton', 'ctaSecondary'],
    shopNow: ['shopNowButton'],
    contactCta: ['contactCtaButton'],

    sectionOneTitle: ['sectionOneTitle', 'servicesIntroTitle', 'overviewTitle', 'homeSection1Title'],
    sectionOneBody: ['sectionOneBody', 'servicesIntroBody', 'overviewBody', 'homeSection1Body'],

    sectionTwoTitle: ['sectionTwoTitle', 'systemsTitle', 'homeSection2Title', 'offerTitle'],
    sectionTwoBody: ['sectionTwoBody', 'systemsBody', 'homeSection2Body', 'offerBody'],

    capabilitiesTitle: ['capabilitiesTitle', 'coreCapabilitiesTitle', 'servicesTitle', 'featuresTitle'],
    capabilitiesHtml: ['capabilitiesHtml', 'coreCapabilitiesHtml', 'servicesRichText', 'featuresRichText'],

    philosophyTitle: ['philosophyTitle', 'precisionTitle', 'closingTitle', 'brandPhilosophyTitle'],
    philosophyBody: ['philosophyBody', 'precisionBody', 'closingBody', 'brandPhilosophyBody']
};

function getElement(id) {
    try {
        return $w(`#${id}`);
    } catch (error) {
        return null;
    }
}

function findFirstElement(ids = []) {
    for (const id of ids) {
        const element = getElement(id);
        if (element) return element;
    }
    return null;
}

function setText(ids, value) {
    const element = findFirstElement(ids);
    if (!element || !value) return false;

    if (typeof element.text !== 'undefined') {
        element.text = value;
        return true;
    }

    if (typeof element.label !== 'undefined') {
        element.label = value;
        return true;
    }

    return false;
}

function setHtml(ids, value) {
    const element = findFirstElement(ids);
    if (!element || !value) return false;

    if (typeof element.html !== 'undefined') {
        element.html = value;
        return true;
    }

    if (typeof element.text !== 'undefined') {
        element.text = value.replace(/<[^>]*>/g, '');
        return true;
    }

    return false;
}

function wireButton(ids, label, link) {
    const button = findFirstElement(ids);
    if (!button) return false;

    if (typeof button.label !== 'undefined') {
        button.label = label;
    }

    if (typeof button.link !== 'undefined') {
        button.link = link;
        return true;
    }

    if (typeof button.onClick === 'function') {
        button.onClick(() => wixLocation.to(link));
        return true;
    }

    return false;
}

function logMissing(name, updated) {
    if (!updated) {
        console.warn(`[HOME] No matching element found for "${name}"`);
    }
}

/**
 * Fade-in the hero section elements on page load with a staggered delay.
 */
function _animateHero() {
    const heroTargets = ['#heroTitle', '#heroSubtitle', '#heroCtaButton'];
    heroTargets.forEach((selector, i) => {
        if (!getElement(selector.slice(1))) return;
        $w(selector).hide();
        setTimeout(() => {
            $w(selector).show('fade', { duration: 600, delay: i * 150 });
        }, 200 + i * 150);
    });
}

/**
 * Animate brand portfolio cards into view as the page loads.
 */
function _animateBrandCards() {
    const cards = ['#rayluxCard', '#vitaglowCard', '#zynthCard', '#bestbakeryCard', '#studioCard'];
    cards.forEach((selector, i) => {
        if (!getElement(selector.slice(1))) return;
        $w(selector).hide();
        setTimeout(() => {
            $w(selector).show('fade', { duration: 500, delay: i * 100 });
        }, 600 + i * 100);
    });
}

$w.onReady(function () {
    // Populate content
    logMissing('heroEyebrow', setText(ELEMENTS.heroEyebrow, HOME_CONTENT.heroEyebrow));
    logMissing('heroTitle', setText(ELEMENTS.heroTitle, HOME_CONTENT.heroTitle));
    logMissing('heroSubtitle', setText(ELEMENTS.heroSubtitle, HOME_CONTENT.heroSubtitle));
    logMissing('trustLine', setText(ELEMENTS.trustLine, HOME_CONTENT.trustLine));

    logMissing(
        'primaryCta',
        wireButton(ELEMENTS.primaryCta, HOME_CONTENT.primaryCtaLabel, HOME_CONTENT.primaryCtaLink)
    );

    logMissing(
        'secondaryCta',
        wireButton(ELEMENTS.secondaryCta, HOME_CONTENT.secondaryCtaLabel, HOME_CONTENT.secondaryCtaLink)
    );

    wireButton(ELEMENTS.shopNow, 'Shop Now', '/shop');
    wireButton(ELEMENTS.contactCta, 'Contact Us', '/contact');

    logMissing('sectionOneTitle', setText(ELEMENTS.sectionOneTitle, HOME_CONTENT.sectionOneTitle));
    logMissing('sectionOneBody', setText(ELEMENTS.sectionOneBody, HOME_CONTENT.sectionOneBody));

    logMissing('sectionTwoTitle', setText(ELEMENTS.sectionTwoTitle, HOME_CONTENT.sectionTwoTitle));
    logMissing('sectionTwoBody', setText(ELEMENTS.sectionTwoBody, HOME_CONTENT.sectionTwoBody));

    logMissing('capabilitiesTitle', setText(ELEMENTS.capabilitiesTitle, HOME_CONTENT.capabilitiesTitle));
    logMissing('capabilitiesHtml', setHtml(ELEMENTS.capabilitiesHtml, HOME_CONTENT.capabilitiesHtml));

    logMissing('philosophyTitle', setText(ELEMENTS.philosophyTitle, HOME_CONTENT.philosophyTitle));
    logMissing('philosophyBody', setText(ELEMENTS.philosophyBody, HOME_CONTENT.philosophyBody));

    // Animate hero and brand cards
    _animateHero();
    _animateBrandCards();
});
