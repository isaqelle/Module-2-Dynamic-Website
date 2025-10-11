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

        // clear old msg:
        missingName.textContent = "";
        missingEmail.textContent = "";
        validEmail.textContent = "";
        noCheck.textContent = "";

        // Validate name
        if (name.value === "") {
            const noName = document.createElement("p");
            noName.textContent = "Please fill out your name."
            missingName.append(noName);
            return false;

        } else if (/\d/.test(name.value)) {
            const errorName = document.createElement("p");
            errorName.textContent = "Please enter a valid name."

            missingName.append(errorName);
            return false;
        }

        // Validate email
        if (email.value.trim() === "") {
            const noEmail = document.createElement("p");
            noEmail.textContent = "Please fill out your email."
            missingEmail.append(noEmail);
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email.value.trim())) {
            const errorEmail = document.createElement("p");
            errorEmail.textContent = "Please enter a valid email."

            validEmail.append(errorEmail);
            return false;
        }

        // Checkbox validatiom
        if (!checkbox.checked) {
            const checkError = document.createElement("p");
            checkError.textContent = "You must confirm before sumbitting.";
            noCheck.append(checkError)
            return false;
        }

        else {
            alert("Thank you for contacting us!");
        return true;
        }
        
    })
    
}

validateForm();

