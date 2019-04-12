
const {app, BrowserWindow,ipcMain,remote} = require('electron')
const express = require("express");
let mainWindow

app.on('ready', function(){
  var ex = express();
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  ipcMain.on("para",(event,arg)=>{
    if(arg.status){
      console.log("msg enviada")
      mainWindow.hide();
    }
  });

  // var telefone = "5515988003428";
  // var mensagem = "ola acordaaaa";

  ex.get("/whats/:num/:msg", function(req,res){
    var numero = req.params.num;
    var msg = req.params.msg;
    enviar(numero,msg);
    res.send("enviando msgn")
  });

  function enviar(telefone,mensagem){
        mainWindow.loadURL('https://web.whatsapp.com/send?phone=' + telefone + '&text=' + mensagem + '/',
        {userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'});
        mainWindow.webContents.executeJavaScript('var{ipcRenderer,remote} = require("electron"); var enviado = false; function tempo(){ var btSend = document.getElementsByClassName("_35EW6")[0]; var inputSend = document.getElementsByClassName("_2S1VP")[0]; if(typeof inputSend !== "undefined" && inputSend.textContent && !enviado ){ btSend.click(); enviado = true; }else if(enviado){ /*cancelar*/ ipcRenderer.send("para",{status:true}); enviado = false } } for(var cont = 0; cont < 100; cont ++){ setInterval(tempo, 1000); }')
        mainWindow.show();
      }

  ex.listen(3000);
});


