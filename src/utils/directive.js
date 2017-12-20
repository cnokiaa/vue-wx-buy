import Vue from 'vue';
let loadImg=(src,fun)=>{
	let img=document.createElement('img');
	img.src=src;
	img.onload=function(){
		fun && fun(true);
	}
	img.onerror=function(){
		fun &&fun(false);
	}
}
Vue.directive('place',{
	inserted:(el,binding)=>{
		let size=binding.expression.replace(',','x');
		let placeText='lakala.com';
		if(el.tarName=="IMG"){
			let src=el.src;
			el.dataset['place-src']=src;
			el.src=`holder.js/${size}?text=${placeText}`;
			loadImg(src,success=>{
				el.src=src;
			});
		}
	}
});