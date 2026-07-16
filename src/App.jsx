import Monitor from './layout/Monitor';
import { Routes, Route} from 'react-router-dom';
import routes from './routes.jsx';


function App() {
    return (
        <Routes>
            <Route path="/" element={<Monitor />} >
                {routes.map((route) => 
                    route.path === '/' ? <Route key={route.path} index element={route.element} /> : <Route key={route.path} path={route.path} element={route.element} />
                )}
            </Route>
        </Routes>
    );
}

export default App;
