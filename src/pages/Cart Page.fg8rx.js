import wixStores from 'wix-stores';
import wixLocation from 'wix-location';
import { formatCurrency } from 'public/utils';

$w.onReady(function () {
    _loadCart();
    _setupCheckoutButton();
    _setupContinueShoppingButton();
});

/**
 * Load current cart and render line items into the repeater.
 */
function _loadCart() {
    wixStores.getCart()
        .then((cart) => {
            const items = cart.lineItems || [];

            if (items.length === 0) {
                if (_exists('#emptyCartMessage')) $w('#emptyCartMessage').show();
                if (_exists('#cartContents')) $w('#cartContents').hide();
                if (_exists('#checkoutButton')) $w('#checkoutButton').disable();
                return;
            }

            if (_exists('#emptyCartMessage')) $w('#emptyCartMessage').hide();
            if (_exists('#cartContents')) $w('#cartContents').show();

            if (_exists('#cartRepeater')) {
                // Register onItemReady BEFORE assigning data so every item is caught
                $w('#cartRepeater').onItemReady(($item, itemData) => {
                    try { $item('#itemName').text = itemData.name; } catch (_e) {}
                    try { $item('#itemPrice').text = formatCurrency(itemData.price); } catch (_e) {}
                    try { $item('#itemQuantity').value = String(itemData.quantity); } catch (_e) {}
                    try {
                        if (itemData.image) $item('#itemImage').src = itemData.image;
                    } catch (_e) {}

                    try {
                        $item('#removeItemButton').onClick(() => _removeItem(itemData._id));
                    } catch (_e) {}

                    try {
                        $item('#itemQuantity').onChange((event) => {
                            const qty = parseInt(event.target.value, 10);
                            if (qty > 0) _updateQuantity(itemData._id, qty);
                        });
                    } catch (_e) {}
                });

                $w('#cartRepeater').data = items.map((item) => ({
                    _id: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: (item.mediaItem && item.mediaItem.src) || '',
                }));
            }

            _updateTotals(cart);
        })
        .catch(() => {
            if (_exists('#cartError')) {
                $w('#cartError').text = 'Could not load cart. Please refresh the page.';
                $w('#cartError').show();
            }
        });
}

/**
 * Update the displayed cart total.
 */
function _updateTotals(cart) {
    if (!_exists('#cartTotal')) return;
    const subtotal = (cart.totals && cart.totals.subtotal) || 0;
    $w('#cartTotal').text = formatCurrency(subtotal);
}

/**
 * Remove a line item from the cart then refresh.
 */
function _removeItem(itemId) {
    wixStores.cart.removeItem(itemId)
        .then(() => _loadCart())
        .catch(() => {});
}

/**
 * Update the quantity of a cart line item then refresh totals.
 */
function _updateQuantity(itemId, quantity) {
    wixStores.cart.updateLineItemQuantity([{ _id: itemId, quantity }])
        .then(() => _loadCart())
        .catch(() => {});
}

/**
 * Navigate to Wix Stores checkout.
 */
function _setupCheckoutButton() {
    if (!_exists('#checkoutButton')) return;
    $w('#checkoutButton').onClick(() => {
        wixLocation.to('/checkout');
    });
}

/**
 * Navigate back to the store.
 */
function _setupContinueShoppingButton() {
    if (!_exists('#continueShoppingButton')) return;
    $w('#continueShoppingButton').onClick(() => {
        wixLocation.to('/shop');
    });
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
