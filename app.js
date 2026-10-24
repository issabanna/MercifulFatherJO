const languageButton = document.querySelector('#language');
let language = 'en';
try { language = localStorage.getItem('mf-language') === 'ar' ? 'ar' : 'en'; } catch {}
function setLanguage(next) {
  language = next;
  document.documentElement.lang = next;
  document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-en][data-ar]').forEach(element => {
    element.innerHTML = element.dataset[next];
  });
  languageButton.textContent = next === 'en' ? 'العربية' : 'English';
  languageButton.setAttribute('aria-label', next === 'en' ? 'Switch to Arabic' : 'Switch to English');
  document.title = next === 'en' ? 'Merciful Father — A little kindness. A warmer world.' : 'Merciful Father — القليل من المحبة، عالم أكثر دفئًا';
  try { localStorage.setItem('mf-language', next); } catch {}
}
languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'ar' : 'en'));
setLanguage(language);
