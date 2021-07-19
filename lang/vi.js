export const transValidation = {
    email_incorrect: "Email phai co dang example@gmail.com!",
    gender_incorrect: "Sai thong tin gioi tinh",
    password_incorrect: "Mat khau phai chua it nhat 8 ky tu, bao gom cho hoa, chu thuong, chu so va ky tu",
    password_confirmation_incorrect: "mat khau khong giong nhau",
};


export const transErrors = {
    account_in_use: "Email nay da duoc su dung",
    account_removed: "Account nay da bi go khoi he thong",
    account_not_active: "Account da duoc tao nhung chua active",
    token_undifined: "Token khong ton tai",
    login_failed: "Sai tai khoan hoac mat khau",
    server_error: "Co loi o phia server, xin thu lai sau",
    avatar_type: "Kieu File khong hop le, chi chap nhan jpg, png & jpeg",
    avatar_size: "File upload toi da cho phep la 1MB"
};

export const transSuccess = {
    userCreated: (userEmail) => {
        return `Account <strong>${userEmail}</strong> da duoc tao, active tai email`;
    },
    account_actived: "Kich hoat thanh cong",
    loginSuccess: (username) => {
        return `Xin chao ${username}, have fun suckerr`
    },
    logout_success: "Dang xuat tai khoan thanh cong, see ya later",
    avatar_updated: "Cap nhap anh dai dien thanh cong"
};

export const  transMail = {
    subject: "VN CHAT: Xac nhan kich hoat tai khoan",
    template: (linkVerify) => { 
        return `
            <h2>Ban nhan duoc email nay vi da dang ky tai khoan voi VN_CHAT</h2>
            <h3>Click vao link ben duoi de xac nhan kich hoat tai khoan</h3>
            <h3><a href="${linkVerify}" target="blank">${linkVerify}</a></h3>
            <h4>Have fun suckerrrrrrr</h4>
        `
    },
    send_failed: "Co loi trong qua trinh gui mail",
}
