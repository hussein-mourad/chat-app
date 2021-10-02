import { Request, Response } from "express";
import { isEqual, uniqWith } from "lodash";
import { User } from "../auth";
import Room from "./Room";

export async function createRoom(req: Request, res: Response) {
  const user = res.locals.user;
  const { name, description } = req.body;

  try {
    let room: any = await Room.create({
      name,
      description,
      members: [user._id],
      messages: [],
    });

    res.status(201).json({ ...room._doc });
  } catch (error: any) {
    res.status(401).json(handleErrors(error));
  }
}

export async function getRoom(req: Request, res: Response) {
  const user = res.locals.user;

  try {
    Room.findOne({ _id: req.params.id })
      .populate("members", "username currentRoom avatar")
      .populate("messages")
      .exec((err, doc) => {
        if (err) throw new Error("error");
        User.populate(
          doc,
          {
            path: "messages.sender",
          },
          (err, room) => {
            res.status(201).json(room);
          }
        );
      });
  } catch (error: any) {
    console.log(error);
    res.status(401).json("Room not found.");
  }
}

export async function findAllRooms(req: Request, res: Response) {
  const user = res.locals.user;
  try {
    Room.find({})
      .populate("members", "username currentRoom avatar")
      .populate("messages")
      .exec((err, docs) => {
        if (err) throw new Error("error");
        User.populate(
          docs,
          {
            path: "messages.sender",
          },
          (err, rooms) => {
            res.status(201).json(rooms);
          }
        );
      });
  } catch (error: any) {
    res.status(401).json(handleErrors(error));
  }
}

export async function updateRoom(req: Request, res: Response) {
  const userId = res.locals.user._id;
  console.log(
    "🚀 ~ file: roomController.ts ~ line 50 ~ updateRoom ~ userId",
    userId
  );
  const roomId = req.params.id;
  const { message } = req.body;
  try {
    if (message.sender != userId) throw new Error("Invalid message");
    let room: any = await Room.findOne({ _id: roomId });
    if (!room) throw new Error("Invalid room");
    room = room._doc;
    room.members.push(userId);
    room.messages.push(message._id);

    await Room.updateOne(
      { _id: roomId },
      {
        members: uniqWith(room.members, isEqual),
        messages: uniqWith(room.messages, isEqual),
      }
    );
    res.status(201).json("updated successfully");
  } catch (error: any) {
    console.error(error);
    res.status(401).json({ error: error.message });
  }
}

function handleErrors(err: any) {
  let errors: any = {};
  if (err.code === 11000) {
    errors.message = "This Channel already exists";
  }
  if (err.message.toLowerCase().includes("validation failed")) {
    Object.values(err.errors).forEach((value: any) => {
      errors[value.properties.path] = value.properties.message;
    });
  }
  return { errors };
}
