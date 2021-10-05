import { Request, Response } from "express";
import { isEqual, uniqWith } from "lodash";
import Message from "./Message";
import Room from "./Room";

export async function sendMessage(req: Request, res: Response) {
  const user = res.locals.user;
  const { body, currentRoomId } = req.body;

  try {
    let room = await Room.findById(currentRoomId);
    if (!room) throw new Error("Invalid room id");

    let message: any = await Message.create({
      sender: user._id,
      room: currentRoomId,
      body,
    });

    room.members.push(user._id);
    room.messages.push(message._id);

    await Room.updateOne(
      { _id: currentRoomId },
      {
        members: uniqWith(room.members, isEqual),
        messages: uniqWith(room.messages, isEqual),
      }
    );

    message = await Message.findById(message._id).populate("sender").exec();

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

  if (err.message === "Invalid room id") {
    errors.message = err.message;
  }

  if (err.message.toLowerCase().includes("validation failed")) {
    Object.values(err.errors).forEach((value: any) => {
      errors[value.properties.path] = value.properties.message;
    });
  }
  return { errors };
}
