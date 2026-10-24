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
  for (const [attribute, prefix] of [['alt', 'alt'], ['aria-label', 'label']]) {
    document.querySelectorAll(`[data-${prefix}-en][data-${prefix}-ar]`).forEach(element => {
      element.setAttribute(attribute, element.getAttribute(`data-${prefix}-${next}`));
    });
  }
  if (languageButton) {
    languageButton.textContent = next === 'en' ? 'العربية' : 'English';
    languageButton.lang = next === 'en' ? 'ar' : 'en';
    languageButton.setAttribute('aria-label', next === 'en' ? 'Switch to Arabic' : 'Switch to English');
  }
  const soon = document.body.dataset.page === 'soon';
  document.title = 'Merciful Father — ' + (soon
    ? (next === 'en' ? 'Coming soon' : 'قريبًا')
    : (next === 'en' ? 'A little kindness. A warmer world.' : 'القليل من المحبة، عالم أكثر دفئًا'));
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = soon
    ? (next === 'en' ? 'Merciful Father — our new website is coming soon.' : 'Merciful Father — موقعنا الجديد يأتي قريبًا.')
    : (next === 'en' ? 'Discover Merciful Father’s family support appeals and Christmas outreach.' : 'تعرّف إلى حملات Merciful Father لدعم العائلات ومبادرات الميلاد.');
  try { localStorage.setItem('mf-language', next); } catch {}
}
languageButton?.addEventListener('click', () => setLanguage(language === 'en' ? 'ar' : 'en'));
setLanguage(language);
