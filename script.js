// Create cart namespace to hold all methods running inside it
const cart = {};


// Function that removes items from the cart based on a click event listener. This will also later show the remaining total price even after items have been removed
cart.removeItems = function () {
    const removeButton = document.getElementsByClassName("remove");

    for (let i = 0; i < removeButton.length; i++) {

        removeButton[i].addEventListener('click', function (e) {
            const removeButtonClicked = e.target;

            removeButtonClicked.parentElement.parentElement.parentElement.remove()

            cart.updateTotal();
        })
    }
}

cart.updateQuantity = function () {
    qtyInput = document.getElementsByClassName("itemQty")

    for (let i = 0; i < qtyInput.length; i++){
        const input = qtyInput[i].value
        console.log(input)
        input.addEventListener('change', inputUpdated())
    }

    function inputUpdated(e){
        console.log(e.target)
    }

}

// Function containing math and document queries to update the DOM to show the quantities of items the user would like and how much the total cost would be
cart.updateTotal = function () {
    const itemContainer = document.getElementsByClassName("cartItems")[0]

    const itemRows = itemContainer.getElementsByClassName("item")
    let totalPrice = 0
    for (let i = 0; i < itemRows.length; i++) {
        const itemRow = itemRows[i];
        const itemPrice = parseInt(itemRow.getElementsByClassName("price")[0].innerText.replace('$', '').replace(',', ''));
        const itemQty = itemRow.getElementsByClassName("itemQty")[0].value


        totalPrice = totalPrice + (itemPrice * itemQty);

    }

    const totalCheckout = document.getElementsByClassName("subTotalPrice")[0].innerText = `$${totalPrice.toLocaleString()}`;

    document.getElementsByClassName("totalPrice")[0].innerText = totalCheckout

    console.log(totalCheckout)
}


// start cart application
cart.init = function () {
    cart.updateQuantity();
    cart.updateTotal();
    cart.removeItems();
};

// document ready function to make sure the DOM is loading
document.addEventListener("DOMContentLoaded", function () {
    cart.init();
});