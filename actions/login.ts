"use server";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  //1.Get user credentials
  const username = formData.get("username");
  const password = formData.get("password");

  //2.Send credentials to server

  try {
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

    //3.get user information from server
    const user = await response.json();

    //4.create cookie session and save token
    await createSession(user.token);
  } catch (error) {
    return {
      message: "Something goes wrong!",
    };
  }

  //5.redirect to dashboard
  redirect("/");
}
