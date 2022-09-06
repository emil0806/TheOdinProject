class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(HEAD = null) {
    this.HEAD = HEAD;
  }

  append(value) {
    const newNode = new Node(value);
    let temp = this.HEAD;

    while (temp.next != null) {
      temp = temp.next;
    }

    temp.next = newNode;
  }

  prepend(value) {
    const newHead = new Node(value);
    newHead.next = this.HEAD;
    this.HEAD = newHead;
  }

  size() {
    let count = 0;
    let temp = this.HEAD;

    while (temp != null) {
      temp = temp.next;
      count++;
    }
    return count;
  }

  head() {
    return this.HEAD.value;
  }

  tail() {
    let temp = this.HEAD;

    while (temp.next != null) {
      temp = this.next;
    }
    return temp.value;
  }

  at(index) {
    let temp = this.HEAD;
    let count = 1;

    while (temp.next != null && count !== index) {
      temp = temp.next;
      count++;
    }
    return temp.value;
  }
}
