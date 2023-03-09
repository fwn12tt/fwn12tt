import React, { useState, useEffect } from "react";
import "./style.css";
import Dialog from "@mui/material/Dialog";
import { storage } from "../../firebase";
import {
  ref,
  uploadBytesResumable,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import toast from "react-hot-toast";
import { unique } from "../../core/utils/uniqueArray";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [listUrl, setListUrl] = useState([]);

  useEffect(() => {
    getAllImages();
  }, []);

  const onChangeUpload = (event) => {
    setImages(Object.values(event.target.files));
  };

  const handleClickOpen = () => {
    setImages(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getAllImages = async () => {
    await listAll(ref(storage, "images")).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(ref(storage, item.fullPath)).then((url) => {
          setListUrl((prev) => [...prev, url]);
        });
      });
    });
  };
  const handleUpload = () => {
    const promises = [];
    // eslint-disable-next-line array-callback-return
    images.map((image) => {
      const uploadImage = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(uploadImage, image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (err) => {
          console.log(err);
        }
      );
    });

    Promise.all(promises)
      .then(() => {
        toast.success("Upload images successsssssssss ^-^");
        getAllImages()
        handleClose();
      })
      .catch((err) => {
        toast.success("Upload images errorrrrrrr :(((");
        console.log(err);
      });
  };
  return (
    <div className="site-content">
      <div className="container">
        <div className="gallery-wrap">
          <div className="gallery-header flex-box">
            <h2 className="gallery-title">Fwn12tt's Gallery</h2>
            <button className="btn-upload" onClick={handleClickOpen}>
              Upload Image
            </button>
          </div>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}
          >
            <Masonry gutter="10px">
              {listUrl &&
                unique(listUrl).map((url, index) => (
                  <img src={url} alt="gallery" key={index} />
                ))}
            </Masonry>
          </ResponsiveMasonry>
          <div className="gallery-list"></div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="dialog-delete">
          <div className="dialog-header">
            <h3 className="dialog-header-title">Choose Image</h3>
          </div>
          <div className="dialog-content">
            <button className="input-upload">
              <input
                type="file"
                onChange={(e) => onChangeUpload(e)}
                multiple
                accept="image/*"
              />
            </button>
            <progress value={progress} max="100" />
            <div className="preview-file flex-box flex-box-3i">
              {images &&
                images.map((image, index) => (
                  <div className="img-item">
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt="preview"
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="dialog-bottom">
            <button
              className="btn-action-dialog btn-cancel"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="btn-action-dialog btn-upload"
              disabled={images ? false : true}
              onClick={handleUpload}
            >
              upload
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
