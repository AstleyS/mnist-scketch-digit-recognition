import React from 'react';
import './TabNavigation.css';
import { TABS } from '../../const';

/*
  * TabNavigation component
  * This component is responsible for rendering the tab navigation.
  * It receives activeTab and setActiveTab as props.
*/

const TabNavigation = ({ activeTab, setActiveTab }) => {
  
  return (
    <>
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="flex justify-center">
        {
          Object.entries(TABS).map(([key, tab]) => (
            <button
              key={key}
              onClick={() => setActiveTab(tab.tab)}
              className={`px-6 py-3 font-semibold border-b-2 transition-colors
                ${activeTab === tab.tab
                  ? 'border-orange-500 text-orange-400 bg-gray-700'
                  : 'border-transparent text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
            > 
              
              {tab.label}
            
            </button>
          ))}
      </div>
    </div>
    </>
  );
};

export default TabNavigation;
