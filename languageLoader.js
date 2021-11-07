//Original file found : https://gist.github.com/prof3ssorSt3v3/16cf1277e5ecdcc9f424283f0080f52b

let langdata;
let lang;

//apply the language values to the content
document.addEventListener('DOMContentLoaded', () => {
	setLanguageVariableAndReload();
});

async function loadLanguages() {
  const response = await fetch('languages.json');
  const languages = await response.json();
  langdata = languages;	
}

async function applyLangToContent(){
	await loadLanguages()
	//skip the lang value in the HTML tag for this example
	let zones = document.querySelectorAll('html');
	applyStrings(zones);
}

function applyStrings(containers) {
	containers.forEach(container => {
		
		container.querySelectorAll(`[data-key]`).forEach(element => {
			let key = element.getAttribute('data-key');
			if (key) {
				if(langdata.languages[lang].strings[key]){
					element.innerHTML = langdata.languages[lang].strings[key];
				}else {
					element.innerHTML = langdata.languages["fr"].strings[key];
				}
			}
		});
	})
}


function findLocaleLang(){
	let lang = navigator.language; //from browser 
	let locale = Intl.getCanonicalLocales(lang)[0].substr(0, 2);; //from browser validated
	return locale;
}

function setLanguageVariableAndReload(paramLang)
{
	if(paramLang==null){
		const queryString = window.location.search;
		
		const urlParams = new URLSearchParams(queryString);
		
		lang = urlParams.get('lang');
	}else {
		lang = paramLang;
		window.location.href = location.origin + location.pathname+"?lang=" + lang;
	}
	if(lang!=null)
	{
		lang = lang.substr(0, 2);
		
		if(lang!="fr" && lang!="en"){
			lang = "fr";
			window.location.href = location.origin + location.pathname+"?lang=" + lang;
		}
	}
	if(lang==null)
	{
		lang= findLocaleLang();
		if(lang!="fr" && lang!="en"){
			lang = "fr";
		}
		window.location.href = window.location.href+"?lang=" + lang;
	}
	
	applyLangToContent();
	
	let btn_cv = document.getElementById("btn_cv");
	if(btn_cv){
	if(lang=="fr")
	{
			btn_cv.setAttribute("href", "CV_Oscar_Trosseau.pdf");
		}else {
			btn_cv.setAttribute("href", "CV_Oscar_Trosseau_en.pdf");
		}
	}
	
	let btn_fr = document.getElementById("btn_fr");
	let btn_en = document.getElementById("btn_en");
	
	if(lang=="fr"){
		btn_fr.classList.add("active");
		btn_en.classList.remove("active");
	}else {
		btn_en.classList.add("active");
		btn_fr.classList.remove("active");
	}
}

function addLanguageURL(id){
	if(lang==null){ lang="fr";}
	var button = document.getElementById(id);
	btn_href = button.getAttribute("href");
	if(!btn_href.includes("lang")){
		splitedHref = btn_href.split('#');
		if(splitedHref.length>1)
		{ 
			button.setAttribute("href", splitedHref[0] + "?lang=" + lang + "#" + splitedHref[1]);
		}
		else {
			button.setAttribute("href", splitedHref[0] + "?lang=" + lang);
		}
	}

}