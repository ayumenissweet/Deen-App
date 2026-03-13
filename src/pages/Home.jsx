import React from "react";
import "../styles/Home.css";
import Calendar from "../components/Calendar";
import Explore from "../components/Explore";
import Options from "../components/Options";
import bismilah from "/bismilah.svg";
import hi from "../assets/hi.svg";

function Home() {
  return (
    <>
      <header>
        <img src={bismilah} alt="Bismillah" className="bismilah" />
      </header>
      <section className="welcome-section">
        <h2>Hello, Muslims!</h2>
        <img src={hi} alt="Wave" />
      </section>
      <main className="home-main">
        <Calendar />
        <Options />
      </main>
      <section>
        <h2 className="explore-title">Explore</h2>
      </section>
      <section className="explore-section">
        <Explore />
      </section>
    </>
  );
}

export default Home;
