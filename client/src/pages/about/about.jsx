import Header from "../../components/header/Header";
import "./about.css";

export default function About() {
  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row text-center align-items-center">
          <div className="col-md-8 mx-auto">
            <div className="about text-center">
              <h2>
                We are a team of talented Developers, with passion, creation and
                innovation, making Websites you are invited to be a part of our
                amazing team...
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
