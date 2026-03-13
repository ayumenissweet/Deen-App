import "../styles/Options.css";
import AdhkarImg from "../assets/Adhkar.svg";
import MosqueImg from "../assets/Mosque.svg";
import ClockImg from "../assets/Clock.svg";
import TeaImg from "../assets/Tea.svg";

function Options() {
    return (
        <section className="home-options">
            <div className="home-option">
                <img src={AdhkarImg} alt="Adhkar" className="home-option-img"/>
                <p>Adhkār</p>
            </div>
            <div className="home-option">
                <img src={MosqueImg} alt="Mosques" className="home-option-img"/>
                <p>Mosques</p>
            </div>
            <div className="home-option">
                <img src={ClockImg} alt="Iftar Time" className="home-option-img"/>
                <p>Iftar Time</p>
            </div>
            <div className="home-option">
                <img src={TeaImg} alt="Stories" className="home-option-img"/>
                <p>Stories</p>
            </div>
        </section>
    );
}

export default Options;