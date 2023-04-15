export default class Socket {
    // cb: 存储回调函数
    constructor(url: string, cb: (data: any) => void) {
        this.url = url;
        this.cb = cb;
        this.connect().then(res => console.log('Socket连接', res));
    }

    private readonly url: string = '';
    private readonly cb?: (data: any) => void;
    // 和服务端连接的socket对象
    private ws?: WebSocket;
    private remainPayload: any[] = [];

    public connect() {
        return new Promise<void>(resolve => {
            const ws = new WebSocket(this.url);

            ws.onopen = e => {
                console.info('WebSocket 连接成功', e);
                this.remainPayload.forEach(payload => {
                    ws.send(payload);
                });
                resolve();
            };

            // 得到服务端发送过来的数据
            ws.onmessage = e => {
                if (this.cb) {
                    this.cb(e.data);
                }
            };

            ws.onerror = e => {
                console.error('ws error', e);
            };

            // ws.onclose = e => {
            //   console.info('ws close', e);
            // };
            this.ws = ws;
        });
    }

    public async send(payload: any) {
        if (!payload || !this.ws) {
            if (!this.ws) {
                this.remainPayload.push(JSON.stringify(payload));
            }
            return;
        }
        if (this.isConnected) {
            this.ws.send(JSON.stringify(payload));
        } else {
            // 后端主动断开 前端发起请求 需要在连接一次
            await this.connect();
            this.ws.send(JSON.stringify(payload));
        }
    }

    private get isConnected() {
        return this.ws && this.ws.readyState === WebSocket.OPEN;
    }

    public close() {
        if (this.ws) {
            this.ws.close();
            this.ws = undefined;
        }
    }
}

