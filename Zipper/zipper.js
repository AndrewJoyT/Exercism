export class Zipper {

  constructor(node, path = []) {
    this.path = path;
    this.node = node;
    Object.freeze(this);
  }

  static fromTree(tr) {
    return new Zipper(tr);
  }

  toTree() {
    let tree = this.node;
    for(let i = 0; i < this.path.length; i++) tree = this.path[i](tree);
    return tree;
  }

  value() {
    return this.node.value;
  }

  down(direction){
    if (this.node[direction] === null) return null;
    const currentNode = Object.assign({},this.node);
    const path = [
      x => {
        currentNode[direction] = x;
        return currentNode;
      },
      ...this.path
    ];
    return new Zipper(currentNode[direction], path);
  }

  left() {
    return this.down('left');
  }

  right() {
    return this.down('right');
  }
  
  atTop(){
    return this.path.length === 0;
  }

  up() {
    if(this.atTop()) return null;
    let node, path;
    [node, ...path] = this.path;
    return new Zipper(node(this.node), path);

  }

  setValue(val) {
    const node = {value: val, left: this.node.left, right: this.node.right}
    return new Zipper(node, this.path);
  }

  setLeft(tr) {
    const node = {value: this.node.value, left: tr, right: this.node.right}
    return new Zipper(node, this.path);
  }

  setRight(tr) {
    const node = {value: this.node.value, left: this.node.left, right: tr}
    return new Zipper(node, this.path);
  }
}