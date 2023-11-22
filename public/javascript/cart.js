const quantityBtn = document.getElementById('data-id');

quantityBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const id = e.target.getAttribute('data-id');
    const quantity = e.target.getAttribute('data-quantity');
    console.log(id, quantity);    
});
