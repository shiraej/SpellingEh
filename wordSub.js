/*meat and potatoes of the extension... handles the search through all text nodes, matching to words
 in the dictionary and handles common variations like a symbol or an "s" at the end of the word*/

//icon: By Vincent Le Moign, CC BY 4.0, https://commons.wikimedia.org/w/index.php?curid=68652390

const handleUpperCase = function(word){
	//if first letter is an upper case, this function will return the word (repl) with altered spelling and case preserved
	let repl = dictionary[word.toLowerCase()];
	if (word[0] == word[0].toUpperCase()){
		repl = repl[0].toUpperCase() + repl.slice(1,repl.length)
	}
	return repl;
}

const makeRepl = function(word, char, ind){
	//handles the logic for making the replacement word (repl) checking for symbols or 's' at the end of the input word
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

const wordSubber = function (textNode, dict = dictionary) {
	//handles the search through all words in an inputted text node
	
	//1. split the body of text into a word array
	let wordsArr = textNode.split(' ');
    let symbChar = /[$-/:-?{-~!"^_`\[\]s]/;
	//2. loop through these words
	for (let word of wordsArr) {
		let lastInd = word.length-1;
		//3. use makeRepl to make the replacement word if it's in the word Dictionary
		let repl = makeRepl(word,symbChar,lastInd);
		if (repl){
			wordsArr[wordsArr.indexOf(word)] = repl;
		}
		else {continue}
	}
	return wordsArr.join(' ');
}

const findandsub = function (nodeParent){
//recursively finds all text nodes in a document and applies the wordSubber function to each.
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
