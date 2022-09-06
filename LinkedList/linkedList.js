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

  pop() {
    let temp = this.HEAD;

    while (temp.next.next != null) {
      temp = temp.next;
    }
    temp.next = null;
  }

  contains(value) {
    let temp = this.HEAD;

    while (temp != null && temp.value !== value) {
      temp = temp.next;
    }
    return temp == null ? false : true;
  }

  find(value) {
    let temp = this.HEAD;
    let index = 0;

    while (temp != null) {
      if (temp.value == value) return index;
      index++;
      temp = temp.next;
    }
    return null;
  }

  toString() {
    let temp = this.HEAD;
    let string = "";

    while (temp != null) {
      string += `(${temp.value}) -> `;
      temp = temp.next;
    }
    string += "(null)";

    return string;
  }

  insertAt(value, index) {
    let temp = this.HEAD;
    let tempNext;
    let count = 1;
    let newNode = new Node(value);

    if (index == 0) {
      newNode.next = temp;
      this.HEAD = newNode;
      return;
    }

    while (temp != null) {
      if (count == index) {
        tempNext = temp.next;
        temp.next = newNode;
        newNode.next = tempNext;
        return;
      }

      count++;
      temp = temp.next;
    }
  }

  removeAt(index) {
    if (index === 0) {
      const valueOfRemoved = this.HEAD.value;
      this.HEAD = this.HEAD.next;
      return valueOfRemoved;
    }

    const nodeBeforeRemovedOne = this.at(index - 1);
    const valueOfRemoved = nodeBeforeRemovedOne.next.value;
    nodeBeforeRemovedOne.next = nodeBeforeRemovedOne.next.next;

    return valueOfRemoved;
  }
}
