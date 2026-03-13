import "../styles/explore.css"
import { useRef } from "react"

export default function Explore() {

  const carouselRef = useRef(null);

  const scrollLeft = () => {
    const cardWidth = 220; // largeur d'une carte
    const gap = 20; // écart entre les cartes
    carouselRef.current.scrollBy({ left: -(cardWidth + gap), behavior: "smooth" });
  }

  const scrollRight = () => {
    const cardWidth = 220;
    const gap = 20;
    carouselRef.current.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
  }

  const features = [
    { title: "Quran", description: "Read and listen to the Holy Quran", icon: "📖" },
    { title: "Mosques", description: "Find mosques near you", icon: "🕌" },
    { title: "Prayer Times", description: "Check daily prayer times", icon: "⏰" },
    { title: "Ramadan", description: "Ramadan calendar and fasting times", icon: "🌙" },
    { title: "Quiz", description: "Test your Islamic knowledge", icon: "🧠" },
    { title: "Extra 1", description: "Extra description", icon: "🧠" },
    { title: "Extra 2", description: "Extra description", icon: "🧠" },
  ];

  return (
    <div className="explore">

        <button className="flech-gauche" onClick={scrollLeft}></button>

        <div className="explore-carousel" ref={carouselRef}>
          {features.map((feature, index) => (
            <div className="explore-card" key={index}>
              <div className="explore-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <button className="flech-droite" onClick={scrollRight}></button>

    </div>
  )
}