import wixUsers from 'wix-users';
import wixStores from 'wix-stores';
import { exists } from 'public/utils';

$w.onReady(function () {
    // Bind logout handler exactly once to avoid duplicate calls on re-sync
    if (exists('#logoutButton')) {
        $w('#logoutButton').onClick(() => {
            wixUsers.logout().then(() => {
                _syncUserState();
            });
        });
    }

    _syncUserState();
    _syncCartBadge();
});

/**
 * Show/hide login vs. account nav items based on the current member session.
 * Expects optional nav elements: #loginButton, #accountButton, #logoutButton.
 */
function _syncUserState() {
    const loggedIn = wixUsers.currentUser.loggedIn;

    if (exists('#loginButton')) {
        loggedIn ? $w('#loginButton').hide() : $w('#loginButton').show();
    }
    if (exists('#accountButton')) {
        loggedIn ? $w('#accountButton').show() : $w('#accountButton').hide();
    }
    if (exists('#logoutButton')) {
        loggedIn ? $w('#logoutButton').show() : $w('#logoutButton').hide();
    }
}

/**
 * Update the cart icon badge with the current number of line items.
 * Expects an optional text element #cartBadge.
 */
function _syncCartBadge() {
    if (!exists('#cartBadge')) {
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
