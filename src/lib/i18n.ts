import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        discover: 'Discover',
        reservations: 'Reservations',
        events: 'Events',
        social: 'Social',
        access_hub: 'Access Hub'
      },
      hero: {
        title: 'Synchronize Your Palate.',
        subtitle: 'The elite hospitality layer for the mid-metropolitan grid. AI-optimized discovery, curation, and sub-quantum fulfillment.'
      },
      discover: {
        search_placeholder: 'Search by flavor, mood, or coordinate...',
        filter_ai: 'AI Picks',
        filter_trending: 'Trending',
        filter_near: 'Near You',
        filter_fastest: 'Fastest',
        filter_top: 'Top Rated'
      },
      cart: {
        title: 'Your basket is floating in space.',
        subtitle: 'Discover something delicious',
        subtotal: 'Subtotal',
        fee: 'Delivery & AI Precision Fee',
        confirm: 'Confirm Precision Delivery'
      }
    }
  },
  hi: {
    translation: {
      nav: {
        discover: 'खोजें',
        reservations: 'आरक्षण',
        events: 'कार्यक्रम',
        social: 'सोशल',
        access_hub: 'एक्सेस हब'
      },
      hero: {
        title: 'अपने स्वाद को सिंक्रनाइज़ करें।',
        subtitle: 'मिड-मेट్రోపాలిటన్ గ్రిడ్ కోసం ఉన్నత స్థాయి ఆతిథ్యం. AI-ఆప్టిమైజ్డ్ ఆవిష్కరణ, క్యూరేషన్ మరియు సబ్-క్వాంటం నెరవేర్పు.'
      },
      discover: {
        search_placeholder: 'స్వాద్, మూడ్ లేదా సమన్వయం ద్వారా వెతకండి...',
        filter_ai: 'ఏఐ ఎంపికలు',
        filter_trending: 'ట్రెండింగ్',
        filter_near: 'మీకు దగ్గరలో',
        filter_fastest: 'అత్యంత వేగంగా',
        filter_top: 'టాప్ రేటెడ్'
      },
      cart: {
        title: 'మీ బాస్కెట్ అంతరిక్షంలో తేలుతోంది.',
        subtitle: 'రుచికరమైనదాన్ని కనుగొనండి',
        subtotal: 'సబ్టోటల్',
        fee: 'డెలివరీ & ఏఐ ప్రిసిషన్ ఫీజు',
        confirm: 'ప్రిసిషన్ డెలివరీని నిర్ధారించండి'
      }
    }
  },
  te: {
    translation: {
      nav: {
        discover: 'అన్వేషించండి',
        reservations: 'రిజర్వేషన్లు',
        events: 'ఈవెంట్స్',
        social: 'సోషల్',
        access_hub: 'యాక్సెస్ హబ్'
      },
      hero: {
        title: 'మీ రుచిని సింక్రొనైజ్ చేయండి.',
        subtitle: 'మిడ్-మెట్రోపాలిటన్ గ్రిడ్ కోసం ఉన్నత స్థాయి ఆతిథ్యం. AI-ఆప్టిమైజ్డ్ ఆవిష్కరణ, క్యూరేషన్ మరియు సబ్-క్వాంటం నెరవేర్పు.'
      },
      discover: {
        search_placeholder: 'రుచి, మానసిక స్థితి లేదా కోఆర్డినేట్ ద్వారా వెతకండి...',
        filter_ai: 'AI ఎంపికలు',
        filter_trending: 'ట్రెండింగ్',
        filter_near: 'మీకు దగ్గరలో',
        filter_fastest: 'అత్యంత వేగంగా',
        filter_top: 'టాప్ రేటెడ్'
      },
      cart: {
        title: 'మీ బాస్కెట్ అంతరిక్షంలో తేలుతోంది.',
        subtitle: 'రుచికరమైనదాన్ని కనుగొనండి',
        subtotal: 'సబ్టోటల్',
        fee: 'డెలివరీ & AI ప్రిసిషన్ ఫీజు',
        confirm: 'ప్రిసిషన్ డెలివరీని నిర్ధారించండి'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
