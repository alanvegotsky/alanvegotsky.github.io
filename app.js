(function () {
  var AFFIRMATIONS = [
    'You are allowed to take up space.',
    'Nothing needs to be solved this minute.',
    'You have made it through every hard day so far.',
    'Rest is not a reward. It is part of the work.',
    'You can begin again as many times as it takes.',
    'Slow progress is still progress.',
    'You do not have to earn your own kindness.',
    'Someone is glad you exist, even if they forget to say it.',
    'The next small step is enough.',
    'You are more than the worst thing that happened to you.',
    'It is okay to outgrow old versions of yourself.',
    'Not everything needs an opinion from you today.',
    'You have been brave in ways no one saw.',
    'Done is allowed to be enough.',
    'Your pace is yours. It does not need defending.',
    'Even now, something in you is healing.',
    'You are allowed to change your mind.',
    'Worry is not the same as preparation.',
    'You bring something to rooms that no one else does.',
    'It is fine to be a work in progress and a whole person at once.',
    'Today does not have to be remarkable to be worthwhile.',
    'Kindness to yourself is not selfish. It is maintenance.',
    'You are not behind. There is no schedule you owe anyone.',
    'Some good things are already on their way to you.',
    'You can hold this moment without holding the whole future.',
    'Being tired is not a character flaw.',
    'You are worth the same care you give other people.',
    'Quiet days count too.',
    'You do not need permission to enjoy small things.',
    'The version of you that is trying is doing well.',
    'It is okay to let this be easy.',
    'You have good instincts. You can trust them a little more.',
    'One deep breath is a perfectly good reset.',
    'Your life does not need to look like anyone else\u2019s.',
    'You are allowed to be proud of ordinary things.',
    'The world is softer than your worries say it is.',
    'You have already done hard things. You can do the next one.',
    'Gratitude and wanting more can live side by side.',
    'You are not a problem to be fixed.',
    'Something you did once is still helping someone.',
    'It is a good day to be gentle with yourself.',
    'You belong in the places you have worked to reach.',
    'Letting go is also a way of moving forward.',
    'You do not have to carry everything today.',
    'Your best is allowed to look different every day.',
    'There is time. More than it feels like.',
    'Right now, in this breath, you are okay.',
    'I am my own best friend.',
    'I am loved and love myself.',
    'I am the master of my destiny, and my mission is my guide.',
    'I imagine myself being the person I want to be.',
    'I am living in awe of life.',
    'I wake up and that is good enough for me.',
    'I am thankful to be me.',
    'I believe I have unlimited potential.',
    'I believe in me.',
    'I will never, never, never, never give up in what I believe.',
    'The answers lie within me and are found all around me.',
    'I live in a world of abundance.',
    'I love living and live loving.',
    'I make my visions into dreams, and my dreams into reality.',
    'My past builds me a better today.',
    'Crisis makes good outcomes possible.',
  ];
  var INTERVAL_MS = 8000;

  var textEl = document.getElementById('affText');
  var ringEl = document.getElementById('ringFill');
  var orb = document.getElementById('orb');
  var btnPrev = document.getElementById('btnPrev');
  var btnNext = document.getElementById('btnNext');
  var btnPlay = document.getElementById('btnPlay');
  var iconPlay = document.getElementById('iconPlay');
  var iconPause = document.getElementById('iconPause');

  var index = Math.floor(Math.random() * AFFIRMATIONS.length);
  var playing = true;
  var timer = null;

  function render() {
    textEl.textContent = AFFIRMATIONS[index];
    // restart entrance animation
    textEl.style.animation = 'none';
    void textEl.offsetWidth;
    textEl.style.animation = '';
    // restart ring
    ringEl.classList.remove('running');
    void ringEl.getBoundingClientRect();
    if (playing) ringEl.classList.add('running');
  }

  function startTimer() {
    stopTimer();
    timer = window.setInterval(function () {
      index = (index + 1) % AFFIRMATIONS.length;
      render();
    }, INTERVAL_MS);
  }
  function stopTimer() {
    if (timer !== null) { window.clearInterval(timer); timer = null; }
  }

  function next() { index = (index + 1) % AFFIRMATIONS.length; render(); }
  function prev() { index = (index - 1 + AFFIRMATIONS.length) % AFFIRMATIONS.length; render(); }

  orb.addEventListener('click', function () { next(); });
  orb.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); next(); }
  });
  btnNext.addEventListener('click', function (e) { e.stopPropagation(); next(); });
  btnPrev.addEventListener('click', function (e) { e.stopPropagation(); prev(); });
  btnPlay.addEventListener('click', function (e) {
    e.stopPropagation();
    playing = !playing;
    iconPlay.style.display = playing ? 'none' : '';
    iconPause.style.display = playing ? '' : 'none';
    btnPlay.setAttribute('aria-label', playing ? 'Pause the cycle' : 'Resume the cycle');
    if (playing) { startTimer(); render(); }
    else { stopTimer(); ringEl.classList.remove('running'); }
  });

  render();
  startTimer();
})();

/* Audiobook part picker */
(function () {
  var PARTS = [
    { id: 'C8ZDv8vftiw', label: 'Part 1' },
    { id: 'KGq77dqSYgo', label: 'Part 2' },
    { id: '7ks--C7Ehbk', label: 'Part 3' },
    { id: 'fvVHe4TIKTo', label: 'Part 4' },
    { id: '6U7EuKn1Go0', label: 'Part 5' },
    { id: 'MKmWjiAefs4', label: 'Part 6' },
    { id: 'KFQ02L3u5-Y', label: 'Part 7' },
    { id: 'bCmPiE8jHZ8', label: 'Part 8' },
    { id: 'Bmfo9JJqmKM', label: 'Part 9' }
  ];
  var picker = document.getElementById('part-picker');
  var frame = document.getElementById('audiobook-frame');
  if (!picker || !frame) return;
  PARTS.forEach(function (part, i) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = part.label;
    if (i === 0) btn.classList.add('active');
    btn.addEventListener('click', function () {
      frame.src = 'https://www.youtube-nocookie.com/embed/' + part.id + '?autoplay=1';
      picker.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
    picker.appendChild(btn);
  });
})();
