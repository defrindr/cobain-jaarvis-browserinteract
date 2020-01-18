window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognation = new SpeechRecognition();
const utter = new SpeechSynthesisUtterance();

let voices;

// const cheerio = require('cheerio');
// const axios = require('axios');


// console.log(axios)

// function speakVoice() {
// 	voices = this.getVoices();
// 	// console.log(voices.map(voices => voices));
// 	// utterance = new SpeechSynthesisUtterance("Hello World");
// 	utter.voice = voices[1];
// 	// speechSynthesis.speak(utterance);
// };

// speechSynthesis.addEventListener('voiceschanged', speakVoice);

// voices.forEach((data) => {
// 	console.log(data.lang)
// })


// recognation.lang = 'en';
recognation.lang = 'id';
recognation.interimResults =  true;

if(window.localStorage.getItem('password_confirm') == null){
	password_confirm = false;
}else {
	password_confirm = true;
}



let perintah = [
		['how are you', `I'm fine`], 
		[`what's your name`, 'My Name is EDITH'],
		[`what your name`, 'My Name is jarvis'],
		[`siapa namamu`, 'My Name is jarvis'],
		['who is jarvis',`I'am is a bot`],
		['who am i','my boss'],
	];

let customWindow = window;

let myPassword ="luwak white kopi";

let p = document.createElement('p');
document.body.appendChild(p);



function matikOperasi(expr){
	let re = /(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/;
	if(re.test(expr)){
		return true;
	}
	return false;
 }








// let textarea = document.getElementById('textarea');
// let lama = "";

recognation.addEventListener('result',res => {
	let transcript = Array.from(res.results)
		.map(result => result[0])
		.map(result => result.transcript)
		.join("");



		if(password_confirm){
			// textarea.innerHTML = lama+'\n'+transcript;

			// console.log(transcript.toLowerCase().includes('love'));

			// if(transcript.toLowerCase().includes('love')){
			// 	transcript = transcript.toLowerCase().replace('love','<3');
			// }
				p.innerHTML = transcript;

			console.log(transcript);
			
			if(res.results[0].isFinal){

				perintah.forEach(dat => {
					if(p.innerHTML.toLowerCase().includes(dat[0])){
						p = document.createElement('p');
						p.innerHTML = dat[1];
						p.style.background = '#F00';
						p.style.color = '#FFF';
						document.body.appendChild(p);		
						utter.text = p.innerHTML;

						speechSynthesis.speak(utter);
					}
				});



				if(p.innerHTML.toLowerCase().includes('lirik') && p.innerHTML.toLowerCase().replace('lirik','') != ''){
							
					$.ajax({
						method:'GET',
						url: "https://www.google.co.id/search?q="+p.innerHTML,
						dataType: 'html'
					}).then(res =>{
						console.log(res);
					})
				  // var options = ;
					// axios.get("https://www.google.co.id/search?q="+p.innerHTML,options).then(res => {
					// 	console.log(res.data);
					// });
					// axios.get("https://www.realtor.com/news/real-estate-news/",{
					// 		headers: {
					// 		  'Access-Control-Allow-Origin': '*',
					// 		  'Access-Control-Allow-Headers': 'Content-type',
					// 		  'X-Content-Type-Options': 'nosniff'
					// 		},
					// 		data:{}
					// 	})
		   //      .then(response => {
		   //          const users = response.data;
		   //          console.log(`GET list users`, users);
		   //      })
		   //      .catch(error => console.error(error));
					// console.log(html);
				}

				if(p.innerHTML.toLowerCase().includes('time now')){
					p = document.createElement('p');
					let uwu= new Date();

					p.innerHTML = uwu;
					p.style.background = '#F00';
					p.style.color = '#FFF';
					document.body.appendChild(p);		
					utter.text = p.innerHTML;

					speechSynthesis.speak(utter);
				}

				if(p.innerHTML.toLowerCase().includes('clear')){
					window.location.reload();
				}

				if(p.innerHTML.toLowerCase().includes('go to bottom')){
					window.scrollTo(0,document.body.scrollHeight);
				}

				if (p.innerHTML.toLowerCase().includes('stop speak')) {
					speechSynthesis.cancel();
				}

				if(matikOperasi(p.innerHTML.toLowerCase().replace(' ',''))){
					let hasil = eval(p.innerHTML.toLowerCase().replace(' ',''));
					
					p = document.createElement('p');
					p.innerHTML = hasil;
					p.style.background = '#F00';
					p.style.color = '#FFF';
					document.body.appendChild(p);		
					utter.text = p.innerHTML;

					speechSynthesis.speak(utter);
				}


				if (p.innerHTML.toLowerCase().includes('open www.')) {
					customWindow = window;
					customWindow = customWindow.open("http://"+p.innerHTML.toLowerCase().replace('open ',''))
				}

				if (p.innerHTML.toLowerCase().includes('search') && p.innerHTML.toLowerCase().replace('search') !== "") {
					customWindow = window;
					customWindow = customWindow.open("https://www.google.co.id/search?q="+p.innerHTML.toLowerCase().replace('search ',''))
				}


				if (p.innerHTML.toLowerCase().includes('youtube')) {
					customWindow = window;
					customWindow = customWindow.open("https://www.youtube.com/results?search_query="+p.innerHTML.toLowerCase().replace('youtube ',''))
				}

				if (p.innerHTML.toLowerCase().includes('tutup jendela')) {
					customWindow.close()
				}


				if (p.innerHTML.toLowerCase().includes('logout')) {
					window.localStorage.removeItem('password_confirm');
					window.location.reload();
				}


				if (p.innerHTML.toLowerCase().includes('katakan') && p.innerHTML.toLowerCase().replace('katakan','') !== "") {
					let kata = p.innerHTML.toLowerCase().replace('katakan ','');
					p = document.createElement('p');

					p.innerHTML = kata;
					p.style.background = '#F00';
					p.style.color = '#FFF';
					document.body.appendChild(p);		
					utter.text = p.innerHTML;

					speechSynthesis.speak(utter);
				}


				// speechSynthesis.start();

				// lama = textarea.innerHTML;
				p = document.createElement('p');
				document.body.appendChild(p);		
			}

			// console.log(transcript);

			// if(transcript == 'I love you'){
			// 	console.log('opo seh ?');
			// }
		}else {
			if(res.results[0].isFinal){
				console.log(transcript);
				if(transcript.toLowerCase().includes(myPassword)){
					password_confirm = true;
					window.localStorage.setItem('password_confirm',true);
					p = document.createElement('p');
					p.innerHTML = "Password confirmation valid. silahkan masukkan perintah ";
					document.body.appendChild(p);
				}else {
					p = document.createElement('p');
					p.innerHTML = "Belum memasukkan password";
					document.body.appendChild(p);
				}
			}
		}


});

recognation.addEventListener('end',recognation.start)

recognation.start();