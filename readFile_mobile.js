/********************
 VARIABLE DECLARATION
*********************/
// input variables
var re_here = /{{here}}+/g;
var re_dest = /{{dest}}+/g;
var re_weather = /{{wthr}}+/g;
var re_date = /{{date}}+/g;
var re_context = /{{cnxt}}+/g;
var re_dpoi = /{{dpoi}}+/g;
var pttr_today = /divider\.today\.+/g;
var pttr_sometimes = /divider\.sometimes\.+/g;
var pttr_tag = /card\.place\.tag\.+/g;
var pttr_hotplace = /card\.place\.visit\.+/g;
var pttr_here = /.\.here\./i;
var pttr_dest = /.\.dest\./i;
var pttr_dest_default = /info\.arrived\.default+/i;
var here;
var dest;
var dpoi;
var weather;
var date;
var context;
var dest_text = "에<br>도착했습니다.";
var tag = "에서<br>요즘 뜨는 키워드";
var hotplace = "의<br>핫플레이스";
var cards=[];
var jsonData = [];
var text;
var sheetKey = "1_XM3LnagF8UEWKciOR0qyyCrWXvQ4R050x-uK4ywlVk"



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
		else if(re_dpoi.test(jsonData[i])){
			dpoi = jsonData[i].replace("{{dpoi}}", "");
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
			//checked arrived card
			if(pttr_dest_default.test(jsonData[i])){
				var y = document.createElement('div');
				var txt = document.createElement('p');
				txt.innerHTML = dpoi+dest_text;
				txt.classList.add('text-tag');
				x.setAttribute('src', "src/"+jsonData[i]+"png");
				x.classList.add('card');
				y.appendChild(x);
				y.appendChild(txt);
				document.getElementsByClassName('container')[0].appendChild(y);
			}
			//check divider_today
			else if(pttr_today.test(jsonData[i])){
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
				if(/ready/.test(context)){
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
	if(!/arrived/.test(context)){
		var x = document.createElement('img');
		x.classList.add('misc-here');
		x.setAttribute('src', "src/misc_here.png");
		document.getElementsByClassName('filler')[0].appendChild(x);

		var txt = document.createElement('p');
		txt.innerHTML = here;
		txt.classList.add('text-here');
		document.getElementsByClassName('filler')[0].appendChild(txt);

		if(/ready/.test(context)){
			var y = document.createElement('img');
			y.classList.add('misc-weather');
			y.setAttribute('src', "src/misc_weather_"+weather+".png");
			document.getElementsByClassName('filler')[0].appendChild(y);
		}
	}
	var z = document.createElement('img');
	z.setAttribute('src', "src/header_"+context+".png");
	z.classList.add('header');
	document.getElementsByClassName('container')[0].appendChild(z);
}
