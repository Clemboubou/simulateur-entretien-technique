window.COURSES = window.COURSES || {};
window.COURSES["git"] = {
  "id": "git",
  "title": "Git",
  "icon": "Git",
  "summary": "Cours complet sur Git pour débutant à junior : concepts fondamentaux, commandes de base, branches, travail à distance (push/pull/PR) et techniques pour annuler ou réécrire l'historique (reset, revert, stash, rebase, cherry-pick).",
  "chapters": [
    {
      "id": "concepts",
      "title": "1. Les concepts de Git",
      "markdown": "# Les concepts de Git\n\n## La métaphore : un photographe et son album\n\nImagine que tu travailles sur un dessin. Toutes les heures, tu prends une **photo** de ton dessin et tu la ranges dans un album, avec une étiquette qui dit ce que tu as changé. Si demain tu te trompes, tu peux ressortir n'importe quelle photo de l'album et repartir de là.\n\nGit, c'est exactement ça pour ton code : un système qui prend des **photos de ton projet à un instant T** et qui les archive pour toujours. Chaque photo s'appelle un **commit**.\n\n## La définition\n\n**Git** est un *système de gestion de versions distribué* (en anglais *Distributed Version Control System*, ou DVCS). Il enregistre l'évolution d'un ensemble de fichiers au fil du temps, pour que tu puisses :\n\n- revenir à une version antérieure,\n- comparer deux versions,\n- travailler à plusieurs sans s'écraser,\n- savoir qui a changé quoi, quand et pourquoi.\n\n« Distribué » signifie que **chaque personne possède une copie complète de l'historique** sur sa machine. Tu n'as pas besoin d'être connecté à un serveur pour consulter l'historique ou créer un commit.\n\n## Le dépôt (repository)\n\nUn **dépôt** (ou *repo*) est un projet suivi par Git. Concrètement, c'est ton dossier de travail dans lequel se cache un sous-dossier `.git`. Ce dossier `.git` contient **toute la base de données de Git** : tous les commits, toutes les branches, toute l'histoire. Si tu le supprimes, tu perds le suivi de version (mais pas tes fichiers actuels).\n\n```bash\n# Lister le contenu d'un dépôt : le .git est caché\nls -la\n# .git/   <- c'est le coffre-fort de Git\n# src/\n# README.md\n```\n\n## Les trois zones (le coeur de Git)\n\nC'est LE concept à comprendre. Un fichier voyage à travers **trois zones** :\n\n1. **Le répertoire de travail** (*working directory*) : tes fichiers réels, ceux que tu édites dans ton éditeur. C'est ton « bureau ».\n2. **La zone de préparation** (*staging area*, ou *index*) : une salle d'attente où tu places les modifications que tu veux inclure dans la prochaine photo. C'est ton « plan de la photo ».\n3. **Le dépôt** (*repository*) : l'album où sont rangées les photos validées (les commits). C'est « définitif et archivé ».\n\nLe parcours typique d'une modification :\n\n```text\n[Working Directory] --git add--> [Staging Area] --git commit--> [Repository]\n     (tu édites)                  (tu prépares)               (tu archives)\n```\n\n### Pourquoi une zone de préparation ?\n\nElle te permet de **choisir précisément** ce qui entre dans un commit. Tu peux modifier 5 fichiers mais ne committer que 2 d'entre eux, pour que chaque commit raconte une seule idée claire.\n\n```bash\n# J'ai modifié plusieurs fichiers, mais je ne prépare que celui-ci\ngit add facture.js\n# Les autres fichiers restent dans le working directory, non préparés\ngit commit -m \"Corrige le calcul de TVA sur la facture\"\n```\n\n## Qu'est-ce qu'un commit, vraiment ?\n\nUn **commit** est un objet immuable qui contient :\n\n- un **instantané** de tous les fichiers suivis à ce moment,\n- un **identifiant unique** (un hash SHA-1 de 40 caractères, par ex. `a1b2c3d...`),\n- un **auteur**, une **date** et un **message**,\n- un **pointeur vers le ou les commits parents**.\n\nComme chaque commit pointe vers son parent, l'historique forme une **chaîne** (un graphe). C'est cette chaîne qui te permet de remonter le temps.\n\n```bash\n# Voir l'identité du dernier commit\ngit log -1\n```\n\n## HEAD : « où je suis »\n\n**HEAD** est un pointeur spécial qui indique **sur quel commit tu te trouves actuellement**. La plupart du temps, HEAD pointe vers la branche courante, qui pointe elle-même vers le dernier commit. Retiens : *HEAD = ma position actuelle dans l'historique.*\n\n## Exercice express\n\n1. Crée un dossier `essai-git`, ouvre un terminal dedans.\n2. Dis à quelle zone appartient un fichier que tu viens d'éditer mais sur lequel tu n'as lancé aucune commande Git.\n3. Réponds : que contient le dossier `.git` ?\n\n## Explique-le (technique Feynman)\n\nÀ voix haute, en 30 secondes, explique à un ami non-développeur : « Git, c'est comme un album photo de mon code. Une modification passe par trois étapes : je l'édite (working directory), je la sélectionne pour la photo (staging), puis je prends la photo (commit). Chaque photo est gardée pour toujours et je peux y revenir. » Si tu y arrives sans hésiter, le chapitre est acquis.",
      "playground": null,
      "quiz": [
        {
          "question": "Dans quelle zone se trouve une modification après un `git add` mais avant un `git commit` ?",
          "options": [
            "Dans le répertoire de travail (working directory)",
            "Dans la zone de préparation (staging area / index)",
            "Dans le dépôt distant (remote)",
            "Dans le commit final, déjà archivée"
          ],
          "correctIndex": 1,
          "explanation": "`git add` déplace la modification du répertoire de travail vers la zone de préparation. Elle n'est archivée dans le dépôt qu'au moment du `git commit`."
        },
        {
          "question": "Que désigne le pointeur HEAD dans Git ?",
          "options": [
            "Le tout premier commit du projet",
            "Le serveur distant par défaut",
            "Le commit (ou la branche) sur lequel on se trouve actuellement",
            "La liste des fichiers ignorés"
          ],
          "correctIndex": 2,
          "explanation": "HEAD indique la position courante dans l'historique : généralement la branche active, qui pointe vers le dernier commit de cette branche."
        },
        {
          "question": "Que signifie le fait que Git soit « distribué » ?",
          "options": [
            "Le code est automatiquement réparti sur plusieurs serveurs",
            "Chaque développeur possède une copie complète de l'historique en local",
            "Les commits sont divisés en plusieurs morceaux",
            "Git nécessite obligatoirement une connexion internet permanente"
          ],
          "correctIndex": 1,
          "explanation": "Dans un système distribué comme Git, chaque clone contient tout l'historique. On peut donc consulter le passé, créer des branches et committer hors ligne."
        }
      ]
    },
    {
      "id": "commandes-base",
      "title": "2. Les commandes de base",
      "markdown": "# Les commandes de base\n\n## La métaphore : préparer et envoyer un colis\n\nUtiliser Git au quotidien, c'est comme préparer un colis : tu choisis quoi mettre dans le carton (`add`), tu fermes et étiquettes le carton (`commit`), et tu vérifies à tout moment où en est ta préparation (`status`).\n\n## Démarrer un dépôt : `init` et `clone`\n\nIl y a deux façons de commencer :\n\n- **`git init`** : transforme un dossier existant en dépôt Git (crée le `.git`). À utiliser quand tu pars de zéro.\n- **`git clone`** : copie un dépôt déjà existant (sur GitHub, GitLab...) sur ta machine, avec tout son historique.\n\n```bash\n# Partir de zéro dans le dossier courant\ngit init\n\n# Récupérer un projet existant\ngit clone https://github.com/utilisateur/mon-projet.git\n```\n\n## Se présenter à Git (à faire une fois)\n\nGit a besoin de savoir qui tu es pour signer tes commits.\n\n```bash\ngit config --global user.name \"Laurent Bourgeois\"\ngit config --global user.email \"laurent@example.com\"\n```\n\nL'option `--global` applique ce réglage à tous tes dépôts. Sans `--global`, le réglage ne vaut que pour le dépôt courant.\n\n## Voir l'état : `git status`\n\nLa commande que tu lanceras le plus souvent. Elle répond à : *« Où en suis-je ? »*\n\n```bash\ngit status\n```\n\nElle te dit notamment :\n\n- les fichiers **modifiés mais non préparés** (en rouge),\n- les fichiers **préparés** prêts à être committés (en vert),\n- les fichiers **non suivis** (*untracked*), que Git ne connaît pas encore,\n- sur quelle **branche** tu es.\n\n## Préparer : `git add`\n\n```bash\n# Préparer un fichier précis\ngit add index.html\n\n# Préparer plusieurs fichiers\ngit add index.html style.css\n\n# Préparer TOUT ce qui a changé dans le dossier courant et ses sous-dossiers\ngit add .\n```\n\nAttention : `git add .` est pratique mais ajoute aussi des fichiers que tu ne veux peut-être pas. Vérifie toujours avec `git status` avant.\n\n## Archiver : `git commit`\n\n```bash\n# Crée un commit avec un message\ngit commit -m \"Ajoute la page d'accueil\"\n\n# Raccourci : add (fichiers déjà suivis) + commit en une fois\ngit commit -am \"Corrige le titre de la page\"\n```\n\nLe `-a` n'inclut **que les fichiers déjà suivis** par Git ; un fichier tout neuf (*untracked*) devra d'abord passer par `git add`.\n\n### Écrire un bon message de commit\n\n- À l'impératif présent : « Ajoute », « Corrige », « Supprime ».\n- Court et descriptif : *quoi* et *pourquoi*, pas *comment*.\n- Exemple bon : `Corrige la division par zéro dans le calcul de moyenne`.\n- Exemple faible : `maj`, `fix`, `truc`.\n\n## Consulter l'historique : `git log`\n\n```bash\n# Historique complet\ngit log\n\n# Version compacte : une ligne par commit\ngit log --oneline\n\n# Avec un schéma des branches\ngit log --oneline --graph --all\n```\n\n```text\na1b2c3d (HEAD -> main) Ajoute la page d'accueil\n9f8e7d6 Configure le projet\n```\n\n## Voir ce qui a changé : `git diff`\n\n```bash\n# Modifications non encore préparées\ngit diff\n\n# Modifications déjà préparées (dans le staging)\ngit diff --staged\n```\n\n## Ignorer des fichiers : `.gitignore`\n\nCertains fichiers ne doivent **jamais** être versionnés : dépendances installées (`node_modules`), fichiers compilés (`bin/`, `obj/`), secrets (`.env`), fichiers temporaires de l'IDE. On les liste dans un fichier nommé `.gitignore` à la racine du projet.\n\n```text\n# Dépendances\nnode_modules/\n\n# Build .NET\nbin/\nobj/\n\n# Secrets et config locale\n.env\n*.local\n\n# Fichiers système\n.DS_Store\nThumbs.db\n```\n\nPoint important : `.gitignore` **n'ignore pas un fichier déjà suivi**. Si tu as déjà committé un fichier puis que tu l'ajoutes au `.gitignore`, il faut le retirer du suivi :\n\n```bash\ngit rm --cached secret.env\n```\n\n## Exercice express\n\n1. `git init` dans un dossier vide.\n2. Crée un fichier `notes.txt`, lance `git status` : dans quelle catégorie apparaît-il ?\n3. `git add notes.txt` puis `git commit -m \"Premier commit\"`.\n4. `git log --oneline` : combien de lignes vois-tu ?\n\n## Explique-le (technique Feynman)\n\nDécris ton cycle de travail quotidien en une phrase : « Je modifie mes fichiers, je vérifie avec `git status`, je prépare avec `git add`, j'archive avec `git commit -m`, et je relis l'histoire avec `git log`. » Si tu sais aussi expliquer à quoi sert le `.gitignore`, tu maîtrises les bases.",
      "playground": null,
      "quiz": [
        {
          "question": "Quelle commande crée un nouveau dépôt Git dans un dossier existant qui n'en a pas encore ?",
          "options": [
            "git clone",
            "git start",
            "git init",
            "git new"
          ],
          "correctIndex": 2,
          "explanation": "`git init` initialise un nouveau dépôt (crée le dossier `.git`). `git clone` sert au contraire à copier un dépôt déjà existant."
        },
        {
          "question": "Tu ajoutes `config.env` à ton `.gitignore`, mais il avait déjà été committé auparavant. Que se passe-t-il ?",
          "options": [
            "Il disparaît automatiquement de l'historique",
            "Il reste suivi par Git : `.gitignore` n'ignore que les fichiers non encore suivis",
            "Git refuse le `.gitignore` tant que le fichier existe",
            "Il est immédiatement supprimé du disque"
          ],
          "correctIndex": 1,
          "explanation": "`.gitignore` ne s'applique pas aux fichiers déjà suivis. Il faut d'abord les retirer du suivi avec `git rm --cached` pour que l'ignore prenne effet."
        },
        {
          "question": "Que fait `git commit -am \"message\"` ?",
          "options": [
            "Il prépare et committe tous les fichiers, y compris les nouveaux fichiers non suivis",
            "Il prépare et committe en une fois, mais seulement les fichiers déjà suivis par Git",
            "Il annule le dernier commit",
            "Il affiche l'aide de la commande commit"
          ],
          "correctIndex": 1,
          "explanation": "Le `-a` ajoute automatiquement les modifications des fichiers déjà suivis avant de committer. Un fichier neuf (untracked) doit d'abord passer par `git add`."
        }
      ]
    },
    {
      "id": "branches",
      "title": "3. Les branches",
      "markdown": "# Les branches\n\n## La métaphore : les lignes d'un livre dont vous êtes le héros\n\nUn livre « dont vous êtes le héros » propose des chemins parallèles : à un embranchement, tu pars explorer une histoire alternative, et tu peux toujours revenir au tronc principal. Une **branche** Git, c'est exactement ça : une ligne d'évolution parallèle de ton code où tu peux expérimenter sans casser la version stable.\n\n## La définition\n\nUne **branche** est un **pointeur léger et mobile vers un commit**. Quand tu crées un commit sur une branche, le pointeur de cette branche avance automatiquement vers le nouveau commit.\n\nLa branche principale s'appelle traditionnellement **`main`** (anciennement `master`). C'est la version « officielle » du projet.\n\nPourquoi c'est génial : créer une branche dans Git ne copie aucun fichier, c'est juste un nouveau pointeur. C'est donc **instantané et très léger**, contrairement à d'autres outils de versions.\n\n## Pourquoi utiliser des branches ?\n\n- Développer une **nouvelle fonctionnalité** sans perturber `main`.\n- Corriger un **bug urgent** pendant qu'une fonctionnalité est en cours.\n- Permettre à **plusieurs personnes** de travailler en parallèle.\n\nLa règle d'or en équipe : *on ne travaille jamais directement sur `main`, on crée une branche par fonctionnalité.*\n\n## Lister, créer, se déplacer\n\n```bash\n# Lister les branches (l'étoile * indique la branche courante)\ngit branch\n\n# Créer une branche (sans s'y déplacer)\ngit branch feature/login\n\n# Se déplacer sur une branche (commande moderne, recommandée)\ngit switch feature/login\n\n# Créer ET se déplacer en une fois\ngit switch -c feature/login\n```\n\n`git checkout` est l'ancienne commande qui fait la même chose ; tu la croiseras souvent :\n\n```bash\n# Équivalent ancien de switch\ngit checkout feature/login\n\n# Équivalent ancien de switch -c\ngit checkout -b feature/login\n```\n\nDepuis Git 2.23, on privilégie `git switch` (changer de branche) et `git restore` (restaurer des fichiers) car ils sont plus clairs que le `checkout` historique qui faisait tout.\n\n## Fusionner : `git merge`\n\nQuand ta fonctionnalité est prête, tu **fusionnes** ta branche dans `main`. La fusion se fait **depuis la branche qui doit recevoir** les changements.\n\n```bash\n# Je veux ramener feature/login dans main\ngit switch main\ngit merge feature/login\n```\n\n### Le fast-forward (avance rapide)\n\nSi `main` n'a pas bougé depuis que tu as créé ta branche, Git n'a pas de vrai travail de fusion à faire : il lui suffit d'**avancer le pointeur `main`** jusqu'au dernier commit de ta branche. C'est un **fast-forward**. L'historique reste une ligne droite, sans commit de fusion.\n\n```text\nAvant :   A---B (main)\n               \\\n                C---D (feature)\n\nFast-forward : A---B---C---D (main, feature)\n```\n\n### La fusion à trois sources (true merge)\n\nSi `main` a *aussi* évolué pendant que tu travaillais sur ta branche, le fast-forward est impossible. Git crée alors un **commit de fusion** spécial qui a **deux parents** : il combine les deux histoires.\n\n```text\nA---B---E (main)\n     \\     \\\n      C---D--M (commit de fusion)\n```\n\nTu peux forcer la création d'un commit de fusion même quand un fast-forward serait possible, pour garder une trace explicite de la branche :\n\n```bash\ngit merge --no-ff feature/login\n```\n\n## Supprimer une branche\n\nUne fois fusionnée, la branche ne sert plus à grand-chose ; on la supprime pour faire le ménage.\n\n```bash\n# Supprimer une branche déjà fusionnée (sûr)\ngit branch -d feature/login\n\n# Forcer la suppression d'une branche non fusionnée (attention, perte possible)\ngit branch -D feature/login\n```\n\n## Exercice express\n\n1. Sur `main`, crée et bascule sur `feature/test` avec une seule commande.\n2. Crée un fichier, committe-le.\n3. Reviens sur `main`, fusionne `feature/test`. S'agit-il d'un fast-forward ? Pourquoi ?\n4. Supprime la branche fusionnée.\n\n## Explique-le (technique Feynman)\n\n« Une branche est juste un pointeur vers un commit. Je crée une branche pour développer tranquillement, puis je la fusionne dans `main`. Si `main` n'a pas bougé, c'est un fast-forward : on avance simplement le pointeur. Si `main` a avancé de son côté, Git fabrique un commit de fusion à deux parents. » Si cette phrase est limpide pour toi, le chapitre est réussi.",
      "playground": null,
      "quiz": [
        {
          "question": "Qu'est-ce qu'une branche dans Git, techniquement ?",
          "options": [
            "Une copie complète de tous les fichiers du projet",
            "Un pointeur léger et mobile vers un commit",
            "Un dossier séparé sur le disque",
            "Un serveur distant dédié"
          ],
          "correctIndex": 1,
          "explanation": "Une branche n'est qu'un pointeur vers un commit. La créer ne copie aucun fichier, ce qui la rend instantanée et très peu coûteuse."
        },
        {
          "question": "Dans quel cas une fusion se fait-elle par « fast-forward » ?",
          "options": [
            "Quand la branche cible (par ex. main) n'a reçu aucun nouveau commit depuis la création de la branche fusionnée",
            "Quand il y a un conflit à résoudre",
            "Quand les deux branches ont évolué en parallèle",
            "Quand on utilise l'option --no-ff"
          ],
          "correctIndex": 0,
          "explanation": "Le fast-forward est possible quand la branche cible n'a pas divergé : Git se contente d'avancer son pointeur, sans créer de commit de fusion."
        },
        {
          "question": "Quelle commande crée une nouvelle branche ET s'y déplace immédiatement ?",
          "options": [
            "git branch nouvelle",
            "git merge nouvelle",
            "git switch -c nouvelle",
            "git status nouvelle"
          ],
          "correctIndex": 2,
          "explanation": "`git switch -c nouvelle` (équivalent moderne de `git checkout -b nouvelle`) crée la branche et bascule dessus. `git branch nouvelle` la crée sans s'y déplacer."
        }
      ]
    },
    {
      "id": "remote",
      "title": "4. Travailler à distance",
      "markdown": "# Travailler à distance\n\n## La métaphore : ton album et le coffre-fort partagé\n\nJusqu'ici, ton album photo (l'historique) vit sur ta machine. Mais pour travailler en équipe et sauvegarder ton travail, il faut un **coffre-fort partagé** sur un serveur (GitHub, GitLab, Bitbucket...). Tu y **déposes** (push) tes nouvelles photos et tu en **récupères** (fetch/pull) celles des autres.\n\n## La définition : un dépôt distant (remote)\n\nUn **remote** est un dépôt Git hébergé ailleurs (souvent sur un serveur) auquel ton dépôt local est connecté. Tu peux en avoir plusieurs, chacun désigné par un nom court.\n\nPar convention :\n\n- **`origin`** : le remote principal, généralement le dépôt que tu as cloné (le tien sur GitHub).\n- **`upstream`** : par convention, le dépôt **d'origine** d'un projet que tu as *forké* (la copie officielle, sur laquelle tu n'as pas les droits d'écriture).\n\n```bash\n# Voir les remotes configurés\ngit remote -v\n\n# Ajouter un remote nommé origin\ngit remote add origin https://github.com/moi/mon-projet.git\n\n# Ajouter le dépôt d'origine d'un fork\ngit remote add upstream https://github.com/projet-officiel/mon-projet.git\n```\n\n## Envoyer son travail : `git push`\n\n`git push` envoie tes commits locaux vers un remote.\n\n```bash\n# Premier envoi d'une branche : on lie la branche locale à origin\ngit push -u origin main\n\n# Les fois suivantes, le -u n'est plus nécessaire\ngit push\n```\n\nLe `-u` (ou `--set-upstream`) crée le lien entre ta branche locale et sa branche **de suivi** sur le remote (ex. `origin/main`). Une fois ce lien posé, un simple `git push` suffit.\n\n## Récupérer le travail des autres : `fetch` vs `pull`\n\nC'est une distinction clé en entretien.\n\n### `git fetch` : télécharger sans appliquer\n\n```bash\ngit fetch origin\n```\n\n`fetch` télécharge les nouveaux commits du remote et met à jour les branches **de suivi** (`origin/main`), **mais ne touche pas à ta branche locale ni à tes fichiers**. C'est l'option prudente : tu regardes ce qui est arrivé avant de l'intégrer.\n\n```bash\n# Après un fetch, comparer ma branche locale et celle du remote\ngit log main..origin/main --oneline\n```\n\n### `git pull` : télécharger ET intégrer\n\n```bash\ngit pull origin main\n```\n\n`pull` = **`fetch` + `merge`**. Il télécharge les nouveaux commits *et* les fusionne immédiatement dans ta branche locale. Pratique, mais cela peut déclencher une fusion (et donc des conflits) sans prévenir.\n\nVariante fréquente qui évite les commits de fusion inutiles :\n\n```bash\n# fetch + rebase au lieu de fetch + merge\ngit pull --rebase\n```\n\n> À retenir : **fetch = je regarde**, **pull = je regarde et j'intègre**.\n\n## Forks et Pull Requests\n\nDans un projet collaboratif (open source ou en entreprise), on n'écrit pas directement sur `main` du dépôt partagé. Le flux classique :\n\n1. Tu crées une **branche** locale pour ta fonctionnalité.\n2. Tu la **push** sur ton remote (`origin`).\n3. Tu ouvres une **Pull Request** (PR sur GitHub) — ou *Merge Request* (MR) sur GitLab.\n4. Tes collègues **relisent** le code (*code review*), discutent, demandent des ajustements.\n5. Une fois validée, la PR est **fusionnée** dans `main` par l'équipe.\n\nUne **Pull Request** est donc une *demande de fusion* : « voici mon travail sur cette branche, merci de le relire et de l'intégrer ». C'est un outil de la plateforme (GitHub/GitLab), pas une commande Git en soi.\n\n```bash\n# Cycle typique de contribution\ngit switch -c feature/export-pdf\n# ... travail + commits ...\ngit push -u origin feature/export-pdf\n# Puis on ouvre la Pull Request depuis l'interface web de GitHub\n```\n\n### Garder son fork à jour\n\n```bash\ngit fetch upstream\ngit switch main\ngit merge upstream/main\ngit push origin main\n```\n\n## Exercice express\n\n1. Quelle commande montre tous les remotes et leurs URLs ?\n2. Tu veux voir ce que les autres ont poussé **sans** modifier ta branche : `fetch` ou `pull` ?\n3. Décris en une phrase ce qu'est une Pull Request.\n\n## Explique-le (technique Feynman)\n\n« Le remote est mon coffre-fort partagé ; `origin` est le mien, `upstream` est le projet d'origine. Je `push` pour déposer, je `fetch` pour regarder sans intégrer, je `pull` pour regarder ET intégrer (fetch + merge). Pour proposer mon travail à l'équipe, je pousse ma branche et j'ouvre une Pull Request, qui sera relue avant d'être fusionnée. » Si tu peux dire la différence fetch/pull sans hésiter, c'est gagné.",
      "playground": null,
      "quiz": [
        {
          "question": "Quelle est la différence entre `git fetch` et `git pull` ?",
          "options": [
            "Il n'y a aucune différence, ce sont des alias",
            "`fetch` télécharge les commits sans les intégrer ; `pull` télécharge ET fusionne dans la branche locale (fetch + merge)",
            "`fetch` envoie les commits au serveur, `pull` les récupère",
            "`pull` ne fonctionne qu'avec upstream, `fetch` qu'avec origin"
          ],
          "correctIndex": 1,
          "explanation": "`git pull` est l'équivalent de `git fetch` suivi de `git merge`. `git fetch` se contente de mettre à jour les branches de suivi sans toucher à ta branche locale."
        },
        {
          "question": "Par convention, que désigne le remote nommé `origin` ?",
          "options": [
            "Le dépôt officiel d'un projet que l'on a forké",
            "Le remote principal, en général le dépôt que l'on a cloné",
            "La branche principale du projet",
            "Le tout premier commit du dépôt"
          ],
          "correctIndex": 1,
          "explanation": "`origin` est par convention le remote principal (souvent ton dépôt cloné). `upstream` désigne plutôt le dépôt d'origine d'un fork."
        },
        {
          "question": "Qu'est-ce qu'une Pull Request (PR) ?",
          "options": [
            "Une commande Git qui supprime une branche distante",
            "Une demande de fusion d'une branche, proposée à l'équipe pour relecture avant intégration",
            "Une copie locale d'un dépôt distant",
            "Un commit qui annule un autre commit"
          ],
          "correctIndex": 1,
          "explanation": "Une Pull Request est une demande d'intégration d'une branche, fournie par la plateforme (GitHub/GitLab). Elle permet la relecture (code review) avant la fusion dans la branche cible."
        }
      ]
    },
    {
      "id": "annuler-rebaser",
      "title": "5. Annuler et réécrire l'historique",
      "markdown": "# Annuler et réécrire l'historique\n\n## La métaphore : la gomme, le correcteur et le copier-coller\n\nQuand tu te trompes, tu as plusieurs outils : une **gomme** qui efface (reset), un **correcteur** qui ajoute une ligne « erreur annulée » sans rien effacer (revert), un **tiroir temporaire** où mettre un brouillon de côté (stash), et un **copier-coller** sélectif (cherry-pick). Le bon réflexe, c'est de choisir le bon outil selon que ton travail est déjà partagé ou non.\n\n## Annuler localement : `git reset`\n\n`git reset` déplace le pointeur de branche vers un commit antérieur. Trois modes, du plus doux au plus brutal :\n\n```bash\n# --soft : annule les commits, mais GARDE tout en zone de préparation (staging)\ngit reset --soft HEAD~1\n\n# --mixed (par défaut) : annule les commits, garde les modifs dans le working directory (non préparées)\ngit reset --mixed HEAD~1\ngit reset HEAD~1          # équivalent\n\n# --hard : annule les commits ET supprime les modifications. DESTRUCTEUR.\ngit reset --hard HEAD~1\n```\n\nMémo visuel des trois modes (`HEAD~1` = « le commit juste avant le dernier ») :\n\n```text\n--soft   : commit annulé -> changements en STAGING\n--mixed  : commit annulé -> changements en WORKING DIRECTORY\n--hard   : commit annulé -> changements SUPPRIMÉS (perte de travail !)\n```\n\nAutre usage courant : « désindexer » un fichier ajouté par erreur.\n\n```bash\n# Retirer un fichier du staging sans perdre sa modification\ngit reset HEAD fichier.txt\n# (équivalent moderne)\ngit restore --staged fichier.txt\n```\n\n> Règle de sécurité : **ne jamais `reset` un historique déjà poussé et partagé**, car cela réécrit l'histoire et casse celle des collègues.\n\n## Annuler proprement du travail partagé : `git revert`\n\nQuand un commit est déjà poussé, on ne le supprime pas : on crée un **nouveau commit qui fait l'inverse**. L'historique est préservé, rien n'est réécrit.\n\n```bash\n# Crée un commit qui annule les changements de a1b2c3d\ngit revert a1b2c3d\n```\n\n> `reset` = réécrire l'histoire (usage local). `revert` = ajouter une page à l'histoire pour corriger (usage partagé, sûr).\n\n## Mettre de côté : `git stash`\n\nTu es en plein travail, pas prêt à committer, mais tu dois changer de branche d'urgence. Le **stash** range tes modifications dans un tiroir temporaire et te rend un répertoire propre.\n\n```bash\n# Ranger les modifications en cours\ngit stash\n\n# Lister les brouillons rangés\ngit stash list\n\n# Récupérer le dernier brouillon et le retirer du tiroir\ngit stash pop\n\n# Récupérer sans le retirer du tiroir\ngit stash apply\n```\n\n## Réorganiser l'historique : `git rebase`\n\n`git rebase` **rejoue tes commits sur une nouvelle base**. Au lieu de fusionner deux branches avec un commit de fusion, tu reprends tes commits et tu les replaces *au sommet* d'une autre branche, comme si tu avais commencé ton travail à partir de là.\n\n```bash\n# Je suis sur ma branche feature, je la rebase sur main à jour\ngit switch feature\ngit rebase main\n```\n\n### Rebase vs merge\n\n```text\nMERGE (conserve l'histoire réelle, crée un commit de fusion) :\nA---B---E (main)\n     \\     \\\n      C---D--M (merge)\n\nREBASE (réécrit : histoire linéaire, plus propre) :\nA---B---E (main)\n             \\\n              C'---D' (feature rebasée)\n```\n\n- **Merge** : honnête, non destructeur, conserve le contexte exact. L'historique peut devenir touffu.\n- **Rebase** : historique **linéaire et lisible**, mais il **réécrit les commits** (ils changent de hash : C devient C').\n\n> **Règle d'or du rebase** : ne jamais rebaser des commits **déjà poussés et partagés**. On rebase uniquement son travail **local** non publié.\n\n## Résoudre un conflit\n\nUn **conflit** survient quand deux modifications touchent **la même portion d'un fichier** et que Git ne peut pas décider seul. Il marque la zone ainsi :\n\n```text\n<<<<<<< HEAD\nprix = 100 (version de ma branche courante)\n=======\nprix = 120 (version de l'autre branche)\n>>>>>>> feature/promo\n```\n\nMarche à suivre :\n\n```bash\n# 1. Ouvrir le fichier, choisir la bonne version, supprimer les marqueurs <<<<<<< ======= >>>>>>>\n# 2. Marquer le conflit comme résolu\ngit add fichier-en-conflit.js\n# 3a. Si on était dans un merge :\ngit commit\n# 3b. Si on était dans un rebase :\ngit rebase --continue\n\n# Pour abandonner et revenir à l'état d'avant :\ngit merge --abort     # ou : git rebase --abort\n```\n\n## Récupérer un commit précis : `git cherry-pick`\n\n`cherry-pick` (« choisir une cerise ») applique **un commit précis** d'une autre branche sur ta branche courante, sans tout fusionner. Idéal pour rapatrier un correctif urgent.\n\n```bash\n# Appliquer le commit a1b2c3d sur ma branche courante\ngit cherry-pick a1b2c3d\n```\n\n## La bouée de sauvetage : `git reflog`\n\nMême après un `reset --hard` malheureux, Git garde une trace de tous tes déplacements de HEAD pendant un certain temps. `git reflog` te permet souvent de retrouver un commit « perdu ».\n\n```bash\ngit reflog\n# Repère le hash recherché, puis :\ngit reset --hard a1b2c3d\n```\n\n## Exercice express\n\n1. Tu as committé localement (non poussé) mais tu veux garder les modifications en staging pour les recommitter : quel mode de `reset` ?\n2. Un commit *déjà poussé* est buggé : `reset` ou `revert` ?\n3. Tu dois changer de branche en urgence sans committer ton travail en cours : quelle commande ?\n\n## Explique-le (technique Feynman)\n\n« `reset` réécrit l'histoire en local (soft = garde en staging, mixed = garde dans le working dir, hard = supprime). `revert` annule proprement un commit déjà partagé en en créant un nouveau. `stash` met le travail de côté. `rebase` rejoue mes commits sur une base à jour pour un historique linéaire, mais jamais sur du travail déjà poussé. `cherry-pick` récupère un commit précis. » Si tu choisis le bon outil selon que le travail est partagé ou non, tu as compris l'essentiel.",
      "playground": null,
      "quiz": [
        {
          "question": "Quelle est la différence entre `git reset --soft HEAD~1` et `git reset --hard HEAD~1` ?",
          "options": [
            "`--soft` supprime les changements, `--hard` les garde",
            "`--soft` annule le commit mais garde les changements en staging ; `--hard` annule le commit ET supprime les changements",
            "Les deux suppriment définitivement les changements",
            "`--soft` agit sur le remote, `--hard` en local"
          ],
          "correctIndex": 1,
          "explanation": "`--soft` conserve les modifications dans la zone de préparation. `--hard` est destructeur : il efface aussi les modifications du répertoire de travail."
        },
        {
          "question": "Un commit a déjà été poussé sur le dépôt partagé et s'avère bugué. Quelle est la méthode sûre pour l'annuler ?",
          "options": [
            "git reset --hard, car il efface le commit",
            "git revert, qui crée un nouveau commit annulant les changements sans réécrire l'historique",
            "git stash, pour mettre le commit de côté",
            "git rebase, pour le supprimer de l'historique"
          ],
          "correctIndex": 1,
          "explanation": "Sur du travail déjà partagé, on n'utilise pas reset/rebase (qui réécrivent l'historique). `git revert` ajoute un commit inverse, ce qui est sûr pour les autres."
        },
        {
          "question": "Quelle est la « règle d'or » concernant `git rebase` ?",
          "options": [
            "Toujours rebaser avant chaque commit",
            "Ne jamais rebaser des commits déjà poussés et partagés avec d'autres",
            "Rebaser uniquement sur le remote origin",
            "Le rebase doit toujours remplacer le merge"
          ],
          "correctIndex": 1,
          "explanation": "Le rebase réécrit les commits (nouveaux hash). Le faire sur des commits déjà publiés casserait l'historique des collègues : on ne rebase que son travail local non poussé."
        }
      ]
    }
  ]
};
