function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max))
}

let curPorHP = document.querySelector("#currentPoringHP");
let maxPorHP = document.querySelector("#maxPoringHP");
curPorHP.innerHTML = maxPorHP.innerHTML;

let curPorSP = document.querySelector("#currentPoringSP");
let maxPorSP = document.querySelector("#maxPoringSP");
curPorSP.innerHTML = maxPorSP.innerHTML;

let curNovHP = document.querySelector("#currentNoviceHP");
let maxNovHP = document.querySelector("#maxNoviceHP");
curNovHP.innerHTML = maxNovHP.innerHTML;

let curNovSP = document.querySelector("#currentNoviceSP");
let maxNovSP = document.querySelector("#maxNoviceSP");
curNovSP.innerHTML = maxNovSP.innerHTML;


attackBtn.addEventListener("click", function() {
	if(curPorHP.innerHTML <= 0) {
		curPorHP.innerHTML = 0;
	} else {
		let damage = getRandomInt(50);
		curPorHP.innerHTML -= damage;
	}

	// attackBtn.removeEventListener();
	// setInterval(attackBtnNovice, 1500);

	let bar = document.querySelector("#hpBarPoring");
	bar.style.width = ((curPorHP.innerHTML*100)/maxPorHP.innerHTML+"%");

	checkWhoWins();
})


skillBtn.addEventListener("click", function() {
	if(curPorHP.innerHTML <= 0) {
		curPorHP.innerHTML = 0;
	} else {
		let skillDmg = getRandomInt(100);
		curPorHP.innerHTML -= skillDmg;		
	}

	if(curNovSP.innerHTML <= 0) {
		curNovSP.innerHTML = 0;
	} else {
		let useSP = 40;
		curNovSP.innerHTML -= useSP;	
	}

	let bar = document.querySelector("#hpBarPoring");
	bar.style.width = ((curPorHP.innerHTML*100)/maxPorHP.innerHTML+"%");

	let spBar = document.querySelector("#spBarNovice");
	spBar.style.width = ((curNovSP.innerHTML*100)/maxNovSP.innerHTML+"%")
	checkWhoWins();
})

potsBtn.addEventListener("click", function() {
	if(curNovHP.innerHTML >= maxNovHP.innerHTML) {
		curNovHP.innerHTML = maxNovHP.innerHTML;
	} else {
		let potsHP = getRandomInt(80)
		curNovHP.innerHTML += potsHP;
	}

	let bar = document.querySelector("#hpBarNovice");
	bar.style.width = ((curNovHP.innerHTML*100)/maxNovHP.innerHTML+"%")
})

let poringAttack = function() {
	let poringDmg = getRandomInt(60);
	curNovHP.innerHTML -= poringDmg;
	if(curNovHP.innerHTML <= 0) {
		clearInterval(poringAttack);
		curNovHP.innerHTML = 0;
	} else if(curPorHP.innerHTML == 0) {
		clearInterval(poringAttack);
	}
	let bar = document.querySelector("#hpBarNovice");
	bar.style.width = ((curNovHP.innerHTML*100)/maxNovHP.innerHTML+"%");
	checkWhoWins();
};

setInterval(poringAttack, 1200);

let spRegen = function() {
	if(curNovSP.innerHTML >= maxNovSP.innerHTML) {
		curNovSP.innerHTML = maxNovSP.innerHTML;
	} else if(curNovSP.innerHTML < maxNovSP.innerHTML){
		let noviceRegen = getRandomInt(15);
		curNovSP.innerHTML = curNovSP.innerHTML*1 + noviceRegen*1;		
	}
	let spBar = document.querySelector("#spBarNovice");
	spBar.style.width = ((curNovSP.innerHTML*100)/maxNovSP.innerHTML+"%");

	if(checkWhoWins() == true) {
		clearInterval(spRegen);
	} else if(checkWhoWins() == false){
		clearInterval(spRegen);
	}
};

setInterval(spRegen, 1800);

let checkWhoWins = function() {
	if(curNovHP.innerHTML == 0) {
		resultMessage.innerHTML = "You Lost!";
		document.querySelector("#resultMessage").style.color = "darkgrey";

		attackBtn.removeEventListener();
		skillBtn.removeEventListener();
		potsBtn.removeEventListener();
		return true;
	} else if(curPorHP.innerHTML == 0) {
		resultMessage.innerHTML = "You won!";

		attackBtn.removeEventListener();
		skillBtn.removeEventListener();
		potsBtn.removeEventListener();
		return false;
	}	
}

// if(curPorHP == 0) {
// 	"My time has come. Sends shivers down my spine. Body's aching all the time"
// }

