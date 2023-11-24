const buttons = document.querySelectorAll('.btn');
const cartIcon = document.getElementById('cartIcon');

cartIcon.addEventListener('click', async () => {
    try {
        const response = await fetch('/cart/fetch', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status == 200) {
            window.location.href = '/cart/fetch';
        }else if (response.status == 401) {
            window.location.href = '/auth/login';
        }
         else {
            console.error('Something error failed');
        }
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
});

buttons.forEach((button) => {
    button.addEventListener('click', async () => {
        const clickedButtonId = button.getAttribute('data-id');
        const data = {
            cartItem: clickedButtonId,
            quantity: 1
        };
   
        try {
            const response = await fetch('/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
    
            if (response.status === 200) {
                alert('added successful');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });
});
