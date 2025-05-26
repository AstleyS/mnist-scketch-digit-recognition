import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';

import Header from './components/Header/Header';
import TabNavigation from './components/TabNavigation/TabNavigation';
import DrawSection from './components/DrawSection/DrawSection';
import CodeSection from './components/CodeSection/CodeSection';
import ExplanationSection from './components/ExplanationSection/ExplanationSection';

import { TABS } from './const.js';

const MNISTSketchRecognition = () => {

  const [activeTab, setActiveTab] = useState('draw')
  const ActiveSection = TABS[activeTab].component;

  return (
    <>
    
    <div className='min-h-screen bg.gray-900 text-white'>
      { /* Header */ }
      <Header />

      { /* Tab Navigation */ }
      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
       />

      { /* Section */ }
      <div className="flex-1">
        { /* Content based on active tab */ }
        {
          <ActiveSection setActiveTab={setActiveTab} />
        }

      </div>

    </div>
    
    </>
 
  );
}   

export default MNISTSketchRecognition;