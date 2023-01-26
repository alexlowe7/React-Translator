import React from 'react';

class TranslateButton extends React.Component {

	render() {
		return (
			<button 
        onClick={() => this.props.onClick()}
        id="translate_button" 
        className="btn btn-primary"
        disabled={this.props.sourceText === ''}
			>
			Translate
			</button>
		);
	}
}

export default TranslateButton;