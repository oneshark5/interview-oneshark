

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

