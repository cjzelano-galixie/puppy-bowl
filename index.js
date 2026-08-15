// === Constants ===
const BASE = "https://fsa-puppy-bowl.herokuapp.com/api";
const COHORT = "/"; // Make sure to change this!
const API = BASE + COHORT;

// === Variables ===
let puppies;
let selectedPuppy;

// === Fetch ===
function getPuppies () {
  try{
    let res = fetch(API);
    let json = res.json();
    puppies = json.data;
    render();
  }catch(err){
    console.error(err);
  }
}

function getPuppyById(){
  try{
    let res = fetch(`${API}/${id}`);
    let json = res.json();
    selectedPuppy = json.data;
    render();
  }catch(err){
    console.error(err);
  }
}

function updatePuppy(){
  try{
    let res = fetch({
      method = "POST",
      // will need to write more here
    })
  }catch(err){
    console.error(err);
  }
}

function removePuppy(){
  try{
    let res = fetch({
      method = "DELETE"
    })
    // Do I need more here?
  }catch(err){
    console.error(err);
  }
}

// === Components ===

function puppiesList(puppies){
  // This needs to display list of puppies names by puppy id.
  // Displaying puppies.map(puppy) => LOGIC HERE return {puppy.name}
  // This will hold the event listener for the puppyDetails function <button type="submit"> li logic here </button>
  // button creates a li in a ul section is already created below in render this is a ul and li
}

function puppyDetails(selectedPuppies){
  // This needs to display details of selected puppy by puppy id.
  // Section is already created in render need to display:
  // <img>, <p> puppy.name, <p> puppy.id, <p> puppy.breed, <p> puppy.status, <p> puppy.team
  // This will hold the event listener for the removePuppy call <button type="submit">Remove Puppy</button>
}

function puppyForm(){
  // This will display the form to add a new puppy
  // <label>Name<input type="text"/></label>
  // <label>Breed<input type ="text"/></label>
  // <label>Status<input type="selection or whatever type"/><label>
  // <label>
  // This will hold the event listener for the updatePuppy call <button type="submit">Add to roster</button>
}

// === Render ===
function render(){
  // This will have the DOM scripting to render & replace
  // `<h1>Puppy Bowl</h1>
  // <section>
  // <h2>Puppy List</h2>
  // <puppiesList></puppiesList>
  // <h3>Add to the roster</h3>
  // <puppyForm></puppyForm>
  // </section>
  // <section>
  // <h2>Puppy Details</h2>
  // <puppyDetails></puppyDetails>
  // </section>
  // `
  // replace with functions .replaceWith()
}

render();

