function changeAction(target) {
    var form = document.getElementsByTagName("form");
    if (target.getAttribute("value") === "User")
        form[0].setAttribute("action", "/login");
    else
        form[0].setAttribute("action", "/providerLogin");
}