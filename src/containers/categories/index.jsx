import React, { useState, useEffect } from "react";
import "./style.css";
import { getDiaries } from "../../core/service/diaryService";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingService from "../../core/common/loadingService";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Categories() {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  useEffect(() => {
    setLoading(true);
    getDiaries(user.email).then((res) => {
      if (res) {
        setDiaries(res.map((doc) => ({ ...doc.data(), uid: doc.id })));
      }
      setLoading(false);
    });
  }, [user]);

  return (
    <div className="site-content categories">
      {loading && <LoadingService />}
      <div className="container">
        <div className="diary-list flex-box flex-box-3i flex-space-20">
          {diaries.length === 0 && <h2>Nhóc chưa tạo nhật ký nào hết</h2>}
          {diaries.length > 0 &&
            diaries.map((diary, index) => (
              <div className="diary-item" key={index}>
                <div className="diary-single">
                  <div className="diary-top flex-box">
                    <p>{diary.statusMood}</p>
                    <div className="diary-action flex-box">
                      <EditIcon/>
                      <DeleteIcon/>
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
                    <Link to={`/single-diary/${diary.uid}`} className="read-more">read more</Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
