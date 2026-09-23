// 非モーダルの開閉ナビ。JSなしでは通常リンクを表示したままにする。
export function initNavigation() {
  const header = document.querySelector('[data-site-header]');
  const toggle = header?.querySelector('[data-menu-toggle]');
  const navigation = header?.querySelector('[data-site-navigation]');
  if (!header || !toggle || !navigation || header.dataset.initialized) return;

  const desktop = window.matchMedia('(min-width: 64rem)');
  const label = toggle.querySelector('[data-menu-label]');
  let isOpen = false;

  function setOpen(open, restoreFocus = false) {
    isOpen = open && !desktop.matches;
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    if (label) label.textContent = isOpen ? 'CLOSE' : 'MENU';
    navigation.hidden = !desktop.matches && !isOpen;
    document.body.classList.toggle('navigation-is-open', isOpen);
    if (restoreFocus) toggle.focus();
  }

  function syncViewport() {
    const active = document.activeElement;
    const wasInside = navigation.contains(active);
    const wasToggle = active === toggle;
    toggle.hidden = desktop.matches;
    setOpen(false, !desktop.matches && wasInside);
    if (desktop.matches && wasToggle) navigation.querySelector('a')?.focus();
  }

  toggle.addEventListener('click', () => setOpen(!isOpen));
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false, !desktop.matches);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      setOpen(false, true);
    }
  });
  // フォーカスを閉じ込めず、ナビの外へ移動した際には閉じる。
  document.addEventListener('focusin', (event) => {
    if (isOpen && !header.contains(event.target)) setOpen(false);
  });
  document.addEventListener('click', (event) => {
    if (isOpen && !header.contains(event.target)) setOpen(false);
  });
  desktop.addEventListener('change', syncViewport);
  syncViewport();
  document.documentElement.classList.add('navigation-enhanced');
  header.dataset.initialized = 'true';
}
