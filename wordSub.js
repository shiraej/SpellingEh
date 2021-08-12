
import {dictionary} from './wordDict.js';
//loop through a body of text and substitue any words found in the dictionary

const wordSubber = function (bodyoftext, dict = dictionary) {
	//1. split the body of text into a word array
	let wordsArr = bodyoftext.split(' ');
	//2. loop through these words
	for (let word of wordsArr) {
		if (word in dictionary) {
			wordsArr[wordsArr.indexOf(word)] = dictionary[word];
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
