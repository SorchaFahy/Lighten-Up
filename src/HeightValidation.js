import React, { Component } from 'react';
import './App.css';

class HeightValidation extends Component {
	
  render() {
    const heightValidation = this.props.formErrors;
	
	  return (
	  <div className = "HeightValidation">
		<div class = "container-fluid">
      <div class = "alert alert-warning">
        <strong> {heightValidation.height}</strong>
	
		</div>	
		<div class="alert alert-warning">
		<strong> {heightValidation.weight}</strong>
		
		</div>	
		<div class="alert alert-warning">
		<strong> {heightValidation.age}</strong>
		
	
		</div>
    </div>
    </div>
	) // end of return statement
  } // end of render function
} // end of class


export default HeightValidation;
