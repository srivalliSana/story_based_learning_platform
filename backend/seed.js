const mongoose = require('mongoose');
const Story = require('./models/Story');
require('dotenv').config();

const connectDB = require('./config/database');

const sampleStories = [
  // Machine Learning Stories
  {
    title: {
      en: 'The Learning Algorithm',
      es: 'El Algoritmo de Aprendizaje',
      fr: 'L\'Algorithme d\'Apprentissage'
    },
    culture: 'Western',
    languages: ['en', 'es', 'fr'],
    subject: 'Machine Learning',
    module: 'Introduction to ML',
    nodes: [
      {
        id: 'start',
        content: {
          en: 'In the bustling city of Dataopolis, a young algorithm named Alex was born. Alex was different from other algorithms - Alex could learn from experience. One day, Alex was given a task: to predict whether it would rain tomorrow. What should Alex do first?',
          es: 'En la bulliciosa ciudad de Dataópolis, nació un joven algoritmo llamado Alex. Alex era diferente de otros algoritmos - Alex podía aprender de la experiencia. Un día, Alex recibió una tarea: predecir si llovería mañana. ¿Qué debería hacer Alex primero?',
          fr: 'Dans la ville animée de Dataopolis, un jeune algorithme nommé Alex est né. Alex était différent des autres algorithmes - Alex pouvait apprendre de l\'expérience. Un jour, Alex a reçu une tâche : prédire s\'il pleuvrait demain. Que devrait faire Alex en premier ?'
        },
        choices: [
          { text: { en: 'Collect historical weather data', es: 'Recopilar datos históricos del clima', fr: 'Collecter des données météorologiques historiques' }, nextNode: 'collect_data', emotionalImpact: 'curious' },
          { text: { en: 'Make a random guess', es: 'Hacer una suposición aleatoria', fr: 'Faire une supposition aléatoire' }, nextNode: 'random_guess', emotionalImpact: 'reckless' }
        ]
      },
      {
        id: 'collect_data',
        content: {
          en: 'Alex gathered weather data from the past 10 years: temperature, humidity, wind speed, and whether it rained. This is called the training dataset. Now Alex needs to find patterns in this data. What mathematical approach should Alex use?',
          es: 'Alex recopiló datos meteorológicos de los últimos 10 años: temperatura, humedad, velocidad del viento y si llovió. Esto se llama conjunto de datos de entrenamiento. Ahora Alex necesita encontrar patrones en estos datos. ¿Qué enfoque matemático debería usar Alex?',
          fr: 'Alex a rassemblé des données météorologiques des 10 dernières années : température, humidité, vitesse du vent et s\'il a plu. C\'est ce qu\'on appelle l\'ensemble de données d\'entraînement. Maintenant, Alex doit trouver des modèles dans ces données. Quelle approche mathématique Alex devrait-il utiliser ?'
        },
        choices: [
          { text: { en: 'Use linear regression to find relationships', es: 'Usar regresión lineal para encontrar relaciones', fr: 'Utiliser la régression linéaire pour trouver des relations' }, nextNode: 'linear_regression', emotionalImpact: 'analytical' },
          { text: { en: 'Use decision trees to classify patterns', es: 'Usar árboles de decisión para clasificar patrones', fr: 'Utiliser des arbres de décision pour classer les modèles' }, nextNode: 'decision_trees', emotionalImpact: 'logical' }
        ]
      },
      {
        id: 'linear_regression',
        content: {
          en: 'Alex used linear regression: y = mx + b, where y is the probability of rain, and x represents weather variables. After training, Alex could predict rain with 75% accuracy! This is supervised learning - learning from labeled examples.',
          es: 'Alex usó regresión lineal: y = mx + b, donde y es la probabilidad de lluvia, y x representa variables meteorológicas. Después del entrenamiento, Alex pudo predecir la lluvia con 75% de precisión. Esto es aprendizaje supervisado - aprender de ejemplos etiquetados.',
          fr: 'Alex a utilisé la régression linéaire : y = mx + b, où y est la probabilité de pluie, et x représente les variables météorologiques. Après l\'entraînement, Alex pouvait prédire la pluie avec 75% de précision ! C\'est l\'apprentissage supervisé - apprendre à partir d\'exemples étiquetés.'
        },
        choices: [],
        emotionalImpact: 'accomplished'
      },
      {
        id: 'decision_trees',
        content: {
          en: 'Alex built a decision tree: If humidity > 80% AND temperature < 15°C, then likely rain. This created a flowchart of decisions. Decision trees are interpretable and handle both numerical and categorical data.',
          es: 'Alex construyó un árbol de decisión: Si la humedad > 80% Y la temperatura < 15°C, entonces probable lluvia. Esto creó un diagrama de flujo de decisiones. Los árboles de decisión son interpretables y manejan datos numéricos y categóricos.',
          fr: 'Alex a construit un arbre de décision : Si humidité > 80% ET température < 15°C, alors pluie probable. Cela a créé un organigramme de décisions. Les arbres de décision sont interprétables et gèrent à la fois les données numériques et catégorielles.'
        },
        choices: [],
        emotionalImpact: 'innovative'
      },
      {
        id: 'random_guess',
        content: {
          en: 'Alex guessed randomly and was right only 50% of the time. This taught Alex an important lesson: machine learning requires data and algorithms, not luck. Always collect data first!',
          es: 'Alex adivinó al azar y acertó solo el 50% de las veces. Esto le enseñó a Alex una lección importante: el aprendizaje automático requiere datos y algoritmos, no suerte. ¡Siempre recopila datos primero!',
          fr: 'Alex a deviné au hasard et n\'a eu raison que 50% du temps. Cela a appris à Alex une leçon importante : l\'apprentissage automatique nécessite des données et des algorithmes, pas de chance. Collectez toujours des données d\'abord !'
        },
        choices: [],
        emotionalImpact: 'educational'
      }
    ]
  },
  {
    title: {
      en: 'The Neural Network Dream',
      es: 'El Sueño de la Red Neuronal',
      fr: 'Le Rêve du Réseau Neuronal'
    },
    culture: 'Western',
    languages: ['en', 'es', 'fr'],
    subject: 'Machine Learning',
    module: 'Deep Learning',
    nodes: [
      {
        id: 'start',
        content: {
        choices: [],
        emotionalImpact: 'remorseful'
      }
    ]
  }
];

const seedDB = async () => {
  await connectDB();
  await Story.deleteMany({});
  await Story.insertMany(sampleStories);
  console.log('Sample stories seeded');
  process.exit();
};

seedDB().catch(console.error);
