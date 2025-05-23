import matplotlib.pyplot as plt
import heapq
from collections import deque

def parse_maze_file(filename):
    """Parse le fichier labyrinthe et retourne les dimensions et les données"""
    with open(filename, 'r') as f:
        lines = f.readlines()
    
    # Extraire les dimensions de la première ligne
    first_line = lines[0].strip()
    if 'Largeur:' in first_line and 'Hauteur:' in first_line:
        parts = first_line.split()
        width = int(parts[1].rstrip(','))
        height = int(parts[3])
    else:
        # Si pas de header, deviner les dimensions
        width, height = 188, 74
    
    # Parser les données du labyrinthe
    maze_data = []
    for line in lines[1:]:  # Ignorer la première ligne (header)
        if line.strip():  # Ignorer les lignes vides
            row = list(map(int, line.strip().split()))
            if row:  # Ignorer les lignes vides
                maze_data.append(row)
    
    return width, height, maze_data

def can_move(maze_data, from_row, from_col, to_row, to_col):
    """Vérifie si on peut se déplacer d'une cellule à une autre"""
    height = len(maze_data)
    width = len(maze_data[0]) if maze_data else 0
    
    # Vérifier les limites
    if to_row < 0 or to_row >= height or to_col < 0 or to_col >= width:
        return False
    
    # Constantes pour les directions
    NORTH = 1
    EAST = 2
    SOUTH = 4
    WEST = 8
    
    current_cell = maze_data[from_row][from_col]
    
    # Vérifier le mouvement selon la direction
    if to_row == from_row - 1 and to_col == from_col:  # Mouvement vers le Nord
        return not (current_cell & NORTH)
    elif to_row == from_row + 1 and to_col == from_col:  # Mouvement vers le Sud
        return not (current_cell & SOUTH)
    elif to_row == from_row and to_col == from_col + 1:  # Mouvement vers l'Est
        return not (current_cell & EAST)
    elif to_row == from_row and to_col == from_col - 1:  # Mouvement vers l'Ouest
        return not (current_cell & WEST)
    
    return False

def heuristic(pos1, pos2):
    """Distance de Manhattan entre deux positions"""
    return abs(pos1[0] - pos2[0]) + abs(pos1[1] - pos2[1])

def find_shortest_path_astar(maze_data, start=(0, 0), end=None):
    """Trouve le plus court chemin avec l'algorithme A*"""
    height = len(maze_data)
    width = len(maze_data[0]) if maze_data else 0
    
    if end is None:
        end = (height - 1, width - 1)
    
    # Priority queue: (f_score, g_score, position, path)
    open_set = [(0, 0, start, [start])]
    closed_set = set()
    g_scores = {start: 0}
    
    directions = [(-1, 0), (1, 0), (0, 1), (0, -1)]  # Nord, Sud, Est, Ouest
    
    while open_set:
        f_score, g_score, current, path = heapq.heappop(open_set)
        
        if current in closed_set:
            continue
            
        closed_set.add(current)
        
        # Si on a atteint la destination
        if current == end:
            return path, len(path)
        
        # Explorer les voisins
        for dr, dc in directions:
            neighbor = (current[0] + dr, current[1] + dc)
            
            if neighbor in closed_set:
                continue
            
            # Vérifier si le mouvement est possible
            if not can_move(maze_data, current[0], current[1], neighbor[0], neighbor[1]):
                continue
            
            tentative_g_score = g_score + 1
            
            if neighbor not in g_scores or tentative_g_score < g_scores[neighbor]:
                g_scores[neighbor] = tentative_g_score
                f_score = tentative_g_score + heuristic(neighbor, end)
                new_path = path + [neighbor]
                heapq.heappush(open_set, (f_score, tentative_g_score, neighbor, new_path))
    
    return None, 0  # Aucun chemin trouvé

def find_shortest_path_bfs(maze_data, start=(0, 0), end=None):
    """Alternative avec BFS (plus simple mais potentiellement plus lent)"""
    height = len(maze_data)
    width = len(maze_data[0]) if maze_data else 0
    
    if end is None:
        end = (height - 1, width - 1)
    
    queue = deque([(start, [start])])
    visited = {start}
    
    directions = [(-1, 0), (1, 0), (0, 1), (0, -1)]  # Nord, Sud, Est, Ouest
    
    while queue:
        current, path = queue.popleft()
        
        if current == end:
            return path, len(path)
        
        for dr, dc in directions:
            neighbor = (current[0] + dr, current[1] + dc)
            
            if neighbor in visited:
                continue
            
            if not can_move(maze_data, current[0], current[1], neighbor[0], neighbor[1]):
                continue
            
            visited.add(neighbor)
            new_path = path + [neighbor]
            queue.append((neighbor, new_path))
    
    return None, 0  # Aucun chemin trouvé

def draw_maze_matplotlib(maze_data, cell_size=1):
    """Dessine le labyrinthe avec matplotlib (sans chemin)"""
    height = len(maze_data)
    width = len(maze_data[0]) if maze_data else 0
    
    fig, ax = plt.subplots(figsize=(width/10, height/10))
    ax.set_xlim(0, width)
    ax.set_ylim(0, height)
    ax.set_aspect('equal')
    ax.axis('off')
    
    # Constantes pour les directions
    NORTH = 1
    EAST = 2
    SOUTH = 4
    WEST = 8
    
    for row_idx, row in enumerate(maze_data):
        for col_idx, cell_value in enumerate(row):
            x = col_idx
            y = height - row_idx - 1  # Inverser Y pour affichage correct
            
            # Dessiner les murs selon les bits activés
            if cell_value & NORTH:  # Mur Nord
                ax.plot([x, x + cell_size], [y + cell_size, y + cell_size], 'k-', linewidth=1)
            
            if cell_value & EAST:   # Mur Est
                ax.plot([x + cell_size, x + cell_size], [y, y + cell_size], 'k-', linewidth=1)
            
            if cell_value & SOUTH:  # Mur Sud
                ax.plot([x, x + cell_size], [y, y], 'k-', linewidth=1)
            
            if cell_value & WEST:   # Mur Ouest
                ax.plot([x, x], [y, y + cell_size], 'k-', linewidth=1)
    
    plt.title(f'Labyrinthe {width}x{height}')
    plt.tight_layout()
    plt.show()

def draw_maze_with_path(maze_data, path=None, cell_size=1):
    """Dessine le labyrinthe avec le chemin optimal"""
    height = len(maze_data)
    width = len(maze_data[0]) if maze_data else 0
    
    fig, ax = plt.subplots(figsize=(width/10, height/10))
    ax.set_xlim(0, width)
    ax.set_ylim(0, height)
    ax.set_aspect('equal')
    ax.axis('off')
    
    # Constantes pour les directions
    NORTH = 1
    EAST = 2
    SOUTH = 4
    WEST = 8
    
    # Dessiner le labyrinthe
    for row_idx, row in enumerate(maze_data):
        for col_idx, cell_value in enumerate(row):
            x = col_idx
            y = height - row_idx - 1  # Inverser Y pour affichage correct
            
            # Dessiner les murs selon les bits activés
            if cell_value & NORTH:  # Mur Nord
                ax.plot([x, x + cell_size], [y + cell_size, y + cell_size], 'k-', linewidth=1)
            
            if cell_value & EAST:   # Mur Est
                ax.plot([x + cell_size, x + cell_size], [y, y + cell_size], 'k-', linewidth=1)
            
            if cell_value & SOUTH:  # Mur Sud
                ax.plot([x, x + cell_size], [y, y], 'k-', linewidth=1)
            
            if cell_value & WEST:   # Mur Ouest
                ax.plot([x, x], [y, y + cell_size], 'k-', linewidth=1)
    
    # Dessiner le chemin optimal
    if path:
        path_x = []
        path_y = []
        for row, col in path:
            path_x.append(col + 0.5)  # Centre de la cellule
            path_y.append(height - row - 1 + 0.5)  # Inverser Y et centrer
        
        ax.plot(path_x, path_y, 'r-', linewidth=3, alpha=0.7, label='Plus court chemin')
        
        # Marquer le départ et l'arrivée
        ax.plot(path_x[0], path_y[0], 'go', markersize=8, label='Départ')
        ax.plot(path_x[-1], path_y[-1], 'ro', markersize=8, label='Arrivée')
        
        ax.legend()
    
    plt.title(f'Labyrinthe {width}x{height}' + (f' - Chemin: {len(path)} cases' if path else ''))
    plt.tight_layout()
    plt.show()

# Version Turtle (alternative)
import turtle

def draw_maze_turtle(maze_data, cell_size=10):
    """Dessine le labyrinthe avec turtle"""
    screen = turtle.Screen()
    screen.setup(1200, 800)
    screen.bgcolor("white")
    
    pen = turtle.Turtle()
    pen.speed(0)
    pen.pensize(1)
    pen.color("black")
    
    height = len(maze_data)
    width = len(maze_data[0]) if maze_data else 0
    
    # Positionner au coin supérieur gauche
    start_x = -width * cell_size // 2
    start_y = height * cell_size // 2
    
    # Constantes pour les directions
    NORTH = 1
    EAST = 2
    SOUTH = 4
    WEST = 8
    
    for row_idx, row in enumerate(maze_data):
        for col_idx, cell_value in enumerate(row):
            x = start_x + col_idx * cell_size
            y = start_y - row_idx * cell_size
            
            # Dessiner les murs selon les bits
            if cell_value & NORTH:  # Mur Nord
                pen.penup()
                pen.goto(x, y)
                pen.pendown()
                pen.goto(x + cell_size, y)
            
            if cell_value & EAST:   # Mur Est
                pen.penup()
                pen.goto(x + cell_size, y)
                pen.pendown()
                pen.goto(x + cell_size, y - cell_size)
            
            if cell_value & SOUTH:  # Mur Sud
                pen.penup()
                pen.goto(x + cell_size, y - cell_size)
                pen.pendown()
                pen.goto(x, y - cell_size)
            
            if cell_value & WEST:   # Mur Ouest
                pen.penup()
                pen.goto(x, y - cell_size)
                pen.pendown()
                pen.goto(x, y)
    
    pen.hideturtle()
    screen.exitonclick()

def main():
    """Fonction principale avec menu interactif"""
    try:
        # Charger le labyrinthe
        width, height, maze_data = parse_maze_file('Labyrinthe4.txt')
        print("=" * 50)
        print("🏰 SOLVEUR DE LABYRINTHE")
        print("=" * 50)
        print(f"📁 Fichier chargé: Labyrinthe4.txt")
        print(f"📏 Dimensions: {width}x{height} cellules")
        print(f"📊 Données réelles: {len(maze_data[0]) if maze_data else 0}x{len(maze_data)} cellules")
        print()
        
        while True:
            print("🎮 MENU:")
            print("1. Afficher le labyrinthe seul")
            print("2. Résoudre avec A* et afficher le chemin")
            print("3. Résoudre avec BFS et afficher le chemin")
            print("4. Afficher avec Turtle (plus lent)")
            print("5. Statistiques détaillées")
            print("0. Quitter")
            
            choice = input("\n👉 Votre choix: ").strip()
            
            if choice == "1":
                print("🎨 Affichage du labyrinthe...")
                draw_maze_matplotlib(maze_data)
                
            elif choice == "2":
                print("🔍 Résolution avec A*...")
                start = (0, 0)
                end = (len(maze_data) - 1, len(maze_data[0]) - 1)
                
                path, path_length = find_shortest_path_astar(maze_data, start, end)
                
                if path:
                    print(f"✅ Chemin trouvé avec A*!")
                    print(f"📏 Longueur: {path_length} cases")
                    print(f"🎯 De {start} à {end}")
                    draw_maze_with_path(maze_data, path)
                else:
                    print("❌ Aucun chemin trouvé!")
                    
            elif choice == "3":
                print("🔍 Résolution avec BFS...")
                start = (0, 0)
                end = (len(maze_data) - 1, len(maze_data[0]) - 1)
                
                path, path_length = find_shortest_path_bfs(maze_data, start, end)
                
                if path:
                    print(f"✅ Chemin trouvé avec BFS!")
                    print(f"📏 Longueur: {path_length} cases")
                    print(f"🎯 De {start} à {end}")
                    draw_maze_with_path(maze_data, path)
                else:
                    print("❌ Aucun chemin trouvé!")
                    
            elif choice == "4":
                print("🐢 Affichage avec Turtle...")
                print("⚠️  Cela peut être lent pour un grand labyrinthe!")
                confirm = input("Continuer? (o/n): ").lower()
                if confirm == 'o':
                    draw_maze_turtle(maze_data, cell_size=3)
                    
            elif choice == "5":
                print("📊 STATISTIQUES DÉTAILLÉES:")
                print("-" * 30)
                
                # Calculer les statistiques
                total_cells = len(maze_data) * len(maze_data[0])
                
                # Compter les murs
                wall_count = 0
                for row in maze_data:
                    for cell in row:
                        wall_count += bin(cell).count('1')
                
                print(f"📐 Dimensions: {len(maze_data[0])}x{len(maze_data)}")
                print(f"🔢 Total de cellules: {total_cells}")
                print(f"🧱 Total de murs: {wall_count}")
                print(f"📊 Densité de murs: {wall_count/(total_cells*4)*100:.1f}%")
                
                # Tester les deux algorithmes
                start = (0, 0)
                end = (len(maze_data) - 1, len(maze_data[0]) - 1)
                
                import time
                
                # Test A*
                start_time = time.time()
                path_astar, length_astar = find_shortest_path_astar(maze_data, start, end)
                time_astar = time.time() - start_time
                
                # Test BFS
                start_time = time.time()
                path_bfs, length_bfs = find_shortest_path_bfs(maze_data, start, end)
                time_bfs = time.time() - start_time
                
                print(f"\n🏁 RÉSULTATS DE RÉSOLUTION:")
                print(f"A* - Longueur: {length_astar}, Temps: {time_astar:.4f}s")
                print(f"BFS - Longueur: {length_bfs}, Temps: {time_bfs:.4f}s")
                
                if path_astar and path_bfs:
                    print(f"✅ Les deux algorithmes trouvent le même résultat: {length_astar == length_bfs}")
                
            elif choice == "0":
                print("👋 Au revoir!")
                break
                
            else:
                print("❌ Choix invalide!")
            
            print("\n" + "="*50 + "\n")
        
    except FileNotFoundError:
        print("❌ Fichier 'Labyrinthe4.txt' non trouvé!")
        print("📁 Assurez-vous que le fichier est dans le même dossier que ce script.")
    except Exception as e:
        print(f"❌ Erreur: {e}")

if __name__ == "__main__":
    main()
