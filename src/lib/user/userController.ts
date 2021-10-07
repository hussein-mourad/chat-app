import { Request, Response } from "express";
import { User } from "../auth";

export async function updateUserData(req: Request, res: Response) {
  let user = res.locals.user;
  console.log(
    "🚀 ~ file: userController.ts ~ line 6 ~ updateUserData ~ user",
    user
  );
  let { username, avatar } = req.body;

  try {
    await User.findByIdAndUpdate(
      user._id,
      { username },
      { runValidators: true }
    );

    if (!avatar) {
      avatar = `https://eu.ui-avatars.com/api/?name=${
        username[0] + username[1]
      }`;
    }

    await User.findByIdAndUpdate(user._id, { avatar }, { runValidators: true });
    
    res.status(201).json("Updated successfully");
  } catch (error) {
    let errors: any = {};
    if (error.code == 11000) {
      errors.message = "Username is already taken.";
    } else if (error.message.toLowerCase().includes("validation failed")) {
      Object.values(error.errors).forEach((value: any) => {
        errors[value.properties.path] = value.properties.message;
      });
    }
    res.status(403).json({ ...errors });
  }
}
