//pattern frase
//var pattern = /[A-Z]{1}[\w\s'`;,<>:"')]*/g;

function LanguageLipsum(callback){
	this.callbacks = {
		'onload' : callback
	};
	this.textMapping = {
		'italiano' : {
			'url' : 'la-divina-commedia.txt',
			'status' : 0
		},
		'english' : {
			'url' : 'the-adventures-of-sherlock-holmes.txt',
			'status' : 0
		}
	};
	this.contents = {};

	this.readTextFile = function(lang,callback){
		var file = this.textMapping[lang].url;
		var self = this;
		var allText = '';
		var rawFile = new XMLHttpRequest();
			rawFile.open("GET", file, true);
		rawFile.onreadystatechange = function () {
			if(rawFile.readyState === 4) {
				if(rawFile.status === 200 || rawFile.status === 0){
					allText = rawFile.responseText;
					self.contents[lang] = allText;
					self.textMapping[lang].status = 1;
					if(typeof self.callbacks.onload !== 'undefined'){
						self.callbacks.onload(self.textMapping[lang]);
					} else {
						console.log('callback undefined');
					}
					//console.log(self.contents);
				}
			}
		};
		rawFile.send(null);
	};

	this.getContent = function(language){
		var text;
		if(typeof this.contents[language] === 'undefined'){
			text = '';
		} else {
			text = this.contents[language];
		}
		return text;
	}

	this.parseContent = function(text,pattern) {
		var texts = text.split(pattern);
		return texts;
	}

	this.generate = function(type,language,num){
		switch(type){
			case 'paragraph' :
			default : 
				var pattern = /[\n]{2}/;
			break;
			case 'row' : 
				var pattern = /[\n]{2}/;
			break;

		}
		var txt = this.getContent(language);
		
		var texts = this.parseContent(txt,pattern);
		var ch,
			resp = [];
		if(texts.length >= num){
			ch = Math.floor(Math.random()*(texts.length-num));
			for(var i=ch;i<(ch+num);i++){
				resp.push(texts[i]);
			}

		} else{
			// NON CI SONO ABBASTANZA ELEMENTIIII
		}

		var respStr = resp.join('\n\n');
		respStr = respStr.substring(0,1).toUpperCase()+respStr.substring(1,respStr.length);
		return respStr;
	};

	for(var i in this.textMapping){
		this.readTextFile(i);
	}
}

LanguageLipsum.prototype.getParagraphs = function(language,num){
	var resp = this.generate('paragraph',language,num);
	return resp;
}


LanguageLipsum.prototype.getRows = function(language,num){
	var resp = this.generate('row',language,num);
	return resp;
	
}

LanguageLipsum.prototype.getLanguages = function(){
	return this.textMapping;
}