function mergeSort(array) {
    if(array.length < 2) {
        return array;
    }
    const left = array.slice(0, Math.floor(array.length / 2));
    const right = array.slice(Math.floor(array.length / 2));
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let sorted = [];
    while(left.length > 0 && right.length > 0) {
        if(left[0] <= right[0]) {
            sorted.push(left.shift());
        } else {
            sorted.push(right.shift());
        }
    }
    return [...sorted, ...left, ...right]
}

function removeDuplicates(array) {
    let sorted = mergeSort(array);
    let noDuplicates = sorted.filter((element, index) => sorted.indexOf(element) === index);
    return noDuplicates;
}

class Node {
    constructor(data = null, right = null, left = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        let sorted = removeDuplicates(array);
        this.root = this.buildTree(sorted);
    }

    buildTree(sorted) {
        if(sorted.length === 0) return null;

        let mid = Math.floor(sorted.length/2);
        let root = new Node(sorted[mid]);
        root.left = this.buildTree(sorted.slice(0, mid));
        root.right = this.buildTree(sorted.slice(mid+1));

        return root;
    }
    
    insert(data, node = this.root) {
        if(node === null) {
            return new Node(data)
        } else {
            if(data > node.data) {
                node.right = this.insert(data, node.right)
            } else {
                node.left = this.insert(data, node.left)
            }
        }
        return node;
    }

    delete(data) {
        this.root = this.deleteNode(this.root, data)
    }

    deleteNode(node, data) {
        if(node === null) {
            return root
        }
        if(data < node.data) {
            node.left = this.deleteNode(node.left, data)
        } else if(data > node.data) {
            node.right = this.deleteNode(node.right, data)
        } else {
            if(node.left === null) {
                return node.right
            } else if(node.right === null) {
                return node.left
            }
            node.data = this.min(node.right)
            node.right = null
        }
        return node
    }

    min(node = this.root) {
        while(node.left) {
            node = node.left
        }
        return node.data
    }

    find(data, node = this.root) {
        if(node === null) {
            return 'Does not exist!'
        } else {
            if(data === node.data) {
                return node
            } else if(data > node.data) {
                return this.find(data, node.right)
            } else if(data < node.data) {
                return this.find(data, node.left)    
            }
        }
    }

    levelOrder(array = [], queue = [this.root]) {
        while(queue.length > 0) {
            let current = queue.shift()
            array.push(current.data)
            if(current.left) {
                queue.push(current.left)
            }
            if(current.right) {
                queue.push(current.right)
            }
        }
        return array
    }

    preOrder(node = this.root, array = []) {
        if(node) {
            array.push(node.data)
            this.preOrder(node.left, array)
            this.preOrder(node.right, array)
        }
        return array;
    }

    inOrder(node = this.root, array = []) {
        if(node) {
            this.inOrder(node.left, array)
            array.push(node.data)
            this.inOrder(node.right, array)
        }
        return array;
    }

    postOrder(node = this.root, array = []) {
        if(node) {
            this.postOrder(node.left, array)
            this.postOrder(node.right, array)
            array.push(node.data)
        }
        return array;
    }

    height(node = this.root) {
        if(node === null || !node.left && !node.right) {
            return 0
        } else {
            if(this.height(node.left) > this.height(node.right)) {
                return this.height(node.left) + 1
            } else {
                return this.height(node.right) + 1
            }
        }
    }
    
    minHeight(node = this.root, height = 0) {
        if(node === null || !node.left && !node.right) {
            return height
        } else {
            if(this.minHeight(node.left) < this.minHeight(node.right)) {
                return this.minHeight(node.left, height+1)
            } else {
                return this.minHeight(node.right, height+1)
            }
        }
    }
    
    depth(node, root = this.root, depth = 0) {
        if(root === null) {
            return
        } 
        if(node === root.data) {
            return depth;
        } else {
            if(node < root.data) {
                return this.depth(node, root.left, depth+1)
            } else {
                return this.depth(node, root.right, depth+1)
            }
        }
    }

    isBalanced() {
        return(this.height()-this.minHeight() <= 1)
    }

    rebalance() {
        let sorted = removeDuplicates(this.preOrder());
        this.root = this.buildTree(sorted);
        return this.root
    }
    
    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) {
           return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
      }
}

let test = new Tree([67, 76, 59, 29, 63, 5, 16, 1, 6, 92])
console.log(test)
test.prettyPrint()
console.log(test.isBalanced())
console.log(test.preOrder())
console.log(test.postOrder())
console.log(test.inOrder())
test.insert(101)
test.insert(781)
test.insert(604)
test.prettyPrint()
console.log(test.isBalanced())
console.log(test.rebalance())
test.prettyPrint()
console.log(test.isBalanced())
console.log(test.preOrder())
console.log(test.postOrder())
console.log(test.inOrder())