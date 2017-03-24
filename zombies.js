/*jshint esversion: 6 */
"use strict";

/**
 * Class => Item(name)
 * -----------------------------
 * Creates an item.
 *
 * @name Item
 * @param {string} name     The item's name.
 * @property {string} name
 */

 class Item {
  constructor(name){
    this._name = name;
  }

  get name(){
    return this._name;
  }

  set name(newName){
    if(typeof newName !== "string"){
      throw new Error ("Please enter name of item");
    }
    this._name = newName;
  }
 }

/**
 * Class => Weapon(name, damage)
 * -----------------------------
 * Creates a weapon item.
 * Weapon items can be equipped for use in battle.
 *
 * The Weapon class constructor will call
 *   the super class (Item) constructor
 *   while passing in the 1 Item constructor param
 *
 * @name Weapon
 * @param {string} name     The weapon's name.
 * @param {number} damage   The weapon's damage.
 * @property {number} damage
 */

class Weapon extends Item {
  constructor(name, damage){
    super(name);
    this._damage = damage;
  }

  get damage(){
    return this._damage;
  }

  set damage(value){
    //  if(typeof value !== "number"){
    //   throw new Error ("Please enter a number");
    // }
    this._damage = value;

  }
}

/**
 * Weapon Extends Item Class
 * -----------------------------
 */



/**
 * Class => Food(name, energy)
 * -----------------------------
 * Creates a food item.
 * Food items give energy, restoring health to the player.
 *
 * The Food class constructor will call
 *   the super class (Item) constructor
 *   while passing in the 1 Item constructor param
 *
 * @name Food
 * @param {string} name       The food's name.
 * @param {number} energy     The energy the food provides.
 * @property {number} energy
 */

class Food extends Item {
  constructor(name, energy){
    super(name);
    this._name = name;
    this._energy = energy;
  }

  get energy(){
    return this._energy;
  }

  set energy(value){
     if(typeof value !== "number"){
      throw new Error ("Please enter a number");
    }
    this._energy = value;
  }
}


/**
 * Food Extends Item Class
 * -----------------------------
 */



/**
 * Class => Player(name, health, strength, speed)
 * -----------------------------
 * Creates a player in a zombie-infested world.
 *
 * @name Player
 * @param {string} name                    The player's name.
 * @param {number} health                  The player's health.
 * @param {number} strength                The player's strength.
 * @param {number} speed                   The player's speed.
 * @private {array} pack                   Default value should be empty.
 * @private {number} maxHealth             Default value should be set to `health`.
 * @property {string} name
 * @property {number} health
 * @property {number} strength
 * @property {number} speed
 * @property {boolean} isAlive             Default value should be `true`.
 * @property {Weapon/boolean} equipped     Default value should be `false`.
 * @property {method} getPack              Returns private variable `pack`.
 * @property {method} getMaxHealth         Returns private variable `maxHealth`.
 */

class Player {

  constructor(name, health, strength, speed){
    this._pack = [];
    this._maxHealth = health;

    this.name = name;
    this.health = health;
    this.strength = strength;
    this.speed = speed;

    this.isAlive = true;
    this.equipped = false;
  }



  getPack(){
    return this._pack;
  }

  getMaxHealth(){
    return this._maxHealth;
  }

  checkPack(){
    console.log(this.getPack);

  }

  takeItem(item){
    var amtItems = this.getPack().length;

    if (amtItems >= 3){
      console.log(this.name + " pack is too full to add " + item + "Please, choose an item to discard first.");
      return false;
    }
    if (amtItems < 3){
      this.getPack().push(item);
      console.log(this.name + " has added " + item + "to their Pack.");
    }
  }

  discardItem(item) {
    var thisItem = this.getPack().indexOf(item);
    var notThere = -1;

   if( thisItem === notThere){
    console.log(item.name + " is not in " + this.name + "'s pack.");
    return false;
   }
    else {
      var removedItem = this.getPack().splice(thisItem,1);
      console.log( thisItem + " has been removed from " + this.name + "'s pack.");
      return true;
    }
  }

  equip(itemToEquip) {
    var thisItem = this.getPack().indexOf(itemToEquip);
    var notThere = -1;

   if(this.equipped !== false){
      this.getPack()[thisItem] = this.equipped;
      this.equipped = itemToEquip;
    }
      else if(thisItem === notThere || itemToEquip instanceof Weapon === false){
        return false;
    }
      else {
        this.equipped = itemToEquip;
        this.discardItem(itemToEquip);
    }
  }

  eat(itemToEat){
     var thisItem = this.getPack().indexOf(itemToEat);
      var notThere = -1;

    if(thisItem === notThere || itemToEat instanceof Food === false){
      return false;
    }
      else if(this.getMaxHealth() - this.health <= itemToEat.energy){
        this.health = this.getMaxHealth();
    }
      else {
        this.health += itemToEat.energy;
    }
    this.discardItem(itemToEat);
  }

  useItem(item){
    var thisItem = this.getPack().indexOf(this.item);
    var notThere = -1;

    if(item instanceof Food === true){
      this.eat(item);
    }
    if(item instanceof Weapon === true){
      this.equip(item);
    }
  }

  equippedWith(){
    if(this.equipped !== false){
      console.log(this.name + " has equipped: " + this.equipped.name);
      return this.equipped.name;
    }
      else {
        console.log("Nothing is equipped.");
        return false;
    }
  }
}

/**
 * Class => Zombie(health, strength, speed)
 * -----------------------------
 * Creates a normal zombie.
 *
 * @name Zombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 * @private {number} maxHealth      Default value should be set to `health`.
 * @property {number} health
 * @property {number} strength
 * @property {number} speed
 * @property {boolean} isAlive      Default value should be `true`.
 */

class Zombie {
  constructor( health, strength, speed){
    this._maxHealth = health;

    this.health = health;
    this.strength = strength;
    this.speed = speed;
    this.isAlive = true;
  }
}

/**
 * Class => FastZombie(health, strength, speed)
 * -----------------------------
 * Creates a fast zombie.
 *
 * The FastZombie class constructor will call
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name FastZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */

class FastZombie extends Zombie {
  constructor(health, strength, speed){
    super(health, strength, speed);
  }
}

/**
 * FastZombie Extends Zombie Class
 * -----------------------------
 */

/**
 * Class => StrongZombie(health, strength, speed)
 * -----------------------------
 * Creates a strong zombie.
 *
 * The StrongZombie class constructor will call
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name StrongZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */

class StrongZombie extends Zombie {
  constructor (health, strength, speed){
    super(health, strength, speed);
  }
}

/**
 * StrongZombie Extends Zombie Class
 * -----------------------------
 */

/**
 * Class => RangedZombie(health, strength, speed)
 * -----------------------------
 * Creates a ranged zombie.
 *
 * The RangedZombie class constructor will call
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name RangedZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */

class RangedZombie extends Zombie {
  constructor( health, strength, speed){
    super(health, strength, speed);
  }
}
/**
 * RangedZombie Extends Zombie Class
 * -----------------------------
 */

/**
 * Class => ExplodingZombie(health, strength, speed)
 * -----------------------------
 * Creates an exploding zombie.
 *
 * The ExplodingZombie class constructor will call
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name ExplodingZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */

class ExplodingZombie extends Zombie {
  constructor( health, strength, speed){
    super (health, strength, speed);
  }
}

/**
 * ExplodingZombie Extends Zombie Class
 * -----------------------------
 */

/**
 * Sample run.
 * Feel free to edit this and check your game logic.
 */
function runGame() {
  // var player = new Player("Joan", 500, 30, 70);
  // var zombie = new Zombie(40, 50, 20);
  // var charger = new FastZombie(175, 25, 60);
  // var tank = new StrongZombie(250, 100, 15);
  // var spitter = new RangedZombie(150, 20, 20);
  // var boomer = new ExplodingZombie(50, 15, 10);

  // var shovel = new Weapon("shovel", 15);
  // var sandwich = new Food("sandwich", 30);
  // var chainsaw = new Weapon("chainsaw", 25);

  // player.takeItem(shovel);
  // player.takeItem(sandwich);
  // player.takeItem(chainsaw);
  // player.discardItem(new Weapon("scythe", 21));
  // player.discardItem(shovel);
  // player.checkPack();
  // player.takeItem(shovel);
  // player.checkPack();

  // player.equippedWith();
  // player.useItem(chainsaw);
  // player.equippedWith();
  // player.checkPack();

  // player.useItem(shovel);
  // player.equippedWith();
  // player.checkPack();

  // player.health = 487;
  // console.log("Before health: " + player.health);
  // player.useItem(sandwich);
  // console.log("After health: " + player.health);
  // player.checkPack();
}
