import React, { Component } from 'react';
import { Row, Col, Slider, Layout, Input, Button } from 'antd';
import styled from 'styled-components';

//
// ─── SOCKET IO ──────────────────────────────────────────────────────────────────
//
import socketIOClient from 'socket.io-client';
// ────────────────────────────────────────────────────────────────────────────────

const { Header, Footer, Sider, Content } = Layout;

const Chat_Box = styled.div`
	width: 50rem;
	height: 20rem;
	border-style: inset;
`;
const Chat_Input = styled(Input)`
width: 50rem;
`;
export default class ChatSession extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			message: '',
			endpoint: 'http://localhost:5000' // socket.io endpoint server
		};
	}
	componentDidMount() {
		this.socketListening();
	}
	//
	// ─── SOCKET.IO ─────────────────────────────────────────────────────────────────────
	//
	onSendingMessage() {
		const { message, endpoint } = this.state;
		console.log(message);
		const socket = socketIOClient(endpoint);
		socket.emit('sent-message', message);
		this.setState({ message: '' });
	}

	socketListening() {
		console.log('[socket.io]: Connecting to the endpoint');
		const { endpoint, messages } = this.state;
		const temp = messages;
		const socket = socketIOClient(endpoint);
		socket.on('new-message', (messageNew) => {
			console.log('[RECIEVE]: ' + messageNew);
			temp.push(messageNew);
			this.setState({ messages: temp });
		});
	}

	// ────────────────────────────────────────────────────────────────────────────────

	render() {
		const { message, messages } = this.state;
		let rendered_msg = messages.map((msg, index) => <li key={`msg-${index}`}>{msg}</li>);
		return (
			<Content>
				<Chat_Box>
					<ul>{rendered_msg}</ul>
				</Chat_Box>
				<Chat_Input
					onKeyPress={(event) => {
						if (event.key == 'Enter') {
							this.onSendingMessage();
						}
					}}
					placeholder="Enter the message"
					onChange={(event) => this.setState({ message: event.target.value })}
					value={message}
				/>
			</Content>
		);
	}
}
