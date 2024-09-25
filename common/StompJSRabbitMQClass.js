import Stomp from 'stompjs';

class WebSocketClient {
	/**
	 * @param url  ws地址
	 * @param  event 监听事件
	 */
  constructor(url, event) {
    this.socketOpen = false;
    this.socketMsgQueue = [];
    this.baseURL = url || 'ws://web:web@172.16.10.58:50286/ws';
    this.event = event || '';
    this.header = {
      login: 'web',
      passcode: 'web'
    };
    this.SocketTask = null;
    this.client = null;
  }

  webSocketInit(url, event) {
    if (url) this.baseURL = url;
    if (event) this.event = event;

    this.SocketTask = uni.connectSocket({
      url: this.baseURL,
      header: this.header,
      multiple: true,
      complete: () => {}
    });

    this.onWebSocketEvent();
  }

  onWebSocketEvent() {
    const ws = {
      send: this.sendMessage.bind(this),
      onopen: null,
      onmessage: null,
      close: this.closeSocket.bind(this)
    };

    this.SocketTask.onOpen((res) => {
      console.log('WebSocket连接已打开！', res);
      this.socketOpen = true;
      for (let i = 0; i < this.socketMsgQueue.length; i++) {
        ws.send(this.socketMsgQueue[i]);
      }
      this.socketMsgQueue = [];
      ws.onopen && ws.onopen();
    });

    this.SocketTask.onMessage((res) => {
      ws.onmessage && ws.onmessage(res);
    });

    this.SocketTask.onError((res) => {
      console.log('WebSocket错误', res);
      this.socketOpen = false;
      setTimeout(() => {
        this.webSocketInit();
      }, 5000);
    });

    this.SocketTask.onClose((res) => {
      this.client?.disconnect();
      this.client = null;
      this.socketOpen = false;
      console.log('WebSocket 已关闭！', res);
      setTimeout(() => {
        this.webSocketInit();
      }, 5000);
    });

    Stomp.setInterval = function (interval, f) {
      return setInterval(f, interval);
    };

    Stomp.clearInterval = function (id) {
      return clearInterval(id);
    };

    this.client = Stomp.over(ws);
    this.client.connect(this.header, () => {
      console.log('stomp connected');
      uni.$emit(this.event, this.client);
    });
  }

  disconnect() {
    this.SocketTask.close();
  }

  sendMessage(message) {
    if (this.socketOpen) {
      this.SocketTask.send({
        data: message
      });
    } else {
      this.socketMsgQueue.push(message);
    }
  }

  closeSocket() {
    console.log('closeSocket');
  }
}

export default WebSocketClient;
