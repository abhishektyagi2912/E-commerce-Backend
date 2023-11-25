async function updateQuantity(input) {
    var itemId = input.getAttribute("data-id");
    var quantity = input.value;

    cartdata = {
        quantity: quantity
    };

    var updateLink = "/cart/update/" + itemId;

    try {
        const response = await fetch(updateLink, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(cartdata)
        });

        if (response.status === 200) {
            location.reload();
        } else {
            console.error('Update failed');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

const removeButtons = document.querySelectorAll('.remove-btn');

removeButtons.forEach(button => {
    button.addEventListener('click', function () {
        const itemId = this.getAttribute('data-id');
        deleteItem(itemId);
    });
});

async function deleteItem(itemId) {
    try {
        const response = await fetch(`/cart/delete/${itemId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        });

        if (response.ok) {
            location.reload();
        } else {
            console.error('Delete failed:', response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}