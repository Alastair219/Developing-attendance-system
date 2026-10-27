function signIn() {
    let typedName = document.getElementById("username").value.trim();
    let role = document.getElementById("role").value;
    let foundName = "";

    // Check if the typed name is in the students list (ignores capitals)
    for (let i = 0; i < students.length; i++) {
        if (students[i].toLowerCase() === typedName.toLowerCase()) {
            foundName = students[i];
        }
    }

    // Admin does not need to be on the list
    if (role === "Admin") {
        showAdmin();
    } else if (foundName !== "") {
        showStudent(foundName);
    } else {
        document.getElementById("error").textContent = "Name not found. Check your spelling.";
    }
}

function showStudent(name) {
    let time = new Date().toLocaleTimeString();
    document.getElementById("welcomeText").textContent = "Welcome, " + name;
    document.getElementById("statusText").textContent = "You have been marked present at " + time;
    switchBoxes();
}

function showAdmin() {
    document.getElementById("welcomeText").textContent = "Welcome, Admin";
    document.getElementById("statusText").textContent = "Year 12 C class list:";

    let list = document.getElementById("classList");
    list.innerHTML = "";
    for (let i = 0; i < students.length; i++) {
        list.innerHTML += "<li>" + students[i] + "</li>";
    }
    switchBoxes();
}

function switchBoxes() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("welcomeBox").style.display = "block";
    document.getElementById("error").textContent = "";
}

function signOut() {
    document.getElementById("welcomeBox").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("username").value = "";
    document.getElementById("classList").innerHTML = "";
}