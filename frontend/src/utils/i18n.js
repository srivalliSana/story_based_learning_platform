import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to StoryScape',
      loading: 'Loading...',
      chooseYourPath: 'Choose your path',
      backToDashboard: 'Back to Dashboard',
      startStory: 'Start Story',
      progress: 'Progress',
      culture: 'Culture',
      home: 'Home',
      stories: 'Stories',
      profile: 'Profile',
      welcomeUser: 'Welcome, {{username}}',
      logout: 'Logout',
      login: 'Login',
      register: 'Register',
      emotions: {
        happy: 'You feel happy!',
        sad: 'You feel sad.',
        excited: 'You feel excited!',
        neutral: 'You feel neutral.'
      },
      stories: {
        // Sample story translations
        1: {
          title: 'The Wise Owl',
          nodes: {
            start: {
              text: 'Once upon a time, in a forest, there lived a wise owl...',
              choices: [
                { text: 'Ask for advice' },
                { text: 'Ignore and continue' }
              ]
            }
          }
        }
      }
    }
  },
  es: {
    translation: {
      welcome: 'Bienvenido a StoryScape',
      loading: 'Cargando...',
      chooseYourPath: 'Elige tu camino',
      backToDashboard: 'Volver al panel',
      startStory: 'Comenzar historia',
      progress: 'Progreso',
      culture: 'Cultura',
      home: 'Inicio',
      stories: 'Historias',
      profile: 'Perfil',
      welcomeUser: 'Bienvenido, {{username}}',
      logout: 'Cerrar sesión',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      emotions: {
        happy: '¡Te sientes feliz!',
        sad: 'Te sientes triste.',
        excited: '¡Te sientes emocionado!',
        neutral: 'Te sientes neutral.'
      },
      stories: {
        1: {
          title: 'El Búho Sabio',
          nodes: {
            start: {
              text: 'Érase una vez, en un bosque, vivía un búho sabio...',
              choices: [
                { text: 'Pedir consejo' },
                { text: 'Ignorar y continuar' }
              ]
            }
          }
        }
      }
    }
  },
  fr: {
    translation: {
      welcome: 'Bienvenue sur StoryScape',
      loading: 'Chargement...',
      chooseYourPath: 'Choisissez votre chemin',
      backToDashboard: 'Retour au tableau de bord',
      startStory: 'Commencer l\'histoire',
      progress: 'Progrès',
      culture: 'Culture',
      home: 'Accueil',
      stories: 'Histoires',
      profile: 'Profil',
      welcomeUser: 'Bienvenue, {{username}}',
      logout: 'Déconnexion',
      login: 'Connexion',
      register: 'S\'inscrire',
      emotions: {
        happy: 'Vous vous sentez heureux !',
        sad: 'Vous vous sentez triste.',
        excited: 'Vous vous sentez excité !',
        neutral: 'Vous vous sentez neutre.'
      },
      stories: {
        1: {
          title: 'Le Hibou Sage',
          nodes: {
            start: {
              text: 'Il était une fois, dans une forêt, vivait un hibou sage...',
              choices: [
                { text: 'Demander conseil' },
                { text: 'Ignorer et continuer' }
              ]
            }
          }
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
