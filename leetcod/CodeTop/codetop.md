

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