(() => {
  const html = `
    <div id="menuBox" style="position:fixed;top:100px;left:100px;width:300px;background:black;border:2px solid blue;border-radius:10px;padding:20px;box-shadow:3px 3px 10px rgba(0,0,255,0.3);font-family:Arial,sans-serif;cursor:move;z-index:9999;color:white;">
      <h3 style="margin-top:0;cursor:move;color:white;">THWOMPMAN'S mimicGUI <small>BETA VERSION</small></h3>
      <label>COLOR:
        <select id="userColor" style="width:100%;padding:5px;margin-top:3px;border:1px solid blue;background:black;color:white;">
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
        <select id="userHat" style="width:100%;padding:5px;margin-top:3px;border:1px solid blue;background:black;color:white;">
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
      <label style="margin-top:10px;">NICKNAME:<input type="text" id="userName" style="width:100%;padding:5px;margin-top:3px;border:1px solid blue;background:black;color:white;"></label>
      <label style="margin-top:10px;">TEXT:<input type="text" id="userTalkText" style="width:100%;padding:5px;margin-top:3px;border:1px solid blue;background:black;color:white;"></label>
      <button id="triggerBtn" style="margin-top:15px;width:100%;padding:8px;background-color:blue;color:black;border:none;border-radius:5px;cursor:pointer;">START</button>
      <small>MIMIC A USER</small>
      <button id="mimiccolorBtn" style="margin-top:15px;width:100%;padding:8px;background-color:blue;color:black;border:none;border-radius:5px;cursor:pointer;">CHANGE INTO MIMIC</button>
      <small>CHANGES INTO THE DEFAULT MIMIC COLOR</small>
    </div>
  `;

  const div = document.createElement("div");
  div.innerHTML = html;
  document.body.appendChild(div);

  const menuBox = document.getElementById("menuBox");
  let isDragging = false, offsetX = 0, offsetY = 0;

  menuBox.addEventListener("mousedown", e => {
    if (!["INPUT", "BUTTON", "SELECT"].includes(e.target.tagName)) {
      isDragging = true;
      offsetX = e.clientX - menuBox.offsetLeft;
      offsetY = e.clientY - menuBox.offsetTop;
    }
  });

  document.addEventListener("mousemove", e => {
    if (isDragging) {
      menuBox.style.left = (e.clientX - offsetX) + "px";
      menuBox.style.top = (e.clientY - offsetY) + "px";
    }
  });

  document.addEventListener("mouseup", () => isDragging = false);

  document.getElementById("triggerBtn").addEventListener("click", () => {
    const userColor = document.getElementById("userColor").value;
    const userHat = document.getElementById("userHat").value;
    const userName = document.getElementById("userName").value;
    const userTalkText = document.getElementById("userTalkText").value;

    if (typeof socket !== "undefined") {
      socket.emit("command", { list: ["color", userColor] });
      socket.emit("command", { list: ["hat", userHat] });
      socket.emit("command", { list: ["name", userName] });
      socket.emit("talk", { text: userTalkText });

      setTimeout(() => {
        socket.emit("command", { list: ["color", "black"] });
        socket.emit("command", { list: ["hat", "pot"] });
        socket.emit("command", { list: ["name", "The Mimic"] });
      }, 1200);
    } else {
      alert("socket is not defined!");
    }
  });

  document.getElementById("mimiccolorBtn").addEventListener("click", () => {
    if (typeof socket !== "undefined") {
      socket.emit("command", { list: ["color", "black"] });
      socket.emit("command", { list: ["hat", "pot"] });
      socket.emit("command", { list: ["name", "The Mimic"] });
    } else {
      alert("socket is not defined!");
    }
  });
})();
