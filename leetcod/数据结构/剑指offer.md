# 一、二分查找
4 11 53
**剑指 Offer 04. 二维数组中的查找**
应该是双指针解法，不是二分查找方法
```js
var findNumberIn2DArray = function(matrix, target) {
    // 暴力解法
    // for(let i=0; i<matrix.length; i++){
    //     for(let j=0; j<matrix[i].length; j++){
    //         if(matrix[i][j] === target) return true
    //     }
    // }
    // return false
    
    // 双指针
    /**
    思路：从左下角开始，小就向右移动，大就向上移动
     */
    const [m, n] = [matrix.length, matrix[0]?.length]
    if(!m) return false
    let [row, col] = [m-1, 0]
    while(row>=0 && col<=n-1){
        if(matrix[row][col] === target) return true
        else if(matrix[row][col] > target) row--
        else col++
    }
    return false
};
```

**剑指 Offer 11. 旋转数组的最小数字**
```js
var minArray = function(numbers) {
    // 借用Api
    // numbers.sort((a,b) => a-b)
    // return numbers[0]

    // 二分查找
    /**
    思路：计算mid
    1.如果mid>right，则最小值在右侧，left=mid+1
    2.如果mid<right，则最小值在左侧或者mid就是最小值 right = mid
    3.如果mid=right，此时左右不确定，从最右边减1继续计算。right--;
     */
    let [left, right] = [0, numbers.length-1]
    while(left <= right){
        let mid = Math.floor((left+right)/2)
        if(numbers[mid] > numbers[right]) left = mid + 1
        else if(numbers[mid] < numbers[left]) right = mid
        else right--
    }
    return numbers[left]
};
```

**剑指 Offer 53 - I. 在排序数组中查找数字 I**
```js
var search = function(nums, target) {
    // 直接for循环
    let count = 0
    for(let ele of nums){
        if(target === ele) count++
    }
    return count
};
```
* 二分查找
```js
var search = function(nums, target) {
    // 二分法：优化---有点意思
    // 要看清给定的条件，这里已经说明是排序后的数组，所以如果有多个target，它在数组中是连续的
    /**
    思路：
    1.首先，二分查找，找到等于target的中间值
    2.然后，从中间值开始向两侧扩散
    3.标记最左侧和最右侧的位置，然后进行计算
     */
    let [left, right, flag] = [0, nums.length-1, null]
    while(left <= right){
        let mid = Math.floor((left+right)/2)
        let midNum = nums[mid]
        if(midNum > target){
            right = mid - 1
        }else if(midNum < target){
            left = mid + 1
        }else{
            // 找到一个就标记并退出循环
            flag = mid
            break
        }
    }
    // 当退出循环，flag仍为空则无数组中未出现target---注意这里不能写成(!flage)因为0也会转成false
    if(flag === null) return 0
    // 从flag向两侧扩散
    left = right = flag
    while(nums[left-1] === target) left--
    while(nums[right+1] === target) right++
    return right-left+1
};
```

**剑指 Offer 53 - II. 0～n-1中缺失的数字**
🦈直接for循环,但是要排除两个特殊情况,一是第一个值不为0,二是最后一个值缺失
```js
var missingNumber = function(nums) {
    // 直接for循环:排除索引0处不为0的情况和最后一个值确实的情况
    if(nums[0] === 1) return 0
    for(let i=0; i<nums.length; i++){
        if(nums[i] !== i) return i
    }
    return nums.length
};
```
采用二分查找，根据中间值判断缺失数字是在左边还是右边
有序数组 ——> 二分查找
* nums[mid] === mid：左半边完整，缩小范围，开始找右半边
* nums[mid] !== mid：左半边不完整，缩小范围，在左半边找
```js
var missingNumber = function(nums) {
    // 二分查找
    // 有意思,通过判断中间值就知道左边有没有问题
    let [left, right] = [0, nums.length-1]
    while(left <= right){
        let mid = (left+right) >> 1
        if(nums[mid] === mid){ //左边没有问题
            left = mid + 1
        }else{//左边有问题
            right = mid - 1
        }
    }
    return left
};
```

# 二、链表
## 常用方法
- 双指针
- 重点：
  - 移除元素节点：cur.next = cur.next.next;
  - 添加节点：cur.next = newNode;   newNode.next = cur.next.next;
  - 环形链表

剑指 Offer 06. 从尾到头打印链表
方法一：转换成数组
先转成数组，再对数组进行反转
```js
var reversePrint = function(head) {
    const arr = []
    while(head){
        arr.push(head.val)
        head = head.next
    }
    return arr.reverse()
};
```
方法二：先反转链表，再加入到数组返回
```js
var reversePrint = function(head) {
    let [cur, pre] = [head, null]
    while(cur !== null){
        let temp = cur.next
        cur.next = pre;
        pre = cur
        cur = temp
    }
    // 对反转后的链表进行遍历
    const res = []
    while(pre){
        res.push(pre.val)
        pre = pre.next
    }
    return res
};
```
剑指 Offer 18. 删除链表的节点
🦈理解：
设置虚拟头节点newNode，指向head，然后让当前节点curNode为虚拟头节点，该节点仅用于删除节点操作，最后返回的还是newNode⭐
```js
var deleteNode = function(head, val) {
    // 设置虚拟头节点，易于遍历
    let newNode = new ListNode(0)
    newNode.next = head;
    let curNode = newNode;
    while(curNode && curNode.next){
        if(curNode.next.val === val){
            curNode.next = curNode.next.next;
        }else{
            curNode = curNode.next;
        }
    }
    return newNode.next;
};
```
剑指 Offer 24. 反转链表
反转一整条链表
```js
var reverseList = function(head) {
    // 反转链表
    let [cur, pre] = [head, null]
    while(cur){
        // 反转处理
        let temp = cur.next;
        cur.next = pre
        // 理解为更新节点
        pre = cur
        cur = temp
    }
    return pre
};
```
剑指 Offer 35. 复杂链表的复制
🦈创建的新节点，就是所复制的节点，然后我们在这个节点的基础上去复制指针就可以。
思路：
- 第一次遍历，复制节点值，key和val都为链表的值
- 第二次遍历，复制节点关系，包含next指针和random指针
```js
var copyRandomList = function(head) {
    // map映射
    const map = new Map();
    // 第一次遍历
    let curNode = head;
    while(curNode){
        // ???这里为什么加入的是new Node(curNode.val)？？？新节点
        map.set(curNode, new Node(curNode.val));
        curNode = curNode.next;
    }
    // 第二次遍历，复制指针关系
    curNode = head;
    while(curNode){
        map.get(curNode).next = map.get(curNode.next) || null // next指针
        map.get(curNode).random = map.get(curNode.random) || null // random指针
        curNode = curNode.next
    }
    return map.get(head)
};
```
剑指 Offer 36. 二叉搜索树与双向链表
思路：采用了递归中序遍历，就在根节点（中节点）时，进行指针处理就可
```js
var treeToDoublyList = function(root) {
    // 排序的循环双向链表:第一个节点的前驱是最后一个节点，最后一个节点的后继是第一个节点。
    // 不熟
    // 递归中序遍历
    const dfs = cur => {
        if(!cur) return
        dfs(cur.left)
        if(!pre){
            head = cur;
        }else{
            // pre有值，更新指针，双向连接
            pre.right = cur;
            cur.left = pre
        }
        pre = cur
        dfs(cur.right)
    }

    let pre, head;
    if(!root) return;
    dfs(root)
    // 首尾相连---最后跳出循环时，pre为最后一个节点为最右边的
    head.left = pre;
    pre.right = head;
    return head;
};
```
剑指 Offer 52. 两个链表的第一个公共节点 ---》就是链表相交
```js
var getIntersectionNode = function(headA, headB) {
    /**
    思路：两个链表互相遍历  (a+c) + b = (b+c) + a   两链表肯定会相交
    - 若
     */
    let [nodeA, nodeB] = [headA, headB]
    while(nodeA !== nodeB){
        nodeA = nodeA===null ? headB : nodeA.next;
        nodeB = nodeB===null ? headA : nodeB.next;
    }
    return nodeA;
};
```

# 三、集合

**剑指 Offer 50. 第一个只出现一次的字符**
方法一：正常Map集合
思路：
第一次遍历字符串，用Map统计出现的次数
第二次遍历Map，返回第一个次数为1的字符
若遍历Map结束后，还没有找到，则返回" "
```js
var firstUniqChar = function(s) {
    // 思路：遍历字符串，记录字符出现的次数
    const map = new Map()
    let res = ' '
    for(let str of [...s]){
        map.set(str, (map.get(str) || 0) + 1)
    }
    // 再次遍历把第一个出现次数为 1 的输出
    for(let str of s){
        if(map.get(str) === 1){
            res = str
            break;
        }
    }
    return res
};
```

方法二：借用indexOf()方法
```js
var firstUniqChar = function(s) {
    // 借用indexOf()方法，查找元素第一次出现的索引值，没有则返回-1
    for(let i=0; i < s.length; i++){
        // 对遍历到元素，查找第一次出现时的索引值
        let firstInd = s.indexOf(s[i])
        // 从查找到的第一个位置后面再次查找
        let sedInd = s.indexOf(s[i], firstInd+1)
        // 如果后面都没有，则该值就是所要的结果
        if(sedInd === -1) return s[i]
    }
    return ' '
};
```
**剑指 Offer 56 - II. 数组中数字出现的次数 II**
方法一：Map集合
```js
var singleNumber = function(nums) {
    // 用50T的解法就行
    const map = new Map()
    let res;
    for(let num of nums){
        map.set(num, (map.get(num) || 0) + 1)
    }
    for(let num of nums){
        if(map.get(num) === 1) res = num
    }
    return res
};
```
方法二：indexOf()
```js
var singleNumber = function(nums) {
    // 用50T的解法就行
    let res;
    for(let num of nums){
        let firInd = nums.indexOf(num)
        let sedInd = nums.indexOf(num, firInd + 1)
        if(sedInd === -1) res = num
    }
    return res
};
```

**剑指 Offer 56 - I. 数组中数字出现的次数**
方法一：Map集合
```js
var singleNumbers = function(nums) {
    const map = new Map()
    const res = []
    for(let num of nums){
        map.set(num, (map.get(num) || 0) + 1)
    }
    for(let num of nums){
        if(map.get(num) === 1) res.push(num)
    }
    return res
};
```
方法二：indexOF()
```js
var singleNumbers = function(nums) {
    const res = []
    for(let num of nums){
        let firInd = nums.indexOf(num)
        let sedInd = nums.indexOf(num, firInd + 1)
        if(sedInd === -1) res.push(num)
    }
    return res;
};
```

# 四、双指针法
**剑指 Offer 05. 替换空格**
**剑指 Offer 21. 调整数组顺序使奇数位于偶数前面**
🦈双指针：开辟了一个新数组
```js
var exchange = function(nums) {
    // 遍历数组，为奇数的加到数组前面，偶数加到后面
    let [left, right] = [0, nums.length - 1]
    let newNum = []
    for(let i=0; i<nums.length; i++){
        if(nums[i] % 2 !== 0){
            newNum[left] = nums[i]
            left++
        }else{
            newNum[right] = nums[i]
            right--
        }
    }
    return newNum
};
```
飞鸟：⭐采用了位运算，和数组元素交换
左查找到偶，右查找到奇，左右交换
```js
var exchange = function(nums) {
    // 指定左右指针
    // 左指针查找到偶数停止，右指针查找到奇数停止
    // 左右指针交换
    let [left, right] = [0, nums.length - 1]
    while(left < right){
        while(left < right && nums[left] & 1) left++
        while(left < right && !(nums[right] & 1)) right--
        [nums[left], nums[right]] = [nums[right], nums[left]]
    }
    return nums
};
```

**剑指 Offer 22. 链表中倒数第k个节点**
🦈技巧：在对链表倒数第几个节点进行操作时都可以采用快慢双指针
思路：
1. 定义快慢指针，初始都指向链表头部
2. 快指针先走k步
3. 再两指针一起走，直到快指针走到头为止
4. 此时的慢指针指向的就是倒数第k个节点
5. 返回慢指针即可
```js
var getKthFromEnd = function(head, k) {
    // 与T19逻辑一致
    // 快慢双指针
    let newNode = new ListNode(0);
    newNode.next = head;
    let slow = fast = newNode;
    for(let i = 0; i < k; i++){
        fast = fast.next;
    }
    while(fast){
        slow = slow.next;
        fast = fast.next
    }
    return slow
};
```

**剑指 Offer 25. 合并两个排序的链表**
借鉴飞鸟：借鉴飞鸟：定义两个指针，分别遍历两个链表进行值得比较
思路：
1. 创建虚拟头节点，并定义一个指针指向其头部
2. 创建p1，p2两个指针，指向两链表头部，一起遍历
3. 条件判断，p1和p2哪个对应的值小，哪个就连接到答案链表
```js
var mergeTwoLists = function(l1, l2) {
    // 合并链表，向一个链表中加入另一个链表，保持顺序不变
    const newNode = new ListNode(0)
    let p = newNode
    let [p1, p2] = [l1, l2]
    while(p1 && p2){
        if(p1.val < p2.val){
            p.next = p1
            p1 = p1.next
        }else{
            p.next = p2
            p2 = p2.next
        }
        p = p.next
    }
    // 最后，跳出循环是p1 p2有一个为null，其中一个链表的一个节点还未添加到结果
    p.next = p1 ? p1 : p2
    return newNode.next
};
```
**剑指 Offer 57. 和为s的两个数字**
方法一：暴力
```js
var twoSum = function(nums, target) {
    // 暴力
    const res = []
    for(let i=0; i<nums.length; i++){
        for(let j=0; j<nums.length; j++){
            if(target - nums[j] === nums[i]){
                res.push(nums[i])
                res.push(nums[j])
            }
        }
    }
    return res.splice(0,2)
};
```
方法二：Map集合
🦈采用Map集合，先映射再遍历数组，判断target-num是否在Map集合中
```js
var twoSum = function(nums, target) {
    // Set集合
    const res = []
    // 建立映射
    let map = new Map()
    for(let num of nums){
        if(!map.has(num)){
            map.set(num, num)
        }
    }
    // 再次遍历数组，进行判断，
    for(let num of nums){
        if(map.has(target-num)){
            res.push(num)
            res.push(map.get(target-num))
            return res
        }
    }
    return res
};
```

方法三：前后双指针
飞鸟定义前后双指针，根据两值之和与目标值的大小关系判断左右指针的加减
```js
var twoSum = function(nums, target) {
    // ⭐前后双指针
    let [left, right] = [0, nums.length - 1]
    while(left < right){
        sum = nums[left] + nums[right];
        if(sum < target){
            left++;
        }else if(sum > target){
            right--;
        }else{
            return [nums[left], nums[right]]
        }
    }
    return []

};
```

**剑指 Offer 57 - II. 和为s的连续正数序列**
思路：
1. 滑动窗口思路，窗口初始化为[1, 2]，初始sum为3
2. 因为输出的序列至少有2个数，所以若窗口第一个数大于target/2时，就不再继续了
3. 若sum太小，向窗口添加下一个数，更新sum
4. 若sum太大，弹出窗口第一个数，更新sum
5. 若sum===target，则将窗口的数放入res，随后弹出第一个数，继续滑动
```js
var findContinuousSequence = function(target) {
    // 滑动窗口（好题）
    const res = []
    const window = [1, 2]
    let sum = 3
    while(window[0] <= target >> 1){
        if(sum < target){
            // 新增值
            const num = window.at(-1) + 1;
            sum += num
            window.push(num)
        } else if(sum > target){
            sum -= window.shift()
        } else {
            res.push([...window])
            sum -= window.shift()
        }
    }
    return res;
};
```

# 五、栈与队列
**剑指 Offer 09. 用两个栈实现队列**
```js
var CQueue = function() {
    this.inStack = []
    this.outStack = []
};

/** 
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
    this.inStack.push(value)
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
    if(this.inStack.length===0 && this.outStack.length === 0) return -1
    if(!this.outStack.length){
        while(this.inStack.length){
            this.outStack.push(this.inStack.pop())
        }
    }
    return this.outStack.pop()
};
```
**剑指 Offer 30. 包含min函数的栈**
🦈min的时候用了Math.min()函数
```js
//  ...这里说的是栈不是队列了   脑残吗？
var MinStack = function() {
    this.stack = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.push(x)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    return this.stack.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack.at(-1)
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
    return Math.min(...this.stack)
};
```

🐦压栈的时候创建了一个min属性
```js
//  ...这里说的是栈不是队列了   脑残吗？
var MinStack = function() {
    this.stack = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stack.push({
        val:x,
        min:this.stack.length ? Math.min(x, this.min()) : x
    })
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    return this.stack.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack.at(-1).val
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
    return this.stack.at(-1).min
};
```
**剑指 Offer 31. 栈的压入、弹出序列**
思路：
1. 新建另一个栈，index=0，，将pushed数组中的数，依次推入栈
2. 入栈后，while判断popped[index]与新建的栈栈顶元素是否相等
3. 若相等，则弹出栈顶，index++
4. 最后判断栈是否为空
```js
var validateStackSequences = function(pushed, popped) {
    // 只有第一个元素可以比后一个元素小，其余元素都大？×
    // 自己比较难想出来
    /**
    思路：
    创建一个栈，当弹出序列popped与遍历到的压入序列pushed不匹配时，压栈处理，否则弹栈，最后判断栈是否为空
     */
    const stack = []
    let index = 0
    const len = pushed.length;
    for(let i=0; i<len; i++){
        stack.push(pushed[i])
        while(popped[index] !== undefined && popped[index] === stack.at(-1)){
            stack.pop()
            index++
        }
    }
    return !stack.length
};
```

# 六、二叉树
**剑指 Offer II 044. 二叉树每层的最大值**
```js
var largestValues = function(root) {
    // 515原题。。。
    const res = []
    if(!root) return res
    const queueNode = [root]
    while(queueNode.length){
        const len = queueNode.length
        const levelNode = []
        for(let i=0; i<len; i++){
            let node = queueNode.shift()
            levelNode.push(node.val)
            node.left && queueNode.push(node.left)
            node.right && queueNode.push(node.right)
        }
        // 找出每一层的最大值
        let maxVal = Math.max(...levelNode)
        res.push(maxVal)
    }
    return res
};
```
**剑指 Offer 32 - I. 从上到下打印二叉树**
```js
var levelOrder = function(root) {
    // BFS层序遍历
    if(!root) return []
    const res = []
    const queueNode = [root]
    while(queueNode.length){
        let node = queueNode.shift()
        res.push(node.val)
        node.left && queueNode.push(node.left)
        node.right && queueNode.push(node.right)
    }
    return res
};
```
**剑指 Offer 32 - II. 从上到下打印二叉树 II**
```js
var levelOrder = function(root) {
    const res = []
    if(!root) return res
    const queueNode = [root]
    while(queueNode.length){
        const len = queueNode.length
        const levelNode = []
        for(let i=0; i<len; i++){
            let node = queueNode.shift()
            levelNode.push(node.val)
            node.left && queueNode.push(node.left)
            node.right && queueNode.push(node.right)
        }
        res.push(levelNode)
    }
    return res
};
```
**剑指 Offer 32 - III. 从上到下打印二叉树 III**
```js
var levelOrder = function(root) {
    // 思路：统计层数，在加入结果集时，奇数不变，偶数反转
    const res = []
    if(!root) return res
    const queueNode = [root]
    let count = 0
    while(queueNode.length){
        const len = queueNode.length;
        const levelNode = []
        for(let i=0; i<len; i++){
            let node = queueNode.shift()
            levelNode.push(node.val)
            node.left && queueNode.push(node.left)
            node.right && queueNode.push(node.right)
        }
        // 每对一层操作完成，层数count+1
        count++
        if(count%2) res.push(levelNode)
        else res.push(levelNode.reverse())
    }
    return res
};
```
**剑指 Offer 54. 二叉搜索树的第k大节点**
**剑指 Offer 55 - I. 二叉树的深度**
**剑指 Offer 68 - I. 二叉搜索树的最近公共祖先**

**剑指 Offer 33. 二叉搜索树的后序遍历序列**

DFS
**剑指 Offer 12. 矩阵中的路径**
**剑指 Offer 13. 机器人的运动范围**
****
****
****