
$(document).ready(function () {

    // (THIS IS NEW, I JUST ADDED IT)
    // When user clicks submit on the "sign up" page
    // We trigger a post on api/newUser
    // This creates a brand new user, we use their email and password for permissions later 
    $("#new-user").on("submit", function (e) {
        e.preventDefault();
        var userData = {
            name: $("#name").val().trim(),
            email: $("#email").val().trim(),
            address: $("#address").val().trim(),
            password: $("#password").val().trim()
        };
        console.log(userData);
        // send a POST request to the server
        $.post("/api/newUser", userData, function (data) {
            location.reload();
        });
    });

    // (THIS IS NEW, I JUST ADDED IT)
    // When user clicks submit on the "log in" page
    // We trigger a post on api/login
    // which verifies the email and password the user typed in match what is in our database
    // we only give them permission to see their personal info if correct
    $("#login-button").on("submit", function (e) {
        e.preventDefault();
        var userData = {
            email: $("#loginEmail").val().trim(),
            password: $("#loginPassword").val().trim()
        };
        console.log(userData);

        // send a POST request to the server
        $.post("/api/login", userData
        ).done(function (data) {
            window.location.replace(data);
        
        }).fail(function (response) {
            // console.error (response)
            alert(response.responseText);
        });



        // , function (data) {
        //     location.reload();
        // window.location.replace(data);
        // });

});

// This is the old pickup request form
// I suggest we RENAME this LATER once everything is up and running, suggested name: /api/pickupRequest 
// when the form is submitted we save all information for this pickup (name, address, type recyclable, etc...)
$("#add-user").on("submit", function (e) {
    e.preventDefault();
    var userData = {
        name: $("#name").val().trim(),
        phone: $("#phone").val().trim(),
        address: $("#address").val().trim(),
        // type: $("#type").val(),
        type: $('input[name=type]:checked').val(),
        quantity_in_lbs: $("#quantity_in_lbs").val().trim(),
        pickupStart: $("#pickupStart").val().trim(),
        pickupEnd: $("#pickupEnd").val().trim(),
    };
    console.log(userData);
    // send a POST request to the server
    $.post("/api/users", userData, function (data) {
        location.reload();
    });
});

// This is the old delete button, no changes so far
// Maybe LATER once everythign is up and running we rename the button itself to "Pickup complete" or something along those lines
$(".delete-btn").on("click", function (e) {
    e.preventDefault();
    var userId = $(this).attr("data-id");
    $.ajax({
        method: "DELETE",
        url: "/api/user/" + userId
    }).then(function (data) {
        location.reload();
    });
});

// This is the old update button, no changes so far
// This allows users to edit their pickup requests
$("#update-user").on("submit", function (e) {
    e.preventDefault();
    var userId = $(this).attr("data-id");
    var userData = {
        name: $("#name-update").val().trim(),
        phone: $("#phone-update").val().trim(),
        address: $("#address-update").val().trim(),
        // type: $("#type-update").val(),
        type: $('input[name=type]:checked').val(),
        quantity_in_lbs: $("#quantity_in_lbs-update").val().trim(),
        pickupStart: $("#pickupStart-update").val().trim(),
        pickupEnd: $("#pickupEnd-update").val().trim()
    };
    console.log(userData);
    // send a PUT request to the server
    $.ajax({
        method: "PUT",
        url: "/api/user/" + userId,
        data: userData
    }).then(function (data) {
        window.location.assign("/addUser");
    });
});

});



