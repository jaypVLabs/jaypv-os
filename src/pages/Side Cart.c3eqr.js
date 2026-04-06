import wixStores from 'wix-stores';
import { formatCurrency } from 'public/utils';

$w.onReady(function () {
    _loadSideCart();
    _setupCloseButton();
});

/**
 * Populate the side cart flyout with current cart line items.
 */
function _loadSideCart() {
    wixStores.getCart()
        .then((cart) => {
            const items = cart.lineItems || [];

            if (_exists('#sideCartEmpty')) {
                items.length === 0
                    ? $w('#sideCartEmpty').show()
                    : $w('#sideCartEmpty').hide();
            }

            if (!_exists('#sideCartRepeater')) return;

            $w('#sideCartRepeater').data = items.map((item) => ({
                _id: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: (item.mediaItem && item.mediaItem.src) || '',
            }));

            $w('#sideCartRepeater').onItemReady(($item, itemData) => {
                if (_exists('#sideCartItemName')) $item('#sideCartItemName').text = itemData.name;
                if (_exists('#sideCartItemQty')) {
                    $item('#sideCartItemQty').text = `x${itemData.quantity}`;
                }
                if (_exists('#sideCartItemPrice')) {
                    $item('#sideCartItemPrice').text = formatCurrency(itemData.price * itemData.quantity);
                }
                if (_exists('#sideCartItemImage') && itemData.image) {
                    $item('#sideCartItemImage').src = itemData.image;
                }
                if (_exists('#sideCartRemoveButton')) {
                    $item('#sideCartRemoveButton').onClick(() => {
                        wixStores.cart.removeItem(itemData._id)
                            .then(() => _loadSideCart())
                            .catch(() => {});
                    });
                }
            });

            if (_exists('#sideCartSubtotal') && cart.totals) {
                $w('#sideCartSubtotal').text = formatCurrency(cart.totals.subtotal);
            }
        })
        .catch(() => {});
}

/**
 * Close the side cart when the close button is clicked.
 */
function _setupCloseButton() {
    if (!_exists('#sideCartClose')) return;
    $w('#sideCartClose').onClick(() => {
        if (_exists('#sideCartContainer')) {
            $w('#sideCartContainer').hide('slide', { direction: 'right', duration: 300 });
        }
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
