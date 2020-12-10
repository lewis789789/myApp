import mqtt from 'mqtt';
var locData = require('../constant/data.json');
var fs = require("fs");
let opt = {
    port:1883,
    clientId: 'test'
};
let client = mqtt.connect('mqtt://127.0.0.1',opt);
let newArray = [0,0,0];
let array1 = [];
let array2 = [];
let array3 = [];
let qty = locData.quantity;
let x,y;
let cordX = [];
let cordY = [];
let acc = 0;
process.on('message', (msg) => {
    locData.location = msg;
});


client.on('connect', function () {
    console.log("connected");
    client.subscribe("test");
});
client.on('message', function (topic, message) {
    let obj = JSON.parse(message.toString());
    if (obj.mac === 'AA:BB:CC:01' && array1.length < qty)
        array1.push(parseInt(obj.rssi,10));
    else if (obj.mac === 'AA:BB:CC:02' && array2.length < qty)
        array2.push(parseInt(obj.rssi,10));
    else if (obj.mac === 'AA:BB:CC:03' && array3.length < qty)
        array3.push(parseInt(obj.rssi,10));
    else if (array1.length === qty && array2.length === qty && array3.length === qty) {
        let i = 0;
        while(true){
            if (i === qty)
            {
                acc/=qty;
                break;
            }
            x = ((Math.pow(((array1[i]-39)/2),2) - Math.pow(((array2[i]-39)/2),2) + 225 ) / 30).toFixed(1);
            y = ((Math.pow(((array3[i]-39)/2),2) - Math.pow(((array1[i]-39)/2),2) + 225 ) / 30).toFixed(1);
            cordX.push(x);
            cordY.push(y);
            if (locData.location === '1'){
                if (x>=0.0 && x<=5.0 && y>=10.0 && y<=15.0)
                {    
                    console.log(i);
                    acc++;
                }
            }
            else if (locData.location === '2'){
                if (x>=5.0 && x<=10.0 && y>=10.0 && y<=15.0)
                {    
                    console.log(i);
                    acc++;
                }
            }
            else if (locData.location === '3'){
                if (x>=10.0 && x<=15.0 && y>=10.0 && y<=15.0)
                {    
                    console.log(i);
                    acc++;
                }
            }
            else if (locData.location === '4'){
                if (x>=0.0 && x<=5.0 && y>=5.0 && y<=10.0)
                {    
                    console.log(i);
                    acc++;
                }
            }
            else if (locData.location === '5'){
                if (x>=5.0 && x<=10.0 && y>=5.0 && y<=10.0)
                {    
                    console.log(i);
                    acc++;
                }
            }
            else if (locData.location === '6'){
                if (x>=10.0 && x<=15.0 && y>=5.0 && y<=10.0)
                {    
                    console.log(i);
                    acc++;
                }
            }
            else if (locData.location === '7'){
                if (x>=0.0 && x<=5.0 && y>=0.0 && y<=5.0)
                {    
                    console.log(i);
                    acc++;
                }
            }
            else if (locData.location === '8'){
                if (x>=5.0 && x<=10.0 && y>=0.0 && y<=5.0)
                {    
                    console.log(i);
                    acc++;
                }
            }
            else if (locData.location === '9'){
                if (x>=10.0 && x<=15.0 && y>=0.0 && y<=5.0)
                {    
                    console.log(i);
                    acc++;
                }
            }
            i++;
        }
        let sum1 = 0,sum2 = 0,sum3 = 0;
        array1.forEach(item => {sum1 += item});
        array2.forEach(item => {sum2 += item});
        array3.forEach(item => {sum3 += item});
        let avg1 = sum1 / qty;
        let avg2 = sum2 / qty;
        let avg3 = sum3 / qty;
        x = ((Math.pow(((avg1-39)/2),2) - Math.pow(((avg2-39)/2),2) + 225 ) / 30).toFixed(1);
        y = ((Math.pow(((avg3-39)/2),2) - Math.pow(((avg1-39)/2),2) + 225 ) / 30).toFixed(1);
        console.log("(x,y) = "+"("+x+","+y+")");

        locData.cordX = cordX;
        locData.cordY = cordY;
        locData.x = x;
        locData.y = y;
        locData.acc = acc*100;
          fs.writeFileSync('../myApp/public/constant/data.json', JSON.stringify(locData),  function(err) { //寫入JSON資料
            if (err) {
                return console.error(err);
            }
        });
        process.send(locData);
        array1.length = 0;
        array2.length = 0;
        array3.length = 0;
        newArray = [0,0,0];
    }
   // process.send(coordinate = { x: x, y: y });


    //console.log(obj['rssi']);
});