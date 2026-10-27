// Get saved attendance from the browser (empty if nobody has signed in yet)
function getAttendance() {
    let saved = localStorage.getItem("attendance");
    if (saved) {
        return JSON.parse(saved);
    }
    return {};
}

function signIn() {
    let typedName = document.getElementById("username").value.trim();
    let foundName = "";

    // Check if the typed name is in the students list (ignores capitals)
    for (let i = 0; i < students.length; i++) {
        if (students[i].toLowerCase() === typedName.toLowerCase()) {
            foundName = students[i];
        }
    }

    if (foundName === "") {
        document.getElementById("error").textContent = "Name not found. Check your spelling.";
        return;
    }

    let attendance = getAttendance();

    if (attendance[foundName]) {
        document.getElementById("statusText").textContent = "You already signed in at " + attendance[foundName];
    } else {
        let time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        attendance[foundName] = time;
        localStorage.setItem("attendance", JSON.stringify(attendance));
        document.getElementById("statusText").textContent = "You have been marked present at " + time;
    }

    document.getElementById("welcomeText").textContent = "Welcome, " + foundName;
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("welcomeBox").style.display = "block";
    document.getElementById("error").textContent = "";
}

function signOut() {
    document.getElementById("welcomeBox").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("username").value = "";
}

function showAdmin() {
    let attendance = getAttendance();
    let table = document.getElementById("classTable");
    let presentCount = 0;
    table.innerHTML = "";

    for (let i = 0; i < students.length; i++) {
        let name = students[i];

        if (attendance[name]) {
            presentCount++;
            table.innerHTML += "<tr><td>" + name + "</td><td><span class='present'>Present</span></td><td>" + attendance[name] + "</td></tr>";
        } else {
            table.innerHTML += "<tr><td>" + name + "</td><td><span class='absent'>Not Here</span></td><td>-</td></tr>";
        }
    }

    document.getElementById("count").textContent = presentCount + " of " + students.length + " students present";
}

function clearAttendance() {
    localStorage.removeItem("attendance");
    showAdmin();
}

// Admin password
let adminPassword = "skc123";

function checkPassword() {
    let typedPassword = document.getElementById("passwordInput").value;

    if (typedPassword === adminPassword) {
        document.getElementById("passwordBox").style.display = "none";
        document.getElementById("adminBox").style.display = "block";
        document.getElementById("error").textContent = "";
        showAdmin();
    } else {
        document.getElementById("error").textContent = "Incorrect password.";
    }
}