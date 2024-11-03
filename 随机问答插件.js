import axios from "axios";  //引入axios库进行网络请求

let ans = "";  //设置答案变量
let onOff = false;  //设置游戏状态
let timeSet,startTime;  //设置计时器相关
const setTime = 60000;  //设置计时时间
//设置插件基本信息
export class AskAns extends plugin {  //设置AskAns类，并继承plugins类的属性和方法（用于QQ消息操作）
  constructor() {
    super({
      name: '随机题目',  //插件名称
      dsc: '简单的题目问答',  //插件描述
      event: 'message',
      priority: 50,  //优先级，数字越小越高（可为-1）
      rule: [  //设置基本消息事件
        {
          /* 对特定消息进行正则匹配 */
          reg: '^q-随机问答$',  /*也可以
          reg: /^q-随机问答$/, */
          /* 执行方法名称 */
          fnc: 'ti'
        }
      ]
    })
  }
//async await关键字用于发送异步请求
  async ti(e){  //e（全局变量，表示用户发送消息）为固定参数
    const resp = await axios.get("https://api.tangdouz.com/a/dt.php?f=1");  //网络请求URL
    const res = resp.data.sele.replace(/\\r/g,"\n");  //将\4转为换行符
    ans = resp.data.answer;  //讲网络请求出的答案存入变量
    const finalRes = "答的出来的都是这个👍🏻" + resp.data.question + "\n\n" + res;  //设置发送消息
    onOff = true  //改变游戏状态
    e.reply(finalRes, true, {at: true});  //发送消息
    startTime = new Date().getTime();  //获取当前时间
    this.setContext(doAns);  //进行消息监听并执行doAns函数
  }
  
  doAns(e) {
    timeSet = setInterval(() => {
      let currentTime = new Date().getTime(); // 获取当前时间的时间戳
      let elapsedTime = currentTime - startTime; // 已过去的时间
      let remainingTime = setTime - elapsedTime;  //剩余时间
      let timeRep = remainingTime/1000;  //转换单位
      if (timeRep == 10){  //当时间还剩10秒时提示
        e.reply("还有" + timeRep + "秒", true, {at: true});
      }
      if (timeRep == 0){  //超时时提示
        e.reply([segment.image("../../失败结算画面.jpg"), "你是这个👎🏿", true, {at: true});
        this.finish("doAns");  //停止监听
        clearInterval(timeSet);  //清除定时器
        return true;
      }
    },100);
    if (onOff){  //判断是否在游戏中
      e = this.e;  //重置消息对象，用于接收用户的答案
      if (e.msg == ans) {  //判断答案是否正确
        e.reply([segment.image("../../胜利结算界面.jpg"), "你是这个👍🏿", true, {at: true});
        ans = "";  //清空答案
        this.finish("doAns");
        return true;
      }else{
        e.reply("答错了，请再想一想", true, {at: true});
      }
    }else{  //若不在游戏状态中，则清除定时器，防止因错误导致而发出消息（可以省略）
      clearInterval(timeSet);
    }
  }
}