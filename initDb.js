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
    await DailyContent.create('Tirez 30 lancers francs.', 1, 1);
    await DailyContent.create('Tirez 40 lancers francs.', 2, 1);
    await DailyContent.create('Tirez 50 lancers francs.', 3, 1);
    await DailyContent.create('Réussissez 30 lancers francs.', 4, 1);
    await DailyContent.create('Réussissez 40 lancers francs.', 5, 1);
    await DailyContent.create('Réussissez 50 lancers francs.', 6, 1);
    await DailyContent.create('Réussissez 60 lancers francs.', 7, 1);
    await DailyContent.create("Réussissez 10 lancers francs d'affilé, en cas d'échec recommencez à zéro.", 8, 1);
    await DailyContent.create("Réussissez 15 lancers francs d'affilé, en cas d'échec recommencez à zéro.", 9, 1);
    await DailyContent.create("Réussissez 25 lancers francs d'affilé, en cas d'échec recommencez à zéro.", 10, 1);
    
    await DailyContent.create('Réalisez 30 tirs à mi-distance.', 1, 2);
    await DailyContent.create('Réalisez 40 tirs à mi-distance.', 2, 2);
    await DailyContent.create('Réalisez 50 tirs à mi-distance.', 3, 2);
    await DailyContent.create('Réalisez 60 tirs à mi-distance.', 4, 2);
    await DailyContent.create('Réalisez 70 tirs à mi-distance.', 5, 2);
    await DailyContent.create('Réalisez 80 tirs à mi-distance.', 6, 2);
    await DailyContent.create('Réalisez 100 tirs à mi-distance.', 7, 2);
    await DailyContent.create('Réussissez 50 tirs à mi-distance.', 8, 2);
    await DailyContent.create('Réussissez 60 tirs à mi-distance.', 9, 2);
    await DailyContent.create('Réussissez 70 tirs à mi-distance.', 10, 2);
    await DailyContent.create('Réussissez 80 tirs à mi-distance.', 11, 2);
    await DailyContent.create('Réussissez 100 tirs à mi-distance.', 12, 2);
    await DailyContent.create('Réussissez 50 tirs à mi-distance en changeant de position entre chaque tir.', 13, 2);
    await DailyContent.create('Réussissez 70 tirs à mi-distance en changeant de position entre chaque tir.', 14, 2);
    await DailyContent.create('Réussissez 100 tirs à mi-distance en changeant de position entre chaque tir.', 15, 2);
    await DailyContent.create("Réussissez 5 tirs à mi-distance d'affilé, en cas d'échec recommencez à zéro.", 16, 2);
    await DailyContent.create("Réussissez 8 tirs à mi-distance d'affilé, en cas d'échec recommencez à zéro.", 17, 2);
    await DailyContent.create("Réussissez 10 tirs à mi-distance d'affilé, en cas d'échec recommencez à zéro.", 18, 2);
    await DailyContent.create("Réussissez 15 tirs à mi-distance d'affilé, en cas d'échec recommencez à zéro.", 19, 2);
    await DailyContent.create("Réussissez 20 tirs à mi-distance d'affilé, en cas d'échec recommencez à zéro.", 20, 2);

    await DailyContent.create('Réalisez 10 tirs à trois points.', 1, 3);
    await DailyContent.create('Réalisez 15 tirs à trois points.', 2, 3);
    await DailyContent.create('Réalisez 20 tirs à trois points.', 3, 3);
    await DailyContent.create('Réalisez 25 tirs à trois points.', 4, 3);
    await DailyContent.create('Réalisez 30 tirs à trois points.', 5, 3);
    await DailyContent.create('Réalisez 35 tirs à trois points.', 6, 3);
    await DailyContent.create('Réalisez 40 tirs à trois points.', 7, 3);
    await DailyContent.create('Réalisez 45 tirs à trois points.', 8, 3);
    await DailyContent.create('Réalisez 50 tirs à trois points.', 9, 3);
    await DailyContent.create('Réalisez 55 tirs à trois points.', 10, 3);
    await DailyContent.create('Réalisez 60 tirs à trois points.', 11, 3);
    await DailyContent.create('Réalisez 70 tirs à trois points.', 12, 3);
    await DailyContent.create('Réalisez 80 tirs à trois points.', 13, 3);
    await DailyContent.create('Réalisez 90 tirs à trois points.', 14, 3);
    await DailyContent.create('Réalisez 95 tirs à trois points.', 15, 3);
    await DailyContent.create("Réalisez 100 tirs à trois points.", 16, 3);
    await DailyContent.create("Réussissez 5 tirs à trois points.", 17, 3);
    await DailyContent.create("Réussissez 10 tirs à trois points.", 18, 3);
    await DailyContent.create("Réussissez 15 tirs à trois points.", 19, 3);
    await DailyContent.create("Réussissez 20 tirs à trois points.", 20, 3);
    await DailyContent.create("Réussissez 25 tirs à trois points.", 21, 3);
    await DailyContent.create("Réussissez 30 tirs à trois points.", 22, 3);
    await DailyContent.create("Réussissez 35 tirs à trois points.", 23, 3);
    await DailyContent.create("Réussissez 40 tirs à trois points.", 24, 3);
    await DailyContent.create("Réussissez 45 tirs à trois points.", 25, 3);
    await DailyContent.create("Réussissez 50 tirs à trois points.", 26, 3);
    await DailyContent.create("Réussissez 5 tirs à trois points d'affilé, en cas d'échec recommencez à zéro.", 27, 3);
    await DailyContent.create("Réussissez 7 tirs à trois points d'affilé, en cas d'échec recommencez à zéro.", 28, 3);
    await DailyContent.create("Réussissez 10 tirs à trois points d'affilé, en cas d'échec recommencez à zéro.", 29, 3);
    await DailyContent.create("Réussissez 15 tirs à trois points d'affilé, en cas d'échec recommencez à zéro.", 30, 3);
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