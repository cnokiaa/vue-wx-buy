<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <div class="modal-header">消息</div>
      <div class="modal-body">
        <div class="modal-message">{{message}}</div>
      </div>
      <div class="modal-footer">
        <a href="javascript:" class="modal-btn" @click="click">确定</a>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  export default {
    props: ['message'],
    data(){
      return {
        visible:true
      }
    },
    methods: {
      click(){
        this.close();
        this.$emit('close');
      },
      close(){
        this.visible=false;
      }
    }
  }
</script>
<style scoped>
.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  background-color: rgba(0,0,0,0.65);  
  overflow: auto;
  -webkit-overflow-scrolling: touch; 
  z-index: 1000;
}
.modal-content {
  position: absolute;
  top: 28.5%;
  left: 50%;
  width: 6.4rem;
  margin-left: -3.2rem;
  border-radius: .14rem;
  height: auto;
  background-color: #fff;
  border-radius: 0.3rem;
  overflow: hidden;
}
.modal-header {
  line-height: 1rem;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
.modal-body {
  max-height: 5rem;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.modal-message {
  padding: .8rem .5rem;
  line-height: 1.4;
  font-weight: bold;
  text-align: center;
  word-break:break-all;
}
.modal-list li {
  border-bottom: 1px solid #ddd;
  padding: .3rem;
}
.modal-footer {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  color: #319aff;
  border-top: 1px solid #ccc;
  text-align: center;
}
.modal-btn {
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  width: auto;
  height: 1rem;
  color: #108ee9;
  text-align: center;
  line-height: 1rem;  
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.modal-btn:last-child {
  border-left: 1px solid #ddd;
}
.modal-btn:active {
  background-color: #ddd;
}
</style>

