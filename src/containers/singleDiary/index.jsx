import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingService from "../../core/common/loadingService";
import "react-quill-emoji/dist/quill-emoji.css";
import "react-quill/dist/quill.snow.css";
import { getDiary } from "../../core/service/diaryService";
import ReactQuill from "react-quill";
import { Emoji } from "emoji-picker-react";
import "./style.css";

export default function SingleDiary() {
  const [loading, setLoading] = useState(false);
  const [diary, setDiary] = useState();
  const params = useParams();
  useEffect(() => {
    setLoading(true);
    getDiary(params.uid).then((res) => {
      console.log(res, res.id, res.data());
      setDiary(res.data());
      setLoading(false);
    });
  }, [params]);

  return (
    <div className="site-content">
      {loading && <LoadingService />}
      <div className="container">
        <div className="content-diary">
          <div dangerouslySetInnerHTML={{ __html: diary?.content }}></div>
        </div>
      </div>
    </div>
  );
}
