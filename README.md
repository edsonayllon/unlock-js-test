# unlock js test

## Description

Minimal viable implementation of Unlock-Protocol. 

Unlock enables paid membership tiers enabled through Ethereum smart contracts.

See: https://github.com/unlock-protocol/react-example.
 
## `index.html`

```
<!-- Unlock snippet -->
<script> (function (d, s) {
    let js = d.createElement(s);
    let sc = d.getElementsByTagName(s)[0];
    js.src = "https://paywall.unlock-protocol.com/static/unlock.1.0.min.js";
    sc.parentNode.insertBefore(js, sc);
  }(document, "script"));
</script>

<!-- Unlock Configuration -->
<script>
  var unlockProtocolConfig = {
    locks: {
      '0xB0114bbDCe17e0AF91b2Be32916a1e236cf6034F': {
        name: 'The Unlock Members lock',
      },
    },
    icon: 'https://unlock-protocol.com/static/images/svg/unlock-word-mark.svg',
    callToAction: {
      default:
        'Please Unlock things!',
    },
  }
</script>
```

## `App.js`

```

function App() {
  const [locked, setLocked] = useState("pending");
  
  useEffect(() => {
    window.addEventListener("unlockProtocol", unlockHandler);
  },[])
  useEffect(() => {
    return () => {
      window.removeEventListener("unlockProtocol", unlockHandler);
    }
  }, []);
  const unlockHandler = (e) => {
    setLocked(e.detail);
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
        }[locked] || null} 
      </header>
    </div>
  );
}
```
