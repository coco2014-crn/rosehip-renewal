document.addEventListener('DOMContentLoaded',()=>{
  const stage=document.querySelector('.member-stage');
  if(!stage)return;
  const members=[
    ['前田 隆憲','代表兼スタイリスト','カッコいいショート・ロング／ふんわり可愛いボブ／レイヤースタイル','maeda.jpg'],
    ['野中 一樹','店長兼スタイリスト','ショートボブ／白髪ぼかしハイライト','nonaka.jpg'],
    ['井上 千絵','スタイリスト・アシスタント','似合わせカラー診断／カウンセリング','inoue.jpg'],
    ['安森 日向','アシスタント','ヘッドスパ','yasumori.jpg'],
    ['上戸 三緒','スタイリスト','フェミニンボブ／顔回りレイヤー／似合わせカラー','kamito.jpg'],
    ['溝畠 紀子','ネイリスト','肌になじむカラー／美しいフォルム／ハンド・フットケア','mizohata.jpg'],
    ['中満 かえで','ネイリスト','手描きアート／3Dアート','nakamitu.jpg'],
    ['土谷 裕子','アイリスト','ナチュラル／目元に合わせたデザイン／可愛いデザイン','tuchiya.jpg']
  ];
  stage.innerHTML=members.map(([name,role,specialty],i)=>{
    const number=String(i+1).padStart(2,'0');
    const image=members[i][3];
    return `<article class="staff-member-card"><div class="staff-photo-placeholder"><img src="./assets/images/staff/${image}" alt="${name}" /></div><div class="staff-member-info"><p class="staff-member-number">${number}</p><h3>${name}</h3><p class="staff-member-role">${role}</p><p class="staff-member-specialty">得意：${specialty}</p></div></article>`;
  }).join('');
  const gallery=document.querySelector('.work-gallery');
  if(gallery){
    const workImages=[
      ['start.jpg','ROSE HIPでの施術風景'],
      ['syuurei.jpg','ROSE HIPのスタッフ']
    ];
    gallery.innerHTML=workImages.map(([image,alt],index)=>`<figure class="${index===0?'work-large':'work-small'} staff-photo-placeholder"><img src="./assets/images/recruit/${image}" alt="${alt}" /></figure>`).join('');
  }
});
