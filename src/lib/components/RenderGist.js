import React, {
	Component
} from 'react';

import loading from './loading.gif'

class RenderGist extends Component {

	constructor(props) {
		super();
		this.gist = props.gist;
		this.styleInserted = false;
		this.state = {
			iaLoading: true,
			src: ""
		};
	}

	addStylesheet = (href) => {
		this.styleInserted = true;
		var style = document.createElement('link');
		style.type = "text/css";
		style.rel = "stylesheet";
		style.href = href;
		document.head.appendChild(style);
	}

	componentDidMount() {
		var callbackName = this.nextId()
		window[callbackName] = function (gist) {
			this.setState({
				iaLoading: false,
				src: gist.div
			});
			this.addStylesheet(gist.stylesheet);
		}.bind(this);

		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = `https://gist.github.com/${this.props.gist}.json?callback=${callbackName}`
		document.body.appendChild(script);
	}

	render() {
		return this.state.iaLoading ? <img className="loading-logo" src={loading} alt=""/> : <div dangerouslySetInnerHTML={{__html: this.state.src}} / >
	}
	nextId() {
		return `cb${++gistCallbackId}`
	}
}
var gistCallbackId = 0;

export default RenderGist;
