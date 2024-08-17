import React from "react";

// Molecular Components
import { themes, setCSSVariables, ThemeSelectorContext } from "./theme";
import Navbar from "@/molecules/Navbar/Navbar";
import Footer from "@/molecules/Footer/Footer";
import { Routes, Route, HashRouter as Router } from "react-router-dom";
import Home from "@/organisms/Home/Home";
import Resume from "@/organisms/Resume/Resume";
import Error from "@/organisms/Error/Error";
import Tools from "@/organisms/Tools/Tools";
import Blogs from "@/organisms/Blogs/Blogs";

import "./App.scss";

function App() {
    const [theme, setTheme] = React.useState(window.localStorage.getItem("shivishbrahma-portfolio-theme") || "light");

    function toggleTheme() {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        window.localStorage.setItem("shivishbrahma-portfolio-theme", newTheme);
    }

    React.useEffect(() => {
        setCSSVariables(themes[theme]);
    });

    return (
        <ThemeSelectorContext.Provider value={{ theme: themes[theme] }}>
            <Router basename={import.meta.env.BASE_URL}>
                <div className="App">
                    <header className="App-header">
                        {/* <img src={logo} className="App-logo" alt="logo" /> */}
                        <Navbar />
                    </header>
                    <main className="App-main">
                        <Routes>
                            <Route path="/" exact element={<Home />} />
                            <Route path="/resume" exact element={<Resume />} />
                            <Route path="/blogs" exact element={<Blogs />} />
                            <Route path="/tools/*" element={<Tools />} />
                            <Route path="*" element={<Error />} />
                        </Routes>
                    </main>
                    <footer className="App-footer">
                        <Footer darkModeToggler={toggleTheme} isDark={theme === "dark"} />
                    </footer>
                </div>
            </Router>
        </ThemeSelectorContext.Provider>
    );
}

export default App;
