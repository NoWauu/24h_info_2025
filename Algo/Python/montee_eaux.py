import json
from collections import defaultdict

def load_museum_data(filename):
    """Charge les données du musée depuis le fichier JSON"""
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)

def calculate_total_value(artwork):
    """Calcule la valeur totale d'une œuvre selon la formule donnée"""
    return 0.6 * artwork['valeur_artistique'] + 0.4 * artwork['valeur_historique']

def group_by_category(artworks):
    """Groupe les œuvres par catégorie et les trie par valeur décroissante"""
    categories = defaultdict(list)
    
    for artwork in artworks:
        artwork['valeur_totale'] = calculate_total_value(artwork)
        categories[artwork['categorie']].append(artwork)
    
    for category in categories:
        categories[category].sort(key=lambda x: x['valeur_totale'], reverse=True)
    
    return categories

def can_fit_artworks(artworks, room_width, room_length):
    """Vérifie si les œuvres peuvent réellement tenir dans la salle avec placement 2D"""
    if not artworks:
        return True
    
    # Trier les œuvres par surface décroissante pour optimiser le placement
    sorted_artworks = sorted(artworks, key=lambda x: x['largeur'] * x['longueur'], reverse=True)
    
    # Utiliser un algorithme de placement en ligne avec gestion des hauteurs
    x_cursor = 0
    y_cursor = 0
    current_row_height = 0
    
    for artwork in sorted_artworks:
        # Vérifier si l'œuvre peut tenir dans la ligne actuelle
        if x_cursor + artwork['largeur'] <= room_width:
            # L'œuvre tient dans la ligne actuelle
            current_row_height = max(current_row_height, artwork['longueur'])
            x_cursor += artwork['largeur']
        else:
            # Passer à la ligne suivante
            y_cursor += current_row_height
            x_cursor = artwork['largeur']
            current_row_height = artwork['longueur']
            
            # Vérifier si l'œuvre tient en largeur sur une nouvelle ligne
            if artwork['largeur'] > room_width:
                return False
        
        # Vérifier si la nouvelle position dépasse la longueur de la salle
        if y_cursor + current_row_height > room_length:
            return False
    
    return True

def place_artworks(artworks, room_width):
    """Place les œuvres dans la salle et retourne leurs positions"""
    placements = []
    
    # Trier les œuvres par surface décroissante pour optimiser le placement
    sorted_artworks = sorted(artworks, key=lambda x: x['largeur'] * x['longueur'], reverse=True)
    
    x_cursor = 0
    y_cursor = 0
    current_row_height = 0
    
    for artwork in sorted_artworks:
        # Vérifier si l'œuvre peut tenir dans la ligne actuelle
        if x_cursor + artwork['largeur'] <= room_width:
            # Placer l'œuvre dans la ligne actuelle
            placements.append({
                "id": artwork['id'],
                "x": round(x_cursor, 2),
                "y": round(y_cursor, 2)
            })
            current_row_height = max(current_row_height, artwork['longueur'])
            x_cursor += artwork['largeur']
        else:
            # Passer à la ligne suivante
            y_cursor += current_row_height
            x_cursor = 0
            current_row_height = artwork['longueur']
            
            # Placer l'œuvre au début de la nouvelle ligne
            placements.append({
                "id": artwork['id'],
                "x": round(x_cursor, 2),
                "y": round(y_cursor, 2)
            })
            x_cursor += artwork['largeur']
    
    return placements

def find_optimal_selection(categories, room_width, room_length):
    """Trouve la sélection optimale d'œuvres respectant les contraintes"""
    min_count = min(len(artworks) for artworks in categories.values())
    
    # Essayer de sélectionner k œuvres de chaque catégorie, en commençant par le maximum possible
    for k in range(min_count, 0, -1):
        candidate_artworks = []
        
        # Sélectionner les k meilleures œuvres de chaque catégorie
        for category_artworks in categories.values():
            candidate_artworks.extend(category_artworks[:k])
        
        # Vérifier si cette sélection peut tenir dans la salle
        if can_fit_artworks(candidate_artworks, room_width, room_length):
            return candidate_artworks, k
    
    return [], 0

def save_selection_to_json(placements, filename):
    """Sauvegarde la sélection dans un fichier JSON"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(placements, f, indent=2, ensure_ascii=False)

def main():
    try:
        # Charger les données
        data = load_museum_data('donnees.json')
        room_width = data['largeur_salle']
        room_length = data['longueur_salle']
        artworks = data['oeuvres']
        
        print(f"Salle de stockage: {room_width}m x {room_length}m")
        print(f"Nombre total d'œuvres: {len(artworks)}")
        
        # Grouper les œuvres par catégorie
        categories = group_by_category(artworks)
        
        print("\nNombre d'œuvres par catégorie:")
        for category, category_artworks in categories.items():
            print(f"  {category}: {len(category_artworks)} œuvres")
        
        # Trouver la sélection optimale
        selected_artworks, k = find_optimal_selection(categories, room_width, room_length)
        
        if not selected_artworks:
            print("Aucune sélection possible!")
            return
        
        print(f"\nSélection optimale: {k} œuvre(s) par catégorie")
        print(f"Total: {len(selected_artworks)} œuvres sélectionnées")
        
        # Calculer la valeur totale de la sélection
        total_value = sum(artwork['valeur_totale'] for artwork in selected_artworks)
        print(f"Valeur totale de la sélection: {total_value:.2f}")
        
        # Placer les œuvres dans la salle
        placements = place_artworks(selected_artworks, room_width)
        
        # Afficher les détails de la sélection
        print("\nŒuvres sélectionnées:")
        for placement in placements:
            # Trouver l'œuvre correspondante
            artwork = next(art for art in selected_artworks if art['id'] == placement['id'])
            print(f"  {artwork['id']} ({artwork['categorie']}) - "
                  f"Valeur: {artwork['valeur_totale']:.1f} - "
                  f"Dimensions: {artwork['largeur']}x{artwork['longueur']}m - "
                  f"Position: ({placement['x']}, {placement['y']})")
        
        # Vérification de l'espace utilisé
        max_x = max(placement['x'] for placement in placements)
        max_y = max(placement['y'] for placement in placements)
        print(f"\nEspace utilisé: jusqu'à x={max_x}m, y={max_y}m")
        
        # Sauvegarder la sélection
        save_selection_to_json(placements, 'selection_optimale.json')
        print(f"Sélection sauvegardée dans 'selection_optimale.json'")
        
        # Vérification de l'équilibre entre catégories
        category_counts = defaultdict(int)
        for artwork in selected_artworks:
            category_counts[artwork['categorie']] += 1
        
        print(f"\nVérification de l'équilibre:")
        for category, count in category_counts.items():
            print(f"  {category}: {count} œuvre(s)")
            
    except FileNotFoundError:
        print("Erreur: Le fichier 'donnees.json' n'a pas été trouvé.")
        print("Veuillez vous assurer que le fichier existe dans le répertoire courant.")

if __name__ == "__main__":
    main()
