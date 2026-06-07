window.COURSES = window.COURSES || {};
window.COURSES["sql"] = {
  "id": "sql",
  "title": "SQL",
  "icon": "SQL",
  "summary": "Cours complet de SQL pour bases de donnees relationnelles (standard / SQLite), du debutant au niveau junior : modele relationnel, SELECT, jointures, agregats, sous-requetes, modifications, cles, index, normalisation et transactions ACID. Chaque chapitre contient un cours pedagogique, un bac a sable SQL executable et un QCM.",
  "chapters": [
    {
      "id": "bases-relationnelles",
      "title": "1. Bases de donnees relationnelles : tables, lignes, colonnes, types",
      "markdown": "# 1. Les bases de donnees relationnelles\n\n## La metaphore du classeur Excel\n\nImagine un grand classeur Excel. Chaque **feuille** du classeur est un sujet : une feuille pour les *clients*, une feuille pour les *commandes*, une feuille pour les *produits*. Dans une base de donnees relationnelle, ces feuilles s'appellent des **tables**.\n\nDans une feuille :\n- chaque **ligne** represente UN element concret (un client precis, une commande precise) ;\n- chaque **colonne** represente UNE caracteristique (le nom, l'email, la date).\n\nUne base de donnees relationnelle, c'est exactement ca, en plus rigoureux : un ensemble de tables reliees entre elles par des valeurs communes (d'ou le mot **relationnel**).\n\n## Definitions\n\n- **Base de donnees (database)** : un conteneur qui regroupe plusieurs tables et leurs relations.\n- **Table** : une structure a deux dimensions (lignes x colonnes) qui stocke les donnees d'un meme sujet. Exemple : `clients`.\n- **Ligne (row / enregistrement / tuple)** : une occurrence unique de donnees. Exemple : le client \"Dupont\".\n- **Colonne (column / champ / attribut)** : une propriete typee partagee par toutes les lignes. Exemple : `email`.\n- **Type de donnees** : la nature de ce qu'une colonne peut contenir (texte, nombre, date...). Le type protege la coherence : on ne met pas \"bonjour\" dans une colonne `age`.\n- **SGBD (systeme de gestion de base de donnees)** : le logiciel qui gere tout ca (SQLite, PostgreSQL, MySQL, SQL Server, Oracle...).\n- **SQL (Structured Query Language)** : le langage standard pour parler au SGBD.\n\n## Les principaux types de donnees\n\nLe SQL est normalise (ANSI), mais chaque SGBD a ses variantes. Voici les types les plus courants :\n\n| Famille | Exemples standard | A quoi ca sert |\n|---|---|---|\n| Texte | `CHAR(n)`, `VARCHAR(n)`, `TEXT` | chaines de caracteres |\n| Entiers | `INTEGER`, `INT`, `SMALLINT`, `BIGINT` | nombres entiers |\n| Decimaux | `DECIMAL(p,s)`, `NUMERIC`, `REAL`, `FLOAT` | nombres a virgule, montants |\n| Booleen | `BOOLEAN` | vrai / faux |\n| Date/heure | `DATE`, `TIME`, `TIMESTAMP`, `DATETIME` | dates et horodatages |\n\n### Le cas particulier de SQLite\n\nSQLite (utilise dans ce cours et dans des milliards d'appareils) est **typé dynamiquement**. Il ne connait en realite que 5 \"classes de stockage\" : `NULL`, `INTEGER`, `REAL`, `TEXT`, `BLOB`. Quand tu ecris `VARCHAR(50)` ou `BOOLEAN`, SQLite l'accepte mais le ramene a l'une de ces classes via des regles d'**affinite**. Concretement, ce que tu ecris reste lisible et standard ; tu peux donc continuer a utiliser `VARCHAR`, `DATE`, etc.\n\n## Creer une table : CREATE TABLE\n\nLa commande `CREATE TABLE` definit la **structure** (le *schema*) d'une table : son nom, ses colonnes et leurs types.\n\n```sql\nCREATE TABLE clients (\n    id          INTEGER PRIMARY KEY,   -- identifiant unique\n    nom         VARCHAR(50) NOT NULL,  -- texte obligatoire\n    email       VARCHAR(100),\n    age         INTEGER,\n    inscrit_le  DATE\n);\n```\n\nQuelques mots-cles importants :\n- `PRIMARY KEY` : designe la colonne identifiant unique de la table (on detaille au chapitre 6).\n- `NOT NULL` : interdit de laisser la colonne vide.\n- `--` : commentaire jusqu'a la fin de la ligne.\n\n## La valeur NULL : \"on ne sait pas\"\n\n`NULL` n'est pas zero, ni une chaine vide : c'est l'**absence de valeur** (\"information inconnue ou non applicable\"). Un client sans email aura `email = NULL`. C'est une notion piege : `NULL` se compare avec `IS NULL` / `IS NOT NULL`, jamais avec `=`.\n\n## Inserer des donnees : INSERT\n\nUne table vide ne sert a rien. On la remplit avec `INSERT` (detaille au chapitre 5) :\n\n```sql\nINSERT INTO clients (id, nom, email, age, inscrit_le)\nVALUES (1, 'Dupont', 'dupont@mail.fr', 34, '2024-01-15');\n```\n\n## Exercice (a faire dans le bac a sable)\n\n1. Cree une table `produits` avec : `id` (entier, cle primaire), `nom` (texte obligatoire), `prix` (decimal), `stock` (entier).\n2. Insere 3 produits.\n3. Affiche tout avec `SELECT * FROM produits;`.\n\n## Explique avec tes mots (technique Feynman)\n\nReformule a voix haute, comme si tu l'expliquais a un ami non technicien :\n- Une **table** est comme une ____ d'un classeur.\n- Une **ligne** represente ____ , une **colonne** represente ____.\n- Le **type** d'une colonne sert a ____.\n- `NULL` signifie ____ (et non zero).\n\nSi tu sais combler les blancs sans regarder, le chapitre est acquis.",
      "playground": {
        "language": "sql",
        "code": "-- Chapitre 1 : creer une table, la remplir, la lire\nCREATE TABLE clients (\n    id          INTEGER PRIMARY KEY,\n    nom         VARCHAR(50) NOT NULL,\n    email       VARCHAR(100),\n    age         INTEGER,\n    inscrit_le  DATE\n);\n\nINSERT INTO clients (id, nom, email, age, inscrit_le) VALUES\n    (1, 'Dupont', 'dupont@mail.fr', 34, '2024-01-15'),\n    (2, 'Martin', 'martin@mail.fr', 28, '2024-03-02'),\n    (3, 'Nguyen', NULL,             41, '2023-11-20');\n\n-- Lire toute la table\nSELECT * FROM clients;"
      },
      "quiz": [
        {
          "question": "Dans une table relationnelle, que represente une LIGNE (row) ?",
          "options": [
            "Une caracteristique partagee par tous les elements (ex : l'email)",
            "Un element concret et unique (ex : un client precis)",
            "Le type de donnees de la table",
            "Le nom de la base de donnees"
          ],
          "correctIndex": 1,
          "explanation": "Une ligne = un enregistrement concret (un client, une commande). Les caracteristiques partagees sont les colonnes."
        },
        {
          "question": "Que signifie la valeur NULL dans une colonne ?",
          "options": [
            "La valeur zero",
            "Une chaine de caracteres vide \"\"",
            "L'absence de valeur (inconnue ou non applicable)",
            "Une erreur de saisie a corriger"
          ],
          "correctIndex": 2,
          "explanation": "NULL represente l'absence d'information. Ce n'est ni 0 ni une chaine vide, et il se teste avec IS NULL / IS NOT NULL."
        },
        {
          "question": "Quelle commande SQL definit la STRUCTURE (colonnes et types) d'une nouvelle table ?",
          "options": [
            "INSERT INTO",
            "SELECT",
            "CREATE TABLE",
            "UPDATE"
          ],
          "correctIndex": 2,
          "explanation": "CREATE TABLE cree le schema (nom, colonnes, types, contraintes). INSERT sert ensuite a remplir la table de donnees."
        }
      ]
    },
    {
      "id": "select-where-order-distinct-limit",
      "title": "2. Interroger les donnees : SELECT, WHERE, ORDER BY, DISTINCT, LIMIT",
      "markdown": "# 2. Interroger les donnees avec SELECT\n\n## La metaphore du bibliothecaire\n\nTu vas voir un bibliothecaire et tu lui demandes : \"Donne-moi les livres de science-fiction, parus apres 2000, tries du plus recent au plus ancien, et seulement les 5 premiers.\" Tu ne lui expliques PAS comment chercher dans les rayons : tu decris juste le **resultat** que tu veux. SQL fonctionne pareil : c'est un langage **declaratif**. Tu decris ce que tu veux, le SGBD se debrouille pour l'obtenir.\n\n## SELECT : choisir les colonnes\n\n```sql\nSELECT nom, email FROM clients;   -- seulement deux colonnes\nSELECT * FROM clients;            -- * = toutes les colonnes\n```\n\nEn entreprise, on evite `SELECT *` en production : on nomme les colonnes voulues (plus clair, plus performant, plus stable si la table evolue).\n\n## WHERE : filtrer les lignes\n\n`WHERE` garde uniquement les lignes qui respectent une condition.\n\n```sql\nSELECT nom, age FROM clients WHERE age >= 30;\n```\n\n### Operateurs de comparaison\n\n| Operateur | Sens |\n|---|---|\n| `=` | egal |\n| `<>` ou `!=` | different |\n| `<`, `>`, `<=`, `>=` | comparaisons |\n| `BETWEEN a AND b` | dans l'intervalle (bornes incluses) |\n| `IN (...)` | fait partie d'une liste |\n| `LIKE 'a%'` | motif texte (`%` = n'importe quoi, `_` = un caractere) |\n| `IS NULL` / `IS NOT NULL` | absence / presence de valeur |\n\n### Combiner avec AND, OR, NOT\n\n```sql\nSELECT nom FROM clients\nWHERE age >= 30 AND email IS NOT NULL;\n\nSELECT nom FROM clients\nWHERE nom LIKE 'M%' OR age < 30;\n```\n\nAttention a la priorite : `AND` est evalue avant `OR`. En cas de doute, mets des **parentheses** : `WHERE (a OR b) AND c`.\n\n## ORDER BY : trier le resultat\n\n```sql\nSELECT nom, age FROM clients ORDER BY age ASC;   -- croissant (defaut)\nSELECT nom, age FROM clients ORDER BY age DESC;  -- decroissant\nSELECT nom, age FROM clients ORDER BY age DESC, nom ASC; -- 2 criteres\n```\n\n`ASC` = ascendant (du plus petit au plus grand), `DESC` = descendant.\n\n## DISTINCT : supprimer les doublons\n\n`DISTINCT` ne garde qu'une seule fois chaque valeur (ou combinaison de valeurs).\n\n```sql\nSELECT DISTINCT age FROM clients;        -- chaque age une seule fois\nSELECT DISTINCT ville, pays FROM clients; -- chaque couple unique\n```\n\n## LIMIT : ne prendre que N lignes\n\n```sql\nSELECT nom FROM clients ORDER BY age DESC LIMIT 3;       -- top 3\nSELECT nom FROM clients ORDER BY age DESC LIMIT 3 OFFSET 5; -- saute 5, prend 3\n```\n\n`LIMIT` existe dans SQLite, PostgreSQL, MySQL. (SQL Server utilise `TOP`, Oracle `FETCH FIRST` : la syntaxe varie selon le SGBD.) `OFFSET` sert a la **pagination** (page 2, page 3...).\n\n## L'ordre logique d'execution (important)\n\nTu ECRIS dans cet ordre : `SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT`. Mais le moteur EXECUTE plutot dans cet ordre : `FROM` -> `WHERE` -> (`GROUP BY`/`HAVING`) -> `SELECT`/`DISTINCT` -> `ORDER BY` -> `LIMIT`. Cela explique pourquoi on peut trier sur une colonne, et pourquoi `WHERE` ne peut pas utiliser un alias defini dans le `SELECT`.\n\n## Exercice\n\nSur la table `produits` du bac a sable :\n1. Affiche les produits dont le `prix` est entre 10 et 50.\n2. Affiche les categories distinctes.\n3. Affiche les 2 produits les plus chers.\n\n## Explique avec tes mots (Feynman)\n\n- `WHERE` sert a ____ les lignes.\n- `ORDER BY ... DESC` trie du ____ au ____.\n- `DISTINCT` supprime les ____.\n- `LIMIT 5` renvoie ____.",
      "playground": {
        "language": "sql",
        "code": "-- Chapitre 2 : SELECT, WHERE, ORDER BY, DISTINCT, LIMIT\nCREATE TABLE produits (\n    id        INTEGER PRIMARY KEY,\n    nom       VARCHAR(50) NOT NULL,\n    categorie VARCHAR(30),\n    prix      DECIMAL(8,2),\n    stock     INTEGER\n);\n\nINSERT INTO produits (id, nom, categorie, prix, stock) VALUES\n    (1, 'Clavier',   'Informatique', 29.90, 120),\n    (2, 'Souris',    'Informatique', 15.50, 200),\n    (3, 'Ecran 27',  'Informatique', 189.00, 35),\n    (4, 'Cafe 1kg',  'Alimentation', 12.00, 0),\n    (5, 'The vert',  'Alimentation', 8.50,  60),\n    (6, 'Casque',    'Audio',        59.99, 18);\n\n-- 1) Produits entre 10 et 50 euros, du moins cher au plus cher\nSELECT nom, prix FROM produits\nWHERE prix BETWEEN 10 AND 50\nORDER BY prix ASC;\n\n-- 2) Categories distinctes\nSELECT DISTINCT categorie FROM produits;\n\n-- 3) Les 2 produits les plus chers\nSELECT nom, prix FROM produits\nORDER BY prix DESC\nLIMIT 2;"
      },
      "quiz": [
        {
          "question": "Quelle clause sert a FILTRER les lignes selon une condition ?",
          "options": [
            "ORDER BY",
            "WHERE",
            "DISTINCT",
            "LIMIT"
          ],
          "correctIndex": 1,
          "explanation": "WHERE garde uniquement les lignes qui satisfont la condition. ORDER BY trie, DISTINCT deduplique, LIMIT borne le nombre de lignes."
        },
        {
          "question": "Que renvoie : SELECT DISTINCT categorie FROM produits; ?",
          "options": [
            "Toutes les lignes de la table",
            "Chaque categorie une seule fois, sans doublons",
            "La premiere categorie uniquement",
            "Les categories triees par ordre alphabetique"
          ],
          "correctIndex": 1,
          "explanation": "DISTINCT elimine les doublons : chaque valeur distincte n'apparait qu'une fois. Il ne trie pas (il faut ORDER BY pour cela)."
        },
        {
          "question": "Pour obtenir les 3 produits les plus chers, quelle requete est correcte ?",
          "options": [
            "SELECT nom FROM produits LIMIT 3 ORDER BY prix DESC;",
            "SELECT nom FROM produits ORDER BY prix DESC LIMIT 3;",
            "SELECT TOP nom FROM produits WHERE prix = MAX;",
            "SELECT nom FROM produits WHERE prix DESC LIMIT 3;"
          ],
          "correctIndex": 1,
          "explanation": "Il faut d'abord trier (ORDER BY prix DESC) puis limiter (LIMIT 3). LIMIT se place toujours en dernier, apres ORDER BY."
        }
      ]
    },
    {
      "id": "jointures",
      "title": "3. Les jointures : INNER, LEFT, RIGHT JOIN",
      "markdown": "# 3. Les jointures (JOIN)\n\n## La metaphore des deux carnets\n\nTu as deux carnets. Carnet A : la liste des clients, chacun avec un numero. Carnet B : la liste des commandes, chaque commande notant le numero du client qui l'a passee. Pour savoir \"qui a commande quoi\", tu fais correspondre le numero de client du carnet B avec celui du carnet A. **Une jointure, c'est exactement ce rapprochement entre deux tables grace a une valeur commune.**\n\n## Pourquoi separer les donnees en plusieurs tables ?\n\nOn pourrait tout mettre dans une seule table geante. Mais alors on repeterait le nom, l'email et l'adresse du client a CHAQUE commande : gaspillage et risque d'incoherence. On separe donc : une table `clients`, une table `commandes`, et un lien entre les deux. Ce lien est une **cle etrangere** (chapitre 6) : la colonne `client_id` de `commandes` pointe vers `id` de `clients`.\n\n```sql\nCREATE TABLE clients (\n    id  INTEGER PRIMARY KEY,\n    nom VARCHAR(50)\n);\nCREATE TABLE commandes (\n    id        INTEGER PRIMARY KEY,\n    client_id INTEGER,   -- pointe vers clients.id\n    montant   DECIMAL(8,2)\n);\n```\n\n## INNER JOIN : l'intersection\n\n`INNER JOIN` garde uniquement les lignes qui ont une correspondance **dans les deux tables**. C'est la jointure la plus courante.\n\n```sql\nSELECT clients.nom, commandes.montant\nFROM clients\nINNER JOIN commandes ON commandes.client_id = clients.id;\n```\n\n- `ON` indique la **condition de rapprochement** (ici l'egalite des cles).\n- Un client sans commande N'APPARAIT PAS. Une commande sans client valide non plus.\n\n### Les alias pour alleger\n\n```sql\nSELECT c.nom, o.montant\nFROM clients AS c\nINNER JOIN commandes AS o ON o.client_id = c.id;\n```\n\n## LEFT JOIN : tout le carnet de gauche\n\n`LEFT JOIN` (= `LEFT OUTER JOIN`) garde **toutes les lignes de la table de gauche**, meme celles sans correspondance a droite. Les colonnes de droite manquantes valent alors `NULL`.\n\n```sql\nSELECT c.nom, o.montant\nFROM clients AS c\nLEFT JOIN commandes AS o ON o.client_id = c.id;\n```\n\nUtile pour repondre a : \"liste TOUS les clients, avec leurs commandes s'ils en ont\". Un client sans commande apparait avec `montant = NULL`. Pour ne garder QUE les clients sans commande :\n\n```sql\nSELECT c.nom\nFROM clients AS c\nLEFT JOIN commandes AS o ON o.client_id = c.id\nWHERE o.id IS NULL;\n```\n\n## RIGHT JOIN : tout le carnet de droite\n\n`RIGHT JOIN` est le miroir : il garde toutes les lignes de la table de **droite**. `A RIGHT JOIN B` equivaut a `B LEFT JOIN A`. En pratique on prefere reecrire en LEFT JOIN, plus lisible.\n\n> Note SQLite : les anciennes versions ne supportaient pas `RIGHT JOIN` (uniquement INNER et LEFT). SQLite 3.39+ (2022) le supporte. Si ton moteur refuse `RIGHT JOIN`, inverse les tables et utilise `LEFT JOIN`.\n\n## Resume visuel\n\n| Type | Ce qu'il garde |\n|---|---|\n| `INNER JOIN` | seulement les correspondances des 2 cotes |\n| `LEFT JOIN`  | tout a gauche + correspondances a droite (sinon NULL) |\n| `RIGHT JOIN` | tout a droite + correspondances a gauche (sinon NULL) |\n\n## Joindre plus de deux tables\n\nOn enchaine les `JOIN` :\n\n```sql\nSELECT c.nom, o.montant, p.nom AS produit\nFROM clients c\nJOIN commandes o ON o.client_id = c.id\nJOIN produits  p ON p.id = o.produit_id;\n```\n\n## Exercice\n\n1. Ecris un INNER JOIN affichant nom du client + montant.\n2. Transforme-le en LEFT JOIN et observe le client sans commande.\n3. Affiche uniquement les clients SANS commande.\n\n## Explique avec tes mots (Feynman)\n\n- Une jointure relie deux tables grace a ____.\n- `INNER JOIN` ne garde que ____.\n- `LEFT JOIN` garde en plus ____ et met ____ a la place des valeurs manquantes.",
      "playground": {
        "language": "sql",
        "code": "-- Chapitre 3 : INNER / LEFT JOIN\nCREATE TABLE clients (\n    id  INTEGER PRIMARY KEY,\n    nom VARCHAR(50) NOT NULL\n);\nCREATE TABLE commandes (\n    id        INTEGER PRIMARY KEY,\n    client_id INTEGER,\n    montant   DECIMAL(8,2)\n);\n\nINSERT INTO clients (id, nom) VALUES\n    (1, 'Dupont'), (2, 'Martin'), (3, 'Nguyen');\n\n-- Note : le client 3 (Nguyen) n'a aucune commande\nINSERT INTO commandes (id, client_id, montant) VALUES\n    (10, 1, 49.90),\n    (11, 1, 12.00),\n    (12, 2, 99.00);\n\n-- 1) INNER JOIN : seulement les clients qui ont commande\nSELECT c.nom, o.montant\nFROM clients c\nINNER JOIN commandes o ON o.client_id = c.id;\n\n-- 2) LEFT JOIN : tous les clients, montant NULL si pas de commande\nSELECT c.nom, o.montant\nFROM clients c\nLEFT JOIN commandes o ON o.client_id = c.id;\n\n-- 3) Clients SANS aucune commande\nSELECT c.nom\nFROM clients c\nLEFT JOIN commandes o ON o.client_id = c.id\nWHERE o.id IS NULL;"
      },
      "quiz": [
        {
          "question": "Que garde un INNER JOIN entre clients et commandes ?",
          "options": [
            "Tous les clients, meme sans commande",
            "Toutes les commandes, meme sans client",
            "Uniquement les lignes ayant une correspondance dans les DEUX tables",
            "Toutes les lignes des deux tables sans condition"
          ],
          "correctIndex": 2,
          "explanation": "INNER JOIN conserve uniquement les paires qui correspondent des deux cotes. Les lignes sans correspondance sont exclues."
        },
        {
          "question": "Avec LEFT JOIN clients -> commandes, que vaut le montant pour un client SANS commande ?",
          "options": [
            "0",
            "NULL",
            "Une chaine vide",
            "La ligne est supprimee du resultat"
          ],
          "correctIndex": 1,
          "explanation": "LEFT JOIN garde toutes les lignes de gauche ; les colonnes de droite manquantes sont remplies par NULL, pas par 0."
        },
        {
          "question": "A quoi sert la clause ON dans une jointure ?",
          "options": [
            "A trier le resultat",
            "A indiquer la condition de rapprochement entre les deux tables",
            "A limiter le nombre de lignes",
            "A renommer les colonnes"
          ],
          "correctIndex": 1,
          "explanation": "ON definit la condition de jointure (souvent l'egalite cle etrangere = cle primaire) qui dit comment apparier les lignes des deux tables."
        }
      ]
    },
    {
      "id": "agregats-group-by-having",
      "title": "4. Agregats et regroupements : COUNT, SUM, AVG, MAX, GROUP BY, HAVING",
      "markdown": "# 4. Agregats, GROUP BY et HAVING\n\n## La metaphore de la calculatrice de groupe\n\nJusqu'ici, une requete renvoyait des lignes \"detaillees\". Maintenant on veut des **synthese** : \"Combien de commandes au total ? Quel chiffre d'affaires par client ? Quel prix moyen ?\". C'est comme prendre un tas de tickets de caisse et calculer un total, une moyenne, un maximum. Les **fonctions d'agregation** font ce calcul sur un groupe de lignes et renvoient UNE valeur.\n\n## Les fonctions d'agregation principales\n\n| Fonction | Calcule |\n|---|---|\n| `COUNT(*)` | nombre de lignes |\n| `COUNT(col)` | nombre de valeurs NON NULL de la colonne |\n| `SUM(col)` | somme |\n| `AVG(col)` | moyenne |\n| `MIN(col)` / `MAX(col)` | plus petit / plus grand |\n\n```sql\nSELECT COUNT(*) AS nb_commandes,\n       SUM(montant) AS total,\n       AVG(montant) AS moyenne,\n       MAX(montant) AS plus_grosse\nFROM commandes;\n```\n\nSans `GROUP BY`, l'agregat porte sur **toute la table** et renvoie une seule ligne.\n\n### Piege du COUNT et des NULL\n\n`COUNT(*)` compte les lignes. `COUNT(email)` ne compte que les lignes ou `email` n'est PAS NULL. C'est une difference classique en entretien.\n\n## GROUP BY : agreger par paquets\n\n`GROUP BY` decoupe les lignes en groupes selon une (ou plusieurs) colonne(s), puis applique l'agregat a CHAQUE groupe.\n\n```sql\nSELECT client_id, COUNT(*) AS nb, SUM(montant) AS total\nFROM commandes\nGROUP BY client_id;\n```\n\nLecture : \"pour chaque `client_id`, donne le nombre de commandes et leur total\". Tu obtiens une ligne **par groupe**.\n\n### Regle d'or du GROUP BY\n\nDans le `SELECT`, chaque colonne doit etre soit dans le `GROUP BY`, soit a l'interieur d'une fonction d'agregation. Sinon le resultat est ambigu (et la plupart des SGBD refusent la requete). SQLite est plus permissif mais renverra une valeur arbitraire : a eviter.\n\n## HAVING : filtrer les GROUPES\n\n`WHERE` filtre les **lignes** AVANT le regroupement. `HAVING` filtre les **groupes** APRES le regroupement (il peut donc utiliser un agregat, ce que `WHERE` ne peut pas).\n\n```sql\nSELECT client_id, SUM(montant) AS total\nFROM commandes\nGROUP BY client_id\nHAVING SUM(montant) > 50;\n```\n\nLecture : \"les clients dont le total des commandes depasse 50\".\n\n### WHERE vs HAVING (a retenir absolument)\n\n```sql\nSELECT client_id, SUM(montant) AS total\nFROM commandes\nWHERE montant > 0           -- 1) garde les lignes utiles (avant groupe)\nGROUP BY client_id\nHAVING SUM(montant) > 50    -- 2) garde les groupes qui depassent 50\nORDER BY total DESC;        -- 3) trie le resultat final\n```\n\n## Ordre d'execution complet\n\n`FROM` -> `WHERE` -> `GROUP BY` -> `HAVING` -> `SELECT` -> `ORDER BY` -> `LIMIT`.\nC'est pourquoi `WHERE` ne peut pas utiliser `SUM(...)` (le groupe n'existe pas encore) alors que `HAVING` le peut.\n\n## Exercice\n\n1. Compte le nombre total de commandes.\n2. Pour chaque client, affiche son total commande.\n3. N'affiche que les clients dont le total depasse 50, du plus gros au plus petit.\n\n## Explique avec tes mots (Feynman)\n\n- `COUNT(*)` compte ____ tandis que `COUNT(email)` compte ____.\n- `GROUP BY` sert a ____.\n- `WHERE` filtre ____ alors que `HAVING` filtre ____.",
      "playground": {
        "language": "sql",
        "code": "-- Chapitre 4 : agregats, GROUP BY, HAVING\nCREATE TABLE commandes (\n    id        INTEGER PRIMARY KEY,\n    client_id INTEGER,\n    montant   DECIMAL(8,2)\n);\n\nINSERT INTO commandes (id, client_id, montant) VALUES\n    (1, 1, 49.90),\n    (2, 1, 12.00),\n    (3, 2, 99.00),\n    (4, 2, 5.00),\n    (5, 3, 20.00);\n\n-- 1) Synthese globale\nSELECT COUNT(*) AS nb_commandes,\n       SUM(montant) AS total,\n       AVG(montant) AS moyenne,\n       MAX(montant) AS plus_grosse\nFROM commandes;\n\n-- 2) Total par client\nSELECT client_id, COUNT(*) AS nb, SUM(montant) AS total\nFROM commandes\nGROUP BY client_id;\n\n-- 3) Clients dont le total depasse 50, du plus gros au plus petit\nSELECT client_id, SUM(montant) AS total\nFROM commandes\nGROUP BY client_id\nHAVING SUM(montant) > 50\nORDER BY total DESC;"
      },
      "quiz": [
        {
          "question": "Quelle est la difference entre COUNT(*) et COUNT(email) ?",
          "options": [
            "Aucune, ils donnent toujours le meme resultat",
            "COUNT(*) compte toutes les lignes ; COUNT(email) ne compte que les lignes ou email n'est pas NULL",
            "COUNT(email) compte les caracteres des emails",
            "COUNT(*) ignore les doublons, pas COUNT(email)"
          ],
          "correctIndex": 1,
          "explanation": "COUNT(*) compte les lignes. COUNT(colonne) ignore les valeurs NULL de cette colonne, d'ou un resultat potentiellement plus petit."
        },
        {
          "question": "A quoi sert GROUP BY client_id ?",
          "options": [
            "A trier les commandes par client",
            "A supprimer les doublons de client_id",
            "A regrouper les lignes par client pour appliquer un agregat a chaque groupe",
            "A filtrer les commandes d'un seul client"
          ],
          "correctIndex": 2,
          "explanation": "GROUP BY decoupe les lignes en groupes (ici par client_id) ; chaque fonction d'agregation est alors calculee groupe par groupe."
        },
        {
          "question": "Pour filtrer sur le resultat d'un agregat comme SUM(montant) > 50, quelle clause utilise-t-on ?",
          "options": [
            "WHERE, car il filtre tout",
            "HAVING, car il filtre les groupes apres l'agregation",
            "ORDER BY",
            "DISTINCT"
          ],
          "correctIndex": 1,
          "explanation": "WHERE filtre les lignes avant le regroupement et ne peut pas utiliser d'agregat. HAVING filtre les groupes apres GROUP BY et accepte SUM, COUNT, etc."
        }
      ]
    },
    {
      "id": "sous-requetes-insert-update-delete",
      "title": "5. Sous-requetes et modification des donnees : INSERT, UPDATE, DELETE",
      "markdown": "# 5. Sous-requetes et modification des donnees\n\n## Partie A - Les sous-requetes\n\n### La metaphore de la question dans la question\n\nParfois, pour repondre a une question, il faut d'abord en resoudre une autre. \"Quels clients ont commande plus que la moyenne ?\" -> il faut d'abord calculer la moyenne, PUIS comparer. Une **sous-requete** (subquery) est une requete `SELECT` imbriquee dans une autre, entre parentheses.\n\n### Sous-requete renvoyant une seule valeur (scalaire)\n\n```sql\nSELECT nom, montant\nFROM commandes\nWHERE montant > (SELECT AVG(montant) FROM commandes);\n```\n\nLa sous-requete `(SELECT AVG(montant) ...)` renvoie un seul nombre, utilise comme borne de comparaison.\n\n### Sous-requete avec IN (renvoie une liste)\n\n```sql\nSELECT nom\nFROM clients\nWHERE id IN (SELECT client_id FROM commandes WHERE montant > 50);\n```\n\nLecture : \"les clients dont l'id figure parmi ceux qui ont une commande > 50\".\n\n### EXISTS (teste la presence)\n\n```sql\nSELECT nom\nFROM clients c\nWHERE EXISTS (\n    SELECT 1 FROM commandes o WHERE o.client_id = c.id\n);\n```\n\n`EXISTS` renvoie vrai des qu'au moins une ligne correspond. Souvent plus efficace que `IN` sur de gros volumes. Beaucoup de ces questions peuvent aussi s'ecrire avec une jointure : sous-requete et JOIN sont parfois interchangeables.\n\n## Partie B - Modifier les donnees (INSERT / UPDATE / DELETE)\n\nCes trois commandes changent le **contenu** des tables (le langage de manipulation, DML).\n\n### INSERT : ajouter des lignes\n\n```sql\n-- Une ligne en nommant les colonnes (recommande)\nINSERT INTO clients (id, nom, email)\nVALUES (4, 'Bernard', 'bernard@mail.fr');\n\n-- Plusieurs lignes d'un coup\nINSERT INTO clients (id, nom, email) VALUES\n    (5, 'Petit', NULL),\n    (6, 'Roux',  'roux@mail.fr');\n```\n\nNommer les colonnes evite les erreurs si l'ordre des colonnes change.\n\n### UPDATE : modifier des lignes existantes\n\n```sql\nUPDATE clients\nSET email = 'nouveau@mail.fr'\nWHERE id = 4;\n```\n\n**REGLE DE SURVIE** : sans `WHERE`, l'`UPDATE` modifie TOUTES les lignes de la table.\n\n```sql\nUPDATE clients SET email = 'x';  -- DANGER : ecrase tous les emails !\n```\n\nReflexe pro : ecris d'abord un `SELECT` avec le meme `WHERE` pour verifier quelles lignes seront touchees, puis transforme-le en `UPDATE`.\n\n### DELETE : supprimer des lignes\n\n```sql\nDELETE FROM clients WHERE id = 6;\n```\n\nMeme avertissement : `DELETE FROM clients;` (sans `WHERE`) vide toute la table. `DELETE` retire des lignes ; pour supprimer la table entiere (structure comprise) c'est `DROP TABLE`.\n\n## Exercice\n\n1. Insere 2 nouvelles commandes.\n2. Affiche les commandes superieures a la moyenne (sous-requete).\n3. Augmente de 10 le montant de la commande d'id 1, puis verifie avec un SELECT.\n4. Supprime les commandes de montant inferieur a 10.\n\n## Explique avec tes mots (Feynman)\n\n- Une sous-requete sert a ____.\n- Le danger d'un `UPDATE`/`DELETE` sans `WHERE` est ____.\n- Avant un `UPDATE` risque, le reflexe est de ____.",
      "playground": {
        "language": "sql",
        "code": "-- Chapitre 5 : sous-requetes + INSERT / UPDATE / DELETE\nCREATE TABLE commandes (\n    id        INTEGER PRIMARY KEY,\n    client_id INTEGER,\n    montant   DECIMAL(8,2)\n);\n\nINSERT INTO commandes (id, client_id, montant) VALUES\n    (1, 1, 20.00),\n    (2, 1, 5.00),\n    (3, 2, 99.00);\n\n-- Ajout de 2 commandes\nINSERT INTO commandes (id, client_id, montant) VALUES\n    (4, 2, 8.00),\n    (5, 3, 60.00);\n\n-- Sous-requete : commandes au-dessus de la moyenne\nSELECT id, montant\nFROM commandes\nWHERE montant > (SELECT AVG(montant) FROM commandes);\n\n-- UPDATE cible (toujours avec WHERE)\nUPDATE commandes SET montant = montant + 10 WHERE id = 1;\n\n-- DELETE des petites commandes\nDELETE FROM commandes WHERE montant < 10;\n\n-- Resultat final\nSELECT * FROM commandes ORDER BY id;"
      },
      "quiz": [
        {
          "question": "Que se passe-t-il si on execute : UPDATE clients SET email = 'x'; (sans WHERE) ?",
          "options": [
            "Rien, la requete est invalide",
            "Seule la premiere ligne est modifiee",
            "TOUTES les lignes de la table voient leur email passer a 'x'",
            "Une erreur empeche toute modification"
          ],
          "correctIndex": 2,
          "explanation": "Sans WHERE, UPDATE s'applique a toutes les lignes. C'est le piege classique : toujours verifier le WHERE (ou tester avec un SELECT d'abord)."
        },
        {
          "question": "A quoi sert une sous-requete comme (SELECT AVG(montant) FROM commandes) dans un WHERE ?",
          "options": [
            "A trier les resultats",
            "A calculer une valeur intermediaire (ici la moyenne) utilisee dans la condition",
            "A creer une nouvelle table",
            "A supprimer des lignes"
          ],
          "correctIndex": 1,
          "explanation": "La sous-requete scalaire calcule une valeur (la moyenne) que la requete principale utilise comme borne de comparaison."
        },
        {
          "question": "Quelle commande AJOUTE de nouvelles lignes dans une table existante ?",
          "options": [
            "UPDATE",
            "INSERT INTO ... VALUES",
            "DELETE",
            "CREATE TABLE"
          ],
          "correctIndex": 1,
          "explanation": "INSERT INTO ... VALUES ajoute des lignes. UPDATE modifie des lignes existantes, DELETE en supprime, CREATE TABLE cree la structure."
        }
      ]
    },
    {
      "id": "cles-index-normalisation-acid",
      "title": "6. Integrite : cles, index, normalisation, transactions/ACID",
      "markdown": "# 6. Integrite des donnees : cles, index, normalisation, ACID\n\n## La cle primaire (PRIMARY KEY)\n\n### Metaphore du numero de securite sociale\n\nDeux personnes peuvent s'appeler \"Jean Martin\", mais leur numero de securite sociale est unique. La **cle primaire** est ce numero unique d'une table : elle identifie une ligne sans ambiguite.\n\nProprietes d'une cle primaire :\n- **unique** : pas deux lignes avec la meme valeur ;\n- **non NULL** : toujours renseignee ;\n- **stable** : elle ne change pas au cours de la vie de la ligne.\n\n```sql\nCREATE TABLE clients (\n    id  INTEGER PRIMARY KEY,  -- cle primaire\n    nom VARCHAR(50) NOT NULL\n);\n```\n\nEn SQLite, une colonne `INTEGER PRIMARY KEY` s'auto-incremente naturellement (si tu n'indiques pas d'id, SQLite en attribue un).\n\n## La cle etrangere (FOREIGN KEY)\n\nUne **cle etrangere** est une colonne qui pointe vers la cle primaire d'une AUTRE table. Elle materialise la relation et garantit l'**integrite referentielle** : on ne peut pas creer une commande pour un client inexistant.\n\n```sql\nCREATE TABLE commandes (\n    id        INTEGER PRIMARY KEY,\n    client_id INTEGER,\n    montant   DECIMAL(8,2),\n    FOREIGN KEY (client_id) REFERENCES clients(id)\n);\n```\n\n> Note SQLite : les cles etrangeres existent mais ne sont PAS verifiees par defaut. Il faut activer `PRAGMA foreign_keys = ON;` au debut de la session.\n\n## Les index : l'accelerateur de recherche\n\n### Metaphore de l'index d'un livre\n\nPour trouver un mot dans un livre de 500 pages, tu peux lire chaque page (lent) ou consulter l'**index alphabetique** a la fin (rapide). Un **index** de base de donnees est cette structure annexe qui permet de retrouver vite les lignes correspondant a une valeur, sans tout parcourir.\n\n```sql\nCREATE INDEX idx_commandes_client ON commandes(client_id);\n```\n\n- Avantage : les `WHERE`, `JOIN` et `ORDER BY` sur cette colonne deviennent beaucoup plus rapides.\n- Cout : chaque `INSERT`/`UPDATE`/`DELETE` doit aussi maintenir l'index, et il occupe de l'espace disque.\n- Regle pratique : indexer les colonnes souvent filtrees/jointes (notamment les cles etrangeres). La cle primaire est deja indexee automatiquement.\n\n## La normalisation : eviter la redondance\n\nLa **normalisation** est une methode pour organiser les tables afin d'eviter la duplication et les incoherences. Trois formes normales suffisent au quotidien :\n\n- **1NF (premiere forme normale)** : chaque cellule contient UNE seule valeur atomique (pas de liste \"clavier, souris, ecran\" dans une cellule), et chaque ligne est unique.\n- **2NF** : on est en 1NF ET chaque colonne non-cle depend de TOUTE la cle primaire (pertinent surtout pour les cles composees).\n- **3NF** : on est en 2NF ET aucune colonne non-cle ne depend d'une autre colonne non-cle. Exemple : ne pas stocker `code_postal` ET `ville` dans `commandes` si la ville se deduit du client ; on la range dans la table appropriee.\n\nIdee a retenir : **chaque information n'est stockee qu'a UN seul endroit**. On la relie ensuite via des cles. La denormalisation (dupliquer volontairement pour la performance) existe, mais c'est un choix avance et assume.\n\n## Les transactions et ACID\n\n### Metaphore du virement bancaire\n\nUn virement = debiter le compte A ET crediter le compte B. Si le courant saute entre les deux, on ne veut SURTOUT pas que A soit debite sans que B soit credite. Une **transaction** regroupe plusieurs operations en un seul bloc \"tout ou rien\".\n\n```sql\nBEGIN TRANSACTION;\n    UPDATE comptes SET solde = solde - 100 WHERE id = 'A';\n    UPDATE comptes SET solde = solde + 100 WHERE id = 'B';\nCOMMIT;            -- valide tout\n-- En cas de probleme : ROLLBACK; annule tout\n```\n\n- `COMMIT` valide definitivement l'ensemble.\n- `ROLLBACK` annule tout depuis le `BEGIN`, comme si rien ne s'etait passe.\n\n### Les proprietes ACID\n\n| Lettre | Propriete | Signification |\n|---|---|---|\n| **A** | Atomicite | tout ou rien : la transaction reussit entierement ou est totalement annulee |\n| **C** | Coherence | la base passe d'un etat valide a un autre (contraintes respectees) |\n| **I** | Isolation | les transactions concurrentes ne se marchent pas dessus |\n| **D** | Durabilite | une fois `COMMIT`, les donnees survivent meme a une panne |\n\nSQLite, PostgreSQL, MySQL (moteur InnoDB) et SQL Server sont des bases ACID.\n\n## Exercice\n\n1. Cree `clients` et `commandes` avec cle primaire et cle etrangere.\n2. Cree un index sur `commandes(client_id)`.\n3. Ecris une transaction qui insere un client et sa commande, puis `COMMIT`.\n\n## Explique avec tes mots (Feynman)\n\n- Une cle primaire est ____ et ____ ; une cle etrangere sert a ____.\n- Un index accelere ____ au prix de ____.\n- La normalisation vise a ____.\n- ACID signifie : A=____, C=____, I=____, D=____.",
      "playground": {
        "language": "sql",
        "code": "-- Chapitre 6 : cles, index, transaction\nPRAGMA foreign_keys = ON;  -- active la verification des cles etrangeres (SQLite)\n\nCREATE TABLE clients (\n    id  INTEGER PRIMARY KEY,\n    nom VARCHAR(50) NOT NULL\n);\n\nCREATE TABLE commandes (\n    id        INTEGER PRIMARY KEY,\n    client_id INTEGER,\n    montant   DECIMAL(8,2),\n    FOREIGN KEY (client_id) REFERENCES clients(id)\n);\n\n-- Index pour accelerer les recherches/jointures sur client_id\nCREATE INDEX idx_commandes_client ON commandes(client_id);\n\n-- Transaction : tout ou rien\nBEGIN TRANSACTION;\n    INSERT INTO clients (id, nom) VALUES (1, 'Dupont');\n    INSERT INTO commandes (id, client_id, montant) VALUES (10, 1, 49.90);\nCOMMIT;\n\n-- Verification\nSELECT c.nom, o.montant\nFROM clients c\nJOIN commandes o ON o.client_id = c.id;"
      },
      "quiz": [
        {
          "question": "Quelle propriete N'EST PAS exigee d'une cle primaire ?",
          "options": [
            "Etre unique",
            "Etre non NULL",
            "Pouvoir contenir des doublons",
            "Identifier une ligne de maniere certaine"
          ],
          "correctIndex": 2,
          "explanation": "Une cle primaire est unique et non NULL ; elle ne peut justement PAS contenir de doublons, sinon elle n'identifierait plus chaque ligne de facon certaine."
        },
        {
          "question": "Quel est le principal AVANTAGE d'un index, et son principal COUT ?",
          "options": [
            "Il accelere les lectures filtrees, mais ralentit les ecritures et occupe de l'espace",
            "Il reduit l'espace disque, mais ralentit les lectures",
            "Il chiffre les donnees, mais consomme du CPU",
            "Il supprime les doublons, mais perd des donnees"
          ],
          "correctIndex": 0,
          "explanation": "Un index accelere WHERE/JOIN/ORDER BY sur la colonne, mais il doit etre maintenu a chaque INSERT/UPDATE/DELETE et prend de la place."
        },
        {
          "question": "Dans ACID, que garantit l'Atomicite ?",
          "options": [
            "Que les transactions concurrentes sont isolees",
            "Que les donnees survivent a une panne apres COMMIT",
            "Que la transaction s'execute entierement ou est totalement annulee (tout ou rien)",
            "Que la base reste coherente vis-a-vis des contraintes"
          ],
          "correctIndex": 2,
          "explanation": "L'Atomicite, c'est le 'tout ou rien' : soit toutes les operations de la transaction reussissent, soit aucune (ROLLBACK). La survie post-COMMIT est la Durabilite ; l'isolation des concurrents est l'Isolation."
        }
      ]
    }
  ]
};
