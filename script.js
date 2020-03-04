// Create cart namespace to hold all methods running inside it
const cart = {};

// Function that removes items from the cart based on a click event listener. This will also later show the remaining total price even after items have been removed
cart.removeItems = function () {
    const removeButton = document.getElementsByClassName("remove");

    for (let i = 0; i < removeButton.length; i++) {
        removeButton[i].addEventListener('click', function (e) {

            e.preventDefault();
            removeButtonClicked = e.target;

            removeButtonClicked.parentElement.parentElement.parentElement.remove();

            cart.updateTotal();
        })


        removeButton[i].addEventListener('keypress', function (e) {
            console.log(e);
                if (e.key == "Enter") {
                    e.preventDefault();

                    removeButtonClicked = e.target;

                    removeButtonClicked.parentElement.parentElement.parentElement.remove();

                    cart.updateTotal();
                }
            }

        )
    }
}

// Function containing math and document queries to update the DOM to show the quantities of items the user would like and how much the total cost would be
cart.updateTotal = function () {
    const itemContainer = document.getElementsByClassName("cartItems")[0];
    const itemRows = itemContainer.getElementsByClassName("item");
    let totalPrice = 0;
    for (let i = 0; i < itemRows.length; i++) {
        const itemRow = itemRows[i];
        const itemPrice = parseInt(itemRow.getElementsByClassName("price")[0].innerText.replace("$", "").replace(",", ""));

        const itemQty = itemRow.getElementsByClassName("itemQty")[0].value
        totalPrice = totalPrice + (itemPrice * itemQty);


        // function to update quantity in the input field
        function updateQty() {

            const qtyInput = document.getElementsByClassName("itemQty");
            for (let i = 0; i < qtyInput.length; i++) {
                const input = qtyInput[i];

                input.addEventListener("change", qtyUpdated);
            }

            // functions that alerts user to only put numbers over 0 and resets to the quantity of 1
            function qtyUpdated(e) {
                if (isNaN(e.target.value) || e.target.value < 0) {
                    e.target.value = 1;
                    alert("Please put any number above 0. If you wish to delete the item off your cart, simply put a '0' or press the remove button.");
                }
                // removes item from cart if quantity is 0
                else if (e.target.value == 0) {
                    e.target.parentElement.parentElement.parentElement.remove();
                }
                // rounds input number to the nearest whole number if a decimal number is placed
                else if (e.target.value % 1 != 0) {
                    e.target.value = parseInt(Math.round(e.target.value));
                }
                cart.updateTotal();
            }

        }
        updateQty()
    }

    // Updates total receipt to reflect the total price of items in the cart
    const totalCheckout = document.getElementsByClassName("subTotalPrice")[0].innerText = `$${totalPrice.toLocaleString()}`;
    document.getElementsByClassName("totalPrice")[0].innerText = totalCheckout;



    // Updates cart quantity at the top of the page to reflect how many items are in the cart
    const inputArray = []
    let qtyInput = document.getElementsByClassName("itemQty")
    for (let i = 0; i < qtyInput.length; i++) {

        const input = qtyInput[i];
        inputArray.push(parseInt(input.value));

        const inputSum = inputArray.reduce(function (a, b) {
            return a + b;
        }, 0);
        document.getElementById("quantity").innerText = inputSum;
    }
    // If there is nothing in the cart, make the cart quantity zero
    if (document.getElementsByClassName("cartItems")[0].children.length === 0) {
        document.getElementById("quantity").innerText = 0
    }
}

// function that handles the checkout button
cart.submitOrder = function () {

    function clickSubmit() {

        const submitClicked = document.getElementById("submit");
        submitClicked.addEventListener('click', function (e) {
            e.preventDefault();

            const itemContainer = document.getElementsByClassName("cartItems")[0];

            // if statement to send alerts if button is clicked. If there is nothing in the cart and user clicks checkout, then an alert will appear saying there is nothing in the cart. However, if there are items in the cart, the order will be placed and the cart will empty.
            if (itemContainer.childElementCount === 0) {
                alert("There is nothing in your cart!");
                console.log("There is nothing in your cart!");
            } else {
                itemContainer.innerHTML = "";

                alert("Your order has been placed!");
                console.log("Your order has been placed!");
                cart.updateTotal();
            }
        })
    }
    clickSubmit();
}

// start cart application
cart.init = function () {
    cart.removeItems();
    cart.updateTotal();
    cart.submitOrder();
};

// document ready function to make sure the DOM is loading
document.addEventListener("DOMContentLoaded", function () {
    cart.init();
});