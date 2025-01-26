import React from "react";
import { UserCircleIcon, LogOutIcon } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "./ValidationSchema";
import bcrypt from "bcryptjs";

export function Authentication({ isAuthenticated, user, onLogin, onLogout }) {
  const handleLogin = async (values) => {
    const existingUsers = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    const userExists = existingUsers.find((u) => u.email === values.email);

    if (!userExists) {
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
      const isPasswordValid = bcrypt.compareSync(
        values.password,
        userExists.password
      );

      if (isPasswordValid) {
        onLogin({ email: values.email });
      } else {
        alert("Invalid password");
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary-100 to-primary-200 p-6 shadow-sm">
      {isAuthenticated ? (
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
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
            title="Log Out"
            className="flex items-center justify-center bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
          >
            <span className="hidden sm:block">Logout</span>
            <LogOutIcon className="w-6 h-6 sm:hidden" />
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
                  title="Login here"
                  disabled={isSubmitting || !isValid}
                  className={`w-full py-2 rounded-md transition-colors ${
                    isValid
                      ? "bg-primary-500 text-white hover:bg-primary-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
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
