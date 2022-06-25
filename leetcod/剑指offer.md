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