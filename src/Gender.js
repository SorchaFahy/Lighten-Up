import React, { Component } from 'react';
import './App.css';
class Gender extends Component {
	
  render() {

    const localGender = this.props.genArray;
	const localGenChoice = this.props.genChoice;
	const localGenChoice1 = this.props.genchoice1;
	return(
		<div className ="App">
		<div class = "container-fluid">
		<div class="alert alert-primary">
		<form>
		<div class="form-group">
		Pick a gender
	    <select class="form-control" onChange={localGenChoice1}>
	     {
			localGender.map(gen=>
			<option value={gen.gender}>
			{gen.gender}</option>
			 )
		 }
		</select>
		</div>
		</form>
	   
		<p class = "lead text-justify">
		Your chosen Gender is <mark> {localGenChoice}</mark>
		</p>
	  
		</div>
	    </div>
	</div>

	); // end of return statement
  } // end of render function
} // end of class


export default Gender;
