import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import "react-quill/dist/quill.snow.css";
import "react-quill-emoji/dist/quill-emoji.css";
import { Emoji } from "emoji-picker-react";
import "./style.css";
import { module, formats } from "./setup";
import * as CONSTANTS from "./constants";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { createDiary, updateDiary } from "../../core/service/diaryService";
import { v4 as uuidv4} from 'uuid';
import LoadingService from "../../core/common/loadingService";

export default function NewDiary() {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("happy");
  const [isValidSave, setIsValidSave] = useState(false);
  const [textMood, setTextMood] = useState(CONSTANTS.TEXT_HAPPY);
  const [user] = useAuthState(auth);
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (value) => {
    setContent(value);
    if (value !== '' && value !== '<p><br></p>') {
      setIsValidSave(true);
    } else {
      setIsValidSave(false);
    }
  };
  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    switch (e.target.value) {
      case "happy":
        setTextMood(CONSTANTS.TEXT_HAPPY);
        break;
      case "funny":
        setTextMood(CONSTANTS.TEXT_FUNNY);
        break;
      case "sad":
        setTextMood(CONSTANTS.TEXT_SAD);
        break;
      case "angry":
        setTextMood(CONSTANTS.TEXT_ANGRY);
        break;
      case "love":
        setTextMood(CONSTANTS.TEXT_LOVE);
        break;
      case "others":
        setTextMood(CONSTANTS.TEXT_OTHERS);
        break;
      default:
        setTextMood(CONSTANTS.TEXT_HAPPY);
        break;
    }
  };
  const controlProps = (item) => ({
    checked: status === item,
    onChange: onChangeStatus,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const onSaveDiary = (event, uidUser, emailUser, nameUser, content, statusMood) => {
    event.preventDefault();
    let uidv4 = uuidv4();
    setLoading(true);
    if(!uid) {
      createDiary(uidv4, uidUser, emailUser, nameUser, content, statusMood).then(res => {
        setUid(res.id);
        setLoading(false);
      });
    }else {
      updateDiary(uid, {content, statusMood}).then(res => {
        setLoading(false);
      })
    }
  };
  const onClear = (event) => {
    event.preventDefault();
    setUid("");
    setTextMood(CONSTANTS.TEXT_HAPPY);
    setStatus("happy");
    controlProps("happy");
    setContent("");
    setIsValidSave(false);
  }
  return (
    <div className="site-content">
      {loading && <LoadingService/>}
      <div className="container">
        <div className="content-edit">
          <div className="choose-mood">
            <FormControl>
              <div>
                <h2>Choose mood</h2>
              </div>
              <div className="list-mood flex-box">
                <div className="flex-box">
                  <FormControlLabel
                    value="happy"
                    control={
                      <Radio {...controlProps("happy")} color="success" />
                    }
                    label={`Happy`}
                  />
                  <Emoji unified="1f60a" size="25" />
                </div>
                <div className="flex-box">
                  <FormControlLabel
                    value="funny"
                    control={<Radio {...controlProps("funny")} />}
                    label={`Funny`}
                  />
                  <Emoji unified="1f60b" size="25" />
                </div>
                <div className="flex-box">
                  <FormControlLabel
                    value="sad"
                    control={<Radio {...controlProps("sad")} />}
                    label={`Sad`}
                  />
                  <Emoji unified="2639-fe0f" size="25" />
                </div>
                <div className="flex-box">
                  <FormControlLabel
                    value="angry"
                    control={<Radio {...controlProps("angry")} />}
                    label={`Angry`}
                  />
                  <Emoji unified="1f621" size="25" />
                </div>
                <div className="flex-box">
                  <FormControlLabel
                    value="love"
                    control={<Radio {...controlProps("love")} />}
                    label={`Love`}
                  />
                  <Emoji unified="1f970" size="25" />
                </div>
                <div className="flex-box">
                  <FormControlLabel
                    value="others"
                    control={<Radio {...controlProps("others")} />}
                    label={`Others`}
                  />
                  <Emoji unified="1f914" size="25" />
                </div>
              </div>
              {/* <h4 className="text-mood">{textMood}</h4> */}
            </FormControl>
          </div>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={onChange}
            placeholder={"This is just for Fwn12tt..."}
            modules={module}
            formats={formats}
          />
        </div>
        <div className="list-btn" style={{marginTop: "15px"}}>
          <button className="btn-save-diary" disabled={!isValidSave} onClick={e => onSaveDiary(e, user.uid, user.email, user.displayName, content, status)}>
            Save
          </button>
          <button className="btn-save-diary" style={{marginLeft: "15px"}} onClick={e => onClear(e)}>
            Clear
          </button>
          {uid && <Link className="btn-view-single-diary" to={`/single-diary/${uid}`}>View Diary</Link>}
        </div>
      </div>
    </div>
  );
}
