const express = require("express");
const app = express();

const q_a = [
    {
        question: "1 + 1 等于多少？",
        sele: ["A. 1", "B. 2", "C. 3", "D. 4"],
        ans: "B"
    },
    {
        question: "地球是围绕哪个天体旋转的？",
        sele: ["A. 月亮", "B. 太阳", "C. 金星", "D. 火星"],
        ans: "B"
    },
    {
        question: "哪个国家是世界上人口最多的国家？",
        sele: ["A. 美国", "B. 印度", "C. 俄罗斯", "D. 中国"],
        ans: "D"
    },
    {
        question: "水的化学式是什么？",
        sele: ["A. H2O2", "B. HO2", "C. H2O", "D. H2"],
        ans: "C"
    },
    {
        question: "《红楼梦》的作者是谁？",
        sele: ["A. 施耐庵", "B. 罗贯中", "C. 曹雪芹", "D. 吴承恩"],
        ans: "C"
    },
    {
        question: "哪种动物是澳大利亚的国宝？",
        sele: ["A. 熊猫", "B. 考拉", "C. 袋鼠", "D. 狮子"],
        ans: "C"
    },
    {
        question: "DNA的双螺旋结构是由哪位科学家发现的？",
        sele: ["A. 爱因斯坦", "B. 牛顿", "C. 沃森和克里克", "D. 霍金"],
        ans: "C"
    },
    {
        question: "太阳系中离太阳最近的行星是哪个？",
        sele: ["A. 金星", "B. 水星", "C. 地球", "D. 火星"],
        ans: "B"
    },
    {
        question: "《蒙娜丽莎》是哪位画家的作品？",
        sele: ["A. 米开朗基罗", "B. 达芬奇", "C. 拉斐尔", "D. 梵高"],
        ans: "B"
    },
    {
        question: "哪种元素是地壳中含量最多的元素？",
        sele: ["A. 铁", "B. 硅", "C. 氧", "D. 铝"],
        ans: "C"
    },
    {
        question: "人类历史上第一次登月是在哪一年？",
        sele: ["A. 1959年", "B. 1961年", "C. 1967年", "D. 1969年"],
        ans: "D"
    },
    {
        question: "哪种动物是海洋中的最大生物？",
        sele: ["A. 蓝鲸", "B. 大白鲨", "C. 海龟", "D. 章鱼"],
        ans: "A"
    },
    {
        question: "《百年孤独》是哪位作家的作品？",
        sele: ["A. 加西亚·马尔克斯", "B. 巴尔加斯·略萨", "C. 伊莎贝尔·阿连德", "D. 胡利奥·科塔萨尔"],
        ans: "A"
    },
    {
        question: "哪种乐器是交响乐团中常见的弦乐器？",
        sele: ["A. 小提琴", "B. 萨克斯", "C. 吉他", "D. 钢琴"],
        ans: "A"
    },
    {
        question: "世界上最高的山峰是哪一座？",
        sele: ["A. 乔戈里峰", "B. 干城章嘉峰", "C. 珠穆朗玛峰", "D. 洛子峰"],
        ans: "C"
    }
]

app.use(express.json())
app.get("/",(req,res) => 
  const i = Math.floor(Math.random() * 15) + 1
  res.send(q_a[i])
});
app.listen(8048,() => {
  console.log("http://localhost:8048")
});