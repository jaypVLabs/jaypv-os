$w.onReady(function () {
    _setupBrandFilter();
    _animateBrandCards();
});

/**
 * Wire up brand filter tabs so clicking a tab shows/hides matching cards.
 */
function _setupBrandFilter() {
    const brands = ['raylux', 'vitaglow', 'zynth', 'bestbakery', 'studio'];

    brands.forEach((brand) => {
        const tabSel = `#${brand}Tab`;
        if (!_exists(tabSel)) return;

        $w(tabSel).onClick(() => {
            // Show all cards first, then hide non-matching ones
            brands.forEach((b) => {
                const sel = `#${b}Card`;
                if (_exists(sel)) $w(sel).show();
            });
            brands.filter((b) => b !== brand).forEach((b) => {
                const sel = `#${b}Card`;
                if (_exists(sel)) $w(sel).hide('fade', { duration: 200 });
            });
        });
    });

    // Wire up the "All" tab if it exists
    if (_exists('#allTab')) {
        $w('#allTab').onClick(() => {
            brands.forEach((b) => {
                const sel = `#${b}Card`;
                if (_exists(sel)) $w(sel).show('fade', { duration: 200 });
            });
        });
    }
}

/**
 * Sequentially fade in brand cards on page load.
 */
function _animateBrandCards() {
    const cards = ['#rayluxCard', '#vitaglowCard', '#zynthCard', '#bestbakeryCard', '#studioCard'];
    cards.forEach((selector, i) => {
        if (!_exists(selector)) return;
        $w(selector).hide();
        setTimeout(() => {
            $w(selector).show('fade', { duration: 400 });
        }, 200 + i * 120);
    });
}

/**
 * Returns true if an element with the given selector exists on the current page.
 */
function _exists(selector) {
    try { return Boolean($w(selector).type); } catch (_e) { return false; }
}
