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
    constructor(data, right = null, left = null) {
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
}


let test = new Tree([1, 5, 3, 3])
console.log(test)

