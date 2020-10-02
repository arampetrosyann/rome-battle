import { name, random } from "faker";
import { remove } from "lodash";

const screen = document.querySelector(".content-box");

const startBtn = document.createElement("button");

startBtn.innerText = "Start";

startBtn.classList.add("start-btn");

screen.append(startBtn);

class Gladiator {
  static count = 0;
  static intervalIDs = [];

  constructor() {
    this._health = random.number({
      min: 80,
      max: 100,
    });
    this._power = random.number({
      min: 2,
      max: 5,
    });
    this._speed = random.number({
      min: 1,
      max: 5,
    });
    this._name = name.findName();

    Gladiator.count++;
  }

  get health() {
    return this._health;
  }

  set health(value) {
    this._health = value;
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

    return enemy;
  }

  recover() {
    this.health += 50;
  }

  toString() {
    return `${this.name} x ${this.health}`;
  }
}

const a = new Gladiator();
const b = new Gladiator();
const c = new Gladiator();
const gladiators = [a, b, c];

startBtn.addEventListener("click", () => {
  screen.style.alignItems = "flex-start";

  gladiators.forEach((fighter) => {
    const intervalID = setInterval(() => {
      const enemy = fighter.hit(gladiators);

      screen.innerText += `[${fighter}] hits [${enemy}] with power ${fighter.power} \n`;

      if (enemy.health <= 0) {
        Gladiator.intervalIDs.forEach((id) => {
          clearInterval(id);
        });

        Gladiator.intervalIDs = [];

        screen.innerText = `[${enemy.name}] dying`;
      }
    }, (6 - fighter.speed) * 1000);

    Gladiator.intervalIDs.push(intervalID);
  });

  startBtn.parentNode.removeChild(startBtn);
});
