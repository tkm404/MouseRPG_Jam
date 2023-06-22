const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
};

const stateControl = storeState();


// const initialState = creatureState;

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    });
  };
};



// let mouse = { health: 25, attackStat: 5, defenseStat: 5 };
// let shrew = { health: 20, attackStat: 7, defenseStat: 3 };
// let mole = { health: 30, attackStat: 3, defenseStat: 7 };



// const creatureState = (name) => {
//   let creature = {
//     name
//   };
//   if (name === "mouse"){
//     return {...creature, health: 25, attackStat: 5, defenseStat: 5 };
//   } else if (name === "shrew") {
//     return {...creature, health: 20, attackStat: 7, defenseStat: 3 };
//   } else if (name === "mole") {
//     return {...creature, health: 30, attackStat: 3, defenseStat: 7 };
//   } else {
//     return "You must choose mouse, shrew, or mole.";
//   }
// };


// const eat = changeState("health");
// const beDamaged = changeState("health");
// const newWeapon = changeState("attackStat");
// const newArmor = changeState("defenseStat");

// const okCheese = changeState("health")(3);
const goodCheese = changeState("health")(5);
// const bestCheese = changeState("health")(10);

const basicDamage = changeState("health")(-6);
// const mediumDamage = changeState("health")(-9);
// const heavyDamage = changeState("health")(-12);

const setupMouse = changeState("health")(25);



window.onload = function() {

  document.getElementById("start").onclick = function () {
    const newState = stateControl(setupMouse);
    document.getElementById("health-points").innerText = `HP: ${newState.health}`; 
  };
  document.getElementById("eat-cheese").onclick = function() {
    const newState = stateControl(goodCheese);
    document.getElementById("health-points").innerText = `HP: ${newState.health}`;
  };
  document.getElementById("scrounge").onclick = function() {
    const newState = stateControl(basicDamage);
    document.getElementById("health-points").innerText = `HP: ${newState.health}`;
  };
  document.getElementById("show-state").onclick = function() {
    const currentState = stateControl();
    document.getElementById("health-points").innerText = `HP: ${currentState.health}`;
  };
};