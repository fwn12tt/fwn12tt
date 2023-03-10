import React, { useState, useEffect } from "react";
import "./style.css";
import { getDiaries, deleteDiary } from "../../core/service/diaryService";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingService from "../../core/common/loadingService";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Pagination from "../../core/common/pagination/Pagination";
import Dialog from "@mui/material/Dialog";
import imgA5 from "../../assets/images/a5.jpeg";
import { connect } from "react-redux";

const Categories = ({ codeDefault }) => {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uidDelete, setUidDelete] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [postPerPage] = useState(12);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickBtnDelete = (uid) => {
    setUidDelete(uid);
    handleClickOpen();
  };
  const getListDiaries = () => {
    getDiaries(user.email).then((res) => {
      if (res) {
        setDiaries(res.map((doc) => ({ ...doc.data(), uid: doc.id })));
      }
      setLoading(false);
    });
  };
  useEffect(() => {
    if (codeDefault) {
      setLoading(true);
      getListDiaries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onDeleteDiary = (e, uid) => {
    e.preventDefault();
    if (uid) {
      handleClose();
      setLoading(true);
      deleteDiary(uid).then((res) => {
        getListDiaries();
        setLoading(false);
        setUidDelete("");
      });
    }
  };

  //Get current post
  const indexOfLastDiary = currentPage * postPerPage;
  const indexOfFirstDiary = indexOfLastDiary - postPerPage;

  //Change Pgae
  const paginate = (pageNumber) => setcurrentPage(pageNumber);

  return (
    <div className="site-content categories">
      {loading && <LoadingService />}
      {!codeDefault && (
        <div className="container">
          <h3 className="not-enter-code">
            You have not entered the verification code{" "}
            <Link to="/">Go back home</Link>
          </h3>
        </div>
      )}
      {codeDefault && (
        <div className="container">
          {diaries.length === 0 && (
            <div className="empty-diary">
              <h2>Em Ng??? ch??a vi???t m???t nh???t k?? n??o h???tttttt</h2>
              <img src={imgA5} alt="empty-diary" />
            </div>
          )}
          <div className="diary-list flex-box flex-box-3i flex-space-20">
            {diaries.length > 0 &&
              diaries
                .slice(indexOfFirstDiary, indexOfLastDiary)
                .map((diary, index) => (
                  <div className="diary-item" key={index}>
                    <div className="diary-single">
                      <div className="diary-top flex-box">
                        <p>{diary.statusMood}</p>
                        <div className="diary-action flex-box">
                          <EditIcon
                            onClick={() =>
                              navigate("/new-diary", {
                                state: { uid: diary.uid },
                              })
                            }
                          />
                          <DeleteIcon
                            onClick={() => onClickBtnDelete(diary.uid)}
                          />
                        </div>
                      </div>
                      <div className="diary-content line-clamp line-clamp-4">
                        <div
                          dangerouslySetInnerHTML={{ __html: diary.content }}
                        ></div>
                      </div>
                      <div className="diary-bottom flex-box">
                        <Link to="/profile" className="diary-author flex-box">
                          <Avatar
                            alt="fwn12tt"
                            src={diary.userUrl}
                            sx={{ width: 30, height: 30 }}
                            className="diary-author-avatar"
                          />
                          <p className="diary-author-name">{diary.userName}</p>
                        </Link>
                        <Link
                          to={`/single-diary/${diary.uid}`}
                          className="read-more"
                        >
                          read more
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          {diaries.length > 0 && diaries.length > 12 && (
            <Pagination
              totalPost={diaries.length}
              postPerPage={postPerPage}
              currentPage={currentPage}
              setPageNumber={paginate}
            />
          )}
        </div>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="dialog-delete">
          <div className="dialog-header">
            <h3>Fwn12tt you want to delete this diary?</h3>
          </div>
          <div className="dialog-content">
            <p>
              {`Suy ngh?? k??? tr?????c khi x??a nh?? Em Ng???. X??a r???i l?? Anh kh??ng kh??i ph???c l???i cho Em ???????c ????u ????aaaaaaa. C?? m???t c??ch ???? l?? Em vi???t l???i =))).`}
            </p>
          </div>
          <div className="dialog-bottom">
            <button
              className="btn-action-dialog btn-cancel"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="btn-action-dialog btn-agree"
              onClick={(e) => onDeleteDiary(e, uidDelete)}
            >
              Agree
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    codeDefault: state.codeReducer.codeConfirm,
  };
};

export default connect(mapStateToProps)(Categories);
