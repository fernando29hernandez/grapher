class Node {
    constructor(value) {

        this.value = value;
        this.next = null;

    }
}



class LinkedList {
    constructor() {
        this.head = null;
        this.dot = '';
    }

    clear() {
        this.head = null;
        this.dot = '';
    }

    insert(value) {
        let newNode = new Node(value)
        if (this.head === null)
            this.head = newNode;
        else {
            let current = this.head;

            while (current.next != null) {
                current = current.next;
            }
            let temp = new Node(value);
            current.next = temp;
        }
    }

    dotGraph() {
        this.dot = ""
        this.showList(this.head)

    }
    showList(node) {
        if (node !== null) {
            this.dot = this.dot + "node" + node.value + "[ label = \"{<f1>" + node.value + "|<C1>}\"]";
            if (node.next != null) {
                this.dot = this.dot + "\n\tnode" + node.value + ":C1:C->node" + node.next.value + ":f1 [arrowhead=vee, arrowtail=dot, dir=both, tailclip=false, arrowsize=1.2];";
            }
            this.showList(node.next);
        }
    }
}

export {
    Node, LinkedList
}