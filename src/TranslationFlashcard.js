import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import SourceLanguages from './SourceLanguages';
import TargetLanguages from './TargetLanguages';

class TranslationFlashcard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        sourceLangDisplayed: true
    };
  }

  handleClick = () => {
    if (this.state.sourceLangDisplayed) {
      this.setState({ sourceLangDisplayed: false });
    } else {
      this.setState({ sourceLangDisplayed: true });
    }
  }
  
	render() {

		return (
			<div className='flashcard d-flex flex-column' onClick={this.handleClick}>
        <Col xs={12} className='d-flex'>
          <p className={this.state.sourceLangDisplayed ? 'f-true' : 'f-false'}>
            {SourceLanguages[`${this.props.sourceLang}`]}
          </p>
          <p className={this.state.sourceLangDisplayed ? 'f-false ms-auto' : 'f-true ms-auto'}>
            {TargetLanguages[`${this.props.targetLang}`]}
          </p>
        </Col>
        <Col className='d-inline-flex m-auto my-col'>
          <p className='flashcard-text-main lead m-auto'>
            {this.state.sourceLangDisplayed ? this.props.sourceText : this.props.translatedText}
          </p>
        </Col>
			</div>
		);
	}
}

export default TranslationFlashcard
