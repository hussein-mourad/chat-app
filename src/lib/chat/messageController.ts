import { Request, Response } from "express";
import Message from "./Message";

export async function sendMessage(req: Request, res: Response) {
  const user = res.locals.user;
  const { body } = req.body;

  try {
    let message: any = await Message.create({
      sender: user._id,
      room: user.currentRoom,
      body,
    });

    res.status(201).json({ ...message._doc });
  } catch (error: any) {
    res.status(401).json(handleErrors(error));
  }
}

export async function getMessage(req: Request, res: Response) {
  const user = res.locals.user;

  try {
    let message: any = await Message.findOne({ _id: req.params.id })
      .populate("room")
      .exec();
    res.status(201).json(message._doc);
  } catch (error: any) {
    res.status(401).json("Message not found.");
  }
}

export async function findAllMessages(req: Request, res: Response) {
  const user = res.locals.user;
  try {
    let messages = await Message.find({ sender: user._id });
    res.status(201).json([...messages]);
  } catch (error: any) {
    res.status(401).json(handleErrors(error));
  }
}

function handleErrors(err: any) {
  let errors: any = {};
  if (err.message.toLowerCase().includes("validation failed")) {
    Object.values(err.errors).forEach((value: any) => {
      errors[value.properties.path] = value.properties.message;
    });
  }
  return { errors };
}
