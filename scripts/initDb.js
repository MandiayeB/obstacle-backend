const PostgresClient = require('../services/PostgresClient');
const Status = require('../models/status.model');
const User = require('../models/user.model');
const Theme = require('../models/theme.model');
const Activity = require('../models/activity.model');
const Challenge = require('../models/challenge.model');
const Difficulty = require('../models/difficulty.model');
const Goal = require('../models/goal.model');
const DailyContent = require('../models/dailycontent.model');
const GoalDailyContent = require('../models/goal_dailycontent.model');
const Achievement = require('../models/achievement.model');
const Session = require('../models/session.model');

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
    Achievement,
    Session
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
    Status.create('User');
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
        'Le tir à mi-distance',
        'https://media.giphy.com/media/3oz8xMYmD6g5xbCSHu/giphy.gif',
        20,
        'moyenne',
        1
    );
    await Difficulty.create(
        3,
        'Le tir à 3 points', 
        'https://media.giphy.com/media/xT1XGCwOkQ2Ua5Zv5C/giphy.gif',
        30,
        'difficile',
        1
    );

    await DailyContent.create('Tirez 30 lancers francs.', 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/fWuUXG6ecSQ", "text": "Aide pour ce challenge :"}, "guide2": { "url": "https://www.youtube.com/embed/Fg0j2P-OL7I", "text": "Des conseils pour vous équiper :" }}', 1, 1);
    await DailyContent.create('Tirez 40 lancers francs.', 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/fWuUXG6ecSQ", "text": "Aide pour ce challenge :"}, "guide2": { "url": "https://www.youtube.com/embed/Fg0j2P-OL7I", "text": "Des conseils pour vous équiper :" }}', 2, 1);
    await DailyContent.create('Tirez 50 lancers francs.', 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/fWuUXG6ecSQ", "text": "Aide pour ce challenge :"}, "guide2": { "url": "https://www.youtube.com/embed/Fg0j2P-OL7I", "text": "Des conseils pour vous équiper :" }}', 3, 1);
    await DailyContent.create('Réussissez 30 lancers francs.', 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/fWuUXG6ecSQ", "text": "Aide pour ce challenge :"}, "guide2": { "url": "https://www.youtube.com/embed/Fg0j2P-OL7I", "text": "Des conseils pour vous équiper :" }}', 4, 1);
    await DailyContent.create('Réussissez 40 lancers francs.', 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/fWuUXG6ecSQ", "text": "Aide pour ce challenge :"}, "guide2": { "url": "https://www.youtube.com/embed/Fg0j2P-OL7I", "text": "Des conseils pour vous équiper :" }}', 5, 1);
    await DailyContent.create('Réussissez 50 lancers francs.', 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/fWuUXG6ecSQ", "text": "Aide pour ce challenge :"}, "guide2": { "url": "https://www.youtube.com/embed/Fg0j2P-OL7I", "text": "Des conseils pour vous équiper :" }}', 6, 1);
    await DailyContent.create('Réussissez 60 lancers francs.', 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/fWuUXG6ecSQ", "text": "Aide pour ce challenge :"}, "guide2": { "url": "https://www.youtube.com/embed/Fg0j2P-OL7I", "text": "Des conseils pour vous équiper :"}}', 7, 1);
    await DailyContent.create("Réussissez 10 lancers francs d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/fWuUXG6ecSQ", "text": "Aide pour ce challenge :"}, "guide2": { "url": "https://www.youtube.com/embed/Fg0j2P-OL7I", "text": "Des conseils pour vous équiper :" }}', 8, 1);
    await DailyContent.create("Réussissez 15 lancers francs d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/fWuUXG6ecSQ", "text": "Aide pour ce challenge :"}, "guide2": { "url": "https://www.youtube.com/embed/Fg0j2P-OL7I", "text": "Des conseils pour vous équiper :" }}', 9, 1);
    await DailyContent.create("Réussissez 25 lancers francs d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/3oGRFfGQXanXsgQ2bK/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/fWuUXG6ecSQ", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 10, 1);
    
    await DailyContent.create('Réalisez 30 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 1, 2);
    await DailyContent.create('Réalisez 40 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 2, 2);
    await DailyContent.create('Réalisez 50 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 3, 2);
    await DailyContent.create('Réalisez 60 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 4, 2);
    await DailyContent.create('Réalisez 70 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 5, 2);
    await DailyContent.create('Réalisez 80 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 6, 2);
    await DailyContent.create('Réalisez 100 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 7, 2);
    await DailyContent.create('Réussissez 50 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 8, 2);
    await DailyContent.create('Réussissez 60 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 9, 2);
    await DailyContent.create('Réussissez 70 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 10, 2);
    await DailyContent.create('Réussissez 80 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 11, 2);
    await DailyContent.create('Réussissez 100 tirs à mi-distance.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 12, 2);
    await DailyContent.create('Réussissez 50 tirs à mi-distance en changeant de position entre chaque tir.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 13, 2);
    await DailyContent.create('Réussissez 70 tirs à mi-distance en changeant de position entre chaque tir.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 14, 2);
    await DailyContent.create('Réussissez 100 tirs à mi-distance en changeant de position entre chaque tir.', 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 15, 2);
    await DailyContent.create("Réussissez 5 tirs à mi-distance d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 16, 2);
    await DailyContent.create("Réussissez 8 tirs à mi-distance d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 17, 2);
    await DailyContent.create("Réussissez 10 tirs à mi-distance d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 18, 2);
    await DailyContent.create("Réussissez 15 tirs à mi-distance d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 19, 2);
    await DailyContent.create("Réussissez 20 tirs à mi-distance d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/9JrzoEG42sBPEErd2v/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/65peK6Ps5M0", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/Fg0j2P-OL7", "text": "Des conseils pour vous équiper :"}}', 20, 2);

    await DailyContent.create('Réalisez 10 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 1, 3);
    await DailyContent.create('Réalisez 15 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 2, 3);
    await DailyContent.create('Réalisez 20 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 3, 3);
    await DailyContent.create('Réalisez 25 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 4, 3);
    await DailyContent.create('Réalisez 30 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 5, 3);
    await DailyContent.create('Réalisez 35 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 6, 3);
    await DailyContent.create('Réalisez 40 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 7, 3);
    await DailyContent.create('Réalisez 45 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 8, 3);
    await DailyContent.create('Réalisez 50 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 9, 3);
    await DailyContent.create('Réalisez 55 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 10, 3);
    await DailyContent.create('Réalisez 60 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 11, 3);
    await DailyContent.create('Réalisez 70 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 12, 3);
    await DailyContent.create('Réalisez 80 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 13, 3);
    await DailyContent.create('Réalisez 90 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 14, 3);
    await DailyContent.create('Réalisez 95 tirs à trois points.', 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 15, 3);
    await DailyContent.create("Réalisez 100 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 16, 3);
    await DailyContent.create("Réussissez 5 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 17, 3);
    await DailyContent.create("Réussissez 10 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 18, 3);
    await DailyContent.create("Réussissez 15 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 19, 3);
    await DailyContent.create("Réussissez 20 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 20, 3);
    await DailyContent.create("Réussissez 25 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 21, 3);
    await DailyContent.create("Réussissez 30 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 22, 3);
    await DailyContent.create("Réussissez 35 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 23, 3);
    await DailyContent.create("Réussissez 40 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 24, 3);
    await DailyContent.create("Réussissez 45 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 25, 3);
    await DailyContent.create("Réussissez 50 tirs à trois points.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 26, 3);
    await DailyContent.create("Réussissez 5 tirs à trois points d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 27, 3);
    await DailyContent.create("Réussissez 7 tirs à trois points d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 28, 3);
    await DailyContent.create("Réussissez 10 tirs à trois points d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 29, 3);
    await DailyContent.create("Réussissez 15 tirs à trois points d'affilé, en cas d'échec recommencez à zéro.", 'https://media.giphy.com/media/3oEdv5e5Zd2gsczAhG/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/LfRVriLtiIs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/Fg0j2P-OL7", "text":"Des conseils pour vous équiper :"}}', 30, 3);

    /* Cuisine */
    await Theme.create('Cuisine');
    await Activity.create('Apprendre à cuisiner', 2);
    await Challenge.create('Les fondamentaux', 1, 2);
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
        'Les fondamentaux',
        'https://media.giphy.com/media/l0MYN1vN4aWy9vXpK/giphy.gif',
        10,
        'moyenne',
        2
    );
    await Difficulty.create(
        3,
        'La pâtisserie', 
        'https://media.giphy.com/media/ARAVYYOfzdFiYghGfa/giphy.gif',
        10,
        'difficile',
        2
    );

    await DailyContent.create('Cuisinez des pâtes et des oeufs.', 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 1, 4);
    await DailyContent.create('Cuisinez du riz et des oeufs.', 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 2, 4);
    await DailyContent.create('Cuisinez de la purée de pomme de terre et des oeufs.', 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 3, 4);
    await DailyContent.create('Cuisinez des petits pois carotte.', 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 4, 4);
    await DailyContent.create('Cuisinez des petits pois carotte.', 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 5, 4);
    await DailyContent.create('Cuisinez des petits pois carotte.', 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 6, 4);
    await DailyContent.create('Cuisinez des petits pois carotte.', 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 7, 4);
    await DailyContent.create("Cuisinez des petits pois carotte.", 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 8, 4);
    await DailyContent.create("Cuisinez des petits pois carotte.", 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 9, 4);
    await DailyContent.create("Cuisinez des petits pois carotte.", 'https://media.giphy.com/media/CNocEFcF9IBegtgW3q/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 10, 4);

    await DailyContent.create('Cuisinez des pâtes au pesto.', 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 1, 5);
    await DailyContent.create('Cuisinez des pâtes bolognaise.', 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 2, 5);
    await DailyContent.create('Cuisinez des pâtes carbonara.', 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 3, 5);
    await DailyContent.create('Cuisinez des lasagnes au boeuf.', 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 4, 5);
    await DailyContent.create('Cuisinez des lasagnes végétarienne.', 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 5, 5);
    await DailyContent.create('Cuisinez des lasagnes végétarienne.', 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 6, 5);
    await DailyContent.create('Cuisinez des lasagnes végétarienne.', 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 7, 5);
    await DailyContent.create("Cuisinez des lasagnes végétarienne.", 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 8, 5);
    await DailyContent.create("Cuisinez des lasagnes végétarienne.", 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 9, 5);
    await DailyContent.create("Cuisinez des lasagnes végétarienne.", 'https://media.giphy.com/media/P7FIpAKDpz9IKKvT1s/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/2IXPuiQWsvs", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 10, 5);

    await DailyContent.create('Cuisinez un gâteau au yaourt.', 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/qwCoQO8Mu18", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 1, 6);
    await DailyContent.create('Cuisinez un gâteau au yaourt aux pommes.', 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/qwCoQO8Mu18", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 2, 6);
    await DailyContent.create('Cuisinez une mousse au chocolat.', 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/qwCoQO8Mu18", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 3, 6);
    await DailyContent.create('Cuisinez une salade de fruit.', 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/qwCoQO8Mu18", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 4, 6);
    await DailyContent.create('Cuisinez un gateau au chocolat.', 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/qwCoQO8Mu18", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 5, 6);
    await DailyContent.create('Cuisinez un tiramisu.', 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/qwCoQO8Mu18", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 6, 6);
    await DailyContent.create('Cuisinez un tiramisu.', 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/qwCoQO8Mu18", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 7, 6);
    await DailyContent.create("Cuisinez un tiramisu.", 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/qwCoQO8Mu18", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 8, 6);
    await DailyContent.create("Cuisinez un tiramisu.", 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/qwCoQO8Mu18", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 9, 6);
    await DailyContent.create("Cuisinez un tiramisu.", 'https://media.giphy.com/media/3oEjI9dX74ezjCHS7e/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/qwCoQO8Mu18", "text": "Aide pour ce challenge :"}, "guide2": {"url":"https://www.youtube.com/embed/KRv0CgJ6_Ws", "text":"Des conseils pour vous équiper :"}}', 10, 6);

    // /* Informatique */
    await Theme.create('Informatique');
    await Activity.create('Apprendre à développer', 3);
    await Challenge.create('Développer en s\'amusant', 1, 3);
    await Difficulty.create(
        1, 
        'L\'HTML et le CSS',
        'https://media.giphy.com/media/cn2noc6qR0HjAfVzmn/giphy.gif',
        10,
        'facile',
        3
    );
    await Difficulty.create(
        2,
        'Le javascript',
        'https://media.giphy.com/media/PiQejEf31116URju4V/giphy.gif',
        10,
        'moyenne',
        3
    );
    await Difficulty.create(
        3,
        'Le java', 
        'https://media.giphy.com/media/QX6ruFElzFdeIfblrg/giphy.gif',
        10,
        'difficile',
        3
    );

    await DailyContent.create('Réalisez une page de connexion.', 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/8FqZZrbnwkM", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 1, 7);
    await DailyContent.create('Réalisez un site avec une inscription et une connexion.', 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/8FqZZrbnwkM", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 2, 7);
    await DailyContent.create('Réalisez un site en utilisant des flexboxs.', 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/8FqZZrbnwkM", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 3, 7);
    await DailyContent.create('Réalisez un site avec un header.', 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/8FqZZrbnwkM", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 4, 7);
    await DailyContent.create('Réalisez un site avec un header et un footer.', 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/8FqZZrbnwkM", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 5, 7);
    await DailyContent.create('Réalisez un site avec une connexion.', 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/8FqZZrbnwkM", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 6, 7);
    await DailyContent.create('Réalisez un site avec une connexion.', 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/8FqZZrbnwkM", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 7, 7);
    await DailyContent.create("Réalisez un site avec une connexion.", 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/8FqZZrbnwkM", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 8, 7);
    await DailyContent.create("Réalisez un site avec une connexion.", 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/8FqZZrbnwkM", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 9, 7);
    await DailyContent.create("Réalisez un site avec une connexion.", 'https://media.giphy.com/media/QuIxFwQo0RMT1tASlV/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/8FqZZrbnwkM", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 10, 7);

    await DailyContent.create('Créez une fonction pour valider la connexion de l\'utilisateur.', 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/QB1DTl7HFnc", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 1, 8);
    await DailyContent.create('Créez un tableau pour stocker des données.', 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/QB1DTl7HFnc", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 2, 8);
    await DailyContent.create('Utilisez une boucle for.', 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/QB1DTl7HFnc", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 3, 8);
    await DailyContent.create('Utilisez une boucle while.', 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/QB1DTl7HFnc", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 4, 8);
    await DailyContent.create('Réalisez un snake.', 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/QB1DTl7HFnc", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 5, 8);
    await DailyContent.create('Réalisez un snake multijoueur.', 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/QB1DTl7HFnc", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 6, 8);
    await DailyContent.create('Réalisez un snake multijoueur.', 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/QB1DTl7HFnc", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 7, 8);
    await DailyContent.create("Réalisez un snake multijoueur.", 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/QB1DTl7HFnc", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 8, 8);
    await DailyContent.create("Réalisez un snake multijoueur.", 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/QB1DTl7HFnc", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 9, 8);
    await DailyContent.create("Réalisez un snake multijoueur.", 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/QB1DTl7HFnc", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 10, 8);

    await DailyContent.create('Créez une classe.', 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/XgVADKKb4jI&t=316s", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 1, 9);
    await DailyContent.create('Créez une interface.', 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/XgVADKKb4jI&t=316s", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 2, 9);
    await DailyContent.create('Utilisez l\'héritage.', 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/XgVADKKb4jI&t=316s", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 3, 9);
    await DailyContent.create('Utilisez le polymorphisme.', 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/XgVADKKb4jI&t=316s", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 4, 9);
    await DailyContent.create('Réalisez un jeu de carte.', 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/XgVADKKb4jI&t=316s", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 5, 9);
    await DailyContent.create('Développer minecraft.', 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/XgVADKKb4jI&t=316s", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 6, 9);
    await DailyContent.create('Développer minecraft en multijoueur.', 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/XgVADKKb4jI&t=316s", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 7, 9);
    await DailyContent.create("Réalisez un jeu de carte.", 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/XgVADKKb4jI&t=316s", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 8, 9);
    await DailyContent.create("Réalisez un jeu de carte.", 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/XgVADKKb4jI&t=316s", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 9, 9);
    await DailyContent.create("Réalisez un jeu de carte.", 'https://media.giphy.com/media/WUTywPPYZpdDChyBaZ/giphy.gif', '{"guide1": { "url": "https://www.youtube.com/embed/XgVADKKb4jI&t=316s", "text": "Aide pour ce challenge :"}, "guide2": {"url": "https://www.youtube.com/embed/MqLQzOndBbU" , "text":"Des conseils pour vous équiper :"}}', 10, 9);
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