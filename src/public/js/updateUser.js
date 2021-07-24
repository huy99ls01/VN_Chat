let userAvatar = null;
let userInfo = {};
let originAvatarSrc = null;
let originUserInfo = {};
let userUpdatePassword = {};

function callLogOut() {
    let timerInterval;
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Tu dong dang xuat sau 5 giay",
        html: "Thoi gian: <strong></strong>",
        timer: 5000,
        onBeforeOpen: () => { 
            Swal.showLoading();
            timerInterval = setInterval(() => { 
                Swal.getContent().querySelector("strong").textContent = Math.ceil(Swal.getTimerLeft() / 1000);
            }, 1000)
        },
        onClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        $.get("/logout", function() {
            location.reload();
        })
    })
}

function updateUserInfo() { 
    $("#input-change-avatar").bind("change", function() {
        let fileData = $(this).prop("files")[0];
        let math = ["image/png", "image/jpg", "image/jpeg"];
        let limit = 1048576; // byte = 1MB;

        if ($.inArray(fileData.type, math) === -1) { 
            alertify.notify("Kieu File khong hop le, chi chap nhan jpg, png & jpeg", "error", 7);
            $(this).val(null);
            return false;
        }

        if (fileData.size > limit) { 
            alertify.notify("File upload toi da cho phep la 1MB", "error", 7);
            $(this).val(null);
            return false;
        }

        //console.log(fileData);
        if (typeof (FileReader) != "undefined") {
            let imagePreview = $("#image-edit-profile");
            imagePreview.empty();

            let fileReader = new FileReader();
            fileReader.onload = function(element) { 
                $("<img>", {
                    "src": element.target.result,
                    "class": "avatar img-circle",
                    "id": "user-modal-avatar",
                    "alt": "avatar"
                }).appendTo(imagePreview);
            } 
            imagePreview.show();
            fileReader.readAsDataURL(fileData);

            let formData = new FormData();
            formData.append("avatar", fileData);

            userAvatar = formData;
        }
        else { 
            alertify.notify("Trinh duyet cua ban khong ho tro FileReader", "error", 7);
        }
    });

    $("#input-change-username").bind("change", function() {
        let username = $(this).val();
        let regUsername = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);

        if (!regUsername.test(username) || username.length < 3 || username.length > 17) { 
            alertify.notify("User name gioi han trong khoang 3-17 ky tu va khong duoc phep chua ki tu dac biet", "error", 7);
            $(this).val(originUserInfo.username);
            delete userInfo.username;
            return false; 
        }

        userInfo.username = username;
    });

    $("#input-change-gender-male").bind("click", function() { 
        let gender = $(this).val();

        if (gender !== "male") {
            alertify.notify("Du lieu gioi tinh co van de", "error", 7);
            $(this).val(originUserInfo.gender);
            delete userInfo.gender;
            return false; 
        }

        userInfo.gender = gender;
    });

    $("#input-change-gender-female").bind("click", function() { 
        let gender = $(this).val();

        if (gender !== "female") {
            alertify.notify("Du lieu gioi tinh co van de", "error", 7);
            $(this).val(originUserInfo.gender);
            delete userInfo.gender;
            return false; 
        }

        userInfo.gender = gender;
    });

    $("#input-change-address").bind("change", function() {
        let address = $(this).val();

        if (address.length < 3 || address.length > 30) { 
            alertify.notify("Dia chi gioi tinh trong khoang 3-30 ky tu", "error", 7);
            $(this).val(originUserInfo.address);
            delete userInfo.address;
            return false; 
        }

        userInfo.address = address;
    });

    $("#input-change-phone").bind("change", function() { 
        let phone = $(this).val();
        let regPhone = new RegExp(/^(0)[0-9]{9,10}$/);

        if (!regPhone.test(phone)) { 
            alertify.notify("So dien thoai phai la so dien thoai vietnam, gioi han trong khoang 10-11 so", "error", 7);
            $(this).val(originUserInfo.phone);
            delete userInfo.phone;
            return false; 
        }

        userInfo.phone = phone;
    });
    
    $("#input-change-current-password").bind("change", function() { 
        let currentPassword = $(this).val();
        let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/);

        if (!regexPassword.test(currentPassword)) { 
            alertify.notify("Mat khau phai chua it nhat 8 ky tu, bao gom cho hoa, chu thuong, chu so va ky tu", "error", 7);
            $(this).val(null);
            userUpdatePassword.currentPassword;
            return false; 
        }

        userUpdatePassword.currentPassword = currentPassword;
    });

    $("#input-change-new-password").bind("change", function() { 
        let newPassword = $(this).val();
        let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/);

        if (!regexPassword.test(newPassword)) { 
            alertify.notify("Mat khau phai chua it nhat 8 ky tu, bao gom cho hoa, chu thuong, chu so va ky tu", "error", 7);
            $(this).val(null);
            userUpdatePassword.newPassword;
            return false; 
        }

        userUpdatePassword.newPassword = newPassword;
    });

    $("#input-change-confirm-new-password").bind("change", function() { 
        let confirmNewPassword = $(this).val();

        if (!userUpdatePassword.newPassword) { 
            alertify.notify("Ban chua nhap mat khau moi", "error", 7);
            $(this).val(null);
            userUpdatePassword.confirmNewPassword;
            return false; 
        }

        if (confirmNewPassword !== userUpdatePassword.newPassword) { 
            alertify.notify("Mat khau khong trung khop", "error", 7);
            $(this).val(null);
            userUpdatePassword.confirmNewPassword;
            return false; 
        }

        userUpdatePassword.confirmNewPassword = confirmNewPassword;
    });
} 

function callUpdateAvatar() { 
    $.ajax({
        url: "/user/update-avatar",
        type: "put",
        cache: false, 
        contentType: false,
        processData: false,
        data: userAvatar,
        success: function(result) {
            console.log(result);

            // Display success
            $(".user-modal-alert-success").find("span").text(result.message)
            $(".user-modal-alert-success").css("display", "block")
            
            // Update navbar avatar
            $("#navbar-avatar").attr("src", result.imageSrc);

            // Update origin avatar src
            originAvatarSrc = result.imageSrc;

            // reset all
            $("#input-btn-cancel-update-user").click();
        },
        error: function(error) {

            // Display errors
            $(".user-modal-alert-error").find("span").text(error.responseText)
            $(".user-modal-alert-error").css("display", "block")

            // reset all
            $("#input-btn-cancel-update-user").click();
        }
    });
}

function callUpdateUserInfo() {
    $.ajax({
        url: "/user/update-info",
        type: "put",
        data: userInfo,
        success: function(result) {
            console.log(result);

            // Display success
            $(".user-modal-alert-success").find("span").text(result.message)
            $(".user-modal-alert-success").css("display", "block")

            // update originUserInfo
            originUserInfo = Object.assign(originUserInfo, userInfo);

            // update username at navbar
            $("#navbar-username").text(originUserInfo.username);

            // reset all
            $("#input-btn-cancel-update-user").click();
        },
        error: function(error) {

            // Display errors
            $(".user-modal-alert-error").find("span").text(error.responseText)
            $(".user-modal-alert-error").css("display", "block")

            // reset all
            $("#input-btn-cancel-update-user").click();
        }
    });
}

function callUpdateUserPassword() {
    $.ajax({
        url: "/user/update-password",
        type: "put",
        data: userUpdatePassword,
        success: function(result) {
            console.log(result);

            // Display success
            $(".user-modal-password-alert-success").find("span").text(result.message)
            $(".user-modal-password-alert-success").css("display", "block")

            // reset all
            $("#input-btn-cancel-user-password").click();

            // logout after change password success
            callLogOut();
        },
        error: function(error) {

            // Display errors
            $(".user-modal-password-alert-error").find("span").text(error.responseText)
            $(".user-modal-password-alert-error").css("display", "block")

            // reset all
            $("#input-btn-cancel-user-password").click();
        }
    });
}

$(document).ready(function() {
    

    originAvatarSrc = $("#user-modal-avatar").attr("src")
    originUserInfo = { 
        username: $("#input-change-username").val(),
        gender: ($("#input-change-gender-male").is(":checked")) ? $("#input-change-gender-male").val() : $("#input-change-gender-female").val(),
        address: $("#input-change-address").val(),
        phone: $("#input-change-phone").val()
    }

    // update userInfo after call
    updateUserInfo();

    $("#input-btn-update-user").bind("click", function() { 
        if($.isEmptyObject(userInfo) && !userAvatar) {
            alertify.notify("Ban phai thay doi thong tin truoc khi cap nhap du lieu", "error", 7);
            return false;
        }

        if (userAvatar) {
            callUpdateAvatar();
        }
        
        if (!($.isEmptyObject(userInfo))) { 
            callUpdateUserInfo();
        }
        //console.log(userAvatar);
        //console.log(userInfo);
    });

    $("#input-btn-cancel-update-user").bind("click", function() {
        userAvatar = null;
        userInfo = {};
        $("#input-change-avatar").val(null);
        $("#user-modal-avatar").attr("src", originAvatarSrc);

        $("#input-change-username").val(originUserInfo.username);
        (originUserInfo.gender === "male") ? $("#input-change-gender-male").click() : $("#input-change-gender-female").click();
        $("#input-change-address").val(originUserInfo.address);
        $("#input-change-phone").val(originUserInfo.phone);
    });


    $("#input-btn-update-user-password").bind("click", function() {
        if (!userUpdatePassword.currentPassword || !userUpdatePassword.newPassword || !userUpdatePassword.confirmNewPassword) { 
            alertify.notify("Ban phai thay doi day du thong tin", "error", 7);
            return false;
        }
        Swal.fire({
            title: "Ban co chac chan muon thay doi mat khau?",
            text: "Ban khong the undo qua trinh nay",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Xac nhan",
            cancelButtonText: "Huy bo"
          }).then((result) => {
              if (!result.value) {
                $("#input-btn-cancel-user-password").click()
                return false
              }
              callUpdateUserPassword();
          })
    });

    $("#input-btn-cancel-user-password").bind("click", function() {
        userUpdatePassword = {};

        $("#input-change-current-password").val(null);
        $("#input-change-new-password").val(null);
        $("#input-change-confirm-new-password").val(null);
    });
});
