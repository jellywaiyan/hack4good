import React from 'react'
import heroimg from "../../assets/BAHheroimg.jpg"
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';

function HerosectionGuest() {
    const navigate = useNavigate();

    return (
      <div className='hero-container'>
        <div className='hero-content'>
          <img src={heroimg} alt="Big At Heart Hero Image" 
          style={{opacity:0.6}}
          />
          <h1 style={{ fontSize: "1.2rem", position:"relative",
        fontFamily:"cursive",
        fontWeight:'bold',
        width:"65%",
        bottom:500,
        textAlign:"center",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}>
            Big At Heart is a Non-Profit Social Service Organization inspiring GIVING through Volunteering, Donations-in-kind, and Fundraising. We help match volunteers and donors to curated causes, specifically those working for Children, Women, and Low Income communities. We create custom giving projects or connect you to existing causes that you can get involved in.
          </h1>
        </div>
        <Button
        style={{ position:'relative', bottom: 400 ,left: '50%', transform: 'translateX(-50%)', backgroundColor:"rgb(234, 119, 119)", borderColor:"grey", color:"black", fontWeight:"bolder", fontFamily:"cursive" }}
        onClick={() => 
          navigate('/register')}
        >Volunteer With Us Now!</Button>
      </div>
    );
  }

export default HerosectionGuest
