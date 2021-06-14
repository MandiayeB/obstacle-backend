const PostgresClient = require('./PostgresClient');
const Status = require('./models/status.model');
const User = require('./models/user.model');
const Theme = require('./models/theme.model');
const Activity = require('./models/activity.model');
const Challenge = require('./models/challenge.model');
const Difficulty = require('./models/difficulty.model');
const Goal = require('./models/goal.model');
const DailyContent = require('./models/dailycontent.model');
const GoalDailyContent = require('./models/goal_dailycontent.model');
const Achievement = require('./models/achievement.model');

const models = [
    Status,
    User,
    Theme,
    Activity,
    Challenge,
    Difficulty,
    Goal,
    DailyContent,
    GoalDailyContent,
    Achievement
];

async function createDb() {
    for(const model of models) {
        await PostgresClient.client.query(model.toSQLTable());
        console.log(`Table ${model.tableName} créée avec succès !`);
    }
}

async function deleteDb() {
    for(const model of models) {
        await PostgresClient.client.query(`DROP TABLE ${model.tableName} CASCADE;`);
        console.log(`Table ${model.tableName} supprimée`);
    }
}

async function sampleData() {

    Status.create('Admin');
    await User.create('Mandiaye', 'Badiane', 'mandiayeee@gmail.com', 'oui', 'Homme', '1999-04-02', 1);
    await Theme.create('Sport');
    await Activity.create('Basketball', 1);
    await Challenge.create('Apprendre à tirer', 1, 1);
    /* Sport */
    await Difficulty.create(
        1, 
        'Le lancer franc',
        'https://media.giphy.com/media/3o7TKN14IiSp9ciYQE/giphy.gif',
        10,
        'facile',
        1
    );
    await Difficulty.create(
        2,
        'Tirer à mi-distance',
        'https://media.giphy.com/media/3oz8xMYmD6g5xbCSHu/giphy.gif',
        20,
        'moyenne',
        1
    );
    await Difficulty.create(
        3,
        'Tirer à 3 points', 
        'https://media.giphy.com/media/xT1XGCwOkQ2Ua5Zv5C/giphy.gif',
        30,
        'difficile',
        1
    );

    await DailyContent.create('Tirez 30 lancers francs.', 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', 1, 1);
    await DailyContent.create('Tirez 40 lancers francs.', 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', 2, 1);
    await DailyContent.create('Tirez 50 lancers francs.', 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', 3, 1);
    await DailyContent.create('Réussissez 30 lancers francs.', 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', 4, 1);
    await DailyContent.create('Réussissez 40 lancers francs.', 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', 5, 1);
    await DailyContent.create('Réussissez 50 lancers francs.', 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', 6, 1);
    await DailyContent.create('Réussissez 60 lancers francs.', 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', 7, 1);
    await DailyContent.create("Réussissez 10 lancers francs d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', 8, 1);
    await DailyContent.create("Réussissez 15 lancers francs d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', 9, 1);
    await DailyContent.create("Réussissez 25 lancers francs d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', 10, 1);
    
    await DailyContent.create('Réalisez 30 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', 1, 2);
    await DailyContent.create('Réalisez 40 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif',  2, 2);
    await DailyContent.create('Réalisez 50 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', 3, 2);
    await DailyContent.create('Réalisez 60 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', 4, 2);
    await DailyContent.create('Réalisez 70 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', 5, 2);
    await DailyContent.create('Réalisez 80 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', 6, 2);
    await DailyContent.create('Réalisez 100 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', 7, 2);
    await DailyContent.create('Réussissez 50 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', 8, 2);
    await DailyContent.create('Réussissez 60 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', 9, 2);
    await DailyContent.create('Réussissez 70 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', 10, 2);
    await DailyContent.create('Réussissez 80 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', 11, 2);
    await DailyContent.create('Réussissez 100 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', 12, 2);
    await DailyContent.create('Réussissez 50 tirs à mi-distance en changeant de position entre chaque tir.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', 13, 2);
    await DailyContent.create('Réussissez 70 tirs à mi-distance en changeant de position entre chaque tir.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', 14, 2);
    await DailyContent.create('Réussissez 100 tirs à mi-distance en changeant de position entre chaque tir.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', 15, 2);
    await DailyContent.create("Réussissez 5 tirs à mi-distance d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', 16, 2);
    await DailyContent.create("Réussissez 8 tirs à mi-distance d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', 17, 2);
    await DailyContent.create("Réussissez 10 tirs à mi-distance d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', 18, 2);
    await DailyContent.create("Réussissez 15 tirs à mi-distance d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', 19, 2);
    await DailyContent.create("Réussissez 20 tirs à mi-distance d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', 20, 2);

    await DailyContent.create('Réalisez 10 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 1, 3);
    await DailyContent.create('Réalisez 15 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 2, 3);
    await DailyContent.create('Réalisez 20 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 3, 3);
    await DailyContent.create('Réalisez 25 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 4, 3);
    await DailyContent.create('Réalisez 30 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 5, 3);
    await DailyContent.create('Réalisez 35 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 6, 3);
    await DailyContent.create('Réalisez 40 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 7, 3);
    await DailyContent.create('Réalisez 45 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 8, 3);
    await DailyContent.create('Réalisez 50 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 9, 3);
    await DailyContent.create('Réalisez 55 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 10, 3);
    await DailyContent.create('Réalisez 60 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 11, 3);
    await DailyContent.create('Réalisez 70 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 12, 3);
    await DailyContent.create('Réalisez 80 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 13, 3);
    await DailyContent.create('Réalisez 90 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 14, 3);
    await DailyContent.create('Réalisez 95 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 15, 3);
    await DailyContent.create("Réalisez 100 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 16, 3);
    await DailyContent.create("Réussissez 5 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 17, 3);
    await DailyContent.create("Réussissez 10 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 18, 3);
    await DailyContent.create("Réussissez 15 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 19, 3);
    await DailyContent.create("Réussissez 20 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 20, 3);
    await DailyContent.create("Réussissez 25 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 21, 3);
    await DailyContent.create("Réussissez 30 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 22, 3);
    await DailyContent.create("Réussissez 35 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 23, 3);
    await DailyContent.create("Réussissez 40 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 24, 3);
    await DailyContent.create("Réussissez 45 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 25, 3);
    await DailyContent.create("Réussissez 50 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 26, 3);
    await DailyContent.create("Réussissez 5 tirs à trois points d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 27, 3);
    await DailyContent.create("Réussissez 7 tirs à trois points d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 28, 3);
    await DailyContent.create("Réussissez 10 tirs à trois points d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 29, 3);
    await DailyContent.create("Réussissez 15 tirs à trois points d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', 30, 3);

    /* Cuisine */
    await Theme.create('Cuisine');
    await Activity.create('Sucré Salé', 2);
    await Challenge.create('Apprendre à cuisiner', 1, 2);
    await Difficulty.create(
        1, 
        'Les essentiels',
        'https://media.giphy.com/media/b5Hcaz7EPz26I/giphy.gif',
        10,
        'facile',
        2
    );
    await Difficulty.create(
        2,
        'Plats complexes',
        'https://media.giphy.com/media/l0MYN1vN4aWy9vXpK/giphy.gif',
        10,
        'moyenne',
        2
    );
    await Difficulty.create(
        3,
        'Pâtisserie', 
        'https://media.giphy.com/media/ARAVYYOfzdFiYghGfa/giphy.gif',
        10,
        'difficile',
        2
    );

    await DailyContent.create('Cuisinez des pâtes et des oeufs.', 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', 1, 4);
    await DailyContent.create('Cuisinez du riz et des oeufs.', 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', 2, 1);
    await DailyContent.create('Cuisinez de la purée de pomme de terre et des oeufs.', 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', 3, 4);
    await DailyContent.create('Cuisinez des petits pois carotte.', 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', 4, 4);
    await DailyContent.create('Cuisinez des petits pois carotte.', 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', 5, 4);
    await DailyContent.create('Cuisinez des petits pois carotte.', 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', 6, 4);
    await DailyContent.create('Cuisinez des petits pois carotte.', 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', 7, 4);
    await DailyContent.create("Cuisinez des petits pois carotte.", 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', 8, 4);
    await DailyContent.create("Cuisinez des petits pois carotte.", 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', 9, 4);
    await DailyContent.create("Cuisinez des petits pois carotte.", 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', 10, 4);

    await DailyContent.create('Cuisinez des pâtes au pesto.', 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', 1, 5);
    await DailyContent.create('Cuisinez des pâtes bolognaise.', 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', 2, 5);
    await DailyContent.create('Cuisinez des pâtes carbonara.', 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', 3, 5);
    await DailyContent.create('Cuisinez des lasagnes au boeuf.', 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', 4, 5);
    await DailyContent.create('Cuisinez des lasagnes végétarienne.', 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', 5, 5);
    await DailyContent.create('Cuisinez des lasagnes végétarienne.', 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', 6, 5);
    await DailyContent.create('Cuisinez des lasagnes végétarienne.', 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', 7, 5);
    await DailyContent.create("Cuisinez des lasagnes végétarienne.", 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', 8, 5);
    await DailyContent.create("Cuisinez des lasagnes végétarienne.", 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', 9, 5);
    await DailyContent.create("Cuisinez des lasagnes végétarienne.", 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', 10, 5);

    await DailyContent.create('Cuisinez un gâteau au yaourt.', 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', 1, 6);
    await DailyContent.create('Cuisinez un gâteau au yaourt aux pommes.', 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', 2, 6);
    await DailyContent.create('Cuisinez une mousse au chocolat.', 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', 3, 6);
    await DailyContent.create('Cuisinez une salade de fruit.', 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', 4, 6);
    await DailyContent.create('Cuisinez un gateau au chocolat.', 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', 5, 6);
    await DailyContent.create('Cuisinez un tiramisu.', 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', 6, 6);
    await DailyContent.create('Cuisinez un tiramisu.', 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', 7, 6);
    await DailyContent.create("Cuisinez un tiramisu.", 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', 8, 6);
    await DailyContent.create("Cuisinez un tiramisu.", 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', 9, 6);
    await DailyContent.create("Cuisinez un tiramisu.", 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', 10, 6);

    /* Informatique */
    await Theme.create('Informatique');
    await Activity.create('Développer en s\'amusant', 3);
    await Challenge.create('Apprendre à développer', 1, 3);
    await Difficulty.create(
        1, 
        'HTML et CSS',
        'https://media.giphy.com/media/cn2noc6qR0HjAfVzmn/giphy.gif',
        10,
        'facile',
        3
    );
    await Difficulty.create(
        2,
        'Javascript',
        'https://media.giphy.com/media/PiQejEf31116URju4V/giphy.gif',
        10,
        'moyenne',
        3
    );
    await Difficulty.create(
        3,
        'Java', 
        'https://media.giphy.com/media/QX6ruFElzFdeIfblrg/giphy.gif',
        10,
        'difficile',
        3
    );

    await DailyContent.create('Réalisez une page de connexion.', 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', 1, 7);
    await DailyContent.create('Réalisez un site avec une inscription et une connexion.', 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', 2, 7);
    await DailyContent.create('Réalisez un site en utilisant des flexboxs.', 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', 3, 7);
    await DailyContent.create('Réalisez un site avec un header.', 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', 4, 7);
    await DailyContent.create('Réalisez un site avec un header et un footer.', 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', 5, 7);
    await DailyContent.create('Réalisez un site avec une connexion.', 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', 6, 7);
    await DailyContent.create('Réalisez un site avec une connexion.', 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', 7, 7);
    await DailyContent.create("Réalisez un site avec une connexion.", 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', 8, 7);
    await DailyContent.create("Réalisez un site avec une connexion.", 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', 9, 7);
    await DailyContent.create("Réalisez un site avec une connexion.", 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', 10, 7);

    await DailyContent.create('Créez une fonction pour valider la connexion de l\'utilisateur.', 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', 1, 8);
    await DailyContent.create('Créez un tableau pour stocker des données.', 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', 2, 8);
    await DailyContent.create('Utilisez une boucle for.', 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', 3, 8);
    await DailyContent.create('Utilisez une boucle while.', 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', 4, 8);
    await DailyContent.create('Réalisez un snake.', 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', 5, 8);
    await DailyContent.create('Réalisez un snake multijoueur.', 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', 6, 8);
    await DailyContent.create('Réalisez un snake multijoueur.', 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', 7, 8);
    await DailyContent.create("Réalisez un snake multijoueur.", 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', 8, 8);
    await DailyContent.create("Réalisez un snake multijoueur.", 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', 9, 8);
    await DailyContent.create("Réalisez un snake multijoueur.", 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', 10, 8);

    await DailyContent.create('Créez une classe.', 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', 1, 9);
    await DailyContent.create('Créez une interface.', 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', 2, 9);
    await DailyContent.create('Utilisez l\'héritage.', 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', 3, 9);
    await DailyContent.create('Utilisez le polymorphisme.', 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', 4, 9);
    await DailyContent.create('Réalisez un jeu de carte.', 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', 5, 9);
    await DailyContent.create('Développer minecraft.', 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', 6, 9);
    await DailyContent.create('Développer minecraft en multijoueur.', 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', 7, 9);
    await DailyContent.create("Réalisez un jeu de carte.", 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', 8, 9);
    await DailyContent.create("Réalisez un jeu de carte.", 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', 9, 9);
    await DailyContent.create("Réalisez un jeu de carte.", 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', 10, 9);
}

async function run() {
    await PostgresClient.init();
    console.log("Connected");
    try {
        await deleteDb();
    } catch(e) {
        console.log('Un problème est survenu : ' + e.message);
    }
    await createDb();
    await sampleData();
}
run();