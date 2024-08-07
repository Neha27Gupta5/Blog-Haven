
const { z } = require("zod");

// Creating an object schema that matches the provided Mongoose schema
const zodSchema = z.object({
  Name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, { message: "Name is required" }),
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(1, { message: "Username is required" })
    .max(255, { message: "Username must not be more than 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(1024, { message: "Password can't be greater than 1024 characters" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Confirm Password must be at least 6 characters" })
    .max(1024, { message: "Confirm Password can't be greater than 1024 characters" }),
});

module.exports = zodSchema;
