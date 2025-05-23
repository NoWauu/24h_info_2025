import os

mat = []
file = open("./Algo/Python/grid22.txt", "r", encoding="utf-16")

for line in file:
    if line.startswith("start"):
        continue
    if line:
        mat.append([int(x) for x in line.split()])
file.close()
mat.pop()

green = []

red = -1

start = (58, 94)

green.append(mat[start[0]][start[1]])

while red == -1 :
    tmp = green[-1]
    x = tmp%300
    y = 300 - x
    if mat[x][y] in green:
        red = mat[x][y]
    green.append(mat[x][y])

print("answer: ", red)