javascript:(() => { setInterval(() => { socket.emit("command", { list: ["color"] } ); socket.emit("command", { list: ["hat"] } ); }, 250); })();
