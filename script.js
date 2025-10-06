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
    let name = form["name"].value;
    let email = form["email"].value;
}