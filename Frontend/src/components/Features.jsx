import React from 'react'

const Features = () => {
  return (
    <div className='feature-section'>
      <h1>Awesome <span>Features</span></h1>
      <div className='feature-container'>
        <div className='card-container'>
            <img src ="images/calender.jpg" alt="image"/>
            <h3>365 DAYS/YEAR</h3>
            
            <p>Never cook again! We really mean that. Our subscription plan include up to 365 days/year of coverage and also you can also choose to order more flexibly if that is your style</p>
        </div>
        <div className='card-container'>
            <img src ="images/delivery.png" alt="image"></img>
            <h3>WITHIN 30 MINUTES</h3>
            <p>you are only 20min away from your delicous and super healthy food</p>
        </div>
        <div className='card-container'>
            <img src ="images/healthy.svg" alt="image"></img>
            <h3>100% HEALTHY</h3>
            <p>All our vegetables are fresh and organic</p>
        </div>
      </div>
    </div>
  )
}

export default Features
