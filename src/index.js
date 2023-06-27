import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

const storeState = (initialValue) => {
  let currentState = initialValue;
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


let mouse = { health: 25, exp: 0, cheeseBites: 2, bigCheese: 0};
let enemy = { health: 45};
const initialMouse = storeState(mouse);
const initialEnemy = storeState(enemy);

const goodCheese = changeState("health")(5);
const bestCheese = changeState("health")(10);
const ateTheCheese = changeState("cheeseBites")(-1);
const ateBestCheese = changeState("bigCheese")(-1);
const getGoodCheese = changeState("cheeseBites")(2);
const getBestCheese = changeState("bigCheese")(1);

const basicDamage = changeState("health")(-6);
const basicAttack = changeState("health")(-5);

const getSomeXP = changeState("exp")(4);
// const getMoreXP = changeState("XP")(8);
const spendXPForCheese = changeState("exp")(-5);
const spendXPForBigCheese = changeState("exp")(-8);

// const spendXPForWeapon 




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



// const mediumDamage = changeState("health")(-9);
// const heavyDamage = changeState("health")(-12);






//--------------------------------------------------------------------------------------
window.onload = function() {

  const newState = initialMouse();
  const newStateEnemy = initialEnemy();

  document.getElementById("health-points").innerText = `HP: ${newState.health}`;
  document.getElementById("experience").innerText = `Exp: ${newState.exp}`;
  document.getElementById("small-cheese").innerText = `Cheese Bites: ${newState.cheeseBites}`;
  document.getElementById("big-cheese").innerText = `BIG Cheese Bites: ${newState.bigCheese}`;

  document.getElementById("enemy-hp").innerText = `Foe's HP: ${newStateEnemy.health}`;

  // setup ^^^^

  // mechanics vvvv

  // healing
  document.getElementById("eat-cheese").onclick = function() {

    const healMouse = initialMouse(goodCheese);
    const eatCheeseBite = initialMouse(ateTheCheese);
    document.getElementById("info-display").innerText = "You ate some decent cheese and regained 5 HP!";
    document.getElementById("health-points").innerText = `HP: ${healMouse.health}`;
    document.getElementById("small-cheese").innerText = `Cheese Bites: ${eatCheeseBite.cheeseBites}`;
  };
  document.getElementById("eat-big").onclick = function() {
    const healMouseGood = initialMouse(bestCheese);
    const eatBigCheese = initialMouse(ateBestCheese);
    document.getElementById("info-display").innerText = "You ate some GREAT cheese and regained 10HP!";
    document.getElementById("health-points").innerText = `HP: ${healMouseGood.health}`;
    document.getElementById("big-cheese").innerText = `BIG Cheese Bites: ${eatBigCheese.bigCheese}`;
  };


  // fighting/xp gain
  document.getElementById("fight").onclick = function() {
    const damageMouse = initialMouse(basicDamage);
    const getSmallExp = initialMouse(getSomeXP);
    const damageEnemy = initialEnemy(basicAttack);
    document.getElementById("info-display").innerText = "You fight! You dealt 5 damage and received 6 damage in turn. You earned 4XP!";
    document.getElementById("health-points").innerText = `HP: ${damageMouse.health}`;
    document.getElementById("experience").innerText = `Exp: ${getSmallExp.exp}`;
    document.getElementById("enemy-hp").innerText = `Foe's HP: ${damageEnemy.health}`;
  };

  // buy small cheese
  document.getElementById("buy-cheese").onclick = function() {
    const getSmallCheese = initialMouse(getGoodCheese);
    const boughtSmallCheese = initialMouse(spendXPForCheese);
    document.getElementById("info-display").innerText = "You bought 2 bites of decent cheese for 5XP!";
    document.getElementById("small-cheese").innerText = `Cheese Bites: ${getSmallCheese.cheeseBites}`;
    document.getElementById("experience").innerText = `Exp: ${boughtSmallCheese.exp}`;
  };

  // buy big cheese
  document.getElementById("buy-big").onclick = function() {
    const getBigCheese = initialMouse(getBestCheese);
    const boughtBigCheese = initialMouse(spendXPForBigCheese);
    document.getElementById("info-display").innerText = "You bought a bite of GREAT cheese for 8XP!";
    document.getElementById("big-cheese").innerText = `BIG Cheese Bites: ${getBigCheese.bigCheese}`;
    document.getElementById("experience").innerText = `Exp: ${boughtBigCheese.exp}`;
  };

  document.getElementById("show-state").onclick = function() {
    const currentState = stateControl(initialMouse);
    console.log(stateControl());
    document.getElementById("info-display").innerText = `You presently have ${currentState.health} HP and ${currentState.exp} XP. You have ${currentState.cheeseBites} cheese bites and ${currentState.bigCheese} GREAT cheese bites available to eat!`;
    // document.getElementById("health-points").innerText = `HP: ${currentState.health}`;
  };
};