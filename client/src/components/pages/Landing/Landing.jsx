import React, { Component } from 'react';
import { Row, Col, Slider, Layout, Input, Button } from 'antd';
import styled from 'styled-components';
const { Header, Footer, Sider, Content } = Layout;

const Input_Box = styled.div`
	width: 30rem;
	height: 15rem;
	background-color: grey;
	position: fixed; /* or absolute */
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 1rem;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Flex_Input_Box = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

const Input_Name = styled(Input)`
    text-align: center;
    height: 20%;
    width: 60%;
`;

export default class Landing extends Component {
	constructor(props) {
		super(props);
		this.formInputHandle = this.formInputHandle.bind(this);
		this.proceedNextStep = this.proceedNextStep.bind(this);
		this.state = {
			username: ''
		};
	}
	formInputHandle(event) {
		let { value, name } = event.target;
		this.setState({ [name]: value });
	}
	proceedNextStep() {
		console.log('Proceeding next step with username : ' + this.state.username);
	}
	render() {
		let { username } = this.state;
		return (
			<Content>
				<Input_Box>
					<Flex_Input_Box>
						<Input_Name
							placeholder="What should we call you?"
							onChange={this.formInputHandle}
							value={username}
							name="username"
						/>
						<Button onClick={this.proceedNextStep} type="primary" size="large" style={{ height: '20%' }}>
							Join
						</Button>
					</Flex_Input_Box>
				</Input_Box>
			</Content>
		);
	}
}
