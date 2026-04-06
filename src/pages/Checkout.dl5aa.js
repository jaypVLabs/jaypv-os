import wixUsers from 'wix-users';

$w.onReady(function () {
    _prefillMemberDetails();
});

/**
 * Pre-fill checkout form fields with the current member's saved details.
 * Skips gracefully if the member is not logged in or elements are absent.
 */
async function _prefillMemberDetails() {
    if (!wixUsers.currentUser.loggedIn) return;

    try {
        const email = await wixUsers.currentUser.getEmail();
        if (_exists('#emailInput') && email) {
            $w('#emailInput').value = email;
        }

        const member = await wixUsers.currentUser.getMember({ fieldsets: ['FULL'] });
        if (!member) return;

        const contact = member.contactDetails || {};

        if (_exists('#firstNameInput') && contact.firstName) {
            $w('#firstNameInput').value = contact.firstName;
        }
        if (_exists('#lastNameInput') && contact.lastName) {
            $w('#lastNameInput').value = contact.lastName;
        }

        const address = (contact.addresses && contact.addresses[0]) || {};
        if (_exists('#addressInput') && address.addressLine) {
            $w('#addressInput').value = address.addressLine;
        }
        if (_exists('#cityInput') && address.city) {
            $w('#cityInput').value = address.city;
        }
        if (_exists('#stateInput') && address.subdivision) {
            $w('#stateInput').value = address.subdivision;
        }
        if (_exists('#zipInput') && address.postalCode) {
            $w('#zipInput').value = address.postalCode;
        }
        if (_exists('#countryInput') && address.country) {
            $w('#countryInput').value = address.country;
        }

        const phone = contact.phones && contact.phones[0];
        if (_exists('#phoneInput') && phone) {
            $w('#phoneInput').value = phone;
        }
    } catch (_err) {
        // Pre-fill is best-effort; do not block checkout on failure
    }
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
