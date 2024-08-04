"use server";
import { SignupFormSchema, FormState } from "@/app/lib/definitions";

export async function signup(state: FormState, formData: any) {
  // 1.Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  //   const bcrypt = require("bcrypt");
  //   const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database or call an Auth Library's API

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
}
