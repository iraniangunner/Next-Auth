"use server";
import { createSession } from "../lib/session";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  //1.Get user credentials
  const username = formData.get("username");
  const password = formData.get("password");

  //2.Send credentials to server

  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    return {
      message: "An error occurred while login your account.",
    };
  }

  const user = await response.json();

  //3.create cookie session and save token
  createSession(user.token);

  //4.redirect to dashboard
  redirect("/dashboard");
}
