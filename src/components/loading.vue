<template>
	<div v-show="visible" class="loading">
		<div class="loading-con"></div>
	</div>
</template>

<style scoped>
	.hide{
		display: none;
	}
	.loading{
		position: fixed;
		top:0;
		left:0;
		width:100%;
		height: 100%;
		background-color: rgba(0,0,0,.6);
		z-index: 1000;
	}
	.loading-con {
		width: 2rem;
		height: 2rem; 
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		background: url(../assets/images/loading.png) 0 0 /100% 100% no-repeat;
		animation: spinner-anime 1s steps(8) infinite;
	}
	@keyframes spinner-anime {
    to {
        transform: rotate(1turn)
    }
	}
</style>

<script type="es6">
	export default{
		name:'page-loading',
		data(){
			return {
				visible:false
			}
		},
		methods:{
			show(){
				this.visible=true;
			},
			hide(){
				this.visible=false;
			}
		}
	}
</script>