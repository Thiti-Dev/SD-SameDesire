import React, { Component } from 'react';
import { Row, Col, Slider, Layout, Input, Button } from 'antd';
import styled from 'styled-components';
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
			message: ''
		};
	}
	onSendingMessage() {
		const { message } = this.state;
		console.log(message);
	}
	render() {
		return (
			<Content>
				<Chat_Box>
					<ul>
						<li>aaw0kenn: Hello</li>
						<li>Paween: What's up</li>
					</ul>
				</Chat_Box>
				<Chat_Input
					onKeyPress={(event) => {
						if (event.key == 'Enter') {
							this.onSendingMessage();
						}
					}}
					placeholder="Enter the message"
					onChange={(event) => this.setState({ message: event.target.value })}
				/>
			</Content>
		);
	}
}
