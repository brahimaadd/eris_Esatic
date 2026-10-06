/**
 * ESATIC GitFlow — Core Interactive Engine (v2.4)
 * Moteur interactif : DAG SVG, Machine à écrire dynamique, Rendu SVG 100% vectoriel,
 * Lightbox HD et animations au défilement (IntersectionObserver).
 */

// =============================================================================
// 1. DATA: COMMANDES GIT (CHEAT SHEET)
// =============================================================================
const GIT_COMMANDS_DATA = [
  {
    code: "git init",
    category: "demarrage",
    risk: "safe",
    desc: "Initialise un nouveau dépôt Git local dans le répertoire courant (crée le dossier caché .git).",
    example: "git init mon-projet-esatic"
  },
  {
    code: "git clone <url>",
    category: "demarrage",
    risk: "safe",
    desc: "Télécharge une copie complète d'un dépôt distant GitHub vers votre machine locale.",
    example: "git clone https://github.com/esatic-ci/projet-sigl.git"
  },
  {
    code: "git status",
    category: "quotidien",
    risk: "safe",
    desc: "Inspecte l'état du répertoire de travail et de la zone de transit (staging area). Indique les fichiers modifiés et non suivis.",
    example: "git status"
  },
  {
    code: "git add <fichier>",
    category: "quotidien",
    risk: "safe",
    desc: "Ajoute des fichiers à la zone de transit (Staging) pour les inclure dans le prochain commit. Utilisez '.' pour tout ajouter.",
    example: "git add ."
  },
  {
    code: "git commit -m \"<message>\"",
    category: "quotidien",
    risk: "safe",
    desc: "Enregistre un instantané (snapshot) permanent des modifications préparées avec un message explicatif clair.",
    example: "git commit -m \"feat(auth): ajout de la connexion LDAP ESATIC\""
  },
  {
    code: "git branch <nom>",
    category: "branches",
    risk: "safe",
    desc: "Crée une nouvelle branche isolée pour développer une fonctionnalité sans toucher à la branche principale.",
    example: "git branch feature/api-rest"
  },
  {
    code: "git checkout -b <nom>",
    category: "branches",
    risk: "safe",
    desc: "Crée une nouvelle branche et bascule immédiatement dessus en une seule commande (équivalent moderne : git switch -c).",
    example: "git checkout -b fix/routing-bug"
  },
  {
    code: "git merge <branche>",
    category: "branches",
    risk: "warn",
    desc: "Fusionne l'historique de la branche spécifiée dans la branche actuellement active (ex: fusionner dev dans main).",
    example: "git merge dev"
  },
  {
    code: "git push -u origin <branche>",
    category: "remote",
    risk: "safe",
    desc: "Envoie vos commits locaux vers le dépôt distant GitHub et configure le suivi automatique (upstream).",
    example: "git push -u origin main"
  },
  {
    code: "git pull origin <branche>",
    category: "remote",
    risk: "warn",
    desc: "Récupère et fusionne immédiatement les dernières modifications distantes dans votre branche locale actuelle.",
    example: "git pull origin dev"
  },
  {
    code: "git log --oneline --graph",
    category: "inspection",
    risk: "safe",
    desc: "Affiche l'historique complet des commits sous forme de graphe compact et lisible en une ligne par commit.",
    example: "git log --oneline --graph --all"
  },
  {
    code: "git diff",
    category: "inspection",
    risk: "safe",
    desc: "Montre précisément les lignes ajoutées et supprimées entre vos fichiers actuels et le dernier commit.",
    example: "git diff index.html"
  },
  {
    code: "git stash",
    category: "rollback",
    risk: "safe",
    desc: "Met de côté temporairement vos modifications non commitées pour retrouver un état propre sans rien perdre.",
    example: "git stash push -m 'WIP: avant soutenance'"
  },
  {
    code: "git reset --soft HEAD~1",
    category: "rollback",
    risk: "warn",
    desc: "Annule le tout dernier commit tout en conservant vos modifications dans la staging area. Idéal pour corriger un message.",
    example: "git reset --soft HEAD~1"
  },
  {
    code: "git reset --hard HEAD~1",
    category: "rollback",
    risk: "danger",
    desc: "DANGER : Annule le dernier commit et efface irréversiblement toutes les modifications non commitées correspondantes.",
    example: "git reset --hard HEAD~1"
  },
  {
    code: "git reflog",
    category: "rollback",
    risk: "safe",
    desc: "La boîte noire de Git : enregistre chaque déplacement de HEAD, permettant de récupérer des commits supprimés par erreur.",
    example: "git reflog"
  }
];

// =============================================================================
// 2. DATA: FILIÈRES ESATIC & USAGES GITHUB
// =============================================================================
const ESATIC_FILIERES_DATA = [
  {
    sigle: "SIGL",
    name: "Systèmes Informatiques et Génie Logiciel",
    cycle: "both",
    cycleLabel: "Licence & Master",
    desc: "Conception architecturale logicielle, Clean Architecture et développement d'applications d'entreprise. Travail d'équipe axé sur les Pull Requests, les revues de code systématiques et le Semantic Versioning (SemVer).",
    tools: ["GitHub Actions", "Pull Request Reviews", "Gitflow Workflow", "Conventional Commits"]
  },
  {
    sigle: "ERIS",
    name: "Expert Réseaux, Infrastructures et Sécurité",
    cycle: "master",
    cycleLabel: "Master Professionnel",
    desc: "Gestion d'infrastructure moderne via le GitOps : versioning des configurations réseaux (Ansible, Terraform), scripts d'automatisation des pare-feux et des architectures Cloud sécurisées.",
    tools: ["GitOps", "Terraform Versioning", "Ansible Playbooks", "Vault Secrets"]
  },
  {
    sigle: "BIHAR",
    name: "Big Data Intelligence for Human Augmentation",
    cycle: "master",
    cycleLabel: "Master Recherche & Pro",
    desc: "Pipeline de données massives, Machine Learning et IA. Suivi des datasets et des poids de modèles grâce à DVC (Data Version Control) couplé aux dépôts GitHub, et reproductibilité des notebooks Jupyter.",
    tools: ["DVC (Data Version Control)", "Git LFS", "MLflow Pipelines", "Jupyter Diff"]
  },
  {
    sigle: "TWIN",
    name: "Technologies du Web et Images Numériques",
    cycle: "licence",
    cycleLabel: "Licence Professionnelle",
    desc: "Développement d'interfaces modernes, UX/UI réactive et traitement multimédia. Déploiement continu automatisé (CI/CD) sur Vercel/Netlify à chaque push sur la branche de production.",
    tools: ["Continuous Deployment", "GitHub Pages", "Webhooks", "Preview Deployments"]
  },
  {
    sigle: "SRIT",
    name: "Systèmes Réseaux Informatiques et Télécommunications",
    cycle: "licence",
    cycleLabel: "Licence Professionnelle",
    desc: "Administration de serveurs Linux/Unix, supervision réseau et téléphonie sur IP. Versioning des scripts Bash/Python de maintenance et de configuration d'équipements de routage.",
    tools: ["Bash Automation", "Cron Scripts", "Network Topologies", "Release Tags"]
  },
  {
    sigle: "SITW",
    name: "Sécurité Informatique et Technologies du Web",
    cycle: "master",
    cycleLabel: "Master Professionnel",
    desc: "DevSecOps : audit de sécurité automatisé dans les pipelines CI/CD, détection proactive de fuites de clés API (GitGuardian, Trufflehog) et gestion des vulnérabilités de dépendances via Dependabot.",
    tools: ["Dependabot", "Secret Scanning", "CodeQL Static Analysis", "OWASP Pipelines"]
  },
  {
    sigle: "DASI",
    name: "Développement d'Applications et Systèmes d'Information",
    cycle: "licence",
    cycleLabel: "Licence Professionnelle",
    desc: "Modélisation de bases de données, applications métiers et interopérabilité des SI. Gestion collaborative des schémas SQL, migrations Flyway/Liquibase versionnées sous Git.",
    tools: ["DB Migrations", "Multi-repo Workflows", "Issue Tracking", "Agile Kanban"]
  },
  {
    sigle: "MBDS",
    name: "Mobiquité, Big Data et Intégration de Systèmes",
    cycle: "master",
    cycleLabel: "Master Professionnel",
    desc: "Applications mobiles distribuées, IoT et intégration d'écosystèmes hétérogènes. Workflows multi-plateformes avec compilation et packaging mobile automatisés via GitHub Actions.",
    tools: ["Mobile CI/CD", "IoT Firmware Tracking", "Docker Containers", "GitHub Packages"]
  },
  {
    sigle: "RTEL",
    name: "Réseaux et Télécommunications",
    cycle: "both",
    cycleLabel: "Licence & Master",
    desc: "Protocoles télécoms, 4G/5G et interconnexion de réseaux. Documentation technique collaborative en Markdown et suivi des topologies réseaux simulées sous GNS3/EVE-NG.",
    tools: ["Docs as Code", "GNS3 Topologies", "Network Config Diff", "Changelogs"]
  },
  {
    sigle: "MDSI",
    name: "Management Digital et Systèmes d'Information",
    cycle: "master",
    cycleLabel: "Master Professionnel",
    desc: "Pilotage stratégique de la transformation digitale et gestion de produit agile. Utilisation avancée des GitHub Projects (Roadmaps, Milestones, Sprints, métriques de vélocité d'équipe).",
    tools: ["GitHub Projects", "Issue Milestones", "Sprint Backlogs", "Release Management"]
  }
];

// =============================================================================
// 3. DATA: MODE SECOURS (EMERGENCY SOLUTIONS)
// =============================================================================
const EMERGENCY_DATA = {
  "wrong-branch": {
    title: "J'ai commité sur 'main' au lieu de ma branche de travail",
    steps: [
      {
        text: "Créez une nouvelle branche qui va conserver vos commits actuels :",
        code: "git branch feature/ma-vraie-branche"
      },
      {
        text: "Revenez en arrière sur la branche 'main' (vers le dernier commit officiel propre) :",
        code: "git reset --hard HEAD~1"
      },
      {
        text: "Basculez sur votre nouvelle branche pour continuer sereinement :",
        code: "git checkout feature/ma-vraie-branche"
      }
    ],
    tip: "Vos commits sont sains et saufs sur votre branche, et 'main' est redevenue propre pour la soutenance !"
  },
  "secret-leak": {
    title: "J'ai accidentellement poussé un mot de passe ou un fichier .env sur GitHub",
    steps: [
      {
        text: "Supprimez le fichier du suivi Git SANS le supprimer de votre disque dur :",
        code: "git rm --cached .env"
      },
      {
        text: "Ajoutez immédiatement '.env' dans votre fichier '.gitignore' et commitez :",
        code: "echo \".env\" >> .gitignore\ngit add .gitignore\ngit commit -m \"fix: stop tracking secrets\""
      },
      {
        text: "ACTION CRITIQUE : Révoquez immédiatement la clé API ou changez le mot de passe sur le serveur !",
        code: "# L'historique GitHub garde une trace de tout commit précédent."
      }
    ],
    tip: "Pour effacer l'historique en profondeur avant soutenance, utilisez 'git-filter-repo' avec l'accord de votre encadreur."
  },
  "merge-conflict": {
    title: "Conflit de Merge pendant le TP ou le travail en binôme",
    steps: [
      {
        text: "Identifiez les fichiers en conflit à l'aide de la commande :",
        code: "git status"
      },
      {
        text: "Ouvrez les fichiers dans VS Code. Cherchez les marqueurs '<<<<<<< HEAD' et choisissez le code à conserver.",
        code: "# Option 1: Garder votre version\n# Option 2: Garder celle du binôme\n# Option 3: Fusionner les deux blocs"
      },
      {
        text: "Une fois le fichier nettoyé, marquez-le comme résolu et finalisez le commit :",
        code: "git add .\ngit commit -m \"merge: résolution des conflits pour la soutenance\""
      }
    ],
    tip: "Astuce : 'git merge --abort' permet d'annuler complètement la tentative de fusion si vous êtes bloqué."
  },
  "lost-commit": {
    title: "J'ai fait un 'git reset --hard' par erreur et j'ai tout perdu",
    steps: [
      {
        text: "Consultez l'historique interne secret de Git (Reflog) :",
        code: "git reflog"
      },
      {
        text: "Repérez l'identifiant du commit juste avant votre erreur (ex: HEAD@{1} ou '7a2f1b0').",
        code: "# Vous verrez : HEAD@{1}: commit: ma super fonctionnalité"
      },
      {
        text: "Restaurez votre travail dans une nouvelle branche de secours :",
        code: "git checkout -b sauvetage HEAD@{1}"
      }
    ],
    tip: "Dans Git, rien n'est jamais définitivement perdu tant que le ramasse-miettes (garbage collector) n'est pas passé !"
  }
};

// =============================================================================
// 4. MOTEUR DU SIMULATEUR GIT (DAG & SVG ENGINE)
// =============================================================================
class GitSimulator {
  constructor() {
    this.commits = [];
    this.branches = { "main": "c1" };
    this.currentBranch = "main";
    this.head = "c1";
    this.counter = 1;

    this.init();
  }

  init() {
    this.commits = [
      {
        id: "c1",
        hash: "8a1e94",
        message: "Initial commit (ESATIC project template)",
        branch: "main",
        parent: null,
        y: 0,
        x: 0
      }
    ];
    this.branches = { "main": "c1" };
    this.currentBranch = "main";
    this.head = "c1";
    this.counter = 1;
  }

  commit(message) {
    this.counter++;
    const id = `c${this.counter}`;
    const hash = Math.random().toString(16).substring(2, 8);
    const parent = this.head;
    
    const branchNames = Object.keys(this.branches);
    let yIndex = branchNames.indexOf(this.currentBranch);
    if (yIndex === -1) yIndex = 0;

    const newCommit = {
      id: id,
      hash: hash,
      message: message || `feat: travail sur ${this.currentBranch}`,
      branch: this.currentBranch,
      parent: parent,
      y: yIndex,
      x: this.commits.length
    };

    this.commits.push(newCommit);
    this.branches[this.currentBranch] = id;
    this.head = id;

    return newCommit;
  }

  createBranch(name) {
    if (this.branches[name]) {
      return { success: false, error: `La branche '${name}' existe déjà.` };
    }
    this.branches[name] = this.head;
    return { success: true, message: `Branche '${name}' créée sur le commit ${this.head}.` };
  }

  checkout(name) {
    if (!this.branches[name]) {
      return { success: false, error: `La branche '${name}' n'existe pas.` };
    }
    this.currentBranch = name;
    this.head = this.branches[name];
    return { success: true, message: `Basculé sur la branche '${name}'.` };
  }

  merge(sourceBranch) {
    if (!this.branches[sourceBranch]) {
      return { success: false, error: `Branche introuvable : '${sourceBranch}'.` };
    }
    if (sourceBranch === this.currentBranch) {
      return { success: false, error: `Impossible de fusionner une branche avec elle-même.` };
    }

    this.counter++;
    const id = `c${this.counter}`;
    const hash = Math.random().toString(16).substring(2, 8);
    
    const branchNames = Object.keys(this.branches);
    let yIndex = branchNames.indexOf(this.currentBranch);
    if (yIndex === -1) yIndex = 0;

    const mergeCommit = {
      id: id,
      hash: hash,
      message: `Merge branch '${sourceBranch}' into ${this.currentBranch}`,
      branch: this.currentBranch,
      parent: this.head,
      mergeParent: this.branches[sourceBranch],
      y: yIndex,
      x: this.commits.length
    };

    this.commits.push(mergeCommit);
    this.branches[this.currentBranch] = id;
    this.head = id;

    return { success: true, commit: mergeCommit };
  }
}

const sim = new GitSimulator();

// =============================================================================
// 5. SVG GRAPH RENDERER
// =============================================================================
function renderGitGraph() {
  const svg = document.getElementById("git-graph-svg");
  if (!svg) return;

  const width = Math.max(540, sim.commits.length * 85 + 130);
  const height = 360;
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.innerHTML = "";

  const originX = 65;
  const originY = 85;
  const stepX = 75;
  const stepY = 65;

  const branchColors = {
    "main": "#58A6FF",
    "feature/dev": "#A371F7",
    "dev": "#A371F7",
    "soutenance": "#F0883E",
    "fix": "#FA4549"
  };

  const getColor = (bName) => branchColors[bName] || "#2EA043";

  const posMap = {};
  sim.commits.forEach((c, idx) => {
    posMap[c.id] = {
      x: originX + idx * stepX,
      y: originY + c.y * stepY
    };
  });

  // 1. Dessiner les arêtes (edges)
  sim.commits.forEach(c => {
    const currentPos = posMap[c.id];

    if (c.parent && posMap[c.parent]) {
      const parentPos = posMap[c.parent];
      const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
      
      const dx = (currentPos.x - parentPos.x) / 2;
      const d = `M ${parentPos.x} ${parentPos.y} C ${parentPos.x + dx} ${parentPos.y}, ${currentPos.x - dx} ${currentPos.y}, ${currentPos.x} ${currentPos.y}`;
      line.setAttribute("d", d);
      line.setAttribute("fill", "none");
      line.setAttribute("stroke", getColor(c.branch));
      line.setAttribute("stroke-width", "3");
      line.setAttribute("stroke-linecap", "round");
      svg.appendChild(line);
    }

    if (c.mergeParent && posMap[c.mergeParent]) {
      const mergePos = posMap[c.mergeParent];
      const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const dx = (currentPos.x - mergePos.x) / 2;
      const d = `M ${mergePos.x} ${mergePos.y} C ${mergePos.x + dx} ${mergePos.y}, ${currentPos.x - dx} ${currentPos.y}, ${currentPos.x} ${currentPos.y}`;
      line.setAttribute("d", d);
      line.setAttribute("fill", "none");
      line.setAttribute("stroke", "#A371F7");
      line.setAttribute("stroke-width", "2.5");
      line.setAttribute("stroke-dasharray", "4,4");
      svg.appendChild(line);
    }
  });

  // 2. Dessiner les nœuds (commits)
  sim.commits.forEach(c => {
    const pos = posMap[c.id];
    const isHead = (sim.head === c.id);

    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.classList.add("commit-node");
    group.setAttribute("cursor", "pointer");

    // Halo HEAD animé
    if (isHead) {
      const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      halo.setAttribute("cx", pos.x);
      halo.setAttribute("cy", pos.y);
      halo.setAttribute("r", "17");
      halo.setAttribute("fill", "none");
      halo.setAttribute("stroke", "#2EA043");
      halo.setAttribute("stroke-width", "2");
      halo.setAttribute("stroke-dasharray", "3,3");
      group.appendChild(halo);
    }

    // Cercle principal
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", pos.x);
    circle.setAttribute("cy", pos.y);
    circle.setAttribute("r", "10");
    circle.setAttribute("fill", "#161B22");
    circle.setAttribute("stroke", getColor(c.branch));
    circle.setAttribute("stroke-width", "3.5");
    group.appendChild(circle);

    // Hash text
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", pos.x);
    text.setAttribute("y", pos.y + 24);
    text.setAttribute("fill", "#8B949E");
    text.setAttribute("font-size", "11");
    text.setAttribute("font-family", "var(--font-mono)");
    text.setAttribute("text-anchor", "middle");
    text.textContent = c.hash;
    group.appendChild(text);

    // Title tooltip SVG
    const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
    title.textContent = `[${c.id}] ${c.hash} - ${c.message}\nBranche: ${c.branch}`;
    group.appendChild(title);

    svg.appendChild(group);
  });

  // 3. Dessiner les étiquettes de branches
  Object.keys(sim.branches).forEach((bName, idx) => {
    const commitId = sim.branches[bName];
    const pos = posMap[commitId];
    if (!pos) return;

    const badgeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const yOffset = -24 - (idx * 18);

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", pos.x - 32);
    rect.setAttribute("y", pos.y + yOffset);
    rect.setAttribute("width", bName.length * 7 + 22);
    rect.setAttribute("height", "19");
    rect.setAttribute("rx", "4");
    rect.setAttribute("fill", (bName === sim.currentBranch) ? "#1D5DA7" : "#21262D");
    rect.setAttribute("stroke", "#30363D");
    badgeGroup.appendChild(rect);

    const bText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    bText.setAttribute("x", pos.x - 24);
    bText.setAttribute("y", pos.y + yOffset + 13);
    bText.setAttribute("fill", "#FFFFFF");
    bText.setAttribute("font-size", "10");
    bText.setAttribute("font-family", "var(--font-mono)");
    bText.textContent = bName + (bName === sim.currentBranch ? " (HEAD)" : "");
    badgeGroup.appendChild(bText);

    svg.appendChild(badgeGroup);
  });

  // Mise à jour de l'inspecteur
  document.getElementById("inspect-branch").textContent = sim.currentBranch;
  document.getElementById("inspect-head").textContent = `${sim.head} (${sim.commits.find(c => c.id === sim.head)?.hash || ""})`;
  document.getElementById("inspect-total-commits").textContent = `${sim.commits.length} commit${sim.commits.length > 1 ? "s" : ""}`;
  document.getElementById("sim-current-branch-badge").textContent = sim.currentBranch;
}

// =============================================================================
// 6. GESTION DE LA CONSOLE & PARSER GIT
// =============================================================================
function appendConsoleOutput(text, type = "normal", isPrompt = false) {
  const screen = document.getElementById("sim-console-screen");
  if (!screen) return;

  const div = document.createElement("div");
  div.classList.add("console-msg");

  if (isPrompt) {
    div.innerHTML = `<span class="prompt">git@esatic:${sim.currentBranch}$</span> <span>${text}</span>`;
  } else {
    if (type === "success") div.classList.add("text-success");
    else if (type === "info") div.classList.add("text-info");
    else if (type === "error") div.classList.add("text-danger");
    else if (type === "muted") div.classList.add("text-muted");
    div.innerHTML = text;
  }

  screen.appendChild(div);
  screen.scrollTop = screen.scrollHeight;
}

function executeSimCommand(rawCmd) {
  const cmd = rawCmd.trim();
  if (!cmd) return;

  appendConsoleOutput(cmd, "normal", true);

  const parts = cmd.split(" ");
  const base = parts[0];

  if (base === "clear" || base === "cls") {
    document.getElementById("sim-console-screen").innerHTML = "";
    return;
  }

  if (base === "help" || base === "aide") {
    appendConsoleOutput(`
      <strong>Commandes prises en charge dans le simulateur ESATIC :</strong><br>
      • <code>git commit -m "&lt;msg&gt;"</code> : Créer un nouveau commit<br>
      • <code>git branch &lt;nom&gt;</code> : Créer une nouvelle branche<br>
      • <code>git checkout &lt;nom&gt;</code> / <code>git switch &lt;nom&gt;</code> : Changer de branche<br>
      • <code>git checkout -b &lt;nom&gt;</code> : Créer et basculer sur une branche<br>
      • <code>git merge &lt;nom&gt;</code> : Fusionner la branche dans la branche active<br>
      • <code>git status</code> : Voir l'état actuel du pointeur HEAD<br>
      • <code>git log</code> : Liste succincte de l'historique<br>
      • <code>clear</code> : Nettoyer l'écran de la console
    `, "info");
    return;
  }

  if (base !== "git") {
    appendConsoleOutput(`zsh: commande inconnue: ${base}. Tapez 'help' pour la liste des commandes.`, "error");
    return;
  }

  const sub = parts[1];

  if (!sub) {
    appendConsoleOutput("Usage: git &lt;commande&gt; [options]", "muted");
    return;
  }

  // --- GIT STATUS ---
  if (sub === "status") {
    appendConsoleOutput(`Sur la branche <strong>${sim.currentBranch}</strong><br>Votre branche est à jour avec 'origin/${sim.currentBranch}'.<br>Rien à valider, la copie de travail est propre (ready for defense).`, "info");
    return;
  }

  // --- GIT LOG ---
  if (sub === "log") {
    const list = sim.commits.map(c => `* <span class="text-info">${c.hash}</span> - ${c.message} (${c.branch})`).reverse().join("<br>");
    appendConsoleOutput(list, "normal");
    return;
  }

  // --- GIT COMMIT ---
  if (sub === "commit") {
    let msg = "feat: modification du projet";
    const msgMatch = cmd.match(/-m\s+["'](.+?)["']/);
    if (msgMatch && msgMatch[1]) {
      msg = msgMatch[1];
    }
    const c = sim.commit(msg);
    renderGitGraph();
    appendConsoleOutput(`[${c.branch} ${c.hash}] ${c.message}<br> 1 fichier modifié, 15 insertions(+)`, "success");
    showToast(`Nouveau commit validé : ${c.hash}`);
    return;
  }

  // --- GIT BRANCH ---
  if (sub === "branch") {
    const bName = parts[2];
    if (!bName) {
      const branchesList = Object.keys(sim.branches)
        .map(b => (b === sim.currentBranch ? `* <span class="text-success">${b}</span>` : `  ${b}`))
        .join("<br>");
      appendConsoleOutput(branchesList, "normal");
      return;
    }
    const res = sim.createBranch(bName);
    if (res.success) {
      renderGitGraph();
      appendConsoleOutput(res.message, "success");
      showToast(`Branche '${bName}' créée !`);
    } else {
      appendConsoleOutput(`Erreur : ${res.error}`, "error");
    }
    return;
  }

  // --- GIT CHECKOUT / SWITCH ---
  if (sub === "checkout" || sub === "switch") {
    if (parts[2] === "-b" || parts[2] === "-c") {
      const bName = parts[3];
      if (!bName) {
        appendConsoleOutput("Erreur: Spécifiez un nom de branche.", "error");
        return;
      }
      sim.createBranch(bName);
      const res = sim.checkout(bName);
      renderGitGraph();
      appendConsoleOutput(`Basculé sur la nouvelle branche '${bName}'`, "success");
      showToast(`Branche '${bName}' active`);
      return;
    }

    const bName = parts[2];
    if (!bName) {
      appendConsoleOutput("Erreur: Spécifiez la branche cible.", "error");
      return;
    }
    const res = sim.checkout(bName);
    if (res.success) {
      renderGitGraph();
      appendConsoleOutput(res.message, "success");
      showToast(`Basculé sur '${bName}'`);
    } else {
      appendConsoleOutput(`Erreur : ${res.error}`, "error");
    }
    return;
  }

  // --- GIT MERGE ---
  if (sub === "merge") {
    const target = parts[2];
    if (!target) {
      appendConsoleOutput("Erreur: Spécifiez la branche à fusionner.", "error");
      return;
    }
    const res = sim.merge(target);
    if (res.success) {
      renderGitGraph();
      appendConsoleOutput(`Merge réussi ! Nouveau commit de fusion [${res.commit.hash}] généré.`, "success");
      showToast(`Fusion effectuée avec succès !`);
    } else {
      appendConsoleOutput(`Erreur : ${res.error}`, "error");
    }
    return;
  }

  appendConsoleOutput(`Commande '${cmd}' simulée avec succès. (Mode bac à sable)`, "muted");
}

// =============================================================================
// 7. RENDU DES COMMANDES (CHEAT SHEET AVEC VRAIS SVG)
// =============================================================================
function renderCommands(filter = "all") {
  const container = document.getElementById("commands-list");
  if (!container) return;

  container.innerHTML = "";

  const filtered = filter === "all" 
    ? GIT_COMMANDS_DATA 
    : GIT_COMMANDS_DATA.filter(c => c.category === filter);

  filtered.forEach(cmd => {
    const card = document.createElement("div");
    card.classList.add("command-card");

    let riskClass = "risk-safe";
    let riskLabel = "Sans Risque";
    let riskIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;

    if (cmd.risk === "warn") {
      riskClass = "risk-warn";
      riskLabel = "Prudence";
      riskIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
    } else if (cmd.risk === "danger") {
      riskClass = "risk-danger";
      riskLabel = "Destructif";
      riskIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    }

    card.innerHTML = `
      <div class="cmd-header">
        <span class="cmd-category-tag">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
          ${cmd.category}
        </span>
        <span class="cmd-risk-badge ${riskClass}">
          ${riskIcon}
          ${riskLabel}
        </span>
      </div>
      <div class="cmd-code-row">
        <code class="cmd-code">${escapeHtml(cmd.code)}</code>
        <div class="cmd-actions">
          <button class="cmd-icon-btn copy-btn" title="Copier la commande" data-code="${escapeHtml(cmd.code)}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          </button>
          <button class="cmd-icon-btn play-btn" title="Tester dans le simulateur" data-code="${escapeHtml(cmd.example)}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </button>
        </div>
      </div>
      <p class="cmd-desc">${cmd.desc}</p>
      <div class="cmd-example">Ex: ${escapeHtml(cmd.example)}</div>
    `;

    container.appendChild(card);
  });

  // Écouteurs de boutons
  container.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const code = btn.getAttribute("data-code");
      navigator.clipboard.writeText(code);
      showToast("Commande copiée dans le presse-papier !");
    });
  });

  container.querySelectorAll(".play-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const code = btn.getAttribute("data-code");
      const input = document.getElementById("sim-input");
      if (input) {
        input.value = code;
        input.focus();
        document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" });
        showToast("Commande insérée dans la console.");
      }
    });
  });
}

// =============================================================================
// 8. RENDU DES FILIÈRES ESATIC
// =============================================================================
function renderFilieres(cycle = "all") {
  const container = document.getElementById("filieres-cards-container");
  if (!container) return;

  container.innerHTML = "";

  const filtered = cycle === "all"
    ? ESATIC_FILIERES_DATA
    : ESATIC_FILIERES_DATA.filter(f => f.cycle === cycle || f.cycle === "both");

  filtered.forEach(f => {
    const card = document.createElement("div");
    card.classList.add("filiere-card");

    const badgeClass = f.cycle === "master" ? "filiere-master" : "filiere-licence";

    card.innerHTML = `
      <div class="filiere-top">
        <div class="filiere-sigle-wrap">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--esatic-blue-light)" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          <span class="filiere-sigle">${f.sigle}</span>
        </div>
        <span class="filiere-badge ${badgeClass}">${f.cycleLabel}</span>
      </div>
      <div class="filiere-name">${f.name}</div>
      <p class="filiere-usecase">${f.desc}</p>
      <div class="filiere-tools">
        ${f.tools.map(t => `
          <span class="tool-chip">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            ${t}
          </span>
        `).join("")}
      </div>
    `;

    container.appendChild(card);
  });
}

// =============================================================================
// 9. LIGHTBOX HD POUR LES IMAGES
// =============================================================================
function openLightbox(imgSrc, title) {
  const modal = document.getElementById("image-lightbox-modal");
  const img = document.getElementById("lightbox-img");
  const t = document.getElementById("lightbox-title");

  if (!modal || !img) return;

  img.src = imgSrc;
  t.textContent = title || "Aperçu Officiel ESATIC";
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  const modal = document.getElementById("image-lightbox-modal");
  if (modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }
}

// =============================================================================
// 10. MODALES: EMERGENCY & PALETTE (CTRL+K)
// =============================================================================
function openEmergencyModal(issueKey) {
  const modal = document.getElementById("emergency-modal");
  const content = document.getElementById("em-modal-content");
  const title = document.getElementById("em-modal-title");
  const data = EMERGENCY_DATA[issueKey];

  if (!modal || !content || !data) return;

  title.textContent = data.title;
  content.innerHTML = `
    <div class="em-steps-list">
      ${data.steps.map((s, idx) => `
        <div class="em-step">
          <div><span class="em-step-num">${idx + 1}</span> <strong>${s.text}</strong></div>
          <div class="em-code-box">
            <code>${escapeHtml(s.code).replace(/\n/g, "<br>")}</code>
            <button class="btn-xs btn-outline" onclick="copyToClipboard('${escapeJs(s.code)}')">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              Copier
            </button>
          </div>
        </div>
      `).join("")}
    </div>
    <div class="system-msg" style="margin-top: 1.25rem;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
      <div><strong>Conseil Pro pour la Soutenance :</strong> ${data.tip}</div>
    </div>
  `;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function closeEmergencyModal() {
  const modal = document.getElementById("emergency-modal");
  if (modal) {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }
}

function initCommandPalette() {
  const modal = document.getElementById("command-palette-modal");
  const trigger = document.getElementById("search-trigger-btn");
  const input = document.getElementById("palette-search-input");
  const results = document.getElementById("palette-results-list");

  if (!modal || !input || !results) return;

  const openPalette = () => {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    input.value = "";
    renderPaletteResults("");
    input.focus();
  };

  const closePalette = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  };

  trigger?.addEventListener("click", openPalette);

  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      modal.classList.contains("active") ? closePalette() : openPalette();
    }
    if (e.key === "Escape") {
      closePalette();
      closeEmergencyModal();
      closeLightbox();
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closePalette();
  });

  const lightboxModal = document.getElementById("image-lightbox-modal");
  lightboxModal?.addEventListener("click", (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  input.addEventListener("input", (e) => {
    renderPaletteResults(e.target.value.toLowerCase().trim());
  });

  function renderPaletteResults(query) {
    results.innerHTML = "";

    const matchedCmds = GIT_COMMANDS_DATA.filter(c => 
      c.code.toLowerCase().includes(query) || c.desc.toLowerCase().includes(query)
    );

    const matchedFilieres = ESATIC_FILIERES_DATA.filter(f =>
      f.sigle.toLowerCase().includes(query) || f.name.toLowerCase().includes(query)
    );

    if (matchedCmds.length === 0 && matchedFilieres.length === 0) {
      results.innerHTML = `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted);">Aucun résultat trouvé pour "${query}".</div>`;
      return;
    }

    matchedCmds.slice(0, 5).forEach(c => {
      const item = document.createElement("div");
      item.classList.add("palette-item");
      item.innerHTML = `
        <div class="palette-item-left">
          <span class="palette-item-title">${escapeHtml(c.code)}</span>
          <span class="palette-item-desc">${escapeHtml(c.desc)}</span>
        </div>
        <span class="palette-item-tag">Commande Git</span>
      `;
      item.addEventListener("click", () => {
        closePalette();
        const simInput = document.getElementById("sim-input");
        if (simInput) {
          simInput.value = c.example;
          document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" });
          simInput.focus();
        }
      });
      results.appendChild(item);
    });

    matchedFilieres.slice(0, 4).forEach(f => {
      const item = document.createElement("div");
      item.classList.add("palette-item");
      item.innerHTML = `
        <div class="palette-item-left">
          <span class="palette-item-title">${f.sigle} — ${f.name}</span>
          <span class="palette-item-desc">Spécialité ESATIC (${f.cycleLabel})</span>
        </div>
        <span class="palette-item-tag">Filière</span>
      `;
      item.addEventListener("click", () => {
        closePalette();
        document.getElementById("filieres")?.scrollIntoView({ behavior: "smooth" });
      });
      results.appendChild(item);
    });
  }
}

// =============================================================================
// 11. DYNAMISME DU HERO : MACHINE À ÉCRIRE INTERACTIVE
// =============================================================================
function initHeroTypewriter() {
  const target = document.getElementById("hero-typing-text");
  if (!target) return;

  const sequence = [
    "git push origin feature/soutenance-2026",
    "git tag -a v1.0-esatic -m 'Version Validée'",
    "git pull origin main --rebase",
    "git checkout -b devsecops/audit"
  ];

  let seqIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    if (isPaused) return;

    const currentString = sequence[seqIndex];

    if (isDeleting) {
      target.textContent = currentString.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentString.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentString.length) {
      delay = 2200; // Pause avant effacement
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      seqIndex = (seqIndex + 1) % sequence.length;
      delay = 500;
    }

    setTimeout(type, delay);
  }

  type();
}

// =============================================================================
// 12. SCROLL REVEAL (INTERSECTION OBSERVER)
// =============================================================================
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  elements.forEach(el => observer.observe(el));
}

// =============================================================================
// 13. UTILITAIRES & NOTIFICATIONS TOAST
// =============================================================================
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2EA043" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  showToast("Code copié dans le presse-papier !");
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function escapeJs(str) {
  if (!str) return "";
  return str.replace(/'/g, "\\'").replace(/\n/g, "\\n");
}

// =============================================================================
// 14. INITIALISATION AU CHARGEMENT DU DOM
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Thème Toggle
  const themeBtn = document.getElementById("theme-toggle-btn");
  themeBtn?.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    showToast(document.documentElement.classList.contains("dark") ? "Mode Sombre activé" : "Mode Clair activé");
  });

  // 2. Initialiser le simulateur et l'arbre SVG
  renderGitGraph();

  // Soumission console
  const simForm = document.getElementById("sim-form");
  const simInput = document.getElementById("sim-input");
  simForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (simInput && simInput.value.trim()) {
      executeSimCommand(simInput.value);
      simInput.value = "";
    }
  });

  // Actions rapides
  document.querySelectorAll(".quick-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      const cmd = btn.getAttribute("data-cmd");
      if (cmd) executeSimCommand(cmd);
    });
  });

  // Reset simulateur
  document.getElementById("sim-reset-btn")?.addEventListener("click", () => {
    sim.init();
    renderGitGraph();
    document.getElementById("sim-console-screen").innerHTML = `
      <div class="console-msg system-msg">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        <div>Arbre Git réinitialisé à l'état initial (Commit initial c1 sur 'main').</div>
      </div>
    `;
    showToast("Simulateur réinitialisé.");
  });

  // 3. Cheat Sheet Commandes
  renderCommands("all");
  document.querySelectorAll("#cmd-filters .pill-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#cmd-filters .pill-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCommands(btn.getAttribute("data-filter"));
    });
  });

  // 4. Filières ESATIC
  renderFilieres("all");
  document.querySelectorAll(".cycle-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".cycle-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderFilieres(tab.getAttribute("data-cycle"));
    });
  });

  // 5. Command Palette (Ctrl+K)
  initCommandPalette();

  // 6. Machine à écrire interactive
  initHeroTypewriter();

  // 7. Scroll Reveal
  initScrollReveal();
});
