const treeList = {
  val: 'A',
  left: {
    val: 'B',
    left: null,
    right: null,
  },
  right: {
    val: 'C',
    left: {
      val: 'D',
      left: {
        val: 'F',
        left: null,
        right: null,
      },
      right: null,
    },
    right: {
      val: 'E',
      left: null,
      right: null,
    },
  },
};
// 迭代法
//  前序遍历，原生的是从叶子结点开始回溯，使用combine保存即可
const getTreePath = (root) => {
  const res = [];
  const dfs = (node, combine = []) => {
    combine.push(node.val);
    if (node.val && !node.left && !node.right) {
      return res.push(combine);
    }
    node.left && dfs(node.left, [...combine]);
    node.right && dfs(node.right, [...combine]);
  };
  root && dfs(root);
  return res;
};
// 02 迭代法
// 和普通迭代发一致，多使用一个combines保存改分支的历史数据
const getTreePath02 = (root) => {
  const res = []; const queue = [root]; const
    combines = [''];
  while (queue.length) {
    const node = queue.shift();
    let combine = combines.shift();

    combine += node.val;
    if (node.val && !node.left && !node.right) {
      res.push(combine);
    } else {
      if (node.left) {
        queue.push(node.left);
        combines.push(combine);
      }
      if (node.right) {
        queue.push(node.right);
        combines.push(combine);
      }
    }
  }
  return res;
};
console.log(getTreePath02(treeList));
