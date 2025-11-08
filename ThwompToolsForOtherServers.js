(() => {
  const html = `
    <div id="menuBox" style="position:fixed;top:100px;left:100px;width:300px;background:black;border:2px solid blue;border-radius:10px;padding:20px;box-shadow:3px 3px 10px rgba(0,0,255,0.3);font-family:Arial,sans-serif;cursor:move;z-index:9999;color:white;">
      <h3 style="margin-top:0;cursor:move;color:white;">THWOMPMAN'S TOOLS <small>1.0</small></h3>
         <h2>MIMIC</h2>
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


    
      </label>


      <label style="margin-top:10px;">NICKNAME:<input type="text" id="userName" style="width:100%;padding:5px;margin-top:3px;border:1px solid blue;background:black;color:white;"></label>


      <label style="margin-top:10px;">TEXT:<input type="text" id="userTalkText" style="width:100%;padding:5px;margin-top:3px;border:1px solid blue;background:black;color:white;"></label>


      <button id="triggerBtn" style="margin-top:15px;width:100%;padding:8px;background-color:blue;color:black;border:none;border-radius:5px;cursor:pointer;">START</button>


    


     <button id="mimiccolorBtn" style="margin-top:16px;width:100%;padding:8px;background-color:blue;color:black;border:none;border-radius:5px;cursor:pointer;">CHANGE INTO MIMIC</button>


    


      <p>
    
       <h2>SPAMMER</h2>
      <label style="margin-top:10px;">TEXT TO SPAM<input type="text" id="userSpam" style="width:100%;padding:5px;margin-top:3px;border:1px solid blue;background:black;color:white;"></label>
      <button id="spam" style="margin-top:15px;width:100%;padding:8px;background-color:blue;color:black;border:none;border-radius:5px;cursor:pointer;">SPAM</button>
      </p>




//start editing
<h2>FLOOD</h2>
// the color these bots will use
        <label>COLOR:
        <select id="floodColor" style="width:100%;padding:5px;margin-top:3px;border:1px solid blue;background:black;color:white;">
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


    
      </label>


// their name
      <label style="margin-top:10px;">NICKNAME:<input type="text" id="floodName" style="width:100%;padding:5px;margin-top:3px;border:1px solid blue;background:black;color:white;"></label>


// what they will say
      <label style="margin-top:10px;">TEXT:<input type="text" id="floodTalkText" style="width:100%;padding:5px;margin-top:3px;border:1px solid blue;background:black;color:white;"></label>


      <button id="floodbtn" style="margin-top:15px;width:100%;padding:8px;background-color:blue;color:black;border:none;border-radius:5px;cursor:pointer;">START</button>






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
    const userName = document.getElementById("userName").value;
    const userTalkText = document.getElementById("userTalkText").value;


    if (typeof socket !== "undefined") {
      socket.emit("command", { list: ["color", userColor] });
      socket.emit("command", { list: ["name", userName] });
      socket.emit("talk", { text: userTalkText });


      setTimeout(() => {
        socket.emit("command", { list: ["color"] });
        socket.emit("command", { list: ["name", "The Mimic"] });
      }, 1200);
    } else {
      alert("socket is not defined!");
    }
  });


   






      document.getElementById("spam").addEventListener("click", () => {


    const userSpam = document.getElementById("userSpam").value;


    if (typeof socket !== "undefined") {
    
      javascript:setInterval(function(){socket.emit('talk', {text: userSpam})},900);


    } else {
      alert("socket is not defined!");
    }
  });




      document.getElementById("floodbtn").addEventListener("click", () => {


    const floodColor = document.getElementById("floodColor").value;
     const floodName = document.getElementById("floodName").value;
      const floodTalkText = document.getElementById("floodTalkText").value;


    if (typeof socket !== "undefined") {


        //jim, do your magic
    
      javascript:setInterval(function(){socket.emit('talk', {text: userSpam})},900);


    } else {
      alert("socket is not defined!");
    }
  });


  document.getElementById("mimiccolorBtn").addEventListener("click", () => {
    if (typeof socket !== "undefined") {
      socket.emit("command", { list: ["color"] });
      socket.emit("command", { list: ["name", "The Mimic"] });
    } else {
      alert("socket is not defined!");
    }
  });
})();
