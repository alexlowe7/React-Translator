import React from 'react'
import SourceTextArea from './SourceTextArea';
import TranslatedTextArea from './TranslatedTextArea';
import TranslateButton from './TranslateButton';
import SwapLanguageButton from './SwapLanguageButton';
import SaveButton from './SaveButton';
import TranslationFlashcard from './TranslationFlashcard';
import SourceLanguageSelect from './SourceLanguageSelect';
import TargetLanguageSelect from './TargetLanguageSelect';
import SourceLanguages from './SourceLanguages';
import TargetLanguages from './TargetLanguages';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ToggleButton from './ToggleButton';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        sourceLang: '', // Default auto-detect
        targetLang: 'ES', // Default Spanish
        sourceText: '',
        translatedText: '', 
        autoDetectOn: true,
        savedTranslations: [],
        saveEnabled: false,
        currentFlashcard: 0,
    };
  }


  
  // If users switches to auto detect mode, set "autoDetectOn" to true
  checkSourceLang = (language) => {
    if (language === '') {
      this.setState({ autoDetectOn: true })
    } else {
      this.setState({ autoDetectOn: false });
    } 
  }

  // Swap target and source languages
  // Put translated text into source text
  swapLanguages = () => {

    // Get current state values
    let newSourceLang = this.state.targetLang;
    let newTargetLang = this.state.sourceLang;
    let newSourceText = this.state.translatedText

    // If source language cannot be swapped 
    // Choose American English and Standard Portugese by default
    if (newTargetLang === 'EN') {
      newTargetLang = 'EN-US';
    }
    if (newTargetLang === 'PT') {
      newTargetLang = 'PT-PT';
    }

    // If target language was a variation of English or Portugese, change it to standard 
    if (newSourceLang === 'EN-US' || newSourceLang === 'EN-GB') {
      newSourceLang = 'EN';
    }
    if (newSourceLang === 'PT-PT' || newSourceLang === 'PT-BR') {
      newSourceLang = 'PT';
    }

    // Set state 
    this.setState({
      sourceLang: newSourceLang,
      targetLang: newTargetLang,
      sourceText: newSourceText,
      translatedText: '',
      saveEnabled: false,
    });
  }

  // When translate button is clicked
  // API call to get translated text and detected source language
  handleClick = () => {

    fetch('http://127.0.0.1:8000/translate', {
      method: 'POST',
      body: JSON.stringify({
        text: this.state.sourceText,
        source: this.state.sourceLang,
        target: this.state.targetLang
      })
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        translatedText: data.translated_text,
        sourceLang: data.source_lang,
        autoDetectOn: false, 
        saveEnabled: true
      });
    })
  }

  // When the source text is changed, set state 
  handleTextChange = (text) => {
    this.setState({ 
      sourceText: text, 
      saveEnabled: false,
    });
  };

  // Call translate button function when enter is pressed in SourceTextArea
  handleKeyDown = (event) => {
    if (event.key === 'Enter' && this.state.sourceText !== '') {
      event.preventDefault();
      this.handleClick();
    }
  }

  // When the source language select element is changed, set state
  handleSourceLangChange = (language) => {
    this.setState({ 
      sourceLang: language, 
      saveEnabled: false,
    })
    this.checkSourceLang(language);
  };

  // When the target language select element is changed, set state
  handleTargetLangChange = (language) => {
    this.setState({ 
      targetLang: language, 
      saveEnabled: false, 
    })
  }

  handleSave = () => {

    // Get current saved translations array
    // Add current translation to end of array
    // Save updated array to state
    const id = this.state.savedTranslations.length
    const translations = this.state.savedTranslations
    translations.push(
      {
        sourceLang: this.state.sourceLang,
        targetLang: this.state.targetLang, 
        sourceText: this.state.sourceText, 
        translatedText: this.state.translatedText,
        id: id,
      }
    )

    this.setState({
      savedTranslations: translations, 
      saveEnabled: false,
      currentFlashcard: id,
    })
  }

  handleToggle = (directionNext) => {

    let currentFlashcard = this.state.currentFlashcard

    if (directionNext) {
      currentFlashcard = currentFlashcard + 1
    } else {
      currentFlashcard = currentFlashcard -1
    }

    this.setState({
      currentFlashcard: currentFlashcard
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h2 className='text-center mt-2'>  
              Translator
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <SourceLanguageSelect
              language={this.state.sourceLang}
              options={SourceLanguages}
              handleChange={this.handleSourceLangChange}
            />
          </Col>
          <Col>
            <TargetLanguageSelect
              language={this.state.targetLang} 
              options={TargetLanguages}
              handleChange={this.handleTargetLangChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SourceTextArea
              text={this.state.sourceText} 
              onTextChange={this.handleTextChange}
              onKeyDown={this.handleKeyDown}
            />
          </Col>
          <Col>
            <TranslatedTextArea
              text={this.state.translatedText} 
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TranslateButton
              onClick={this.handleClick}
              sourceText={this.state.sourceText}
            />
            {!this.state.autoDetectOn &&
              <SwapLanguageButton
                onClick={this.swapLanguages}
              />
            }
            {this.state.saveEnabled && 
              <SaveButton
                onClick={this.handleSave}
              />
            }
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col>
            <h2 className='text-center mb-3'>Study Mode</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={2}></Col>
          <Col xs={8}>
            { this.state.savedTranslations.length > 0 &&
              <TranslationFlashcard
                sourceLang = {this.state.savedTranslations[this.state.currentFlashcard].sourceLang}
                targetLang = {this.state.savedTranslations[this.state.currentFlashcard].targetLang}
                sourceText = {this.state.savedTranslations[this.state.currentFlashcard].sourceText}
                translatedText = {this.state.savedTranslations[this.state.currentFlashcard].translatedText}
                key = {this.state.currentFlashcard} 
              />
            }
          </Col>
          <Col xs={2}></Col>
        </Row>
        {this.state.savedTranslations.length > 0 &&
          <Row className='mt-1'>
            <Col className="text-center d-flex h-100 w-100 justify-content-center align-items-center">
              <ToggleButton 
              directionNext={false}
              onClick={this.handleToggle}
              disabled={this.state.currentFlashcard === 0 ? true : false}
              className='ml-auto'
              />
              <p className='lead f-numbers'>
                {this.state.currentFlashcard + 1} of {this.state.savedTranslations.length}
              </p>
              <ToggleButton 
              directionNext={true}
              onClick={this.handleToggle}
              disabled={this.state.currentFlashcard === this.state.savedTranslations.length - 1 ? true : false}
              className='mr-auto'
              />
            </Col>
          </Row>
        }          
      </Container>
    );
  }
}

export default App;
