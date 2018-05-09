//訂定DOM元素
var list = document.querySelector('.list');
var bmiCheck = document.querySelector('.bmiCheck');
var resetIcon = document.querySelector('.icon');
var data = JSON.parse(localStorage.getItem('listData')) || [];

//設定各組監聽與資料表更新
bmiCheck.addEventListener('click',addData);
list.addEventListener('click',toggleDone);
updateList(data);

//新增列表，並同步執行更新網頁與localStorage
function addData(e){
	e.preventDefault();
	var heightData = document.querySelector('.bmiCM').value;
	var weightData = document.querySelector('.bmiKG').value;
	var bmiData = (weightData/((heightData/100)*(heightData/100))).toFixed(2);
	var result = document.querySelector('.result');
	var today = new Date();
	var inputToday = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDay();
	var personalData = {
		height: heightData,
		weight: weightData,
		bmi: bmiData,
		decide: bmiDecide(),
		today: inputToday,
	};
	//驗證

	//判斷BMI落在哪個區間回傳值
	function bmiDecide(){
		if(bmiData < 18.5){
			return '過輕';
		}else if( 24 > bmiData && 18.5 <= bmiData){
			return '正常';
		}else{
			return '過重';
		}
	};
	//依照BMI改變顏色
	function bmiChangeCheck(){
		var bmiCheck = document.querySelector('.bmiCheck');
		var changeColorBar = document.querySelector('.recordsList');
		bmiCheck.style.lineHeight = "15px";
		bmiCheck.style.backgroundColor = "#424242";
		switch(personalData.decide){
			case '過輕':
				bmiCheck.style.border = '3px solid #31BAF9';
				bmiCheck.style.color = '#31BAF9';
				result.style.color = '#31BAF9';
				break;
			case '正常':
				bmiCheck.style.border = '3px solid #86D73E';
				bmiCheck.style.color = '#86D73E';
				result.style.color = '#86D73E';
				break;
			default:
				bmiCheck.style.border = '3px solid #FF982D';
				bmiCheck.style.color = '#FF982D';
				result.style.color = '#FF982D';
		}
	};
	bmiChangeCheck();
	bmiCheck.innerHTML = '<h3 class="bmiCheckNum">'+personalData.bmi+'</h3><br/><div>BMI</div><div class="icon"></div>'
	result.textContent = personalData.decide;
	data.push(personalData);
	updateList(data);
	localStorage.setItem('listData',JSON.stringify(data));
}

//更新list內容
function updateList(items){
	str = '';
	var len = items.length;
	for (var i=0; i<len; i++){
		str+= '<li class="recordsList"><div class="result">'+ items[i].decide +'</div><div class="resultBMI">BMI<span class="bmi">'+items[i].bmi+'</span></div><div class="resultCM">weight<span class="weight">'+items[i].weight+'kg</span></div><div class="resultKG">height<span class="height">'+items[i].height+'cm</span></div><div class="resultDate">'+items[i].today+'</div><a class="deletData" href="#" data-num="'+i+'">X</a></li>'
	}
	list.innerHTML = str;
}

//刪除list資料
function toggleDone(e){
	e.preventDefault();
	if(e.target.nodeName !== 'A'){return};
	var index = e.target.dataset.index;
	data.splice(index,1);
	localStorage.setItem('listData',JSON.stringify(data));
	updateList(data);
}
