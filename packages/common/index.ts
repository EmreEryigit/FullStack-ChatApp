import * as Yup from "yup";

const formSchema = Yup.object({
    username: Yup.string()
        .required("Username must be valid")
        .min(6, "Username must be at least 6 characters")
        .max(27, "Username too long"),
    password: Yup.string()
        .required("Password must be valid")
        .min(6, "Password must be at least 6 characters")
        .max(27, "Password too long"),
});

export const friendsSchema = Yup.object({
    friendName: Yup.string()
        .required("Friend's name must be valid")
        .min(6, "Friend's name must be at least 6 characters")
        .max(27, "Friend's name too long"),
});

export default formSchema;
