# AJAX | Fetch Project: P<img src="images/pokeball-PNG-2d.png" alt="Markdown Image" width="30">kéAPI

In this project I work with the [PokéAPI](https://pokeapi.co/) to request Pokémon data. The PokéAPI is built around the Pokémon video games. I have prior knowledge of Pokémon and this helped me understand and layout the content better. I added small details that will improve the user experience for Pokémon fans.

## Concept
The way many Pokémon fans search for Pokémon information (including me) is one at a time. This way saves time since there are more than 800 Pokémon. Because of that I decided to make my application based around typing the name of the Pokémon **YOU** want to learn more about. I understand that this is not a good user experience for newcomers.

Update: After feedback I added a new section "All Pokémon" that will show 807 Pokémon. This is mainly for newcomers as they don't know mcuh about Pokémon. However, anyone can enjoy it. I used fetch(JavaScript) to display all the Pokémon.

### How To Use Search
Type the Pokémon name and click the search `button` or `enter`.

Some of my favorite Pokémon:
1. Venusaur | Kanto #3
2. Machamp | Kanto #68
3. Rhyperior | Sinnoh #464
4. Dragonite | kanto #149
5. Tyranitar | #248
6. Electivire | #466
7. Terrakion | Unova #639

### Navigating All Pokémon
You can hover on a Pokémon card and click. Once you click you can expect a nice animation to pop in your entire screen. To exit click the "close" button in the top right corner.

There are 7 Pokémon Regions. Kanto, Johto, Hoenn, Unova, Kalos, and Alola. They are located under the navigation(All Pokemon, Seach and About). To change region just click on any of the region mentioned prior. The region highlighed in green is the current region you are in.

## Design
### Overall
When building this application an important factor was to have a clean layout that was appealing and that displayed as much data as possible at a glance.

### Mobile
A part of my project was to add a Hamburger Menu and indeed my website is responsive. I used `classList.toggle()` to make this work. The layout is a bit different for mobile.

```
const toggleBtn = document.querySelector(".lines-container");
let line1 = document.querySelector(".line1")
let line2 = document.querySelector(".line2")
let line3 = document.querySelector(".line3")
//On click adds class for the Hamburger Menu to display | animation for 3 lines
function toggleMenu(){
 const navbarToggle = document.getElementById("main-navbar");
	navbarToggle.classList.toggle("menu-active");
	line1.classList.toggle("active");
	line2.classList.toggle("active");
	line3.classList.toggle("active");
}
toggleBtn.addEventListener("click", toggleMenu);

```

#### Mobile Design
<img src="images/PokeApi-Mobile.png" alt="Mobile Design" width="50%">

#### Mobile Hamburger Menu Active
<img src="images/PokeApi-Mobile-Hamburger-Menu.png" alt="Mobile Hamburger Menu" width="50%">

## Upadated User Interface

### Search Section
Previous Desktop Search Design:

<img src="images/PokeApi-search-Old-UI-Desktop.png" alt="Previous Desktop Search Design" width="100%">

**NEW** Desktop Search Design:

<img src="images/PokeApi-seach-New-UI-Desktop.png" alt="New Desktop Search Design" width="100%">

I changed the background color and made the fonts smaller. I created a third column to display the base stats. Also, I added other forms below Pokémon artwork.

### All Pokémon Section Popup

Previous Desktop Popup Design:

<img src="images/All-Pokemon-Old-popup-UI-Desktop.png" alt="Old Desktop Popup Design" width="100%">

**NEW** Desktop Popup Design:

<img src="images/All-Pokemon-New-popup-UI-Desktop.png" alt="New Desktop Popup Design" width="100%">



## What To Expect
All Pokémon from generation 1-7. There's a total of 807.

Upon seaching a Pokémon name you will get the **Pokémon's**:

1. Name
2. Artwork (if available)
3. National Pokédex
4. Region
5. Type
6. Abilities
7. Base Stats
 * Hp
 * Attack
 * Defense
 * Special Attack
 * Special Defense
 * Speed
8. Total Base Stats
9. Label of Pseudo-Legendary or Legendary if applicable
10. Sprites (if available)
 * Front sprite
 * Front sprite Shiny
 * Back sprite
 * Back sprite Shiny
11. Moves
 * **Move**: Move name
 * **Method**: Method of learning the move
 * **Level**: The level required to learn the move
 * **Game Version**: The game version in which this move can be obtained
12. Alternative forms

## Challeges
#### JavaScript
I used AJAX initially as this website only had 2 pages and searching was the main focus, but now I use fetch as well to add all Pokémon and this all of this is new to me. After few months I can understand it much better.

I have a `pokemon` object that stores the data I need for a Pokémon. Each one is a property of the object.
```
//Pokémon Object
const pokemon = {};
```
I have many properties for the `pokemon` object, which then gets inserted into the HTML using `innerHTML` when the user searches.
```
//Pokemon properties | variables attached to the pokemon object 
pokemon['name'] = data.name;
pokemon['spriteFront'] = data.sprites['front_default'];
pokemon['spriteBack'] = data.sprites['back_default'];
pokemon['shinySpriteFront'] = data.sprites['front_shiny'];
pokemon['shinySpriteBack'] = data.sprites['back_shiny'];
pokemon['pokedex'] = data.id;
```
How I add the object properties using InnerHTML code:
```
//Adds the data to HTML using InnerHTML or src if it's an image
document.getElementById("pokemon-name").innerHTML = pokemon.name;
document.getElementById("pokemon-artwork").src = artWorkUrl;
document.getElementById("pokemon-front-sprite").src = pokemon.spriteFront;
document.getElementById("pokemon-back-sprite").src = pokemon.spriteBack;
document.getElementById("pokemon-front-sprite-shiny").src = pokemon.shinySpriteFront;
document.getElementById("pokemon-back-sprite-shiny").src = pokemon.shinySpriteBack;
document.getElementById("pokedex-id").innerHTML = pokemon.pokedex;
```
The PokéAPI is very detailed and it's very complex to access. At first, I had a difficult time getting the base stats individually.

<img src="images/pokeapi-base-stat-speed-data-map.png" alt="Dragonite speed stat" width="50%">

Using `map()` I finally got the base stats, but they are next to each other. I learned that the stats are in reverse order when compared to the Pokémon videos games and because of that I had to use `reverse()` at first. Using `<br>` made the data look more organized.

<img src="images/pokeapi-pikachu-base-stat-no-style.png" alt="Pikachu data no style" width="60%">

After some research I got each base stat individually shown below.

<img src="images/pokeapi-map-break-style-pikachu.png" alt="Data on pikachu using map" width="50%">

The JavaScript code below is for each individual base stat:
```
//Pokemon base stats
pokemon["baseHp"] = data.stats[5].base_stat;
pokemon["baseAttack"] = data.stats[4].base_stat;
pokemon["baseDefense"] = data.stats[3].base_stat;
pokemon["baseSpecialAttack"] = data.stats[2].base_stat;
pokemon["baseSpecialDefense"] = data.stats[1].base_stat;
pokemon["baseSpeed"] = data.stats[0].base_stat;
```
 I set a property to the `pokemon` object. For example:
```
pokemon['baseHP'] = data.stats[5].base_stats
```
Below is how i used `map()` to get data for the moves/game version table section. I am using a template literal to add `<li></li>` and `<br>` to move each data into a new line. The `li` goes inside my `ol` for styling reasons.
```
//Table row 4: displays the game version that the move belongs to
pokemon['gameVersion'] = data.moves.map(function(gameVersionMove, idx, pokemon){
return `<li>${gameVersionMove.version_group_details.map(versionGame => `<br>${versionGame.version_group.name}`).join("")}</li>`}).join("");
```

#### CSS
Styling the **Moves** section was very difficult because I was using ```map()``` to get all my data. It was my first time using `map` and later I would learn that template literals would be my solution to having each data as a column.

Pokémon: Ditto

|Move/s| Method | Level| Game Version| 
|----| ---- | --- | --- |
|Transform| level-up | 1 |ultra-sun-ultra-moon|

## For Pokémon Fans
### Pseudo Legendary and Legendary
As an extra touch, I label certain Pokémon based on their total base stats. 

**Pseudo-Legendary** is a term used on a Pokémon with a Total Base Stats of exactly 600. A few Pseudo-Legendary below:

* Dragonite
* Tyranitar
* Salamence
* Metagross
* Garchomp


**Legendary** is the strongest Pokémon tier, they have highest Total Base Stats. Their Total Base Stats has to be greater or equal to 601. They are often banned in the video game tournaments. A few legendary Pokémon below:

* Mewtwo
* Ho-oh
* Lugia
* Kyogre
* Groudon
* Rayquaza


I label them with an `if else` conditional statement.

```
//Checks for the total base stat and labels them Pseudo-Legendary or Legendary
let pokemonBaseLabel = document.querySelector(".pokemon-base-label")
if (sumOfBaseStats == "600"){
	pokemonBaseLabel.innerHTML = "Pseudo-Legendary";
	pokemonBaseLabel.style.color = "black";
	pokemonBaseLabel.style.backgroundColor = "rgb(0, 0, 0, 0.1)";
	pokemonBaseLabel.style.border = "1px solid #aaa";
} else if (sumOfBaseStats >= "601"){
	pokemonBaseLabel.innerHTML = "Legendary";
	pokemonBaseLabel.style.color = "white";
	pokemonBaseLabel.style.backgroundColor = "rgb(0, 0, 0, 0.6)";
	pokemonBaseLabel.style.border = "1px solid #aaa";
} else {
	pokemonBaseLabel.innerHTML = "";
	pokemonBaseLabel.style.color = "";
	pokemonBaseLabel.style.backgroundColor = "";
	pokemonBaseLabel.style.border = "";
}
```
### Base stat Label
Next to a Pokémon you can see a word. I label their base stats Low, Average, High, and Extreme. This helps point out if a stat is weak or strong. Here's the condition I added on each stat as an indicator.
```
if (sumOfBaseStats === 600){
	pokemonBaseLabel.innerHTML = "Pseudo-Legendary";
	pokemonBaseLabel.style.color = "#67808a";
} else if (sumOfBaseStats >= 601){
	pokemonBaseLabel.innerHTML = "Legendary Stats";
	pokemonBaseLabel.style.color = "#575e8a";
} else {
	pokemonBaseLabel.innerHTML = "";
	pokemonBaseLabel.style.color = "";
}
 ```
 
 ### Region
 This is the easiest way categorize each Pokémon from different region using their Pokédex Number.
 ```
//Checks for the Pokédex number to label a pokemon's region | generation
let pokemonRegion = document.getElementById("pokemon-region");
	if (pokemon.pokedex >= 1 && pokemon.pokedex <= 151){
			pokemonRegion.innerHTML = "Kanto | Generation I";
		} else if (pokemon.pokedex >= 152 && pokemon.pokedex <= 251){
			pokemonRegion.innerHTML = "Johto | Generation II";
		} else if (pokemon.pokedex >= 252 && pokemon.pokedex <= 386){
			pokemonRegion.innerHTML = "Hoenn | Generation III";
		} else if (pokemon.pokedex >= 387 && pokemon.pokedex <= 493){
			pokemonRegion.innerHTML = "Sinnoh | Generation IV";
		} else if (pokemon.pokedex >= 494 && pokemon.pokedex <= 649){
			pokemonRegion.innerHTML = "Unova | Generation V";
		} else if (pokemon.pokedex >= 650 && pokemon.pokedex <= 721){
			pokemonRegion.innerHTML = "Kalos | Generation VI";
		} else if (pokemon.pokedex >= 722 && pokemon.pokedex <= 808){
			pokemonRegion.innerHTML = "Alola | Generation VII";
		}
 ```
 ## Summary
 
 I enjoyed working on this Project and learning about API as well as the `map()` and while the API is missing some data it's very fun to use for practice.
 
 ---
 
#### @ 2020 Mark Gutiérrez