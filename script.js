function validateForm() {
    const form = document.getElementById("myForm");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const checkbox = document.getElementById("checkbox");

    const missingName = document.getElementById("missingName");
    const missingEmail = document.getElementById("missingEmail");
    const validEmail = document.getElementById("validEmail");
    const noCheck = document.getElementById("noCheck");


    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (name.value === "") {
            // clear old msg:
            missingName.textContent = "";
            const noName = document.createElement("p");
            noName.textContent = "Please fill out your name."
            missingName.append(noName);
            return false;
        }

        if (email.value === "") {
            missingEmail.textContent = "";
            const noEmail = document.createElement("p");
            noEmail.textContent = "Please fill out your email."
            missingEmail.append(noEmail);
            return false;
        }

        if (/\d/.test(name.value)) {
            missingName.textContent = "";

            const errorName = document.createElement("p");
            errorName.textContent = "Please enter a valid name."

            missingName.append(errorName);
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(email.value.trim())) {
            validEmail.textContent = "";
            missingEmail.textContent = "";

            const errorEmail = document.createElement("p");
            errorEmail.textContent = "Please enter a valid email."

            validEmail.append(errorEmail);
            return false;
        }

        if (!checkbox.checked) {
            noCheck.textContent = "";

            const checkError = document.createElement("p");
            checkError.textContent = "You must confirm before sumbitting.";
            noCheck.append(checkError)
            return false;
        }

        alert("Thank you for contacting us!");
        return true;
    })
    
}

validateForm();

