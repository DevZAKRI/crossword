

function crosswordSolver(emptyPuzzle, words) {
    if (!validPuzzle(emptyPuzzle, words)) {
        
        return console.log("Error")
    }
    if (!validWords(words)) {
        return console.log("Error")
    }
    let lines = emptyPuzzle.split('\n');
    let puzzle = lines.map((line) => line.split(''));
     console.log(puzzle)
    let start = getStartPosition(puzzle);
    console.log(start)

    if (start.length != words.length) {
        return console.log("Error")
    }

    let solved = initSolvePuzzle(puzzle, words, start)
    if (!solved) {
        return console.log("Error")
    }
    return console.log(solved.map(row => row.join('')).join('\n'))
}

const solvePuzzle = (puzzle, positions, words, index, usedWords, solutions) => {

    if (index == positions.length) {
        solutions.push(puzzle.map(row => [...row]));
        return null
    }

    const pos = positions[index];
    
    for (let word of words) {
        if (!usedWords.has(word) && canPlaceWord(puzzle, pos, word)) {

            const tempPuzzle = puzzle.map(row => [...row]);
            placeWord(tempPuzzle, pos, word);
            usedWords.add(word);
            
            const result = solvePuzzle(tempPuzzle, positions, words, index + 1, usedWords, solutions);
            if (result) return result;
            
            usedWords.delete(word);
        }
    }
    
    return null;
};

function getStartPosition(puzzle) {
    let start = [];
    for (let x = 0; x < puzzle.length; x++) {
        for (let y = 0; y < puzzle[x].length; y++) {
            let char = parseInt(puzzle[x][y]);
            if (char > 0) {
                    if (validHorizontal(puzzle, x, y)) {
                        start.push({direction: 'horizontal',row: x,col: y});
                    }
                    if (validVertical(puzzle, x, y)) {
                        start.push({direction: 'vertical',row: x,col: y});
                    }
            }
        }
    }
    return start;
}

function initSolvePuzzle(puzzle, words, positions) {
    const solvedPuzzle = puzzle.map(row => [...row]);
    const solutions = []
    return solvePuzzle(solvedPuzzle, positions, words, 0, new Set(), solutions);
}

function validPuzzle(puzzle, words) {
    const validPattern = /^[.012\n]*$/;
    let countStart = 0
    for (let x = 0; x < puzzle.length; x++) {
        for (let y = 0; y < puzzle[x].length; y++) {
            let num = parseInt(puzzle[x][y])
             if (!isNaN(num) && num>0) {
                countStart += num
             }
        }
    }
    
    if (countStart != words.length) {
        // console.log(countStart, "  ",words.length)
        return false
    }

    if (validPattern.test(puzzle)) {
        return true
    }
    // console.log("Hehelala")
    return false
}

function validWords(words) {
    if (!Array.isArray(words)) {
        // console.log("Hehehehe")
        return false
    }
    const uniqueWords = new Set(words)

    if (uniqueWords.size != words.length) {
        // console.log("lalalala")
        return false
    }
    return true
}


function canPlaceWord(puzzle, position, word) {

    if (position.direction === 'horizontal') {
        if (word.length > puzzle[position.row].slice(position.col).length) return false;
        for (let i = 0; i < word.length; i++) {
            let char = puzzle[position.row][position.col+i]
            if (isNaN(char) && char != word[i]) {
                return false;
            }
        }
    } else {
        if (position.row + word.length > puzzle.length) return false;
        for (let i = 0; i < word.length; i++) {
            let char = puzzle[position.row + i][position.col]
            if (isNaN(char) && char != word[i]) {
                return false;
            }
        }
    }

    return true;
}

function placeWord(puzzle, position, word) {
    if (position.direction === 'horizontal') {
        for (let i = 0; i < word.length; i++) {
            puzzle[position.row][position.col + i] = word[i];
        }
    } else {
        for (let i = 0; i < word.length; i++) {
            puzzle[position.row + i][position.col] = word[i];
        }
    }
}



function validHorizontal(puzzle, x, y) {
    if (y > 0 && puzzle[x][y-1] !== '.') return false;
    if (y < puzzle[x].length - 1 && puzzle[x][y + 1] != '.') {
        return true
    }
    return false
}

function validVertical(puzzle, x, y) {
    if (x > 0 && puzzle[x-1][y] !== '.') return false;
    if (x < puzzle.length - 1 && puzzle[x + 1][y] != '.') {
       return true
    }
    return false
}

function culculength(col, row, puzzle, word, direction) {
    let c = 0;
    if (direction === 'horizontal') {
        for (let clum = col; clum < puzzle[row].length; clum++) {
            if (puzzle[row][clum] !== '.') {
                c++;
            } else {
                break;
            }
        }
    } else if (direction === 'vertical') {
        for (let rows = row; rows < puzzle.length; rows++) {
            if (puzzle[rows][col] !== '.') {
                c++;
            } else {
                break;
            }
        }
    }
    return word.length === c;
}


const puzzle = '2000\n0...\n0...\n0...'
const words = ['abba', 'assa']

crosswordSolver(puzzle, words)