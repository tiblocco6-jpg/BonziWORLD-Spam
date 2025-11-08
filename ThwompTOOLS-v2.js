(() => {
  const html = `
    <div id="menuBox" style="position:fixed;top:100px;left:100px;width:320px;background:black;border:2px solid red;border-radius:10px;padding:15px;box-shadow:3px 3px 10px rgba(255,0,0,0.3);font-family:Arial,sans-serif;z-index:9999;color:white;">
      <div id="dragHandle" style="cursor:move;padding-bottom:10px;">
        <div style="display:flex;gap:10px;">
          <button id="mimicTab" style="flex:1;padding:5px;background:red;color:black;border:none;border-radius:5px;">Mimicing</button>
          <button id="spamTab" style="flex:1;padding:5px;background:gray;color:white;border:none;border-radius:5px;">Spamming</button>
        </div>
      </div>

      <!-- Mimic tab -->
      <div id="mainPage">
        <h3 style="margin-top:0;cursor:default;color:white;">
          C00lGUI <small style="color:#bbb;">MIMICING TAB BETA VERSION</small>
        </h3>
        <label>COLOR:
          <select id="userColor" style="width:100%;padding:5px;margin-top:3px;border:1px solid red;background:black;color:white;">
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
        </label>
        <label style="margin-top:10px;">HAT:
          <select id="userHat" style="width:100%;padding:5px;margin-top:3px;border:1px solid red;background:black;color:white;">
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
        </label>
        <label style="margin-top:10px;">NICKNAME:<input type="text" id="userName" style="width:100%;padding:5px;margin-top:3px;border:1px solid red;background:black;color:white;"></label>
        <label style="margin-top:10px;">TEXT:<input type="text" id="userTalkText" style="width:100%;padding:5px;margin-top:3px;border:1px solid red;background:black;color:white;"></label>
        <button id="triggerBtn" style="margin-top:15px;width:100%;padding:8px;background-color:red;color:black;border:none;border-radius:5px;cursor:pointer;">START</button>
        <small style="display:block;text-align:center;margin-top:5px;color:#bbb;">MIMIC A USER</small>
        <button id="mimiccolorBtn" style="margin-top:10px;width:100%;padding:8px;background-color:red;color:black;border:none;border-radius:5px;cursor:pointer;">CHANGE INTO MIMIC</button>
        <small style="display:block;text-align:center;margin-top:5px;color:#bbb;">CHANGES INTO THE DEFAULT MIMIC COLOR</small>
      </div>

      <!-- Spamming tab -->
      <div id="spamPage" style="display:none;">
        <h3 style="margin-top:0;">Spam Page</h3>
        <label>Spam Text:</label>
        <input id="spamText" type="text" value="TALK!" style="width:100%;padding:5px;margin:5px 0;border:1px solid red;background:black;color:white;">
        <label>Spam Interval (ms): <span id="intervalLabel">1000</span></label>
        <input id="intervalSlider" type="range" min="100" max="5000" value="1000" style="width:100%;">
        <button id="startSpam" style="margin-top:10px;width:100%;padding:8px;background-color:red;color:black;border:none;border-radius:5px;">START SPAM</button>
        <button id="stopSpam" style="margin-top:5px;width:100%;padding:8px;background-color:gray;color:white;border:none;border-radius:5px;">STOP SPAM</button>

        <button id="startColorSpam" style="margin-top:10px;width:100%;padding:8px;background-color:red;color:black;border:none;border-radius:5px;">START COLOR SPAM</button>
        <button id="stopColorSpam" style="margin-top:5px;width:100%;padding:8px;background-color:gray;color:white;border:none;border-radius:5px;">STOP COLOR SPAM</button>

        <button id="startHatSpam" style="margin-top:10px;width:100%;padding:8px;background-color:red;color:black;border:none;border-radius:5px;">START HAT SPAM</button>
        <button id="stopHatSpam" style="margin-top:5px;width:100%;padding:8px;background-color:gray;color:white;border:none;border-radius:5px;">STOP HAT SPAM</button>

        <button id="startNameSpam" style="margin-top:10px;width:100%;padding:8px;background-color:red;color:black;border:none;border-radius:5px;">START NAME SPAM</button>
        <button id="stopNameSpam" style="margin-top:5px;width:100%;padding:8px;background-color:gray;color:white;border:none;border-radius:5px;">STOP NAME SPAM</button>
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

  // Tab switching
  const mimicTab = document.getElementById("mimicTab");
  const spamTab = document.getElementById("spamTab");
  const mainPage = document.getElementById("mainPage");
  const spamPage = document.getElementById("spamPage");

  mimicTab.onclick = () => {
    mainPage.style.display = "block";
    spamPage.style.display = "none";
    mimicTab.style.background = "red";
    spamTab.style.background = "gray";
  };

  spamTab.onclick = () => {
    mainPage.style.display = "none";
    spamPage.style.display = "block";
    mimicTab.style.background = "gray";
    spamTab.style.background = "red";
  };

  // Mimic logic
  const triggerBtn = document.getElementById("triggerBtn");
  const mimiccolorBtn = document.getElementById("mimiccolorBtn");

  triggerBtn.addEventListener("click", () => {
    const userColor = document.getElementById("userColor").value;
    const userHat = document.getElementById("userHat").value;
    const userName = document.getElementById("userName").value.trim();
    const userTalkText = document.getElementById("userTalkText").value.trim();

    if (!userName) return alert("Enter a nickname to mimic.");

    if (typeof socket !== "undefined") {
      socket.emit("command", { list: ["color", userColor] });
      socket.emit("command", { list: ["hat", userHat] });
      socket.emit("command", { list: ["name", userName] });
      if(userTalkText) socket.emit("talk", { text: userTalkText });

      setTimeout(() => {
        socket.emit("command", { list: ["color", "black"] });
        socket.emit("command", { list: ["hat", "bfdi"] });
        socket.emit("command", { list: ["name", "Anonymous"] });
      }, 1200);
    } else {
      alert("socket is not defined!");
    }
  });

  mimiccolorBtn.addEventListener("click", () => {
    if (typeof socket !== "undefined") {
      socket.emit("command", { list: ["color", "black"] });
      socket.emit("command", { list: ["hat", "bfdi"] });
      socket.emit("command", { list: ["name", "Anonymous"] });
    } else {
      alert("socket is not defined!");
    }
  });

  // Spam logic with bypass
  const intervalSlider = document.getElementById("intervalSlider");
  const intervalLabel = document.getElementById("intervalLabel");
  const spamTextInput = document.getElementById("spamText");
  let dashCount = 0;

  intervalSlider.addEventListener("input", () => {
    intervalLabel.textContent = intervalSlider.value;
    if (spamInterval) {
      clearInterval(spamInterval);
      const newDelay = parseInt(intervalSlider.value);
      const spamText = spamTextInput.value.trim();
      if (spamText) {
        spamInterval = setInterval(() => {
          // Add dashes to bypass the 3-message limit
          const bypass = '-'.repeat(dashCount % 10);
          socket.emit("talk", { text: spamText + bypass });
          dashCount++;
        }, newDelay);
      }
    }
  });

  document.getElementById("startSpam").addEventListener("click", () => {
    const delay = parseInt(intervalSlider.value);
    const spamText = spamTextInput.value.trim();
    if (!spamText) return alert("Enter a message to spam.");
    if (typeof socket !== "undefined") {
      if (spamInterval) clearInterval(spamInterval);
      dashCount = 0;
      spamInterval = setInterval(() => {
        // Add dashes to bypass the 3-message limit
        const bypass = '-'.repeat(dashCount % 10);
        socket.emit("talk", { text: spamText + bypass });
        dashCount++;
      }, delay);
    } else {
      alert("socket is not defined!");
    }
  });

  document.getElementById("stopSpam").addEventListener("click", () => {
    if (spamInterval) {
      clearInterval(spamInterval);
      spamInterval = null;
    }
  });

  document.getElementById("startColorSpam").addEventListener("click", () => {
    if (typeof socket === "undefined") return alert("socket is not defined!");
    if (colorSpamInterval) clearInterval(colorSpamInterval);
    colorSpamInterval = setInterval(() => {
      socket.emit("command", { list: ["color"] });
    }, 1);
  });

  document.getElementById("stopColorSpam").addEventListener("click", () => {
    if (colorSpamInterval) {
      clearInterval(colorSpamInterval);
      colorSpamInterval = null;
    }
  });

  document.getElementById("startHatSpam").addEventListener("click", () => {
    if (typeof socket === "undefined") return alert("socket is not defined!");
    if (hatSpamInterval) clearInterval(hatSpamInterval);
    hatSpamInterval = setInterval(() => {
      socket.emit("command", { list: ["hat"] });
    }, 1);
  });

  document.getElementById("stopHatSpam").addEventListener("click", () => {
    if (hatSpamInterval) {
      clearInterval(hatSpamInterval);
      hatSpamInterval = null;
    }
  });

  document.getElementById("startNameSpam").addEventListener("click", () => {
    if (typeof socket === "undefined") return alert("socket is not defined!");
    if (nameSpamInterval) clearInterval(nameSpamInterval);
    nameSpamInterval = setInterval(() => {
      socket.emit("command", { list: ["name"] });
    }, 1);
  });

  document.getElementById("stopNameSpam").addEventListener("click", () => {
    if (nameSpamInterval) {
      clearInterval(nameSpamInterval);
      nameSpamInterval = null;
    }
  });

  // Make draggable
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
})();
