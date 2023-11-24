const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;
const buttons = document.querySelectorAll('.btn');
const cartIcon = document.getElementById('cartIcon');

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage() {
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);


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
        } else if (response.status == 401) {
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

let quantitybtn = 1;

document.getElementById("data-id").addEventListener("input", handleValueChange);

function handleValueChange() {
    var inputValue = document.getElementById("data-id").value;
    quantitybtn = inputValue;
}

buttons.forEach((button) => {
    button.addEventListener('click', async () => {
        const clickedButtonId = button.getAttribute('data-id');

        try {
            handleValueChange(); // Wait for handleValueChange to complete

            const data = {
                cartItem: clickedButtonId,
                quantity: quantitybtn
            };

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
                console.error('Adding to cart failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });
});

