import mqtt from 'mqtt';
import {MQTT_HOST, MQTT_PORT, MQTT_USER, MQTT_PASS} from '../Constant';
export const mqttclient = mqtt
    .connect(`mqtt://${MQTT_HOST}`, {
        username: MQTT_USER,
        password: MQTT_PASS,
        port: MQTT_PORT,
    })
    .on('offline', () => {
        console.log('mqtt offline', new Date());
    })
    .on('error', (e) => {
        console.log('mqtt error', new Date(), e);
    })
    .on('close', () => {
        console.log('mqtt close', new Date());
    })
    .on('reconnect', () => {
        console.log('mqtt reconnect', new Date());
    });
export default mqttclient;
