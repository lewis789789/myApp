require('dotenv').config;

export const {
    MQTT_HOST = '127.0.0.1',
    MQTT_PORT = 1883,
    MQTT_USER = '123',
    MQTT_PASS = '123',
    SEND_FREQ = 1,
} = process.env;
