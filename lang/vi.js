export const transValidation = {
    email_incorrect: "Email phai co dang example@gmail.com!",
    gender_incorrect: "Sai thong tin gioi tinh",
    password_incorrect: "Mat khau phai chua it nhat 8 ky tu, bao gom cho hoa, chu thuong, chu so va ky tu",
    password_confirmation_incorrect: "mat khau khong giong nhau",
}


export const transErrors = {
    account_in_use: "Email nay da duoc su dung",
    account_removed: "Account nay da bi go khoi he thong",
    account_not_active: "Account da duoc tao nhung chua active"
}

export const transSuccess = {
    userCreated: (userEmail) => {
        return `Account <strong>${userEmail}</strong> da duoc tao`;
    }
}