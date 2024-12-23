const emptyPuzzle = `2001
0..0
1000
0..0`
const words = ['casa', 'alan', 'ciao', 'anta']


function crosswordSolver(emptyPuzzle, words) {
    let lines = emptyPuzzle.split('\n')
    let puzzle = lines.map((line) => line.split(''))
    let start = getStartPosition(puzzle)
    let place = []
    

    for (word of words) {
        let Placed = false
        for (idx in start) {
            if (canPlaceWord(puzzle, start[idx], word)) {
                place.push([word, start[idx]])
            }
        }
    }
    console.log(place)

}

function canPlaceWord(puzzle, start, word) {
    const [numW,row, col] = start;
    if (col + word.length <= puzzle[row].slice(row).length) {
        for (let i = 0; i < word.length; i++) {
            if (cols<word.length-1 && puzzle[row][col + i] == '.') {
                return false; 
            }
        }
        return true; 
    }
    
 
    if (row + word.length <= puzzle.length-row) {
        for (let i = 0; i < word.length; i++) {
            if (row<word.length-1 && puzzle[row + i][col] == '.' ) {
                return false; 
            }
        }
        return true; 
    }
    
    return false;
    
}


function getStartPosition(puzzle) {
    let start = []
    let x = 0
    for (rows in puzzle) {
        for (cols in puzzle[rows]) {
            if (puzzle[rows][cols] != '.' && puzzle[rows][cols] != '0') {
                start.push([puzzle[rows][cols],rows, cols])
            }
        }
    }
    return start
}

console.log(crosswordSolver(emptyPuzzle, words))