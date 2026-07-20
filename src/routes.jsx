import Playground, { PlaygroundPanel } from './features/playground/Playground.jsx';
import CharacterExplorer, { CharacterExplorerPanel } from './features/character-explorer/CharacterExplorer.jsx';
import Home, { HomePanel } from './features/home/Home.jsx';
import DrawingMode, { DrawingModePanel } from './features/drawing-mode/DrawingMode.jsx';
import CompareMode, { CompareModePanel } from './features/compare-mode/CompareMode.jsx';
import LiveCamera, { LiveCameraPanel } from './features/live-camera/LiveCamera.jsx';

const routes = [
    { path: '/', element: <Home />, panel: <HomePanel /> },
    { path: 'playground', element: <Playground />, panel: <PlaygroundPanel /> },
    { path: 'character-explorer', element: <CharacterExplorer />, panel: <CharacterExplorerPanel /> },
    { path: 'drawing-mode', element: <DrawingMode />, panel: <DrawingModePanel /> },
    { path: 'compare-mode', element: <CompareMode />, panel: <CompareModePanel /> },
    { path: 'live-camera', element: <LiveCamera />, panel: <LiveCameraPanel /> }
];

export default routes;

export function isRouteActive (route, pathname) {
    const normalizedPath = route.path === '/' ? '/' : route.path.startsWith('/') ? route.path : `/${route.path}`;
    return normalizedPath === pathname;
}