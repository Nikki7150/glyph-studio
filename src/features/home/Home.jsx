import './Home.css'
import { FaPen, FaCamera, FaImages, FaSlidersH, FaSearch } from 'react-icons/fa';
import { MdCompare } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const heroAscii = `@@@@@%#*=-::::::::::--=+*##%%%###########%%%@@@%%%%@@@@@@@@@@@@@@@%%%%%%%####****+++++++=======++++***###%%%%%%%%%%%%%%%
@@@@@@%*+-:::::::::::-=+**#######********##%%@@@@@@@@@@@@@@@@@@%%%%%%%##***+++========-------======+++***#########%%%%%%
@@@@@@%#+-::::::::::::-=++*####*****++++++**#%%@@@@@@@@@@@@@@@%%%%%%##**++===----::::::::::::-------===+++++++++**#%%%@@
@@@@@@%%*=-::::::::::::-=++******+++++======+*#%@@@@@@@@@@@@@@@@%%%%%%%##**++==---::::::::::::::::::----======-==+*#%@@@
@@@@@@@%#+=-::::::::::::-=++****+++====------=+*#%@@@@@@@@@@@@@@@@@@@@@@@@%%%##**+==--::::::::::::::::::-----:::-=*#%@@@
@@@@@@@@%#+-:::::::::::::-=+**##**++==---:::::--=+#%%@@@@@@@@@@@@@@@@@@@@@@@@@@@%%##*+==-::::::::::::::::::::::::-=*%%@@
%@@@@@@@@%*+-:::::----::::-=+*##%##**+=--::::::::--=+*##%%%%@@@@@@@@@@@@@@@@@@@@@@@@@%%#*+=-::::::----::::::::::::-+#%@@
%%@@@@@@@@%*+-::::--==--:::-=+*#%%%%%#**=--:::-==+++++****#######*********##%%%@@@@@@@@@%%#*+=-:::::------:::::-----+#@@
#%%@@@@@@@@%#+-:::--====--::-=+*#%%@@@%%#*+=----=+*#%%%%%%%%%%%%%%%###***++===++**#%%@@@@@@%%#*=-:::::---------=++=-=*%@
*#%%@@@@@@@@%#+=-::-=++++=-::-=+*#%@@@@@@%%##*+=----==++**#####%%%%%%%%%%%%#*+=----=+*#%%@@@@@%#*+-:::::------=+*#*=-=*%
+*#%%@@@@@@@@%#*=-::-=+**+=-:::-=*#%%@@@@@@@@%%##**++===============+++++++++++=-::::--=+*%%@@@@%#*+--:::::--=+*#%%*=-+#
=+*#%%@@@@@@@@@%#+-::-=+***+=-::-=+*#%@@@@@@@@@@@@@@%%%%%%%%%########****+++==---::::::::-=*#%@@@@%#*=-:::::--+*%@%#+-=+
-==+#%%@@@@@@@@@%#*=-:--=+**+=-:::-=+#%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%#**+=-:::::::-=*#%@@@@%#+=-::::-=+#%@%*=-=
:--=+*#%@@@@@@@@@@%#+=-:--=+++==-:::-=*#%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%#+=-::::::-+#%@@@@%%*+--:::-=*%@%*=--
::--=+*#%%@@@@@@@@@@%#+=-::-=====-::::-=+*#%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#+-::-----+#@@@@@@%#+=-:::-+#%%#+--
::::--=+*#%@@@@@@@@@@@%#*=-:::-----:::::-=+*##%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#+---==--=*%@@@@@@%#*=-:::-+#%%*=-
:::::--==+*#%@@@@@@@@@@@%#*+=-::::::::::::-==+*##%%%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#+-=**+=-+#@@@@@@@%%*+--::=*#%#+-
:::::::--==+*#%%@@@@@@@@@@@%#*+=--:::::::::--==+**##%%%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@%+==#%#+-+#%@@@@@@@%%*+--:-=*%#+=
::::::::::--=+*#%%@@@@@@@@@@@@%%#*++=---::----==+**##%%%%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@#+=+#@%+-=*%@@@@@@@@@%*+-::-+##*+
::::::::::::--==+*##%%@@@@@@@@@@@@%%%##*++++++++***##%%%%%%%%%%@@@@@@@@@@@@@@@@@@@@@@@%*==*%@%+-=*%@@@@@@@@@%%*=-:-=*#**
:::::::::::::::---=++*#%%@@@@@@@@@@@@@@@%%%%%%%%%%%%%%%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@%*==+#@@#+-=*%@@@@@@@@@@%#+=--=+###
::::::::::::::::::::--=++*##%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%*=-=#%@@#+-=#%@@@@@@@@@@@%*=--=+#%%
:::::::::::::::::::::::::--=++*##%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#+--=*%@@%*==*%@@@@@@@@@@@@%#+--=+#%@
::::::::::::::::::::::::::::::--==+**##%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#*=--=*%@@@#+=+#@@@@@@@@@@@@@%#+--=+#%@
--:::::::::::::::::::::----::::::::--==++**##%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#+=-:=*%@@@%*==*%@@@@@@@@@@@@@%#+--=+#%@`;

    const navigate = useNavigate();

    return (
        <div className="home">
            <div className="nav-bar">
                <h1 className="text-1xl font-bold">▊ GLYPH STUDIO</h1>
            </div>
            <div className="home-content">
                <div className="hero">
                    <pre className="hero-ascii-bg">{heroAscii}</pre>
                    <h1 className="hero-heading text-3xl font-bold">TURN PIXELS INTO ASCII</h1>
                    <h2>LEARN. EXPERIMENT. <span className="text-purple-500 text-xl">CREATE.</span></h2>
                    <p className="hero-description">THE interactive ASCII art studio to learn , explore, and create amazing ASCII art.</p>
                </div>
                <h3 className="feature-heading text-xl font-bold">## Features</h3>
                <div className="card-holder">
                    <div className="card-grid">
                        <div className="card" onClick={() => navigate('/playground')}>
                            <div className="card-icon">
                                <FaSlidersH size="2em" />
                            </div>
                            <h3>PLAYGROUND</h3>
                            <p>Upload your image and experiment with the different tools in real time.</p>
                        </div>
                        <div className="card" onClick={() => navigate('/character-explorer')}>
                            <div className="card-icon">
                                <FaSearch size="2em" />
                            </div>
                            <h3>CHARACTER EXPLORER</h3>
                            <p>Explore how each ASCII character works , compare densities, and learn where each one shines.</p>
                        </div>
                        <div className="card" onClick={() => navigate('/drawing-mode')}>
                            <div className="card-icon">
                                <FaPen size="2em" />
                            </div>
                            <h3>DRAWING MODE</h3>
                            <p>Create ASCII art from scratch by painting directly with characters on the canvas.</p>
                        </div>
                    </div>
                    <div className="card-grid">
                        <div className="card" onClick={() => navigate('/live-camera')}>
                            <div className="card-icon">
                                <FaCamera size="2em" />
                            </div>
                            <h3>LIVE CAMERA</h3>
                            <p>Turn your webcam into live ASCII art and adjust settings as you watch it update.</p>
                        </div>
                        <div className="card" onClick={() => navigate('/compare-mode')}>
                            <div className="card-icon">
                                <MdCompare size="2em" />
                            </div>
                            <h3>COMPARE MODE</h3>
                            <p>See exactly how pixels are converted into ASCII characters by comparing side by side.</p>
                        </div>
                        <div className="card" onClick={() => navigate('/gallery')}>
                            <div className="card-icon">
                                <FaImages size="2em" />
                            </div>
                            <h3>GALLERY</h3>
                            <p>Browse your creations, inspect the settings and add more creations.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function HomePanel() {
    return (
        <div className="home-panel">
            <h1 className="home-panel-title text-1xl font-bold">▊ GLYPH STUDIO</h1>
            <div className="divider"></div>
            <h2 className="home-panel-subtitle text-lg font-semibold">USER</h2>
            <h2 className="home-panel-name text-lg font-semibold">Guest</h2>
            <h2 className="home-panel-subtitle text-lg font-semibold">VERSION</h2>
            <h2 className="home-panel-version text-lg font-semibold">1.0.0</h2>
            <h2 className="home-panel-subtitle text-lg font-semibold">ARTWORKS</h2>
            <h2 className="home-panel-artworks text-lg font-semibold">0</h2>
            <h2 className="home-panel-subtitle text-lg font-semibold">CHARACTERS</h2>
            <h2 className="home-panel-characters text-lg font-semibold">95</h2>
            <div className="divider"></div>
        </div>
    );
}