/* eslint-disable @next/next/no-img-element */
import { Close as CloseIcon } from "@material-ui/icons";
import useOnClickOutside from "hooks/useOnClickOutside";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import IUser from "types/User";

interface Props {
  user: IUser;
  setUser: (user: IUser) => void;
  stateHandler: () => void;
}

function ChangePhotoModal({ user, setUser, stateHandler }: Props) {
  const imgRef = useRef<any>(null);
  const inputRef = useRef<any>(null);
  const modalRef = useRef<any>(null);
  const [srcImg, setSrcImg] = useState<string | undefined>("");
  const [crop, setCrop] = useState<any>({
    unit: "px",
    aspect: 1 / 1,
    x: 10,
    y: 10,
    width: 200,
    height: 200,
  });
  const [completedCrop, setCompletedCrop] = useState<any>();
  const [error, setError] = useState(null);
  const [progressValue, setProgressValue] = useState(0);

  useOnClickOutside(modalRef, stateHandler);

  useEffect(() => {
    let img = document.createElement("img");
    img.src = user.avatar;
    try {
      var base64Img = getBase64Image(img);
      setSrcImg(base64Img);
    } catch (err) {
      console.error(err);
    }
  }, [user.avatar]);

  function getBase64Image(img: any) {
    if (!img) return;
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/jpeg");
    return dataURL;
  }

  /**
   * Documentation
   * @param {HTMLImageElement} image - Image File Object
   * @param {Object} crop - crop Object
   * @param {String} fileName - Name of the returned file in Promise
   * @param {Boolean} base64 - Return base64 version of the image
   */
  function getCroppedImg(image: any, crop: any, fileName: string, base64: any) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx && (ctx.imageSmoothingQuality = "high");

    ctx?.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    if (base64) return canvas.toDataURL("image/jpeg");

    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob: any) => {
          blob.name = fileName;
          blob.lastModifiedDate = new Date();
          resolve(blob);
        },
        "image/jpeg",
        1
      );
    });
  }

  const onSelectFile = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader: any = new FileReader();
      reader.addEventListener("progress", (e: any) => {
        setProgressValue((e.loaded / e.total) * 100 || 0);
      });
      reader.addEventListener("load", () => {
        setSrcImg(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const saveImage = async (completedCrop: any) => {
    const blob:any = await getCroppedImg(
      imgRef.current,
      completedCrop,
      "croppedImage.jpeg",
      false
    );
    let file = new File([blob], blob.name);
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    var formData = new FormData();
    formData.append("image", file);
    xhr.open(
      "PUT",
      `/api/user/avatar/`,
      true
    );
    // Add following event listener
    xhr.upload.addEventListener("progress", function (e) {
      setProgressValue((e.loaded / e.total) * 100 || 0);
    });
    xhr.addEventListener("readystatechange", function (e: any) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        setUser({ ...user, avatar: xhr.response.filePath as string });
        stateHandler();
      } else if (xhr.readyState == 4 && xhr.status != 200) {
        console.error(e);
        // setError(e.currentTarget.response.substring(0,20));
      }
    });
    xhr.withCredentials = true;
    xhr.send(formData);
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  setTimeout(() => {
    setProgressValue(0);
  }, 3000);

  return (
    <form
      className="fixed top-0 left-0 z-50 w-screen h-full overflow-auto md:h-screen bg-black/30"
      onSubmit={(e) => e.preventDefault()}
      encType="multipart/form-data"
    >
      <div className="flex justify-center ">
        <div
          className="mt-5 mx-auto md:border border-gray-500 bg-base-100 shadow-md md:rounded-lg p-3  
        h-full md:h-auto  md:max-w-[80vw] "
          ref={modalRef}
        >
          <div className="flex justify-between ">
            <h3 className="mr-8 text-lg">Upload your photo ( Maximum 10mb )</h3>
            <button className="p-1" onClick={stateHandler}>
              <CloseIcon fontSize="small" />
            </button>
          </div>
          {!srcImg && (
            <img
              src={user.avatar}
              alt="profile picture"
              className="w-full max-w-xs mx-auto mt-4 md:max-w-md"
            />
          )}
          {srcImg && (
            <div className="flex items-center justify-center w-full mt-4">
              <ReactCrop
                src={srcImg}
                onImageLoaded={onLoad}
                crop={crop}
                minWidth={100}
                minHeight={100}
                keepSelection={true}
                ruleOfThirds={true}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
              />
            </div>
          )}

          {progressValue > 0 && (
            <div className="w-full h-2 mt-1 bg-gray-300 rounded-md">
              <div
                className={`h-2 bg-blue-500 rounded-md`}
                style={{ width: `${progressValue}%` }}
              ></div>
            </div>
          )}

          <div className="flex justify-center mt-5">
            <input
              className="hidden"
              type="file"
              name="photo"
              id="photoInput"
              ref={inputRef}
              accept="image/*"
              onChange={onSelectFile}
            />
            <button
              className="px-3 py-2 my-2 text-sm font-medium text-white bg-blue-500 rounded-lg active:bg-blue-600 focus:ring focus:ring-blue-300 dark:focus:ring-blue-400 "
              onClick={(e) => inputRef.current.click()}
            >
              Upload a photo
            </button>

            
            <button
              type="button"
              className="px-3 py-2 my-2 ml-2 text-sm font-medium text-white bg-blue-500 rounded-lg active:bg-blue-600 focus:ring focus:ring-blue-300 dark:focus:ring-blue-400"
              disabled={!completedCrop?.width || !completedCrop?.height}
              onClick={() => saveImage(completedCrop)}
            >
              Save
            </button>
            <small className="block text-red-500 dark:text-red-400">
              {error}
            </small>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ChangePhotoModal;
