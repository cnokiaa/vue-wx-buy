<script type="es6">
	import picker from './picker.vue';
	// let province = require("json-loader!../assets/data/province.json");
	const urls={
		province:'common/province',
		city:'common/city?provinceid=',  //230000
		area:'common/area?cityid='  //231200
	}
	export default{
		name:'addr-picker',
		extends:picker,
		data(){
			return {
				province:null,
				city:null,
				area:null,
				status:0,
				keyid:'provinceid',
				value:'provincecn',
				curr:'province'
			}
		},
		props:{
			k:{default: 'provinceid'},
			v:{default:'provincecn'}
		},
		
		created(){
			this.selectItem();
		},
		mounted(){
			this.selected=[];
			this.$on('change',(item)=>{
				this[this.curr]=item;
				if(this.curr=='area'){
					this.$emit('select',{province:this.province,city:this.city,area:this.area});
					// this.$emit('cancel');
					return true;
				}
				this.selectItem(item);
			});
		},
		methods:{
			reset(){
				// this.keyid="provinceid";
				// this.value="provincecn";
			},
			getData(url,id){
				id && (url=url+id);
				let tid=null;
				let opt={params:{selfloading:1}};
				tid=setTimeout(()=>{
					this.status=1;
				},200);
				this.$http.get(url,opt).then(res=>{
					if(!res.data.success)return;
					tid && clearTimeout(tid);
					if(!res.data.success){
						this.status=2;
					}else{
						this.status=0;
						this.items=res.data.data||[]; 
					}
				},res=>{
					tid && clearTimeout(tid);
					this.status=2
				});
			},
			selectItem(item){
				if(!item){
					this.getData(urls.province);
				}else{
					if(item.provinceid){
						this.value='citycn';
						this.keyid='cityid';
						this.curr='city';
						this.getData(urls.city,item.provinceid);
					}else if(item.cityid){
						this.value='areacn';
						this.keyid='areaid';
						this.curr='area';
						this.getData(urls.area,item.cityid);
					}
				}
			},
		}
	}
</script>