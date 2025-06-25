import "./Credits.css";

export default function Credits() {
  const teammates = [
    {
      name: "Christian Hermann",
      role: "Frontend",
      description:
        "Worked on front end pages and User story. Layout, Profile, Learn More, Gallery, Credits",
    },
    {
      name: "Stacy Lee",
      role: "Frontend",
      description:
        "Worked on front end pages and wireframe. Activity pages for game including bathing, feeding, sleeping, and playing functions for the pet",
    },
    {
      name: "MarzeeQ Williams",
      role: "Project Manager",
      description:
        "Worked on the auth and styling of the pages. connected the frontend to the backend",
    },
    {
      name: "Rachel Davis",
      role: "front-end",
      description:
        "Worked on pitch, presentation, project management and front end pages. Deathscreen.",
    },
    {
      name: "Tyler Llorens",
      role: "Backend",
      description: "Backend...",
    },
    {
      name: "Zeplin Rowe",
      role: "Animation",
      description:
        "Worked on animation and sprites of pals, did slight work within the backend and frontend styling.",
    },
  ];
  return (
    <div className="credits-container">
      <h1 className="credits-title">PixelPal Developer Credits</h1>
      <div>
        {teammates.map((element, index) => (
          <div key={index} className="card">
            <h2>{element.name}</h2>
            <h3>{element.role}</h3>
            <p>{element.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
