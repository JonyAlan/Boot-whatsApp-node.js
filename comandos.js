var{ipcRenderer,remote} = require("electron"); var enviado = false; function tempo(){ var btSend = document.getElementsByClassName("_35EW6")[0]; var inputSend = document.getElementsByClassName("_2S1VP")[0]; if(typeof inputSend !== "undefined" && inputSend.textContent && !enviado ){ btSend.click(); enviado = true; }else if(enviado){ /*cancelar*/ ipcRenderer.send("para",{status:true}); enviado = false } } for(var cont = 0; cont < 100; cont ++){ setInterval(tempo, 1000); }