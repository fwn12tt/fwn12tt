import React, { useState } from 'react';
import { logout } from '../../firebase';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>logout</button>
    </div>
    
  )
}
