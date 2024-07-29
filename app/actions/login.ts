"use server";
import { SignupFormSchema, FormState } from "@/app/lib/definitions";
import { createSession } from "../lib/session";
import { redirect } from "next/navigation";
// import { encrypt } from "../session";
import { cookies } from "next/headers";

export async function login({ redirectTo = "/dashboard", ...credentials }) {
  // //   1.Validate form fields
  //   const validatedFields = SignupFormSchema.safeParse({
  //     name: formData.get("name"),
  //     email: formData.get("email"),
  //     password: formData.get("password"),
  //   });
  // //   If any form fields are invalid, return early
  //   if (!validatedFields.success) {
  //     return {
  //       errors: validatedFields.error.flatten().fieldErrors,
  //     };
  //   }
  //   2. Prepare data for insertion into database
  // const { name, email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  //   const bcrypt = require("bcrypt");
  //   const hashedPassword = await bcrypt.hash(password, 10);
  // 3. Insert the user into the database or call an Auth Library's API

  //   fetch('https://dummyjson.com/auth/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       username: 'emilys',
  //       password: 'emilyspass',
  //     })
  //   })
  //   .then(res => res.json())
  //   .then(console.log);

  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  const user = await response.json();

  // const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  // const session = await encrypt({ user, expiresAt });
  createSession(user.token);
  redirect(redirectTo);
}

//   cookies().set("session", user.token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     // expires: expiresAt,
//     sameSite: "lax",
//     path: "/",
//   });

//   redirect("/dashboard");
// }

//  await createSession(user.token);

//   const data = await db
//   .insert(users)
//   .values({
//     name,
//     email,
//     password: hashedPassword,
//   })
//   .returning({ id: users.id })
// const user = data[0]
// if (!user) {
//   return {
//     message: 'An error occurred while creating your account.',
//   }
// }
// 4. Create user session
//  await createSession(user.id)
// 5. Redirect user
//   redirect("/dashboard");
