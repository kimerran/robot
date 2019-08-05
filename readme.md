# Usage
1. Install dependencies
```
  npm install
```
2. Build the program
```
  npm run build
```
2. Start the program
```
  npm start
```

# Exiting the program
1. On the prompt, press Ctrl+C
```
R0B0T> Program has been terminated
```

# Commands
* place <x,y,f>
  - x: horizontal position (0-based)
  - y: vertical position (0-based)
  - f: face (could be any of the ff: N, S, E, W)

* move
* left
* right
* report
# Running unit tests
1. Install dependencies
```
  npm install
```

2. Run unit tests
```
  npm run test
```

# Test the application
1. Build and start the application
```
  npm install
  npm run build
  npm start
```

2. Issue the following command:
```
R0B0T> place 1,2,E
R0B0T> move
R0B0T> report
2,2,E
R0B0T> left
R0B0T> move
R0B0T> report
2,3,N
R0B0T> right
R0B0T> move
R0B0T> move
R0B0T> report
4,3,E
R0B0T> right
R0B0T> move
R0B0T> move
R0B0T> report
4,1,S
R0B0T> right
R0B0T> move
R0B0T> move
R0B0T> report
2,1,W
R0B0T> left
R0B0T> move
R0B0T> report
2,0,S
R0B0T> move
R0B0T> move
R0B0T> move
R0B0T> report
2,0,S
R0B0T>
```
