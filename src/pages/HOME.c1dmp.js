import wixWindow from 'wix-window';

$w.onReady(function () {
    _animateHero();
    _setupBrandCards();
    _setupCtaButtons();
});

/**
 * Fade-in and slide-up the hero section elements on page load.
 */
function _animateHero() {
    const heroTargets = ['#heroTitle', '#heroSubtitle', '#heroCtaButton'];
    heroTargets.forEach((selector, i) => {
        if (!_exists(selector)) return;
        $w(selector).hide();
        setTimeout(() => {
            $w(selector).show('fade', { duration: 600, delay: i * 150 });
        }, 200 + i * 150);
    });
}

/**
 * Animate brand portfolio cards into view as the page loads.
 */
function _setupBrandCards() {
    const cards = ['#rayluxCard', '#vitaglowCard', '#zynthCard', '#bestbakeryCard', '#studioCard'];
    cards.forEach((selector, i) => {
        if (!_exists(selector)) return;
        $w(selector).hide();
        setTimeout(() => {
            $w(selector).show('fade', { duration: 500, delay: i * 100 });
        }, 600 + i * 100);
    });
}

/**
 * Wire up CTA buttons to navigate to the relevant pages.
 */
function _setupCtaButtons() {
    if (_exists('#shopNowButton')) {
        $w('#shopNowButton').onClick(() => {
            wixWindow.openLightbox('Store').catch(() => {});
        });
    }
    if (_exists('#contactCtaButton')) {
        $w('#contactCtaButton').onClick(() => {
            wixWindow.openLightbox('Contact').catch(() => {});
        });
    }
}

/**
 * Returns true if an element with the given selector exists on the current page.
 */
function _exists(selector) {
    try {
        return Boolean($w(selector).type);
    } catch (_e) {
        return false;
    }
}
