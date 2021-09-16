import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "./User";

const TEN_DAYS_IN_SECONDS = 10 * 24 * 60 * 60;
const TEN_DAYS_IN_MILLISECONDS = TEN_DAYS_IN_SECONDS * 1000;

async function isAuth(req: Request, res: Response) {
  const user = res.locals.user;
  res.json({
    id: user._id,
    username: user.username,
    avatar: user.avatar,
    currentRoom: user.currentRoom,
  });
}

async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    let user = await User.login(username, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: TEN_DAYS_IN_MILLISECONDS,
      signed: true,
    });

    res.status(201).json({
      id: user._id,
      username: user.username,
      avatar: user.avatar,
      currentRoom: user.currentRoom,
    });
  } catch (err: any) {
    res.status(401).json(handleErrors(err));
  }
}

async function signup(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const avatar = `https://eu.ui-avatars.com/api/?name=${
      username[0] + username[1]
    }`;
    let user = await User.create({ username, password, avatar });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: TEN_DAYS_IN_MILLISECONDS,
      signed: true,
    });

    res.status(201).json({
      id: user._id,
      username: user.username,
      avatar: user.avatar,
      currentRoom: user.currentRoom,
    });
  } catch (err: any) {
    console.error(err);
    res.status(401).json(handleErrors(err));
  }
}

function logout(req: Request, res: Response) {
  res.cookie("jwt", "", { maxAge: 1 });
  res.json("Logout successfully");
}

function createToken(id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET || "", {
    expiresIn: TEN_DAYS_IN_SECONDS,
  });
}

function handleErrors(err: {
  message: string;
  code: number;
  errors: any;
  keyPattern: any;
}) {
  let errors: any = { username: "", password: "", message: "" };

  if (err.message === "Invalid username and/or password") {
    errors.message = err.message;
  }
  if (err.code == 11000) {
    errors.username = "Username is already taken.";
  }
  if (err.message.toLowerCase().includes("user validation failed")) {
    Object.values(err.errors).forEach((value: any) => {
      errors[value.properties.path] = value.properties.message;
    });
  }
  return { errors };
}

export default {
  isAuth,
  login,
  logout,
  signup,
};
