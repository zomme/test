/********************
 VARIABLE DECLARATION
*********************/
// input variables
var re_here = /{{here}}+/g;
var re_dest = /{{dest}}+/g;
var re_weather = /{{wthr}}+/g;
var re_date = /{{date}}+/g;
var re_context = /{{cnxt}}+/g;
var pttr_today = /divider\.today\.+/g;
var pttr_sometimes = /divider\.sometimes\.+/g;
var pttr_tag = /card\.place\.tag\.+/g;
var pttr_hotplace = /card\.place\.visit\.+/g;
var pttr_here = /.\.here\./i
var pttr_dest = /.\.dest\./i
var here;
var dest;
var weather;
var date;
var context;
var tag = "에서<br>요즘 뜨는 키워드";
var hotplace = "의<br>핫플레이스";
var cards=[];
var jsonData = [];
var text;
var sheetKey = "1_XM3LnagF8UEWKciOR0qyyCrWXvQ4R050x-uK4ywlVk"
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 // some code..
 alert('mobile browser!');
}



/**************
 READ JSON FILE
***************/
localStorage.clear();



localStorage.clear();
var url_parameter = "https://spreadsheets.google.com/pub?key="+sheetKey+"&hl=kr&output=html";
var googleSpreadsheet = new GoogleSpreadsheet();
googleSpreadsheet.url(url_parameter);
googleSpreadsheet.load(function(result) {
	for(i = 0; i < result.data.length; i++){
		jsonData.push(result.data[i]);
		text += result.data[i] + "\n";
	}
	putCards();
});
function putCards(){
	for(i = 0; i < jsonData.length; i++){
		if(re_here.test(jsonData[i])){
			here = jsonData[i].replace("{{here}}", "");
		}
		else if(re_dest.test(jsonData[i])){
			dest = jsonData[i].replace("{{dest}}", "");
		}
		else if(re_weather.test(jsonData[i])){
			weather = jsonData[i].replace("{{wthr}}", "");
		}
		else if(re_date.test(jsonData[i])){
			date = jsonData[i].replace("{{date}}", "");
		}
		else if(re_context.test(jsonData[i])){
			context = jsonData[i].replace("{{cnxt}}", "");
			document.getElementsByClassName('container')[0].classList.add('bg-'+context);
		}
		else{
			var x = document.createElement('IMG');
			//check divider_today
			if(pttr_today.test(jsonData[i])){
				var y = document.createElement('div');
				var txt = document.createElement('p');
				if(pttr_here.test(jsonData[i])){
					txt.innerHTML = date;
				}
				else if(pttr_dest.test(jsonData[i])){
					txt.innerHTML = dest;
				}
				txt.classList.add('text-divider');
				x.setAttribute('src', "src/"+jsonData[i]+weather+".png");
				y.appendChild(x);
				y.appendChild(txt);
				document.getElementsByClassName('container')[0].appendChild(y);
			}
			//check divider_sometimes
			else if(pttr_sometimes.test(jsonData[i])){
				x.setAttribute('src', "src/"+jsonData[i]+"png");
				document.getElementsByClassName('container')[0].appendChild(x);
			}
			//check tag
			else if(pttr_tag.test(jsonData[i])){
				var y = document.createElement('div');
				var txt = document.createElement('p');
				if(pttr_here.test(jsonData[i])){
					txt.innerHTML = here+tag;
				}
				else if(pttr_dest.test(jsonData[i])){
					txt.innerHTML = dest+tag;
				}
				txt.classList.add('text-tag');
				x.setAttribute('src', "src/"+jsonData[i]+"png");
				x.classList.add('card');
				y.appendChild(x);
				y.appendChild(txt);
				document.getElementsByClassName('container')[0].appendChild(y);
			}
			//check place to go
			else if(pttr_hotplace.test(jsonData[i])){
				var y = document.createElement('div');
				var txt = document.createElement('p');
				if(/[ready]/g.test(context)){
					txt.innerHTML = here+hotplace;
				}
				else{
					txt.innerHTML = dest+hotplace;
				}
				txt.classList.add('text-tag');
				x.setAttribute('src', "src/"+jsonData[i]+"png");
				x.classList.add('card');
				y.appendChild(x);
				y.appendChild(txt);
				document.getElementsByClassName('container')[0].appendChild(y);
			}
			else{
				x.setAttribute('src', "src/"+jsonData[i]+"png");
				x.classList.add('card');
				document.getElementsByClassName('container')[0].appendChild(x);
			}
		}
	}
	if(!/[arrived]/i.test(context)){
		var x = document.createElement('img');
		x.classList.add('misc-here');
		x.setAttribute('src', "src/misc_here.png");
		document.getElementsByClassName('filler')[0].appendChild(x);

		var txt = document.createElement('p');
		txt.innerHTML = here;
		txt.classList.add('text-here');
		document.getElementsByClassName('filler')[0].appendChild(txt);

		if(/[ready]/i.test(context)){
			var y = document.createElement('img');
			y.classList.add('misc-weather');
			y.setAttribute('src', "src/misc_weather_"+weather+".png");
			document.getElementsByClassName('filler')[0].appendChild(y);
		}
	}
}
