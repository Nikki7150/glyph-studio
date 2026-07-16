import Playground, { PlaygroundPanel } from './features/playground/Playground.jsx';
import CharacterExplorer, { CharacterExplorerPanel } from './features/character-explorer/CharacterExplorer.jsx';
import Home, { HomePanel } from './features/home/Home.jsx';

const routes = [
    { path: '/', element: <Home />, panel: <HomePanel /> },
    { path: 'playground', element: <Playground />, panel: <PlaygroundPanel /> },
    { path: 'character-explorer', element: <CharacterExplorer />, panel: <CharacterExplorerPanel /> },
];

export default routes;

export function isRouteActive (route, pathname) {
    const normalizedPath = route.path === '/' ? '/' : route.path.startsWith('/') ? route.path : `/${route.path}`;
    return normalizedPath === pathname;
}