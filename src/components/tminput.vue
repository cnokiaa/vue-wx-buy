<template>
<input :type="type" :placeholder="placeholder" :value="c_value" :maxlength="maxlength" @input="updateValue($event.target.value)" />
</template>

<script type="es6">
	import {filters} from '../utils/utils';
	export default{
		data(){
			return {
				model:'',
				tuomin:true,
				keytime:0
			}
		},
		props:{
			type:{default:'text'},
			placeholder:{default:''},
			value:{default:''},
			maxlength:{default:''},
			tm:{default:''},
		},
		computed:{
			c_value(){
				let value=this.model||this.value;
				let v=this.tuomin?filters[this.tm](value):value;
				return v;
			}
		},
		watch:{
			value(){
				let t=Date.now()-this.keytime;
				console.log(t);
				if(t>300){
					this.tuomin=true;
				}
				this.model=this.value;
			}
		},
		methods: {
		    updateValue: function (value){
		    	this.keytime=Date.now();
		    	setTimeout(()=>{
		    		this.tuomin=false;
		    	},0);
		    	this.model=value;
		    	this.$emit('input',value);
		    }
		}
	}
</script>