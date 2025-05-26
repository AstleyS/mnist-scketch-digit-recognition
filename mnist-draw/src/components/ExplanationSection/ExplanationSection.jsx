import React from 'react';
import './ExplanationSection.css';

/*
  * ExplanationSection component
  * This component is responsible for rendering the explanation section.
  * It receives setActiveTab as a prop, which is not used in this component.
  * */
const ExplanationSection = ({setActiveTab}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl text-center">
      <p>This is the explanation section</p>
    </div>
  );
};

export default ExplanationSection;
