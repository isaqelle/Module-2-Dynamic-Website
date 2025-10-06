// to validate the form section, I create functions.
// You must have a name for the form, in my cast it's "myForm"
// Fist name of form, the the section in the form you want to validate
function validateForm() {

    // Declearing name of my form
    let form = document.forms["myForm"];

    // Decleating content in form
    let fname = form["fname"].value;
    let lname = form["lname"].value;
    let email = form["email"].value;
    let phoneNbr = form["phoneNbr"].value;

    if (fname === "" | lname === "" | email === "" | phoneNbr === "") {
        alert("All fields must be filled out");
        return false;
    }

    // If email is not valid:
    if (!validateEmail(email)) {
        alert("Please enter a valid email")
        return false;
    }

    if (!validatePhoneNbr(phoneNbr)) {
        alert("Please enter a valid phonenumber")
        return false;
    }

}

// validate email function

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

// validate phonenumber function

function validatePhoneNbr(phoneNbr) {
    return /^\d{10}$/.test(phoneNbr)
}