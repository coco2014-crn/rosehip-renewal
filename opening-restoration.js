(() => {
  const opening = document.querySelector('[data-home-opening]');
  if (!opening) return;
  const key = 'roseHipHomeOpeningSeen';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const preview = new URLSearchParams(window.location.search).get('openingPreview') === '1';
  let returning = false;
  try { returning = sessionStorage.getItem(key) === 'true'; } catch (error) {}
  if (preview) returning = false;
  const video = document.querySelector(`.hero-video-${window.matchMedia('(max-width:700px)').matches ? 'sp' : 'pc'}`);
  const started = performance.now();
  const minimum = reduced ? 0 : (returning ? 400 : 3800);
  let ready = false;
  let finished = false;
  let timeout = 0;
  const finish = () => {
    if (finished) return;
    finished = true;
    clearTimeout(timeout);
    opening.classList.add('is-leaving');
    opening.setAttribute('aria-hidden', 'true');
    opening.style.pointerEvents = 'none';
    document.body.classList.add('home-opening-crossfade');
    window.setTimeout(() => {
      document.body.classList.remove('home-opening-active', 'home-opening-crossfade');
      opening.remove();
    }, reduced ? 0 : 2500);
    if (!preview) { try { sessionStorage.setItem(key, 'true'); } catch (error) {} }
  };
  const finishWhenReady = () => {
    if (!ready || finished) return;
    window.setTimeout(finish, Math.max(0, minimum - (performance.now() - started)));
  };
  const markReady = () => { ready = true; finishWhenReady(); };
  if (video) {
    video.addEventListener('playing', () => {
      if (video.requestVideoFrameCallback) video.requestVideoFrameCallback(markReady);
      else markReady();
    }, { once: true });
    video.addEventListener('error', finish, { once: true });
    if (!video.paused && !video.ended) markReady();
    const result = video.play();
    if (result?.catch) result.catch(finish);
  } else {
    markReady();
  }
  document.body.classList.add('home-opening-active');
  opening.classList.add(returning ? 'is-short' : 'is-entering');
  opening.setAttribute('aria-hidden', 'false');
  timeout = window.setTimeout(finish, 4000);
})();
