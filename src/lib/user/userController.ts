import { Request, Response } from "express";
import fs from "fs";
import multiparty from "multiparty";
import path from "path";
import { User } from "../auth";

const UPLOAD_PATH = path.join(__dirname, "../../../uploads/");

export async function updateUserData(req: Request, res: Response) {
  let user = res.locals.user;

  let { username } = req.body;

  try {
    await User.findByIdAndUpdate(
      user._id,
      { username },
      { runValidators: true }
    );
  

    if (!user.avatar.includes("/api/user/avatar/")) {
      let avatar = `https://eu.ui-avatars.com/api/?name=${
        username[0] + username[1]
      }`;
      await User.findByIdAndUpdate(
        user._id,
        { avatar },
        { runValidators: true }
      );
    }

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

export function uploadPhoto(req: Request, res: Response) {
  let user = res.locals.user;

  if (!fs.existsSync(UPLOAD_PATH)) {
    fs.mkdirSync(UPLOAD_PATH);
  }
  var form = new multiparty.Form({
    maxFilesSize: 10 * 1024 * 1024,
    uploadDir: UPLOAD_PATH,
  }); //10 MB

  form.on("error", (err) => console.error(err.message));

  form.parse(req, async function (err, fields, files) {
    console.error(files);
    try {
      if (!files || !files.image) throw new Error("No files recieved!");
      const allowedExtensions = ["jpg", "png", "jpeg"];
      const filePath = path.join(
        "/api/user/avatar/",
        files.image[0].path.replace(UPLOAD_PATH, "")
      );

      const fileExtension = filePath
        .split(".")
        [filePath.split(".").length - 1].toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        fs.unlinkSync(files.image[0].path);
        throw new Error("Invalid file extension! Only jpg and png are allowed");
      }

      await User.findByIdAndUpdate(user._id, {
        avatar: filePath,
      });

      res.json({ filePath, fileExtension });
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  });
}

export async function getImage(req: Request, res: Response) {
  const filePath = path.join(UPLOAD_PATH, req.params.filename);
  res.sendFile(filePath);
}
