let userAvatar = null;
let userInfo = {};
let originAvatarSrc = null;
let originUserInfo = {};

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
        let regUsername = new RegExp("^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$");

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
        phone = $(this).val();
        let regPhone = new RegExp("^(0)[0-9]{9,10}$");

        if (!regPhone.test(phone)) { 
            alertify.notify("So dien thoai phai la so dien thoai vietnam, gioi han trong khoang 10-11 so", "error", 7);
            $(this).val(originUserInfo.phone);
            delete userInfo.phone;
            return false; 
        }

        userInfo.phone = phone;
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
});
