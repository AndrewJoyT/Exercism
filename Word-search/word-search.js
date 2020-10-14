class WordSearch {
  constructor(grid) {
    this.grid = grid;
    this.verticalGrid = this.getVerticalGrid();
  }

  getVerticalGrid() {
    let newGrid = [];
    for (let i = 0; i < this.grid[0].length; i++) {
      let row = "";
      for (let j = 0; j < this.grid.length; j++) {
        row += this.grid[j][i];
      }
      newGrid.push(row);
    }
    return newGrid;
  }

  find(words) {
    let result = {};
    for (let i = 0; i < words.length; i++) {
      let position = this.findRight(words[i]);
      if (!position) {
        position = this.findLeft(words[i]);
      }
      if (!position) {
        position = this.findBottom(words[i]);
      }
      if (!position) {
        position = this.findTop(words[i]);
      }
      if (!position) {
        position = this.findDiagonalTLBR(words[i], false);
      }
      if (!position) {
        position = this.findDiagonalTLBR(words[i], true);
      }
      if (!position) {
        position = this.findDiagonalTRBL(words[i], false);
      }
      if (!position) {
        position = this.findDiagonalTRBL(words[i], true);
      }

      if (position) {
        result[words[i]] = {
          start: position[0],
          end: position[1],
        };
      } else {
        result[words[i]] = undefined;
      }
    }

    return result;
  }

  findRight(word) {
    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i].includes(word))
        return [
          [i + 1, this.grid[i].indexOf(word) + 1],
          [i + 1, this.grid[i].indexOf(word) + word.length],
        ];
    }
  }

  findLeft(word) {
    let reverseWord = "";
    for (let i = word.length; i > 0; i--) {
      reverseWord += word[i - 1];
    }
    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i].includes(reverseWord))
        return [
          [i + 1, this.grid[i].indexOf(reverseWord) + reverseWord.length],
          [i + 1, this.grid[i].indexOf(reverseWord) + 1],
        ];
    }
  }

  findBottom(word) {
    for (let i = 0; i < this.grid.length; i++) {
      if (this.verticalGrid[i].includes(word))
        return [
          [this.verticalGrid[i].indexOf(word) + 1, i + 1],
          [this.verticalGrid[i].indexOf(word) + word.length, i + 1],
        ];
    }
  }

  findTop(word) {
    let reverseWord = "";
    for (let i = word.length; i > 0; i--) {
      reverseWord += word[i - 1];
    }
    for (let i = 0; i < this.verticalGrid.length; i++) {
      if (this.verticalGrid[i].includes(reverseWord))
        return [
          [
            this.verticalGrid[i].indexOf(reverseWord) + reverseWord.length,
            i + 1,
          ],
          [this.verticalGrid[i].indexOf(reverseWord) + 1, i + 1],
        ];
    }
  }

  findDiagonalTLBR(word, reverse) {
    if (reverse) {
      let reverseWord = "";
      for (let i = word.length; i > 0; i--) {
        reverseWord += word[i - 1];
      }
      word = reverseWord;
    }
    let letterIdx = 0,
      startR = -1,
      startC = -1,
      x = 0,
      y = 0;
    let loop = true;
    while (loop) {
      if (this.grid[y][x] === word[letterIdx]) {
        letterIdx++;
        if (startR < 0) {
          startR = y;
          startC = x;
        }
      } else {
        if (startR >= 0) {
          x = startC;
          y = startR;
          startR = -1;
          startC = -1;
          letterIdx = 0;
        }
      }
      if (startR >= 0) {
        if (letterIdx < word.length) {
          x++;
          y++;
        } else {
          loop = false;
        }
      } else {
        x++;
      }

      if (x > this.grid[0].length) {
        x = 0;
        y++;
      }
      if (y >= this.grid.length) {
        startR = -1;
        startC = -1;
        loop = false;
      }
    }

    if (startC >= 0) {
      if (reverse) {
        return [
          [startR + word.length, startC + word.length],
          [startR + 1, startC + 1],
        ];
      }
      return [
        [startC + 1, startR + 1],
        [startC + word.length, startR + word.length],
      ];
    }
  }

  findDiagonalTRBL(word, reverse) {
    if (reverse) {
      let reverseWord = "";
      for (let i = word.length; i > 0; i--) {
        reverseWord += word[i - 1];
      }
      word = reverseWord;
    }
    let letterIdx = 0,
      startR = -1,
      startC = -1,
      x = 0,
      y = 0;
    let loop = true;
    while (loop) {
      if (this.grid[y][x] === word[letterIdx]) {
        letterIdx++;
        if (startR < 0) {
          startR = y;
          startC = x;
        }
      } else {
        if (startR >= 0) {
          x = startC;
          y = startR;
          startR = -1;
          startC = -1;
          letterIdx = 0;
        }
      }
      if (startR >= 0) {
        if (letterIdx < word.length) {
          x--;
          y++;
        } else {
          loop = false;
        }
      } else {
        x++;
      }

      if (x < 0) {
        x = startC;
        y = startR;
        x++;
        startR = -1;
        startC = -1;
        letterIdx = 0;
      }
      if (x > this.grid[0].length) {
        x = 0;
        y++;
      }
      if (y >= this.grid.length) {
        startR = -1;
        startC = -1;
        loop = false;
      }
    }

    if (startC >= 0) {
      if (reverse) {
        return [
          [startR + word.length, startC + 2 - word.length],
          [startR + 1, startC + 1],
        ];
      }
      return [
        [startR + 1, startC + 1],
        [startR + word.length, startC + 2 - word.length],
      ];
    }
  }
}

export default WordSearch;