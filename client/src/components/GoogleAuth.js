import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import config from '../config';

class GoogleAuth extends React.Component {
	componentDidMount() {
		window.gapi.load('client:auth2', async () => {
			await window.gapi.client.init({
				clientId: config.clientId,
				scope: 'email',
			});

			this.auth = window.gapi.auth2.getAuthInstance();
			this.onAuthChange(this.auth.isSignedIn.get());
			this.auth.isSignedIn.listen(this.onAuthChange);
		});
	}

	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	onSignInClick = () => {
		this.auth.signIn();
	};

	onSignOutClick = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<div
					className="ui red google button"
					onClick={this.onSignOutClick}
				>
					<i className="google icon" />
					SignOut
				</div>
			);
		} else {
			return (
				<div
					className="ui red google button"
					onClick={this.onSignInClick}
				>
					<i className="google icon" />
					SignIn
				</div>
			);
		}
	}

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn };
};

const mapDispatchToProps = {
	signIn,
	signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
