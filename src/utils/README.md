#工具说明
---
###filter.js
模板过滤器列表

###funs.js 
此文件在Vue原型中插入实用功能
验证，存储，弹窗等

###resource.js 
资源vue-resource基本配置 如baseURI 和拦截器
其中拦截器说明如下
- selfloading：如果params参数中带入此参数，并不为js非false值，则不自动显示加载动画。（如有更合适的办法后续优化）

###utils.js 
一些常用的功能，其中一个filter 将提供给filter.js 作依赖，也可单独使用。

###valids.js 
主要将作为funs.js 下的 validate 方法的依赖。
以下是funs.js 中关于 validate的代码,并非最新
```
validate(context,con='datas',fun){
    let data=typeof con==='object'?con:context.$data[con];
    let valids=context.valids||context;
    for(let valid in valids){
        let result=validate(data[valid],valids[valid]);
        if(!result.pass){
            (typeof context.toast=='function') && context.toast(result.msg);
            fun && fun(result);
            return false;
        }
    }
    fun && fun(result);
    return true;
}
```
###参数说明
1. `context`:this或验证配置，当为this时，后面的均可省略
2. `con`:验证的数据 可为字符串或对象，字符串表示 this.$data[con], 对象就表示验证当前对象中的字段
3. `fun`:回调函数，返回result:{pass:Boolean,msg:String},一个捷径是把fun写成 this,由于当用到第三个参数时大部分情况表明前面两个参数没有component的上下文，所以在这里把this传进去，以便执行toast等操作。

###说明
data(){
	datas:{}
} 
datas中加入使用举例类的验证配置，key对应到model的key，value对应到预定义的验证方法以
及以 rule正则和fun方法

注意：
1. normal中的function,仅有一个参数的传bool值，比如 isNumeric:true,required:true;
2. 有两个参数的传具体的值，比如 minLength:3

###使用举例
```
valids:{
  relname:'realname',
  money:{
	isNumeric:true,
	msg:'此处必须是数字'
  }
  idcard:'idcard',
  // pics:[{
  //   msg:'请上传图片',
  //   fun:function(pics){
  //     if(pics.length<1){
  //       return false;
  //     }
  //     return true;
  //   }
  // },{
  //   msg:'图片不能少于三张',
  //   fun:function(pics){
  //     if(pics.length<3){
  //       return false;
  //     }
  //     return true;
  //   }
  // }],
  pics:{
    length:3,
    msg:'请上传完整三张照片'
  }
}

```

###配置完后如何调用
暂仅支持主动触发
```
~~this.validate(this,opt) &&~~
if(!this.validate(this,opt))return false;
```
传入[1-3]个参数，
第1个参数this主要是当前Component实例，当第2个参数为对象时，也可传入valids配置，但有一定风险，建议别这么用。但对同一数据不同场景作不同验证很有效，而且此时自动toast将失效，所以必须加上第三个参数回调函数接收一个result来处理验证后的处理。

第2个参数opt有两种情况:
- opt为string时（如'datas'），指要验证的数据处于data[string] 这个位置默认值为datas即data.datas 
- opt为object时 仅验证此object的内容;

第3个参数为验证后的回调，在此环境下，当未传入this时处理验证结果和获取验证消息需要用到此参数 举例如下
可接收一个参数 result:{pass:bool,msg:string}

```
let opt={mobile:this.datas.mobile};
this.validate({mobile:'tel'},opt,result=>{
  !this.pass && this.toast(result.msg);
}) &&
```