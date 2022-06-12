# 1.二分查找
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

# 2.链表
剑指 Offer 06. 从尾到头打印链表
剑指 Offer 18. 删除链表的节点
剑指 Offer 24. 反转链表
剑指 Offer 35. 复杂链表的复制
剑指 Offer 36. 二叉搜索树与双向链表
剑指 Offer 52. 两个链表的第一个公共节点