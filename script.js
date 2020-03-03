// Create cart namespace to hold all methods
const cart = {};

// Collect user input
cart.collectInfo = function () {

    const selectedProducts = [{
            product: "Jet Ski",
            price: 1500,
            qty: 1
        },
        {
            product: "Bubble Wrap",
            price: 440,
            qty: 1
        },
        {
            product: "Crock-Pot",
            price: 55,
            qty: 1
        }
    ]
};


// Function that removes items from the carts based on a click event listener. This will also later show the remaining total price even after items have been removed
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
    document.getElementsByClassName("updateQty").addEventListener("click", function (e) {
        e.preventDefault();

    })
}

// Function containing math and document queries to update the DOM to show the quantities of items the user would like and how much the total cost would be
cart.updateTotal = function () {
    const itemContainer = document.getElementsByClassName("cartItems")[0]

    const itemRows = itemContainer.getElementsByClassName("item")

    for (let i = 0; i < itemRows.length; i++) {
        const itemRow = itemRows[i];
        const itemPrice = parseInt(itemRow.getElementsByClassName("price")[0].innerText.replace('$','').replace(',',''));
        const itemQuantity = itemRow.getElementsByClassName("itemQty")[0].value

        
        const totalPrice = itemPrice * itemQuantity
        console.log(totalPrice)
    }

}


// start cart application
cart.init = function () {
    cart.collectInfo();
    cart.updateTotal();
    cart.removeItems();
};
// document ready function
document.addEventListener("DOMContentLoaded", function () {
    cart.init();
});