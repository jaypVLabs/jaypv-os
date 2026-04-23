import { sendContactEmail } from 'backend/contact';

$w.onReady(function () {
    $w('#submitButton').onClick(async () => {
        // Clear previous feedback
        $w('#errorText').text = '';
        $w('#successText').text = '';

        const name    = $w('#nameInput').value.trim();
        const email   = $w('#emailInput').value.trim();
        const subject = _exists('#subjectInput') ? $w('#subjectInput').value.trim() : '';
        const message = $w('#messageInput').value.trim();

        // Validation
        if (!name || !email || !message) {
            $w('#errorText').text = 'Please fill in your name, email, and message.';
            return;
        }
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            $w('#errorText').text = 'Please enter a valid email address.';
            return;
        }

        // Disable button while sending
        $w('#submitButton').label = 'Sending…';
        $w('#submitButton').disable();

        try {
            await sendContactEmail({ name, email, subject, message });
            $w('#successText').text = "Thank you! We'll be in touch shortly.";
            $w('#contactForm').reset();
        } catch (_err) {
            $w('#errorText').text = 'Something went wrong. Please try again or email us directly.';
        } finally {
            $w('#submitButton').label = 'Send Message';
            $w('#submitButton').enable();
        }
    });
});

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
