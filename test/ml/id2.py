from collections import defaultdict

# This class represents a directed graph using adjacency
# list representation
class Graph:

    def __init__(self, vertices):
        # No. of vertices
        self.V = vertices

        # default dictionary to store graph
        self.graph = defaultdict(list)

    # function to add an edge to graph
    def addEdge(self, u, v):
        self.graph[u].append(v)

    # A function to perform a Depth-Limited search
    # from given source 'src' and return the path if found
    def DLS(self, src, target, maxDepth, path):

        # Add the current node to the path
        path.append(src)

        if src == target:
            return True

        # If reached the maximum depth, stop recursing.
        if maxDepth <= 0:
            path.pop()  # Backtrack as we didn't find the target
            return False

        # Recur for all the vertices adjacent to this vertex
        for i in self.graph[src]:
            if self.DLS(i, target, maxDepth - 1, path):
                return True

        # Backtrack as the target was not found at this depth
        path.pop()
        return False

    # IDDFS to search if target is reachable from src and find the path.
    # It uses recursive DLS() and returns the path if found
    def IDDFS(self, src, target, maxDepth):

        # Try different depths starting from 0 to maxDepth
        for i in range(maxDepth):
            path = []  # Store the path at each depth level
            if self.DLS(src, target, i, path):
                return path  # Return the path if found

        return None  # Return None if no path is found within maxDepth

# Create a graph
g = Graph(7)
g.addEdge(0, 1)
g.addEdge(0, 2)
g.addEdge(1, 3)
g.addEdge(1, 4)
g.addEdge(2, 5)
g.addEdge(2, 6)

target = 6
maxDepth = 3
src = 0

# Perform IDDFS to find the path
path = g.IDDFS(src, target, maxDepth)

if path:
    print(f"Target is reachable from source within max depth. Path: {path}")
else:
    print("Target is NOT reachable from source within max depth")
