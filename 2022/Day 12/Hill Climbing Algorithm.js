// --- Day 12: Hill Climbing Algorithm ---
// You try contacting the Elves using your handheld device, but the river you're following must be too low to get a decent signal.

// You ask the device for a heightmap of the surrounding area (your puzzle input). The heightmap shows the local area from above broken into a grid; the elevation of each square of the grid is given by a single lowercase letter, where a is the lowest elevation, b is the next-lowest, and so on up to the highest elevation, z.

// Also included on the heightmap are marks for your current position (S) and the location that should get the best signal (E). Your current position (S) has elevation a, and the location that should get the best signal (E) has elevation z.

// You'd like to reach E, but to save energy, you should do it in as few steps as possible. During each step, you can move exactly one square up, down, left, or right. To avoid needing to get out your climbing gear, the elevation of the destination square can be at most one higher than the elevation of your current square; that is, if your current elevation is m, you could step to elevation n, but not to elevation o. (This also means that the elevation of the destination square can be much lower than the elevation of your current square.)

// For example:

// Sabqponm
// abcryxxl
// accszExk
// acctuvwj
// abdefghi
// Here, you start in the top-left corner; your goal is near the middle. You could start by moving down or right, but eventually you'll need to head toward the e at the bottom. From there, you can spiral around to the goal:

// v..v<<<<
// >v.vv<<^
// .>vv>E^^
// ..v>>>^^
// ..>>>>>^
// In the above diagram, the symbols indicate whether the path exits each square moving up (^), down (v), left (<), or right (>). The location that should get the best signal is still E, and . marks unvisited squares.

// This path reaches the goal in 31 steps, the fewest possible.

// What is the fewest steps required to move from your current position to the location that should get the best signal?

const input =
[
    ['a','b','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','a','a','c','c','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a'],
    ['a','b','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','a','a','c','c','c','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a'],
    ['a','b','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','a','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','a','a','a','c','a','a','c','c','c','c','c','c','c','c','c','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a'],
    ['a','b','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a'],
    ['a','b','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','a','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','c'],
    ['a','b','a','a','c','c','a','a','c','c','c','c','a','a','c','c','a','a','a','c','c','c','c','c','c','c','c','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','c','a','a','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','a','a','a','l','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','c'],
    ['a','b','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','a','a','c','c','c','c','c','c','c','c','a','a','a','a','a','a','c','c','c','a','a','a','a','c','c','c','a','a','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','a','l','l','l','l','l','l','l','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c'],
    ['a','b','a','a','a','a','a','a','c','c','c','c','c','c','c','a','a','a','c','c','c','c','c','c','c','c','c','a','a','a','a','c','c','c','c','c','c','a','a','a','c','c','c','c','a','a','a','a','a','c','c','c','c','c','c','c','c','c','a','a','c','c','c','c','c','c','c','a','a','a','a','k','l','l','l','l','l','l','l','l','c','c','c','c','c','c','c','a','a','c','c','c','c','c'],
    ['a','b','a','a','a','a','a','a','c','c','c','c','c','c','c','a','a','a','a','c','c','c','c','c','c','c','c','c','a','a','c','c','c','c','c','c','c','a','a','a','c','c','c','c','a','a','a','a','a','c','c','c','c','c','c','c','c','c','a','a','c','c','c','c','c','c','c','a','a','k','k','k','l','l','l','p','l','l','l','l','c','c','c','c','a','c','a','a','a','c','c','c','c','c'],
    ['a','b','a','a','a','a','a','a','a','c','c','c','c','c','c','a','a','a','a','c','c','c','c','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','k','k','k','k','p','p','p','p','p','p','l','l','l','c','c','c','a','a','a','a','a','a','c','c','c','c'],
    ['a','b','a','a','a','a','a','a','a','c','a','a','a','c','c','a','a','a','a','c','c','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','c','c','c','c','c','c','c','a','a','a','c','c','c','c','c','k','k','k','k','k','k','k','p','p','p','p','p','p','p','p','l','l','l','c','d','d','a','a','a','a','a','c','c','c','c'],
    ['a','b','c','a','a','a','a','c','c','c','a','a','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','c','c','c','c','c','a','a','a','c','c','c','c','c','c','c','c','a','a','a','a','a','a','c','c','c','c','c','c','c','a','a','a','a','c','c','j','k','k','k','k','k','k','k','p','p','p','p','p','u','p','p','p','l','m','m','d','d','d','d','d','a','a','a','c','c','c','c'],
    ['a','b','c','c','a','a','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','a','a','a','a','a','a','c','c','c','c','a','a','a','a','a','a','c','c','c','c','c','c','c','a','a','a','c','c','c','c','c','c','c','c','c','a','a','a','a','j','j','j','k','k','k','k','k','r','p','p','p','u','u','u','u','u','p','p','p','m','m','m','d','d','d','d','d','a','c','c','c','c','c'],
    ['a','b','c','c','c','c','a','a','a','a','a','a','a','a','c','c','c','c','c','c','c','a','a','a','a','a','c','c','c','c','c','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','c','j','j','j','j','r','r','r','r','r','r','p','p','u','u','u','u','u','p','q','q','m','m','m','m','m','d','d','d','d','a','c','c','c','c'],
    ['a','b','c','c','c','c','a','a','a','a','a','a','a','a','a','c','c','c','c','c','c','c','a','a','a','a','c','c','c','c','c','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','j','j','j','r','r','r','r','r','r','r','r','p','u','u','u','x','u','v','v','q','q','q','m','m','m','m','m','d','d','d','d','c','c','c','c'],
    ['a','b','c','c','c','c','a','a','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','c','c','c','c','a','a','c','c','c','a','c','c','c','c','c','c','c','c','a','a','c','c','j','j','j','r','r','r','r','u','u','u','u','u','u','u','x','x','y','v','v','q','q','q','q','q','m','m','m','m','m','d','d','c','c','c','c'],
    ['a','b','c','c','c','c','a','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','a','a','a','c','c','c','c','c','c','a','a','c','a','a','c','c','c','c','a','a','a','c','a','a','c','c','c','a','a','a','c','a','a','a','c','c','j','j','j','r','r','r','t','u','u','u','u','u','u','u','x','x','y','v','v','v','q','q','q','q','q','m','m','m','m','d','d','c','c','c','c'],
    ['a','b','c','c','a','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','c','c','c','a','a','a','a','a','a','a','c','c','j','j','j','r','r','t','t','t','t','x','x','x','x','x','x','y','y','v','v','v','v','v','q','q','q','q','m','m','m','m','d','e','c','c','c'],
    ['a','b','c','c','a','a','a','c','c','a','a','a','c','c','c','c','c','c','c','c','a','a','c','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','c','c','c','a','a','a','a','a','a','c','c','c','j','j','j','r','r','t','t','t','x','x','x','x','x','x','x','y','y','v','v','v','v','v','v','v','q','q','q','m','m','m','e','e','c','c','c'],
    ['a','b','a','a','a','a','a','a','a','a','a','a','c','c','c','a','a','a','c','c','a','a','a','a','a','a','a','a','a','a','a','c','c','a','a','a','c','c','c','c','a','a','a','a','a','a','a','a','c','c','c','a','a','a','a','a','a','a','a','j','j','j','q','q','r','t','t','x','x','x','x','x','x','x','y','y','y','y','y','y','v','v','v','q','q','q','n','n','n','e','e','c','c','c'],
    ['S','b','a','a','a','a','a','a','a','a','c','c','c','c','a','a','a','a','c','c','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','a','c','c','c','a','a','a','a','a','a','a','a','c','c','a','a','a','a','a','a','a','a','a','c','j','j','j','q','q','t','t','t','x','x','x','x','E','z','z','y','y','y','y','v','v','v','v','q','q','q','n','n','n','e','e','c','c','c'],
    ['a','b','c','a','a','a','a','a','a','c','c','c','c','c','a','a','a','a','c','c','c','c','a','a','a','a','a','a','a','c','c','a','a','a','a','a','a','c','c','c','c','c','c','a','a','c','c','c','c','a','a','a','a','a','a','a','a','a','a','c','i','i','i','q','q','q','t','t','t','x','x','x','y','y','y','y','y','y','v','v','v','v','r','r','r','n','n','n','e','e','c','c','c','c'],
    ['a','b','c','a','a','a','a','a','a','c','c','c','c','c','a','a','a','a','c','c','c','a','a','a','a','a','a','a','a','c','c','a','a','a','a','a','a','c','c','c','c','c','c','a','a','c','c','c','c','a','a','a','c','a','a','a','c','c','c','c','i','i','i','q','q','q','q','t','t','x','x','y','y','y','y','y','y','w','v','v','v','r','r','r','n','n','n','e','e','e','c','c','c','c'],
    ['a','b','c','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','a','a','a','c','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','c','c','c','c','c','i','i','i','q','q','t','t','t','x','x','y','y','y','y','y','y','w','w','r','r','r','r','n','n','n','n','e','e','e','c','c','c','c'],
    ['a','b','c','a','a','a','c','a','a','c','c','c','c','c','a','a','c','c','c','c','c','a','a','a','a','a','a','a','a','a','c','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','c','c','c','c','c','i','i','i','q','q','t','t','x','x','x','y','w','w','y','y','y','w','w','r','r','r','n','n','n','n','e','e','e','c','c','c','c','c'],
    ['a','b','c','c','c','c','c','c','c','c','a','a','a','c','a','a','c','c','c','c','c','c','c','c','c','c','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','i','i','q','q','q','t','t','x','x','w','w','w','w','w','w','y','w','w','r','r','r','n','n','n','e','e','e','c','c','c','c','c','c'],
    ['a','b','c','c','a','a','c','c','c','c','c','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','c','a','a','i','i','q','q','q','t','t','w','w','w','w','s','s','w','w','w','w','w','r','r','r','n','n','f','f','f','e','c','c','c','c','c','c'],
    ['a','b','a','a','a','a','c','c','c','c','c','c','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','c','c','c','c','c','c','a','a','a','a','a','i','i','q','q','q','t','t','s','s','s','s','s','s','s','w','w','w','w','r','r','r','o','n','f','f','f','a','c','c','c','c','c','c'],
    ['a','b','a','a','a','a','a','a','c','c','c','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','c','c','c','c','c','a','a','a','a','a','i','i','q','q','q','s','s','s','s','s','s','s','s','s','s','s','w','r','r','r','o','o','o','f','f','f','a','a','a','c','c','c','c'],
    ['a','b','a','a','a','a','a','a','c','c','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','c','c','c','c','c','a','a','a','a','a','i','i','q','q','q','p','p','s','s','s','p','p','p','s','s','s','s','r','r','r','o','o','o','f','f','f','a','a','a','c','c','c','c'],
    ['a','b','a','a','a','a','a','a','c','c','a','a','c','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','c','c','c','c','c','a','a','a','a','a','i','i','h','p','p','p','p','p','p','p','p','p','p','p','o','s','s','r','r','o','o','o','f','f','f','a','a','a','a','c','c','c','c'],
    ['a','b','a','a','a','a','c','c','c','c','c','c','c','c','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','c','c','c','c','c','c','c','c','a','a','a','h','h','h','h','p','p','p','p','p','p','p','p','p','p','o','o','o','o','o','o','o','o','f','f','f','a','a','a','a','c','c','c','c'],
    ['a','b','a','a','a','a','c','c','c','c','c','c','c','c','c','c','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','c','c','c','c','c','c','c','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','h','h','h','h','h','h','h','h','h','h','g','g','p','o','o','o','o','o','o','o','f','f','f','f','a','a','a','a','c','c','c','c'],
    ['a','b','c','c','a','a','c','c','c','c','c','c','c','a','c','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','h','h','h','h','h','h','h','h','h','g','g','g','g','o','o','o','o','o','f','f','f','f','a','a','c','a','a','c','c','c','c'],
    ['a','b','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','c','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','h','h','h','h','h','h','h','h','g','g','g','g','g','g','g','g','g','g','f','f','c','a','a','c','c','c','c','c','c','c'],
    ['a','b','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','c','c','c','a','a','c','c','c','c','c','c','c','c','c','c','c','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','g','g','g','g','g','g','g','g','f','c','c','c','c','c','c','c','c','c','c','c'],
    ['a','b','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','c','c','c','c','a','a','c','c','c','c','c','c','c','c','c','a','a','a','a','c','a','a','a','a','c','c','c','c','c','c','c','c','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','c','a','a','a','g','g','g','g','g','c','c','c','c','c','c','c','c','a','c','c','c'],
    ['a','b','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','c','c','c','c','c','a','a','c','c','c','c','c','c','c','c','c','a','a','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','c','c','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','c'],
    ['a','b','c','c','c','c','c','c','c','c','c','c','c','a','a','c','a','a','c','c','a','a','a','a','a','a','a','a','c','c','c','a','a','a','a','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','c','c','c','c','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a'],
    ['a','b','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','c','c','a','a','a','a','a','a','a','a','c','c','a','a','a','a','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a'],
    ['a','b','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a','c','c','c','a','a','a','a','a','a','a','a','a','a','a','a','c','c','c','c','c','c','c','c','c','a','a','c','a','a','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','c','a','a','a','a','a']
];


const numRows = input.length;
const numCols = input[0].length;

//Find start and end
let start, end;

for(var i = 0; i < input.length; i++)
{
    for(var j = 0; j < input[i].length; j++)
    {
        if(input[i][j] == 'S')
        {
            //store start
            start = [i, j];

            //change start on the grid to the lowest elevation, 'a'
            input[i][j] = 'a';
        }
        if(input[i][j] == 'E')
        {
            //store end
            end = [i, j];

            //change start on the grid to the lowest elevation, 'a'
            input[i][j] = 'z';
        }
    }
}



const queue =  [[start, 0]];
const visited = new Set([positionToString(start)]);
let result = -1;

// Direction vectors
var dRow = [-1, 0, 1, 0 ];
var dCol = [0, 1, 0, -1 ];

while(queue.length)
{
    let currPos = queue.shift();
    let pos = currPos[0];
    let steps = currPos[1];

    if(positionToString(pos) === positionToString(end))
    {
        result = steps;
        break;
    }

    let iPos = pos[0];
    let jPos = pos[1];
    for(var i = 0; i < 4; i++)
    {
        var iNeighbor = iPos + dRow[i];
        var jNeighbor = jPos + dCol[i];

        if(isInGrid([iNeighbor, jNeighbor]) && canElevate(pos, [iNeighbor, jNeighbor]) && !visited.has(positionToString([iNeighbor, jNeighbor])))
        {
            queue.push([[iNeighbor, jNeighbor], steps + 1]);
            visited.add(positionToString([iNeighbor, jNeighbor]));
        }
    }
}

console.log(result);

//Helper functions
function positionToString(pos)
{
    return pos[0].toString() + " " + pos[1].toString();
}

function isInGrid(pos)
{
    return pos[0] >= 0 && pos[0] < numRows && pos[1] >= 0 && pos[1] < numCols;
}

function canElevate(currPos, posToCheck)
{
    return input[posToCheck[0]][posToCheck[1]].charCodeAt(0) - input[currPos[0]][currPos[1]].charCodeAt(0) <= 1;
}