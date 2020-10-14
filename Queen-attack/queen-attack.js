let attack = false;

export class QueenAttack {
  constructor(props = {}) {
    this.white = props.white || [0, 3];
    this.black = props.black || [7, 3];
    this.board = this.constructBoard();
    this.testing();
    this.canAttack();
  }

  constructBoard() {
    return Array(8).fill().map(() => Array(8).fill('_'));
  }

  testing() {
    if (this.white[0] === this.black[0] && this.white[1] === this.black[1]) {
      throw "Queens cannot share the same space";
    }
  }

  placeQueens(){
    const [WhiteRow, WhiteCol ] = this.white
    const [BlackRow, BlackCol] = this.black    
    
    this.board[WhiteRow][WhiteCol] = 'W'
    this.board[BlackRow][BlackCol] = 'B'
  }

  toString() {
    this.placeQueens();
    let stBoard = "";

    for (let i = 0; i < this.board.length; i++) {
      stBoard += this.board[i].join(' ') + "\n";
    }
    return stBoard;
  }

  canAttack() {
    if(this.white[0] === this.black[0] || this.white[1] === this.black[1]) {
        attack = true;
    }
    else {
        this.normDiag();
    }
    return attack;
  }

  normDiag() {

    for(let i = 1; i < this.board.length; i++) {
        if(this.white[0] + i === this.black[0] && this.white[1] + i === this.black[1]) {
            attack = true;
            return attack;
        }
        else {
            attack = false;
        }
    }
    if(attack === false) {
        for(let i = 0; i < this.board.length; i++) {
            if(this.white[0] - i === this.black[0] && this.white[1] + i === this.black[1]) {
                attack = true;
                return attack;
            }
            else {
                attack = false;
            }
        }
    }
    if(attack === false) {
        for(let i = 0; i < this.board.length; i++) {
            if(this.white[0] + i === this.black[0] && this.white[1] - i === this.black[1]) {
                attack = true;
                return attack;
            }
            else {
                attack = false;
            }
        }
    }
  }

}
