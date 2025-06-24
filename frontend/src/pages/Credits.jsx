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
      name: "Stacey Lee",
      role: "example",
      description: "example",
    },
    {
      name: "MarzeeQ Williams",
      role: "example",
      description: "example",
    },
    {
      name: "Rachel Davis",
      role: "example",
      description: "example",
    },
    {
      name: "Tyler Llorens",
      role: "exapmle",
      description: "example",
    },
    {
      name: "Zeplin Rowe",
      role: "exapmle",
      description: "example",
    },
  ];
  return (
    <div className="credits-container">
      <h1 className="credits-title">PixelPal credits</h1>
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
