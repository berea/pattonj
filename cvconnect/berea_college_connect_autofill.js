
//----------------------------------------------
// Used for Berea College Hobsons Connect to populate various fields	
// Created by Jacob Patton (C) 2017,2018				
//----------------------------------------------

setListener();

// variables
var currentLocation; 	// What's my URL? 
var viewDropDownValue; 	// What's the view? 
var visitDate;			// What date mm/dd/yyyy am I visiting? (CV Registration View)
var feeDate;			// What date mm/dd/yyyy was the deposit paid? (Dec of Intent View)
var fieldInterval;		// Loop for watching field
var highSchoolName;		// What is the current High School Name? (HS Transcript/Counselor Evaluation Form View)
var currentTime;		// Used to set date fields. 
var attempts = 0; 		// Used to check how many attempts to load a view. Assumes that not all views are broken. 

//on load, set main listener for dropdown view. 
function setListener() {
	currentLocation = window.location.pathname;
	if(currentLocation === "/admin/Contacts/Search" || currentLocation === "/admin/Contacts/View" || currentLocation === "/admin/Contacts/Edit"){
		//set view listener
		document.getElementById("contactViews").addEventListener("change", viewUpdate);
		//Trigger once edit or new is clicked 
		if(document.getElementById("editMode") !== null){
			document.getElementById("editMode").addEventListener("click",viewUpdate);
		} else if(document.getElementById("newMode") !== null){
			document.getElementById("newMode").addEventListener("click",viewUpdate);
		}
		//Now run view change update
		viewUpdate();
	}
}

//view change function
function viewUpdate(reloaded){

	//Make sure we clear interval for the field if we are watching for a change. 
	clearInterval(fieldInterval);
	
	//Used to reset attempts to zero since we are not just retrying the viewUpdate function. 
	if(reloaded != true){
		attempts = 0;
	}
	
	//Remove the BereaButton so we can recreate it if needed. 
	if (document.getElementById('bereaButton') !== null){
		var oldButton = document.getElementById("bereaButton");
		oldButton.remove();
	}
		
	//Get the title of the selected dropdown value and remove * if needed. 
	viewDropDownValue = document.getElementById("contactViews").options[document.getElementById("contactViews").selectedIndex].title;
	if( viewDropDownValue.slice(-1)==="*"){
		viewDropDownValue = viewDropDownValue.slice(0, -1);
	} 
	
	//Rewrote as a switch instead of if/else since I added actions. 
	switch (viewDropDownValue){
		case "Campus Visit Itinerary":
			fieldWatch("text598",createCVItineraryButton);
			break;
		case "Campus Visit Reservation":
			fieldWatch("date602Date",createCVReservationDateListener);
			break;
		case "HS Transcript / Counselor Evaluation Form":
			fieldWatch("hsname",createHSTranscriptAndPercentListeners);
			break;
		case "Evaluations and Endorsements":
			fieldWatch("text219",createEEListeners);
			break;	
		case "Dec of Intent / Ent Fee / Non-Enrolling Form":
			fieldWatch ("date2951Date",createFeeDateListener);
			break;
		case "Interview Score Summary-Form":
			fieldWatch ("numeric4261",createInterviewListeners);
			break;
		case "International Apps Processing":
			fieldWatch ("text2961",createInternationalAppListener);
			break;
		default:
			break;
			
	}
	
	
}

//look for the field I need to edit to exist.
//WE ASSUME IT EXISTS. - May be able to fix this later. 
function fieldWatch(myField,myFunction){
	//set loop looking for the field I passed to exist and be editable. 
	fieldInterval = setInterval(function () {
		if(document.getElementById(myField) !== null){
			if (document.getElementById(myField).disabled === false) {  
				//Once available and editable, stop looking and run the passed function. 
				clearInterval(fieldInterval);
				myFunction();
			}
		} 		
		
    }, 150);
}


//-----------//Multi-use functions//-----------//

//Clear if they select OK from the confirm box on click. 
function clearDateChange(myDateField){
	if(myDateField.value === ""){
		alert("Please use date picker to set the date.");
	}else{
		if (confirm("Would you like to clear the date?\n \n (Please use date picker to set the date.)")){
			myDateField.value = "";
		}else{
			return;
		}
	}
	
}

//Sets the current date for the passed date field. 
function setDateField(myDateField){
	currentTime = new Date();
	document.getElementById(myDateField).value = (currentTime.getMonth() + 1) +"/"+currentTime.getDate()+"/"+currentTime.getFullYear();
	
}

//Checking to see if the fields that are modified exist.
function checkViewFields(viewFields){
		var i;
		var len = viewFields.length;
		for (i = 0; i < len;i++){
			if(document.getElementById(viewFields[i]) === null){
				attempts++;
				console.log("Error:failed to find field " + viewFields[i]);
				return false;
			} 				
		}
		attempts = 0;
		return true;
}

function recheckViewFields(){
	//15 (*150 for the field watch timer is 3 seconds) should be long enough to it to try several times. 
	if(attempts >= 15){
		alert("The Berea Connect add-on has encountered an error. Please refresh the view. \n\n If you continue to see this message, please email jacob_patton@berea.edu");
	}else{
		//run the viewUpdate again since we assume the field wasn't ready yet. 
		viewUpdate(true);
	}
}


//--------------
//Campus Visit Functions
//--------------

//-----------//Campus Visits Itinerary View//-----------//

//Creates the main button.
function createCVItineraryButton() {
	if(checkViewFields(["text598","text3381","text3321","text3341","text4581","text4541","text4681","text4627","text4589","text4543","text4683","text4629","text4591","text4545","text4685","text4631","text4593","text4547","text4687","text4633","text4595","text4549","text4689","text4635","text4597","text4551","text4691","text4637","text4599","text4553","text4693","text4639","text4601","text4555","text4695","text4641","text4603","text4557","text4697","text4643","text4605","text4559"])){

	/*Dropdown menu from here https://www.w3schools.com/howto/howto_js_dropdown.asp*/
	//Create our HTML to inject.
	var bereaButton = document.createElement("div");
	bereaButton.style = "float:right";
	bereaButton.id = "bereaButton";
	bereaButton.innerHTML = "<div class='BereaDropdown'>"+
		"<input ID='Berea_Menu_Button' value='Berea Visits' class='BereaBlue bigbutton new' type='button' onclick='return false;'>"+
	  "<div id='BereaMenu' class='BereaDropdown-content'>"+
		"<a href='#' ID='AM_No_Lunch' onclick='return false;'>AM Session</a>"+
		"<a href='#' ID='AM_With_Lunch' onclick='return false;'>AM Session (Lunch)</a>"+
		"<a href='#' ID='PM_Session' onclick='return false;'>PM Session</a>"+
		"<a href='#' ID='Midday_Session' onclick='return false;'>Midday Session</a>"+
		"<a href='#' ID='Clear_Session'onclick='return false;' >Clear Sessions</a>"+
	  "</div></div>";
	var buttonRow = document.getElementsByClassName('triggerBtnsTop');
	buttonRow[0].appendChild(bereaButton);
	//Set even listeners "click" for the buttons above.
	document.getElementById("Berea_Menu_Button").addEventListener("click",showCVItineraryMenu);
	document.getElementById("AM_No_Lunch").addEventListener("click",function(){creatCVItinerary(1);});
	document.getElementById("AM_With_Lunch").addEventListener("click",function(){creatCVItinerary(2);});
	document.getElementById("PM_Session").addEventListener("click",function(){creatCVItinerary(3);});
	document.getElementById("Midday_Session").addEventListener("click",function(){creatCVItinerary(4);});
	document.getElementById("Clear_Session").addEventListener("click",clearCVItinerary);
	

	/*Just as a side note incase I ever need to insert a script code 
	https://www.danielcrabtree.com/blog/25/gotchas-with-dynamically-adding-script-tags-to-html*/
	} else{
		recheckViewFields();
	}
	
}

//Shows the dropdown menu
function showCVItineraryMenu() { 

			document.getElementById('BereaMenu').classList.toggle('show');
			
			window.onclick = function(event) {
				//Close the dropdown menu if the user clicks outside of it
			  if (!event.target.matches('.BereaBlue')) {

				var dropdowns = document.getElementsByClassName("BereaDropdown-content");
				var i;
				for (i = 0; i < dropdowns.length; i++) {
				  var openDropdown = dropdowns[i];
				  if (openDropdown.classList.contains('show')) {
					openDropdown.classList.remove('show');
				  }
				}
			  } else{
				  return ;
			  }
			};
			
		
			
		  
}

//Creates the itinerary and fills in the fields
//I could reduce the lines of code to fill in the activity, location and detail, and then separate times
//but I kept them apart so that in the future if they need to be different they can
function creatCVItinerary(x){
	//Look to see if they need an interview. 	
	var scheduleInterview = document.getElementById("text3791").value;
	
	if(x === 2 || x=== 1){
		
		//Visit Type
		document.getElementById('text598').value ="Weekday Morning Session";
		//Arrival Time
		document.getElementById('text3381').value ="8:45 a.m.";
		//activity 1 (Activity, time, location, detail)
		document.getElementById('text3321').value ="Arrive on Campus";
		document.getElementById('text3341').value ="8:45 a.m.";
		document.getElementById('text4581').value ="Haaga House";
		document.getElementById('text4541').value ="- Lobby";
		//activity 2
		document.getElementById('text4681').value ="Introduction to Berea";
		document.getElementById('text4627').value ="9:00 a.m.";
		document.getElementById('text4589').value ="Haaga House";
		document.getElementById('text4543').value ="- Presentation Room";
		//activity 3
		document.getElementById('text4683').value ="Information Session";
		document.getElementById('text4629').value ="9:10 a.m.";
		document.getElementById('text4591').value ="Haaga House";
		document.getElementById('text4545').value ="- Presentation Room";
		//activity 4
		//Look to see if scheduled interview is yes, otherwise we assume personal conversation
		if (scheduleInterview === "y"){
			document.getElementById('text4685').value ="Personal Interview";
		}
		else{
			document.getElementById('text4685').value ="Personal Conversation w/ Counselor";
		}
		document.getElementById('text4631').value ="9:45 a.m.";
		document.getElementById('text4593').value ="Haaga House";
		document.getElementById('text4547').value ="With Admissions Counselor";
		//activity 5
		document.getElementById('text4687').value ="Student Panel";
		document.getElementById('text4633').value ="10:05 a.m.";
		document.getElementById('text4595').value ="Haaga House";
		document.getElementById('text4549').value ="- Lobby";
		//activity 6
		document.getElementById('text4689').value ="Tour of Campus";
		document.getElementById('text4635').value ="10:30 a.m.";
		document.getElementById('text4597').value ="";
		document.getElementById('text4551').value ="With Student Ambassador";
		
		//For 1* visit, no lunch
		if(x === 1){
			//activity 7
			document.getElementById('text4691').value ="Depart from Campus";
			document.getElementById('text4637').value ="12:00 a.m.";
			document.getElementById('text4599').value ="";
			document.getElementById('text4553').value ="";
			//clear activity 8
			document.getElementById('text4693').value ="";
			document.getElementById('text4639').value ="";
			document.getElementById('text4601').value ="";
			document.getElementById('text4555').value ="";
		//For 4* visit with lunch
		} else if (x === 2){
			//Activity 7
			document.getElementById('text4691').value ="Lunch";
			document.getElementById('text4637').value ="12:00 a.m.";
			document.getElementById('text4599').value ="Dining Services";
			document.getElementById('text4553').value ="With Student Ambassador";
			//activity 8
			document.getElementById('text4693').value ="Depart from Campus";
			document.getElementById('text4639').value ="1:00 p.m.";
			document.getElementById('text4601').value ="";
			document.getElementById('text4555').value ="";
		}
	return false;
	} else if( x === 3) {
		//Visit Type
		document.getElementById('text598').value ="Weekday Afternoon Session";
		//Arrival Time
		document.getElementById('text3381').value ="1:15 p.m.";
		//activity 1 (Activity, time, location, detail)
		document.getElementById('text3321').value ="Arrive on Campus";
		document.getElementById('text3341').value ="1:15 p.m.";
		document.getElementById('text4581').value ="Haaga House";
		document.getElementById('text4541').value ="- Lobby";
		//activity 2
		document.getElementById('text4681').value ="Introduction to Berea";
		document.getElementById('text4627').value ="1:30 p.m.";
		document.getElementById('text4589').value ="Haaga House";
		document.getElementById('text4543').value ="- Presentation Room";
		//activity 3
		document.getElementById('text4683').value ="Information Session";
		document.getElementById('text4629').value ="1:40 p.m.";
		document.getElementById('text4591').value ="Haaga House";
		document.getElementById('text4545').value ="- Presentation Room";
		//activity 4
		//Look to see if scheduled interview is yes, otherwise we assume personal conversation
		if (scheduleInterview === "y"){
			document.getElementById('text4685').value ="Personal Interview";
		}
		else{
			document.getElementById('text4685').value ="Personal Conversation w/ Counselor";
		}
		document.getElementById('text4631').value ="2:15 p.m.";
		document.getElementById('text4593').value ="Haaga House";
		document.getElementById('text4547').value ="with Admissions Counselor";
		//activity 5
		document.getElementById('text4687').value ="Student Panel";
		document.getElementById('text4633').value ="2:35 p.m.";
		document.getElementById('text4595').value ="Haaga House";
		document.getElementById('text4549').value ="- Lobby";
		//activity 6
		document.getElementById('text4689').value ="Tour of Campus";
		document.getElementById('text4635').value ="3:00 p.m.";
		document.getElementById('text4597').value ="";
		document.getElementById('text4551').value ="With Student Ambassador";
		//activity 7
		document.getElementById('text4691').value ="Depart from Campus";
		document.getElementById('text4637').value ="4:30 p.m.";
		document.getElementById('text4599').value ="";
		document.getElementById('text4553').value ="";
		//clear activity 8
		document.getElementById('text4693').value ="";
		document.getElementById('text4639').value ="";
		document.getElementById('text4601').value ="";
		document.getElementById('text4555').value ="";
		
	} else if( x === 4) {
		
		//Visit Type
		document.getElementById('text598').value ="Weekday Midday Session";
		//Arrival Time
		document.getElementById('text3381').value ="10:15 a.m.";
		//activity 1 (Activity, time, location, detail)
		document.getElementById('text3321').value ="Arrive on Campus";
		document.getElementById('text3341').value ="10:15 a.m.";
		document.getElementById('text4581').value ="Haaga House";
		document.getElementById('text4541').value ="- Lobby";
		//activity 2
		document.getElementById('text4681').value ="Introduction to Berea";
		document.getElementById('text4627').value ="10:30 a.m.";
		document.getElementById('text4589').value ="Haaga House";
		document.getElementById('text4543').value ="- Presentation Room";
		//activity 3
		document.getElementById('text4683').value ="Information Session";
		document.getElementById('text4629').value ="10:40 a.m.";
		document.getElementById('text4591').value ="Haaga House";
		document.getElementById('text4545').value ="- Presentation Room";
		//activity 4
		//Look to see if scheduled interview is yes, otherwise we assume personal conversation
		if (scheduleInterview === "y"){
			document.getElementById('text4685').value ="Personal Interview";
		}
		else{
			document.getElementById('text4685').value ="Personal Conversation w/ Counselor";
		}
		document.getElementById('text4631').value ="11:15 a.m.";
		document.getElementById('text4547').value ="With Admissions Counselor";
		document.getElementById('text4593').value ="Haaga House";
		//activity 5
		document.getElementById('text4687').value ="Student Panel";
		document.getElementById('text4633').value ="11:35 a.m.";
		document.getElementById('text4595').value ="Haaga House";
		document.getElementById('text4549').value ="- Lobby";
		//activity 6
		document.getElementById('text4689').value ="Lunch";
		document.getElementById('text4635').value ="12:05 p.m.";
		document.getElementById('text4597').value ="Dining Services";
		document.getElementById('text4551').value ="With Student Ambassador";
		//activity 7
		document.getElementById('text4691').value ="Tour of Campus";
		document.getElementById('text4637').value ="12:45 p.m.";
		document.getElementById('text4599').value ="";
		document.getElementById('text4553').value ="";
		//activity 8
		document.getElementById('text4693').value ="Depart from Campus";
		document.getElementById('text4639').value ="1:45 p.m.";
		document.getElementById('text4601').value ="";
		document.getElementById('text4555').value ="";
	}
		//Clear activity 9 and 10 since we don't use it. 
		//activity 9
		document.getElementById('text4695').value ="";
		document.getElementById('text4641').value ="";
		document.getElementById('text4603').value ="";
		document.getElementById('text4557').value ="";
		//activity 10
		document.getElementById('text4697').value ="";
		document.getElementById('text4643').value ="";
		document.getElementById('text4605').value ="";
		document.getElementById('text4559').value ="";
}

//Clears all itinerary fields
function clearCVItinerary(){
	//Visit Type
		document.getElementById('text598').value ="";
		//Arrival Time
		document.getElementById('text3381').value ="";
		//activity 1 (Activity, time, location, detail)
		document.getElementById('text3321').value ="";
		document.getElementById('text3341').value ="";
		document.getElementById('text4581').value ="";
		document.getElementById('text4541').value ="";
		//activity 2
		document.getElementById('text4681').value ="";
		document.getElementById('text4627').value ="";
		document.getElementById('text4589').value ="";
		document.getElementById('text4543').value ="";
		//activity 3
		document.getElementById('text4683').value ="";
		document.getElementById('text4629').value ="";
		document.getElementById('text4591').value ="";
		document.getElementById('text4545').value ="";
		//activity 4
		document.getElementById('text4685').value ="";
		document.getElementById('text4631').value ="";
		document.getElementById('text4593').value ="";
		document.getElementById('text4547').value ="";
		//activity 5
		document.getElementById('text4687').value ="";
		document.getElementById('text4633').value ="";
		document.getElementById('text4595').value ="";
		document.getElementById('text4549').value ="";
		//activity 6
		document.getElementById('text4689').value ="";
		document.getElementById('text4635').value ="";
		document.getElementById('text4597').value ="";
		document.getElementById('text4551').value ="";
		//activity 7
		document.getElementById('text4691').value ="";
		document.getElementById('text4637').value ="";
		document.getElementById('text4599').value ="";
		document.getElementById('text4553').value ="";
		//clear activity 8
		document.getElementById('text4693').value ="";
		document.getElementById('text4639').value ="";
		document.getElementById('text4601').value ="";
		document.getElementById('text4555').value ="";
		//activity 9
		document.getElementById('text4695').value ="";
		document.getElementById('text4641').value ="";
		document.getElementById('text4603').value ="";
		document.getElementById('text4557').value ="";
		//activity 10
		document.getElementById('text4697').value ="";
		document.getElementById('text4643').value ="";
		document.getElementById('text4605').value ="";
		document.getElementById('text4559').value ="";
}


//-----------//Campus Visit Reservation View//-----------//
	
function createCVReservationDateListener(){
	if(checkViewFields(["date602Date","text598","text4421","text3381"])){
		visitDate = document.getElementById("date602Date").value;
		//Blank ability set through confirm box yes/no.  
		document.getElementById("date602Date").addEventListener("click",function(){clearDateChange(document.getElementById("date602Date"));});
		document.getElementById("date602Date").addEventListener("keydown",function(e){e.preventDefault(); alert("Please use date picker to set the date.");});
		document.getElementById("date602Date").addEventListener("focusout",checkCVResDateChange);
		document.getElementById("text598").addEventListener("change",setArrivalTime);
	} else{
		recheckViewFields();
	}
}

//pauses long enough wait for the date to be populated and then compare, and if needed set day. 
function checkCVResDateChange(){
	setTimeout( function(){
	if(document.getElementById("date602Date").value !==""){	
		var newVal = document.getElementById("date602Date").value;
		//set loop looking for the field to exist and be editable.
		if (visitDate === newVal) {  
			//console.log("no change");
			return;
		 } else{
			//console.log("change");
			visitDate = newVal;
			//Grab date and update the field.
			switch(new Date(document.getElementById("date602Date").value).getDay()){
				case 0:
					document.getElementById("text4421").value = "Sunday";
					break;
				case 1:
					document.getElementById("text4421").value = "Monday";
					break;
				case 2:
					document.getElementById("text4421").value = "Tuesday";
					break;
				case 3:
					document.getElementById("text4421").value = "Wednesday";
					break;
				case 4:
					document.getElementById("text4421").value = "Thursday";
					break;
				case 5:
					document.getElementById("text4421").value = "Friday";
					break;
				case 6:
					document.getElementById("text4421").value = "Saturday";
					break;
				default:
					document.getElementById("text4421").value = "";
			}	
		}
	}else{
		document.getElementById("text4421").value = "";
		visitDate="";
	} 
	},150);
}

//used to set the arrival time when session type is selected
function setArrivalTime(){
	switch (document.getElementById("text598").value){
		case "Weekday Morning Session":
			document.getElementById("text3381").value = "8:45 a.m.";
			break;
		case "Weekday Midday Session":
			document.getElementById("text3381").value = "10:15 a.m.";
			break;
		case "Weekday Afternoon Session":
			document.getElementById("text3381").value = "1:15 p.m.";
			break;
		case "": // If they return to "select one", which is really blank. 
			document.getElementById("text3381").value = "";
			break;
		default:
			//do nothing
			break;
	}
	
}

//--------------
//Processing Function
//--------------

//-----------//Evaluation and Endorsements View//-----------//

//create the listeners for the text boxes
function createEEListeners(){
	if(checkViewFields(["text219","date6485Date","text3985","text223","date6487Date","text3987"])){
		//set listener for name 1
		document.getElementById("text219").addEventListener("input", function(){setEEDate("text219","date6485Date","text3985");});
		document.getElementById("text3985").setAttribute("readonly","");
		//set listener for name 2
		document.getElementById("text223").addEventListener("input", function(){setEEDate("text223","date6487Date","text3987");});
		document.getElementById("text3987").setAttribute("readonly","");
	} else{
		recheckViewFields();
	}
}

//if updated, check to see if date is empty, and if not, insert todays date when the name field is updated. 
function setEEDate(EEName,EEDate,EEShadowName){
	if(document.getElementById(EEName).value!==""){
		if(document.getElementById(EEDate).value === ""){
			setDateField(EEDate);
		}
	}
	//Copy to the "shadow" attribute
	document.getElementById(EEShadowName).value = document.getElementById(EEName).value;
}


//-----------//High School Transcript and Guidance Counselor View//-----------//
function createHSTranscriptAndPercentListeners(){
	if(checkViewFields(["numeric273","numeric277","text1415","text3265","hsname","text1501","numeric7963","date7349Date"])){
		checkHSTranscriptNameChange();
		//Class Rank Field
		document.getElementById("numeric273").addEventListener("input",setClassRankPercentile);
		//Class Size Field
		document.getElementById("numeric277").addEventListener("input",setClassRankPercentile);
		//Class Percentile Field
		document.getElementById("text1415").addEventListener("change",setClassRankPercentile);
		//GED% Field
		document.getElementById("text3265").addEventListener("input",setGEDField);
	} else{
		recheckViewFields();
	}
}

//Looks for changes to HS Name and copies to HS transcript. 
function checkHSTranscriptNameChange(){
	highSchoolName = document.getElementById("hsname").value;
			
	//set loop looking for the field to exist and be editable.
	//resused fieldInterval as it has been cleared when we are able to edit. 
	fieldInterval = setInterval(function () {
	if(document.getElementById("hsname").value !==""){	
		var newVal = document.getElementById("hsname").value;
		//compare original hs name value to current value
		if (highSchoolName === newVal) {  
		 } else{
			//set the name to compare to. 
			highSchoolName = document.getElementById("hsname").value;
			//copy the high school name. 
			document.getElementById("text1501").value = highSchoolName;
		}	
	} 
	},100);
}

//sets and checks the class rank percentile. 
function setClassRankPercentile(){

	var classRank = document.getElementById("numeric273").value;
	var classSize = document.getElementById("numeric277").value;
	var percentileRequired = document.getElementById("text1415").value;
	
	if(percentileRequired !== "N"){
		if(classRank !=="" && classSize !==""){
			document.getElementById("numeric7963").value = Math.round(100*(1-(classRank/classSize)));
			 if( Math.round(100*(1-(classRank/classSize))) < 0){
				document.getElementById("numeric7963").style.backgroundColor = "#ff717a";
			 }else{
				document.getElementById("numeric7963").style.backgroundColor = ""; 
			 }
			setDateField("date7349Date");	
		}
	} else if(percentileRequired === "N"){
		document.getElementById("numeric7963").value = "";
		document.getElementById("numeric7963").style.backgroundColor = "";
		setDateField("date7349Date");
	}
}

function setGEDField(){
	//If the HS Transcript Name is GED (So we don't accidentally overwrite data. )
	if(document.getElementById("text1501").value ==="GED"){
		//class rank
		document.getElementById("numeric273").value = "";
		//class size
		document.getElementById("numeric277").value = "";
		//class percentile (and in case it was red)
		document.getElementById("numeric7963").value = "";
		document.getElementById("numeric7963").style.backgroundColor = "";
		//percentile required
		document.getElementById("text1415").value = "N";
		//Set percentile Recorded Date
		setDateField("date7349Date");
		
	}
	
}

//-----------//Dec of Intent / Ent Fee / Non-Enrolling View//-----------//
function createFeeDateListener(){
	if(checkViewFields(["date2951Date","numeric2821"])){
		feeDate = document.getElementById("date2951Date").value;
		document.getElementById("date2951Date").addEventListener("click",function(){clearDateChange(document.getElementById("date2951Date"));});
		document.getElementById("date2951Date").addEventListener("keydown",function(e){e.preventDefault(); alert("Please use your date picker to set the date.");});
		document.getElementById("date2951Date").addEventListener("focusout",checkFeeDateChange);
	} else{
		recheckViewFields();
	}
}

//Set fee amount, or clear the amount if the date is removed. 
function checkFeeDateChange(){
	
	setTimeout( function(){
	if(document.getElementById("date2951Date").value !==""){	
		var newVal = document.getElementById("date2951Date").value;
		//set loop looking for the field to exist and be editable.
		if (feeDate === newVal) {  
			//console.log("no change");
		 } else{
			feeDate = newVal;
			//set fee amount field
			document.getElementById("numeric2821").value = "50";
		}	
	}else{
		//clear fee amount field
		document.getElementById("numeric2821").value = "";	
		feeDate = "";
	} 
	},100);
}

//-----------//International Apps Processing View//-----------//
function createInternationalAppListener(){
	if(checkViewFields(["text2961","date2959Date"])){
			document.getElementById("text2961").addEventListener("change",setIntlAppProcDate);
	} else{
		recheckViewFields();
	}
}

function setIntlAppProcDate(){
	if(document.getElementById("date2959Date").value === ""){
		setDateField("date2959Date");
	}
}

//--------------
//Recruitment And Outreach Function
//--------------

//-----------//Interview Score Form View//-----------//
//Sets listener for Interview Score total
function createInterviewListeners(){
	if(checkViewFields(["numeric4261","numeric4221","numeric4223","numeric4225","numeric4227","numeric4229","numeric4231","numeric4233","numeric4235","numeric4237","numeric4239","numeric4241","numeric4243","numeric4245"])=== true){
		//Set "Int-Total" field listener
		document.getElementById("numeric4261").addEventListener("input",checkInterviewScore);
		//Set listeners for 1-13 as they may need to update the value if it doesn't match. 
		document.getElementById("numeric4221").addEventListener("input",checkInterviewScore);
		document.getElementById("numeric4223").addEventListener("input",checkInterviewScore);
		document.getElementById("numeric4225").addEventListener("input",checkInterviewScore);
		document.getElementById("numeric4227").addEventListener("input",checkInterviewScore);
		document.getElementById("numeric4229").addEventListener("input",checkInterviewScore);
		document.getElementById("numeric4231").addEventListener("input",checkInterviewScore);
		document.getElementById("numeric4233").addEventListener("input",checkInterviewScore);
		document.getElementById("numeric4235").addEventListener("input",checkInterviewScore);
		document.getElementById("numeric4237").addEventListener("input",checkInterviewScore);
		document.getElementById("numeric4239").addEventListener("input",checkInterviewScore);
		document.getElementById("numeric4241").addEventListener("input",checkInterviewScore);
		document.getElementById("numeric4243").addEventListener("input",checkInterviewScore);
		document.getElementById("numeric4245").addEventListener("input",checkInterviewScore);
	} else{
		recheckViewFields();
	}
}

//Changes the background color of the Interview Total field if q1-q13 do or don't match
function checkInterviewScore(){
	//Pull all of our numbers in. The + in front is a "unary" operator and tries to conver the value to a number. 
	var q1 = +document.getElementById("numeric4221").value;  
	var q2 = +document.getElementById("numeric4223").value;
	var q3 = +document.getElementById("numeric4225").value;
	var q4 = +document.getElementById("numeric4227").value;
	var q5 = +document.getElementById("numeric4229").value;
	var q6 = +document.getElementById("numeric4231").value;
	var q7 = +document.getElementById("numeric4233").value;
	var q8 = +document.getElementById("numeric4235").value;
	var q9 = +document.getElementById("numeric4237").value;
	var q10 = +document.getElementById("numeric4239").value;
	var q11 = +document.getElementById("numeric4241").value;
	var q12 = +document.getElementById("numeric4243").value;
	var q13 = +document.getElementById("numeric4245").value;
	var intTotal = +document.getElementById("numeric4261").value;
	var mytotal = q1+q2+q3+q4+q5+q6+q7+q8+q9+q10+q11+q12+q13;
	//check and make sure my interview total is not blank
	if(document.getElementById("numeric4261").value !==""){
		//If question totals don't match, show red, otherwise, show green. 
		if(mytotal !== intTotal){
			document.getElementById("numeric4261").style.backgroundColor= "#ff717a";
		} else{
			document.getElementById("numeric4261").style.backgroundColor= "#DAF7A6";
		}
	} else{
		document.getElementById("numeric4261").style.backgroundColor = "";
	}
}

