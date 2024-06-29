class Node {
    constructor(value) {

        this.value = value;
        this.right = null;
        this.left = null;

    }
}

class BinaryTree {
    constructor() {
        this.root = null;
        this.dot = '';
    }

    clear(){
        this.root = null;
        this.dot ='';
    }

    insert(value) {
        let newNode = new Node(value)
        console.log(this.root)
        console.log(newNode)
        if (this.root === null)
            this.root = newNode;
        else {
            this.insertNode(this.root, newNode);


        }
    }
    insertNode(parent, newNode) {
        // if the data is less than the node
        // data move left of the tree 
        if (newNode.value < parent.value) {
            // if left is null insert node here
            if (parent.left === null){
                parent.left = newNode;
            }
                
            else{
                // if left is not null recur until 
                // null is found
                this.insertNode(parent.left, newNode);
            }

        }

        // if the data is more than the node
        // data move right of the tree 
        else {
            // if right is null insert node here
            if (parent.right === null){
                parent.right = newNode;
            }
                
            else{
// if right is not null recur until 
                // null is found
                this.insertNode(parent.right, newNode);
            }

                
        }
    }
    dotGraph(){
        this.dot=""
        this.preorder(this.root)
        console.log("dot",this.dot)
    }
    preorder(node) {
        if (node !== null) {
            console.log(node.value);
            this.dot = this.dot+ "node"+node.value+ "[ label = \"<C0>|<f1>"+node.value+"|<C1>\"]";
            if(node.left!=null){
                this.dot = this.dot +"node"+node.value+":C0->node"+node.left.value+":f1;"; 
            }
            this.preorder(node.left);
            if(node.right!=null){
                this.dot = this.dot+"node"+node.value+":C1->node"+node.right.value+":f1;"; 
            }
            this.preorder(node.right);
        }
    }
}

export {
    Node,BinaryTree
}