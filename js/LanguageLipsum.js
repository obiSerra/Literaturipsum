//pattern frase
//var pattern = /[A-Z]{1}[\w\s'`;,<>:"')]*/g;

function LanguageLipsum(){
	this.textMapping = {
		'italiano' : 'la-divina-commedia.txt'
	};
	this.contents = {};

	this.readTextFile = function(lang){
		var file = this.textMapping[lang];
		var self = this;
		var allText = '';
		var rawFile = new XMLHttpRequest();
			rawFile.open("GET", file, true);
		rawFile.onreadystatechange = function () {
			if(rawFile.readyState === 4) {
				if(rawFile.status === 200 || rawFile.status === 0){
					allText = rawFile.responseText;
					self.contents[lang] = allText;
				}
			}
		};
		rawFile.send(null);
	};
	this.init();
}

LanguageLipsum.prototype.init = function() {
	for(var i in this.textMapping){
		this.readTextFile(i);
	}
};
LanguageLipsum.prototype.generateP = function(language,pNumber) {
	var texts;
	if(typeof this.contents[language] === 'undefined'){
		texts = '';
	} else {
		var pattern = /[A-Z]{1}[\w\s'`;,<>:"')]*/g;
		var text = this.contents[language];
		//console.log(text);
		texts = text.match(pattern);
	}
	var ch;
	if(texts.length >= pNumber){
		ch = Math.floor(Math.random()*(texts.length-pNumber));
	}
	var resp = '';
	for(var i=ch;i<ch+pNumber;i++){
		resp += texts[i]+"\n\r";
	}
	return resp;
};