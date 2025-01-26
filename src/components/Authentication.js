import React from "react";
import { UserCircleIcon, LogOutIcon } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "./ValidationSchema";
import bcrypt from "bcryptjs";

export function Authentication({ isAuthenticated, user, onLogin, onLogout }) {
  const handleLogin = async (values) => {
    // Get existing users from localStorage
    const existingUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    // Check if user exists
    const userExists = existingUsers.find((u) => u.email === values.email);

    if (!userExists) {
      // Create new user with hashed password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(values.password, salt);

      const newUser = {
        email: values.email,
        password: hashedPassword,
      };

      existingUsers.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(existingUsers));

      onLogin({ email: values.email });
    } else {
      // Verify existing user's password
      const isPasswordValid = bcrypt.compareSync(
        values.password,
        userExists.password
      );

      if (isPasswordValid) {
        onLogin({ email: values.email });
      } else {
        // Handle invalid password (you might want to add error handling)
        alert("Invalid password");
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary-100 to-primary-200 p-6 shadow-sm">
      {isAuthenticated ? (
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <UserCircleIcon className="text-primary-600 w-10 h-10" />
            <div>
              <h2 className="text-lg font-semibold text-primary-900">
                Welcome, {user?.email || "User"}
              </h2>
              <p className="text-sm text-primary-600">
                Task Management Dashboard
              </p>
            </div>
          </div>
          <button
            onClick={onLogout}
            title="Log Out here.."
            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            <LogOutIcon className="w-5 h-5" />

            <span>Logout</span>
          </button>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-primary-800">
              Task Manager
            </h1>
            <p className="text-primary-600">Login to access your tasks</p>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await handleLogin(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, isValid }) => (
              <Form className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-primary-700 mb-2"
                  >
                    Email Address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-primary-700 mb-2"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  title="login here"
                  disabled={isSubmitting || !isValid}
                  className={`
                    w-full py-2 rounded-md transition-colors 
                    ${
                      isValid
                        ? "bg-primary-500 text-white hover:bg-primary-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }
                  `}
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
