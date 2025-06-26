import "./Credits.css";

export default function Credits() {
  const teammates = [
    {
      img: "/assets/pal_heads/wht_unicorn_head.png",
      alt: "White Unicorn Pal",
      name: "Christian Hermann",
      role: "Front-end",
      description:
        "Worked on front end pages and User story. Layout, Profile, Learn More, Gallery, Credits",
    },
    {
      img: "/assets/pal_heads/blue_catfish_head.png",
      alt: "Blue Catfish Pal",
      name: "Stacy Lee",
      role: "Front-end",
      description:
        "Worked on front end pages and wireframe. Activity pages for game including bathing, feeding, sleeping, and playing functions for the pet",
    },
    {
      img: "/assets/pal_heads/gld_robot_head.png",
      alt: "Gold Robot Pal",
      name: "MarzeeQ Williams",
      role: "Project Manager",
      description:
        "Worked on the auth and styling of the pages. connected the front end to the back end",
    },
    {
      img: "/assets/pal_heads/wht_dragon_head.png",
      alt: "White Dragon Pal",
      name: "Rachel Davis",
      role: "Front-end",
      description:
        "Worked on pitch, presentation, project management and front end pages. Deathscreen.",
    },
    {
      img: "/assets/pal_heads/grn_dragon_head.png",
      alt: "Green Dragon Pal",
      name: "Tyler Llorens",
      role: "Back-end",
      description: "Back end...",
    },
    {
      img: "/assets/pal_heads/blk_unicorn_head.png",
      alt: "Black Unicorn Pal",
      name: "Zeplin Rowe",
      role: "Animation",
      description:
        "Worked on animation and sprites of pals, did slight work within the back end and front end styling.",
    },
  ];
  return (
    <div className="credits-container">
      <h1 className="credits-title">PixelPal Developer Credits</h1>
      <div>
        {teammates.map((element, index) => (
          <div key={index} className="card">
            <div className="dev-img">
              <img src={element.img} />
            </div>
            <div className="card-details">
              <h2>{element.name}</h2>
              <h3>{element.role}</h3>
              <p>{element.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
