import { LinkedList } from "./linkedList";

class Node {
    constructor(value) {

        this.value = value;
        this.next = null;

    }
}



class OrderedLinkedList extends LinkedList{
    constructor() {
        super()
    }
    insert(value) {
        let newNode = new Node(value)
        console.log(this.head)
        console.log(newNode)
        if (this.head === null)
            this.head = newNode;
        else {
            let current = this.head ;
            let previous = null;
            let  stop = false;
            while (current != null && !stop) {
                if (current.value > value) {
                    stop = true;
                
                }else  if (current.value== value) {
                    return;
                }else {
                    previous = current;
                    current = current.next;
                }
            }
            let temp = new Node(value);
            if (previous == null) {
                temp.next = this.head;
                this.head = temp;
            } else {
                temp.next = current;
                previous.next= temp;
            }

        }
    }
}

export {
    Node,OrderedLinkedList
}