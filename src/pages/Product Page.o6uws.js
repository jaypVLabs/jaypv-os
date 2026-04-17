import wixStores from 'wix-stores';

let _currentProduct = null;

$w.onReady(function () {
    _initProduct();
    _setupQuantityControls();
    _setupAddToCart();
});

/**
 * Load the current product data and populate any variant dropdowns.
 */
function _initProduct() {
    if (!_exists('#productPage1')) return;

    const product = $w('#productPage1').product;
    if (!product) return;
    _currentProduct = product;

    if (_exists('#variantDropdown') && product.productOptions) {
        const colorOption = product.productOptions.find(o => o.name.toLowerCase() === 'color');
        if (colorOption) {
            $w('#variantDropdown').options = colorOption.choices.map(c => ({
                label: c.value,
                value: c.value,
            }));
            if (colorOption.choices.length > 0) {
                $w('#variantDropdown').value = colorOption.choices[0].value;
            }
        }
    }
}

/**
 * Wire up + / - quantity buttons and enforce min = 1.
 */
function _setupQuantityControls() {
    if (!_exists('#quantityInput')) return;
    $w('#quantityInput').value = '1';

    if (_exists('#qtyDecrease')) {
        $w('#qtyDecrease').onClick(() => {
            const current = parseInt($w('#quantityInput').value, 10) || 1;
            if (current > 1) $w('#quantityInput').value = String(current - 1);
        });
    }

    if (_exists('#qtyIncrease')) {
        $w('#qtyIncrease').onClick(() => {
            const current = parseInt($w('#quantityInput').value, 10) || 1;
            $w('#quantityInput').value = String(current + 1);
        });
    }
}

/**
 * Add the selected quantity to the cart via Wix Stores.
 */
function _setupAddToCart() {
    if (!_exists('#addToCartButton') || !_exists('#productPage1')) return;

    $w('#addToCartButton').onClick(async () => {
        $w('#addToCartButton').disable();
        $w('#addToCartButton').label = 'Adding…';

        const quantity = parseInt($w('#quantityInput').value, 10) || 1;
        const product = _currentProduct || $w('#productPage1').product;
        if (!product) {
            $w('#addToCartButton').enable();
            $w('#addToCartButton').label = 'Add to Cart';
            return;
        }

        // Build options from variant dropdown if present
        const options = {};
        if (_exists('#variantDropdown') && product.productOptions) {
            const colorOption = product.productOptions.find(o => o.name.toLowerCase() === 'color');
            if (colorOption) {
                const selectedValue = $w('#variantDropdown').value;
                if (selectedValue) options[colorOption.name] = selectedValue;
            }
        }

        try {
            await wixStores.cart.addToCart(product._id, quantity, { options });
            $w('#addToCartButton').label = 'Added!';
            setTimeout(() => {
                $w('#addToCartButton').label = 'Add to Cart';
                $w('#addToCartButton').enable();
            }, 1500);
        } catch (_err) {
            $w('#addToCartButton').label = 'Add to Cart';
            $w('#addToCartButton').enable();
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
