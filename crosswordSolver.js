const puzzle = `10000..1000`
const words = [
    'eggs',
    'pasta',
]


function crosswordSolver(emptyPuzzle, words) {
    let lines = emptyPuzzle.split('\n')
    let puzzle = lines.map((line) => line.split(''))
    let start = getStartPosition(puzzle)
    console.log(puzzle)
    console.log(start)
    let place = []

    for (const word of words) {
        let placed = false;
        for (let row = 0; row < puzzle.length; row++) {
            for (let col = 0; col < puzzle[row].length; col++) {
                if (canPlaceWord(puzzle, word, row, col, 'horizontal', start) && culculength(col, row, puzzle) === word.length) {
                    placed = placeWord(puzzle, word, row, col, 'horizontal');
                    console.log(puzzle)
                    // placed = true;
                    break;
                } else if (canPlaceWord(puzzle, word, row, col, 'vertical', start)) {
                    placeWord(puzzle, word, row, col, 'vertical');
                    placed = true;
                    break;
                }
            }
            if (placed) break;
        }
        // if (!placed) {
        //     console.log('Error');
        //     return;
        // }
    }
    return puzzle.join('')

    
}
function placeWord(puzzle, word, row, col, direction) {
    for (let i = 0; i < word.length; i++) {
        if (i == word.length-1 && i<puzzle[row].length && puzzle[row][col + i +1] == '0') {
            return false
        } else {
            puzzle[row][col + i] = word[i]; 
        }
        
    }
    return true
}

function canPlaceWord(puzzle, word, row, col, direction, start) {
    let canStart = false
    for (idx in start) {
        if (start[idx][1]== row && start[idx][2]== col) {
            canStart = true
        }
    }
    if (direction === 'horizontal' && canStart) {
        if (word.length <= puzzle[row].slice(col).length) {
            console.log("word: ", word)
            for (let i = 0; i < word.length; i++) {
                if (puzzle[row][+col + i] == '.' && (puzzle[row][+col + i+1] != '.' && i< word.length)) {
                    return false;
                }
            }
            return true;
        }
    } else if (direction === 'vertical') {
        if (word.length > puzzle.length-row) return false;
        for (let i = 0; i < word.length; i++) {
            if ( puzzle[row + i][col] == '.' ) {
                return false;
            }
        }
    }
    return false;


  /*   let [numW, row, col] = start;
    console.log(puzzle[row].slice(col))
    if (word.length <= puzzle[row].slice(col).length) {
        console.log("word: ", word)
        for (let i = 0; i < word.length; i++) {
            if (puzzle[row][+col + i] == '.' && (puzzle[row][+col + i+1] != '.' && i< word.length)) {
                return false;
            } else {
                console.log(word, "err")
            }
        }
        return true;
    }


    if (row + word.length <= puzzle.length - row) {
        for (let i = 0; i < word.length; i++) {
            if (puzzle[+row + i][col] == '.') {
                return false;
            }
        }
        return true;
    }

    return false; */

}

function culculength(col,row, puzzle) {
    let c =0
    for (let clum = col;clum < puzzle[row].length; clum++) {
       if (puzzle[row][clum]!='.'){
        c++
       }else{
        break
       }
        
    }
    return c
}

function getStartPosition(puzzle) {
    let start = []
    let x = 0
    for (let rows in puzzle) {
        for (let cols in puzzle[rows]) {
            if (puzzle[rows][cols] != '.' && puzzle[rows][cols] != '0') {
                start.push([puzzle[rows][cols], rows, cols])
            }
        }
    }
    return start
}

console.log(crosswordSolver(puzzle, words))