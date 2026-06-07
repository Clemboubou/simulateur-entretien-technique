window.COURSES = window.COURSES || {};
window.COURSES["docker"] = {
  "id": "docker",
  "title": "Docker",
  "icon": "DKR",
  "summary": "Comprendre et utiliser Docker pas a pas : conteneurs vs VM, Dockerfile, commandes essentielles, volumes et reseaux, docker-compose, et bonnes pratiques de production. Un cours pour passer de debutant a junior capable de conteneuriser une application.",
  "chapters": [
    {
      "id": "conteneurs-vs-vm",
      "title": "Conteneurs vs VM : pourquoi Docker ?",
      "markdown": "# Conteneurs vs machines virtuelles : pourquoi Docker ?\n\n## La metaphore\n\nImagine que tu deplaces une plante.\n\n- **La machine virtuelle (VM)**, c'est demenager la plante avec toute la serre : la structure, le chauffage, le systeme d'arrosage. Lourd, lent, mais tres isole.\n- **Le conteneur Docker**, c'est deplacer la plante dans un pot avec juste la bonne terre. Leger, rapide, et ca pousse partout.\n\nDocker te permet d'emballer ton application **avec exactement ce dont elle a besoin pour tourner** (le code, les bibliotheques, la bonne version de Java ou de Node) dans un \"pot\" portable qu'on appelle un **conteneur**.\n\n## Le probleme que Docker resout\n\nLa phrase que tout developpeur a deja entendue : *\"Pourtant, ca marche sur ma machine !\"*\n\nTon application fonctionne sur ton PC parce que tu as installe la bonne version de .NET, les bonnes dependances, les bonnes variables d'environnement. Sur le serveur de production, rien de tout ca n'est garanti. Resultat : ca casse.\n\nDocker resout ce probleme en **figeant l'environnement complet** avec l'application. Si ca tourne dans le conteneur sur ton PC, ca tournera a l'identique sur le serveur. C'est la promesse : *\"build once, run anywhere\"*.\n\n## VM vs conteneur : la difference technique\n\nUne **machine virtuelle** simule un ordinateur complet. Elle embarque un **systeme d'exploitation entier** (un Linux ou Windows complet) au-dessus d'une couche appelee *hyperviseur*. Demarrer une VM, c'est demarrer un OS : ca prend des Go de disque et des dizaines de secondes.\n\nUn **conteneur** ne simule pas un OS complet. Il **partage le noyau (kernel) du systeme hote** et n'embarque que ce qui est specifique a l'application. Resultat : quelques Mo a quelques centaines de Mo, et un demarrage en **moins d'une seconde**.\n\n```\nMACHINE VIRTUELLE                 CONTENEUR DOCKER\n+----------------------+          +----------------------+\n| App A   |  App B     |          | App A  | App B | App C|\n+---------+------------+          +--------+-------+------+\n| OS invite | OS invite|          |     Docker Engine     |\n+----------------------+          +----------------------+\n|     Hyperviseur      |          |   OS hote (kernel)    |\n+----------------------+          +----------------------+\n|     OS hote          |          |      Materiel         |\n+----------------------+          +----------------------+\n|     Materiel         |\n+----------------------+\n```\n\n| Critere | Machine virtuelle | Conteneur Docker |\n|---|---|---|\n| Taille | Plusieurs Go | Quelques Mo a centaines de Mo |\n| Demarrage | Dizaines de secondes | < 1 seconde |\n| Isolation | Tres forte (OS complet) | Forte (partage le kernel) |\n| Densite | Quelques VM par machine | Des dizaines/centaines de conteneurs |\n\n## Image vs conteneur : LE concept a comprendre\n\nC'est la distinction la plus importante du chapitre.\n\n- Une **image** est un modele **fige, en lecture seule**. C'est la recette + les ingredients emballes. Exemple : l'image `node:20`, l'image `postgres:16`.\n- Un **conteneur** est une **instance vivante** d'une image, en cours d'execution. C'est le gateau sorti du four a partir de la recette.\n\nLa bonne analogie en programmation : **l'image est a la classe ce que le conteneur est a l'objet (l'instance)**. A partir d'une seule image, tu peux lancer 1, 10 ou 100 conteneurs identiques.\n\n```bash\n# Une image telechargee une fois\ndocker pull nginx:latest\n\n# Trois conteneurs lances depuis la MEME image\ndocker run -d --name web1 nginx:latest\ndocker run -d --name web2 nginx:latest\ndocker run -d --name web3 nginx:latest\n```\n\n## Le vocabulaire de base\n\n- **Docker Engine** : le moteur qui fait tourner les conteneurs sur ta machine.\n- **Image** : le modele fige (lecture seule).\n- **Conteneur** : l'instance en execution.\n- **Registry** (registre) : un entrepot d'images. Le plus connu est **Docker Hub**. C'est comme un \"npm\" ou un \"NuGet\" mais pour les images Docker.\n- **Tag** : la version d'une image, ex : `node:20`, `node:20-alpine`, `node:latest`.\n\n## Reformule (technique Feynman)\n\nPour verifier que tu as compris, explique a voix haute :\n\n1. Pourquoi un conteneur demarre-t-il plus vite qu'une VM ?\n2. Quelle est la difference entre une image et un conteneur ?\n3. Que veut dire \"ca marche sur ma machine\" et comment Docker corrige ce probleme ?\n\nSi tu sais repondre sans relire, le chapitre est acquis.",
      "playground": null,
      "quiz": [
        {
          "question": "Quelle est la difference fondamentale entre un conteneur et une machine virtuelle ?",
          "options": [
            "Le conteneur partage le noyau (kernel) de l'OS hote, alors que la VM embarque un OS complet",
            "La VM est plus legere et demarre plus vite que le conteneur",
            "Le conteneur ne peut faire tourner qu'une seule application au total sur la machine",
            "Il n'y a aucune difference, ce sont deux mots pour la meme chose"
          ],
          "correctIndex": 0,
          "explanation": "Le conteneur partage le kernel de l'hote et n'embarque que ce qui est specifique a l'application, ce qui le rend bien plus leger et rapide qu'une VM qui simule un OS complet via un hyperviseur."
        },
        {
          "question": "Quelle analogie decrit le mieux la relation entre une image et un conteneur ?",
          "options": [
            "L'image est l'instance en execution, le conteneur est le modele fige",
            "L'image est a la classe ce que le conteneur est a l'objet (l'instance)",
            "L'image et le conteneur sont deux fichiers identiques",
            "Le conteneur contient plusieurs images empilees"
          ],
          "correctIndex": 1,
          "explanation": "Une image est un modele fige en lecture seule (comme une classe). Un conteneur est une instance vivante de cette image (comme un objet). On peut lancer plusieurs conteneurs depuis une seule image."
        },
        {
          "question": "Qu'est-ce que Docker Hub ?",
          "options": [
            "Un editeur de code pour ecrire des Dockerfile",
            "Le moteur qui execute les conteneurs sur ta machine",
            "Un registry (entrepot) public d'images Docker, comme un 'npm' des images",
            "Un outil pour creer des machines virtuelles"
          ],
          "correctIndex": 2,
          "explanation": "Docker Hub est le registry public le plus connu : un entrepot d'images pretes a l'emploi (nginx, postgres, node...) que l'on telecharge avec docker pull."
        }
      ]
    },
    {
      "id": "dockerfile",
      "title": "Le Dockerfile, les layers et le cache",
      "markdown": "# Le Dockerfile : la recette de ton image\n\n## La metaphore\n\nLe **Dockerfile** est une **recette de cuisine**. Chaque ligne est une etape : \"prends une base\", \"ajoute ces ingredients\", \"fais cuire\". A la fin, tu obtiens un plat (l'image) reproductible a l'identique.\n\nUn Dockerfile est un simple fichier texte, nomme exactement `Dockerfile` (sans extension), pose a la racine de ton projet. Docker le lit ligne par ligne pour **construire** ton image.\n\n## Les instructions essentielles\n\nVoici un Dockerfile commente pour une petite application Node.js :\n\n```dockerfile\n# FROM : l'image de base, le point de depart obligatoire\nFROM node:20-alpine\n\n# ENV : definit une variable d'environnement\nENV NODE_ENV=production\n\n# WORKDIR : se place dans un dossier de travail (et le cree si besoin)\nWORKDIR /app\n\n# COPY : copie des fichiers depuis ta machine vers l'image\nCOPY package.json package-lock.json ./\n\n# RUN : execute une commande PENDANT la construction de l'image\nRUN npm install --production\n\n# Copie le reste du code source\nCOPY . .\n\n# EXPOSE : documente le port que l'application utilise\nEXPOSE 3000\n\n# CMD : la commande lancee au DEMARRAGE du conteneur\nCMD [\"node\", \"server.js\"]\n```\n\n### Le detail de chaque instruction\n\n- **`FROM`** : l'image de depart. On part presque toujours d'une image existante (`node`, `python`, `eclipse-temurin` pour Java...). Premiere ligne obligatoire.\n- **`ENV`** : declare une variable d'environnement disponible pendant la construction ET dans le conteneur.\n- **`WORKDIR`** : definit le repertoire courant. Toutes les instructions suivantes s'executent depuis la. Equivalent d'un `cd`, mais propre.\n- **`COPY`** : copie des fichiers de ta machine (le *contexte de build*) vers l'image. `COPY source destination`.\n- **`RUN`** : execute une commande **au moment du build** (installer des paquets, compiler...). Chaque `RUN` cree une nouvelle couche.\n- **`EXPOSE`** : **documente** le port ecoute par l'app. Attention : c'est purement informatif, ca **n'ouvre pas** le port. La vraie ouverture se fait avec `-p` au `run` (chapitre suivant).\n- **`CMD`** : la commande executee **quand le conteneur demarre**. Il ne doit y avoir qu'un seul `CMD` actif.\n\n## CMD vs ENTRYPOINT : la nuance qui piege les juniors\n\nLes deux definissent ce qui se lance au demarrage, mais avec une difference de comportement :\n\n- **`CMD`** fournit une commande/des arguments **par defaut**, facilement **remplacables** par l'utilisateur au moment du `docker run`.\n- **`ENTRYPOINT`** definit l'executable **fixe** du conteneur. Ce qu'on passe au `run` devient alors des **arguments** de cet executable.\n\n```dockerfile\n# Avec CMD seul : 'docker run monimage echo salut' remplace TOUT le CMD\nCMD [\"node\", \"server.js\"]\n\n# Avec ENTRYPOINT : l'executable est fige, on ne fait qu'ajouter des arguments\nENTRYPOINT [\"node\"]\nCMD [\"server.js\"]   # argument par defaut, modifiable\n```\n\nRegle simple a retenir : utilise **`ENTRYPOINT`** quand ton conteneur est concu comme **un programme precis** (le conteneur EST cette commande), et **`CMD`** quand tu veux juste une commande par defaut facilement remplacable. En cas de doute, `CMD` suffit dans 90 % des cas.\n\n> **Forme JSON recommandee** : ecris toujours `CMD [\"node\", \"server.js\"]` (forme \"exec\", tableau JSON) plutot que `CMD node server.js` (forme \"shell\"). La forme exec gere mieux l'arret propre du conteneur (signaux).\n\n## Layers (couches) et cache : le secret de la rapidite\n\nChaque instruction du Dockerfile cree une **couche (layer)** : une fine strate empilee sur la precedente. Une image, c'est un empilement de couches en lecture seule.\n\nL'interet ? Docker **met en cache** chaque couche. Quand tu reconstruis l'image, si une instruction et ses fichiers n'ont **pas change**, Docker **reutilise la couche du cache** au lieu de tout refaire. C'est ce qui rend les rebuilds quasi instantanes.\n\n**La regle d'or** : Docker invalide le cache d'une couche **et de toutes les suivantes** des qu'une couche change. Donc on place ce qui change **rarement** en haut, et ce qui change **souvent** en bas.\n\nC'est exactement pourquoi, dans l'exemple plus haut, on copie `package.json` **avant** le reste du code :\n\n```dockerfile\n# BON : les dependances ne sont reinstallees QUE si package.json change\nCOPY package.json package-lock.json ./\nRUN npm install --production\nCOPY . .\n```\n\n```dockerfile\n# MAUVAIS : la moindre modif d'un fichier source casse le cache\n# et relance npm install a chaque build (lent !)\nCOPY . .\nRUN npm install --production\n```\n\nDans le \"mauvais\" exemple, comme `COPY . .` change a chaque modification du code, la couche `RUN npm install` est invalidee a chaque fois. On reinstalle tout, pour rien.\n\n## Reformule (technique Feynman)\n\n1. A quoi sert `WORKDIR` et pourquoi c'est mieux qu'enchainer des `cd` ?\n2. Pourquoi copie-t-on `package.json` avant le reste du code ?\n3. Quelle est la difference entre `RUN`, `CMD` et `ENTRYPOINT` ?",
      "playground": null,
      "quiz": [
        {
          "question": "Pourquoi copie-t-on souvent package.json (ou pom.xml, requirements.txt) AVANT le reste du code source ?",
          "options": [
            "Parce que Docker refuse de copier le code source sans ce fichier d'abord",
            "Pour profiter du cache : tant que les dependances ne changent pas, Docker reutilise la couche d'installation au lieu de tout reinstaller",
            "Parce que l'ordre des COPY n'a aucune importance, c'est juste une convention esthetique",
            "Pour reduire la taille finale de l'image de moitie"
          ],
          "correctIndex": 1,
          "explanation": "Chaque instruction cree une couche mise en cache. En copiant d'abord le fichier de dependances, la couche d'installation (npm install) n'est rejouee QUE si ce fichier change, pas a chaque modification du code source."
        },
        {
          "question": "Quelle est la difference entre RUN et CMD ?",
          "options": [
            "RUN s'execute pendant la construction de l'image, CMD s'execute au demarrage du conteneur",
            "RUN s'execute au demarrage du conteneur, CMD pendant la construction",
            "Les deux s'executent au demarrage du conteneur, sans difference",
            "RUN sert a definir des variables, CMD a copier des fichiers"
          ],
          "correctIndex": 0,
          "explanation": "RUN execute une commande au moment du build (installer, compiler) et fige son resultat dans une couche. CMD definit la commande lancee quand le conteneur demarre."
        },
        {
          "question": "Que fait reellement l'instruction EXPOSE 3000 ?",
          "options": [
            "Elle ouvre le port 3000 et le rend accessible depuis l'exterieur automatiquement",
            "Elle redirige tout le trafic de la machine vers le port 3000",
            "Elle documente que l'application ecoute sur le port 3000, mais n'ouvre rien : il faut -p au docker run",
            "Elle installe un serveur web sur le port 3000"
          ],
          "correctIndex": 2,
          "explanation": "EXPOSE est purement informatif (documentation). Pour rendre le port accessible depuis l'hote, il faut publier le port avec l'option -p lors du docker run."
        }
      ]
    },
    {
      "id": "commandes-essentielles",
      "title": "Les commandes essentielles et le mapping de ports",
      "markdown": "# Les commandes essentielles au quotidien\n\n## La metaphore\n\nSi le Dockerfile est la recette et l'image le plat emballe, les commandes Docker sont tes **ustensiles de cuisine** : construire le plat, le sortir, verifier ce qui mijote, gouter, ranger. Une dizaine de commandes couvrent 95 % du travail quotidien.\n\n## Construire une image : `docker build`\n\n```bash\n# Construit une image a partir du Dockerfile du dossier courant (le \".\")\n# -t donne un nom (tag) a l'image\ndocker build -t mon-app:1.0 .\n```\n\nLe `.` final est **le contexte de build** : le dossier que Docker envoie au moteur (il y cherche le `Dockerfile` et les fichiers a `COPY`). Le `-t mon-app:1.0` nomme l'image `mon-app` avec le tag `1.0`.\n\n## Lancer un conteneur : `docker run`\n\n```bash\n# Lance un conteneur a partir de l'image\ndocker run mon-app:1.0\n\n# Options tres frequentes :\n#  -d        : detache (en arriere-plan), rend la main au terminal\n#  --name    : donne un nom lisible au conteneur\n#  -p        : publie un port (voir plus bas)\n#  --rm      : supprime le conteneur automatiquement a son arret\ndocker run -d --name web -p 8080:3000 mon-app:1.0\n```\n\n## Le mapping de ports : l'option `-p`\n\nC'est LE point qui bloque beaucoup de debutants. Par defaut, un conteneur est **isole** : meme s'il ecoute sur le port 3000 a l'interieur, tu ne peux **pas** y acceder depuis ton navigateur. Il faut **publier** le port.\n\nLa syntaxe est `-p PORT_HOTE:PORT_CONTENEUR` :\n\n```bash\ndocker run -p 8080:3000 mon-app:1.0\n#            ^^^^ ^^^^\n#            |    |\n#            |    +-- port a l'INTERIEUR du conteneur (celui que l'app ecoute)\n#            +------- port sur TA machine (l'hote)\n```\n\nAvec cette commande : tu ouvres `http://localhost:8080` dans ton navigateur, et le trafic est redirige vers le port `3000` du conteneur.\n\n> Moyen mnemotechnique : **hote a gauche, conteneur a droite** (de l'exterieur vers l'interieur). On lit \"8080 de l'hote pointe vers 3000 du conteneur\".\n\n## Inspecter ce qui tourne : `docker ps`\n\n```bash\n# Liste les conteneurs EN COURS d'execution\ndocker ps\n\n# Liste TOUS les conteneurs, y compris ceux arretes (-a = all)\ndocker ps -a\n```\n\n## Lister les images : `docker images`\n\n```bash\n# Affiche toutes les images presentes localement\ndocker images\n```\n\n## Entrer dans un conteneur : `docker exec`\n\nTres utile pour deboguer un conteneur en cours d'execution, en ouvrant un shell a l'interieur :\n\n```bash\n# -i = interactif, -t = terminal. On ouvre un shell dans le conteneur 'web'\ndocker exec -it web sh\n\n# (avec une image Debian/Ubuntu, on utilise bash a la place de sh)\ndocker exec -it web bash\n```\n\n## Voir les logs : `docker logs`\n\n```bash\n# Affiche la sortie (stdout/stderr) du conteneur\ndocker logs web\n\n# -f = follow : suit les logs en temps reel (comme tail -f)\ndocker logs -f web\n```\n\n## Arreter et supprimer\n\n```bash\n# Arrete proprement un conteneur en cours\ndocker stop web\n\n# Supprime un conteneur ARRETE\ndocker rm web\n\n# Supprime une image (le conteneur doit etre supprime d'abord)\ndocker rmi mon-app:1.0\n```\n\n## Le cycle de vie typique\n\n```bash\ndocker build -t mon-app:1.0 .          # 1. construire l'image\ndocker run -d --name web -p 8080:3000 mon-app:1.0   # 2. lancer\ndocker ps                              # 3. verifier que ca tourne\ndocker logs -f web                     # 4. surveiller les logs\ndocker exec -it web sh                 # 5. deboguer si besoin\ndocker stop web                        # 6. arreter\ndocker rm web                          # 7. nettoyer\n```\n\n## Reformule (technique Feynman)\n\n1. Dans `-p 8080:3000`, lequel est le port de ta machine, lequel celui du conteneur ?\n2. Quelle est la difference entre `docker ps` et `docker ps -a` ?\n3. A quoi sert `docker exec -it web sh` ?",
      "playground": null,
      "quiz": [
        {
          "question": "Dans la commande 'docker run -p 8080:3000 mon-app', a quoi correspond le 3000 ?",
          "options": [
            "Au port sur la machine hote, accessible dans le navigateur",
            "Au port a l'interieur du conteneur, celui que l'application ecoute",
            "Au nombre maximum de conteneurs autorises",
            "Au temps en millisecondes avant le demarrage"
          ],
          "correctIndex": 1,
          "explanation": "La syntaxe est -p HOTE:CONTENEUR. Donc 8080 est le port sur ta machine (a gauche) et 3000 le port a l'interieur du conteneur (a droite). On ouvre localhost:8080 et c'est redirige vers 3000."
        },
        {
          "question": "Comment lister TOUS les conteneurs, y compris ceux qui sont arretes ?",
          "options": [
            "docker ps",
            "docker images",
            "docker ps -a",
            "docker logs -a"
          ],
          "correctIndex": 2,
          "explanation": "docker ps n'affiche que les conteneurs en cours d'execution. L'option -a (all) ajoute aussi les conteneurs arretes."
        },
        {
          "question": "Quelle commande permet d'ouvrir un shell interactif a l'interieur d'un conteneur deja en cours d'execution pour le deboguer ?",
          "options": [
            "docker run -it web sh",
            "docker exec -it web sh",
            "docker build -it web sh",
            "docker logs -it web sh"
          ],
          "correctIndex": 1,
          "explanation": "docker exec execute une commande dans un conteneur DEJA en cours. Avec -it (interactif + terminal) et sh (ou bash), on obtient un shell pour inspecter le conteneur. docker run, lui, creerait un nouveau conteneur."
        }
      ]
    },
    {
      "id": "volumes-reseaux-env",
      "title": "Volumes, persistance, variables d'environnement et reseaux",
      "markdown": "# Volumes, variables d'environnement et reseaux\n\n## Le probleme : un conteneur est ephemere\n\nPar defaut, **tout ce qu'un conteneur ecrit dans son systeme de fichiers disparait quand il est supprime**. Si ta base de donnees PostgreSQL tourne dans un conteneur et que tu fais `docker rm`, **toutes les donnees sont perdues**.\n\nMetaphore : un conteneur, c'est une **chambre d'hotel**. Tu peux y vivre, poser tes affaires, mais quand tu rends la chambre (suppression), tout ce qui etait dedans est jete. Pour garder tes affaires, il faut un **coffre externe** : c'est le **volume**.\n\n## Les volumes : rendre les donnees persistantes\n\nUn **volume** est un espace de stockage **gere par Docker, en dehors du conteneur**. Il survit a la suppression du conteneur.\n\n```bash\n# Cree un volume nomme\ndocker volume create donnees-db\n\n# Monte ce volume dans le conteneur a l'emplacement des donnees PostgreSQL\ndocker run -d --name db \\\n  -v donnees-db:/var/lib/postgresql/data \\\n  postgres:16\n```\n\nIci, `-v donnees-db:/var/lib/postgresql/data` dit : \"branche le volume `donnees-db` sur le dossier `/var/lib/postgresql/data` du conteneur\". Meme si tu supprimes le conteneur `db`, le volume `donnees-db` (et donc tes donnees) reste intact.\n\n### Volume nomme vs bind mount\n\nIl existe deux facons de monter des donnees :\n\n```bash\n# 1. VOLUME NOMME : gere par Docker, ideal pour les donnees de prod (bases)\ndocker run -v donnees-db:/var/lib/postgresql/data postgres:16\n\n# 2. BIND MOUNT : lie un dossier de TA machine au conteneur.\n# Ideal en developpement pour voir ses modifs de code en direct.\ndocker run -v C:/projets/site:/app mon-app\n```\n\nA retenir : **volume nomme** pour les donnees applicatives (bases, fichiers uploades), **bind mount** pour partager du code en developpement.\n\n## Les variables d'environnement\n\nOn ne code **jamais** un mot de passe ou une URL de base de donnees en dur dans l'image. On les injecte au demarrage via des variables d'environnement.\n\n```bash\n# -e pour passer une variable a la fois\ndocker run -d --name db \\\n  -e POSTGRES_PASSWORD=motdepasse \\\n  -e POSTGRES_DB=ma_base \\\n  postgres:16\n\n# --env-file pour charger un fichier .env entier\ndocker run -d --env-file .env mon-app:1.0\n```\n\nUn fichier `.env` ressemble a ceci :\n\n```bash\nPOSTGRES_PASSWORD=motdepasse\nPOSTGRES_DB=ma_base\nAPP_PORT=3000\n```\n\n> Important : n'ajoute **jamais** ton `.env` (qui contient des secrets) dans Git. Mets-le dans ton `.gitignore`.\n\n## Les reseaux : faire communiquer les conteneurs\n\nPar defaut, deux conteneurs ne se voient pas forcement. Pour qu'une application parle a sa base de donnees, on les place sur le **meme reseau Docker**.\n\nLa magie : sur un reseau Docker personnalise, **les conteneurs se trouvent par leur nom**. Pas besoin de connaitre une adresse IP, Docker fournit une resolution DNS interne.\n\n```bash\n# 1. Cree un reseau\ndocker network create mon-reseau\n\n# 2. Lance la base sur ce reseau\ndocker run -d --name db --network mon-reseau \\\n  -e POSTGRES_PASSWORD=secret postgres:16\n\n# 3. Lance l'app sur le MEME reseau\ndocker run -d --name api --network mon-reseau mon-app:1.0\n```\n\nDepuis le conteneur `api`, on se connecte a la base via le **nom** `db` (pas via une IP) :\n\n```bash\n# Dans l'application, la chaine de connexion utilise 'db' comme hote :\n# postgres://user:secret@db:5432/ma_base\n#                            ^^ le nom du conteneur sert d'adresse !\n```\n\nC'est un point cle : a l'interieur du reseau Docker, **le nom du conteneur est son nom d'hote**. Tu n'utilises `localhost` que depuis ta machine, jamais entre deux conteneurs.\n\n## Reformule (technique Feynman)\n\n1. Pourquoi les donnees d'une base disparaissent-elles sans volume ?\n2. Quand utiliser un volume nomme et quand un bind mount ?\n3. Comment le conteneur `api` trouve-t-il le conteneur `db` sans connaitre son IP ?",
      "playground": null,
      "quiz": [
        {
          "question": "Que se passe-t-il pour les donnees ecrites dans un conteneur (sans volume) quand on le supprime avec docker rm ?",
          "options": [
            "Elles sont automatiquement sauvegardees dans Docker Hub",
            "Elles sont perdues : le systeme de fichiers du conteneur est ephemere",
            "Elles sont copiees dans l'image d'origine",
            "Elles restent accessibles dans le cache de build"
          ],
          "correctIndex": 1,
          "explanation": "Le systeme de fichiers d'un conteneur est ephemere. Sans volume, tout ce qui y a ete ecrit disparait a la suppression du conteneur. C'est pour ca qu'on utilise un volume pour persister les donnees."
        },
        {
          "question": "Sur un reseau Docker personnalise, comment un conteneur 'api' se connecte-t-il au conteneur 'db' ?",
          "options": [
            "En utilisant localhost:5432",
            "En devant connaitre l'adresse IP exacte du conteneur db",
            "En utilisant le nom du conteneur 'db' comme nom d'hote (resolution DNS interne)",
            "Les conteneurs ne peuvent jamais communiquer entre eux"
          ],
          "correctIndex": 2,
          "explanation": "Sur un reseau Docker personnalise, Docker fournit une resolution DNS interne : le nom du conteneur (db) sert directement de nom d'hote. Pas besoin d'IP. localhost ne fonctionnerait pas entre deux conteneurs distincts."
        },
        {
          "question": "Quelle est la bonne pratique pour fournir un mot de passe de base de donnees a un conteneur ?",
          "options": [
            "L'ecrire en dur dans le Dockerfile avec RUN",
            "Le passer via une variable d'environnement (-e ou --env-file), jamais en dur dans l'image",
            "Le mettre directement dans le code source pousse sur Git",
            "Le saisir manuellement a chaque requete"
          ],
          "correctIndex": 1,
          "explanation": "On injecte les secrets via des variables d'environnement (-e ou un fichier .env), jamais en dur dans l'image ou dans Git. Le fichier .env doit etre dans le .gitignore."
        }
      ]
    },
    {
      "id": "docker-compose",
      "title": "docker-compose : orchestrer plusieurs services",
      "markdown": "# docker-compose : tout lancer d'une seule commande\n\n## Le probleme\n\nUne vraie application, c'est rarement un seul conteneur. C'est souvent : une API + une base de donnees + un cache (Redis) + un reverse proxy. Lancer tout ca a la main avec plusieurs `docker run`, en gerant les reseaux, les volumes et l'ordre... c'est penible et source d'erreurs.\n\n**docker-compose** resout ce probleme : tu decris **toute ton infrastructure dans un seul fichier YAML**, et tu lances tout avec **une seule commande**.\n\nMetaphore : si `docker run` c'est commander un plat a la fois, `docker-compose` c'est le **menu complet** : tu commandes tout d'un coup et la cuisine s'organise.\n\n## Un fichier compose complet\n\nLe fichier s'appelle `docker-compose.yml` (ou `compose.yml`). Exemple : une API qui depend d'une base PostgreSQL.\n\n```dockerfile\n# Fichier : docker-compose.yml\nservices:\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: secret\n      POSTGRES_DB: ma_base\n    volumes:\n      - donnees-db:/var/lib/postgresql/data\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U postgres\"]\n      interval: 5s\n      timeout: 3s\n      retries: 5\n\n  api:\n    build: .\n    ports:\n      - \"8080:3000\"\n    environment:\n      DATABASE_URL: postgres://postgres:secret@db:5432/ma_base\n    depends_on:\n      db:\n        condition: service_healthy\n\nvolumes:\n  donnees-db:\n```\n\n### Decryptage\n\n- **`services`** : la liste des conteneurs. Ici `db` et `api`. Chaque service a un nom qui sert aussi de nom d'hote sur le reseau (compose cree un reseau automatiquement).\n- **`image`** : utilise une image existante (`postgres:16`).\n- **`build: .`** : au lieu d'une image toute prete, construit l'image a partir du Dockerfile du dossier courant.\n- **`ports`** : equivalent du `-p`. `\"8080:3000\"` publie le port.\n- **`environment`** : les variables d'environnement (equivalent du `-e`).\n- **`volumes`** : monte le volume persistant (declare en bas du fichier).\n- **`depends_on`** : exprime l'ordre de demarrage : `api` ne demarre qu'apres `db`.\n\n## Les commandes de compose\n\n```bash\n# Construit (si besoin) et lance tous les services en arriere-plan\ndocker compose up -d\n\n# Affiche les logs de tous les services\ndocker compose logs -f\n\n# Liste les services du projet\ndocker compose ps\n\n# Arrete et supprime conteneurs + reseau (mais garde les volumes)\ndocker compose down\n\n# Pareil mais supprime AUSSI les volumes (donnees perdues !)\ndocker compose down -v\n```\n\n## LE piege du healthcheck et de depends_on\n\nVoici l'erreur classique que font les juniors, et qu'on adore poser en entretien.\n\nPar defaut, **`depends_on` n'attend PAS que le service soit pret**. Il attend seulement que le conteneur soit **demarre** (le processus est lance), pas qu'il soit **operationnel**.\n\nConcretement : `depends_on: [db]` lance `db` avant `api`, mais une base PostgreSQL met quelques secondes a etre **prete a accepter des connexions**. Pendant ce temps, `api` demarre, tente de se connecter... et **plante** parce que la base ne repond pas encore.\n\nLa solution se voit dans l'exemple ci-dessus, en deux temps :\n\n1. On definit un **`healthcheck`** sur `db` : une commande (`pg_isready`) que Docker rejoue regulierement pour savoir si le service est vraiment **sain** (healthy).\n2. On utilise la forme longue de `depends_on` avec **`condition: service_healthy`** : `api` n'attend plus le simple demarrage de `db`, mais sa **bonne sante**.\n\n```dockerfile\n# La forme qui CORRIGE le piege :\n    depends_on:\n      db:\n        condition: service_healthy   # attend que le healthcheck passe au vert\n```\n\n```dockerfile\n# La forme NAIVE qui provoque le bug (api plante au demarrage) :\n    depends_on:\n      - db                            # attend juste le demarrage, pas la sante\n```\n\nA retenir : **`depends_on` seul gere l'ordre de demarrage, pas la disponibilite**. Pour attendre qu'un service soit reellement utilisable, il faut un `healthcheck` + `condition: service_healthy`. (En complement, une application robuste doit aussi savoir reessayer sa connexion : on ne se repose jamais a 100 % sur l'ordre de demarrage.)\n\n## Reformule (technique Feynman)\n\n1. Quel probleme docker-compose resout-il par rapport a plusieurs `docker run` ?\n2. Pourquoi `depends_on: [db]` ne suffit-il pas a garantir que la base est prete ?\n3. Comment fait-on pour qu'un service attende reellement qu'un autre soit sain ?",
      "playground": null,
      "quiz": [
        {
          "question": "Par defaut, que garantit reellement 'depends_on: [db]' dans docker-compose ?",
          "options": [
            "Que la base de donnees est totalement prete a accepter des connexions avant de lancer l'api",
            "Seulement que le conteneur db est demarre (processus lance), pas qu'il est operationnel",
            "Que db et api demarrent exactement en meme temps",
            "Que les donnees de db sont sauvegardees avant le demarrage de api"
          ],
          "correctIndex": 1,
          "explanation": "C'est le piege classique : depends_on garantit seulement l'ORDRE de demarrage (db demarre avant api), mais pas que db soit pret a repondre. L'api peut donc planter en tentant de se connecter a une base encore en cours d'initialisation."
        },
        {
          "question": "Comment garantir qu'un service api attend que la base db soit vraiment prete a repondre ?",
          "options": [
            "En ajoutant simplement plus de services dans depends_on",
            "En definissant un healthcheck sur db et un depends_on avec condition: service_healthy",
            "En lancant api manuellement plusieurs minutes apres db",
            "C'est impossible avec docker-compose"
          ],
          "correctIndex": 1,
          "explanation": "On definit un healthcheck sur db (ex: pg_isready) puis on utilise la forme longue depends_on avec condition: service_healthy. Ainsi api n'attend pas le simple demarrage mais la bonne sante effective de db."
        },
        {
          "question": "Que fait la commande 'docker compose down -v' ?",
          "options": [
            "Elle arrete les services mais conserve absolument tout, y compris les volumes",
            "Elle arrete et supprime les conteneurs, le reseau ET les volumes (donc les donnees persistees)",
            "Elle met en pause les conteneurs sans rien supprimer",
            "Elle reconstruit les images en mode verbose"
          ],
          "correctIndex": 1,
          "explanation": "docker compose down supprime conteneurs et reseau mais garde les volumes. L'option -v supprime EN PLUS les volumes, donc les donnees persistees sont effacees. A utiliser avec prudence."
        }
      ]
    },
    {
      "id": "bonnes-pratiques",
      "title": "Bonnes pratiques : multi-stage, .dockerignore, images legeres",
      "markdown": "# Bonnes pratiques pour des images propres et legeres\n\n## Pourquoi se soucier de la taille et de la proprete ?\n\nUne image lourde, c'est plus long a construire, a transferer, a deployer, et ca offre une plus grande **surface d'attaque** (plus de logiciels = plus de failles potentielles). Une image legere se deploie vite et reste plus sure. Trois techniques font 90 % du travail.\n\n## 1. Le multi-stage build : compiler dans un atelier, livrer l'essentiel\n\n**Metaphore** : pour construire un meuble, tu as besoin d'un **atelier** rempli d'outils (scie, perceuse...). Mais quand tu livres le meuble au client, tu ne lui livres pas tout l'atelier ! Tu livres juste le meuble fini.\n\nLe multi-stage build fait pareil : une **premiere etape (le \"builder\")** contient tous les outils de compilation. Une **seconde etape** ne recupere que le **resultat final**, et c'est elle qui devient l'image livree. Tous les outils de build sont laisses derriere.\n\n```dockerfile\n# --- Etape 1 : le builder (avec tous les outils) ---\nFROM node:20 AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nRUN npm run build          # produit un dossier /app/dist\n\n# --- Etape 2 : l'image finale (legere) ---\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install --production   # uniquement les deps de prod\n# On recupere SEULEMENT le resultat de l'etape builder :\nCOPY --from=builder /app/dist ./dist\nEXPOSE 3000\nCMD [\"node\", \"dist/server.js\"]\n```\n\nLa cle est `COPY --from=builder` : on ne copie que ce qui est utile (`/app/dist`) depuis l'etape de build. Les devDependencies, le code source brut, les outils de compilation ne se retrouvent **jamais** dans l'image finale. Resultat : une image souvent **plusieurs fois plus petite**.\n\n## 2. Le fichier .dockerignore\n\nQuand tu fais `docker build .`, Docker envoie **tout le dossier** (le contexte) au moteur. Si tu as un `node_modules` de 500 Mo ou un dossier `.git` enorme, tout part inutilement, ce qui **ralentit le build** et risque de copier des fichiers indesirables dans l'image.\n\nLe fichier **`.dockerignore`** (a la racine, comme un `.gitignore`) liste ce qu'il faut **exclure du contexte** :\n\n```bash\n# Fichier : .dockerignore\nnode_modules\nnpm-debug.log\n.git\n.gitignore\nDockerfile\n.dockerignore\n.env\n*.md\ndist\nbuild\ncoverage\n```\n\nBenefices : build plus rapide, image plus propre, et surtout on evite de copier accidentellement des **secrets** (le `.env`) ou des artefacts locaux dans l'image.\n\n## 3. Choisir une image de base legere\n\nLe choix de l'image `FROM` a un impact enorme sur la taille finale.\n\n- Les variantes **`-alpine`** sont basees sur Alpine Linux, une distribution minuscule (~5 Mo). `node:20-alpine` est bien plus petite que `node:20`.\n- Les variantes **`-slim`** (ex : `python:3.12-slim`) sont des versions allegees des images Debian, un bon compromis quand Alpine pose des problemes de compatibilite.\n- Pour les langages compiles (Go, Rust), on peut viser des images **`distroless`** voire `scratch` (vide), contenant uniquement le binaire.\n\n```dockerfile\n# Lourde (image complete, des centaines de Mo)\nFROM node:20\n\n# Legere (variante Alpine, beaucoup plus petite)\nFROM node:20-alpine\n```\n\n> Attention : Alpine utilise `musl` au lieu de `glibc`, ce qui peut casser certaines dependances natives. Si une image Alpine pose souci, replie-toi sur la variante `-slim`.\n\n## Quelques regles bonus\n\n- **Epingle les versions** : ecris `FROM node:20.11-alpine`, pas `FROM node:latest`. `latest` change dans le temps et casse la reproductibilite.\n- **Un processus principal par conteneur** : un conteneur = un role (l'API, ou la base, mais pas les deux).\n- **Ne tourne pas en root** : ajoute un utilisateur non privilegie avec `USER` pour limiter les degats en cas de faille.\n- **Combine les RUN** : enchaine `apt-get update && apt-get install ... && rm -rf /var/lib/apt/lists/*` en un seul RUN pour eviter des couches inutiles.\n\n```dockerfile\n# Exemple : utilisateur non-root\nRUN addgroup -S app && adduser -S app -G app\nUSER app\n```\n\n## Reformule (technique Feynman)\n\n1. Explique le multi-stage build avec l'analogie de l'atelier.\n2. Que se passe-t-il si tu oublies de mettre `node_modules` dans `.dockerignore` ?\n3. Pourquoi `FROM node:20-alpine` est-il preferable a `FROM node:20` pour la prod ?",
      "playground": null,
      "quiz": [
        {
          "question": "Quel est le principal benefice d'un multi-stage build ?",
          "options": [
            "Il permet de lancer plusieurs conteneurs a partir d'un seul Dockerfile",
            "Il laisse les outils de compilation dans l'etape builder et ne garde que le resultat final, produisant une image bien plus legere",
            "Il accelere uniquement le telechargement depuis Docker Hub",
            "Il chiffre automatiquement le code source de l'application"
          ],
          "correctIndex": 1,
          "explanation": "Le multi-stage build separe l'etape de compilation (avec tous les outils) de l'image finale. Grace a COPY --from=builder, seul le resultat utile est conserve : l'image finale ne contient pas les outils de build, donc elle est beaucoup plus legere et plus sure."
        },
        {
          "question": "A quoi sert le fichier .dockerignore ?",
          "options": [
            "A lister les images Docker a telecharger automatiquement",
            "A exclure des fichiers/dossiers du contexte de build (comme node_modules, .git, .env) pour accelerer le build et eviter de copier des secrets",
            "A definir l'ordre de demarrage des services compose",
            "A configurer les ports a publier"
          ],
          "correctIndex": 1,
          "explanation": "Comme un .gitignore, le .dockerignore exclut des fichiers du contexte envoye a Docker. Cela accelere le build, allege l'image et evite de copier accidentellement des secrets (.env) ou des artefacts locaux (node_modules, .git)."
        },
        {
          "question": "Pourquoi vaut-il mieux ecrire FROM node:20.11-alpine plutot que FROM node:latest en production ?",
          "options": [
            "Parce que latest est payant alors que les versions epinglees sont gratuites",
            "Parce que latest change dans le temps (casse la reproductibilite) et que la variante alpine est nettement plus legere",
            "Parce que node:latest ne fonctionne pas du tout avec Docker",
            "Parce que alpine est la seule image compatible avec docker-compose"
          ],
          "correctIndex": 1,
          "explanation": "Epingler une version precise (20.11) garantit la reproductibilite : latest peut changer et casser le build plus tard. La variante -alpine, basee sur une distribution minuscule, reduit fortement la taille de l'image et la surface d'attaque."
        }
      ]
    }
  ]
};
