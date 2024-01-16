import { useState } from "react";
import { Card } from "./components/businessCard";

function App() {
  const [card, setCard] = useState({
    name: "Nitin",
    description: "Working at Infosys",
    interests: ["Coding", "Gaming", "Fitness"],
    instagram: "https://www.instagram.com",
    twitter: "https://www.x.com",
  });

  return (
    <>
      <Card
        name={card.name}
        description={card.description}
        interests={card.interests}
        instagram={card.instagram}
        twitter={card.twitter}
      />
    </>
  );
}

export default App;
