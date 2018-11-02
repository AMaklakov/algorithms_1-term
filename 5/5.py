import numpy as np


def hasUnmarkedEdge(matrix, size):
	for i in range(size):
		if np.sum(matrix[i]) > 0:
			return True
	return False


class Graph:
	def __init__(self, verticesTotal):
		if verticesTotal <= 0:
			verticesTotal = 1

		self.verticesTotal = verticesTotal
		self.table = np.matrix([([0] * verticesTotal) for i in range(verticesTotal)])

	def addVertex(self):
		for i in range(self.verticesTotal):
			self.table[i].append(0)

		self.verticesTotal += 1
		self.table.append([0] * self.verticesTotal)

	def deleteVertex(self, vertex=-1):
		if self.checkVertexNumber(vertex) == False:
			print("deleteVertex: Vertex is out of range")
			return

		index = vertex - 1

		self.verticesTotal -= 1
		# deletes row[index] by axis of 0 - x
		self.table = np.delete(self.table, index, 0)
		# deletes row[index] by axis of 1 - y
		self.table = np.delete(self.table, index, 1)

	def addEdge(self, vertex1=-1, vertex2=-1):
		if self.checkVertexNumber(vertex1) == False or self.checkVertexNumber(vertex2) == False:
			print("addEdge: Any of vertices is out of range!")
			return

		if vertex1 == vertex2:
			print("I can not do this!")
			return

		index1 = vertex1 - 1
		index2 = vertex2 - 1

		self.table[index1, index2] = 1
		self.table[index2, index1] = 1

	def deleteEdge(self, vertex1=-1, vertex2=-1):
		if self.checkVertexNumber(vertex1) == False or self.checkVertexNumber(vertex2) == False:
			print("deleteEdge: Any of vertices is out of range!")
			return

		if vertex1 == vertex2:
			print("I can not do this!")
			return

		index1 = vertex1 - 1
		index2 = vertex2 - 1

		if self.table[index1, index2] == 0 and self.table[index2, index1] == 0:
			print("There is no such edge in graph!")
			return

		self.table[index1, index2] = 0
		self.table[index2, index1] = 0

	def getVertexDegree(self, vertex):
		if self.checkVertexNumber(vertex) == False:
			print("getVertexDegree: Vertex is out of range")
			return

		return np.sum(self.table[vertex - 1])

	def getIndexOfFirstVertexWithOddDegree(self):
		for i in range(self.verticesTotal):
			if self.getVertexDegree(i + 1) % 2 != 0:
				return i
		return 0

	def checkVertexNumber(self, number):
		if number > 0 and number <= self.verticesTotal:
			return True
		return False

	def hasEulerPath(self):
		numberOddDegreeVertices = 0
		for i in range(self.verticesTotal):
			if self.getVertexDegree(i + 1):
				numberOddDegreeVertices += 1
		return [True, False] [numberOddDegreeVertices % 2 == 0]

	def getEulerPath(self):
		if self.hasEulerPath() == False:
			print("This graph has no Euler's path!")
			return None

		for i in range(self.verticesTotal):
			if self.getVertexDegree(i + 1) == 0:
				print("Vertix {} is isolated".format(i + 1))
				return

		# Make table copy
		tableCopy = np.matrix(self.table)
		
		# Start with first vertex of odd degree
		stack = [self.getIndexOfFirstVertexWithOddDegree() + 1]
		res = []

		while stack:
			current = stack[-1]
			
			if self.getVertexDegree(current) == 0:
				res.append(stack.pop())
			else:
				vertex = list(self.table[current - 1].A1).index(1) + 1
				self.deleteEdge(current, vertex)
				stack.append(vertex)

		# update table
		self.table = tableCopy
		return res


	def bfs(self, vertex=1):
		if self.checkVertexNumber(vertex) == False:
			print("bfs: Vertex is out of range")
			return

		# Make table copy
		tableCopy = np.matrix(self.table)

		marks = [None] * self.verticesTotal


		currentMark = 0
		marks[vertex - 1] = currentMark

		while None in marks:
			for i in range(self.verticesTotal):
				if marks[i] == currentMark:
					for k in range(self.verticesTotal):
						if self.table[i, k] == 1 and marks[k] == None:
							marks[k] = currentMark + 1
							self.deleteEdge(i+1, k+1)
						elif self.table[i, k] == 1 and marks[k] != None:
							self.deleteEdge(i+1, k+1)
			currentMark += 1

		# update table
		self.table = tableCopy

		return marks
# -------------- LOGIC -------------------


g = Graph(7)
# print(g.table)

print("Initial state:")
g.addEdge(1, 2)
g.addEdge(1, 4)
g.addEdge(2, 3)
g.addEdge(2, 4)
g.addEdge(2, 5)
g.addEdge(3, 5)
g.addEdge(4, 5)
g.addEdge(4, 6)
g.addEdge(5, 7)
g.addEdge(6, 7)
print(g.table)

print("- - - - - - - - - - - - - -")

print "Euler's path:", g.getEulerPath()

print("- - - - - - - - - - - - - -")

print "BFS: from vertex", 5, g.bfs(5)
