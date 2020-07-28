function pokemonData () {
	const pokemonName = document.getElementById("pokemon-search").value.toLowerCase();
	const letNameTypeSpace = pokemonName.replace(/\s+/g, '-');
	const url = `https://pokeapi.co/api/v2/pokemon/${letNameTypeSpace}`;
	const xhttps = new XMLHttpRequest();
	
	xhttps.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			console.log(this.responseText);
			console.log(JSON.parse(this.responseText));
			const data = JSON.parse(this.responseText);
			
			//Pokémon Object
			const pokemon = {};
			
			//Pokemon properties | variables attached to the pokemon object 
			pokemon['name'] = data.name;
			pokemon['spriteFront'] = data.sprites['front_default'];
			pokemon['spriteBack'] = data.sprites['back_default'];
			pokemon['shinySpriteFront'] = data.sprites['front_shiny'];
			pokemon['shinySpriteBack'] = data.sprites['back_shiny'];

			
			pokemon['pokedex'] = data.id;
			
			
			//Adds the official Artwork of a Pokémon
			const artWorkUrl = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.pokedex}.png`;
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
			pokemon['type'] = data.types.map(type => type.type.name).join(", ");
			pokemon['abilities'] = data.abilities.map(ability => ability.ability.name).join(", ");
			pokemon['baseExperience'] = data.base_experience;
			
			//Pokemon base stats
			pokemon["baseHp"] = data.stats[0].base_stat;
			pokemon["baseAttack"] = data.stats[1].base_stat;
			pokemon["baseDefense"] = data.stats[2].base_stat;
			pokemon["baseSpecialAttack"] = data.stats[3].base_stat;
			pokemon["baseSpecialDefense"] = data.stats[4].base_stat;
			pokemon["baseSpeed"] = data.stats[5].base_stat;
			
			//This adds all the base stats and returns a total base stat
			let sumOfBaseStats = pokemon.baseHp + pokemon.baseAttack + pokemon.baseDefense + pokemon.baseSpecialAttack + pokemon.baseSpecialDefense + pokemon.baseSpeed;
			let totalBaseStats = document.getElementById("total-base-stats");
			totalBaseStats.innerHTML = parseInt(sumOfBaseStats);
			
			//Checks for the total base stat and labels them Pseudo-Legendary or Legendary
			let pokemonBaseLabel = document.querySelector(".pokemon-base-label");
			let pokemonMegaLabel = document.querySelector(".pokemon-mega-label");
			let pokemonPrimalLabel = document.querySelector(".pokemon-primal-label");
			
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
			//Mega label
			if (pokemonName.includes("mega")){
				pokemonMegaLabel.innerHTML = `Mega Evolution <img src="images/pokemon-mega-evolution.png" width="20px">`;
				pokemonMegaLabel.style.color = "#13a0bf";
				pokemonRegion.innerHTML = "Same as base form";
			} else {
				pokemonMegaLabel.innerHTML = '';
				pokemonMegaLabel.style.color = '';
			}
			//Primal label
			if (pokemonName.includes("primal")){
				pokemonPrimalLabel.innerHTML = `Primal Form`;
				pokemonPrimalLabel.style.color = "#806aa8";
			} else {
				pokemonPrimalLabel.innerHTML = '';
				pokemonPrimalLabel.style.color = '';
			}
			
			//Variables used to check if a stat is low, average, high, or extreme
			const hpGauge = document.querySelector(".hp-label-gauge");
			const attackGauge = document.querySelector(".attack-label-gauge");
			const defenseGauge = document.querySelector(".defense-label-gauge");
			const specialAttackGauge = document.querySelector(".special-attack-label-gauge");
			const specialDefenseGauge = document.querySelector(".special-defense-label-gauge");
			const speedGauge = document.querySelector(".speed-label-gauge");
			
			
			let labelColorLow = "#f0d3d3";
			let labelColorAverage = "#f0f0d3";
			let labelColorHigh = "#d8f0d3";
			let labelColorExtreme = "#d3e3f0";
			
			//Checks each stat and labels them low, average, high, and extreme
			//HP label
			if (pokemon.baseHp <= "60"){
				hpGauge.style.backgroundColor = labelColorLow;
				//hpGauge.innerHTML = "Low";
				hpGauge.style.width = `${pokemon.baseHp}px`;
			} else if (pokemon.baseHp >= "61" && pokemon.baseHp < "90" ){
				hpGauge.style.backgroundColor = labelColorAverage;
				//hpGauge.innerHTML = "Average";
				hpGauge.style.width = `${pokemon.baseHp}px`;
			} else if (pokemon.baseHp >= "90" && pokemon.baseHp < "120"){
				hpGauge.style.backgroundColor = labelColorHigh;
				//hpGauge.innerHTML = "High";
				hpGauge.style.width = `${pokemon.baseHp}px`;
			} else if(pokemon.baseHp >= "120"){
				hpGauge.style.backgroundColor = labelColorExtreme;
				//hpGauge.innerHTML = "Extreme";
				hpGauge.style.width = `${pokemon.baseHp}px`;
			} else{
				hpGauge.style.display = "none";
				hpGauge.innerHTML = "";
			}
			//Attack label
			if (pokemon.baseAttack <= "60"){
				attackGauge.style.backgroundColor = labelColorLow;
				attackGauge.style.width = `${pokemon.baseAttack}px`;
			} else if (pokemon.baseAttack >= "61" && pokemon.baseAttack < "90" ){
				attackGauge.style.backgroundColor = labelColorAverage;
				attackGauge.style.width = `${pokemon.baseAttack}px`;
			} else if (pokemon.baseAttack >= "90" && pokemon.baseAttack < "120"){
				attackGauge.style.backgroundColor = labelColorHigh;
				attackGauge.style.width = `${pokemon.baseAttack}px`;
			} else if(pokemon.baseAttack >= "120"){
				attackGauge.style.backgroundColor = labelColorExtreme;
				attackGauge.style.width = `${pokemon.baseAttack}px`;
			} else{
				attackGauge.style.display = "none";
				attackGauge.innerHTML = "";
			}
			//Defense label
			if (pokemon.baseDefense <= "60"){
				defenseGauge.style.backgroundColor = labelColorLow;
				defenseGauge.style.width = `${pokemon.baseDefense}px`;
			} else if (pokemon.baseDefense >= "61" && pokemon.baseDefense < "90" ){
				defenseGauge.style.backgroundColor = labelColorAverage;
				defenseGauge.style.width = `${pokemon.baseDefense}px`;
			} else if (pokemon.baseDefense >= "90" && pokemon.baseDefense < "120"){
				defenseGauge.style.backgroundColor = labelColorHigh;
				defenseGauge.style.width = `${pokemon.baseDefense}px`;
			} else if(pokemon.baseDefense >= "120"){
				defenseGauge.style.backgroundColor = labelColorExtreme;
				defenseGauge.style.width = `${pokemon.baseDefense}px`;
			} else{
				defenseGauge.style.display = "none";
				defenseGauge.innerHTML = "";
			}
			//Special attack label
			if (pokemon.baseSpecialAttack <= "60"){
				specialAttackGauge.style.backgroundColor = labelColorLow;
				specialAttackGauge.style.width = `${pokemon.baseSpecialAttack}px`;
			} else if (pokemon.baseSpecialAttack >= "61" && pokemon.baseSpecialAttack < "90" ){
				specialAttackGauge.style.backgroundColor = labelColorAverage;
				specialAttackGauge.style.width = `${pokemon.baseSpecialAttack}px`;
			} else if (pokemon.baseSpecialAttack >= "90" && pokemon.baseSpecialAttack < "120"){
				specialAttackGauge.style.backgroundColor = labelColorHigh;
				specialAttackGauge.style.width = `${pokemon.baseSpecialAttack}px`;
			} else if(pokemon.baseSpecialAttack >= "120"){
				specialAttackGauge.style.backgroundColor = labelColorExtreme;
				specialAttackGauge.style.width = `${pokemon.baseSpecialAttack}px`;
			} else{
				specialAttackGauge.style.display = "none";
				specialAttackGauge.innerHTML = "";
			}
			//Special defense label
			if (pokemon.baseSpecialDefense <= "60"){
				specialDefenseGauge.style.backgroundColor = labelColorLow;
				specialDefenseGauge.style.width = `${pokemon.baseSpecialDefense}px`;
			} else if (pokemon.baseSpecialDefense >= "61" && pokemon.baseSpecialDefense < "90" ){
				specialDefenseGauge.style.backgroundColor = labelColorAverage;
				specialDefenseGauge.style.width = `${pokemon.baseSpecialDefense}px`;
			} else if (pokemon.baseSpecialDefense >= "90" && pokemon.baseSpecialDefense < "120"){
				specialDefenseGauge.style.backgroundColor = labelColorHigh;
				specialDefenseGauge.style.width = `${pokemon.baseSpecialDefense}px`;
			} else if(pokemon.baseSpecialDefense >= "120"){
				specialDefenseGauge.style.backgroundColor = labelColorExtreme;
				specialDefenseGauge.style.width = `${pokemon.baseSpecialDefense}px`;
			} else{
				specialDefenseGauge.style.display = "none";
				specialDefenseGauge.innerHTML = "";
			}
			//Speed label
			if (pokemon.baseSpeed <= "60"){
				speedGauge.style.backgroundColor = labelColorLow;
				speedGauge.style.width = `${pokemon.baseSpeed}px`;
			} else if (pokemon.baseSpeed >= "61" && pokemon.baseSpeed < "90" ){
				speedGauge.style.backgroundColor = labelColorAverage;
				speedGauge.style.width = `${pokemon.baseSpeed}px`;
			} else if (pokemon.baseSpeed >= "90" && pokemon.baseSpeed < "120"){
				speedGauge.style.backgroundColor = labelColorHigh;
				speedGauge.style.width = `${pokemon.baseSpeed}px`;
			} else if(pokemon.baseSpeed >= "120"){
				speedGauge.style.backgroundColor = labelColorExtreme;
				speedGauge.style.width = `${pokemon.baseSpeed}px`;
			} else{
				speedGauge.style.display = "none";
				speedGauge.innerHTML = "";
			}
			//Table row 1: displays data of move names
			pokemon['moveList'] = data.moves.map(function(allmoves){
				return `<li><br>${allmoves.move.name}</li>`;
			}).join(" ");
			//Table row 2: displays data of the method of learning a move
			pokemon['learnMethod'] = data.moves.map(function(learnMethodMove){
				return `<li>${learnMethodMove.version_group_details.map(learnM => `<br>${learnM.move_learn_method.name}`).join("")}</li>`;
			}).join("");
			//Table row 3: displays the level required for a move in each game
			pokemon['levelingMove'] = data.moves.map(function(levelingmoves){
				return `<li>${levelingmoves.version_group_details.map(lvMoves => `<br>${lvMoves.level_learned_at}`).join("")}</li>`;
			}).join("");
			//Table row 4: displays the game version that the move belongs to
			pokemon['gameVersion'] = data.moves.map(function(gameVersionMove){
				return `<li>${gameVersionMove.version_group_details.map(versionGame => `<br>${versionGame.version_group.name}`).join("")}</li>`
			}).join("");
			
			//Adds the data to HTML using InnerHTML or src if it's an image
			document.getElementById("pokemon-name").innerHTML = pokemon.name;
			document.getElementById("pokemon-artwork").src = artWorkUrl;
			document.getElementById("pokemon-front-sprite").src = pokemon.spriteFront;
			document.getElementById("pokemon-back-sprite").src = pokemon.spriteBack;
			document.getElementById("pokemon-front-sprite-shiny").src = pokemon.shinySpriteFront;
			document.getElementById("pokemon-back-sprite-shiny").src = pokemon.shinySpriteBack;
			
			//add to HTML
			document.getElementById("pokedex-id").innerHTML = pokemon.pokedex;
			document.getElementById("pokemon-type").innerHTML = pokemon.type;
			document.getElementById("pokemon-abilities").innerHTML = pokemon.abilities.replace(/\-/g, ' ');
			document.getElementById("pokemon-base-experience").innerHTML = pokemon.baseExperience;
			document.getElementById("pokemon-base-hp").innerHTML = pokemon.baseHp;
			document.getElementById("pokemon-base-attack").innerHTML = pokemon.baseAttack;
			document.getElementById("pokemon-base-defense").innerHTML = pokemon.baseDefense;
			document.getElementById("pokemon-base-special-attack").innerHTML = pokemon.baseSpecialAttack;
			document.getElementById("pokemon-base-special-defense").innerHTML = pokemon.baseSpecialDefense;
			document.getElementById("pokemon-base-speed").innerHTML = pokemon.baseSpeed;
			document.getElementById("pokemon-moves").innerHTML = pokemon.moveList.replace(/\-/g, ' ');
			document.getElementById("pokemon-learning-method").innerHTML = pokemon.learnMethod.replace(/\-/g, ' ');
			document.getElementById("pokemon-leveling-moves").innerHTML = pokemon.levelingMove.replace(/\-/g, ' ');
			document.getElementById("pokemon-game-version").innerHTML = pokemon.gameVersion.replace(/\-/g, ' ');
			
			
			// ALL MEGA ARTWORK
			if(letNameTypeSpace.includes('venusaur-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/3-mega.png`;
			}
			if(letNameTypeSpace.includes('charizard-mega-x')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/6-mega-x.png`;
			}
			if(letNameTypeSpace.includes('charizard-mega-y')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/6-mega-y.png`;
			}
			if(letNameTypeSpace.includes('blastoise-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/9-mega.png`;
			}
			if(letNameTypeSpace.includes('alakazam-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/65-mega.png`;
			}
			if(letNameTypeSpace.includes('gengar-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/94-mega.png`;
			}
			if(letNameTypeSpace.includes('kangaskhan-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/115-mega.png`;
			}
			if(letNameTypeSpace.includes('pinsir-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/127-mega.png`;
			}
			if(letNameTypeSpace.includes('gyarados-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/130-mega.png`;
			}
			if(letNameTypeSpace.includes('aerodactyl-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/142-mega.png`;
			}
			if(letNameTypeSpace.includes('kangaskhan-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/115-mega.png`;
			}
			if(letNameTypeSpace.includes('mewtwo-mega-x')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/150-mega-x.png`;
			}
			if(letNameTypeSpace.includes('mewtwo-mega-y')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/150-mega-y.png`;
			}
			if(letNameTypeSpace.includes('ampharos-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/181-mega.png`;
			}
			if(letNameTypeSpace.includes('houndoom-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/229-mega.png`;
			}
			if(letNameTypeSpace.includes('tyranitar-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/248-mega.png`;
			}
			if(letNameTypeSpace.includes('blaziken-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/257-mega.png`;
			}
			if(letNameTypeSpace.includes('gardevoir-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/282-mega.png`;
			}
			if(letNameTypeSpace.includes('mawile-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/303-mega.png`;
			}
			if(letNameTypeSpace.includes('aggron-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/306-mega.png`;
			}
			if(letNameTypeSpace.includes('manectric-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/310-mega.png`;
			}
			if(letNameTypeSpace.includes('banette-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/354-mega.png`;
			}
			if(letNameTypeSpace.includes('absol-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/359-mega.png`;
			}
			if(letNameTypeSpace.includes('garchomp-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/445-mega.png`;
			}
			if(letNameTypeSpace.includes('lucario-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/448-mega.png`;
			}
			if(letNameTypeSpace.includes('abomasnow-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/460-mega.png`;
			}
			if(letNameTypeSpace.includes('beedrill-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/15-mega.png`;
			}
			if(letNameTypeSpace.includes('pidgeot-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/18-mega.png`;
			}
			if(letNameTypeSpace.includes('slowbro-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/80-mega.png`;
			}
			if(letNameTypeSpace.includes('steelix-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/208-mega.png`;
			}
			if(letNameTypeSpace.includes('sceptile-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/254-mega.png`;
			}
			if(letNameTypeSpace.includes('swampert-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/260-mega.png`;
			}
			if(letNameTypeSpace.includes('sableye-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/302-mega.png`;
			}
			if(letNameTypeSpace.includes('camerupt-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/323-mega.png`;
			}
			if(letNameTypeSpace.includes('glalie-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/362-mega.png`;
			}
			if(letNameTypeSpace.includes('salamence-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/373-mega.png`;
			}
			if(letNameTypeSpace.includes('metagross-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/376-mega.png`;
			}
			if(letNameTypeSpace.includes('latias-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/380-mega.png`;
			}
			if(letNameTypeSpace.includes('latios-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/381-mega.png`;
			}
			if(letNameTypeSpace.includes('rayquaza-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/384-mega.png`;
			}
			if(letNameTypeSpace.includes('lopunny-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/428-mega.png`;
			}
			if(letNameTypeSpace.includes('gallade-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/475-mega.png`;
			}
			if(letNameTypeSpace.includes('audino-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/531-mega.png`;
			}
			if(letNameTypeSpace.includes('diancie-mega')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/719-mega.png`;
			}
			/* PRIMAL */
			if(letNameTypeSpace.includes('kyogre-primal')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/382-mega.png`;
			}
			if(letNameTypeSpace.includes('groudon-primal')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/383-mega.png`;
			}
			
			document.getElementById("other-forms").innerHTML = "";
			/* MISSING ARWORK */
			
			//Charizard
			
			if(letNameTypeSpace.includes('charizard')) {
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img src="https://pokeres.bastionbot.org/images/pokemon/6-mega-x.png" width="100%"><p>Mega Charizard X</p></div><div class="form-2"><img src="https://pokeres.bastionbot.org/images/pokemon/6-mega-y.png" width="100%"><p>Mega Charizard Y</p></div>`;
			}
			if(letNameTypeSpace.includes('charizard-mega-x')) {
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img src="https://pokeres.bastionbot.org/images/pokemon/6-mega-y.png" width="100%"><p>Mega Charizard Y</p></div>`;
			}
			if(letNameTypeSpace.includes('charizard-mega-y')) {
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img src="https://pokeres.bastionbot.org/images/pokemon/6-mega-x.png" width="100%"><p>Mega Charizard X</p></div>`;
			}
			//Pikachu
			if(letNameTypeSpace.includes('pikachu')) {
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img src="https://pokeres.bastionbot.org/images/pokemon/26.png" width="100%"><p>Raichu</p></div><div class="form-2"><img src="https://pokeres.bastionbot.org/images/pokemon/172.png" width="100%"><p>Pichu</p></div><div class="form-3"><img src="https://pokeres.bastionbot.org/images/pokemon/26-alola.png" width="100%"><p>Alola Raichu</p></div>`;
			}
			//Mewtwo
			if(letNameTypeSpace.includes('mewtwo')) {
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img src="https://pokeres.bastionbot.org/images/pokemon/150-mega-x.png" width="100%"><p>Mega Mewtwo X</p></div><div class="form-2"><img src="https://pokeres.bastionbot.org/images/pokemon/150-mega-y.png" width="100%"><p>Mega Mewtwo Y</p></div>`;
			}
			if(letNameTypeSpace.includes('mewtwo-mega-x')) {
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img src="https://pokeres.bastionbot.org/images/pokemon/150-mega-y.png" width="100%"><p>Mega Mewtwo Y</p></div>`;
			}
			if(letNameTypeSpace.includes('mewtwo-mega-y')) {
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img src="https://pokeres.bastionbot.org/images/pokemon/150-mega-x.png" width="100%"><p>Mega Mewtwo X</p></div>`;
			}
			
			//Deoxys
			
			//normal
			if(letNameTypeSpace.includes('deoxys-normal')) {
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img src="https://pokeres.bastionbot.org/images/pokemon/386-attack.png" width="100%"><p>Deoxys Attack</p></div><div class="form-2"><img src="https://pokeres.bastionbot.org/images/pokemon/386-defense.png" width="100%"><p>Deoxys Defense</p></div><div class="form-3"><img src="https://pokeres.bastionbot.org/images/pokemon/386-speed.png" width="100%"><p>Deoxys Speed</p></div>`;
			}
			//attack
			if(letNameTypeSpace.includes('deoxys-attack')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/386-attack.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img src="https://pokeres.bastionbot.org/images/pokemon/386.png" width="100%"><p>Deoxys Normal</p></div><div class="form-2"><img src="https://pokeres.bastionbot.org/images/pokemon/386-defense.png" width="100%"><p>Deoxys Defense</p></div><div class="form-3"><img src="https://pokeres.bastionbot.org/images/pokemon/386-speed.png" width="100%"><p>Deoxys Speed</p></div>`;
			}
			//defense
			if(letNameTypeSpace.includes('deoxys-defense')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/386-defense.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img src="https://pokeres.bastionbot.org/images/pokemon/386.png" width="100%"><p>Deoxys Normal</p></div><div class="form-2"><img src="https://pokeres.bastionbot.org/images/pokemon/386-attack.png" width="100%"><p>Deoxys Attack</p></div><div class="form-3"><img src="https://pokeres.bastionbot.org/images/pokemon/386-speed.png" width="100%"><p>Deoxys Speed</p></div>`;
			}
			//speed
			if(letNameTypeSpace.includes('deoxys-speed')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/386-speed.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img src="https://pokeres.bastionbot.org/images/pokemon/386.png" width="100%"><p>Deoxys Normal</p></div><div class="form-2"><img src="https://pokeres.bastionbot.org/images/pokemon/386-attack.png" width="100%"><p>Deoxys Attack</p></div><div class="form-3"><img src="https://pokeres.bastionbot.org/images/pokemon/386-defense.png" width="100%"><p>Deoxys Defense</p></div>`;
			}
			//Burmy
			if(letNameTypeSpace.includes('burmy')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/412-plant-cloak.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/412-sandy-cloak.png" width="100%"><p>Burmy Sandy Cloak</p></div><div class="form-2"><img src="https://pokeres.bastionbot.org/images/pokemon/412-trash-cloak.png" width="100%"><p>Burmy Trash Cloak</p></div>`;
			}
			//Wormadam
			if(letNameTypeSpace.includes('wormadam-plant')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/413-plant-cloak.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/413-sandy-cloak.png" width="100%"><p>Wormadam Sandy Cloak</p></div><div class="form-2"><img src="https://pokeres.bastionbot.org/images/pokemon/413-trash-cloak.png" width="100%"><p>Wormadam Trash Cloak</p></div>`;
			}
			if(letNameTypeSpace.includes('wormadam-sandy')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/413-sandy-cloak.png`;
			}
			if(letNameTypeSpace.includes('wormadam-trash')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/413-trash-cloak.png`;
			}
			//Cherrim
			if(letNameTypeSpace.includes('cherrim')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/421-overcast.png`;
			}
			//Giratina
			if(letNameTypeSpace.includes('giratina-altered')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/487-altered.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/487-origin.png" width="100%"><p>Giratina Origin</p></div>`;
			}
			if(letNameTypeSpace.includes('giratina-origin')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/487-origin.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/487-altered.png" width="100%"><p>Giratina Altered</p></div>`;
			}
			//Shaymin
			if(letNameTypeSpace.includes('shaymin-land')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/492-land.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/492-sky.png" width="100%"><p>Shaymin Sky</p></div>`;
			}
			if(letNameTypeSpace.includes('shaymin-sky')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/492-sky.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/492-land.png" width="100%"><p>Shaymin Land</p></div>`;
			}
			//Basculin-blue-striped
			if(letNameTypeSpace.includes('basculin-blue-striped')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/550.png`;
			}
			//Deerling
			if(letNameTypeSpace.includes('deerling')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/585-spring.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/585-autumn.png" width="100%"><p>Deerling Autumn</p></div><div class="form-2"><img  src="https://pokeres.bastionbot.org/images/pokemon/585-summer.png" width="100%"><p>Deerling Summer</p></div><div class="form-3"><img  src="https://pokeres.bastionbot.org/images/pokemon/585-winter.png" width="100%"><p>Deerling Winter</p></div>`;
			}
			//Sawsbuck
			if(letNameTypeSpace.includes('sawsbuck')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/586-spring.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/586-autumn.png" width="100%"><p>Deerling Autumn</p></div><div class="form-2"><img  src="https://pokeres.bastionbot.org/images/pokemon/586-summer.png" width="100%"><p>Deerling Summer</p></div><div class="form-3"><img  src="https://pokeres.bastionbot.org/images/pokemon/586-winter.png" width="100%"><p>Deerling Winter</p></div>`;
			}
			//Tornadus
			if(letNameTypeSpace.includes('tornadus-incarnate')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/641-incarnate.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/641-therian.png" width="100%"><p>Tornadus Therian</p></div>`;
			}
			if(letNameTypeSpace.includes('tornadus-therian')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/641-therian.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/641-incarnate.png" width="100%"><p>Tornadus Incarnate</p></div>`;
			}
			//Thundurus
			if(letNameTypeSpace.includes('thundurus-incarnate')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/642-incarnate.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/642-therian.png" width="100%"><p>Thundurus Therian</p></div>`;
			}
			if(letNameTypeSpace.includes('thundurus-therian')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/642-therian.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/642-incarnate.png" width="100%"><p>Thundurus Incarnate</p></div>`;
			}
			//Landorus
			if(letNameTypeSpace.includes('landorus-incarnate')) {
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/645-therian.png" width="100%"><p>Landorus Therian</p></div>`;
			}
			if(letNameTypeSpace.includes('landorus-therian')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/645-therian.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/645.png" width="100%"><p>Landorus Incarnate</p></div>`;
			}
			//Kyurem
			if(letNameTypeSpace.includes('kyurem')) {
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/646-black.png" width="100%"><p>Kyurem Black</p></div><div class="form-2"><img  src="https://pokeres.bastionbot.org/images/pokemon/646-white.png" width="100%"><p>Kyurem White</p></div>`;
			}
			if(letNameTypeSpace.includes('kyurem-black')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/646-black.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/646-white.png" width="100%"><p>Kyurem White</p></div>`;
			}
			if(letNameTypeSpace.includes('kyurem-white')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/646-white.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/646-black.png" width="100%"><p>Kyurem Black</p></div>`;
			}
			
			//Keldeo
			if(letNameTypeSpace.includes('keldeo-ordinary')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/647-ordinary.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/647-resolute.png" width="100%"><p>Keldeo Resolute</p></div>`;
			}
			if(letNameTypeSpace.includes('keldeo-resolute')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/647-resolute.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/647-ordinary.png" width="100%"><p>Keldeo Ordinary</p></div>`;
			}
			//Meloetta
			if(letNameTypeSpace.includes('meloetta-aria')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/648-aria.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/648-pirouette.png" width="100%"><p>Meloetta Pirouette</p></div>`;
			}
			if(letNameTypeSpace.includes('meloetta-pirouette')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/648-pirouette.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/648-aria.png" width="100%"><p>Meloetta Aria</p></div>`;
			}
			//Zygarde
			if(letNameTypeSpace.includes('zygarde')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/718-50.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/718-10.png" width="100%"><p>Zygarde 10%</p></div><div class="form-2"><img  src="https://pokeres.bastionbot.org/images/pokemon/718-complete.png" width="100%"><p>Zygarde Complete</p></div>`;
			}
			if(letNameTypeSpace.includes('zygarde-10')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/718-10.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/718-50.png" width="100%"><p>Zygarde 50%</p></div><div class="form-2"><img  src="https://pokeres.bastionbot.org/images/pokemon/718-complete.png" width="100%"><p>Zygarde Complete</p></div>`;
			}
			if(letNameTypeSpace.includes('zygarde-complete')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/718-complete.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/718-50.png" width="100%"><p>Zygarde 50%</p></div><div class="form-2"><img  src="https://pokeres.bastionbot.org/images/pokemon/718-10.png" width="100%"><p>Zygarde 10%</p></div>`;
			}
			//Hoopa
			if(letNameTypeSpace.includes('hoopa')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/720-confined.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/720-unbound.png" width="100%"><p>Hoopa Unbound</p></div>`;
			}
			if(letNameTypeSpace.includes('hoopa-unbound')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/720-unbound.png`;
				document.getElementById("other-forms").innerHTML = '';
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/720-confined.png" width="100%"><p>Hoopa Confined</p></div>`;
			}
			//Oricorio
			if(letNameTypeSpace.includes('oricorio-baile')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/741-baile.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/741-pom-pom.png" width="100%"><p>Oricorio Pom-Pom</p></div><div class="form-2"><img  src="https://pokeres.bastionbot.org/images/pokemon/741-pau.png" width="100%"><p>Oricorio Pa'u</p></div><div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/741-sensu.png" width="100%"><p>Oricorio Sensu</p></div>`;
			}
			if(letNameTypeSpace.includes('oricorio-pom-pom')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/741-pom-pom.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/741-baile.png" width="100%"><p>Oricorio Baile</p></div><div class="form-2"><img  src="https://pokeres.bastionbot.org/images/pokemon/741-pau.png" width="100%"><p>Oricorio Pa'u</p></div><div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/741-sensu.png" width="100%"><p>Oricorio Sensu</p></div>`;
			}
			if(letNameTypeSpace.includes('oricorio-pau')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/741-pau.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/741-baile.png" width="100%"><p>Oricorio Baile</p></div><div class="form-2"><img  src="https://pokeres.bastionbot.org/images/pokemon/741-pom-pom.png" width="100%"><p>Oricorio Pom Pom</p></div><div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/741-sensu.png" width="100%"><p>Oricorio Sensu</p></div>`;
			}
			if(letNameTypeSpace.includes('oricorio-sensu')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/741-sensu.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/741-baile.png" width="100%"><p>Oricorio Baile</p></div><div class="form-2"><img  src="https://pokeres.bastionbot.org/images/pokemon/741-pom-pom.png" width="100%"><p>Oricorio Pom Pom</p></div><div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/741-pau.png" width="100%"><p>Oricorio Pa'u</p></div>`;
			}
			///Lyncanroc
			if(letNameTypeSpace.includes('lycanroc-midday')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/745-midday.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/745-midnight.png" width="100%"><p>Lyranroc Midnight</p></div><div class="form-2"><img  src="https://pokeres.bastionbot.org/images/pokemon/745-dusk.png" width="100%"><p>Lyranroc Dusk</p></div>`;
			}
			if(letNameTypeSpace.includes('lycanroc-midnight')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/745-midnight.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/745-midday.png" width="100%"><p>Lyranroc Midday</p></div><div class="form-2"><img  src="https://pokeres.bastionbot.org/images/pokemon/745-dusk.png" width="100%"><p>Lyranroc Dusk</p></div>`;
			}
			if(letNameTypeSpace.includes('lycanroc-dusk')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/745-dusk.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/745-midday.png" width="100%"><p>Lyranroc Midday</p></div><div class="form-2"><img  src="https://pokeres.bastionbot.org/images/pokemon/745-midnight.png" width="100%"><p>Lyranroc Midday</p></div>`;
			}
			//Wishiwashi
			if(letNameTypeSpace.includes('wishiwashi-solo')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/746-solo.png`;
			}
			if(letNameTypeSpace.includes('wishiwashi-school')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/746-school.png`;
			}
			//Minior
			if(letNameTypeSpace.includes('minior-meteor')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/774-meteor.png`;
			}
			if(letNameTypeSpace.includes('minior-core')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/774-core.png`;
			}
			//mimikyu
			if(letNameTypeSpace.includes('mimikyu-disguised')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/778-disguised.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/778-busted.png" width="100%"><p>Mimikyu Busted/p>`
			}
			if(letNameTypeSpace.includes('mimikyu-busted')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/778-busted.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/778-disguised.png" width="100%"><p>Mimikyu Disguised</p></div>`
			}
			//Necrozma
			if(letNameTypeSpace.includes('necrozma')) {
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/800-dusk-mane.png" width="100%"><p>Necrozma Dusk</p></div><div class="form-2"><img  src="https://pokeres.bastionbot.org/images/pokemon/800-dawn-wings.png" width="100%"><p>Necrozma Dawn</p></div>`
			}
			if(letNameTypeSpace.includes('necrozma-dusk')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/800-dusk-mane.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/800-dawn-wings.png" width="100%"><p>Necrozma Dawn</p></div>`
				
			}
			if(letNameTypeSpace.includes('necrozma-dawn')) {
				document.getElementById("pokemon-artwork").src = `https://pokeres.bastionbot.org/images/pokemon/800-dawn-wings.png`;
				
				document.getElementById("other-forms").innerHTML = `<div class="form-1"><img  src="https://pokeres.bastionbot.org/images/pokemon/800-dusk-mane.png" width="100%"><p>Necrozma Dawn</p></div>`
			}
		}
	};
	xhttps.open("GET", url, true);
	xhttps.send();
	
}
//Gets the pokemon data when the user clicks the search button
const button = document.getElementById("btn");
button.addEventListener("click", () => {
	pokemonData();
});
//Gets the pokemon data when the user clicks enter
const keySearch = document.querySelector(".enter-search");
keySearch.addEventListener('keypress', function(e){
	if (e.key === "Enter"){
		pokemonData();
	}
});