import React, {useState, useEffect} from 'react';
import './style.css';
import { getDiaries } from '../../core/service/diaryService';
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingService from '../../core/common/loadingService';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';

export default function Categories() {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  useEffect(() => {
    setLoading(true);
    getDiaries(user.email).then(res => {
      if(res) {
        setDiaries(res.map(doc => ({...doc.data(), uid: doc.id})));
      }
      setLoading(false);
    });
  }, [user])
  
  return (
    <div className='site-content'>
      {loading && <LoadingService/>}
      <div className='container'>
        <div className='diary-list flex-box flex-box-3i flex-space-30'>
          {diaries.length === 0 && <h2>Nhóc chưa tạo nhật ký nào hết</h2>}
          {diaries.length > 0 && diaries.map((diary, index) => 
          <div className='diary-item' key={index}>
            <div className='diary-top'>
              <p>{diary.statusMood}</p>
            </div>
            <div className='diary-content line-clamp line-clamp-3'>
              <div dangerouslySetInnerHTML={{__html: diary.content}}></div>
            </div>
            <div className='diary-bottom'>
              <p>{diary.nameUser}</p>
              <Link to={`/single-diary/${diary.uid}`}>read more</Link>
            </div>
          </div>)}
        </div>
      </div>
    </div>
  )
}
