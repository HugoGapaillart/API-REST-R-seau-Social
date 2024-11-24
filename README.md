API REST Réseau social

Récupérer le projet
`git clone https://github.com/HugoGapaillart/API-REST-R-seau-Social.git`

Installer le projet
`npm i`

Créer la base de donnée
Décommenter "await sequelize.sync({ force: true });" dans le fichier index.js à la racine du projet.

Lancer le projet
`nodemon`

Documentation Swagger
`http://localhost:3000/docs/`

GraphQL
`http://localhost:3000/graphql`

Exemple de requete:

`query {
	getPost(userId : 1) {
    id,
		titre,
    contenu,
    UserId,
    comments{
      UserId,
      contenu
    }
	}
}`

résultat:

`{
  "data": {
    "getPost": [
      {
        "id": 1,
        "titre": "test",
        "contenu": "hello",
        "UserId": 1,
        "comments": [
          {
            "UserId": 1,
            "contenu": "Hey"
          },
          {
            "UserId": 3,
            "contenu": "Bonjour"
          }
        ]
      }
    ]
  }
}`
