let words = [...WORD_DATA];
let progress = JSON.parse(localStorage.getItem('linguaflow_level1_progress') || '{}');
let streak = Number(localStorage.getItem('linguaflow_level1_streak') || 0);
let lastPracticeDate = localStorage.getItem('linguaflow_level1_last_date') || '';

let quizWords = [];
let currentIndex = 0;
let currentWord = null;
let currentMode = null;
let sessionScore = 0;
let sessionMissed = [];
let currentPractice = { type: 'level1', chapter: 1, chapters: [1] };
let lastReviewPool = [];

const quotes = [
  "You don't need to learn everything today. Just don't stop.",
  "Small progress is still progress.",
  "Consistency beats motivation.",
  "One word today is one less word tomorrow.",
  "Practice smarter, not harder.",
  "Your future self will thank you.",
  "Keep showing up.",
  "You are building something every day."
];

function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  if(id==='homePage') document.getElementById('navHome').classList.add('active');
  if(id==='quizPage') document.getElementById('navPractice').classList.add('active');
}

function focusChapters(){
  showPage('homePage');
  setTimeout(()=>document.querySelector('.section-heading-row')?.scrollIntoView({behavior:'smooth',block:'start'}),50);
}

function updateHome(){
  document.getElementById('totalWords').textContent=words.length;
  let mastered=0, weak=0;
  words.forEach(w=>{
    const x=progress[w.id];
    if(!x) return;
    if(x.correct>=3) mastered++;
    if(x.wrong>x.correct) weak++;
  });
  document.getElementById('masteredWords').textContent=mastered;
  document.getElementById('weakWords').textContent=weak;
  document.getElementById('streak').textContent=streak;
  document.getElementById('progressBar').style.width=Math.min(100,(mastered/Math.max(words.length,1))*100)+'%';
  document.getElementById('quoteText').textContent=quotes[new Date().getDate()%quotes.length];
}

function escapeHTML(text){
  const e=document.createElement('div');
  e.textContent=text;
  return e.innerHTML;
}

function renderChapters(){
  const grid=document.getElementById('chapterGrid');
  grid.innerHTML='';
  const ch=CHAPTER_DATA[0];
  const b=document.createElement('button');
  b.type='button';
  b.className='chapter-card';
  b.onclick=()=>startLevel1Practice();
  b.innerHTML=`<span class="chapter-number">LEVEL 1</span><strong>Chinese Meaning</strong><span class="chapter-meta">${ch.words.length} words · ${ch.words.length} questions</span>`;
  grid.appendChild(b);
  document.getElementById('wordCountBadge').textContent=`${words.length} words`;
}

function startLevel1Practice(){
  currentPractice={type:'level1',chapter:1,chapters:[1]};
  beginQuiz(words, false);
}

function startPractice(){
  startLevel1Practice();
}

function repeatLastPractice(){
  if(lastReviewPool.length) reviewMissedWords();
  else startLevel1Practice();
}

function beginQuiz(pool, isReview=false){
  quizWords=shuffle(pool);
  currentIndex=0;
  sessionScore=0;
  sessionMissed=[];
  currentPractice.type=isReview?'review':'level1';
  showPage('quizPage');
  loadQuestion();
}

function shuffle(a){
  const copy=[...a];
  for(let i=copy.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [copy[i],copy[j]]=[copy[j],copy[i]];
  }
  return copy;
}

function getQuizTitle(){
  return currentPractice.type==='review' ? `Review · ${quizWords.length} Words` : 'Level 1';
}

function loadQuestion(){
  if(currentIndex>=quizWords.length){
    finishPractice();
    return;
  }

  currentWord=quizWords[currentIndex];
  currentMode=['meaningToChinese','audioToMeaning'][Math.floor(Math.random()*2)];

  const q=document.getElementById('question');
  const label=document.getElementById('modeLabel');
  const play=document.getElementById('questionPlayButton');
  const ans=document.getElementById('answer');
  const rating=document.getElementById('rating');
  const show=document.getElementById('showAnswerBtn');

  q.className='question';
  ans.classList.remove('show');
  rating.classList.remove('show');
  show.style.display='inline-block';
  play.classList.add('hidden');

  if(currentMode==='meaningToChinese'){
    label.textContent='Say it in Chinese';
    q.textContent=currentWord.meaning;
    q.classList.add('myanmar');
  }else{
    label.textContent='Listen & Remember';
    q.textContent='🔊';
    play.classList.remove('hidden');
    setTimeout(playCurrentAudio,300);
  }

  document.getElementById('questionNumber').textContent=currentIndex+1;
  document.getElementById('questionTotal').textContent=quizWords.length;
  document.getElementById('quizMode').textContent=`${getQuizTitle()} · Level 1`;
  document.getElementById('quizProgress').style.width=(currentIndex/quizWords.length*100)+'%';
}

function showAnswer(){
  document.getElementById('answerChinese').textContent=currentWord.chinese;
  document.getElementById('answerPinyin').textContent=currentWord.pinyin;
  document.getElementById('answerMeaning').textContent=currentWord.meaning;
  document.getElementById('answer').classList.add('show');
  document.getElementById('rating').classList.add('show');
  document.getElementById('showAnswerBtn').style.display='none';
  document.getElementById('questionPlayButton').classList.remove('hidden');
}

function rateAnswer(remembered){
  const key=currentWord.id;
  if(!progress[key]) progress[key]={correct:0,wrong:0};
  if(remembered){
    progress[key].correct++;
    sessionScore++;
  }else{
    progress[key].wrong++;
    addSessionMissed(currentWord);
  }
  localStorage.setItem('linguaflow_level1_progress',JSON.stringify(progress));
  currentIndex++;
  loadQuestion();
}

function addSessionMissed(word){
  if(!sessionMissed.some(item=>item.id===word.id)) sessionMissed.push(word);
}

function playCurrentAudio(){
  if(!currentWord) return;
  const text=currentWord.chinese;
  const url='https://translate.google.com/translate_tts?ie=UTF-8&q='+encodeURIComponent(text)+'&tl=zh-CN&client=tw-ob';
  const audio=new Audio(url);
  audio.play().catch(()=>browserSpeak(text));
}

function browserSpeak(text){
  if(!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang='zh-CN';
  u.rate=.78;
  u.pitch=1;
  speechSynthesis.speak(u);
}

function finishPractice(){
  document.getElementById('finalScore').textContent=sessionScore;
  document.getElementById('finalTotal').textContent=quizWords.length;

  let msg;
  if(sessionScore===quizWords.length) msg='ပုလဲလေးကတော်လိုက်တာ ဘာမုန့်စားမလဲ';
  else if(sessionScore>=Math.ceil(quizWords.length*.5)) msg='မဆိုးပါဖူး မေ့နေတာတွေပြန်ကျက်အုန်း';
  else msg='ပြန်ကျက်အုန်း';
  document.getElementById('finalMessage').textContent=msg;

  lastReviewPool=[...sessionMissed];
  renderSessionReview();
  updateStreak();
  updateHome();
  showPage('completePage');
}

function renderSessionReview(){
  const section=document.getElementById('reviewSection');
  const list=document.getElementById('reviewList');
  const count=document.getElementById('reviewCount');
  const button=document.getElementById('reviewMissedBtn');
  if(!section||!list||!count||!button) return;

  list.innerHTML='';
  count.textContent=sessionMissed.length;

  if(!sessionMissed.length){
    section.classList.add('empty');
    list.innerHTML='<div class="no-review">🔥 Perfect! You remembered every vocabulary.</div>';
    button.style.display='none';
    return;
  }

  section.classList.remove('empty');
  button.style.display='block';

  sessionMissed.forEach(word=>{
    const item=document.createElement('div');
    item.className='review-word';
    item.innerHTML=`
      <div>
        <strong>${escapeHTML(word.chinese)}</strong>
        <span>${escapeHTML(word.pinyin)}</span>
      </div>
      <p>${escapeHTML(word.meaning)}</p>
      <button type="button" onclick="speakText('${encodeURIComponent(word.chinese)}')">🔊</button>
    `;
    list.appendChild(item);
  });
}

function speakText(encodedText){
  browserSpeak(decodeURIComponent(encodedText));
}

function reviewMissedWords(){
  if(!lastReviewPool.length) return;
  const pool=[...lastReviewPool];
  currentPractice={type:'review',chapter:1,chapters:[1]};
  beginReviewQuiz(pool);
}

function beginReviewQuiz(pool){
  quizWords=shuffle(pool);
  currentIndex=0;
  sessionScore=0;
  sessionMissed=[];
  currentPractice.type='review';
  showPage('quizPage');
  loadQuestion();
}

function updateStreak(){
  const now=new Date();
  const today=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
  if(lastPracticeDate===today) return;
  if(lastPracticeDate){
    const previous=new Date(lastPracticeDate+'T00:00:00');
    const current=new Date(today+'T00:00:00');
    const d=Math.round((current-previous)/(1000*60*60*24));
    streak=d===1?streak+1:1;
  }else streak=1;
  lastPracticeDate=today;
  localStorage.setItem('linguaflow_level1_streak',streak);
  localStorage.setItem('linguaflow_level1_last_date',lastPracticeDate);
}

renderChapters();
updateHome();
