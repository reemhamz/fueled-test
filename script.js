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



// Function containing math and document queries to update the DOM to show the quantities of items the user would like and how much the total cost would be
cart.updateTotal = function () {
    const itemContainer = document.getElementsByClassName("cartItems")[0]
    const itemRows = itemContainer.getElementsByClassName("item")
    let totalPrice = 0
    for (let i = 0; i < itemRows.length; i++) {
        const itemRow = itemRows[i];
        const itemPrice = parseInt(itemRow.getElementsByClassName("price")[0].innerText.replace('$', '').replace(',', ''));
        let itemQty = itemRow.getElementsByClassName("itemQty")[0].value
        totalPrice = totalPrice + (itemPrice * itemQty);


        // function to update quantity in the input field
        function updateQty() {
            const inputArray = []
            const qtyInput = document.getElementsByClassName("itemQty")
            for (let i = 0; i < qtyInput.length; i++) {

                // Updates cart quantity at the top of the page to reflect how many items are in the cart
                const input = qtyInput[i]
                inputArray.push(parseInt(input.value))

                const inputSum = inputArray.reduce(function (a, b) {
                    return a + b
                }, 0)
                
                if (totalPrice == 0) {
                    itemQty = 0;
                    inputSum = 0;
                }
                document.getElementById("quantity").innerText = inputSum;


                input.addEventListener('change', qtyUpdated)
            }
            // alerts user to only put numbers over 0 and resets to the quantity of 1
            function qtyUpdated(e) {
                if (isNaN(e.target.value) || e.target.value < 0) {
                    e.target.value = 1;
                    alert('Please put any number above 0')
                }
                // removes item if quantity is 0
                else if (e.target.value == 0) {
                    e.target.parentElement.parentElement.parentElement.remove()
                }
                cart.updateTotal();
            }
        }
        updateQty()
    }
    const totalCheckout = document.getElementsByClassName("subTotalPrice")[0].innerText = `$${totalPrice.toLocaleString()}`;
    document.getElementsByClassName("totalPrice")[0].innerText = totalCheckout



}

cart.submitOrder = function () {
    const cartTotal = document.getElementById("quantity").innerText

    function clickSubmit() {
        const submitButton = document.getElementById("submit").addEventListener('click', function (e) {
            e.preventDefault();
            if (cartTotal <= 0) {
                alert("There is nothing in your cart!")
            }
        })

    }
    clickSubmit();
}

// start cart application
cart.init = function () {
    cart.updateTotal();
    cart.removeItems();
    cart.submitOrder();
};

// document ready function to make sure the DOM is loading
document.addEventListener("DOMContentLoaded", function () {
    cart.init();
});