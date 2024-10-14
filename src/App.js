// src/App.js
import React, { useState } from 'react';
import PAPGrid from './components/PAPGrid';
import Dashboard from './components/Dashboard';
import './styles/App.css';

const App = () => {
    const [selectedPAP, setSelectedPAP] = useState(null);

    return (
        <div className="App">
            <h1>Select a PAP</h1>
            <PAPGrid onSelectPAP={setSelectedPAP} />
            {selectedPAP && <Dashboard selectedPAP={selectedPAP} />}
        </div>
    );
};

export default App;
