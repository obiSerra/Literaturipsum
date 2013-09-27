function readTextFile(file,callback){
	var allText = '';
	var rawFile = new XMLHttpRequest();
		rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function () {
		if(rawFile.readyState === 4) {
			if(rawFile.status === 200 || rawFile.status === 0){
				allText = rawFile.responseText;
				callback(allText);
			}
		}
	};
	rawFile.send(null);
}

var LanguageLipsum = function(){
	this.textMapping = {
		'italiano' : 'la-divina-commedia.txt'
	};
	this.contents = {};

	this.prepareContent = function(language){
		console.log(this);
		console.log(this.contents);
		if(typeof this.contents[language] === 'undefined'){
			return '';
		} else {
			var pattern = /[A-Z]{1}[\w\s'`;,<>:"')]*/g;
			var text = this.contents[language];
			//console.log(text);
			return text.match(pattern);
		}
	};

	this.setContent = function(content){
		this.contents['pippo'] = content;
	};

	for(var i in this.textMapping){
		readTextFile(this.textMapping[i],self.setContent);
	}

	
};

LanguageLipsum.prototype.generateWords = function(language, wordsNum) {
	var texts = this.prepareContent(language);
	//console.log(texts);
//	var res = text(pattern)


};