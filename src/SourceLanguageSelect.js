import React from 'react';

const SourceLanguageSelect = ({ options, handleChange, language }) => {
	
	return (
		<select value={language} className='form-select select' onChange={(e) => handleChange(e.target.value)}>
			<option value=''>Detect Language</option>
			{Object.keys(options).map(key => (
				<option key={key} value={key}>{options[key]}</option>
			))}
		</select>
	);
}

export default SourceLanguageSelect
