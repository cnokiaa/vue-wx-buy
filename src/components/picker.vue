<template>
	<div class="picker">
		<div class="picker-header">
          <a href="javascript:;" class="picker-btn" @click.self="cancel">取消</a>
          <span class="picker-title"></span>
          <a href="javascript:;" class="picker-btn" @click.stop="change">确定</a>
        </div>
      <div class="picker-content" id="picker">            
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li v-if="!t_status" v-for="item in t_items" :data-id="item[t_keyid||'id']">{{item[t_value||'title']||''}}</li> 
          <li v-if="!!t_status" :class="{loading:t_status==1}"><i></i>{{t_statusText}}</li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div class="picker-mask"></div>
        <div class="picker-indicator"></div>
      </div>
	</div>
</template>

<script type="es6">
  const IScroll=require('../assets/libs/iscroll-lite.js');
  export default{
    name:'picker',
    data(){
      return {
        test:'x',
        items:[],
        status:-1,     //0:数据正常加载完成,1:正在请求数据,2:加载失败;
        keyid:'',
        value:'',
        visible:true
      }
    },
    props:{
      dataItems:{type:Array},
      s:{default:-1},
      v:{default:'title'},
      k:{default:'id'},
      item:{}
    },
    updated(){
      this.iscroll.refresh();
      let item=this.item||this.it;
      if(item){
        this.select(item);
      }else{
        this.iscroll.scrollTo(0,0);
      }
    },
    computed:{
      t_statusText(){
        let s=['','数据正在加载中...','[数据加载失败]'];
        let st= s[this.s==-1?this.status:this.s];
        return st;
      },
      t_status(){
        return this.s==-1?this.status:this.s;
      },
      t_items(){
        if(!this.items.length){
          let obj={};
          obj[this.t_value]='[无数据]';
          this.items=(this.dataItems && this.dataItems.length)?this.dataItems:[obj];
        }
        return this.items;
      },
      t_keyid(){
        return this.keyid||this.k;
      },
      t_value(){
        return this.value||this.v;
      }
    },
    mounted(){
      let me=this;
      // this.iscroll=new IScroll(document.querySelector('#picker'),{preventDefault: false});
      this.iscroll=new IScroll(document.querySelector('#picker'),{click:true,deceleration:0.001});
      this.iscroll.on('scrollEnd',function(){
        me.fixScroll();
      });
    },
    addItems(){
      //this.items
    },
    methods:{
      //外部调用
      select(item){
        let id=typeof item=='object'?item[this.keyid]:item;
        let isc=this.iscroll;
        let hli=isc.scrollerHeight/(this.items.length+6);
        // let idx=this.items.indexOf(item);
        let idx=this.items.find(item=>item[this.keyid]==id);
        if(idx){
          let y=(idx+3)*hli;
          isc.scrollTo(0,y,100);
        }else{
          isc.scrollTo(0,0);
        }
      },
      fixScroll(){
        let isc=this.iscroll;
        let hli=isc.scrollerHeight/(this.items.length+6);
        let y=-isc.y;
        let dy=y % hli;
        dy=dy>hli/2?dy-hli:dy;
        if(!dy)return false;
        isc.scrollBy(0,dy,100);
      },
      change(){
        let item=this.getValue();
        if(this.t_status!==0 || item[this.t_value]===undefined)return false;
        console.log(item[this.t_value]);
        this.$emit('change',item);
      },
      cancel(){
        this.$emit('cancel');
      },
      getValue(){
        let isc=this.iscroll;
        let hli=isc.scrollerHeight/(this.items.length+6);
        let y=-isc.y;
        let dy=y % hli;
        dy=dy>hli/2?dy-hli:dy;
        let idx=(y-dy)/hli;
        return this.items[idx];
      },
    }
  }
</script>

<style scoped>
	.picker {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 11;
  }
  .picker-content {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 21em;
    overflow: hidden;
    background-color: #eee;
  }
  .picker-header {
    position: absolute;
    width: 100%;
	  bottom:21em;
    display: flex;
    line-height: 3.5em;
    background-color: #fbf9fe;    
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
    z-index: 4;
  }
  .picker-btn {
    display: block;
    width:7em;
    text-align: center;
    color: #586C94;
  }
  .picker-title{
    flex:1;
    display: block;
  }
  .picker-mask {
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    margin: 0 auto;
    z-index: 3;
    background-image: linear-gradient(180deg,rgba(255, 255, 255, 0.95),rgba(255, 255, 255, 0.6)),linear-gradient(0deg,rgba(255, 255, 255, 0.95),rgba(255, 255, 255, 0.6));
    background-position: top,bottom;
    background-size: 100% 9em;
    background-repeat: no-repeat;
  }
  .picker-indicator {
    width: 100%;
    height: 3em;
    position: absolute;
    left: 0;
    top: 9em;
    z-index: 3;
    border: 1px solid #ddd;
    border-width: 1px 0;
  }
  .picker ul {
    position: absolute;
    left: 0;
    width: 100%;
  }
  .picker li {
    color: #666;
    line-height: 3em;
    height: 3em;
    text-align: center;
    -webkit-overflow-scrolling: touch;
  }
  .picker li.nodata{
    pointer-events: none; 
  }
  .picker li:active{
    opacity: .8
  }
  .picker li.loading i{
    display: inline-block;
    width:.5rem;
    height:.5rem;    
    margin: 0 .2rem;
    vertical-align: middle;
    background: url(../assets/images/circle.gif); 
    background-size: 100%;
  }
</style>

