# 1.安装micro-plugin插件

[项目主页](https://github.com/V2233/micro-plugin)

### 安装项目(你也可以按照项目主页使用yarn安装)

首先下载源码。,然后安装所需依赖。

```bash
git clone --depth=1 https://github.com/V2233/micro-plugin.git ./plugins/micro-plugin
pnpm i --filter ./plugins/micro-plugin
```
然后打开云崽，在开机提示中找到回环地址打开![Screenshot_2024_1101_211446.png](1)

### 往云崽上传文件
点击开发管理>文件，导航到所需目录，然后点击上传，上传所需文件即可。

*以后你可以在小微插件中测试一些简单的代码，不必重复构造插件的类，同时小微插件也支持定时发送*

# 2.云崽插件的基本回复语法
e变量是所有插件自动配置的全局变量，表示用户触发特定的关键词时的消息的对象
使用e对象的reply方法就可以在用户触发关键词后发送消息
reply方法有三个参数，第一个参数是用户所发的消息，第二个是一个可选参数，是一个布尔值，表示回复时是否需要at用户，第三个参数则是关于此消息的其他描述，例如是否要引用用户所发消息，是否要在特定时间内撤回此消息
示例
```javascript
// 引用回复
e.reply("测试回复", true);
// at回复
e.reply("测试回复", false, { at: true });
// 引用并at回复
e.reply("测试回复", true, { at: true });
// 回复消息后等待5s撤回消息
e.reply("测试回复", false, { recallMsg: 5 });
// 引用回复消息后等待5s撤回消息
e.reply("测试回复", true, { recallMsg: 5 });
// 引用并at回复后等待5s撤回消息
e.reply("测试回复", true, { at: true, recallMsg: 5 });
```
你也可以构造segment消息元素来发送其他复杂的消息

at成员事例
```javascript
// at特定成员
e.reply([segment.at(QQ号)), "测试at"]);
// at全体成员
e.reply([segment.at("all"), "测试at"]);
```

发送表情和图片
```javascript
// 发送特定表情
e.reply([segment.face(表情序号), "测试表情"])
// 发送图片
e.reply([segment.image(图片地址"), "测试图片"])
// 同时也支持base64发送
```

# 3.云崽插件的基本模板
```javascript
export class makeForwardMsg extends plugin {  //makeForwardMsg是插件你所构造类的名称，最好用你要执行操作的英文名，用小驼峰命名法
    constructor() {
        super({
            name: '转发', // 插件名称
            dsc: '转发',  // 插件描述
            event: 'message',  // 监听事件
            priority: 6,   // 插件优先度，数字越小优先度越高，可以为-1
            rule: [
                {
                    reg: '^q-消息示例$',  // 正则表达式
                    fnc: 'frwardmsg'  // 执行方法
                }
            ]
        })

    }

    // 执行方法
    async frwardmsg(e) {  //async,await表示异步执行
        await replyz("这是一个测试消息", true);  //await操作必须在有azync关键字的函数中执行

        // 停止循环
        return true
        /**
         * 这里返回的不同则会执行不同的结果
         * return true 则停止向下循环
         * 
         * return false 不停止循环，直接向下循环
         * 举一个简单的例子：比如比如我有两个测试回复插件，同样的正则，不同的优先度，当我将优先度高的插件设置 return false 的时候，则会轮流触发两个插件。
         */
    }
}
```

# 4.消息转发操作
```javascript
// 收集需要转发的消息，存入数组之内，数组内一个元素为一条消息
const forward = [
  "这是消息1",
  segment.face(104),  // 表情
  segment.image("./qin.jpg")  // 图片
];

// 如在数组外部有消息需要传入
forward.push("这是消息4");
forward.push(segment.image("https://www.baidu.com/img/flexible/logo/plus_logo_web_2.png"));

// 制作转发消息,你只需要更改 forward 和转发描述，其他无需更改
const msg = await common.makeForwardMsg(e, forward, '转发描述');

// 制作完成，回复消息
await this.reply(msg);
```

*<strong amend>一个示例e对象格式化后的内容</strong>*

3308237120是发送消息的号,341506415是机器人号
```javascript
e = {
    "post_type": "message",
    "message_id": "CoCKM8UvsUAAAVXMShUyQGcl7gwB",
    "user_id": 3308237120,
    "time": 1730539020,
    "seq": 87500,
    "rand": 1242903104,
    "font": "宋体",
    "message": [
        {
            "type": "text",
            "text": "#测试"
        }
    ],
    "raw_message": "#测试",
    "message_type": "group",
    "sender": {
        "user_id": 3308237120,
        "nickname": "马克西姆的夜莺",
        "sub_id": 537247779,
        "card": "马克西姆的夜莺",
        "sex": "unknown",
        "age": 0,
        "area": "新余",
        "level": 1,
        "role": "owner",
        "title": ""
    },
    "group_id": 176196147,
    "group_name": "chatgroup",
    "block": false,
    "sub_type": "normal",
    "anonymous": null,
    "atme": false,
    "atall": false,
    "group": {

    },
    "member": {
        "sendFile": "(file, name) => i.sendMsg(segment.file(file, name))"
    },
    "self_id": 341506415,
    "adapter_id": "QQ",
    "adapter_name": "ICQQ",
    "msg": "#测试",
    "logText": "\u001b[36m[chatgroup(176196147), 马克西姆的夜莺(3308237120)]\u001b[39m\u001b[31m[#测试]\u001b[39m",
    "isGroup": true,
    "isMaster": true,
    "runtime": {
        "e": {
            "post_type": "message",
            "message_id": "CoCKM8UvsUAAAVXMShUyQGcl7gwB",
            "user_id": 3308237120,
            "time": 1730539020,
            "seq": 87500,
            "rand": 1242903104,
            "font": "宋体",
            "message": [
                {
                    "type": "text",
                    "text": "#测试"
                }
            ],
            "raw_message": "#测试",
            "message_type": "group",
            "sender": {
                "user_id": 3308237120,
                "nickname": "马克西姆的夜莺",
                "sub_id": 537247779,
                "card": "马克西姆的夜莺",
                "sex": "unknown",
                "age": 0,
                "area": "新余",
                "level": 1,
                "role": "owner",
                "title": ""
            },
            "group_id": 176196147,
            "group_name": "chatgroup",
            "block": false,
            "sub_type": "normal",
            "anonymous": null,
            "atme": false,
            "atall": false,
            "group": {

            },
            "member": {
                "sendFile": "(file, name) => i.sendMsg(segment.file(file, name))"
            },
            "self_id": 341506415,
            "adapter_id": "QQ",
            "adapter_name": "ICQQ",
            "msg": "#测试",
            "logText": "\u001b[36m[chatgroup(176196147), 马克西姆的夜莺(3308237120)]\u001b[39m\u001b[31m[#测试]\u001b[39m",
            "isGroup": true,
            "isMaster": true,
            "runtime": "[Circular [object Object]]",
            "user": {
                "_uuid": "user:3308237120",
                "qq": 3308237120,
                "db": {
                    "games": {
                        "gs": {
                            "uid": "",
                            "data": {

                            }
                        },
                        "sr": {
                            "uid": "",
                            "data": {

                            }
                        },
                        "zzz": {
                            "uid": "",
                            "data": {

                            }
                        }
                    },
                    "id": "3308237120",
                    "type": "qq",
                    "name": null,
                    "face": null,
                    "ltuids": "",
                    "data": null,
                    "createdAt": "2024-10-18T14:29:48.644Z",
                    "updatedAt": "2024-10-18T14:29:48.644Z"
                },
                "mysUsers": {

                },
                "_games": {
                    "gs": {
                        "uid": "",
                        "data": {

                        }
                    },
                    "sr": {
                        "uid": "",
                        "data": {

                        }
                    },
                    "zzz": {
                        "uid": "",
                        "data": {

                        }
                    }
                }
            },
            "original_msg": "#测试"
        },
        "_mysInfo": {

        },
        "handler": {
            "has": "has(key) {\n    return !!events[key]\n  }",
            "call": "async call(key, e, args, allHandler = false) {\n    let ret\n    for (let obj of events[key]) {\n      let fn = obj.fn\n      let done = true\n      let reject = (msg = '') => {\n        if (msg) {\n          logger.mark(`[Handler][Reject]: [${obj.ns}][${key}] ${msg}`)\n        }\n        done = false\n      }\n      ret = await fn.call(obj.self, e, args, reject)\n      if (done && !allHandler) {\n        logger.mark(`[Handler][Done]: [${obj.ns}][${key}]`)\n        return ret\n      }\n    }\n    return ret\n  }",
            "callAll": "async callAll(key, e, args) {\n    // 暂时屏蔽调用\n    // return Handler.call(key, e, args, true)\n  }"
        }
    },
    "user": {
        "_uuid": "user:3308237120",
        "qq": 3308237120,
        "db": {
            "games": {
                "gs": {
                    "uid": "",
                    "data": {

                    }
                },
                "sr": {
                    "uid": "",
                    "data": {

                    }
                },
                "zzz": {
                    "uid": "",
                    "data": {

                    }
                }
            },
            "id": "3308237120",
            "type": "qq",
            "name": null,
            "face": null,
            "ltuids": "",
            "data": null,
            "createdAt": "2024-10-18T14:29:48.644Z",
            "updatedAt": "2024-10-18T14:29:48.644Z"
        },
        "mysUsers": {

        },
        "_games": {
            "gs": {
                "uid": "",
                "data": {

                }
            },
            "sr": {
                "uid": "",
                "data": {

                }
            },
            "zzz": {
                "uid": "",
                "data": {

                }
            }
        }
    },
    "original_msg": "#测试"
}
//reply方法貌似不能直接回复数值
```

# 5.消息的撤回与监听
### 消息撤回
知道了e对象的大概结构，消息撤回的思路就很清晰了
你只要找到你要撤回消息的唯一标识符message_id，再执行撤回操作
如果是要撤回用户触发的消息可以使用recall()方法
```javascript
export class TextMsg extends plugin {
    constructor() {
        super({
            name: '简单违禁词触发撤回', 
            dsc: '这是一个基础的插件示例',  
            event: 'message',
            priority: -1,
            rule: [
                {
                    reg: '.*cnm.*',   
                    fnc: 'test'
                }
            ]
        })
    }

    // 执行方法
    async test(e) {
        e.recall()
        return true
    }
}
```
但是如果你要定向撤回消息，你就要使用更复杂的方法
```javascript
e.group.recallMsg(msg_id)  // 群聊撤回
e.friend.recallMsg(msg_id) // 好友撤回
```
因此我们就有
```javascript
async test(e) {
    //需要加上await等待返回
    const res = await e.reply("要撤回的消息")

    //获取消息的唯一标识符
    const msg_id = res.message_id

    //加上 await 等待消息发送完毕
    await e.reply("正在撤回消息")

    //判断当前场景
    if (e.isGroup) {
      //群聊场景
      await e.group.recallMsg(msg_id)
    } else {
      //好友场景
      await e.friend.recallMsg(msg_id)
    }
    return true
}
```

### 消息监听
这是云崽自带的复读插件，观察代码思考通过哪些代码监听消息
```javascript
export class example2 extends plugin {
    constructor() {
        super({
            name: '复读',
            dsc: '复读用户发送的内容，然后撤回',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^#复读$',
                    fnc: 'repeat'
                }
            ]
        })
    }

    async repeat(e) {
        this.setContext('doRep')
        e.reply('请发送要复读的内容', false, { at: true })
    }

    doRep(e) {
        this.finish('doRep')
        e.reply(this.e.message, false, { recallMsg: 5 })
    }
}
```
如果心中有疑问，可以观察我写的一个问答插件示例
[随机问答插件](https://github.com/GitHubHTMLCSSJS/trss-plugin-doc/blob/main/随机问答插件.js)

# 6.调用API
你可以使用axios或者node-fetch库来使用网络请求调用API，可以查看我上面的随机问答插件，想要知道更多信息，可以查看上面两个库的官方文档
这是上面问答插件调用API[https://api.tangdouz.com/a/dt.php?f=1](https://api.tangdouz.com/a/dt.php?f=1)的结果（示例）
```json
{
    "question": "《中华人民共和国国民经济和社会发展第十四个五年规划和2035年远景目标纲要》指出，要完善市场化多元化生态补偿，鼓励各类社会资本参与 。",
    "sele": "\\rA:自然资源调查\\rB:生态保护修复",
    "answer": "B"
}
```
可以先看上面的随机问答插件再尝试不看示例代码复刻功能（\\r要转化为\n）
