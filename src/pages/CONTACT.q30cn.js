import { sendContactEmail } from 'backend/contact';

$w.onReady(function () {
    $w('#submitButton').onClick(async () => {
        // Clear previous feedback
        $w('#errorText').text = '';
        $w('#successText').text = '';

        const name    = $w('#nameInput').value.trim();
        const email   = $w('#emailInput').value.trim();
        const subject = $w('#subjectInput') && $w('#subjectInput').value
            ? $w('#subjectInput').value.trim()
            : '';
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
        $w('#submitButton').label = 'Sending\u2026';
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
