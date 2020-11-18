process.on('message', (msg) => {
    console.log("process2loaded:"+JSON.stringify(msg));
});