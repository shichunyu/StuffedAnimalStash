var stashList = []; //Array of StuffedAnimal objects

/*Stuffed Animal Class*/
function StuffedAnimal (id,name,type) {
	this.id = stashList.length +1;
	this.name = name;
	this.type = type;
}

/*display the other field*/
function showOther() {
	var other = document.getElementById('other');
	if (document.getElementById('type').value == 'other') {
		other.style.display = 'block';
	} else {
		other.style.display = 'none';
	}
}

/*remove animal script*/
function removeAnimal (deleteRowId) { //
	var rowToDelete = document.getElementById(deleteRowId);
	var rowToDeleteIndex = rowToDelete.rowIndex;
	document.getElementById('animalsList').deleteRow(rowToDeleteIndex);
}

/*Submit a new Stuffed Animal*/
function submit(){
	var nameField = document.getElementById('name');
	var typeField = document.getElementById('type');
	var otherTypeField = document.getElementById('otherType');
	
	var newAnimal = new StuffedAnimal(); //create a new stuffed animal
	
	newAnimal.name = nameField.value; //the new animal name is the form value for name

	/*get the animal's type*/ 
	if (typeField.value!='other') {
		newAnimal.type = typeField.value; //the new animal type is the form value for type
	} else {
		newAnimal.type = otherTypeField.value; //the new animal type is the form value for Other type
	}
	
	stashList.push(newAnimal); //push the new animal into the array

	var latestId = stashList.length + 1; //id # the last animal pushed into array
	var lastArrayIndex = stashList.length -1; //array index of last animal pushed into array

	var animalsTable = document.getElementById('animalsList'); //get table from HTML
	var animalsTableLength = animalsTable.rows.length; // number of rows in the table right now
	var newRow = animalsTable.insertRow(animalsTableLength); //insert new row into table, index of row is current length of table rows
		newRow.id = animalsTableLength - 1; //id for new row is its row index

	/*add id, name & delete cells into the row*/
	var cellNum = newRow.insertCell(0);
	var cellId = newRow.insertCell(1);
	var cellName = newRow.insertCell(2);
	var cellType = newRow.insertCell(3);
	var cellDelete = newRow.insertCell(4);

	/*write the new animal into the table*/
	cellId.innerHTML = 'Unique_ID:' + stashList[lastArrayIndex].id; //get id of animal from the id of object in stashList for the last array index
	cellName.innerHTML = stashList[lastArrayIndex].name; //get name of animal from the id of object in stashList for the last array index
	cellType.innerHTML = stashList[lastArrayIndex].type; //get type of animal from the id of object in stashList for the last array index

	/*delete button script*/
	var deleteRowId = newRow.id;
	cellDelete.innerHTML = 
		'<input type="button" onclick="removeAnimal(' + deleteRowId + '); resetNums();" value="remove" id="' + deleteRowId + '" />'; //create remove button with button ID as the array index of the animal

}

/*reset numbering*/
function resetNums(){
	var animalsTable = document.getElementById('animalsList'); 
	for (xx = 0; xx < animalsTable.rows.length; xx++) {
		animalsTable.rows[xx].cells[0].innerHTML = xx+1;
	}

}

/*stash animal with data validation*/
function stash() {
	var nameField = document.getElementById('name');
	var typeField = document.getElementById('type');
	var errorOther = document.getElementById('errorOther');
	var errorName = document.getElementById('errorName');

	/*If Type is not Other AND Name is not empty THEN Stash animal*/
	if (typeField.value != 'other' && nameField.value != "" && nameField.value != null) {

		submit();
		resetNums();
				
		errorName.style.display = 'none';
		errorOther.style.display = 'none';
		nameField.value = null;
		otherType.value = null;
	} 
	// If Type is not Other AND Name is empty, THEN show error message for Name field
	  else if ((nameField.value == "" || nameField.value == null) && (typeField.value != "other")) {
		errorName.style.display = 'block';
		errorOther.style.display = 'none';
	}
	// If Type is Other AND Name AND otherType are both empty, THEN show error message for both Name and Type
	  else if ((typeField.value == "other") && (nameField.value == "" || nameField.value == null) && (otherType.value == "" || otherType.value == null)) {
		errorName.style.display = 'block';
		errorOther.style.display = 'block';
	} 
	// If Type is Other AND only otherType is empty, THEN show error message for Type only
	  else if ((typeField.value == "other") && nameField.value != "" && nameField.value != null && (otherType.value == "" || otherType.value == null)) {
	  	errorName.style.display = 'none';
	  	errorOther.style.display = 'block';
	}
	// If Type is Other AND only Name is empty, THEN show error message for Name only
	  else if ((typeField.value == "other") && otherType.value != "" && otherType.value != null && (nameField.value == "" || nameField.value == null))  {
	  	errorName.style.display = 'block';
	  	errorOther.style.display = 'none';
	}
	// If Type is Other AND both Name and otherType are filled out, then Stash animal
	else {
		submit();
		resetNums();

		errorOther.style.display = 'none';
		errorName.style.display = 'none';
		nameField.value = null;
		otherType.value = null;
	}
}