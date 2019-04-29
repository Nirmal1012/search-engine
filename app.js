const express = require('express');
const app = express();
const path = require('path');

datas = [
	{
		id: 1,
		title: 'How to cook ??',
		keywords: ['cook', 'food', 'lifestyle'],
	},
	{
		id: 2,
		title: 'How to node js with react ?',
		keywords: ['node', 'react', 'learn', 'built', 'knowledge', 'program', 'javascript', 'website'],
	},
	{
		id: 3,
		title: 'Fight for right',
		keywords: ['fight', 'right', 'freedom', 'justice', 'rights', 'power'],
	},
	{
		id: 4,
		title: 'How to apply for Bsc Csit ??',
		keywords: ['bsc', 'csit', 'learn', 'education', 'study'],
	},
	{
		id: 5,
		title: 'How to read japanese ?',
		keywords: ['read', 'learn', 'study', 'travel', 'language', 'japan'],
	},
	{
		id: 6,
		title: 'How to get driving license ?',
		keywords: ['bike', 'car', 'bus', 'drive', 'ride', 'license']
	},
	{
		id: 7,
		title: 'How to order a pizza ??',
		keywords: ['pizza', 'order', 'food', 'phone', 'contact']
	},
	{
		id: 8,
		title: 'How to plant a tree ???',
		keywords: ['tree', 'plant', 'green', 'environment']
	},
	{
		id: 9,
		title: 'How to study for exam ?',
		keywords: ['study', 'exam', 'learn', 'final', 'prepare']
	},
	{
		id: 10,
		title: 'How to cook fish ?',
		keywords: ['fish', 'food', 'sea']
	}
];


app.get('/search', (req, res) => {
	res.sendFile(path.join(__dirname, 'html/index.html'));
});


app.get('/result', (req, res) => {
	let results = [];
	let results_count = [];
	let sorted_results = [];
	
	//gets all the words used by the user in search and stores it in an array
	let words = req.query.search.split(' ');

	// removing unnecessary words
	for(let i = 0; i < words.length; i ++) {
		switch(words[i].charAt(0)) {
			case '`':
				words.splice(i, 1);
				break;
			case '!':
				words.splice(i, 1);
				break;
			case ',':
				words.splice(i, 1);
				break;
			case '.':
				words.splice(i, 1);
				break;
			case '/':
				words.splice(i, 1);
				break;
			case '<':
				words.splice(i, 1);
				break;
			case '>':
				words.splice(i, 1);
				break;
			case '?':
				words.splice(i, 1);
				break;
		}
	}

	for(let word of words) {
		word = word.toLowerCase();
	}

	// removing most used words
	for(let i = 0; i < words.length; i ++) {
		switch(words[i]) {
			case 'the':
				words.splice(i, 1);
				break;
			case 'of':
				words.splice(i, 1);
				break;
			case 'and':
				words.splice(i, 1);
				break;
			case 'a':
				words.splice(i, 1);
				break;
			case 'to':
				words.splice(i, 1);
				break;
		}
	}

	// searching for the keywords and increases its count
	for(let data of datas) {
		data.count = 0;
		for(let key of data.keywords) {
			for(let word of words) {
				if(word.includes(key)) {
					if(word == key) {
						data.count ++;
					}
					else {
						data.count += 0.9;
					}
				}
			}
		}
		if(data.count > 0) {
			results.push(data);
			results_count.push(data.count);
		}
	}

	results_count.sort();
	results_count.reverse();
	
// sorting the results
	for(let i = 0; i < results_count.length; i ++) {
		for(let j = 0; j < results.length; j ++) {
			if(results_count[i] == results[j].count) {
				sorted_results.push({id: results[j].id, title: results[j].title, count: results[j].count});
				results.splice(j, 1);
				break;
			}
		}
	}

	if(sorted_results.length == 0) {
		res.send('No articles found');
	}
	else {
		res.send(sorted_results);
	}

});

app.listen(3000);
