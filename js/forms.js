// (1) Variablen initialisieren
const form_group = document.getElementById("form-group");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const emailField = document.getElementById("e-mail");
const message = document.getElementById("message");
const submit = document.getElementById("submit");
const errorMessage = document.getElementById("error-message");

function isValidEmail(email) {
    return email.includes('@');
}

function emailforms() {
    let isValid = true;
    errorMessage.innerHTML = ""; // Leert die Fehlermeldungen

    // Überprüfung der E-Mail-Adresse
    if (!isValidEmail(emailField.value)) {
        errorMessage.innerHTML += 'Gib eine gültige E-Mail-Adresse ein.<br>';
        isValid = false;
    }

    if (fname.value.length < 2) {
        errorMessage.innerHTML += 'Der Vorname muss mindestens 3 Zeichen lang sein.<br>';
        isValid = false;
    }

    if (lname.value.length < 2) {
        errorMessage.innerHTML += 'Der Nachname muss mindestens 3 Zeichen lang sein.<br>';
        isValid = false;
    }

    if (message.value.length > 1000) {
        errorMessage.innerHTML += 'Die Nachricht darf max. 1000 Zeichen lang sein.<br>';
        isValid = false;
    }

    return isValid;
}

submit.addEventListener("click", async (event) => {
    event.preventDefault();
    onClickSubmit();
});


const onClickSubmit = async () => {
    const isValid = emailforms();
    if (isValid) {
        // Speichert die Daten in der Datenbank
        await databaseClient.insertInto("form_data", {
            mail: emailforms.value,
        });
    }
}
