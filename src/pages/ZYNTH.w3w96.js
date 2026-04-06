import wixLocation from 'wix-location';

$w.onReady(function () {
    _animateHero();
    _setupShopButton();
});

function _animateHero() {
    ['#zynthTitle', '#zynthTagline'].forEach((sel, i) => {
        if (!_exists(sel)) return;
        $w(sel).hide();
        setTimeout(() => $w(sel).show('fade', { duration: 600 }), 200 + i * 200);
    });
}

function _setupShopButton() {
    if (!_exists('#shopZynthButton')) return;
    $w('#shopZynthButton').onClick(() => wixLocation.to('/shop/zynth'));
}

function _exists(selector) {
    try { return Boolean($w(selector).type); } catch (_e) { return false; }
}
