import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Cookies from 'js-cookie';

const useGoogleTranslateSync = () => {
  const { i18n } = useTranslation();
  const lastDetectedLang = useRef<string>('');

  useEffect(() => {
    const detectGoogleTranslateLanguage = () => {
      try {
        // Check document language attribute
        const docLang = document.documentElement.lang || document.querySelector('html')?.getAttribute('lang');
        if (docLang && docLang !== lastDetectedLang.current) {
          lastDetectedLang.current = docLang;
          updateI18nLanguage(docLang);
        }

        // Check for Google Translate elements
        const translatedElements = document.querySelectorAll('.goog-te-gadget, .goog-te-banner-frame');
        if (translatedElements.length > 0) {
          const bodyLang = document.body.getAttribute('lang') || document.documentElement.lang;
          if (bodyLang && bodyLang !== lastDetectedLang.current) {
            lastDetectedLang.current = bodyLang;
            updateI18nLanguage(bodyLang);
          }
        }

      } catch (error) {
        console.log('Error detecting Google Translate language:', error);
      }
    };

    const updateI18nLanguage = (browserLang: string) => {
      // Map browser language codes to your i18n language codes
      const languageMap: Record<string, string> = {
        'ar': 'ar',
        'en': 'en',
        'en-US': 'en',
        'en-GB': 'en',
        'ar-SA': 'ar',
        'ar-AE': 'ar',
        'ur': 'ar',
        'hi': 'ar',
      };

      const targetLanguage = languageMap[browserLang] || languageMap[browserLang.split('-')[0]] || 'ar';
      
      if (i18n.language !== targetLanguage) {
        console.log(`🔄 Google Translate detected language: ${browserLang}, updating i18n to: ${targetLanguage}`);
        
        // Update i18n language
        i18n.changeLanguage(targetLanguage);
        
        // Update HTML attributes
        document.documentElement.lang = targetLanguage;
        document.documentElement.dir = targetLanguage === 'ar' ? 'rtl' : 'ltr';
        
        // Update cookie to sync with LanguageContext
        Cookies.set('selectedLang', targetLanguage);
        
        // Dispatch custom event to notify LanguageContext
        window.dispatchEvent(new CustomEvent('languageChanged', { 
          detail: { language: targetLanguage } 
        }));
      }
    };

    // Initial check
    detectGoogleTranslateLanguage();

    // Set up observer to watch for language changes
    const observer = new MutationObserver((mutations) => {
      let shouldCheck = false;
      
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' && 
          (mutation.attributeName === 'lang' || mutation.attributeName === 'class')
        ) {
          shouldCheck = true;
        }
        
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes);
          const hasGoogleTranslate = addedNodes.some(node => 
            node.nodeType === Node.ELEMENT_NODE && 
            (node as Element).classList?.contains('goog-te-banner-frame')
          );
          if (hasGoogleTranslate) {
            shouldCheck = true;
          }
        }
      });

      if (shouldCheck) {
        setTimeout(detectGoogleTranslateLanguage, 500);
      }
    });

    // Observe document changes
    observer.observe(document.documentElement, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['lang', 'class']
    });

    // Listen for Google Translate events
    const handleGoogleTranslateReady = () => {
      setTimeout(detectGoogleTranslateLanguage, 1000);
    };

    window.addEventListener('googleTranslateElementReady', handleGoogleTranslateReady);
    
    // Periodic check as fallback
    const interval = setInterval(detectGoogleTranslateLanguage, 3000);

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('googleTranslateElementReady', handleGoogleTranslateReady);
      clearInterval(interval);
    };
  }, [i18n]);

  return null;
};

export default useGoogleTranslateSync;