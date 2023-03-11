import React, { useState, useEffect } from "react";
import "./style.css";
import Dialog from "@mui/material/Dialog";
import { storage } from "../../firebase";
import {
  ref,
  uploadBytesResumable,
  listAll,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import toast from "react-hot-toast";
import { uniqueArrayObject } from "../../core/utils/uniqueArray";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Loading from "../../core/common/loadingService";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Smile from "../../assets/images/smile.jpeg";

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [listUrl, setListUrl] = useState([]);
  const  [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [classFlexbox, setClassFlexbox] = useState('');
  const [dataDelete, setDataDelete] = useState(null)

  useEffect(() => {
    getAllImages();
  }, []);

  const onChangeUpload = (event) => {
    if(event.target.files.length === 2) {
      setClassFlexbox('flex-box-2i')
    }else if(event.target.files.length > 2) {
      setClassFlexbox('flex-box-3i')
    }else {
      setClassFlexbox('')
    }
    setImages(Object.values(event.target.files));
  };

  const handleClickOpen = () => {
    setImages([]);
    setProgress(0)
    setOpen(true);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false)
  }
  const getAllImages = async () => {
    setListUrl([])
    setLoading(true)
    await listAll(ref(storage, `gallery_${user.email}`)).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(ref(storage, item.fullPath)).then((url) => {
          setListUrl((prevState) => [
            ...prevState,
            { url, fullPath: item.fullPath },
          ]);
          setLoading(false)
        });
      });
    });
  };
  const handleUpload = () => {
    const promises = [];
    // eslint-disable-next-line array-callback-return
    images.map((image) => {
      const uploadImage = ref(storage, `gallery_${user.email}/${image.name}`);
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
        getAllImages();
        handleClose();
      })
      .catch((err) => {
        toast.success("Upload images errorrrrrrr :(((");
        console.log(err);
      });
  };

  const clickDeleteImage = (item) => {
    setDataDelete(item)
    handleClickOpenDelete();
  }

  const handleDeleteImage = async () => {
    const desertRef = ref(storage, dataDelete.fullPath);
    await deleteObject(desertRef).then(() => {
      toast.success("Delete images successsssssssss ^-^");
      handleCloseDelete()
      getAllImages();
      setDataDelete(null);
    }).catch(err => {
      toast.success("Delete images errorrrrrrr :(((");
      console.log(err);
    })
  };

  const handleDownload = (url) => {
    console.log(url);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      // create Canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      // create <a> tag
      const a = document.createElement("a");
      a.download = "download.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    }
  };

  const handleFullImage = (url) => {
    console.log("url full image:", url);
  };

  if (!user) {
    return <Loading />;
  }
  return (
    <div className="site-content">
      {loading && <Loading/>}
      <div className="container">
        <div className="gallery-wrap">
          <div className="gallery-header flex-box">
            <h2 className="gallery-title">Fwn12tt's Gallery</h2>
            <button className="btn-upload" onClick={handleClickOpen}>
              Upload Image
            </button>
          </div>
          {listUrl.length === 0 && (
            <div className="empty-diary">
              <h2>Up ảnh nào Em ngố ơiiiiiiiiiiii</h2>
              <img src={Smile} alt="empty-diary" />
            </div>
          )}
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}
          >
            <Masonry gutter="10px">
              {listUrl &&
                uniqueArrayObject(listUrl, "fullPath").map((item, index) => (
                  <div className="gallery-item" key={index}>
                    <img src={item.url} alt="gallery" />
                    <div
                      className="cover-bg"
                      onClick={() => handleFullImage(item.url)}
                    ></div>
                    <div className="action-gallery">
                      <button onClick={() => handleDownload(item.url)}>
                        <FileDownloadIcon />
                      </button>
                      <button onClick={() => clickDeleteImage(item)}>
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                ))}
            </Masonry>
          </ResponsiveMasonry>
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
            {images.length > 0 && <progress value={progress} max="100" />}
            <div className={`preview-file flex-box ${classFlexbox}`}>
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
              disabled={images.length > 0 ? false : true}
              onClick={handleUpload}
            >
              upload
            </button>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="dialog-delete">
          <div className="dialog-header">
            <h3 className="dialog-header-title">Delete Image</h3>
          </div>
          <div className="dialog-content dialog-delete-image">
            {dataDelete && <img src={dataDelete.url} alt="gallery-delete"/> }
          </div>
          <div className="dialog-bottom">
            <button
              className="btn-action-dialog btn-cancel"
              onClick={handleCloseDelete}
            >
              Cancel
            </button>
            <button
              className="btn-action-dialog btn-upload"
              disabled={dataDelete ? false : true}
              onClick={handleDeleteImage}
            >
              Agree
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
