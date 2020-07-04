import React from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onDeleteClick = () => {
		this.props.deleteStream(this.props.stream.id);
	};

	renderActions() {
		return (
			<React.Fragment>
				<button
					className="ui button negative"
					onClick={this.onDeleteClick}
				>
					Delete
				</button>
				<Link to={`/`} className="ui button">
					Cancel
				</Link>
			</React.Fragment>
		);
	}

	renderContent = () => {
		if (!this.props.stream) {
			return 'Are you sure you want to delete this stream?';
		}
		return `Are you sure you want to delete this stream with title: ${this.props.stream.title}?`;
	};

	render() {
		return (
			<Modal
				title="Delete Stream"
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => {
					history.push('/');
				}}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id],
	};
};

const mapDispatchToProps = {
	fetchStream,
	deleteStream,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamDelete);
