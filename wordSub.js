
//loop through a body of text and substitue any words found in the dictionary


const handleUpperCase = function(word){
	//finds the word in the dictionary and returns the value with uppercase preserved
	let repl = dictionary[word.toLowerCase()];
	for (let i=0;i< word.length;i++){
		if (word[i] == word[i].toUpperCase()) {
			repl = repl.slice(0,i)+repl[i].toUpperCase()+repl.slice(i+1,repl.length);
		}
	}
	return repl;
}

const wordSubber = function (bodyoftext, dict = dictionary) {
	//1. split the body of text into a word array
	let wordsArr = bodyoftext.split(' ');
    
	//2. loop through these words
	for (let word of wordsArr) {
		//handle symbol at end of word
		let lastInd = word.length-1;
		if (/[^\p{L}\d\s]/u.test(word[lastInd])){ 	//the regex here searches for any character that isn't a-z 0-9
			let nosymb = word.slice(0,lastInd)
			if (nosymb.toLowerCase() in dictionary) {	
				let repl = handleUpperCase(nosymb);
				repl = repl+word[lastInd];
				wordsArr[wordsArr.indexOf(word)] = repl;
			}
		}
		else {
			if (word.toLowerCase() in dictionary) {
				let repl = handleUpperCase(word);
				wordsArr[wordsArr.indexOf(word)] = repl;
			}
		}
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
