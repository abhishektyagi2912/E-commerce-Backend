function calculateExpectedDeliveryDate() {
    // Get today's date
    const today = new Date();

    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 2);

    // Format the date as "DD.MM.YYYY"
    const formattedDeliveryDate = `${deliveryDate.getDate()}.${deliveryDate.getMonth() + 1}.${deliveryDate.getFullYear()}`;

    document.getElementById('expectedDeliveryDate').textContent = formattedDeliveryDate;
}

document.addEventListener("DOMContentLoaded", function () {
    // Get all the quantity input elements
    var quantityInputs = document.querySelectorAll('input[name="quantity"]');

    // Attach event listeners to each quantity input
    quantityInputs.forEach(function (input) {
        input.addEventListener("change", updateCartItem);
    });

    // Function to update the cart item when quantity changes
    function updateCartItem(event) {
        // Get the parent row of the clicked input
        var row = event.target.closest('.row');

        // Get the initial price, quantity, and total price elements within the row
        var initialPrice = parseFloat(row.querySelector('.text-start strong').textContent.slice(1));
        var quantity = parseInt(event.target.value);
        var totalPriceElement = row.querySelector('.list-group-item:first-child span');

        // Update the total price for the item
        var totalPrice = initialPrice * quantity;
        totalPriceElement.textContent = '$' + totalPrice.toFixed(2);

        // Recalculate the total amount (including VAT)
        calculateTotalAmount();
    }

    // Function to calculate the total amount (including VAT)
    function calculateTotalAmount() {
        var totalAmountElement = document.querySelector('.list-group-item:last-child div');
        var totalPriceElements = document.querySelectorAll('.list-group-item:first-child span');
        var totalAmount = 0;

        totalPriceElements.forEach(function (element) {
            totalAmount += parseFloat(element.textContent.slice(1));
        });

        totalAmountElement.textContent = '$' + totalAmount.toFixed(2);
    }
});
