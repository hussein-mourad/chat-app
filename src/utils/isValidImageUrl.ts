import request from "request";

export default function isValidImageUrl(url: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const magic = {
      jpg: "ffd8ffe0",
      png: "89504e47",
      gif: "47494638",
    };

    const options = {
      method: "GET",
      url,
      encoding: null,
    };

    request(
      options,
      function (
        err: any,
        res: { statusCode: number },
        body: { toString: (arg0: string, arg1: number, arg2: number) => any }
      ) {
        if (!err && res.statusCode == 200) {
          const magigNumberInBody = body.toString("hex", 0, 4);
          if (
            magigNumberInBody === magic.jpg ||
            magigNumberInBody === magic.png ||
            magigNumberInBody === magic.gif
          ) {
            resolve(true);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      }
    );
  });
}
