function order (arr1, ordertype) {
  // 找到最后一个子叶点
  // 公式 parseInt(arr1.length / 2 - 1)
  function findLear (arr1) {
    for (let i = parseInt(arr1.length / 2 - 1); i >= 0; i--) {
      headMap(arr1, i, arr1.length)
    }
  }
  // 将最大元素调整到堆顶
  function headMap (arr1, leaf, len) {
    // 找到叶子节点在数组中的value
    let swap = arr1[leaf]
    // 找到当前叶子节点的做节点
    let leftChild = leaf * 2 + 1
    // 递归所有的子节点
    while (leftChild < len) {
      // 判断是否有右侧的叶子
      if (ordertype) {
        if (leftChild + 1 < len && arr1[leftChild] < arr1[leftChild + 1]) {
          leftChild += 1
        }
        if (arr1[leaf] < arr1[leftChild]) {
          arr1[leaf] = arr1[leftChild]
          leaf = leftChild
          leftChild = leaf * 2 + 1
        } else {
          break
        }
      } else {
        if (leftChild + 1 < len && arr1[leftChild] > arr1[leftChild + 1]) {
          leftChild += 1
        }
        if (arr1[leaf] > arr1[leftChild]) {
          arr1[leaf] = arr1[leftChild]
          leaf = leftChild
          leftChild = leaf * 2 + 1
        } else {
          break
        }
      }
      arr1[leaf] = swap
    }
  }
  // 堆排序算法
  function plusSort (arr1) {
    findLear(arr1)
    for (let i = arr1.length - 1; i > 0; i--) {
      let swap = arr1[i]
      arr1[i] = arr1[0]
      arr1[0] = swap
      headMap(arr1, 0, i)
    }
  }
  plusSort(arr1)

  return arr1
}
// 默认降序 第二位参数为true 升序
export default order
