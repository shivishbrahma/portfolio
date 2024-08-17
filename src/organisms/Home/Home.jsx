import React from "react";

import HeroSection from "@/molecules/HeroSection/HeroSection";
import ProjectSection from "@/molecules/ProjectSection/ProjectSection";
import LanguageSection from "@/molecules/LanguageSection/LanguageSection";
import GithubSection from "@/molecules/GithubSection/GithubSection";
import BlogSection from "@/molecules/BlogSection/BlogSection";

import "./Home.scss";

function Home(props) {
    return (
        <section className="Home" {...props}>
            <HeroSection />
            <ProjectSection />
            <BlogSection />
            <LanguageSection />
            <GithubSection />
        </section>
    );
}

export default Home;
