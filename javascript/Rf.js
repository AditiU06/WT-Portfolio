function formValidation() {
    var uid = document.registration.userid;
    var passid = document.registration.passid;
    var uname = document.registration.name;
    var uadd = document.registration.address;
    var ucountry = document.registration.country;
    var uzip = document.registration.zip;
    var uemail = document.registration.email;
    var ugen = document.registration.gen;

    if (userid_validation(uid, 5, 12)) {
        if (passid_validation(passid, 7, 12)) {
            if (allLetter(uname)) {
                if (addressValidation(uadd)) {
                    if (countryselect(ucountry)) {
                        if (allnumeric(uzip)) {
                            if (ValidateEmail(uemail)) {
                                if (validgender(ugen)) {
                                    alert("Registration Successful!");
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}

function userid_validation(uid, mx, my) {
    var uid_len = uid.value.length;
    if (uid_len == 0 || uid_len < mx || uid_len > my) {
        alert("User ID should be between " + mx + " and " + my + " characters");
        uid.focus();
        return false;
    }
    return true;
}

function passid_validation(passid, mx, my) {
    var pass_len = passid.value.length;
    if (pass_len == 0 || pass_len < mx || pass_len > my) {
        alert("Password should be between " + mx + " and " + my + " characters");
        passid.focus();
        return false;
    }
    return true;
}

function allLetter(uname) {
    var letters = /^[A-Za-z ]+$/;
    if (uname.value.match(letters)) {
        return true;
    } else {
        alert("Name must contain alphabet characters only");
        uname.focus();
        return false;
    }
}

function addressValidation(uadd) {
    if (uadd.value.trim() == "") {
        alert("Address should not be empty");
        uadd.focus();
        return false;
    }
    return true;
}

function countryselect(ucountry) {
    if (ucountry.value == "Default") {
        alert("Select your country");
        ucountry.focus();
        return false;
    }
    return true;
}

function allnumeric(uzip) {
    var numbers = /^[0-9]+$/;
    if (uzip.value.match(numbers)) {
        return true;
    } else {
        alert("ZIP Code must contain numeric characters only");
        uzip.focus();
        return false;
    }
}

function ValidateEmail(uemail) {
    var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (uemail.value.match(mailformat)) {
        return true;
    } else {
        alert("Invalid Email Address");
        uemail.focus();
        return false;
    }
}

function validgender(ugen) {
    for (var i = 0; i < ugen.length; i++) {
        if (ugen[i].checked) {
            return true;
        }
    }
    alert("Select Gender");
    return false;
}