(() => {
  console.log('%c[EVERYONE SPAM] Initializing mass spam tool...', 'color: #ff00ff; font-weight: bold;');
  
  // Check if running inside bonzi.gay
  const isBonziGay = window.location.hostname.includes('bonzi') || typeof socket !== 'undefined' || typeof bonzi !== 'undefined' || typeof usersPublic !== 'undefined';
  
  if (!isBonziGay) {
    console.error('%c⚠️ ERROR: This script must be run inside bonzi.gay!', 'color: #ff0000; font-size: 16px; font-weight: bold;');
    console.log('%c📋 HOW TO USE:', 'color: #ffff00; font-size: 14px; font-weight: bold;');
    console.log('%c1. Go to https://bonzi.gay in your browser', 'color: #00ff00;');
    console.log('%c2. Press F12 to open Developer Console', 'color: #00ff00;');
    console.log('%c3. Paste this script into the console', 'color: #00ff00;');
    console.log('%c4. Press Enter to run it', 'color: #00ff00;');
    alert('⚠️ ERROR: This script must be run INSIDE bonzi.gay!\n\nInstructions:\n1. Go to https://bonzi.gay\n2. Press F12 to open console\n3. Paste this script there\n4. Press Enter');
    return;
  }
  
  // Create GUI
  const html = `
    <div id="everyoneSpamBox" style="position:fixed;top:50px;left:50px;width:400px;background:linear-gradient(135deg, #330033 0%, #000000 100%);border:3px solid #ff00ff;border-radius:12px;padding:18px;box-shadow:0 8px 32px rgba(255,0,255,0.5);font-family:'Segoe UI',Arial,sans-serif;z-index:99999;color:#ff00ff;">
      <div id="dragHandleSpam" style="cursor:move;padding-bottom:12px;border-bottom:2px solid #ff00ff;">
        <h2 style="margin:0;text-align:center;color:#ff00ff;text-shadow:0 0 10px #ff00ff;">👥 MAKE EVERYONE SPAM</h2>
        <p style="margin:5px 0 0 0;text-align:center;font-size:11px;color:#ff66ff;">Mass Impersonation Tool</p>
      </div>

      <div style="margin-top:15px;">
        <div style="background:rgba(255,0,255,0.1);padding:12px;border-radius:6px;border:1px solid #ff00ff;margin-bottom:12px;">
          <div style="font-size:12px;margin-bottom:8px;color:#ff66ff;">STATUS:</div>
          <div id="statusText" style="font-size:14px;font-weight:bold;color:#ff00ff;">⏳ Ready to deploy</div>
        </div>

        <div style="background:rgba(255,0,255,0.15);padding:12px;border-radius:6px;border:1px solid #ff00ff;margin-bottom:12px;">
          <label style="display:block;margin-bottom:5px;color:#ff66ff;font-size:12px;">🌐 Target Server URL:</label>
          <input type="text" id="targetServerUrl" value="" placeholder="Auto-detected" style="width:100%;padding:8px;background:#1a001a;color:#ff00ff;border:1px solid #ff00ff;border-radius:4px;margin-bottom:5px;">
          <div style="font-size:10px;color:#ff66ff;margin-bottom:8px;line-height:1.3;">
            Auto-detects current BonziWORLD server. You can enter a custom BonziWORLD URL.
          </div>
          
          <label style="display:block;margin-bottom:5px;color:#ff66ff;font-size:12px;">👤 Bot Name Prefix:</label>
          <input type="text" id="botNamePrefix" value="Bot" placeholder="Bot name prefix..." style="width:100%;padding:8px;background:#1a001a;color:#ff00ff;border:1px solid #ff00ff;border-radius:4px;margin-bottom:8px;">
          
          <label style="display:block;margin-bottom:5px;color:#ff66ff;font-size:12px;">💬 Spam Message:</label>
          <input type="text" id="spamMessage" value="HACKED LOL" placeholder="Message to spam..." style="width:100%;padding:8px;background:#1a001a;color:#ff00ff;border:1px solid #ff00ff;border-radius:4px;margin-bottom:8px;">
          
          <label style="display:block;margin-bottom:5px;color:#ff66ff;font-size:12px;">🖼️ Image URLs (optional, one per line):</label>
          <textarea id="imageUrls" rows="3" placeholder="" style="width:100%;padding:8px;background:#1a001a;color:#ff00ff;border:1px solid #ff00ff;border-radius:4px;margin-bottom:5px;resize:vertical;font-size:11px;font-family:monospace;"></textarea>
          <div style="font-size:10px;color:#ff66ff;margin-bottom:8px;line-height:1.3;">
            Enter multiple URLs (one per line). Bots will randomly pick from the list.
          </div>
          
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;">
            <div>
              <label style="display:block;margin-bottom:5px;color:#ff66ff;font-size:12px;">🎨 Custom Color:</label>
              <input type="text" id="customColor" value="" placeholder="Auto" style="width:100%;padding:8px;background:#1a001a;color:#ff00ff;border:1px solid #ff00ff;border-radius:4px;">
            </div>
            <div>
              <label style="display:block;margin-bottom:5px;color:#ff66ff;font-size:12px;">🎩 Custom Hat:</label>
              <input type="text" id="customHat" value="" placeholder="Auto" style="width:100%;padding:8px;background:#1a001a;color:#ff00ff;border:1px solid #ff00ff;border-radius:4px;">
            </div>
          </div>
          
          <label style="display:block;margin-bottom:5px;color:#ff66ff;font-size:12px;">Spam Speed (ms):</label>
          <input type="range" id="spamSpeed" min="100" max="3000" value="800" style="width:100%;margin-bottom:5px;">
          <div style="text-align:center;color:#ff66ff;font-size:11px;"><span id="speedValue">800</span>ms</div>
        </div>

        <button id="startEveryoneSpam" style="width:100%;padding:12px;background:#ff00ff;color:#000;border:none;border-radius:6px;font-weight:bold;cursor:pointer;font-size:14px;margin-bottom:8px;">🚀 START MASS SPAM</button>
        
        <button id="downloadLogs" style="width:100%;padding:10px;background:#006600;color:#00ff00;border:1px solid #00ff00;border-radius:6px;cursor:pointer;font-size:12px;margin-bottom:8px;display:none;">📥 DOWNLOAD LOGS (TXT)</button>
        
        <button id="stopEveryoneSpam" style="width:100%;padding:10px;background:#660066;color:#ff00ff;border:1px solid #ff00ff;border-radius:6px;cursor:pointer;font-size:12px;margin-bottom:12px;">⏹ STOP ALL BOTS</button>

        <div style="background:rgba(255,255,0,0.1);padding:10px;border-radius:6px;border:1px solid #ffff00;">
          <div style="font-size:11px;color:#ffff00;margin-bottom:8px;">📊 ACTIVE BOTS:</div>
          <div id="botsList" style="font-size:10px;color:#ffcc00;line-height:1.6;max-height:120px;overflow-y:auto;">
            No bots deployed yet
          </div>
        </div>

        <div style="margin-top:12px;padding:8px;background:rgba(255,0,0,0.1);border-radius:6px;border:1px solid #ff0000;">
          <small style="color:#ff6666;font-size:10px;">
            Bots: <span id="botCount">0</span> | 
            Messages: <span id="messageCount">0</span>
          </small>
        </div>

        <button id="closeEveryoneSpam" style="width:100%;padding:8px;background:#330000;color:#ff6666;border:1px solid #ff0000;border-radius:6px;cursor:pointer;margin-top:10px;font-size:11px;">✖ CLOSE</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);

  const box = document.getElementById('everyoneSpamBox');
  const dragHandle = document.getElementById('dragHandleSpam');
  const statusText = document.getElementById('statusText');
  const targetServerUrlInput = document.getElementById('targetServerUrl');
  const botNamePrefixInput = document.getElementById('botNamePrefix');
  const spamMessageInput = document.getElementById('spamMessage');
  const imageUrlsInput = document.getElementById('imageUrls');
  const customColorInput = document.getElementById('customColor');
  const customHatInput = document.getElementById('customHat');
  const spamSpeedInput = document.getElementById('spamSpeed');
  const speedValue = document.getElementById('speedValue');
  const startBtn = document.getElementById('startEveryoneSpam');
  const downloadLogsBtn = document.getElementById('downloadLogs');
  const stopBtn = document.getElementById('stopEveryoneSpam');
  const closeBtn = document.getElementById('closeEveryoneSpam');
  const botsList = document.getElementById('botsList');
  const botCountSpan = document.getElementById('botCount');
  const messageCountSpan = document.getElementById('messageCount');

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
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Update speed display
  spamSpeedInput.addEventListener('input', (e) => {
    speedValue.textContent = e.target.value;
  });

  // State
  let activeBots = [];
  let detectedUsers = [];
  let totalMessages = 0;
  let isRunning = false;
  let currentRoom = 'default';
  let myGuid = null;
  let liveUserCount = 0;
  let spamStartTime = null;
  let activityLog = [];

  // Helper function to get random image URL from list
  function getRandomImageUrl() {
    const urls = imageUrlsInput.value.trim();
    if (!urls) return null;
    
    const urlList = urls.split('\n').map(u => u.trim()).filter(u => u.length > 0);
    if (urlList.length === 0) return null;
    
    return urlList[Math.floor(Math.random() * urlList.length)];
  }

  // Auto-detect and validate BonziWORLD server URL
  function detectServerUrl() {
    const currentOrigin = window.location.origin;
    const currentHost = window.location.hostname;
    
    // Check if current page is a BonziWORLD server
    if (currentHost.includes('bonzi')) {
      targetServerUrlInput.value = currentOrigin;
      console.log(`%c[EVERYONE SPAM] Auto-detected server: ${currentOrigin}`, 'color: #00ff00');
      return currentOrigin;
    }
    
    // Default fallback
    targetServerUrlInput.value = 'https://bonzi.gay';
    console.log(`%c[EVERYONE SPAM] Using default server: https://bonzi.gay`, 'color: #ffff00');
    return 'https://bonzi.gay';
  }

  // Validate BonziWORLD server URL
  function validateServerUrl(url) {
    if (!url || url.trim() === '') {
      return { valid: false, message: 'Server URL cannot be empty' };
    }
    
    const trimmedUrl = url.trim();
    
    // Check if it contains 'bonzi' (case insensitive)
    if (!trimmedUrl.toLowerCase().includes('bonzi')) {
      return { valid: false, message: 'Only BonziWORLD server URLs are allowed (must contain "bonzi")' };
    }
    
    // Check if it's a valid URL format
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
    const inputValue = targetServerUrlInput.value.trim();
    
    if (inputValue) {
      const validation = validateServerUrl(inputValue);
      if (!validation.valid) {
        alert(`❌ Invalid Server URL: ${validation.message}`);
        console.error(`%c[EVERYONE SPAM] ${validation.message}`, 'color: #ff0000');
        return null;
      }
      return validation.url;
    }
    
    // Auto-detect if empty
    return detectServerUrl();
  }

  // Detect current room
  function detectCurrentRoom() {
    // Try to get room from URL hash
    if (window.location.hash) {
      const hashRoom = window.location.hash.replace('#', '');
      if (hashRoom) {
        currentRoom = hashRoom;
        console.log(`%c[EVERYONE SPAM] Room detected from URL: ${currentRoom}`, 'color: #00ff00');
        return currentRoom;
      }
    }
    
    // Try to get room from roomID variable
    if (typeof roomID !== 'undefined' && roomID) {
      currentRoom = roomID;
      console.log(`%c[EVERYONE SPAM] Room detected from roomID: ${currentRoom}`, 'color: #00ff00');
      return currentRoom;
    }
    
    console.log(`%c[EVERYONE SPAM] No room detected, using default`, 'color: #ffff00');
    return 'default';
  }

  // Detect my own GUID
  function detectMyGuid() {
    if (typeof myGUID !== 'undefined') {
      myGuid = myGUID;
      console.log(`%c[EVERYONE SPAM] My GUID: ${myGuid}`, 'color: #00ff00');
    }
    if (typeof guid !== 'undefined') {
      myGuid = guid;
      console.log(`%c[EVERYONE SPAM] My GUID: ${myGuid}`, 'color: #00ff00');
    }
  }

  // Advanced bypass methods
  function applyBypass(text, count) {
    const invisibleChars = ['\u200B', '\u200C', '\u200D', '\u2060', '\u2063', '\uFEFF'];
    const randomInvisible = () => invisibleChars[Math.floor(Math.random() * invisibleChars.length)];
    
    const methods = [
      // Method 1: Multiple zero-width characters
      () => text + randomInvisible().repeat(3 + (count % 5)),
      
      // Method 2: Random number + invisible
      () => text + ' ' + Math.floor(Math.random() * 10000) + randomInvisible(),
      
      // Method 3: Invisible at start and end
      () => randomInvisible() + text + randomInvisible().repeat(2),
      
      // Method 4: Random spaces + invisible
      () => text + ' '.repeat(1 + (count % 3)) + randomInvisible(),
      
      // Method 5: Legacy dashes + invisible
      () => text + '-'.repeat(count % 6) + randomInvisible(),
      
      // Method 6: Mix of random chars
      () => text + randomInvisible() + Math.floor(Math.random() * 999) + randomInvisible(),
      
      // Method 7: Unicode variation selectors
      () => text + '\uFE0E' + randomInvisible().repeat(2),
      
      // Method 8: Random emoji variation
      () => text + [' 🔥', ' ⚡', ' 💀', ' 👻', ''][Math.floor(Math.random() * 5)] + randomInvisible(),
    ];
    
    // Use multiple methods randomly
    const method = methods[count % methods.length];
    return method();
  }

  // Detect users in the room
  function detectUsers() {
    detectedUsers = [];
    detectMyGuid();
    
    // Method 1: Check bonzi object (if available)
    if (typeof bonzi !== 'undefined' && bonzi) {
      for (let guid in bonzi) {
        // Skip myself
        if (guid === myGuid) continue;
        
        if (bonzi[guid] && bonzi[guid].userPublic) {
          const user = {
            guid: guid,
            name: bonzi[guid].userPublic.name || 'Anonymous',
            color: bonzi[guid].userPublic.color || 'red',
            hat: bonzi[guid].userPublic.hat || 'none'
          };
          detectedUsers.push(user);
          console.log(`%c[EVERYONE SPAM] Detected user from bonzi object: ${user.name}`, 'color: #ff00ff');
        }
      }
    }

    // Method 2: Check usersPublic object (alternative structure)
    if (typeof usersPublic !== 'undefined' && usersPublic) {
      // Check if it's a Map
      if (usersPublic instanceof Map) {
        liveUserCount = usersPublic.size; // Update live count
        console.log(`%c[EVERYONE SPAM] LIVE User Count: ${liveUserCount}`, 'color: #00ff00; font-weight: bold;');
        usersPublic.forEach((userData, guid) => {
          // Skip myself
          if (guid === myGuid) return;
          
          if (userData) {
            const user = {
              guid: guid,
              name: userData.name || 'Anonymous',
              color: userData.color || 'red',
              hat: userData.hat || 'none'
            };
            // Check if not already added
            if (!detectedUsers.find(u => u.guid === guid)) {
              detectedUsers.push(user);
              console.log(`%c[EVERYONE SPAM] Detected user from usersPublic Map: ${user.name} (${guid})`, 'color: #ff00ff');
            }
          }
        });
      } else {
        // Regular object
        for (let guid in usersPublic) {
          // Skip myself
          if (guid === myGuid) continue;
          
          if (usersPublic[guid]) {
            const user = {
              guid: guid,
              name: usersPublic[guid].name || 'Anonymous',
              color: usersPublic[guid].color || 'red',
              hat: usersPublic[guid].hat || 'none'
            };
            // Check if not already added
            if (!detectedUsers.find(u => u.guid === guid)) {
              detectedUsers.push(user);
              console.log(`%c[EVERYONE SPAM] Detected user from usersPublic: ${user.name}`, 'color: #ff00ff');
            }
          }
        }
      }
    }

    // Method 3: Listen to socket for REAL-TIME user data
    if (typeof socket !== 'undefined' && socket && !window.everyoneSpamUserListener) {
      window.everyoneSpamUserListener = true;
      
      // Listen for room data which contains all users
      socket.on('room', (data) => {
        console.log('%c[EVERYONE SPAM] Room data received:', 'color: #ff00ff', data);
        
        // Check if data has users
        if (data && data.users) {
          for (let guid in data.users) {
            // Skip myself
            if (guid === myGuid) continue;
            
            const userData = data.users[guid];
            const exists = detectedUsers.find(u => u.guid === guid);
            if (!exists && userData) {
              const user = {
                guid: guid,
                name: userData.name || 'Anonymous',
                color: userData.color || 'red',
                hat: userData.hat || 'none'
              };
              detectedUsers.push(user);
              console.log(`%c[EVERYONE SPAM] ✓ New user joined: ${user.name}`, 'color: #00ff00');
              
              // Auto-spawn control bot when new user joins
              if (isRunning && activeBots.length < 50) { // Safety limit at 50
                setTimeout(() => {
                  const bot = createControlBot(activeBots.length);
                  if (bot) {
                    activeBots.push(bot);
                    updateBotsList();
                    statusText.textContent = `✅ ${activeBots.length} bots active!`;
                    console.log(`%c[EVERYONE SPAM] 🤖 Auto-spawned control bot (new user joined)`, 'color: #00ff00');
                  }
                }, 2000 + Math.random() * 1000);
              }
            }
          }
        }
      });
      
      // Listen for individual user updates (joins)
      socket.on('update', (data) => {
        if (data && data.guid) {
          // Skip myself
          if (data.guid === myGuid) return;
          
          const exists = detectedUsers.find(u => u.guid === data.guid);
          if (!exists) {
            const user = {
              guid: data.guid,
              name: data.name || 'Anonymous',
              color: data.color || 'red',
              hat: data.hat || 'none'
            };
            detectedUsers.push(user);
            console.log(`%c[EVERYONE SPAM] ✓ User update detected: ${user.name}`, 'color: #ff00ff');
            
            // Auto-spawn control bot if already running
            if (isRunning && activeBots.length < 50) { // Safety limit at 50
              setTimeout(() => {
                const bot = createControlBot(activeBots.length);
                if (bot) {
                  activeBots.push(bot);
                  updateBotsList();
                  statusText.textContent = `✅ ${activeBots.length} bots active!`;
                  console.log(`%c[EVERYONE SPAM] 🤖 Auto-spawned control bot`, 'color: #00ff00');
                }
              }, 2000 + Math.random() * 1000);
            }
          }
        }
      });
      
      // Listen for user disconnects
      socket.on('disconnect', (data) => {
        if (data && data.guid) {
          console.log(`%c[EVERYONE SPAM] ✗ User left: ${data.guid}`, 'color: #ff6600');
          // Remove from detected users
          detectedUsers = detectedUsers.filter(u => u.guid !== data.guid);
        }
      });
    }

    // Update live count
    liveUserCount = detectedUsers.length;
    console.log(`%c[EVERYONE SPAM] LIVE User Count: ${liveUserCount}`, 'color: #00ff00; font-weight: bold;');
    return detectedUsers;
  }

  // Create control bot (not impersonating)
  function createControlBot(index) {
    const colors = ['purple', 'blue', 'green', 'yellow', 'red', 'pink', 'brown', 'black', 'cyan', 'white'];
    const hats = ['tophat', 'bfdi', 'bieber', 'evil', 'elon', 'kamala', 'maga', 'troll', 'bucket', 'obama', 'dank', 'witch', 'wizard'];
    
    // Use custom name prefix or default to "Bot"
    const namePrefix = botNamePrefixInput.value.trim() || 'Bot';
    const botName = `${namePrefix}${index + 1}`;
    
    // Use custom color if provided, otherwise random
    const customColor = customColorInput.value.trim();
    const botColor = customColor || colors[Math.floor(Math.random() * colors.length)];
    
    // Use custom hat if provided, otherwise random
    const customHat = customHatInput.value.trim();
    const botHat = customHat || hats[Math.floor(Math.random() * hats.length)];
    
    const user = {
      guid: `bot_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`,
      name: botName,
      color: botColor,
      hat: botHat
    };
    
    console.log(`%c[EVERYONE SPAM] Creating bot with name: ${botName}, color: ${botColor}, hat: ${botHat}`, 'color: #00ffff');
    
    return createBotConnection(user);
  }

  // Create bot connection (used by both control and impersonation)
  function createBotConnection(user) {
    try {
      // Get target server URL (from input or auto-detect)
      const serverUrl = getTargetServerUrl();
      if (!serverUrl) {
        console.error(`%c[EVERYONE SPAM] Failed to get valid server URL`, 'color: #ff0000');
        return null;
      }
      
      const botSocket = io(serverUrl, {
        forceNew: false,
        reconnection: true,
        reconnectionDelay: 4000 + Math.random() * 6000,
        reconnectionDelayMax: 20000,
        reconnectionAttempts: 20,
        timeout: 50000,
        transports: ['websocket', 'polling'],
        upgrade: true,
        rememberUpgrade: true,
        perMessageDeflate: false,
        path: '/socket.io/'
      });
      
      let connectionAttempts = 0;
      let tooManyConnectionsRetries = 0;
      const maxTooManyConnectionsRetries = 15;

      const bot = {
        socket: botSocket,
        user: user,
        messageCount: 0,
        interval: null,
        connected: false
      };

      botSocket.on('connect', () => {
        connectionAttempts++;
        console.log(`%c[EVERYONE SPAM] ✓ Bot connected for ${user.name} (attempt ${connectionAttempts})`, 'color: #00ff00');
        console.log(`%c[EVERYONE SPAM] ✓ Socket.IO connection established for ${user.name}`, 'color: #00ff00; font-weight: bold;');
        console.log(`%c[EVERYONE SPAM] Transport: ${botSocket.io.engine.transport.name}`, 'color: #00ffff');
        bot.connected = true;
        
        // Reset retry counter on successful connection
        tooManyConnectionsRetries = 0;

        // Login to room with random delay to avoid rate limits
        const loginDelay = 1000 + Math.random() * 2000;
        
        setTimeout(() => {
          botSocket.emit('client', 'MAIN');
        }, loginDelay);
        
        // Wait a bit longer before sending login
        setTimeout(() => {
          botSocket.emit('login', {
            passcode: '',
            name: user.name,
            room: currentRoom
          });
          
          console.log(`%c[EVERYONE SPAM] ✓ Bot "${user.name}" logged into room: ${currentRoom}`, 'color: #00ff00');
        }, loginDelay + 500);

        // Set appearance after joining room
        setTimeout(() => {
          botSocket.emit('command', { list: ['color', user.color] });
          setTimeout(() => {
            botSocket.emit('command', { list: ['hat', user.hat] });
          }, 100);
        }, 400);

        // Listen to OTHER users' messages and react
        botSocket.on('talk', (data) => {
          if (data && data.text && data.guid !== user.guid && isRunning && bot.connected) {
            // React to user messages
            console.log(`%c[${user.name}] Detected message from ${data.guid}: "${data.text}"`, 'color: #ffcc00');
            
            // Random chance to respond (30%)
            if (Math.random() < 0.3) {
              setTimeout(() => {
                const reactions = [
                  data.text, // Repeat their message
                  applyBypass(data.text, bot.messageCount), // Echo with bypass
                  applyBypass(spamMessageInput.value, bot.messageCount) // Custom message
                ];
                const reaction = reactions[Math.floor(Math.random() * reactions.length)];
                botSocket.emit('talk', { text: reaction });
                bot.messageCount++;
                totalMessages++;
                messageCountSpan.textContent = totalMessages;
                
                // Send image if URLs are provided
                const imageUrl = getRandomImageUrl();
                if (imageUrl && Math.random() < 0.5) {
                  setTimeout(() => {
                    botSocket.emit('command', { list: ['image', imageUrl] });
                  }, 300 + Math.random() * 500);
                }
              }, 500 + Math.random() * 1500);
            }
          }
        });

        // Start regular spamming
        setTimeout(() => {
          const baseSpeed = parseInt(spamSpeedInput.value);
          bot.interval = setInterval(() => {
            if (isRunning && bot.connected) {
              const message = applyBypass(spamMessageInput.value, bot.messageCount);
              botSocket.emit('talk', { text: message });
              bot.messageCount++;
              totalMessages++;
              messageCountSpan.textContent = totalMessages;
              
              // Send image if URLs are provided (randomly selected)
              const imageUrl = getRandomImageUrl();
              if (imageUrl) {
                setTimeout(() => {
                  botSocket.emit('command', { list: ['image', imageUrl] });
                }, 200 + Math.random() * 300);
              }
              
              // Randomly change color/hat
              if (bot.messageCount % (5 + Math.floor(Math.random() * 5)) === 0) {
                const colors = ['purple', 'blue', 'green', 'yellow', 'red', 'pink', 'brown', 'black', 'cyan'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                botSocket.emit('command', { list: ['color', randomColor] });
              }
            }
          }, baseSpeed + Math.random() * 200);
          
          console.log(`%c[EVERYONE SPAM] Bot "${user.name}" started spamming at ${baseSpeed}ms interval`, 'color: #00ff00');
        }, 800);

        updateBotsList();
      });

      botSocket.on('disconnect', (reason) => {
        bot.connected = false;
        console.log(`%c[EVERYONE SPAM] Bot disconnected: ${user.name} (${reason})`, 'color: #ff0000');
        
        // Auto-reconnect if server disconnected us
        if (isRunning && reason === 'io server disconnect') {
          console.log(`%c[EVERYONE SPAM] Reconnecting bot: ${user.name}`, 'color: #ffff00');
          setTimeout(() => botSocket.connect(), 2000 + Math.random() * 1000);
        }
      });

      botSocket.on('connect_error', (error) => {
        const errorMsg = (error.message || error.toString()).toLowerCase();
        console.error(`%c[EVERYONE SPAM] ✗ Connection error for ${user.name}:`, 'color: #ff0000', error.message || error);
        
        if (errorMsg.includes('too many connections') || errorMsg.includes('rate limit') || errorMsg.includes('429')) {
          tooManyConnectionsRetries++;
          const retryDelay = 10000 + (tooManyConnectionsRetries * 5000) + Math.random() * 8000;
          
          if (tooManyConnectionsRetries <= maxTooManyConnectionsRetries) {
            console.log(`%c[EVERYONE SPAM] ⚠️ TOO MANY CONNECTIONS - ${user.name} will retry in ${(retryDelay/1000).toFixed(1)}s (attempt ${tooManyConnectionsRetries}/${maxTooManyConnectionsRetries})`, 'color: #ffaa00; font-weight: bold;');
            
            setTimeout(() => {
              if (isRunning && !bot.connected) {
                console.log(`%c[EVERYONE SPAM] 🔄 Retrying connection for ${user.name}...`, 'color: #00aaff');
                try {
                  botSocket.io.opts.transports = ['polling', 'websocket'];
                  botSocket.connect();
                } catch (e) {
                  console.error(`%c[EVERYONE SPAM] Retry error for ${user.name}:`, 'color: #ff0000', e);
                }
              }
            }, retryDelay);
          } else {
            console.error(`%c[EVERYONE SPAM] ❌ Max retries reached for ${user.name}, giving up`, 'color: #ff0000; font-weight: bold;');
          }
        } else if (errorMsg.includes('timeout')) {
          console.log(`%c[EVERYONE SPAM] ⚠️ Timeout for ${user.name}, will retry...`, 'color: #ffff00');
        }
      });
      
      botSocket.on('error', (error) => {
        const errorMsg = (error.message || error.toString()).toLowerCase();
        console.error(`%c[EVERYONE SPAM] ✗ Bot error (${user.name}):`, 'color: #ff0000', error);
        
        if (errorMsg.includes('too many connections') || errorMsg.includes('rate limit')) {
          tooManyConnectionsRetries++;
          const retryDelay = 12000 + (tooManyConnectionsRetries * 4000) + Math.random() * 5000;
          
          if (tooManyConnectionsRetries <= maxTooManyConnectionsRetries) {
            console.log(`%c[EVERYONE SPAM] ⚠️ Rate limited (${user.name}), retrying in ${(retryDelay/1000).toFixed(1)}s... (${tooManyConnectionsRetries}/${maxTooManyConnectionsRetries})`, 'color: #ffaa00; font-weight: bold;');
            setTimeout(() => {
              if (isRunning && !bot.connected) {
                try {
                  botSocket.io.opts.transports = ['polling', 'websocket'];
                  botSocket.connect();
                } catch (e) {
                  console.error(`%c[EVERYONE SPAM] Retry error for ${user.name}:`, 'color: #ff0000', e);
                }
              }
            }, retryDelay);
          } else {
            console.error(`%c[EVERYONE SPAM] ❌ Max retries reached for ${user.name}`, 'color: #ff0000; font-weight: bold;');
          }
        }
      });
      
      // Listen for successful room join
      botSocket.on('room', (data) => {
        console.log(`%c[EVERYONE SPAM] Bot "${user.name}" room data received`, 'color: #00ff00', data);
      });

      return bot;
    } catch (error) {
      console.error(`%c[EVERYONE SPAM] Failed to create bot:`, 'color: #ff0000', error);
      return null;
    }
  }

  // Update bots list display
  function updateBotsList() {
    const list = activeBots.map(bot => {
      const status = bot.connected ? '🟢' : '🔴';
      const transport = bot.socket && bot.socket.io && bot.socket.io.engine ? bot.socket.io.engine.transport.name : 'N/A';
      return `${status} ${bot.user.name} (${bot.user.color}/${bot.user.hat}) [${transport}] - ${bot.messageCount} msgs`;
    }).join('<br>');
    
    botsList.innerHTML = list || 'No active bots';
    botCountSpan.textContent = activeBots.length;
  }

  // Start mass spam
  startBtn.addEventListener('click', () => {
    if (isRunning) {
      statusText.textContent = '⚠️ Already running!';
      return;
    }

    console.log('%c[EVERYONE SPAM] Starting mass spam attack...', 'color: #ff00ff; font-weight: bold;');
    
    // Show download button
    downloadLogsBtn.style.display = 'block';
    
    // Record start time
    spamStartTime = Date.now();
    activityLog.push(`[${new Date().toLocaleTimeString()}] Mass spam attack started`);
    
    // Detect current room first
    detectCurrentRoom();
    console.log(`%c[EVERYONE SPAM] Target room: ${currentRoom}`, 'color: #ffff00; font-weight: bold;');
    
    statusText.textContent = '🔍 Detecting users...';

    // Detect users
    const users = detectUsers();
    
    // Debug output
    console.log('%c[EVERYONE SPAM] === DEBUG INFO ===', 'color: #ffff00; font-weight: bold;');
    console.log('bonzi object exists:', typeof bonzi !== 'undefined');
    console.log('usersPublic object exists:', typeof usersPublic !== 'undefined');
    console.log('socket object exists:', typeof socket !== 'undefined');
    console.log('My GUID:', myGuid);
    console.log('Current Room:', currentRoom);
    if (typeof bonzi !== 'undefined') console.log('bonzi object:', bonzi);
    if (typeof usersPublic !== 'undefined') console.log('usersPublic object:', usersPublic);
    
    if (users.length === 0) {
      statusText.textContent = '❌ No users detected!';
      alert('No users found! Make sure you are connected to a room with other users.');
      activityLog.push(`[${new Date().toLocaleTimeString()}] ERROR: No users detected in room`);
      downloadLogsBtn.style.display = 'none';
      return;
    }
    
    activityLog.push(`[${new Date().toLocaleTimeString()}] Detected ${users.length} users in room: ${currentRoom}`);

    // Use LIVE user count from socket.io
    const numBots = liveUserCount || users.length;
    
    console.log(`%c[EVERYONE SPAM] LIVE COUNT: ${numBots} users in room`, 'color: #ff00ff; font-weight: bold;');
    statusText.textContent = `🚀 Spawning ${numBots} control bots...`;
    console.log(`%c[EVERYONE SPAM] Creating ${numBots} control bots matching live user count`, 'color: #ffff00');

    // Create control bots matching user count
    isRunning = true;
    let spawnCount = 0;

    for (let i = 0; i < numBots; i++) {
      setTimeout(() => {
        const bot = createControlBot(i);
        if (bot) {
          activeBots.push(bot);
          spawnCount++;
          statusText.textContent = `✅ ${spawnCount}/${numBots} bots spawning...`;
          updateBotsList();
          activityLog.push(`[${new Date().toLocaleTimeString()}] Bot ${spawnCount}/${numBots} spawned: ${bot.user.name}`);
          console.log(`%c[EVERYONE SPAM] Control bot ${spawnCount}/${numBots} spawned`, 'color: #00ff00');
        }
      }, i * 5000 + Math.random() * 2000); // 5-7 seconds between each bot to avoid "too many connections"
    }

    setTimeout(() => {
      statusText.textContent = `✅ ${activeBots.length}/${numBots} bots active!`;
      activityLog.push(`[${new Date().toLocaleTimeString()}] Deployment complete: ${activeBots.length}/${numBots} bots active`);
      console.log(`%c[EVERYONE SPAM] Deployment complete! ${activeBots.length}/${numBots} bots connected`, 'color: #00ff00; font-weight: bold;');
    }, numBots * 6000 + 3000);

    // Update interval
    setInterval(() => {
      if (isRunning) {
        updateBotsList();
      }
    }, 2000);
  });

  // Stop all bots
  stopBtn.addEventListener('click', () => {
    console.log('%c[EVERYONE SPAM] Stopping all bots...', 'color: #ff0000; font-weight: bold;');
    isRunning = false;
    
    const stopTime = Date.now();
    const duration = spamStartTime ? Math.floor((stopTime - spamStartTime) / 1000) : 0;
    activityLog.push(`[${new Date().toLocaleTimeString()}] Mass spam stopped - Duration: ${duration}s, Total messages: ${totalMessages}`);

    activeBots.forEach(bot => {
      if (bot.interval) clearInterval(bot.interval);
      if (bot.socket) {
        bot.socket.disconnect();
        bot.socket.close();
      }
    });

    activeBots = [];
    detectedUsers = [];
    totalMessages = 0;
    
    statusText.textContent = '⏹ Stopped';
    botsList.innerHTML = 'No bots deployed yet';
    botCountSpan.textContent = '0';
    messageCountSpan.textContent = '0';
    
    console.log('%c[EVERYONE SPAM] All bots stopped and disconnected', 'color: #ff0000');
  });

  // Download logs function
  function downloadLogs() {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');
    
    let logContent = `=== MAKE EVERYONE SPAM - BOT ACTIVITY LOG ===\n`;
    logContent += `Generated: ${now.toLocaleString()}\n`;
    logContent += `Target Server: ${targetServerUrlInput.value || 'Auto-detected'}\n`;
    logContent += `Target Room: ${currentRoom}\n`;
    logContent += `Spam Duration: ${spamStartTime ? Math.floor((Date.now() - spamStartTime) / 1000) : 0} seconds\n`;
    logContent += `\n`;
    logContent += `=== CONFIGURATION ===\n`;
    logContent += `Bot Name Prefix: ${botNamePrefixInput.value || 'Bot'}\n`;
    logContent += `Spam Message: ${spamMessageInput.value}\n`;
    const imageUrls = imageUrlsInput.value.trim();
    if (imageUrls) {
      const urlList = imageUrls.split('\n').map(u => u.trim()).filter(u => u.length > 0);
      logContent += `Image URLs (${urlList.length} total):\n`;
      urlList.forEach((url, idx) => {
        logContent += `  ${idx + 1}. ${url}\n`;
      });
    } else {
      logContent += `Image URLs: None\n`;
    }
    logContent += `Custom Color: ${customColorInput.value || 'Auto'}\n`;
    logContent += `Custom Hat: ${customHatInput.value || 'Auto'}\n`;
    logContent += `Spam Speed: ${spamSpeedInput.value}ms\n`;
    logContent += `\n`;
    logContent += `=== STATISTICS ===\n`;
    logContent += `Total Bots: ${activeBots.length}\n`;
    logContent += `Connected Bots: ${activeBots.filter(b => b.connected).length}\n`;
    logContent += `Total Messages Sent: ${totalMessages}\n`;
    logContent += `\n`;
    logContent += `=== BOT DETAILS ===\n`;
    
    activeBots.forEach((bot, index) => {
      const transport = bot.socket && bot.socket.io && bot.socket.io.engine ? bot.socket.io.engine.transport.name : 'N/A';
      const status = bot.connected ? 'CONNECTED' : 'DISCONNECTED';
      logContent += `\nBot #${index + 1}:\n`;
      logContent += `  Name: ${bot.user.name}\n`;
      logContent += `  GUID: ${bot.user.guid}\n`;
      logContent += `  Color: ${bot.user.color}\n`;
      logContent += `  Hat: ${bot.user.hat}\n`;
      logContent += `  Status: ${status}\n`;
      logContent += `  Transport: ${transport}\n`;
      logContent += `  Messages Sent: ${bot.messageCount}\n`;
    });
    
    logContent += `\n=== ACTIVITY LOG ===\n`;
    activityLog.forEach(entry => {
      logContent += `${entry}\n`;
    });
    
    logContent += `\n=== END OF LOG ===\n`;
    
    // Create download
    const blob = new Blob([logContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `everyone-spam-log-${timestamp}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('%c[EVERYONE SPAM] 📥 Log file downloaded', 'color: #00ff00; font-weight: bold;');
    activityLog.push(`[${new Date().toLocaleTimeString()}] Log file downloaded: everyone-spam-log-${timestamp}.txt`);
  }
  
  // Download button
  downloadLogsBtn.addEventListener('click', downloadLogs);

  // Close tool
  closeBtn.addEventListener('click', () => {
    if (isRunning) {
      const confirm = window.confirm('Bots are still running! Stop them before closing?');
      if (confirm) {
        stopBtn.click();
      }
    }
    box.remove();
    console.log('%c[EVERYONE SPAM] Tool closed', 'color: #ff0000');
  });

  // Auto-detect server URL on load
  detectServerUrl();
  
  console.log('%c[EVERYONE SPAM] Tool initialized!', 'color: #ff00ff; font-weight: bold;');
  console.log('%c[EVERYONE SPAM] Ready to impersonate all users in room', 'color: #ff00ff');

  // Auto-detect users on start and update LIVE count
  setTimeout(() => {
    detectUsers();
    
    // Update status periodically with LIVE count
    const updateStatus = setInterval(() => {
      detectUsers(); // Re-detect to get live count
      if (liveUserCount > 0) {
        console.log(`%c[EVERYONE SPAM] LIVE: ${liveUserCount} users in room`, 'color: #ff00ff; font-weight: bold;');
        statusText.textContent = `✓ Ready (LIVE: ${liveUserCount} users)`;
      } else {
        statusText.textContent = '⏳ Waiting for users...';
      }
    }, 3000);
    
    // Keep updating indefinitely for live count
  }, 1000);

  // Also provide a debug helper
  window.debugEveryoneSpam = () => {
    console.log('%c=== EVERYONE SPAM DEBUG ===', 'color: #ff00ff; font-size: 16px; font-weight: bold;');
    detectMyGuid();
    detectCurrentRoom();
    console.log('Current Room:', currentRoom);
    console.log('My GUID:', myGuid);
    console.log('Detected users:', detectedUsers);
    console.log('bonzi object:', typeof bonzi !== 'undefined' ? bonzi : 'not found');
    console.log('usersPublic object:', typeof usersPublic !== 'undefined' ? usersPublic : 'not found');
    console.log('socket object:', typeof socket !== 'undefined' ? socket : 'not found');
    console.log('roomID variable:', typeof roomID !== 'undefined' ? roomID : 'not found');
    console.log('URL hash:', window.location.hash || 'none');
    
    // Try to detect users manually
    const testUsers = detectUsers();
    console.log(`Total users detected: ${testUsers.length}`);
    console.log('Users:', testUsers);
  };
  
  // Initial room detection
  detectCurrentRoom();
  console.log(`%c[EVERYONE SPAM] Ready! You are in room: ${currentRoom}`, 'color: #00ff00; font-weight: bold;');
})();
