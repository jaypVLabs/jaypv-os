import wixLocation from 'wix-location';

$w.onReady(function () {
    _displayOrderConfirmation();
    _setupContinueButton();
});

/**
 * Display the order number and confirmation message from the URL query params.
 */
function _displayOrderConfirmation() {
    const query = wixLocation.query || {};
    const orderId = query.orderId || query.order_id || '';

    if (_exists('#orderNumberText') && orderId) {
        $w('#orderNumberText').text = `Order #${orderId}`;
    }

    if (_exists('#confirmationMessage')) {
        $w('#confirmationMessage').text =
            'Your order has been received. You will receive an email confirmation shortly.';
    }

    if (_exists('#confirmationSection')) {
        $w('#confirmationSection').show('fade', { duration: 600 });
    }
}

/**
 * Navigate back to the home page when the continue button is clicked.
 */
function _setupContinueButton() {
    if (!_exists('#continueShoppingButton')) return;
    $w('#continueShoppingButton').onClick(() => {
        wixLocation.to('/');
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
