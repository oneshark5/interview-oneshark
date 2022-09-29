

****

**[15. 三数之和](https://leetcode.cn/problems/3sum/)**

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    // 三数之和为0且三数各不相等
    // 思路：与四数之和逻辑一样，遍历数组，对遍历到的元素指定双指针，然后判断三数之和
    const res = []
    const len = nums.length;
    if(len < 3) return []
    nums.sort((a, b) => a - b)
    for(let i = 0; i < len; i++){
        // 如果指定双指针的第一个元素就 > 0,则肯定没有三数之和等于0的情况
        if(nums[i] > 0) return res;
        // 去重
        if(i > 0 && nums[i] === nums[i-1]) continue;
        let [l, r] = [i+1, len-1]
        while(l < r){
            const sum = nums[i] + nums[l] + nums[r];
            // 双指针收缩
            if(sum < 0) l++
            else if(sum > 0) r--
            else{
                res.push([nums[i], nums[l], nums[r]]);
                // 去重
                while(l < r && nums[l] === nums[l+1]) l++;
                while(l < r && nums[r] === nums[r-1]) r--;
                l++;
                r--;
            }
        }
    }
    return res
};
```

215. 数组中的第K个最大元素
参考：[代码](https://leetcode.cn/problems/kth-largest-element-in-an-array/solution/ji-yu-kuai-su-pai-xu-de-xuan-ze-fang-fa-ecctc/)
```js
var findKthLargest = function(nums, k) {
    // 时间复杂度为o(n)   桶排序时间复杂度为o(n)
    // 题解给了 快排和堆排序
    // 一、sort排序
    // nums.sort((a, b) => b - a)
    // return nums[k-1]

    // 二、快排
    /**
    1. 快排，小的放基数前面，大的放和后面，若想要 k 即 为 nums.length - k(targetIndex)
    2. 定义快排，left.length + start === index 直接返回
        < targetIndex 继续递归左边
        else 递归右边 此时start为 left.length + start + 1
     */
    const quickSort = (arr, targetIndex, start) => {
        if(arr.length <= 1) return arr[0]
        const left = []
        const right = []
        const mid = Math.floor(arr.length / 2)
        const midNum = arr.splice(mid, 1)[0];
        for(let i=0; i<arr.length; i++){
            if(arr[i] > midNum){
                right.push(arr[i])
            }else{
                left.push(arr[i])
            }
        }

        // 判断递归
        if(left.length + start === targetIndex){
            return midNum;
        }else if(left.length + start > targetIndex){
            return quickSort(left, targetIndex, start)
        }else{
            return quickSort(right, targetIndex, left.length + start + 1)
        }
    }

    let num = quickSort(nums, nums.length - k, 0)
    return num
};
```

5. 最长回文子串

```js
var longestPalindrome = function(s) {
    let max = ''
    for(let i=0; i< s.length; i++) {
        // 分奇偶， 一次遍历，每个字符位置都可能存在奇数或偶数回文
        getMax(i, i)
        getMax(i, i+1)
    }
    function getMax(l, r) {
        // 向两边发散
        while(l>=0 && r<s.length && s[l] === s[r]){
            l--;
            r++
        }
        let maxStr = s.slice(l+1, r+1-1)
        if(maxStr.length > max.length) max = maxStr
    }
    return max
};
```

141. 环形链表
```js
var hasCycle = function(head) {
    // 快慢双指针双指针
    let slow = fast = head;
    while(fast && fast.next){
        slow = slow.next;
        fast = fast.next.next;
        if(slow === fast){
            let [index1, index2] = [head, fast]
            while(index1 !== index2){
                index1 = index1.next;
                index2 = index2.next;
            }
            return index1 !== -Infinity
        }
    }
    return  false
};
```

142. 环形链表 II
```js
var detectCycle = function(head) {
    // 题意：存在环，返回链表尾部所链接的位置，无则返回-1
    // 思路：采用两次双指针，判断是否有环，判断环的入口
    /**
    1. 是否有环，快慢双指针
    2. 环的入口，双指针，一个指向头节点，一个指向相遇节点
     */
    // 重点：判断的环的入口比较难想
    // 快慢双指针
    let slow = fast = head;
    while(fast && fast.next){
        slow = slow.next;
        fast = fast.next.next;
        if(slow === fast){
            // 双指针
            let [index1, index2] = [head, fast];
            while(index1 !== index2){
                index1 = index1.next;
                index2 = index2.next;
            }
            return index1
        }
    }
    return null
};
```

**[121. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)**

方法一：for循环 模拟
```js
var maxProfit = function(prices) {
    // 模拟
    /**
    思路：对最低价格minPrice和最大利润MaxProfit进行记录
    如果当前价格prices[i]低于最低价格则替换：minPrice = prices[i]
    否则，如果当前价格减去最低价格利润大于之前的最大利润则替换：prices[i] - minPrice > maxProfit --> maxProfit = prices[i] - minPrice
     */
    let minPrice = Infinity,
        maxProfit = 0
    for(let i=0; i<prices.length; i++){
        if(prices[i] < minPrice){
            minPrice = prices[i]
        }else if(prices[i] - minPrice > maxProfit){
            maxProfit = prices[i] - minPrice
        }
    }
    return maxProfit
};
```

方法二：贪心
```js
var maxProfit = function(prices) {
    // 贪心：每次遍历要最低价格和最大利润
    let minPrice = Infinity,
        maxProfit = 0;
    for(let i=0; i<prices.length; i++){
        minPrice = Math.min(prices[i], minPrice)
        maxProfit = Math.max(prices[i] - minPrice, maxProfit)
    }
    return maxProfit
};
```
方法三：动态规划
```js
var maxProfit = function(prices) {
    // // 动态规划
    /**
    思路：持有不持有两种状态
    dp[i][0] 表示第i天持有股票的利润
    dp[i][1] 表示第i天未持有股票的利润

    持有股票的状态：
    可能前一天已经买入dp[i-1][0]，也可能今日买入-prices[i]
    未持有股票的状态：
    可能是前一天已经卖出dp[i-1][1]，也可能今日卖出dp[i-1] + prices[i]
     */
    const len = prices.length
    const dp = new Array(len).fill(0).map(() => new Array(2).fill(0))
    // 初始化
    dp[0][0] = -prices[0]
    dp[0][1] = 0
    for(let i=1; i<len; i++){
        dp[i][0] = Math.max(dp[i-1][0], -prices[i])// 持有
        dp[i][1] = Math.max(dp[i-1][1], dp[i-1][0] + prices[i])
    }
    return dp[len-1][1]
};
```

**[129. 求根节点到叶节点数字之和](https://leetcode.cn/problems/sum-root-to-leaf-numbers/)**

```js
var sumNumbers = function(root) {
    // 二叉树路径数的延申
    // 中序遍历，当到达叶子节点，则记录所组成的数字
    const res = []
    const dfs = (root, path) => {
        path += root.val
        root.left && dfs(root.left, path)
        root.right && dfs(root.right, path)
        if(!root.left && !root.right){
            res.push(path)
            path = ''
        }
    }
    dfs(root, '')
    let sum = res.reduce((prev, cur) => Number(prev) + Number(cur))
    return sum
};
```

**[剑指 Offer 10- I. 斐波那契数列](https://leetcode.cn/problems/fei-bo-na-qi-shu-lie-lcof/)**

```js
var fib = function(n) {
    // // dp[i] 表示第 i 项，斐波那契数为dp[i]
    // if(n <= 1) return n
    // const dp = [0, 1]
    // for(let i=2; i<=n; i++){
    //     dp[i] = (dp[i - 1] + dp[i - 2]) % 1000000007;
    // }
    // return dp[n]

    // 终止条件、dp初始化、遍历
    if(n <= 1) return n
    const dp = [0, 1]
    for(let i=2; i<=n; i++){
        dp[i] = (dp[i-1] + dp[i-2]) % 1000000007;
    }
    return dp[n]
};
```

**[912. 排序数组](https://leetcode.cn/problems/sort-an-array/)**

```js
var sortArray = function(nums) {
    // ⭐⭐⭐练习各种排序🤭⭐⭐⭐
    // 快速排序：选择基准元素，比基准小前面，比基准大的放后面
    const quickSort = (arr) => {
        if(arr.length <= 1) return arr
        const left = []
        const right = []
        const mid = arr[0] // 选择第一个元素作为基准
        for(let i=1; i<arr.length; i++){
            if(arr[i] < mid) left.push(arr[i])
            else right.push(arr[i])
        }
        return [...quickSort(left), mid, ...quickSort(right)]
    }
    return quickSort(nums)
};
```



**[200. 岛屿数量](https://leetcode.cn/problems/number-of-islands/)**

```js
var numIslands = function(grid) {
    // 深度优先搜索，参考🐦飞鸟
    const dfs = (i, j) => {
        if(i<0 || i>=m || j<0 || j>=n || grid[i][j] === '0') return
        // 访问过的地方，标记为 0
        grid[i][j] = '0';
        // 四个方向继续访问
        dfs(i + 1, j);
        dfs(i, j + 1);
        dfs(i - 1, j);
        dfs(i, j - 1);
    }
    const m = grid.length;
    const n = grid[0].length;
    let res = 0
    for(let i=0; i<m; i++){
        for(let j=0; j<n; j++){
            if(grid[i][j] === '1'){
                dfs(i, j)
                res++
            }
        }
    }
    return res
};
// const numIslands = grid => {
//     // 定义深度优先遍历函数
//     const dfs = (i, j) => {
//         // 越界、遇到水，则不访问了
//         if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === '0') return;
//         // 访问过的的地方，标记为0
//         grid[i][j] = '0';
//         // 四个方向继续访问
//         dfs(i + 1, j);
//         dfs(i, j + 1);
//         dfs(i - 1, j);
//         dfs(i, j - 1);
//     };
//     // 矩阵的行、列
//     const m = grid.length;
//     const n = grid[0].length;
//     let res = 0;
//     for (let i = 0; i < m; i++) {
//         for (let j = 0; j < n; j++) {
//             // 找到矩阵中，为1的地方，开始深度优先遍历
//             if (grid[i][j] === '1') {
//                 dfs(i, j);
//                 // 每遍历完一整趟，会把相连的所有1，变成0
//                 // 代表访问完了一个岛屿，res++
//                 res++;
//             }
//         }
//     }
//     return res;
// };
```

