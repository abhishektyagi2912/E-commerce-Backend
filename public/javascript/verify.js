document.addEventListener('DOMContentLoaded', function () {
    let countdown = 5;

    function updateCountdown() {
        document.getElementById('countdown').textContent = countdown;
        countdown--;

        if (countdown < 0) {
            window.location.href = '/'; // Redirect to the home page
        } else {
            setTimeout(updateCountdown, 1000);
        }
    }

    // Start the countdown
    updateCountdown();
});
