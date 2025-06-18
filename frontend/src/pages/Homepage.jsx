import { NavLink } from "react-router";
import "./Homepage.css";

export default function Homepage() {
  return (
    // logo for link to homepage
    <>
      <div className="homepage">
        <section className="homepage-main ">
          <h2 className="homepage-title">Welcome to PixelPal</h2>
          <p className="homepage-subtitle">Adopt a virtual pet today!</p>

          <div className="pet-placeholder">
            <img
              className="homepage-image"
              src="/images/pertplaceholder.png"
              alt="Your digital pet"
            />
          </div>
        </section>
      </div>
      <footer className="homepage-footer">
        <NavLink to="/learn-more" className="button-link">
          Learn More
        </NavLink>
      </footer>
    </>
  );
}
