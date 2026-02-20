import React, { useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { LeftToolbar } from './components/layout/LeftToolbar';
import { RightPanel } from './components/layout/RightPanel';
import { CanvasContainer } from './components/CanvasContainer';
import { RDKitService } from './services/RDKitService';

const App: React.FC = () => {
    useEffect(() => {
        // Initialize WASM
        RDKitService.getInstance().init();
    }, []);

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
