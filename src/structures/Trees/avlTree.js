class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.height = 1; // New nodes always start with a height of 1.
    }
}

class AVLTree {
    constructor() {
        this.root = null;
        this.dot = "";
    }
    clear() {
        this.root = null;
        this.dot = '';
    }
    // Utility function to get the height of a node.
    getHeight(node) {
        return node ? node.height : 0;
    }

    // Utility function to get balance factor of a node.
    getBalanceFactor(node) {
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    // Rotate node to the right.
    rightRotate(y) {
        const x = y.left;
        const T3 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T3;

        // Update heights post rotation
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

        return x; // New root
    }

    // Rotate node to the left.
    leftRotate(x) {
        const y = x.right;
        const T2 = y.left;

        // Perform rotation
        y.left = x;
        x.right = T2;

        // Update heights post rotation
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

        return y; // New root
    }

    // Recursively inserts a node and performs rotations if necessary.
    insertNode(node, data) {
        if (!node) return new Node(data);

        if (data < node.data) {
            node.left = this.insertNode(node.left, data);
        } else if (data > node.data) {
            node.right = this.insertNode(node.right, data);
        } else {
            return node; // Duplicate data not allowed.
        }

        // Update node's height.
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

        // Get the balance to check if it became unbalanced.
        const balance = this.getBalanceFactor(node);

        // Left heavy scenario
        if (balance > 1) {
            if (data < node.left.data) {
                return this.rightRotate(node);
            } else {
                node.left = this.leftRotate(node.left);
                return this.rightRotate(node);
            }
        }

        // Right heavy scenario
        if (balance < -1) {
            if (data > node.right.data) {
                return this.leftRotate(node);
            } else {
                node.right = this.rightRotate(node.right);
                return this.leftRotate(node);
            }
        }

        return node;
    }

    insert(data) {
        this.root = this.insertNode(this.root, data);
    }
    dotGraph() {
        this.dot = ""
        this.preorder(this.root)

    }
    preorder(node) {
        if (node !== null) {
            this.dot = this.dot + "node" + node.data + "[ label = \"<C0>|<f1>" + node.data + "|<C1>\"]\n\t";
            if (node.left != null) {
                this.dot = this.dot + "node" + node.data + ":C0->node" + node.left.data + ":f1;\n\t";
            }
            this.preorder(node.left);
            if (node.right != null) {
                this.dot = this.dot + "node" + node.data + ":C1->node" + node.right.data + ":f1;\n\t";
            }
            this.preorder(node.right);
        }
    }
}

export {
    AVLTree
}