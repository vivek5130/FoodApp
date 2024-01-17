import React, { useEffect, useState } from "react";
// import { useHistory } from 'react-router-dom'; //using useHistory to refresh page (loading new page/navigating) when new review is added
//useHistory is replaced with useNavigate;
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const Reviews = (props) => {
  // const history = useHistory();
  const navigate = useNavigate();

  //fetching reviews
  let { id } = useParams();
  // console.log(id);
  const [reviews, setReview] = useState(null);
  let submitLoad = false;

  // submiting review
  const [newReview, setNewReview] = useState(null);
  const [rating, setRating] = useState(null);
  const submitReview = async (e) => {
    try {
      submitLoad = !submitLoad;
      e.preventDefault();
      //   const planId = reviews[0].plan._id//if no reviews then how do we get plan id
      const planId = id;
      // console.log(reviews);
      const localData = localStorage.getItem("user");
      const parsedData = JSON.parse(localData);
      // console.log("pas",parsedData)
      const userId = parsedData.userId;
      const data = { review: newReview, rating, user: userId, plan: planId }; //need to add user name and plan name;
      // console.log("plan id: ", planId);
      // console.log(data);

      const response = await fetch(
        `http://localhost:4000/review/crud/${planId}`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            //   'Authorization':`Bearer ${user.token}`
          },
        }
      );
      const json = await response.json();
      // console.log(json);

      if (!response.ok) {
        console.log("review has not sent");
      }
      if (response.ok) {
        console.log("Review added successfully");
        // console.log(json);
        setReview((prevReviews) =>
          prevReviews ? [...prevReviews, json.data] : [json.data]
        );

        //   navigate(`/{plans/${planId}}`);
        //   navigate(`/{plans/${planId}}`, { replace: true })

        //display on web that review is sent
        function showPopup(message, duration) {
          var popup = document.getElementById("popupmessage");
          popup.innerText = message;
          popup.style.display = "block";

          // Set a timeout to hide the pop-up after the specified duration
          setTimeout(function () {
            popup.style.display = "none";
          }, duration);
        }
        showPopup("Review created successfully", 3000);
      }
    //   window.location.reload(false);   //reloading entire page
    } catch (err) {
      resizeBy.json({ error: err.message });
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/review/${id}`);

        if (response.ok) {
          const { data } = await response.json();
          if (data.length) {
            // console.log("Reviews data:",data);
            setReview(data);
          } else {
            // setReview('No reviews to display');
            setReview(null); // or setReview(null)
            console.log("No reviews to display");
          }
        } else {
          console.log("Review response is not ok");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchData();
  }, [newReview]);

  return (
    <div>
      <h1>Reviews</h1>
      <div className="review-section" >
        {reviews && <h1>Plan name: {props.foodPlanName}</h1>}
        {reviews &&
          reviews.map((reviews) => (
            <div className="review-card" key={reviews._id}>
                {/* {console.log(reviews)} */}
              <img
                className="profileImage"
                src={reviews.user && reviews.user.profileImage ?`http://localhost:4000/user/image/${reviews.user.profileImage
                  .split("/")
                  .pop()}`:''}
              />
              <span>{reviews.user.name} </span>
              {/* <p><strong>Plan Name:  </strong>{reviews.plan.name}</p>  */}
              <h4>
                <strong>review: </strong>
                {reviews.review}
              </h4>
              <p>{reviews.rating}*</p>
            </div>
          ))}
        {!reviews && <div>No reviews to display </div>}
        <h3>Write your review</h3>
        <form onSubmit={submitReview}>
          <label>Review:</label>
          <input
            type="text"
            required
            onChange={(e) => setNewReview(e.target.value)}
          ></input>
          <label>Rating</label>
          <input
            type="number"
            min={1}
            max={10}
            required
            onChange={(e) => setRating(e.target.value)}
          />
          <button>submit</button>
          <div id="popupmessage"></div>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
