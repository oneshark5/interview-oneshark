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