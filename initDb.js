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
    await User.create('Mandiaye', 'Badiane', 'mandiaye@gmail.com', 'oui', 'Homme', '1999-04-02', 1);
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
    date = Date.now();
    await Goal.create(date, date + 30 * 24*60*60*1000, 1, 3);
    await DailyContent.create('Cours plus vite', 1, 3);
    await GoalDailyContent.create(true, 1, 1);
    date = Date.now();
    await Achievement.create('J\'ai bien couru aujourd\'hui !', date, 1);
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