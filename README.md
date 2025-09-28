# 🧩 Maze Solver Comparison Tool

A visual comparison tool that demonstrates two popular pathfinding algorithms: **Depth-First Search (DFS)** and **A* (A-Star)** for solving mazes in real-time! 🚀

## ✨ Features

- 🎨 **Interactive Maze Drawing**: Draw your own maze by clicking and dragging on the canvas
- 🔍 **Algorithm Comparison**: Side-by-side visualization of DFS vs A* algorithms
- 🎯 **Real-time Pathfinding**: Watch both algorithms solve the maze simultaneously
- 🔄 **Reset Functionality**: Clear the maze and start over with a fresh canvas
- 📱 **Responsive Design**: Clean, modern interface that works across devices

## 🎮 How to Use

1. **Open the Application**: Launch `compare.html` in your web browser
2. **Draw Your Maze**: 
   - Click and drag on the left canvas to draw walls (blue squares) 🟦
   - The green square 🟩 is the start point (top-left)
   - The red square 🟥 is the end point (bottom-right)
3. **Solve the Maze**: Click the "Solve The Maze" button to see both algorithms in action
4. **Reset**: Click "Reset The Maze" to clear everything and start over

## 🧠 Algorithms Explained

### 🌊 Depth-First Search (DFS)
- **Strategy**: Explores as far as possible along each branch before backtracking
- **Characteristics**: 
  - Simple implementation
  - May not find the shortest path
  - Good for maze generation and exploration

### ⭐ A* (A-Star)
- **Strategy**: Uses heuristics to find the optimal path efficiently
- **Characteristics**:
  - Finds the shortest path
  - More complex but efficient
  - Uses distance estimation to guide search

## 🎨 Visual Legend

| Color | Meaning |
|-------|---------|
| 🟩 Green | Start Point |
| 🟥 Red | End Point |
| 🟦 Blue | Maze Walls |
| ⬜ Gray | Empty Path |
| 🟨 Yellow | Solution Path |
| ⬛ Black | Visited Nodes |

## 🚀 Getting Started

1. **Clone or Download** this repository
2. **Open** `compare.html` in any modern web browser
3. **Start Drawing** your maze and watch the algorithms compete! 🏁

## 📁 Project Structure

```
maze/
├── compare.html    # Main HTML file with UI and styling
├── compare.js      # JavaScript implementation of algorithms
└── README.md       # This file
```

## 🛠️ Technical Details

- **Grid Size**: 20x20 tiles
- **Tile Dimensions**: 20x20 pixels with 3px spacing
- **Canvas Size**: 500x500 pixels per algorithm
- **Supported Directions**: 8-directional movement (including diagonals for A*)

## 🎯 Key Features in Code

- **Interactive Drawing**: Mouse event handlers for maze creation
- **Real-time Rendering**: Canvas updates every 10ms for smooth animation
- **Path Reconstruction**: Backtracking to highlight the solution path
- **Algorithm Isolation**: Separate data structures for each algorithm

## 🤝 Contributing

Feel free to fork this project and add your own pathfinding algorithms! Some ideas:
- 🌟 Dijkstra's Algorithm
- 🔥 Breadth-First Search (BFS)
- ⚡ Jump Point Search
- 🎲 Random Walk

## 📝 License

This project is open source and available under the MIT License.

---

**Happy Maze Solving!** 🎉 Watch as DFS and A* battle it out to find the best path through your custom mazes! 🏆