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

    find(data, node = this.root) {
        if(node === null || data === node.data) {
            return node
        } else if(data > node.data) {
            node.right = this.find(data, node.right)
        } else if(data < node.data) {
            node.left = this.find(data, node.left)
        }
    }
}


let test = new Tree([7, 1, 9, 8, 7, 6, 8, 5])
console.log(removeDuplicates([7, 1, 9, 8, 7, 6, 8, 5]))
test.insert(4)
console.log(test)
console.log(test.find(7))

