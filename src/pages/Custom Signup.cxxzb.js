import { createMember } from 'backend/members';

$w.onReady(function () {
    $w('#enterButton').onClick(async () => {
        // Clear previous error messages
        $w('#errorText').text = '';

        // Get input values
        const name     = $w('#nameInput').value.trim();
        const email    = $w('#emailInput').value.trim();
        const password = $w('#passwordInput').value;

        // Basic validation
        if (!name || !email || !password) {
            $w('#errorText').text = 'Please fill in all fields.';
            return;
        }
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            $w('#errorText').text = 'Please enter a valid email address.';
            return;
        }
        if (password.length < 6) {
            $w('#errorText').text = 'Password must be at least 6 characters.';
            return;
        }

        // Split name into first and last
        const [firstName, ...rest] = name.split(' ');
        const lastName = rest.join(' ');

        // Disable button and show loading state
        $w('#enterButton').label = 'Signing Up...';
        $w('#enterButton').disable();

        try {
            await createMember({ email, password, firstName, lastName });
            $w('#successText').text = 'Signup successful! Please check your email to verify your account.';
            $w('#signupForm').hide('fade');
        } catch (_error) {
            $w('#errorText').text = 'Signup failed. Please try again or use a different email.';
        } finally {
            $w('#enterButton').label = 'Enter';
            $w('#enterButton').enable();
        }
    });
});
