function changeAction(target) {
    var form = document.getElementById("register-form");
    var parentDiv = document.getElementById("more-field");
    var fields = ["firstName", "lastName", "phone", "serviceName", "rate"];
    var placeholder = ["First Name", "Last Name", "Phone", "Service Name", "Rate"];

    if (target.getAttribute("value") === "User") {
        form.setAttribute("action", "/signup");
        while (parentDiv.hasChildNodes()) {
            parentDiv.removeChild(parentDiv.lastChild);
        }
    } else {
        form.setAttribute("action", "/providerSignup");
        for (var i = 0; i < 5; i++) {
            var newDiv = document.createElement("input");
            newDiv.setAttribute("class", "form-control nomargin");
            newDiv.setAttribute("type", "text");
            newDiv.setAttribute("placeholder", placeholder[i]);
            newDiv.setAttribute("name", fields[i]);
            parentDiv.appendChild(newDiv);
        }
    }
}