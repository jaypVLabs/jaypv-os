// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction

$w.onReady(function () {

	$w('#enterButton').onClick(async () => {
    // Clear previous error messages
    $w('#errorText').text = '';
    
    // Get input values
    const name = $w('#nameInput').value.trim();
    const email = $w('#emailInput').value.trim();
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
    
    // Disable button and show loading
    $w('#enterButton').label = 'Signing Up...';
    $w('#enterButton').disable();
    
    try {
        // Create member using backend function
        await myCreateMemberFunction({
            member: {
                contact: {
                    firstName,
                    lastName,
                    emails: [email]
                },
                loginEmail: email,
                profile: {
                    nickname: firstName,
                    title: 'JayPVentures Member'
                },
                password: password
            }
        });
        $w('#successText').text = 'Signup successful! Please check your email to verify your account.';
        $w('#signupForm').hide('fade');
    } catch (error) {
        $w('#errorText').text = 'Signup failed. Please try again or use a different email.';
    } finally {
        $w('#enterButton').label = 'Enter';
        $w('#enterButton').enable();
    }
});
// Write your Javascript code here using the Velo framework API

	// Print hello world:
	// console.log("Hello world!");

	// Call functions on page elements, e.g.:
	// $w("#button1").label = "Click me!";

	// Click "Run", or Preview your site, to execute your code

});