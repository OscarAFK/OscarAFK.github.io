//Original file found : https://gist.github.com/prof3ssorSt3v3/16cf1277e5ecdcc9f424283f0080f52b

let langdata;

//apply the language values to the content
document.addEventListener('DOMContentLoaded', () => {
	applyLangToContent();
});

async function loadLanguages() {
  const response = await fetch('languages.json');
  const lang = await response.json();
  langdata = lang;	
}

async function applyLangToContent(){
	await loadLanguages()
	//skip the lang value in the HTML tag for this example
	let zones = document.querySelectorAll('html');
	applyStrings(zones);
}

function applyStrings(containers) {
	containers.forEach(container => {
		
		let lang = findLocaleLang();
		
		container.querySelectorAll(`[data-key]`).forEach(element => {
			let key = element.getAttribute('data-key');
			if (key) {
				element.innerHTML = langdata.languages[lang].strings[key];
			}
		});
	})
}


function findLocaleLang(){
	let lang = navigator.language; //from browser 
	let locale = Intl.getCanonicalLocales(lang)[0].substr(0, 2);; //from browser validated
	return locale;
}