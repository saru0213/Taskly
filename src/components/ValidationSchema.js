import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

export const taskValidationSchema = Yup.object().shape({
  text: Yup.string()
    .trim()
    .required('Task description is required')
    .max(200, 'Task description must be less than 200 characters')
});