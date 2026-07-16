import Monitor from './layout/Monitor';
import { Routes, Route} from 'react-router-dom';
import Playground from './features/playground/Playground.jsx'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Monitor />} >
                <Route index element={<Playground />} />
                <Route path="playground" element={<Playground />} />
            </Route>
        </Routes>
    );
}

export default App;
