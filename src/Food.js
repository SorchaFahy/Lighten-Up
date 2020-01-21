import './App.css';
import React, { Component } from 'react';
//import cart from './cart.png';


// The Food component allows user input of food eaten.
// Fetches the kcal value of this information from API & stores both values in Food Object array.

class Food extends Component {


// This will 'reduce' our basket - so that we can add the prices
// of all of the items/toppings in our basket.
// each object has a price property.
// have to do something wit hmy totalBasketCost to get it to set back to 0 each time.
		  totalBasketCost(total,localBasket)
		  {

		 return total + localBasket.caloriesBurnt ;
		 
		  }

		totalCalories(total,localBreakfastChosen)
		  {

		 return total + localBreakfastChosen.kcal ;
		 
		  }
		  totalLCalories(total,localLunchChosen)
		  {
		 return total + localLunchChosen.kcal;
		  }
		 
		  totalDCalories(total,localDinnerChosen)
		  {
		 return total+ localDinnerChosen.kcal;
		  }

    render() {
		// const localFoodInput = this.props.foodInput;
		 const localBreakfastChosen = this.props.breakFastChosen;
		 const localLunchChosen = this.props.lunchChosen;
		 const localDinnerChosen = this.props.dinnerChosen;
		 const initalCost = 0;
		 const totalPrice = (localBreakfastChosen.length*5) + (localLunchChosen.length*10) +(localDinnerChosen.length*10);
		 const breakfast = localBreakfastChosen.reduce(this.totalCalories,initalCost);
		 const lunch = localLunchChosen.reduce(this.totalLCalories,initalCost);
		 const dinner = localDinnerChosen.reduce(this.totalDCalories,initalCost);
		 const totalACalories = breakfast + lunch + dinner;
		  // access the properites 'props' of this component  
		 const localExerciseLengthMins = this.props.exerciseLengthMins;
		 
		 const localBasket = this.props.basket;
		 const finalCaloriesBurnt = this.props.finalCaloriesBurnt;
		 const initialCost = 0;  

		 const calorieCount = localBasket.reduce(this.totalBasketCost , initialCost)  * finalCaloriesBurnt
		 
		 const emptyBasketClick = this.props.eBasketClk;
		 
		 
	return (
		 <div className="Food">
		 <div class ="container-fluid">
		 <div class="bg gradient-info">

		<h1> Daily Food Consumed</h1>

		<p>
		Total price of your chosen meal plan: € {totalPrice}
		</p>
		<b> Your chosen breakfasts are :</b>
		<p>



		</p>

		{localBreakfastChosen.map(item =>
		<div key={item.name}>
		<b>Breakfast: </b> {item.name} <b> Calories</b> {item.kcal}<b> € </b> {item.price}
		</div>
		)
		}
		   <b>Your chosen lunches are : </b>
		   <p>
		   
		   
		   
		   </p>
		{localLunchChosen.map(item =>
		<div key={item.name}>
		<b>Lunch: </b>{item.name} <b> Calories</b>{item.kcal} <b> € </b> {item.price}
		</div>
		)
		}
		   <b> Your chosen dinners are: </b>
		   <p>
		   
		   
		   
		   </p>
		{localDinnerChosen.map(item =>
		<div key={item.name}>
		<b>Dinner: </b>{item.name} <b> Calories</b> {item.kcal}<b> € </b>{item.price}
		</div>
		)
		}
				 
				 
		   <b> Total breakfast Calories</b>
			{breakfast}

			<b> Total Lunch Calories</b>
				  {lunch}
		   
		   <b> Total Dinner Calories</b>
		  {dinner}
		   <b> Total Calories: </b>
			 {totalACalories}
			 
			 <br/>
			 <br/>
			 <br/>
		 <h1> Exercises Chosen</h1>
		 
		<b>Number of Exercises chosen:</b> {localBasket.length}
		<b> Total Calories burnt:</b>
		{calorieCount}
		{this.resetFinalCaloriesBurnt}


		{/* Print out the contents of the basket */}
		{localBasket.map(exercise =>
		<li key ={exercise.label}>{exercise.name}</li>
		)
		}
			 
			 </div>
			 </div>
				  </div>
      );


}
 }
     
 export default Food;

