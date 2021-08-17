
//loop through a body of text and substitue any words found in the dictionary


const wordSubber = function (bodyoftext, dict = dictionary) {
	//1. split the body of text into a word array
	let wordsArr = bodyoftext.split(' ');
    
	//2. loop through these words
	for (let word of wordsArr) {
		//handle symbol at end of word
		if (/[^\p{L}\d\s]/u.test(word[word.length-1])){
			let nosymb = word.slice(0,word.length-1)
			if (nosymb.toLowerCase() in dictionary) {
				repl = dictionary[nosymb.toLowerCase()];
				for (let i=0;i< nosymb.length;i++){
					if (nosymb[i] == nosymb[i].toUpperCase()) {
						repl = repl.slice(0,i)+repl[i].toUpperCase()+repl.slice(i+1,repl.length);
					}
				}
				repl = repl+word[word.length]
				wordsArr[wordsArr.indexOf(word)] = repl;
			}

		}
		else {
			if (word.toLowerCase() in dictionary) {
				repl = dictionary[word.toLowerCase()];
				for (let i=0;i< word.length;i++){
					if (word[i] == word[i].toUpperCase()) {
						repl = repl.slice(0,i)+repl[i].toUpperCase()+repl.slice(i+1,repl.length);
					}
				}
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
