import React from 'react';
import './App.css';
import background from './Components/bg.jpg';
import Content from './Components/Content';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';

function App() {
  const [progress, setprogress] = useState(0)
  return (
    <div className="App" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}>
      <LoadingBar color='#0000ff' progress={progress} height={5}/>
      <div className="container">
        <Content setProgress={setprogress}/>
      </div>
    </div>
  );
}

export default App;
