// Javascript code addition 

class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class SplayTree {

  constructor() {
    this.root = null;
    this.dot = '';
  }
  clear() {
    this.root = null;
    this.dot = '';
  }
  newNode(key) {
    const node = new Node(key);
    return node;
  }

  rightRotate(x) {
    const y = x.left;
    x.left = y.right;
    y.right = x;
    return y;
  }

  leftRotate(x) {
    const y = x.right;
    x.right = y.left;
    y.left = x;
    return y;
  }

  splay(root, key) {
    if (root == null || root.key == key) {
      return root;
    }

    if (root.key > key) {
      if (root.left == null) {
        return root;
      }

      if (root.left.key > key) {
        root.left.left = this.splay(root.left.left, key);
        root = this.rightRotate(root);
      } else if (root.left.key < key) {
        root.left.right = this.splay(root.left.right, key);
        if (root.left.right != null) {
          root.left = this.leftRotate(root.left);
        }
      }
      return root.left == null ? root : this.rightRotate(root);
    } else {
      if (root.right == null) {
        return root;
      }

      if (root.right.key > key) {
        root.right.left = this.splay(root.right.left, key);
        if (root.right.left != null) {
          root.right = this.rightRotate(root.right);
        }
      } else if (root.right.key < key) {
        root.right.right = this.splay(root.right.right, key);
        root = this.leftRotate(root);
      }
      return root.right == null ? root : this.leftRotate(root);
    }
  }

  insert(key) {
    if (this.root == null) {
      this.root = this.newNode(key);
      return this.root;
    }

    this.root = this.splay(this.root, key);

    if (this.root.key == key) {
      return this.root;
    }

    const node = this.newNode(key);
    if (this.root.key > key) {
      node.right = this.root;
      node.left = this.root.left;
      this.root.left = null;
    } else {
      node.left = this.root;
      node.right = this.root.right;
      this.root.right = null;
    }
    this.root = node;
    return node;
  }

  dotGraph() {
    this.dot = ""
    this.preorder(this.root)
  }
  preorder(node) {
    if (node !== null) {
      this.dot = this.dot + "node" + node.key + "[ label = \"<C0>|<f1>" + node.key + "|<C1>\"]";
      if (node.left != null) {
        this.dot = this.dot + "node" + node.key + ":C0->node" + node.left.key + ":f1;";
      }
      this.preorder(node.left);
      if (node.right != null) {
        this.dot = this.dot + "node" + node.key + ":C1->node" + node.right.key + ":f1;";
      }
      this.preorder(node.right);
    }
  }
}

export { SplayTree }