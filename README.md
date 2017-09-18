# lunbo
轮播组件

### 用法
轮播图的大致几个组成有：
 - 组成轮播图片的ul和li（类名是 slider-ul 和 slider-li）
 - 向左走，向右走的箭头（类名是 slider-btn）
 - 圆点（由ul 和 li 构成， ul的类名是slider-nav）
 
首先需要将slider.js引入，然后在js代码中需传入的配置options是：父节点，展示图片集，展示图片对应的链接，轮播图高度，轮播图宽度，间隔时间
最后new Slider(options)即可得到一个轮播图实例


在做轮播组件时，使用了构造函数+原型的组合模式创造Slider对象的方法，这样的好处是各个Slider实例既可以有自己专有的属性，又可以共享原型链上的方法。

