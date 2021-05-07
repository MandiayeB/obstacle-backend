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
    await User.create('Mandiaye', 'Badiane', 'mandiaye@gmail.com', 'oui', 1);
    await Theme.create('Sport');
    await Activity.create('Athlétisme', 1);
    await Challenge.create('Course', 1, 1);
    await Difficulty.create(1, '10km', 1);
    await Difficulty.create(2, 'Semi-Marathon', 1);
    await Difficulty.create(3, 'Marathon', 1);
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