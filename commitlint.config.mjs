// Convention de commits : https://www.conventionalcommits.org/fr/
// Exemple : "feat(events): ajoute la liste d'attente"
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [1, 'always', ['api', 'web', 'mobile', 'shared', 'docs', 'ci', 'deps', 'repo']],
  },
};
