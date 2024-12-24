const puzzle = `..1.1..1...
10000..1000
..0.0..0...
..1000000..
..0.0..0...
1000..10000
..0.1..0...
....0..0...
..100000...
....0..0...
....0......`
const words = [
  'popcorn',
  'fruit',
  'flour',
  'chicken',
  'eggs',
  'vegetables',
  'pasta',
  'pork',
  'steak',
  'cheese',
]
function crosswordSolver(emptyPuzzle, words) {
    let lines = emptyPuzzle.split('\n')
    let puzzle = lines.map((line) => line.split(''))
    let start = getStartPosition(puzzle)
    let place = []
    for (const word of words) {
        let placed = false;
        for (let row = 0; row < puzzle.length; row++) {
            for (let col = 0; col < puzzle[row].length; col++) {
                if (canPlaceWord(puzzle, word, row, col, 'horizontal', start) && culculength(col, row, puzzle, word, 'horizontal')) {
                    placeWord(puzzle, word, row, col, 'horizontal');
                    placed = true;
                     break
                } 
                if (canPlaceWord(puzzle, word, row, col, 'vertical', start)&& culculength(col, row, puzzle, word, 'vertical')) {
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
    let printPuzzle = ""
    for (let line of puzzle) {
        printPuzzle += line.join('') + '\n'
    }
    return printPuzzle
    
}
function placeWord(puzzle, word, row, col, direction) {
    if (direction == 'horizontal') {
        for (let i = 0; i < word.length; i++) {
            if (i == word.length-1 && i<puzzle[row].length && puzzle[row][col + i +1] == '0') {
                return false
            } else {
                puzzle[row][col + i] = word[i]; 
            }
        }
    } else if (direction == 'vertical') {
        for (let i = 0; i < word.length; i++) {
            if (i == word.length-1 && i<puzzle.length && puzzle[row+i+1][col] == '0') {
                return false
            } else {
                puzzle[row+i][col] = word[i]; 
            }
        }
    }
    return true
}
function canPlaceWord(puzzle, word, row, col, direction, start) {
                
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
function culculength(col,row, puzzle,word,d) {
    let c =0
    if (d=="horizontal"){
        for (let clum = col;clum < puzzle[row].length; clum++) {
            if (puzzle[row][clum]!='.'){
             c++
            }else{
             break
            }
             
        }
    }else if (d =="vertical"){
        for (let rows = row; rows < puzzle.length; clum++) {
            if (puzzle[rows][col]!='.'){
             c++
            }else{
             break
            }
             
        }
    } 
    if (word.length==c){
        return true
    }
    return false
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