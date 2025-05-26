import React from 'react';
import './CodeSection.css';
import ArchitectureControls from '../ArchitectureControls/ArchitectureControls';
import CodeDisplay from '../CodeDisplay/CodeDisplay';


/*
  * CodeSection component
  * This component is responsible for rendering the code section.
  * It receives set as a prop, which is not used in this component.
*/
const CodeSection = ({setActiveTab}) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen gap-6 p-6">
      <ArchitectureControls />
      <CodeDisplay />
    </div>
  );
};

export default CodeSection;
