function readMore() {
    let moreTxt = document.getElementById("more");
    let moreBtn = document.getElementById("moreBtn");
    

    if (moreTxt.style.display === "none") {
        moreTxt.style.display = "block";
        moreBtn.innerHTML = "Read less";
    } else {
        moreTxt.style.display = "none";
        moreBtn.textContent = "Read more";
    }
}

// FORM

function validateForm() {
    let form = document.forms["myForm"];

    let name = form["name"].value;
    let email = form["email"].value;

    let valid = true;

    if (name === "" || email === "") {
        alert("All fields must be filled out.")
        return false;
    }

    if (/\d/.test(name)) {
        alert("Name can't conatin numbers.")
        return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Please enter a valid email.")
        return false;
    }

    if (!checkbox) {
        alert("Must confirm before submitting form.")
        return false;
    }

    alert("Thank you for contacting us!");
    return valid;
}



