import { name, random } from "faker";
import { remove } from "lodash";

const screen = document.querySelector(".content-box");

const startBtn = document.createElement("button");

startBtn.innerText = "Start";

startBtn.classList.add("start-btn");

screen.append(startBtn);

class Gladiator {
  static count = 0;

  constructor() {
    this._initialHealth = random.number({
      min: 80,
      max: 100,
    });
    this._health = this._initialHealth;
    this._power = random.number({
      min: 2,
      max: 5,
    });
    this._initialSpeed = random.number({
      min: 1,
      max: 5,
    });
    this._speed = this._initialSpeed;
    this._name = name.findName();

    Gladiator.count++;
  }

  get health() {
    return this._health;
  }

  set health(value) {
    this._health = value;

    if (this._health <= 30) {
      this.speed *= 3;
    }
  }

  get power() {
    return this._power;
  }

  get speed() {
    return this._speed;
  }

  set speed(value) {
    this._speed = value;
  }

  get name() {
    return this._name;
  }

  hit(fighters) {
    const enemyIndex = random.number({
      min: 0,
      max: Gladiator.count - 1,
    });

    const enemy = fighters[enemyIndex];

    enemy.health -= this.power;

    return `${this} hits ${enemy} with power ${this.power}`;
  }

  recover() {
    this.health += 50;
  }

  toString() {
    return `[${this.name} x ${this.health}]`;
  }
}

// const time = (6 - this.speed) * 1000;

// setTimeout(this.hit.bind(this), time);

const a = new Gladiator();
const b = new Gladiator();
const c = new Gladiator();
// const d = new Gladiator();
// const e = new Gladiator();

const gladiators = [a, b, c];

// gladiators.forEach((k) => {
//   k.hit(gladiators);
// });

// setInterval(() => {
//   gladiators.forEach((gladiator) => {
//     if (gladiator.health <= 0) {
//       console.log("END");
//     }
//   });
// });

// a.hit(gladiators), b.hit(gladiators), c.hit(gladiators);

// a.hit(gladiators);

// const fight = function (fighters) {
//   fighters.forEach((fighter) => {
//     const time = (6 - fighter.speed) * 1000;

//     setInterval(() => {
//       const enemyId = fighter.hit();

//       const gladiator = fighters.find((fighter) => {
//         return enemyId === fighter.id;
//       });

//       gladiator.health -= fighter.power;
//     }, time);
//   });
// };

// fight(gladiators);

startBtn.addEventListener("click", () => {
  screen.style.alignItems = "flex-start";

  gladiators.forEach((fighter) => {
    const intervalID = setInterval(() => {
      if (fighter.health <= 0) {
        clearInterval(intervalID);
      }
      screen.innerText += fighter.hit(gladiators) + "\n";
    }, fighter.speed * 1000);
  });

  startBtn.parentNode.removeChild(startBtn);
});
