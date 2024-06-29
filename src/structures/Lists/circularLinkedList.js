import { LinkedList } from "./linkedList";

class Node {
    constructor(value) {

        this.value = value;
        this.next = null;

    }
}



class CircularLinkedList extends LinkedList {
    constructor() {
        super()
    }
    insert(value) {
        let newNode = new Node(value)
        console.log(this.head)
        console.log(newNode)
        if (this.head === null) {
            this.head = newNode;
            newNode.next = this.head;
        } else {
            let current = this.head;

            while (current.next.value != this.head.value) {
                if(current.value===value){
                    return;
                }
                current = current.next;
            }
            if(current.value===value){
                return;
            }
            let temp = new Node(value);
            temp.next = this.head;
            current.next = temp;
           
            
            this.head = temp;

        }
    }
    dotGraph() {
        this.dot = ""
        this.showList(this.head, this.head)
        console.log("dot", this.dot)
    }
    showList(node, head) {
        if (node === null) {
            return;
        }
        this.dot = this.dot + "\n\tnode" + node.value + "[ label = \"{<f1>" + node.value + "|<C1>}\"]";
        if (node.next.value === head.value) {
            this.dot = this.dot + "\n\tnode" + node.value + ":C1:C->node" + node.next.value + ":f1 [arrowhead=vee, arrowtail=dot, dir=both, tailclip=false, arrowsize=1.2];";
            return;
        }
        console.log("d", node.value);
        
        if (node.next != null) {
            this.dot = this.dot + "\n\tnode" + node.value + ":C1:C->node" + node.next.value + ":f1 [arrowhead=vee, arrowtail=dot, dir=both, tailclip=false, arrowsize=1.2];";
        }
        this.showList(node.next,head);
    }
}

export {
    Node, CircularLinkedList
}