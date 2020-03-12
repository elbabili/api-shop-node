
**API REST ne necessitant pas d'authentification, permettant l'accès à plusieurs services web :**
    
    - ajouter produit : app.post("/products", products.create);
    
    - liste des produits : app.get("/products", products.findAll);
    
    - retrouver un produit par son id : app.get("/products/:productId", products.findOne);
    
    - mettre à jour un produit : app.put("/products/:productId", products.update);
    
    - supprimer un produit : app.delete("/products/:productId", products.delete);
    
    - supprimer tous les produits : app.delete("/products", products.deleteAll);

        -> idem pour les catégories de produits :
    
    - ajouter catégorie : app.post("/categories", categories.create);
    
    - .............
    
        -> avec en plus, la possibilitée de renvoyer tous les produits d'une catégorie donnée :
    
    - app.get("/categories/:categorieId/products", categories.productsbycat);

        -> Créer une commande : app.post("/order", order.create); se déroulera comme suit :
    
    1/ on crée un client avec les infos de la commande : name + address + email + phone...       ToDO : s'il existe déjà
    
    2/ on crée la commande : date de création + total + idClient
    
    3/ on crée les commandes minifiées : price + quantité + idCommande + idProduit    ToDO
    
    4/ Si tout est ok, on renvoi la commande côté front afin d'afficher la confirmation avec infos commande