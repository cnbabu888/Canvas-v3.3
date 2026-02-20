import React from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { LeftToolbar } from './components/layout/LeftToolbar';
import { RightPanel } from './components/layout/RightPanel';
import { CanvasContainer } from './components/CanvasContainer';

const App: React.FC = () => {
    return (
        <MainLayout
            leftPanel={<LeftToolbar />}
            rightPanel={<RightPanel />}
        >
            <CanvasContainer />
        </MainLayout>
    );
};

export default App;
