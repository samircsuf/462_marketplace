function changeAction() {
    var radios = document.getElementsByName("role");
    var registerForm = document.getElementsById("register");
    if (radios[1].checked) {
        registerForm.action = "/provider_signup";
        return;
    } else return;
}