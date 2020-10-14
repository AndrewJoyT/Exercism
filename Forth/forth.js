export class Forth {

	constructor() {
	  this._stack = [];
  
	  this._ops = {};
	  this._ops.dup = () => {
		let a = this.pop();
		this._stack.push(a, a);
	  }
	  this._ops.drop = () => {
		this.pop();
	  }
	  this._ops.swap = () => {
		let a = this.pop();
		let b = this.pop();
		this._stack.push(a, b);
	  }
	  this._ops.over = () => {
		let a = this.pop();
		let b = this.pop();
		this._stack.push(b, a, b);
	  }
  
	  const biops = {
		'+': (a, b) => b + a,
		'-': (a, b) => b - a,
		'*': (a, b) => b * a,
		'/': (a, b) => {
		  if (a === 0) {
			throw new Error('Division by zero');
		  } else {
			return Math.floor(b / a);
		  }
		},
	  };
  
	  for (let biop in biops) {
		this._ops[biop] = () => {
		  let a = this.pop();
		  let b = this.pop();
		  this._stack.push(biops[biop](a, b));
		}
	  }
	}
  
	pop() {
	  let res = this._stack.pop();
	  if (res === undefined) {
		throw new Error('Stack empty');
	  } else {
		return res;
	  }
	}
  
	evalNum(op) {
	  let num = Number(op);
	  if (!Number.isInteger(num)) {
		return false;
	  } else {
		this._stack.push(num);
		return true;
	  }
	}
  
	evalOp(name) {
	  let op = this._ops[name.toLowerCase()];
	  if (op === undefined) {
		throw new Error('Unknown command');
	  } else {
		op();
	  }
	}
  
	evaluate(prog) {
	  if (prog.startsWith(':')) {
		let words = prog.split(' ');
		let name = words[1].toLowerCase();
		if (Number.isInteger(Number(name))) {
		  throw new Error('Invalid definition');
		}
		let def = words.slice(2, -1).join(' ');
		this._ops[name] = () => this.evaluate(def);
	  } else {
		prog.split(' ').forEach(op => {
		  this.evalNum(op) || this.evalOp(op);
		});
	  }
	}
  
	get stack() {
	  return this._stack;
	}
  
  }