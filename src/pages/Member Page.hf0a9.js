import wixUsers from 'wix-users';
import wixLocation from 'wix-location';
import { getMemberOrders } from 'backend/orders';

$w.onReady(async function () {
    if (!wixUsers.currentUser.loggedIn) {
        wixLocation.to('/login');
        return;
    }

    await _loadMemberProfile();
    await _loadOrderHistory();
    _setupProfileEdit();
});

/**
 * Populate profile fields with the current member's details.
 */
async function _loadMemberProfile() {
    try {
        const member = await wixUsers.currentUser.getMember({ fieldsets: ['FULL'] });
        if (!member) return;

        const email = await wixUsers.currentUser.getEmail();
        const contact = member.contactDetails || {};

        if (_exists('#memberNameText')) {
            const full = [contact.firstName, contact.lastName].filter(Boolean).join(' ');
            $w('#memberNameText').text = full || 'Member';
        }
        if (_exists('#memberEmailText') && email) {
            $w('#memberEmailText').text = email;
        }

        if (_exists('#editFirstName') && contact.firstName) {
            $w('#editFirstName').value = contact.firstName;
        }
        if (_exists('#editLastName') && contact.lastName) {
            $w('#editLastName').value = contact.lastName;
        }
    } catch (_err) {
        // Profile load failure is non-fatal
    }
}

/**
 * Load and render the member's order history.
 */
async function _loadOrderHistory() {
    if (!_exists('#ordersRepeater')) return;

    try {
        const orders = await getMemberOrders();

        if (!orders || orders.length === 0) {
            if (_exists('#noOrdersMessage')) $w('#noOrdersMessage').show();
            return;
        }

        if (_exists('#noOrdersMessage')) $w('#noOrdersMessage').hide();

        $w('#ordersRepeater').data = orders.map((order) => ({
            _id: order._id,
            number: order.number || order._id,
            date: order._createdDate
                ? new Date(order._createdDate).toLocaleDateString()
                : '',
            total: order.totals ? `$${order.totals.total.toFixed(2)}` : '',
            status: order.fulfillmentStatus || order.paymentStatus || 'Processing',
        }));

        $w('#ordersRepeater').onItemReady(($item, itemData) => {
            const itemExists = (selector) => {
                try { return Boolean($item(selector).type); } catch (_e) { return false; }
            };

            if (itemExists('#orderNumber')) $item('#orderNumber').text = `#${itemData.number}`;
            if (itemExists('#orderDate')) $item('#orderDate').text = itemData.date;
            if (itemExists('#orderTotal')) $item('#orderTotal').text = itemData.total;
            if (itemExists('#orderStatus')) $item('#orderStatus').text = itemData.status;
        });
    } catch (_err) {
        if (_exists('#ordersError')) {
            $w('#ordersError').text = 'Could not load order history. Please try again.';
            $w('#ordersError').show();
        }
    }
}

/**
 * Wire up the profile edit form save button.
 */
function _setupProfileEdit() {
    if (!_exists('#saveProfileButton')) return;

    $w('#saveProfileButton').onClick(async () => {
        $w('#saveProfileButton').disable();
        $w('#saveProfileButton').label = 'Saving…';

        try {
            const firstName = _exists('#editFirstName') ? $w('#editFirstName').value.trim() : '';
            const lastName  = _exists('#editLastName')  ? $w('#editLastName').value.trim()  : '';

            await wixUsers.currentUser.updateMember({
                contactDetails: { firstName, lastName },
            });

            if (_exists('#profileSaveSuccess')) {
                $w('#profileSaveSuccess').text = 'Profile updated successfully.';
                $w('#profileSaveSuccess').show();
            }

            if (_exists('#memberNameText')) {
                $w('#memberNameText').text = [firstName, lastName].filter(Boolean).join(' ') || 'Member';
            }
        } catch (_err) {
            if (_exists('#profileSaveError')) {
                $w('#profileSaveError').text = 'Could not save profile. Please try again.';
                $w('#profileSaveError').show();
            }
        } finally {
            $w('#saveProfileButton').label = 'Save Changes';
            $w('#saveProfileButton').enable();
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
