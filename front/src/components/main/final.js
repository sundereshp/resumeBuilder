// components/main/final.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Firstpage from './Final/firstpage';
import StepViewer from './Final/StepViewer';
import Congrats from './Final/Congrats';

const Final = () => {
    return (
        <Routes>
            <Route path="firstpage" element={<Firstpage />} />
            <Route path=":section" element={<StepViewer />} />
            <Route path="congrats" element={<Congrats />} />
        </Routes>
    );
};

export default Final;

