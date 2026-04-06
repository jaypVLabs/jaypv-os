import wixLocation from 'wix-location';

$w.onReady(function () {
    _animateHero();
    _setupContactButton();
});

function _animateHero() {
    ['#studioTitle', '#studioTagline'].forEach((sel, i) => {
        if (!_exists(sel)) return;
        $w(sel).hide();
        setTimeout(() => $w(sel).show('fade', { duration: 600 }), 200 + i * 200);
    });
}

function _setupContactButton() {
    if (!_exists('#bookStudioButton')) return;
    $w('#bookStudioButton').onClick(() => wixLocation.to('/contact'));
}

function _exists(selector) {
    try { return Boolean($w(selector).type); } catch (_e) { return false; }
}
