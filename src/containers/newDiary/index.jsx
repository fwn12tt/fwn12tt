import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import "react-quill/dist/quill.snow.css";
import "react-quill-emoji/dist/quill-emoji.css";
import { Emoji } from "emoji-picker-react";
import './style.css';
import { module, formats } from "./setup";
export default function NewDiary() {
  const [value, setVaule] = useState("");
  const [status, setStatus] = useState("happy");
  const onChange = (value) => {
    setVaule(value);
  };
  const onChangeStatus = e => {
    console.log(e.target.value);
    setStatus(e.target.value);
  }
  const controlProps = (item) => ({
    checked: status === item,
    onChange: onChangeStatus,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });
  return (
    <div className="site-content">
      <div className="container">
        <div
          className="content-preview"
          dangerouslySetInnerHTML={{ __html: value }}
        ></div>
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
                    control={<Radio {...controlProps('happy')} color="success"/>}
                    label={`Happy`}
                  />
                  <Emoji unified="1f60a" size="25" />
                </div>
                <div className="flex-box">
                  <FormControlLabel
                    value="funny"
                    control={<Radio {...controlProps('funny')}/>}
                    label={`Funny`}
                  />
                  <Emoji unified="1f60b" size="25" />
                </div>
                <div className="flex-box">
                  <FormControlLabel
                    value="sad"
                    control={<Radio {...controlProps('sad')}/>}
                    label={`Sad`}
                  />
                  <Emoji unified="2639-fe0f" size="25" />
                </div>
                <div className="flex-box">
                  <FormControlLabel
                    value="angry"
                    control={<Radio {...controlProps('angry')}/>}
                    label={`Angry`}
                  />
                  <Emoji unified="1f621" size="25" />
                </div>
                <div className="flex-box">
                  <FormControlLabel
                    value="love"
                    control={<Radio {...controlProps('love')}/>}
                    label={`Love`}
                  />
                  <Emoji unified="1f970" size="25" />
                </div>
                <div className="flex-box">
                  <FormControlLabel
                    value="others"
                    control={<Radio {...controlProps('others')}/>}
                    label={`Others`}
                  />
                  <Emoji unified="1f914" size="25" />
                </div>
              </div>
            </FormControl>
          </div>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            placeholder={"enter..."}
            modules={module}
            formats={formats}
          />
        </div>
      </div>
    </div>
  );
}
