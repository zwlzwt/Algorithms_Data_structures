// scheduler with max 

const exampleTaskA = (name) => new Promise(resolve => setTimeout(function() {
  console.log(`Task ${name} Done`);
  resolve()
}, Math.floor(Math.random() * 2000)))

function TaskRunner(concurrency) {
  this.limit = concurrency;
  this.store = [];
  this.active = 0;
}

TaskRunner.prototype.next = function() {
  if (this.store.length) this.runTask(...this.store.shift())
}

TaskRunner.prototype.runTask = function(task, name) {
  this.active++
  console.log(`Scheduling task ${name} current active: ${this.active}`)
  task(name).then(() => {
    this.active--
    console.log(`Task ${name} returned, current active: ${this.active}`)
    this.next()
  })
}
TaskRunner.prototype.push = function(task, name) {
  if (this.active < this.limit) this.runTask(task, name)
  else {
    console.log(`queuing task ${name}`)
    this.store.push([task, name])
  }
}

var task = new TaskRunner(2);
task.push(exampleTaskA, 1)
task.push(exampleTaskA, 2)
task.push(exampleTaskA, 3)
task.push(exampleTaskA, 4)
task.push(exampleTaskA, 5)
task.push(exampleTaskA, 6)
task.push(exampleTaskA, 7)


// subscriber


var shoeObj = {}; // 定义发布者
shoeObj.list = []; // 缓存列表 存放订阅者回调函数

// 增加订阅者
shoeObj.listen = function (key, fn) {
  if (!this.list[key]) {
    // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
    this.list[key] = [];
  }
  this.list[key].push(fn);  // 订阅消息添加到缓存列表
}

// 发布消息
shoeObj.trigger = function () {
  var key = Array.prototype.shift.call(arguments); // 取出消息类型名称
  var fns = this.list[key];  // 取出该消息对应的回调函数的集合

  // 如果没有订阅过该消息的话，则返回
  if (!fns || fns.length === 0) {
    return;
  }
  for (var i = 0, fn; fn = fns[i++];) {
    fn.apply(this, arguments); // arguments 是发布消息时附送的参数
  }
};

// 小红订阅如下消息
shoeObj.listen('red', function (size) {
  console.log("尺码是：" + size);
});

// 小花订阅如下消息
shoeObj.listen('block', function (size) {
  console.log("再次打印尺码是：" + size);
});
shoeObj.trigger("red", 40);
shoeObj.trigger("block", 42);