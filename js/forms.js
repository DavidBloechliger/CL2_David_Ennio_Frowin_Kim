

// (1) Variablen initialisieren
const form_group = document.getElementById("form-group");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const message = document.getElementById("message");
const emailField = document.getElementById("e-mail");
const submit = document.getElementById("submit");

function emailforms() {

    if (emailField.includes('@')) {
        alert('Gib eine gültige E-Mail-Adresse ein.')
        return false
    }
    return true
}

submit.addEventListener("click", async (event) => {
    event.preventDefault();
    onClickSubmit();
});


const onClickSubmit = async () => {
    // Speichert die Daten in der Datenbank
    await databaseClient.insertInto("form_data", {
        mail: emailField.value,
    });
}