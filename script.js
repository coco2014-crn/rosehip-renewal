const header=document.querySelector('[data-header]');const menuButton=document.querySelector('.menu-button');const mobileMenu=document.querySelector('.mobile-menu');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>40),{passive:true});
menuButton.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');menuButton.setAttribute('aria-expanded',open);mobileMenu.setAttribute('aria-hidden',!open)});
mobileMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{mobileMenu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');mobileMenu.setAttribute('aria-hidden','true')}));
const footerObserverTarget=document.querySelector('.footer');
const footer=document.querySelector('.footer');if(footer){footer.innerHTML=`<div class="footer-renewed"><div class="footer-group"><div class="footer-brand"><img class="footer-brand-logo" src="./rosehip-logo-favicon-assets/rosehip_brand/rosehip-logo.svg" alt="ROSE HIP"></div><span class="footer-heading">BRAND</span><span>Beauty for every day.</span><span>〒819-0022<br>福岡県福岡市西区福重5丁目4-10</span><span>TEL　092-895-2580</span><nav class="footer-social"><span class="footer-heading">SNS</span><a href="https://www.instagram.com/rose_hip_total_beauty/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.facebook.com/rosehip.vc/" target="_blank" rel="noopener noreferrer">Facebook</a><a href="https://x.com/rosehip_vc" target="_blank" rel="noopener noreferrer">X</a><a href="https://lin.ee/nPXN010" target="_blank" rel="noopener noreferrer">LINE</a></nav></div><nav class="footer-group"><span class="footer-heading">SALON / SERVICE</span><a href="./index.html">HOME</a><a href="./hair.html">HAIR</a><a href="./nail-eye.html">NAIL &amp; EYE</a><a href="./staff.html">STAFF</a><a href="./salon.html">SALON</a></nav><nav class="footer-group"><span class="footer-heading">RESERVATION</span><a href="./index.html#reservation">ROSE HIP WEB予約</a><a href="tel:0928952580">TEL　092-895-2580</a></nav><div class="footer-group footer-recruit"><span class="footer-heading">スタッフ募集</span><p>美容を、もっと楽しむ仲間を<br>待っています。</p><a href="./recruit.html">VIEW RECRUIT →</a></div></div><div class="footer-bottom"><span>© ROSE HIP</span><a href="#top">PAGE TOP ↑</a></div>`}if(!document.body.classList.contains('recruit-page')){const c=document.createElement('aside');c.className='recruit-float';c.innerHTML=`<a href="./recruit.html" aria-label="スタッフ募集 採用ページへ"><img class="recruit-float__image" src="./assets/images/recruit/start.jpg" alt=""><span class="recruit-float__body"><span class="recruit-float__eyebrow">RECRUIT</span><span class="recruit-float__title">スタッフ募集</span><span class="recruit-float__copy">美容を、もっと楽しむ仲間を待っています。</span><span class="recruit-float__link">VIEW RECRUIT →</span></span></a><button class="recruit-float__close" type="button" aria-label="スタッフ募集バナーを閉じる">×</button>`;document.body.append(c);c.querySelector('button').addEventListener('click',()=>c.remove())}
if(!document.body.classList.contains('recruit-page')){const floating=document.querySelector('.recruit-float');if(floating){const body=floating.querySelector('.recruit-float__body');const eyebrow=body.querySelector('.recruit-float__eyebrow');const title=body.querySelector('.recruit-float__title');const center=document.createElement('span');center.className='recruit-float-center';center.innerHTML='<span class="recruit-word">スタッフ</span><span class="recruit-word">募集</span><span class="recruit-arrow">→</span>';eyebrow.remove();title.remove();body.prepend(center);floating.querySelector('.recruit-float__close')?.remove();const ring=document.createElementNS('http://www.w3.org/2000/svg','svg');ring.classList.add('recruit-ring');ring.setAttribute('viewBox','0 0 104 104');ring.setAttribute('aria-hidden','true');ring.innerHTML='<defs><path id="recruit-ring-path" d="M 52,52 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"/></defs><text><textPath href="#recruit-ring-path" startOffset="0%">WE\'RE HIRING ・ ROSE HIP ・ WE\'RE HIRING ・</textPath></text>';body.append(ring)}if(footerObserverTarget&&floating){new IntersectionObserver(entries=>floating.classList.toggle('is-footer-visible',entries[0].isIntersecting),{threshold:.08}).observe(footerObserverTarget)}}
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));document.documentElement.classList.add('js-reveal-ready');
const slot=(title,note)=>`<div class="photo-placeholder"><div class="photo-placeholder__copy"><span class="photo-placeholder__title">${title}</span><span class="photo-placeholder__note">${note}</span></div></div>`;const gallery=(className,title,note,count)=>`<div class="generated-gallery ${className}" aria-label="${note}">${Array.from({length:count},()=>slot(title,note)).join('')}</div>`;
const beautyPage=document.body.classList.contains('beauty-page');document.querySelectorAll('.visual-placeholder').forEach(el=>{const eye=el.classList.contains('eye-visual');const label=eye?'EYE':'NAIL';const note=eye?'目元仕上がり写真':'ネイル仕上がり写真';const numberedGallery=Array.from({length:3},(_,index)=>slot(`${label}<br>${eye?String(index+1).padStart(2,'0'):`PHOTO ${String(index+1).padStart(2,'0')}`}`,note)).join('');el.outerHTML=beautyPage?`<div class="generated-gallery ${eye?'eye-gallery':'nail-gallery'}" aria-label="${note}">${numberedGallery}</div>`:gallery(eye?'eye-gallery':'nail-gallery',eye?'EYE PHOTO':'NAIL PHOTO',eye?'目元デザイン':'ネイルデザイン',3)});
if(!window.matchMedia('(max-width:850px)').matches){const center=document.querySelector('.recruit-float-center');if(center&&!center.querySelector('.recruit-float__eyebrow')){const label=document.createElement('span');label.className='recruit-float__eyebrow';label.textContent='RECRUIT';center.prepend(label)}}

document.querySelectorAll('.nav-dropdown').forEach(dropdown=>{const toggle=dropdown.querySelector('.nav-dropdown-toggle');const menu=dropdown.querySelector('.nav-dropdown-menu');const close=()=>{toggle.setAttribute('aria-expanded','false');dropdown.classList.remove('open')};toggle.addEventListener('click',event=>{event.stopPropagation();const open=toggle.getAttribute('aria-expanded')==='true';document.querySelectorAll('.nav-dropdown').forEach(other=>{other.querySelector('.nav-dropdown-toggle')?.setAttribute('aria-expanded','false');other.classList.remove('open')});if(!open){toggle.setAttribute('aria-expanded','true');dropdown.classList.add('open')}});toggle.addEventListener('keydown',event=>{if(event.key==='ArrowDown'||event.key==='Enter'||event.key===' '){event.preventDefault();toggle.click();menu.querySelector('a')?.focus()}if(event.key==='Escape')close()});menu.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();close();toggle.focus()}if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();const links=[...menu.querySelectorAll('a')];const next=links[(links.indexOf(document.activeElement)+(event.key==='ArrowDown'?1:links.length-1))%links.length];next.focus()}});document.addEventListener('click',event=>{if(!dropdown.contains(event.target))close()})});
if(footer){const serviceNav=footer.querySelectorAll('.footer-group')[1];if(serviceNav){serviceNav.querySelector('.footer-heading').textContent='サロン / サービス';const links=[...serviceNav.querySelectorAll('a')];const labels=['ホーム','ヘア','ネイル＆アイ','スタッフ','サロン'];links.forEach((link,index)=>{if(labels[index])link.textContent=labels[index]});const fee=document.createElement('span');fee.className='footer-nav-heading';fee.textContent='料金';const hair=links.find(link=>link.getAttribute('href')?.endsWith('hair.html'));const nail=links.find(link=>link.getAttribute('href')?.endsWith('nail-eye.html'));if(hair&&nail){fee.className='footer-heading footer-fee-heading';serviceNav.insertBefore(fee,hair);hair.classList.add('footer-fee-link');nail.classList.add('footer-fee-link')}}}
const heroVideos=[...document.querySelectorAll('.hero-video')];
if(heroVideos.length){
  const maxPlayAttempts=3;
  const playbackState=new WeakMap();
  const isMobile=()=>window.matchMedia('(max-width:700px)').matches;
  const isActive=video=>video.classList.contains('hero-video-sp')===isMobile();
  const stateFor=video=>{let state=playbackState.get(video);if(!state){state={attempts:0,timer:0,pending:false};playbackState.set(video,state)}return state};
  const clearRetry=video=>{const state=stateFor(video);clearTimeout(state.timer);state.timer=0;state.pending=false};
  const playSafely=video=>{
    if(!isActive(video)||document.visibilityState==='hidden')return;
    const state=stateFor(video);if(video.dataset.heroFallback==='true'||state.pending||!video.paused||state.attempts>=maxPlayAttempts)return;
    state.pending=true;state.attempts+=1;
    const result=video.play();
    if(result?.then)result.then(()=>{state.pending=false}).catch(()=>{state.pending=false;if(state.attempts<maxPlayAttempts){state.timer=setTimeout(()=>{state.timer=0;playSafely(video)},1200)}});
  };
  const syncHeroVideos=()=>heroVideos.forEach(video=>{if(isActive(video)){stateFor(video).attempts=0;playSafely(video)}else{clearRetry(video);stateFor(video).attempts=0;video.pause()}});
  heroVideos.forEach(video=>{video.addEventListener('playing',()=>{const state=stateFor(video);state.attempts=0;state.pending=false;clearRetry(video)});['loadeddata','canplay','stalled','suspend','error','pause'].forEach(event=>video.addEventListener(event,()=>{if(event!=='pause'||isActive(video))playSafely(video)}));});
  document.addEventListener('visibilitychange',syncHeroVideos);
  window.matchMedia('(max-width:700px)').addEventListener('change',syncHeroVideos);
  syncHeroVideos();
}
const homeOpening=document.querySelector('[data-home-opening]');
if(homeOpening){
  const openingKey='roseHipHomeOpeningSeen';
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const preview=new URLSearchParams(window.location.search).get('openingPreview')==='1';
  let returning=false;
  try{returning=sessionStorage.getItem(openingKey)==='true'}catch(error){}
  if(preview)returning=false;
  const activeVideo=()=>document.querySelector(`.hero-video-${window.matchMedia('(max-width:700px)').matches?'sp':'pc'}`);
  const video=activeVideo();
  const startedAt=performance.now();
  const pcInitialExtension=video&&!video.classList.contains('hero-video-sp')&&!returning&&!reducedMotion?800:0;
  const minimumDuration=reducedMotion?0:(returning?400:3000+pcInitialExtension);
  const crossfadeDuration=1500;
  let frameReady=false;
  let finished=false;
  let timedOut=false;
  let finishTimer=0;
  let minimumTimer=0;
  let cleanupTimer=0;
  const domCleanupDelay=!returning&&!reducedMotion?1000:0;
  const finish=()=>{
    if(finished)return;
    finished=true;clearTimeout(finishTimer);clearTimeout(minimumTimer);clearTimeout(cleanupTimer);
    if(timedOut&&video){video.dataset.heroFallback='true';video.pause()}
    homeOpening.classList.add('is-leaving');
    homeOpening.setAttribute('aria-hidden','true');
    homeOpening.style.pointerEvents='none';
    if('inert' in homeOpening)homeOpening.inert=true;
    document.body.classList.add('home-opening-crossfade');
    cleanupTimer=window.setTimeout(()=>{
      document.body.classList.remove('home-opening-active','home-opening-crossfade');
      homeOpening.remove();
    },reducedMotion?0:crossfadeDuration+domCleanupDelay);
    if(!preview){try{sessionStorage.setItem(openingKey,'true')}catch(error){}}
  };
  const finishWhenReady=()=>{
    if(!frameReady||finished)return;
    const wait=Math.max(0,minimumDuration-(performance.now()-startedAt));
    minimumTimer=window.setTimeout(finish,wait);
  };
  const markFrameReady=()=>{frameReady=true;finishWhenReady()};
  const onPlaying=()=>{
    if(video?.requestVideoFrameCallback)video.requestVideoFrameCallback(()=>markFrameReady());
    else if(video&&video.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA)markFrameReady();
  };
  if(video){
    video.addEventListener('playing',onPlaying,{once:true});
    video.addEventListener('canplay',()=>{if(!video.requestVideoFrameCallback&&video.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA)markFrameReady()},{once:true});
    video.addEventListener('error',()=>{timedOut=true;finish()},{once:true});
    if(!video.paused&&!video.ended)onPlaying();
  }
  document.body.classList.add('home-opening-active');
  homeOpening.classList.add(returning?'is-short':'is-entering');
  homeOpening.setAttribute('aria-hidden','false');
  if(video&&!reducedMotion){
    const playResult=video.play();
    if(playResult?.catch)playResult.catch(()=>{timedOut=true;finish()});
  }else if(video&&reducedMotion){
    const playResult=video.play();
    if(playResult?.catch)playResult.catch(()=>{timedOut=true;finish()});
  }
  finishTimer=window.setTimeout(()=>{timedOut=true;finish()},4000);
  if(reducedMotion&&!video)finish();
}
document.querySelectorAll('.footer-social a').forEach(link=>{const label=link.textContent.trim();const icons={Instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',Facebook:'<path d="M14 21v-8h3l.5-3H14V8.2c0-1 .3-1.7 1.8-1.7H18V3.8c-.5-.1-1.4-.2-2.5-.2C13 3.6 11 5.1 11 8v2H8v3h3v8h3z"/>',X:'<path d="M4 4h4.2l4 5.3L16.8 4H20l-6.3 7.3L20 20h-4.2l-4.3-5.7L6.7 20H4l6.1-7.1L4 4zm3 2 8.9 12h1.1L8.1 6H7z"/>',LINE:'<path d="M20.5 11.2c0 4.1-3.8 7.4-8.5 7.4-1 0-2-.2-2.9-.5L5 20l.9-3.2c-1.5-1.3-2.4-3-2.4-4.9C3.5 8 7.3 4.7 12 4.7s8.5 2.4 8.5 6.5z"/><path class="footer-social-line" d="M8 11v2m3-2v2m3-2v2m3-2v2"/>'};link.setAttribute('aria-label',`${label}（ROSE HIP公式）`);link.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true">${icons[label]}</svg>`});
document.querySelectorAll('[data-contact-form]').forEach(form=>{const endpoint=form.dataset.endpoint?.trim();const status=form.querySelector('.form-status');const button=form.querySelector('button[type="submit"]');if(!endpoint){form.addEventListener('submit',event=>{event.preventDefault();if(status)status.textContent='送信機能は本番環境接続後に有効になります。';});return}form.addEventListener('submit',async event=>{event.preventDefault();if(!form.reportValidity()||button.disabled)return;button.disabled=true;if(status)status.textContent='送信中…';try{const tokenResponse=await fetch(endpoint,{headers:{Accept:'application/json'},credentials:'same-origin'});const tokenResult=await tokenResponse.json().catch(()=>({}));if(!tokenResponse.ok||typeof tokenResult.csrfToken!=='string')throw new Error('csrf unavailable');const data=new FormData(form);data.append('csrf_token',tokenResult.csrfToken);const response=await fetch(endpoint,{method:'POST',body:data,headers:{Accept:'application/json'},credentials:'same-origin'});const result=await response.json().catch(()=>({}));if(!response.ok||result.success!==true)throw new Error('request failed');form.reset();if(status)status.textContent=result.message||'送信が完了しました';}catch(error){if(status)status.textContent='送信できませんでした。時間をおいて再度お試しください。';}finally{button.disabled=false}})});
const heroCopyMessages=[...document.querySelectorAll('.hero-copy__message')];
const heroCopyVideos=[...document.querySelectorAll('.hero-video')];
if(heroCopyMessages.length===3&&heroCopyVideos.length){
  const copyForTime=(video)=>{
    const duration=video.duration;
    if(!Number.isFinite(duration)||duration<=0)return 0;
    if(!video.classList.contains('hero-video-sp')){if(video.currentTime<5)return 0;if(video.currentTime<15)return 1;return 2}
    const segment=duration/3;
    return video.currentTime<segment?0:video.currentTime<segment*2?1:2;
  };
  const setHeroCopy=(index)=>heroCopyMessages.forEach((message,messageIndex)=>message.classList.toggle('is-active',messageIndex===index));
  heroCopyVideos.forEach(video=>{
    const sync=()=>setHeroCopy(video.currentTime<0.08?0:copyForTime(video));
    ['loadedmetadata','timeupdate','seeking','seeked','playing'].forEach(event=>video.addEventListener(event,sync));
    video.addEventListener('ended',()=>setHeroCopy(0));
    sync();
  });
}
