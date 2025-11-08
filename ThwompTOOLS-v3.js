(() => {
  const html = `
    <div id="menuBox" style="position:fixed;top:100px;left:100px;width:360px;background:linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);border:3px solid #ff0000;border-radius:12px;padding:18px;box-shadow:0 8px 32px rgba(255,0,0,0.5);font-family:'Segoe UI',Arial,sans-serif;z-index:99999;color:white;">
      <div id="dragHandle" style="cursor:move;padding-bottom:12px;border-bottom:2px solid #ff0000;">
        <h2 style="margin:0;text-align:center;color:#ff0000;text-shadow:0 0 10px #ff0000;">ThwompTOOLS v3</h2>
        <div style="display:flex;gap:8px;margin-top:10px;">
          <button id="mimicTab" style="flex:1;padding:6px;background:#ff0000;color:#000;border:none;border-radius:6px;font-weight:bold;cursor:pointer;">Mimic</button>
          <button id="spamTab" style="flex:1;padding:6px;background:#333;color:#fff;border:none;border-radius:6px;cursor:pointer;">Spam</button>
          <button id="settingsTab" style="flex:1;padding:6px;background:#333;color:#fff;border:none;border-radius:6px;cursor:pointer;">Settings</button>
        </div>
      </div>

      <!-- Settings Tab -->
      <div id="settingsPage" style="display:none;margin-top:15px;">
        <h3 style="margin:5px 0 10px 0;color:#ff0000;">Server Settings</h3>
        <label style="display:block;margin-bottom:5px;color:#ccc;">🌐 Target Server URL:</label>
        <input type="text" id="targetServerUrl" placeholder="Auto-detected" style="width:100%;padding:6px;background:#1a1a1a;color:#fff;border:1px solid #ff0000;border-radius:4px;margin-bottom:5px;">
        <div style="font-size:10px;color:#aaa;margin-bottom:10px;">
          Auto-detects current BonziWORLD server. You can enter a custom BonziWORLD URL.
        </div>
        
        <label style="display:block;margin-bottom:5px;color:#ccc;">Bypass Method:</label>
        <select id="bypassMethod" style="width:100%;padding:6px;background:#1a1a1a;color:#fff;border:1px solid #ff0000;border-radius:4px;margin-bottom:10px;">
          <option value="advanced">Advanced (Zero-Width)</option>
          <option value="mixed">Mixed Characters</option>
          <option value="invisible">Invisible Unicode</option>
          <option value="legacy">Legacy (Dashes)</option>
        </select>

        <label style="display:flex;align-items:center;margin-top:10px;cursor:pointer;">
          <input type="checkbox" id="autoReconnect" checked style="margin-right:8px;">
          <span style="color:#ccc;">Auto-Reconnect</span>
        </label>

        <label style="display:flex;align-items:center;margin-top:8px;cursor:pointer;">
          <input type="checkbox" id="stealthMode" style="margin-right:8px;">
          <span style="color:#ccc;">Stealth Mode (Slower, Less Detectable)</span>
        </label>

        <div style="margin-top:15px;padding:10px;background:rgba(255,0,0,0.1);border-radius:6px;border:1px solid #ff0000;">
          <small style="color:#ff6666;">
            Status: <span id="connectionStatus" style="color:#00ff00;">Ready</span><br>
            Messages Sent: <span id="messageCount">0</span>
          </small>
        </div>
      </div>

      <!-- Mimic Tab -->
      <div id="mainPage" style="margin-top:15px;">
        <h3 style="margin:5px 0 10px 0;color:#ff0000;">User Mimicking</h3>
        <label style="display:block;margin-bottom:5px;color:#ccc;">Color:</label>
        <select id="userColor" style="width:100%;padding:6px;background:#1a1a1a;color:#fff;border:1px solid #ff0000;border-radius:4px;margin-bottom:10px;">
          <option>red</option>
          <option>brown</option>
          <option>green</option>
          <option>blue</option>
          <option>purple</option>
          <option>black</option>
          <option>cyan</option>
          <option>yellow</option>
          <option>pink</option>
          <option>white</option>
        </select>

        <label style="display:block;margin-bottom:5px;color:#ccc;">Hat:</label>
        <select id="userHat" style="width:100%;padding:6px;background:#1a1a1a;color:#fff;border:1px solid #ff0000;border-radius:4px;margin-bottom:10px;">
          <option>none</option>
          <option>bucket</option>
          <option>pot</option>
          <option>chain</option>
          <option>troll</option>
          <option>wizard</option>
          <option>kamala</option>
          <option>maga</option>
          <option>evil</option>
          <option>bfdi</option>
          <option>elon</option>
          <option>tophat</option>
          <option>witch</option>
          <option>horse</option>
          <option>bieber</option>
          <option>obama</option>
          <option>bowtie</option>
        </select>

        <label style="display:block;margin-bottom:5px;color:#ccc;">Nickname:</label>
        <input type="text" id="userName" placeholder="Enter name..." style="width:100%;padding:6px;background:#1a1a1a;color:#fff;border:1px solid #ff0000;border-radius:4px;margin-bottom:10px;">

        <label style="display:block;margin-bottom:5px;color:#ccc;">Message (Optional):</label>
        <input type="text" id="userTalkText" placeholder="Enter message..." style="width:100%;padding:6px;background:#1a1a1a;color:#fff;border:1px solid #ff0000;border-radius:4px;margin-bottom:10px;">

        <button id="triggerBtn" style="width:100%;padding:10px;background:#ff0000;color:#000;border:none;border-radius:6px;font-weight:bold;cursor:pointer;margin-top:5px;">MIMIC USER</button>
        <button id="resetBtn" style="width:100%;padding:10px;background:#666;color:#fff;border:none;border-radius:6px;cursor:pointer;margin-top:8px;">RESET TO DEFAULT</button>
      </div>

      <!-- Spam Tab -->
      <div id="spamPage" style="display:none;margin-top:15px;">
        <h3 style="margin:5px 0 10px 0;color:#ff0000;">Spam Controls</h3>
        
        <div style="background:rgba(255,0,0,0.1);padding:10px;border-radius:6px;margin-bottom:10px;">
          <label style="display:block;margin-bottom:5px;color:#ccc;">Text Spam:</label>
          <input id="spamText" type="text" value="TALK!" placeholder="Message to spam..." style="width:100%;padding:6px;background:#1a1a1a;color:#fff;border:1px solid #ff0000;border-radius:4px;margin-bottom:8px;">
          <label style="display:block;margin-bottom:5px;color:#ccc;">Interval: <span id="intervalLabel">1000</span>ms</label>
          <input id="intervalSlider" type="range" min="50" max="5000" value="1000" style="width:100%;margin-bottom:8px;">
          <button id="startSpam" style="width:48%;padding:8px;background:#ff0000;color:#000;border:none;border-radius:6px;font-weight:bold;cursor:pointer;">START</button>
          <button id="stopSpam" style="width:48%;padding:8px;background:#666;color:#fff;border:none;border-radius:6px;cursor:pointer;margin-left:4%;">STOP</button>
        </div>

        <div style="background:rgba(0,255,255,0.1);padding:10px;border-radius:6px;margin-bottom:10px;">
          <label style="display:block;margin-bottom:8px;color:#0ff;">Color Spam:</label>
          <button id="startColorSpam" style="width:48%;padding:8px;background:#0ff;color:#000;border:none;border-radius:6px;font-weight:bold;cursor:pointer;">START</button>
          <button id="stopColorSpam" style="width:48%;padding:8px;background:#666;color:#fff;border:none;border-radius:6px;cursor:pointer;margin-left:4%;">STOP</button>
        </div>

        <div style="background:rgba(255,255,0,0.1);padding:10px;border-radius:6px;margin-bottom:10px;">
          <label style="display:block;margin-bottom:8px;color:#ff0;">Hat Spam:</label>
          <button id="startHatSpam" style="width:48%;padding:8px;background:#ff0;color:#000;border:none;border-radius:6px;font-weight:bold;cursor:pointer;">START</button>
          <button id="stopHatSpam" style="width:48%;padding:8px;background:#666;color:#fff;border:none;border-radius:6px;cursor:pointer;margin-left:4%;">STOP</button>
        </div>

        <div style="background:rgba(255,0,255,0.1);padding:10px;border-radius:6px;">
          <label style="display:block;margin-bottom:8px;color:#f0f;">Name Spam:</label>
          <button id="startNameSpam" style="width:48%;padding:8px;background:#f0f;color:#000;border:none;border-radius:6px;font-weight:bold;cursor:pointer;">START</button>
          <button id="stopNameSpam" style="width:48%;padding:8px;background:#666;color:#fff;border:none;border-radius:6px;cursor:pointer;margin-left:4%;">STOP</button>
        </div>
      </div>
    </div>
  `;

  const div = document.createElement("div");
  div.innerHTML = html;
  document.body.appendChild(div);

  let spamInterval = null;
  let colorSpamInterval = null;
  let hatSpamInterval = null;
  let nameSpamInterval = null;
  let messageCount = 0;
  let bypassCounter = 0;
  let customSocket = null;

  const ZERO_WIDTH_CHARS = ['\u200B', '\u200C', '\u200D', '\uFEFF'];
  const INVISIBLE_CHARS = ['\u2800', '\u180E', '\u2063', '\u2062', '\u2061'];
  const MIXED_CHARS = ['\u00A0', '\u2009', '\u200A', '\u202F'];

  // Auto-detect and validate BonziWORLD server URL
  function detectServerUrl() {
    const targetServerUrlInput = document.getElementById('targetServerUrl');
    const currentOrigin = window.location.origin;
    const currentHost = window.location.hostname;
    
    if (currentHost.includes('bonzi')) {
      targetServerUrlInput.value = currentOrigin;
      console.log(`[ThwompTOOLS] Auto-detected server: ${currentOrigin}`);
      return currentOrigin;
    }
    
    targetServerUrlInput.value = 'https://bonzi.gay';
    console.log(`[ThwompTOOLS] Using default server: https://bonzi.gay`);
    return 'https://bonzi.gay';
  }

  // Validate BonziWORLD server URL
  function validateServerUrl(url) {
    if (!url || url.trim() === '') {
      return { valid: false, message: 'Server URL cannot be empty' };
    }
    
    const trimmedUrl = url.trim();
    
    if (!trimmedUrl.toLowerCase().includes('bonzi')) {
      return { valid: false, message: 'Only BonziWORLD server URLs are allowed (must contain "bonzi")' };
    }
    
    try {
      const urlObj = new URL(trimmedUrl);
      if (!urlObj.protocol.startsWith('http')) {
        return { valid: false, message: 'URL must use HTTP or HTTPS protocol' };
      }
      return { valid: true, url: trimmedUrl };
    } catch (e) {
      return { valid: false, message: 'Invalid URL format' };
    }
  }

  // Get target server URL (from input or auto-detect)
  function getTargetServerUrl() {
    const targetServerUrlInput = document.getElementById('targetServerUrl');
    const inputValue = targetServerUrlInput.value.trim();
    
    if (inputValue) {
      const validation = validateServerUrl(inputValue);
      if (!validation.valid) {
        alert(`❌ Invalid Server URL: ${validation.message}`);
        console.error(`[ThwompTOOLS] ${validation.message}`);
        return null;
      }
      return validation.url;
    }
    
    return detectServerUrl();
  }

  function getBypassString() {
    const method = document.getElementById("bypassMethod").value;
    const count = bypassCounter++;
    
    switch(method) {
      case 'advanced':
        return ZERO_WIDTH_CHARS.map((_, i) => ZERO_WIDTH_CHARS[count % ZERO_WIDTH_CHARS.length]).slice(0, (count % 3) + 1).join('');
      
      case 'mixed':
        return MIXED_CHARS[count % MIXED_CHARS.length].repeat((count % 3) + 1);
      
      case 'invisible':
        return INVISIBLE_CHARS.map((_, i) => INVISIBLE_CHARS[(count + i) % INVISIBLE_CHARS.length]).slice(0, (count % 4) + 1).join('');
      
      case 'legacy':
      default:
        return '-'.repeat(count % 10);
    }
  }

  function getSocket() {
    const serverUrl = getTargetServerUrl();
    
    if (!serverUrl) {
      console.error('[ThwompTOOLS] Failed to get valid server URL');
      return null;
    }
    
    // If current page has socket and URL matches current origin, use existing socket
    if (serverUrl === window.location.origin && typeof socket !== "undefined") {
      return socket;
    } else if (customSocket && customSocket.connected) {
      return customSocket;
    } else {
      try {
        if (typeof io === "undefined") {
          alert("Socket.io not available. Please run this script on a BonziWORLD server.");
          return null;
        }
        
        customSocket = io(serverUrl, {
          forceNew: true,
          reconnection: document.getElementById("autoReconnect").checked,
          reconnectionDelay: 1000 + Math.random() * 2000,
          reconnectionAttempts: 10,
          timeout: 20000,
          transports: ['websocket', 'polling']
        });

        customSocket.on('connect', () => {
          updateStatus('Connected', '#00ff00');
          customSocket.emit("client", "MAIN");
          customSocket.emit("login", {
            passcode: "",
            name: "Anonymous",
            room: "default"
          });
        });

        customSocket.on('disconnect', () => {
          updateStatus('Disconnected', '#ff0000');
        });

        customSocket.on('connect_error', (error) => {
          updateStatus('Connection Error', '#ff9900');
          console.error('Connection error:', error);
        });

        return customSocket;
      } catch(e) {
        console.error('Failed to create custom socket:', e);
        return typeof socket !== "undefined" ? socket : null;
      }
    }
    
    return typeof socket !== "undefined" ? socket : null;
  }

  function updateStatus(text, color) {
    const statusEl = document.getElementById("connectionStatus");
    if (statusEl) {
      statusEl.textContent = text;
      statusEl.style.color = color;
    }
  }

  function updateMessageCount() {
    messageCount++;
    const countEl = document.getElementById("messageCount");
    if (countEl) {
      countEl.textContent = messageCount;
    }
  }

  const mimicTab = document.getElementById("mimicTab");
  const spamTab = document.getElementById("spamTab");
  const settingsTab = document.getElementById("settingsTab");
  const mainPage = document.getElementById("mainPage");
  const spamPage = document.getElementById("spamPage");
  const settingsPage = document.getElementById("settingsPage");

  function switchTab(activeTab, activePage) {
    [mimicTab, spamTab, settingsTab].forEach(tab => {
      tab.style.background = "#333";
      tab.style.color = "#fff";
    });
    [mainPage, spamPage, settingsPage].forEach(page => page.style.display = "none");
    
    activeTab.style.background = "#ff0000";
    activeTab.style.color = "#000";
    activePage.style.display = "block";
  }

  mimicTab.onclick = () => switchTab(mimicTab, mainPage);
  spamTab.onclick = () => switchTab(spamTab, spamPage);
  settingsTab.onclick = () => switchTab(settingsTab, settingsPage);

  const triggerBtn = document.getElementById("triggerBtn");
  const resetBtn = document.getElementById("resetBtn");

  triggerBtn.addEventListener("click", () => {
    const userColor = document.getElementById("userColor").value;
    const userHat = document.getElementById("userHat").value;
    const userName = document.getElementById("userName").value.trim();
    const userTalkText = document.getElementById("userTalkText").value.trim();

    if (!userName) return alert("Enter a nickname to mimic.");

    const sock = getSocket();
    if (sock) {
      sock.emit("command", { list: ["color", userColor] });
      sock.emit("command", { list: ["hat", userHat] });
      sock.emit("command", { list: ["name", userName] });
      if(userTalkText) {
        sock.emit("talk", { text: userTalkText });
        updateMessageCount();
      }

      const stealthMode = document.getElementById("stealthMode").checked;
      const resetDelay = stealthMode ? 2500 : 1200;

      setTimeout(() => {
        sock.emit("command", { list: ["color", "black"] });
        sock.emit("command", { list: ["hat", "bfdi"] });
        sock.emit("command", { list: ["name", "Anonymous"] });
      }, resetDelay);
    } else {
      alert("Socket not available. Check settings.");
    }
  });

  resetBtn.addEventListener("click", () => {
    const sock = getSocket();
    if (sock) {
      sock.emit("command", { list: ["color", "black"] });
      sock.emit("command", { list: ["hat", "bfdi"] });
      sock.emit("command", { list: ["name", "Anonymous"] });
    } else {
      alert("Socket not available.");
    }
  });

  const intervalSlider = document.getElementById("intervalSlider");
  const intervalLabel = document.getElementById("intervalLabel");
  const spamTextInput = document.getElementById("spamText");

  intervalSlider.addEventListener("input", () => {
    intervalLabel.textContent = intervalSlider.value;
  });

  document.getElementById("startSpam").addEventListener("click", () => {
    const delay = parseInt(intervalSlider.value);
    const spamText = spamTextInput.value.trim();
    if (!spamText) return alert("Enter a message to spam.");
    
    const sock = getSocket();
    if (sock) {
      if (spamInterval) clearInterval(spamInterval);
      bypassCounter = 0;
      
      const stealthMode = document.getElementById("stealthMode").checked;
      const actualDelay = stealthMode ? Math.max(delay, 500) : delay;
      
      spamInterval = setInterval(() => {
        const bypass = getBypassString();
        sock.emit("talk", { text: spamText + bypass });
        updateMessageCount();
      }, actualDelay);
      
      updateStatus('Spamming...', '#ffff00');
    } else {
      alert("Socket not available. Check settings.");
    }
  });

  document.getElementById("stopSpam").addEventListener("click", () => {
    if (spamInterval) {
      clearInterval(spamInterval);
      spamInterval = null;
      updateStatus('Stopped', '#ff9900');
    }
  });

  document.getElementById("startColorSpam").addEventListener("click", () => {
    const sock = getSocket();
    if (!sock) return alert("Socket not available.");
    if (colorSpamInterval) clearInterval(colorSpamInterval);
    
    const colors = ["red", "brown", "green", "blue", "purple", "black", "cyan", "yellow", "pink", "white"];
    let colorIndex = 0;
    
    colorSpamInterval = setInterval(() => {
      sock.emit("command", { list: ["color", colors[colorIndex % colors.length]] });
      colorIndex++;
      updateMessageCount();
    }, 100);
    
    updateStatus('Color Spamming...', '#00ffff');
  });

  document.getElementById("stopColorSpam").addEventListener("click", () => {
    if (colorSpamInterval) {
      clearInterval(colorSpamInterval);
      colorSpamInterval = null;
    }
  });

  document.getElementById("startHatSpam").addEventListener("click", () => {
    const sock = getSocket();
    if (!sock) return alert("Socket not available.");
    if (hatSpamInterval) clearInterval(hatSpamInterval);
    
    const hats = ["none", "bucket", "pot", "chain", "troll", "wizard", "kamala", "maga", "evil", "bfdi", "elon", "tophat", "witch", "horse", "bieber", "obama", "bowtie"];
    let hatIndex = 0;
    
    hatSpamInterval = setInterval(() => {
      sock.emit("command", { list: ["hat", hats[hatIndex % hats.length]] });
      hatIndex++;
      updateMessageCount();
    }, 100);
    
    updateStatus('Hat Spamming...', '#ffff00');
  });

  document.getElementById("stopHatSpam").addEventListener("click", () => {
    if (hatSpamInterval) {
      clearInterval(hatSpamInterval);
      hatSpamInterval = null;
    }
  });

  document.getElementById("startNameSpam").addEventListener("click", () => {
    const sock = getSocket();
    if (!sock) return alert("Socket not available.");
    if (nameSpamInterval) clearInterval(nameSpamInterval);
    
    const names = ["Anonymous", "User", "Guest", "Player", "Visitor", "Member", "Newbie", "Pro"];
    let nameIndex = 0;
    
    nameSpamInterval = setInterval(() => {
      sock.emit("command", { list: ["name", names[nameIndex % names.length] + Math.floor(Math.random() * 1000)] });
      nameIndex++;
      updateMessageCount();
    }, 150);
    
    updateStatus('Name Spamming...', '#ff00ff');
  });

  document.getElementById("stopNameSpam").addEventListener("click", () => {
    if (nameSpamInterval) {
      clearInterval(nameSpamInterval);
      nameSpamInterval = null;
    }
  });

  const menuBox = document.getElementById("menuBox");
  const dragHandle = document.getElementById("dragHandle");
  let isDragging = false;
  let offsetX, offsetY;

  dragHandle.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - menuBox.offsetLeft;
    offsetY = e.clientY - menuBox.offsetTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      menuBox.style.left = `${e.clientX - offsetX}px`;
      menuBox.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Auto-detect server URL on load
  detectServerUrl();

  console.log("%c[ThwompTOOLS v3] Loaded successfully!", "color: #ff0000; font-weight: bold; font-size: 14px;");
  console.log("%c[ThwompTOOLS v3] Features: Advanced bypass, bw.gay support, stealth mode", "color: #00ff00; font-size: 12px;");
})();
