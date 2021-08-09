import {dictionary} from './wordMap.js';
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

const pageHandler = function(){
	let page = document.querySelectorAll("body");
	for (let ele of page) {
		eleText = ele.innerText;
		subEleText = wordSubber(eleText);
		ele.innerText = subEleText;
	}
}
