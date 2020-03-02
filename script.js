// Create cart namespace to hold all methods
const cart = {};

// Collect user input
app.collectInfo = function () {};

// Make AJAX request with user inputted data
app.getInfo = function () {};

// Display data on the page
app.displayInfo = function () {};

// start cart application
app.init = function () {
    app.collectInfo();

};
// document ready function
document.addEventListener("DOMContentLoaded", function () {
    app.init();
});