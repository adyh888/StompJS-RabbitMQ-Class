# StompjsRabbitMQClass-StompjsRabbitMQClass
import WebSocketClient from '@/uni_modules/StompjsRabbitMQClass-StompjsRabbitMQClass/js_sdk/StompJSRabbitMQClass.js'
//url:连接地址
//event:监听事件
const stompWebsocket = new WebSocketClient('ws://web:web@172.16.10.58:50286/ws',"stompConnected")
stompWebsocket.webSocketInit()
uni.$on('stompConnected', function (data) {
data.subscribe('/queue/202211075.1.*.web', function (res) {
})
})
