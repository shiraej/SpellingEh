//to fix: handle ed, s, er, ing endings
//loop through a body of text and substitue any words found in the dictionary


const handleUpperCase = function(word){
	let repl = dictionary[word.toLowerCase()];
	for (let i=0;i< word.length;i++){
		if (word[i] == word[i].toUpperCase()) {
			repl = repl.slice(0,i)+repl[i].toUpperCase()+repl.slice(i+1,repl.length);
		}
	}
	return repl;
}

const makeRepl = function(word, char, ind){

	if (char.test(word[ind])){
		let nosymb = word.slice(0,ind)
		let sChar = /s/;	//check for s at end before symbol
		let sInd = ind-1
		if (makeRepl(word,sChar,sInd)) {
			let repl = makeRepl(word,sChar,sInd);
			return repl;
		}
		if (nosymb.toLowerCase() in dictionary) {
			let repl = handleUpperCase(nosymb);
			repl = repl+word.slice(ind,word.length);
			return repl;
		}
		else {return false;}

	}
	else {
		if (word.toLowerCase() in dictionary) {
			let repl = handleUpperCase(word);
			return repl;
		}
		else {return false;}
	}
}

const wordSubber = function (bodyoftext, dict = dictionary) {
	//1. split the body of text into a word array
	let wordsArr = bodyoftext.split(' ');
    let symbChar = /[$-/:-?{-~!"^_`\[\]s]/;
	//2. loop through these words
	for (let word of wordsArr) {
		//check for symbol at end of word
		let lastInd = word.length-1;
		let repl = makeRepl(word,symbChar, lastInd);
		if (repl){
			wordsArr[wordsArr.indexOf(word)] = repl;
		}
		else {continue}
	}
	return wordsArr.join(' ');
}

const findandsub = function (nodeParent){

	if (nodeParent.nodeType === Node.TEXT_NODE) {
		nodeParent.textContent = wordSubber(nodeParent.textContent);
	}
	else {
		for (let child of nodeParent.childNodes){
				findandsub(child);
		}
	}
}
findandsub(document.body);
