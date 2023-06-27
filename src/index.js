import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

const storeState = (initialValue) => {
  let currentState = initialValue;
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  };
};


// const stateControl = storeState();

// const initialState = creatureState;

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value
    });
  };
};


let mouse = { mouseHealth: 25, mouseExp: 0, mouseCheeseBites: 2, mouseBigCheese: 0 };
let enemy = { enemyHealth: 45 };
const initialMouse = storeState(mouse);
const initialEnemy = storeState(enemy);

const goodCheese = changeState("mouseHealth")(5);
const bestCheese = changeState("mouseHealth")(10);
const ateTheCheese = changeState("mouseCheeseBites")(-1);
const ateBestCheese = changeState("mouseBigCheese")(-1);
const getGoodCheese = changeState("mouseCheeseBites")(2);
const getBestCheese = changeState("mouseBigCheese")(1);

const basicDamage = changeState("mouseHealth")(-6);
const basicAttack = changeState("enemyHealth")(-5);

const getSomeXP = changeState("mouseExp")(4);
const getMoreXP = changeState("mouseExp")(8);
const spendXPForCheese = changeState("mouseExp")(-5);
const spendXPForBigCheese = changeState("mouseExp")(-8);

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
window.onload = function () {

  const newState = initialMouse();
  const newStateEnemy = initialEnemy();

  document.getElementById("health-points").innerText = `HP: ${newState.mouseHealth}`;
  document.getElementById("experience").innerText = `Exp: ${newState.mouseExp}`;
  document.getElementById("small-cheese").innerText = `Cheese Bites: ${newState.mouseCheeseBites}`;
  document.getElementById("big-cheese").innerText = `BIG Cheese Bites: ${newState.mouseBigCheese}`;

  document.getElementById("enemy-hp").innerText = `Foe's HP: ${newStateEnemy.enemyHealth}`;

  // setup ^^^^

  // mechanics vvvv

  // healing
  document.getElementById("eat-cheese").onclick = function () {
    const mouseHealthStatus = initialMouse();
    let mouseHealthDifference = 25 - mouseHealthStatus.mouseHealth;
    const littleHeal = changeState("mouseHealth")(mouseHealthDifference);

    if (mouseHealthStatus.mouseHealth < 25 && mouseHealthStatus.mouseHealth > 20) {

      const healMouseALittle = initialMouse(littleHeal);
      const eatSmallCheese = initialMouse(ateTheCheese);
      document.getElementById("info-display").innerText = "You ate some decent cheese and regained up to 5 HP!";
      document.getElementById("health-points").innerText = `HP: ${healMouseALittle.mouseHealth}`;
      document.getElementById("small-cheese").innerText = `Cheese Bites: ${eatSmallCheese.mouseCheeseBites}`;

    } else if (mouseHealthStatus.mouseHealth >= 25) {

      document.getElementById("info-display").innerText = "You're already at full health! Save your cheese!";

    } else {

      const healMouse = initialMouse(goodCheese);
      const eatCheeseBite = initialMouse(ateTheCheese);
      document.getElementById("info-display").innerText = "You ate some decent cheese and regained 5 HP!";
      document.getElementById("health-points").innerText = `HP: ${healMouse.mouseHealth}`;
      document.getElementById("small-cheese").innerText = `Cheese Bites: ${eatCheeseBite.mouseCheeseBites}`;
    }

  };

};

document.getElementById("eat-big").onclick = function () {
  const mouseHealthStatus = initialMouse();
  let mouseBigHealthDifference = 25 - mouseHealthStatus.mouseHealth;
  const healUpTo = changeState("mouseHealth")(mouseBigHealthDifference);

  if (mouseHealthStatus.mouseHealth < 25 && mouseHealthStatus.mouseHealth > 15) {
    const healMouseUpTo = initialMouse(healUpTo);
    const eatSomeBigCheese = initialMouse(ateBestCheese);
    document.getElementById("info-display").innerText = "You ate some GREAT cheese and regained up to 10HP!";
    document.getElementById("health-points").innerText = `HP: ${healMouseUpTo.mouseHealth}`;
    document.getElementById("big-cheese").innerText = `BIG Cheese Bites: ${eatSomeBigCheese.mouseBigCheese}`;

  } else if (mouseHealthStatus.mouseHealth >= 25) {

    document.getElementById("info-display").innerText = "You're already at full health! Save your cheese!";

  } else {

    const healMouseGood = initialMouse(bestCheese);
    const eatBigCheese = initialMouse(ateBestCheese);
    document.getElementById("info-display").innerText = "You ate some GREAT cheese and regained 10HP!";
    document.getElementById("health-points").innerText = `HP: ${healMouseGood.mouseHealth}`;
    document.getElementById("big-cheese").innerText = `BIG Cheese Bites: ${eatBigCheese.mouseBigCheese}`;
  }
};



// fighting/xp gain
document.getElementById("fight").onclick = function () {
  const damageMouse = initialMouse(basicDamage);
  const getSmallExp = initialMouse(getSomeXP);
  const damageEnemy = initialEnemy(basicAttack);

  if (damageMouse.mouseHealth <= 0 ) {
    document.getElementById("info-display").innerText = "Game Over!";
    document.getElementById("health-points").innerText = `HP: ${damageMouse.mouseHealth}`;
  } else if (damageEnemy.enemyHealth <= 0) {
    const winExp = initialMouse(getMoreXP);
    document.getElementById("info-display").innerText = "You win! You gained 8XP! Prepare for the next fight!";
    document.getElementById("experience").innerText = `Exp: ${winExp.mouseExp}`;
    document.getElementById("enemy-hp").innerText = `Foe's HP: ${damageEnemy.enemyHealth}`;
  } else {
    document.getElementById("info-display").innerText = "You fight! You dealt 5 damage and received 6 damage in turn. You earned 4XP!";
    document.getElementById("health-points").innerText = `HP: ${damageMouse.mouseHealth}`;
    document.getElementById("experience").innerText = `Exp: ${getSmallExp.mouseExp}`;
    document.getElementById("enemy-hp").innerText = `Foe's HP: ${damageEnemy.enemyHealth}`;    
  }

};

// buy small cheese
document.getElementById("buy-cheese").onclick = function () {
  const getSmallCheese = initialMouse(getGoodCheese);
  const boughtSmallCheese = initialMouse(spendXPForCheese);
  document.getElementById("info-display").innerText = "You bought 2 bites of decent cheese for 5XP!";
  document.getElementById("small-cheese").innerText = `Cheese Bites: ${getSmallCheese.mouseCheeseBites}`;
  document.getElementById("experience").innerText = `Exp: ${boughtSmallCheese.mouseExp}`;
};

// buy big cheese
document.getElementById("buy-big").onclick = function () {
  const getBigCheese = initialMouse(getBestCheese);
  const boughtBigCheese = initialMouse(spendXPForBigCheese);
  document.getElementById("info-display").innerText = "You bought a bite of GREAT cheese for 8XP!";
  document.getElementById("big-cheese").innerText = `BIG Cheese Bites: ${getBigCheese.mouseBigCheese}`;
  document.getElementById("experience").innerText = `Exp: ${boughtBigCheese.mouseExp}`;
};

document.getElementById("show-state").onclick = function () {
  const presentState = initialMouse();
  document.getElementById("info-display").innerText = `You presently have ${presentState.mouseHealth} HP and ${presentState.mouseExp} XP. You have ${presentState.mouseCheeseBites} cheese bites and ${presentState.mouseBigCheese} GREAT cheese bites available to eat!`;
  // document.getElementById("health-points").innerText = `HP: ${currentState.health}`;
};