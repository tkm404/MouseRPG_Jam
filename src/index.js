import 'bootstrap';
import ' bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// import Triangle from './js/triangle.js';
// import Rectangle from './js/rectangle.js';


// function handleTriangleForm() {
//   event.preventDefault();
//   document.querySelector('#response').innerText = null;
//   const length2 = parseInt(document.querySelector('#length2').value);
//   const length1 = parseInt(document.querySelector('#length1').value);
//   const length3 = parseInt(document.querySelector('#length3').value);
//   const triangle = new Triangle(length1, length2, length3);
//   const response = triangle.checkType();
//   const pTag = document.createElement("p");
//   pTag.append(response);
//   document.querySelector('#response').append(pTag);
// }

// function handleRectangleForm() {
//   event.preventDefault();
//   document.querySelector('#response2').innerText = null;
//   const length1 = parseInt(document.querySelector('#rect-length1').value);
//   const length2 = parseInt(document.querySelector('#rect-length2').value);
//   const rectangle = new Rectangle(length1, length2);
//   const response = rectangle.getArea();
//   const pTag = document.createElement("p");
//   pTag.append(`The area of the rectangle is ${response}.`);
//   document.querySelector('#response2').append(pTag);
// }

// window.addEventListener("load", function() {
//   document.querySelector("#triangle-checker-form").addEventListener("submit", handleTriangleForm);
//   document.querySelector("#rectangle-area-form").addEventListener("submit", handleRectangleForm);
// });

let mouse = { health: 25, attackStat: 5, defenseStat: 5 };
let shrew = { health: 20, attackStat: 7, defenseStat: 3 };
let mole = { health: 30, attackStat: 3, defenseStat: 7 };

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    });
  };
};

const eat = changeState("health");
const beDamaged = changeState("health");
const newWeapon = changeState("attackStat");
const newArmor = changeState("defenseStat");

const okCheese = changeState("health")(3);
const goodCheese = changeState("health")(5);
const bestCheese = changeState("health")(10);

const basicDamage = changeState("health")(-6);
const mediumDamage = changeState("health")(-9);
const heavyDamage = changeState("health")(-12);