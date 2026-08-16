/**
 * @typeof Puppy
 * @property {string} name
 * @property {number} id
 * @property {string} breed
 * @property {string} team
 * @property {string} status
 */

// === Constants ===
const BASE = "https://fsa-puppy-bowl.herokuapp.com/api";
const COHORT = "/2606-FTB-CT-WEB-PT"; // Make sure to change this!
const RESOURCE = "/players";
const API = BASE + COHORT + RESOURCE;

// === Variables ===
let puppies = [];
let selectedPuppy;

// === Fetch ===
async function getPuppies() {
  try {
    const res = await fetch(API);
    const json = await res.json();
    puppies = json.data.players;
    render();
  } catch (err) {
    console.error(err);
  }
}

async function getPuppyById(id) {
  try {
    const res = await fetch(`${API}/${id}`);
    const json = await res.json();
    selectedPuppy = json.data.player;
    render();
  } catch (err) {
    console.error(err);
  }
}

async function addPuppy(puppy) {
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(puppy),
    });
    getPuppies();
    const json = res.json();
  } catch (err) {
    console.error(err);
  }
}

async function removePuppy(id) {
  try {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    selectedPuppy = null;
    getPuppies();
  } catch (err) {
    console.error(err);
  }
}

async function getTeams() {
  try {
    const res = await fetch(`${BASE}${COHORT}/teams`);
    const json = await res.json();
    return json.data.teams;
  } catch (err) {
    console.error(err);
  }
}

// === Components ===

function puppyListItem(puppy) {
  const $li = document.createElement("li");
  $li.innerHTML = `
    <a href="#selected">${puppy.name}</a>
  `;
  $li.addEventListener("click", () => getPuppyById(puppy.id));
  return $li;
}

function puppiesList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("lineup");

  const $puppies = puppies.map(puppyListItem);
  $ul.replaceChildren(...$puppies);

  return $ul;
}

function puppyDetails() {
  // This needs to display details of selected puppy by puppy id.
  // Section is already created in render need to display:
  // <img>, <p> puppy.name, <p> puppy.id, <p> puppy.breed, <p> puppy.status, <p> puppy.team
  // This will hold the event listener for the removePuppy call <button type="submit">Remove Puppy</button>
  console.log(selectedPuppy);
  if (!selectedPuppy) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a puppy to learn more.";
    return $p;
  }

  const $puppy = document.createElement("section");
  $puppy.classList.add("puppy");
  $puppy.innerHTML = `
    <figure>
        <img alt=${selectedPuppy.name} src=${selectedPuppy.imageUrl} />
      </figure>  
    <p><strong> Name </strong> ${selectedPuppy.name}</p> 
    <p><strong> ID </strong> ${selectedPuppy.id}</p>
    <p><strong> Breed </strong> ${selectedPuppy.breed}</p>
    <p><strong> Team </strong> ${selectedPuppy.team.name}</p>
    <p><strong> Status </strong> ${selectedPuppy.status}</p>
    <button>Remove from roster</button>
  `;

  $puppy.querySelector("button").addEventListener("click", function () {
    removePuppy(selectedPuppy.id);
  });

  return $puppy;
}

function puppyForm() {
  // This will display the form to add a new puppy
  // <label>Name<input type="text"/></label>
  // <label>Breed<input type ="text"/></label>
  // <label>Status<input type="selection or whatever type"/><label> "bench" "field"
  // <label>
  // This will hold the event listener for the updatePuppy call <button type="submit">Add to roster</button>
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>Name 
      <input name="name" required/>
    </label>

    <label>Breed 
      <input name="breed" required/>
    </label>

    <label>Status 
      <select name="status"> 
      <option value="">Select status...</option>  
      <option value="bench">Bench</option> 
        <option value="field">Field</option> 
      </select>
    </label>

    <label>Image URL 
      <input name="imageUrl" />
    </label>
  
    <label>Team 
      <select name="teamId"> 
        <option value="">Unassigned</option>
      </select>
    </label>

    <button>Invite puppy</button>
  `;

  const $teamSelect = $form.querySelector("select[name='teamId']");
  populateTeamsSelect($teamSelect);

  $form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = new FormData($form);

    const name = data.get("name");
    const breed = data.get("breed");
    const status = data.get("status");
    const imageUrl = data.get("imageUrl");
    const teamId = data.get("teamId");

    addPuppy({ name, breed, status, imageUrl, teamId });
  });

  return $form;
}

function teamOption(team) {
  const $option = document.createElement("option");
  $option.value = team.id;
  $option.textContent = team.name;
  return $option;
}

async function populateTeamsSelect($selectElement) {
  const teams = await getTeams();
  const $options = teams.map(teamOption);
  $selectElement.append(...$options);
}

// === Render ===
function render() {
  // This will have the DOM scripting to render & replace
  const $app = document.querySelector("#app");
  $app.innerHTML = `
  <h1>Puppy Bowl</h1>
  <main>
    <section>
     <h2>Puppy List</h2>
      <puppiesList></puppiesList>
      <h3>Add to the roster</h3>
      <puppyForm></puppyForm>
    </section>

    <section id = "selected">
      <h2>Puppy Details</h2>
      <puppyDetails></puppyDetails>
    </section>
  </main>
  `;

  $app.querySelector("puppiesList").replaceWith(puppiesList());
  $app.querySelector("puppyForm").replaceWith(puppyForm());
  $app.querySelector("puppyDetails").replaceWith(puppyDetails());
  // replace with functions .replaceWith()
}

async function init() {
  await getPuppies();
  render();
}

init();
