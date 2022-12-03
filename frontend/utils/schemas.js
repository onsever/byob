import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().required("Email is required.").email("Email is invalid."),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password is too short - should be 8 characters minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number and one special character."
    ),
});

export const registerSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required.")
    .min(3, "First name must be at least 3 characters."),
  lastName: Yup.string()
    .required("Last name is required.")
    .min(3, "Last name must be at least 3 characters."),
  phone: Yup.string()
    .required("Phone number is required.")
    .min(10, "Phone number must be at least 11 characters."),
  email: Yup.string().required("Email is required.").email("Email is invalid."),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password is too short - should be 8 characters minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number and one special character."
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required.")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
