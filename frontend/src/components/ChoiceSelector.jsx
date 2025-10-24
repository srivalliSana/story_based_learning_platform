import React from 'react';
import { useTranslation } from 'react-i18next';

const ChoiceSelector = ({ choices, onSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="choice-selector">
      <h3>{t('chooseYourPath')}</h3>
      {choices.map((choice, index) => (
        <button key={index} onClick={() => onSelect(index)} className="choice-button">
          {choice.text}
        </button>
      ))}
    </div>
  );
};

export default ChoiceSelector;
