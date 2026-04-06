import wixUsers from 'wix-users';
import wixStores from 'wix-stores';

$w.onReady(function () {
    _syncUserState();
    _syncCartBadge();
});

/**
 * Returns true if the element selector resolves to a real page element.
 * In Wix Velo, $w() always returns a selector object; check .type to confirm
 * that the element actually exists on the current page.
 */
function _exists(selector) {
    try {
        return Boolean($w(selector).type);
    } catch (_e) {
        return false;
    }
}

/**
 * Show/hide login vs. account nav items based on the current member session.
 * Expects optional nav elements: #loginButton, #accountButton, #logoutButton.
 */
function _syncUserState() {
    const loggedIn = wixUsers.currentUser.loggedIn;

    if (_exists('#loginButton')) {
        loggedIn ? $w('#loginButton').hide() : $w('#loginButton').show();
    }
    if (_exists('#accountButton')) {
        loggedIn ? $w('#accountButton').show() : $w('#accountButton').hide();
    }
    if (_exists('#logoutButton')) {
        if (loggedIn) {
            $w('#logoutButton').show();
            $w('#logoutButton').onClick(() => {
                wixUsers.logout().then(() => {
                    _syncUserState();
                });
            });
        } else {
            $w('#logoutButton').hide();
        }
    }
}

/**
 * Update the cart icon badge with the current number of line items.
 * Expects an optional text element #cartBadge.
 */
function _syncCartBadge() {
    if (!_exists('#cartBadge')) {
        return;
    }

    wixStores.getCart()
        .then((cart) => {
            const count = (cart.lineItems || []).reduce(
                (sum, item) => sum + (Number(item.quantity) || 0),
                0
            );
            $w('#cartBadge').text = count > 0 ? String(count) : '';
            if (count > 0) {
                $w('#cartBadge').expand();
            } else {
                $w('#cartBadge').collapse();
            }
        })
        .catch(() => {
            // Cart unavailable (e.g. no Wix Stores app) — silently ignore
        });
}
