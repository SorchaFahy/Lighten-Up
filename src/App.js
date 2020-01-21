		// Lecture 5th November 2019 - Using object arrays
		import './App.css';
		import React, { Component } from 'react';
		import {Exercise} from './Exercise';
		//import HeightValidation from './HeightValidation';
		import Food from './Food.js'
		import {breakfast} from './breakfast.js'
		import {lunch} from './lunch.js'
		import {dinner} from './dinner.js'
		import {Gender1} from './GenderDB.js';
		import Gender from './Gender';
		import HeightValidation from './HeightValidation.js';
        //Imported JSON objects for dropdown lists
		const localExercisesList = Exercise;
		const breakfastList = breakfast;
		const lunchList = lunch;
		const dinnerList = dinner;
		const localGender = Gender1;

		class App extends Component {

		// The constructor of this component. We always use this syntax
		constructor(props) {
		super(props);
		// create our state variables
		this.state = { exerciseChosen: [], exerciseList: localExercisesList,
		  myExercise: "None Chosen Yet",
		  formErrors: { "mins": "Please enter how long you did the activity for.", 'height': "Please enter your height.", 'weight': "Please enter your weight.",'age': "Please enter your age.", 'address1': "Please fill out Address 1.", 'address2': "Please fill out Address 2.", 'county':"Please enter your county."},
		  formValidMins: false,
		  formValidInfo: false,
		  formValidAddress: false,
		  exerciseLengthMins: "",
		  finalCaloriesBurnt: "",
          callbackCaloriesBurnt: "",
		  gender: localGender,
		  genderChoice:"Male",
		  Address1: "",
		  Address2: "",
								   County: "",
		  age: "",
		  height: "",
		  weight: "",
		  recCal:"",
		  breakFastChosen: [],//array to save users breakfast choices from list
		  lunchChosen: [],  //array to save lunch choices from list
		  dinnerChosen:[], //array to save dinner choices from list
		  breakfastL: breakfastList, //state variables of imported JSON meal objects
		  lunch: lunchList,
		  dinner: dinnerList,
		  orderMessage: ""  //this message will be updated when user enters their address and sends order
		};
		// bind the button click methods for the app.
		this.handleListChange = this.handleListChange.bind(this);
		this.clearExercises = this.clearExercises.bind(this);
		this.handleChangeNameBox = this.handleChangeNameBox.bind(this);
		this.emptyBasketBtnClick = this.emptyBasketBtnClick.bind(this);
		this.submitButtonClickMins = this.submitButtonClickMins.bind(this);
		this.handleBreakfastChange = this.handleBreakfastChange.bind(this);
		this.handleLunchChange = this.handleLunchChange.bind(this);
		this.handleDinnerChange = this.handleDinnerChange.bind(this);
		this.handleAgeBoxChange = this.handleAgeBoxChange.bind(this);
		this.handleHeightBoxChange = this.handleHeightBoxChange.bind(this);
		this.handleWeightBoxChange = this.handleWeightBoxChange.bind(this);
		this.handleGenderChange= this.handleGenderChange.bind(this);
		this.submitButtonClickRecCals=this.submitButtonClickRecCals.bind(this);
		this.handleAddressClick1=this.handleAddressClick1.bind(this);
		this.handleAddressClick2=this.handleAddressClick2.bind(this);
		this.handleAddressClick3=this.handleAddressClick3.bind(this);
		this.submitOrderClick=this.submitOrderClick.bind(this);
		}


		handleAddressClick1(event)
		{
		this.setState({address1: event.target.value});
		this.validateAddress1(event.target.value);
		}

		handleAddressClick2(event)
		{
		this.setState({address2: event.target.value});
		this.validateAddress2(event.target.value);
		}

		handleAddressClick3(event)
		{
		this.setState({address3: event.target.value});
		this.validateCounty(event.target.value);
		}


		submitOrderClick(){    //To handle when user places their meal order with the app
					this.setState({lunchChosen: []});
					this.setState({breakFastChosen:[]});
					this.setState({dinnerChosen: []});
					this.setState({orderMessage: "Your order is on the way!"});
					}
		 

		findMealObject(mealName) //filter function to find users choice in breakfast array
		{
		return function (mealObject)
		{
		return (mealObject.name === mealName)
		}
		}

		findLunchObject(name) //filter function for lunch choice
		{
		return function (mealName)
		{
		return(mealName.name ===name)
		}
			}
		findDinnerObject(meal) //filter function for dinner choice
		{
		return function(mealName)
		{
		return (mealName.name===meal)
		}
		 }
		 
		handleAgeBoxChange(event){
		this.setState({age: event.target.value});
		this.validateAge(event.target.value);
		}

		handleWeightBoxChange(event){
		this.setState({weight: event.target.value});
		this.validateWeight(event.target.value);

		}

		handleGenderChange(event){
		this.setState({genderChoice: event.target.value});

		}

		handleHeightBoxChange(event){
		this.setState({height: event.target.value});
		this.validateHeight(event.target.value);


		}

		handleBreakfastChange(event) { //to handle when user selects a meal from drop down list

		let name = event.target.value;    //saves users choice to variable
		let foundMealObj = this.state.breakfastL.filter(this.findMealObject(name));//to be filtered/searched for in given array

		this.setState({breakFastChosen: this.state.breakFastChosen.concat(foundMealObj)});//once found, add this object to users chosen meals array
		}

		handleLunchChange(event){   //as above with lunch list
		let lname = event.target.value;
		let foundLunchObj = this.state.lunch.filter(this.findLunchObject(lname));
		this.setState({lunchChosen: this.state.lunchChosen.concat(foundLunchObj)});
		}
		 
		handleDinnerChange(event){    //as above with dinner list
		this.setState({myDinner: event.target.value});
		let dname = event.target.value;
		let foundDinnerObj = this.state.dinner.filter(this.findDinnerObject(dname));
		this.setState({dinnerChosen: this.state.dinnerChosen.concat(foundDinnerObj)});
		}

		clearDinnerChoices(){ //buttons for user to empty their chosen array
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
		 this.setState({formValidMins: true});
		 }
		 else this.setState({formValidMins: false});
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
		  this.setState({formValidInfo: true});
		  }
		  else this.setState({formValidInfo: false});
		}

		validateAddress1(address1){
		let localFormErrors = this.state.formErrors;

		if (/^[a-z0-9áéíóú ]+$/i.test(address1)){
		localFormErrors.address1 = "";
		}
		else if (address1 === ""){
		localFormErrors.address1 = "Please fill out Address 1."
		}
		else{
		localFormErrors.address1 = "Only alphanumeric characters are permitted in Address 1."
		}
		this.setState({formErrors: localFormErrors});
		this.validateFormAddress();

		}

		validateAddress2(address2){
		let localFormErrors = this.state.formErrors;

		if (/^[a-z0-9áéíóú ]+$/i.test(address2)){
		localFormErrors.address2 = "";
		}
		else if (address2 === ""){
		localFormErrors.address2 = "Please fill out Address 2."
		}
		else{
		localFormErrors.address2 = "Only alphanumeric characters are permitted in Address 2."
		}
		this.setState({formErrors: localFormErrors});
		this.validateFormAddress();

		}

		validateCounty(county){
		let localFormErrors = this.state.formErrors;

		if (/^[a-z]+$/i.test(county)){
		localFormErrors.county = "";
		}
		else if (county === ""){
		localFormErrors.county = "Please enter your county."
		}
		else{
		localFormErrors.county = "Only letters are permitted in County."
		}
		this.setState({formErrors: localFormErrors});
		this.validateFormAddress();

		}


		validateFormAddress(){
		if (this.state.formErrors.address1 === "" && this.state.formErrors.address2 === "" && this.state.formErrors.county === "" ){
		this.setState({formValidAddress: true})
		}
		else{
		this.setState({formValidAddress: false})
		}
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

		submitButtonClickMins(){

		this.setState({finalCaloriesBurnt: this.state.exerciseLengthMins })
		this.setState({exerciseLengthMins: "" })

		this.validateMins();
		}

		submitButtonClickRecCals(){

		if (this.state.genderChoice === "Male"){

		this.setState({recCal: 66 +(6.3* (this.state.weight)) + (12.9 * (this.state.height)) + (6.8 * (this.state.age))});
		}

		else

		this.setState({recCal: 655 + (4.3 * (this.state.weight)) +(4.7 * (this.state.height)) + (4.7 * (this.state.age))});

		}


		 



		 // we provide the render() function which will have the JSX code
		 // we want to use to 'render' this component.
		  render() {
		 return(

		 <div className="App">
		   <div class = "container">
		<div class ="alert alert-primary">

		<h1>Lighten-Up</h1>
		<p> Welcome to Lighten-Up. Please Enter your Details Below to Return Your Daily Net Calorie Intake  </p>
		<Gender genArray = {this.state.gender} genChoice ={this.state.genderChoice} genchoice1 = {this.handleGenderChange}/>
		<i>Your daily maintenance intake of calories is:</i> <b>{(this.state.recCal)}</b>
		<br/>
		<br/>
		<br/>
		<form>
		<div class= "form-group">
		<label>
		Height (inches):
		<input type="text" value={this.state.height} name = "getHeight"
		onChange = {this.handleHeightBoxChange}  />
		</label> &nbsp;
		<label> Weight(lbs):
		<input type= "text" value={this.state.weight} name = "getWeight"
		onChange= {this.handleWeightBoxChange}/>
		</label> &nbsp;
		<label>
		Age:
		<input type="text" value={this.state.age} name = "getAge"
		onChange = {this.handleAgeBoxChange}/>
		</label>

		<br/>
		<br/>
		<button disabled={!this.state.formValidInfo} onClick={this.submitButtonClickRecCals} type = "button"
		class = "btn btn-info btn-lg">Calculate</button>

		</div>
				</form>

		<HeightValidation formErrors={this.state.formErrors}/>


		 

		</div>
		</div>
		<div  class = "container">
		 <div class="alert alert-primary" role ="alert">
		<h2> Your Daily Meal & Exercise Tracker</h2>





         
      {/*Below the food component is called. In this call, the food object arrays are passed into the component to be mapped*/}

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
		Pick an Exercise:<br/>
		<select class="col-xs-4 col-form-label" onChange={this.handleListChange} >

		 {
		this.state.exerciseList.sort(this.sortExercisesByName).map(exercises=>
		 
		<option value={exercises.name}>
		 
		 

		  {exercises.name} </option>
		)
		 }
		</select>
		 </div>
		</form>
		 
		 
		<form>
		<div class="form-group">
		<label>
		Length of Time (MINS): <br/>

		<input type="text" value={this.state.exerciseLengthMins} name="getName" onChange={this.handleChangeNameBox} />
		</label>
		<br/>
		<button disabled={!this.state.formValidMins} onClick={this.submitButtonClickMins}  type = "button" class="btn btn-info btn-xs active;lkjml">Submit Details</button>
		</div>
		</form>



		<button onClick={this.clearExercises} type="button" class="btn btn-info btn-xs active">
		Clear Exercise</button>

		<br/>
		<br/>
		<br/>
		<p> If you are interested in our <i> Home-Cooked Meal Delivery Service </i>, <br/>please enter your address below and select the plan that's right for you </p>
       {/*below the drop down lists are initialised and mapped to be displayed to screen. The handler method is called here for when the user 
		   chooses from the list*/}
		<form>
		<div class="form-group">
		Pick a breakfast meal<br/>
		<select class="col-xs-4 col-form-label" onChange={this.handleBreakfastChange}>
		{
		this.state.breakfastL.map(meal=>
		<option value={meal.name}>
		{meal.name} </option>
		)
		}
		</select>
		  </div>
		  </form>


		 <form>
		 <div class="form-group">
		 Pick a lunch meal<br/>

		 <select class="col-xs-4 col-form-label" onChange={this.handleLunchChange}>
		 {
		 this.state.lunch.map(lunch=>
		 <option value={lunch.name}>
		 {lunch.name} </option>
		 )
		 }
		 </select>
		 </div>
		 </form>

		<form>
		<div class ="form-group">
		 Pick a dinner meal<br/>
		 <select class="col-xs-4 col-form-label" onChange={this.handleDinnerChange}>
		 {
		 this.state.dinner.map(dinner=>
		 <option value={dinner.name}>
		 {dinner.name} </option>
		 )
		 }
		</select>
		 </div>
		 </form>
         {/*The buttons to clear the users choice are initialised below. Here the handler methods are called*/}
		<button onClick={()=>this.clearBreakfastChoices()}type="button" class="btn btn-info btn-xs active"> Clear Breakfast Choices</button>&nbsp;
		<button onClick={()=>this.clearLunchChoices()}type="button" class="btn btn-info btn-xs active"> Clear Lunch Choices</button>&nbsp;
		<button onClick={()=>this.clearDinnerChoices()}type="button" class="btn btn-info btn-xs active"> Clear Dinner Choices</button>




		<div class="form-group">
		<div class="form-group col-md-10">

		<label >Address 1</label>
		<input type="text" class="form-control col-sm-8 col-form-label" id="inputAddress1" placeholder="1234 Main St"
		value={this.state.address1} onChange={this.handleAddressClick1}/>
		</div>
		</div>
		<div class="form-group">
		<div class="form-group col-md-10">
		<label for="inputAddress2">Address 2</label>
		<input type="text" class="form-control col-sm-8 col-form-label" id="inputAddress2" placeholder="Apartment, town, or floor etc"
		value={this.state.address2} onChange={this.handleAddressClick2}/>
		</div>
		</div>
		<div class="form-group">
		<div class="form-group col-md-10">
		<label for="inputCity">County</label>
		<input type="text" class="form-control col-sm-8 col-form-label" id="inputCounty" value= {this.state.address3} onChange={this.handleAddressClick3}/>
		</div>
		</div>
		<button disabled={!this.state.formValidAddress} onClick={this.submitOrderClick} type = "button"
		class = "btn btn-info btn-xs active">Order</button><br/>
		<p>
		
		
		{this.state.orderMessage}
		
		
		
		</p>
	
		The address you have chosen is: <br/>{this.state.address1}<br/>{this.state.address2}<br/>{this.state.address3}<br/>



		<div className = "add1Validation">
		<div class = "container-fluid">
		<div class = "alert alert-warning">
		<strong> {this.state.formErrors.address1}</strong>
		</div>
		</div>
		</div>

		<div className = "add2Validation">
		<div class = "container-fluid">
		<div class = "alert alert-warning">
		<strong> {this.state.formErrors.address2}</strong>
		</div>
		</div>
		</div>

		<div className = "add3Validation">
		<div class = "container-fluid">
		<div class = "alert alert-warning">
		<strong> {this.state.formErrors.county}</strong>
		</div>
		</div>
		</div>
		 
		 
		{/* Let's add a form to allow a SELECT list */}


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
