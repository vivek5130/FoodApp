import { useState, useEffect } from "react";
// import DataFetcher from './components/DataFetcher'
import useFoodPlanContext from "../hooks/useFoodPlanContext";
import FoodDetails from "../components/FoodDetails";

import Carousel from "react-bootstrap/Carousel";
// import img1 from '.../public/images/img1'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Features from "../components/Features";
import Contactus from "../components/Contactus";

function Home() {
  const { foodPlans, dispatch } = useFoodPlanContext();
  useEffect(() => {
    const fetchfoodPlans = async () => {
      //changed
      const response = await fetch("http://localhost:4000/plans/allPlans");
      const json = await response.json();

      if (response.ok) {
        // setWorkouts(json)
        console.log("Resopones is ok", json);
        const formattedData = json.data.map((item) => ({
          id: item._id,
          name: item.name,
          price: item.price,
          ratingsAverage: item.ratingsAverage,
          discount: item.discount,
        }));
        dispatch({ type: "SET_FOODPLAN", payload: formattedData });
      } else {
        console.error(
          `Error fetching data: ${response.status} - ${response.statusText}`
        );
      }
    };
    fetchfoodPlans();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="intro" />
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/images/burger.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <div>MEAL PLANS</div>
              <span>FOR </span>
              <span className="carouserl-sentence">EVERYONE</span>
            </div>
          </div>
          <div className="carousel-item">
            <img src="images/pizza.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <p>
                "Eating is a necessity, but cooking is an art."
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="images/chicken.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <p>"Don't eat less, eat right."</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

    {/* features section */}
    <Features/>
      

      {/* To do add review section over here */}
        <h2 className="foodPlan-head">Start eating healthy today</h2>
      <div className="foodPlans">
        {foodPlans &&
          foodPlans.map((foodPlan) => (
            <FoodDetails foodPlan={foodPlan} key={foodPlan.id} />
          ))}
        {/* add contact us section over here */}
      </div>
      <Contactus/>
    </div>
  );
}

export default Home;
