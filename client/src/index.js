import React from 'react';
import ReactDOM from 'react-dom';
import "./main.css";
import App from './App';
import reportWebVitals from './reportWebVitals';



// document.querySelector(".k").addEventListener("click",function (){
//   var x = document.getElementById("root");
//   if (x.style.display === "none") {
//     x.style.display = "block";
//   } else {
//     x.style.display = "none";
//   }
// });  

// const secondHand = document.querySelector('.second-hand');
// const minsHand = document.querySelector('.min-hand');
// const hourHand = document.querySelector('.hour-hand');

// function setDate() {
//   const now = new Date();

//   const seconds = now.getSeconds();
//   const secondsDegrees = ((seconds / 60) * 360) + 90;
//   secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

//   const mins = now.getMinutes();
//   const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
//   minsHand.style.transform = `rotate(${minsDegrees}deg)`;

//   const hour = now.getHours();
//   const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
//   hourHand.style.transform = `rotate(${hourDegrees}deg)`;
// }

// setInterval(setDate, 1000);

// setDate();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
