import React, { useEffect, useState } from 'react'; 
import './App.css';

function App() {
  const [locked, setLocked] = useState("pending");

  // did mount
  useEffect(() => {
    window.addEventListener("unlockProtocol", unlockHandler);
  },[])

  // unmount
  useEffect(() => {
    return () => {
      window.removeEventListener("unlockProtocol", unlockHandler);
    }
  }, []);

  const unlockHandler = (e) => {
    setLocked(e.detail);
    /*
      Status can either be 'unlocked' or 'locked'...
      If state is 'unlocked': implement code here which will be triggered when 
      the current visitor has a valid lock key  
      If state is 'locked': implement code here which will be
      triggered when the current visitor does not have a valid lock key
    */
  }

  const checkout = () => {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()
  }

  return (
    <div className="App">
      <header className="App-header">
        {{
          "locked": (
            <div onClick={checkout} style={{ cursor: "pointer" }}>
              Unlock me!{" "}
              <span aria-label="locked" role="img">
                🔒
              </span>
            </div>
          ),
          "unlocked": (
            <div>
              Unlocked!{" "}
              <span aria-label="unlocked" role="img">
                🗝
              </span>
            </div>
          ),
          "pending": <div>Loading Unlock</div>
        }[locked]} 
      </header>
    </div>
  );
}

export default App;
