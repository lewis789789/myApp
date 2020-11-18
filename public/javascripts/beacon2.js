'use strict';
import mqttClient from './mqttlink';
// import {Observable} from 'rxjs/Rx';
import KalmanFilter from 'kalmanjs';
import locData from '../constant/data.json';
import {SEND_FREQ} from '../Constant';
import mysql from 'mysql';
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '04050316',
    database: 'testing',
});
connection.connect();
const kf = new KalmanFilter();
const beaconValues = [];
const beacon = {
    mac: 'AA:BB:CC:02',
    rssi: 0,
    kfrssi: 0,
};
const addSql = 'INSERT INTO testing.beacon2table(mac,rssi,kfrssi) values ?';
let pos;
let min = parseInt(locData.rand,10);    // 設定亂數區間
let max = min*-1;   // 設定亂數區間


process.on('message', (msg) => {
    pos = parseInt(msg,10) //載入位置
    init();
});

async function init() {
    connection.query('TRUNCATE TABLE beacon2table', function(err, result) {
        if (err) {
            console.log('[TRUNCATE ERROR] - ', err.message);
            return;
        }
    });
    while (true) {
        beacon.rssi = getRandom(min, max) + getNum();
        beacon.kfrssi = Math.round(kf.filter(beacon.rssi));
        beaconValues.push([beacon.mac, beacon.rssi, beacon.kfrssi]);
        mqttClient.publish('test', JSON.stringify(beacon));
        //console.log(beacon);
        connection.query(addSql, [beaconValues], function(err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            //console.log('OK');
        });
        beaconValues.length = 0;
        await sleep(SEND_FREQ);
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


function getNum() {
    switch (pos) {
        case 1:
            return 65;
        case 2:
            return 55;
        case 3:
            return 45;
        case 4:
            return 70;
        case 5:
            return 60;
        case 6:
            return 55;
        case 7:
            return 75;
        case 8:
            return 70;
        case 9:
            return 65;
        
    }
}