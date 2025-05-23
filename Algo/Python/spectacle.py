with open("mouvement2.txt", "r") as f:
    data = f.read().splitlines()[0]
    data = data.split(",")

drones = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
drones_init = drones.copy()

def print_drones(drones):
    print(" ".join(drones))

def permut(drones, a, b):
    """
    Permute les positions de deux drones
    """
    d = drones.copy()
    d[d.index(str(a))], d[d.index(str(b))] = d[d.index(str(b))], d[d.index(str(a))]
    return drones

def rotate(drones, a):
    """
    Fait tourner tous les drones ayant comme centre le drone a
    Exemple : rotate(drones, 2) => [3, 2, 1, 4, 5, 6, 7, 8, 9] ou
    rotate(drones, 5) => [9, 8, 7, 6, 5, 4, 3, 2, 1]
    """
    d = drones.copy()
    center = d.index(str(a))
    x, y = center-1, center+1
    while x >= 0 and y < len(d):
        d[x], d[y] = d[y], d[x]
        x -= 1
        y += 1
    return d

def instance(drones):
    for inst in data:
        if len(inst) == 2:
            _, a = [x for x in inst]
            drones = rotate(drones, int(a))
        elif len(inst) == 3:
            _, a, b = [x for x in inst]
            drones = permut(drones, int(a), int(b))
    return drones

count = 1
drones = instance(drones)
while drones != drones_init:
    count += 1
    print(f"Iteration {count}")
    drones = instance(drones)