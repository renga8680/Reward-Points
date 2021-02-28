import React, { useState } from "react";
import  getCurrentMonth from "../constants/months";
import dataSets from "../dataSets/customerData";
import "../App.css";

export default function RewardPoints() {

  //Declaration of hooks
  const [selectValue, setSelectValue] = useState(0);
  const [rewardPointsMonthly, setRewardPointsForMonth] = useState([]);
  const [rewardPointsTotal, setTotalRewardpoints] = useState(0);

  // This function is to set in the hooks the selected customer name
  const handleChange = (e) => {
    setSelectValue(parseInt(e.target.value));
  };

  //This function is to calculate the total points and points for every month
  const calculatePoints = () => {
    let totalPoints = 0;
    let totalPointsForMonth = [];
    let totalPointsForTheMonth = 0;
    dataSets[selectValue].purchase.forEach((data, index) => {
      let pointsFor50DollarsPurchase = 0; // To add points if purchase value > 50
      let pointsFor100DollarsPurchase = 0;// To add points if purchase value > 100

      // This if condition checks the purchase value is greater than 50. If so, it adds 1 point to every dollar thereafter.
      if (data.purchaseValue > 50) {
        const difference = data.purchaseValue - 50;
        pointsFor50DollarsPurchase = difference * 1;
      }

      // This if condition checks the purchase value is greater than 100. If so, it adds 2 points to every dollar thereafter.
      if (data.purchaseValue > 100) {
        const difference = data.purchaseValue - 100;
        pointsFor100DollarsPurchase = difference * 2;
      }

      // To calculate total points for a particular month
      totalPointsForTheMonth =
        pointsFor50DollarsPurchase + pointsFor100DollarsPurchase;
      
      // Add monthwise points to totalPointsForMonth array. Splice replaces the value with the original value at a specified index.
      totalPointsForMonth.splice(index, 1, {i : data.month, totalPointsForTheMonth});

      // Add monthwise points to calculate total points. Reduce function would sum up all the values in the array

      //set values in the hooks
      
      setRewardPointsForMonth(totalPointsForMonth);
      
    });
    for(let i = 0 ; i < totalPointsForMonth.length ; i++){
      totalPoints += totalPointsForMonth[i].totalPointsForTheMonth;
    }
    setTotalRewardpoints(totalPoints);
  };

  return (
    <div className="App">
      <h1 className="heading">Customer points calculator </h1>
      <div className="select-customer-heading">Select a Customer to view their total and month-wise points</div>
      <select className="select-field" value={selectValue} onChange={handleChange}>
        {dataSets.map((data, index) => (
          <option className="customer-name" key={index} value={index}>
            {data.name}
          </option>
        ))}
      </select>
      <br />
      <br />
      <button className="calculate-button" onClick={calculatePoints}>Calculate</button>
      <h4>Total reward points : {rewardPointsTotal}</h4>
      <h3>
        {" "}
        {rewardPointsMonthly.map((data, index) => (
          <div className="points-display" key={index}>
            Reward points for the month of {getCurrentMonth(data.i - 1)} is {data.totalPointsForTheMonth}
          </div>
        ))}{" "}
      </h3>
    </div>
  );
}
