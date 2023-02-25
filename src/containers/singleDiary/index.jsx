import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingService from "../../core/common/loadingService";
import ReactQuill from "react-quill";
import { Emoji } from "emoji-picker-react";
import "react-quill-emoji/dist/quill-emoji.css";
import "react-quill/dist/quill.snow.css";
import { getDiary, getDiaries } from "../../core/service/diaryService";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Like from "../../assets/images/like.jpeg";
import "./style.css";

export default function SingleDiary() {
  const [loading, setLoading] = useState(false);
  const [diary, setDiary] = useState();
  const [diaries, setDiaries] = useState([]);
  const [user] = useAuthState(auth);
  const params = useParams();
  useEffect(() => {
    setLoading(true);
    getDiary(params.uid).then((res) => {
      console.log(res, res.id, res.data());
      setDiary(res.data());
      setLoading(false);
    });
    getDiaries(user.email).then((res) => {
      setDiaries(
        res
          .filter((doc) => doc.id !== params.uid)
          .map((doc) => ({ ...doc.data(), uid: doc.id }))
      );
    });
  }, [params, user]);

  return (
    <div className="site-content">
      {loading && <LoadingService />}
      <div className="container">
        {!diary && !diaries.length > 0 && (
          <div className="empty">
            <img src={Like} alt="empty" />
          </div>
        )}
        {diary && (
          <div className="content-diary">
            <div dangerouslySetInnerHTML={{ __html: diary?.content }}></div>
            <div className="single-diary-author flex-box">
              <Link to="/profile" className="flex-box single-author">
                <img src={diary?.userUrl} alt={diary?.userName} />
                <p>{diary?.userName}</p>
              </Link>
              <p className="single-diary-author-status">{diary?.statusMood}</p>
            </div>
          </div>
        )}
        {diaries.length > 0 && (
          <div className="related-post">
            <h3 className="related-title">Fwn12tt may also be interested</h3>
            <div className="related-list flex-box flex-box-4i flex-space-20">
              {diaries.length > 0 &&
                diaries.slice(0, 4).map((doc, index) => (
                  <div className="related-item" key={index}>
                    <div className="related-single">
                      <div className="related-content line-clamp line-clamp-6">
                        <div
                          dangerouslySetInnerHTML={{ __html: doc.content }}
                        ></div>
                      </div>
                      <div className="related-bottom flex-box">
                        <p className="status">{doc.statusMood}</p>
                        <Link to={`/single-diary/${doc.uid}`}>read more</Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
