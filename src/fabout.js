// Lecture 5th November 2019 - Using object arrays
import './App.css';
import React, { Component } from 'react';
import {Exercise} from './Exercise';
//import HeightValidation from './HeightValidation';
import Food from './Food.js'
import {breakfast} from './breakfast.js'
import {lunch} from './lunch.js'
import {dinner} from './dinner.js'

const localExercisesList = Exercise;
const breakfastList = breakfast;
const lunchList = lunch;
const dinnerList = dinner;

class App extends Component {

// The constructor of this component. We always use this syntax
		constructor(props) {
		 super(props);
// create our state variables
			this.state = { exerciseChosen: [], exerciseList: localExercisesList,
						   myExercise: "None Chosen Yet",
						   formErrors: { "mins": "Please enter how long you did the activity for." 'height': "Please enter your height.", 'weight': "Please enter your weight.",'age': "Please enter your age."},
						   formValid: false,
						   exerciseLengthMins: "",
						   finalCaloriesBurnt: "",
                           callbackCaloriesBurnt: "",
                           gender: localGender,
						   genderChoice:"Male",
						   age: "",
						   height: "",
						   weight: "",
						   recCal:"",
						   myBreakfast: "None chosen yet",
						   myLunch: "None chosen yet",
						   myDinner: "None chosen yet",
						   breakFastChosen: [],
						   lunchChosen: [],
						   dinnerChosen:[],
						   breakfastL: breakfastList,
						   lunch: lunchList,
						   dinner: dinnerList,
};
// bind the button click methods for the app.
			this.handleListChange = this.handleListChange.bind(this);
			this.clearExercises = this.clearExercises.bind(this);
			this.handleChangeNameBox = this.handleChangeNameBox.bind(this);
			this.emptyBasketBtnClick = this.emptyBasketBtnClick.bind(this);
			this.submitButtonClick = this.submitButtonClick.bind(this);
			this.handleBreakfastChange = this.handleBreakfastChange.bind(this);
			this.handleLunchChange = this.handleLunchChange.bind(this);
			this.handleDinnerChange = this.handleDinnerChange.bind(this);
			this.handleAgeBoxChange = this.handleAgeBoxChange.bind(this);
			this.handleHeightBoxChange = this.handleHeightBoxChange.bind(this);
			this.handleWeightBoxChange = this.handleWeightBoxChange.bind(this);
			this.handleGenderChange= this.handleGenderChange.bind(this);
			this.submitButtonClick=this.submitButtonClick.bind(this);
}


			findMealObject(mealName)
			 {
				return function (mealObject)
				{
				return (mealObject.name === mealName)
				}
			 }

			findLunchObject(name)
				 {
				return function (mealName)
					{
				return(mealName.name ===name)
					}
			     }
				findDinnerObject(meal)
				 {
				return function(mealName)
				{
				return (mealName.name===meal)
				}
				  }
			handleBreakfastChange(event) {
			 
			//this.setState({myBreakfast: event.target.value});
			let name = event.target.value;
			let foundMealObj = this.state.breakfastL.filter(this.findMealObject(name));

			this.setState({breakFastChosen: this.state.breakFastChosen.concat(foundMealObj)});
			}

			handleLunchChange(event){
			//this.setState({myLunch: event.target.value});
			let lname = event.target.value;
			let foundLunchObj = this.state.lunch.filter(this.findLunchObject(lname));
			this.setState({lunchChosen: this.state.lunchChosen.concat(foundLunchObj)});
			}
 
			handleDinnerChange(event){
			this.setState({myDinner: event.target.value});
			let dname = event.target.value;
			let foundDinnerObj = this.state.dinner.filter(this.findDinnerObject(dname));
			this.setState({dinnerChosen: this.state.dinnerChosen.concat(foundDinnerObj)});
			}

			clearDinnerChoices(){
			this.setState({dinnerChosen: []});
			}

			clearBreakfastChoices(){
			this.setState({breakFastChosen:[]});
			}

			clearLunchChoices(){
			this.setState({lunchChosen: []});
			}

// this is my work
			callbackFunction (item) {

			this.setState({callbackCaloriesBurnt: item});
			}

			// name box handler method.
			// We pass the event - and this method will call validation
			// on the data typed in this box.
			handleChangeNameBox(event) {
			this.setState({exerciseLengthMins: event.target.value});
			this.validateMins(event.target.value);

			//this.validateName(event.target.value);
			}


			findExerciseObject(exerciseName)
			  {
			 return function (exerciseObject)
			 {
			 return (exerciseObject.name === exerciseName)
			}
			}


		// Event handler for the drop-down-list
		  handleListChange(event) {
			// We assign the value of the event
			// The event is what is 'selected' from the list. This action
			// is an event.

		// We have to search or filter the array of objects for an
		// object with the 'name' event.target.value ...

		// then setState of myExercise to this object.
		this.setState({myExercise: event.target.value});

		let exName = event.target.value;

		// search list by flter for ecxcercise with name === exName

		let foundExerciseObj = this.state.exerciseList.filter(this.findExerciseObject(exName));

		this.setState({exerciseChosen: this.state.exerciseChosen.concat(foundExerciseObj)});


//this.addToFavourites(event);
     
  }  
 
  //addToFavourites(event)
  //{
    //this.setState({exerciseChosen: this.state.exerciseChosen.concat(event.target.value)});
  //}
 
 
// This method is invoked when the empty basket button is clicked
// We just assign an empty array to the toppingsChosen variable

		emptyBasketBtnClick()
		{
		this.setState({exerciseChosen: []});
		}


		clearExercises()
		  {
			// set the favourites array to empty
			this.setState({exerciseChosen: []});
			this.setState({exerciseLengthMins:""})
			this.setState({myExercise:"None Chosen Yet"})
		   


		  }
		 
		 
			  validateMins (mins){
			 let localFormErrors = this.state.formErrors;

			if (mins === "")
			{
			localFormErrors.mins = "Please enter how long you did the activity for.";
			}

			else if (mins < 0)
			{
			localFormErrors.mins = "Please enter a positive time";
			}

			else if (mins < 1)
			{
			localFormErrors.mins = "Please enter how long you did the activity for.";
			}

			else if (mins > 600)
			{
			localFormErrors.mins = "Sorry, the time you have entered is too long";
			}

			else if(isNaN(mins))
			{
			localFormErrors.mins = "Sorry, the time you have entered is not an actual number.";
			}
			else if (!(/^\d+$/.test(mins)))
			{
			localFormErrors.mins = "Sorry, the time you have entered is not an actual number.";
			}
			else
			{
			localFormErrors.mins = "";
			}

			this.setState({formErrors: localFormErrors});
			this.validateFormMins();
			 
			   }
			   
			   validateFormMins(){
			  if (this.state.formErrors.mins === ""){
			  this.setState({formValid: true});
			  }
			  else this.setState({formValid: false});
			   }
			   
			validateAge(age){
			let localFormErrors = this.state.formErrors;
			
			if (age === "")
			{
				localFormErrors.age = "Please enter your age.";
			}
			
			else if (age < 18)
			{
				localFormErrors.age = "Sorry, you must be at least 18 years of age to use the application.";
			}
			
			else if (age > 100)
			{
				localFormErrors.age = "Sorry, you are too old to use the application";
			}
			
			else if(isNaN(age))
			{
				localFormErrors.age = "Sorry, the age you have entered is not an actual number.";
			}
			else if (!(/^\d+$/.test(age)))
			{
				localFormErrors.age = "Sorry, the age you have entered is not an actual number.";
			}
			else
			{
				localFormErrors.age = "";
			}
			
			this.setState({formErrors: localFormErrors});
			this.validateFormInfo();
			
				
	   }	
		
		validateHeight(height){
			let localFormErrors = this.state.formErrors;
			
			if (height === "")
			{
				localFormErrors.height = "Please enter your height.";
			}
			
			else if (height < 36)
			{
				localFormErrors.height = "Sorry, you must be at least 36 inches to use the application.";
			}
			
			else if (height > 86)
			{
				localFormErrors.height = "Sorry, you are too tall to use the application";
			}
			
			else if(isNaN(height))
			{
				localFormErrors.height = "Sorry, the height you have entered is not an actual number.";
			}
			else if (!(/^\d+$/.test(height)))
			{
				localFormErrors.height = "Sorry, the height you have entered is not an actual number.";
			}
			else
			{
				localFormErrors.height = "";
			}
			
			this.setState({formErrors: localFormErrors});
			this.validateFormInfo();
			
				
	   }	
	   
	   validateWeight(weight){
		   let localFormErrors = this.state.formErrors;
		   
		   if (weight === "")
			{
				localFormErrors.weight = "Please enter your weight.";
			}
		   else if (weight < 0)
		   {
			   localFormErrors.weight = "Please enter a positive weight.";
		   }
		   else if (weight > 800)
		   {
			   localFormErrors.weight = "Sorry the weight you have entered is too heavy.";
		   }
		   	else if(isNaN(weight))
			{
				localFormErrors.weight = "Sorry, the weight you have entered is not an actual number.";
			}
			else if (!(/^\d+$/.test(weight)))
			{
				localFormErrors.weight = "Sorry, the weight you have entered is not an actual number.";
			}
			else
			{	
				localFormErrors.weight = "";
			}
			
			this.setState({formErrors: localFormErrors});
			this.validateFormInfo();
			
		}
	     
	   
	   validateFormInfo(){
		   if (this.state.formErrors.height === "" && this.state.formErrors.weight === "" && this.state.formErrors.age === ""){
			   this.setState({formValid: true});
		   }
		   else this.setState({formValid: false});
		} 



			sortExercisesByName(dx,dy)
			  {
				if (dx.name.toUpperCase() > dy.name.toUpperCase())
				  return 1;
				else if (dx.name.toUpperCase() < dy.name.toUpperCase())
				  return -1;
				else
				  return 0;
			  }

			submitButtonClick(){

			this.setState({finalCaloriesBurnt: this.state.exerciseLengthMins })


			this.validateMins();
			}


			   
			 
			 
			 
			  // we provide the render() function which will have the JSX code
			  // we want to use to 'render' this component.
			   render() {
			  return(
				  <div className="App">
			<div  class = "container-fluid">
				  <div class="alert alert-success" role ="alert">
				  <h1>Lighten Up</h1>
			<h2> Your Daily Meal & Exercise Tracker</h2>

			<Food breakFastChosen ={this.state.breakFastChosen}
			lunchChosen={this.state.lunchChosen}
			dinnerChosen={this.state.dinnerChosen}
			basket={this.state.exerciseChosen}  
			eBasketClk={this.emptyBasketBtnClick}
			exerciseLengthMins={this.state.exerciseLengthMins}
			finalCaloriesBurnt={this.state.finalCaloriesBurnt}
			   />
			<form>
			<div class="form-group">
			Pick a breakfast meal<br/>
			<select class="col-sm-4 col-form-label" onChange={this.handleBreakfastChange}>
			{
			this.state.breakfastL.map(meal=>
			<option value={meal.name}>
			({meal.name}) </option>
			)
			 }
				</select>
			   </div>
			   </form>
			 
			 
			  <form>
			  <div class="form-group">
			  Pick a lunch meal<br/>
			 
			  <select class="col-sm-4 col-form-label" onChange={this.handleLunchChange}>
			  {
			  this.state.lunch.map(lunch=>
			  <option value={lunch.name}>
			  ({lunch.name}) {lunch.kcal}</option>
			  )
			  }
			  </select>
			  </div>
			  </form>
			 
			 <form>
			 <div class ="form-group">
			  Pick a dinner meal<br/>
			  <select class="col-sm-4 col-form-label" onChange={this.handleDinnerChange}>
			  {
			  this.state.dinner.map(dinner=>
			  <option value={dinner.name}>
			  ({dinner.name}) {lunch.kcal} </option>
			  )
			  }
			 </select>
			  </div>
			  </form>

			<button onClick={()=>this.clearBreakfastChoices()}type="button" class="btn btn-danger btn-lg active"> Clear Breakfast Choices</button>&nbsp;
			<button onClick={()=>this.clearLunchChoices()}type="button" class="btn btn-danger btn-lg active"> Clear Lunch Choices</button>&nbsp;
					<button onClick={()=>this.clearDinnerChoices()}type="button" class="btn btn-danger btn-lg active"> Clear Dinner Choices</button>



				 
			   
				   
					{/* Let's add a form to allow a SELECT list */}
					<form>
					<div class="form-group">
						Pick an Exercise:<br/>
						<select class="col-sm-4 col-form-label" onChange={this.handleListChange} >

						  {
			 this.state.exerciseList.sort(this.sortExercisesByName).map(exercises=>
							   
								<option value={exercises.name}>
							   
						   

							   {exercises.name} </option>
							)
						  }
						</select>
					  </div>
					</form>
				   
				   
				   
			Your chosen Exercise is : <mark>{this.state.myExercise}</mark> <br/>
			Your chosen Exercise time (mins)is : <mark>{this.state.exerciseLengthMins}</mark>



			<form>
			<div class="form-group">
			<label>
			Please enter the length of time you spent on a given Exercise in 15 minute increments:

			<input type="text" value={this.state.exerciseLengthMins} name="getName" onChange={this.handleChangeNameBox} />
			</label>
			<br/>
			<button disabled={!this.state.formValid} onClick={this.submitButtonClick}  type = "button" class="btn btn-warning btn-lg">Submit Details</button>
			</div>
			</form>

			<br/>
			<br/>
			<br/>
			<button onClick={this.clearExercises} type="button" class="btn btn-danger btn-lg active">
					Clear Exercise</button>

			<br/>
			<p class = "lead text-justify">



				  <br/>

			</p>
			 </div>

			 </div>
			 </div>
 
   );
  } // render
} // class App
export default App;
//<HeightValidation formErrors={this.state.formErrors}/>
