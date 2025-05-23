import os

file = open("./Algo/Python/ex.txt", "r", encoding="latin-1")

line = file.readline().strip().split()
n = int(line[0])
k = int(line[1])
coordonnées = [[(i,j) for j in range(n)] for i in range(n)]

r = []
line = file.readline().split(" ")
for i in range(k):
    r.append(eval(line[i].strip()))

line = file.readline().strip().split(" ")
d = [int(i) for i in line]

can_go = [8, 4, 2, 1]
sso = [[int(i) for i in line.strip().split(' ')] for line in file]

def openings(x, y):
    corr = []
    val = sso[x][y]
    if (val & 8) == 1 and x - 1 >= 0:
        corr.append((x - 1, y))  # North
    if (val & 4) == 1 and y + 1 < n:
        corr.append((x, y + 1))  # East
    if (val & 2) == 1 and x + 1 < n:
        corr.append((x + 1, y))  # South
    if (val & 1) == 1 and y - 1 >= 0:
        corr.append((x, y - 1))  # West
    return corr

def locations(i):
    loc = set([r[i]])
    for a in range(d[i]):
        path = loc.copy()
        for x, y in path:
            loc.update(openings(x, y))
    return sorted(loc)

r0 = locations(0)
r1 = locations(1)
r2 = locations(2)

print('r0:', r0)
print('r1:', r1)
print('r2:', r2)

for i in r0:
    if i in r1 and i in r2:
        print('Intersection:', i)

print(openings(0, 1))