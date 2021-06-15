import Vue from 'vue';
import { io } from 'socket.io-client';
import VueSocketIOExt from 'vue-socket.io-extended';

const socket = io(process.env.CHAT_SERVER_URL,{
    transports: ['websocket','polling'],
    reconnection: true,
    reconnectionAttempts: Infinity,
    autoConnect: true,
});

export default ({ store }) => {
  Vue.use(VueSocketIOExt, socket, { store });
}