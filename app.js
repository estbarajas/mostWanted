/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    // TODO: search by name
    searchByName(people);
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people); // restart app
    break;
  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;

  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    // so on and so forth
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }  

  let foundPerson = filteredPeople[0];

  mainMenu(foundPerson, people);

}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person);
    break;
    case "family":
    getFamily(person, people);
    // TODO: get person's family
    break;
    case "descendants":
    findDescendants(person, people);
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

// function findDescendants (person, people) {
//   let addAllDescendants = " ";
  
//   for (i = 0; i < people.length; i++) {
//     //console.log(people[0]);
//     if ((people[i].parents[0] || people[i].parents[1] ) == person.id) {
//     addAllDescendants += ("\nDescendant of " + person.firstName +  " " + person.lastName + ": " + people[i].firstName + " " + people[i].lastName);
//     //findDescendants(people[i],people);
//     }
//   }
// alert(addAllDescendants);
//   //findDescendants(people[],people);
 
// }

function getFamily (person, people) {
  let addAllFamily = " ";
  console.log(people[20].firstName);
  console.log(people[0].currentSpouse);
  

  for (i = 0; i < people.length; i++) {
    //console.log(people[0]);
    if ((people[i].parents[0] || people[i].parents[1])  == person.id) {
    addAllFamily += ("\nFamily member of " + person.firstName +  " " + person.lastName + ": " + people[i].firstName + " " + people[i].lastName);
    //findDescendants(people[i],people);
    console.log("jhggfd")
    }
    // if (people[i].currentSpouse == person.id){
    //   console.log("one");
    // }
  }
 //console("Family Member") 
alert(addAllFamily);
  //findDescendants(people[],people);
 
}

function searchByName(people){
   var searchByNameType = prompt("A) Full name search. \nB) First name search. \nC) Last name search.").toLowerCase();
    
   var firstName;
   var lastName;
   let personFound;

   if (searchByNameType === "a") {

        firstName = promptFor("What is the person's first name?", chars);
        lastName = promptFor("What is the person's last name?", chars);
       
        personFound = people.filter(function (el) {
        if(el.firstName.toLowerCase() === firstName.toLowerCase() && el.lastName.toLowerCase() === lastName.toLowerCase()) {
        return true;
        }
        });

   }
   else if (searchByNameType === "b") {
        firstName = promptFor("What is the person's first name?", chars);
        personFound = people.filter(function (el) {
        if(el.firstName.toLowerCase() === firstName.toLowerCase()) {
        return true;
        }

        // else {
        //   //return false;
        //   alert("No matching results.");
        //   //return false;
        //   searchByName(people);
        // }
        });
        // if (personFound.length <= 0){
        //   //console.log("No matching results.");
        //   alert("No matching results.");
        //   //searchByName(people);
        //   return false;
        // }
   }
   else if (searchByNameType === "c") {
        lastName = promptFor("What is the person's last name?", chars);
        personFound = people.filter(function (el) {
        if(el.lastName.toLowerCase() === lastName.toLowerCase()) {
        return true;
        }
        });
   }
   else {
      alert("Person not found.");
      searchByName(people);
   }
    mainMenu(personFound[0],people);
    //displayPeople(personFound); 

}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First name: " + person.firstName + "\n";
  personInfo += "Last name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Current spouse: " + person.currentSpouse + "\n";
  personInfo += "Id: " + person.id + "\n";

  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
