<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	import WebSocketClient from '../../common/StompJSRabbitMQClass'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			const stompWebsocket = new WebSocketClient('ws://web:web@172.16.10.58:50286/ws',"stompConnected")
			stompWebsocket.webSocketInit()
			uni.$on('stompConnected', function (data) {
			        data.subscribe('/queue/202211075.1.*.web', function (res) {
			        })
			})
			uni.$on('stompConnected2', function (data) {
			        data.subscribe('/queue/202211075.1.*.web', function (res) {
			        })
			})
			setTimeout(()=>{
			        const stompWebsocket2 = new WebSocketClient('ws://web:web@47.103.197.129:50286/ws',"stompConnected2")
			        stompWebsocket2.webSocketInit()
			},2000)
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
