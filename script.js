function validateForm() {
    const form = document.getElementById("myFrom");
    const name = document.getElementById("name");
    const email = document.getElementById("email");

    const missingName = document.getElementById("missingName");

    let valid = true;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (name === "" || email === "") {
            // clear old msg:
            missingName.textContent = "";

            const errorTxt = document.createElement("p");
            errorTxt.textContent = "Can't add an empty item.";
            errorTxt.style.color = "red";

            missingName.append(errorTxt);
        // alert("All fields must be filled out.")
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
    })
    
}



