/* ======================================================================
   ORBE PRIME
   Premium scroll-scrub landing page — pure JavaScript / zero dependencies.

   QUICK CONFIG:
   1. Edit CONTACT.whatsappNumber (DDD + phone, including country code).
   2. Edit CONTACT.generalMessage.
   3. Edit PLANS if the commercial book is updated.
   ====================================================================== */
'use strict';

document.documentElement.classList.add('js-motion');

const CONTACT = {
  // WhatsApp commercial listed on the final page of the official book.
  whatsappNumber: '5521967456500',
  generalMessage: 'Olá! Quero conhecer o Residencial Orbe Prime e consultar as unidades disponíveis.'
};

const PLANS = {
  apartamento: [
    { id: '101 / 201', file: '101-201', area: '126,98', label: 'APARTAMENTO · FINAL 01', description: 'Três suítes, ambientes sociais integrados e varanda generosa.' },
    { id: '102 / 202', file: '102-202', area: '126,75', label: 'APARTAMENTO · FINAL 02', description: 'Três suítes e uma configuração que valoriza a circulação e o convívio.' },
    { id: '103 / 203', file: '103-203', area: '110,28', label: 'APARTAMENTO · FINAL 03', description: 'Uma distribuição inteligente com três suítes e varanda conectada ao estar.' },
    { id: '104 / 204', file: '104-204', area: '111,91', label: 'APARTAMENTO · FINAL 04', description: 'Uma planta com três suítes e espaços de convivência bem distribuídos.' }
  ],
  cobertura: [
    { id: '301', file: '301', area: '211,27', label: 'COBERTURA · UNIDADE 301', description: 'Ambientes internos e terraço superior para ampliar as possibilidades de uso.' },
    { id: '302', file: '302', area: '210,81', label: 'COBERTURA · UNIDADE 302', description: 'Cobertura com terraço privativo superior e espaço para criar novos momentos.' },
    { id: '303', file: '303', area: '193,19', label: 'COBERTURA · UNIDADE 303', description: 'Layout com três suítes e terraço superior, conforme a planta apresentada.' },
    { id: '304', file: '304', area: '196,45', label: 'COBERTURA · UNIDADE 304', description: 'A combinação de ambientes integrados e área externa na cobertura.' }
  ]
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const makeWhatsAppLink = (message) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;

// --------------------------------------------------------
// Contact links: all buttons go to the official WhatsApp.
// --------------------------------------------------------
$$('[data-whatsapp]').forEach((a) => {
  a.href = makeWhatsAppLink(CONTACT.generalMessage);
  a.setAttribute('target', '_blank');
  a.setAttribute('rel', 'noopener noreferrer');
});
$('#year').textContent = String(new Date().getFullYear());

// --------------------------------------------------------
// Navigation: responsive menu, keyboard-friendly anchors.
// --------------------------------------------------------
const header = $('#siteHeader');
const menuToggle = $('#menuToggle');
const headerNav = $('#headerNav');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  headerNav.classList.remove('is-open');
}
menuToggle.addEventListener('click', () => {
  const next = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(next));
  menuToggle.setAttribute('aria-label', next ? 'Fechar menu' : 'Abrir menu');
  headerNav.classList.toggle('is-open', next);
});
$$('a[href^="#"]', headerNav).forEach((a) => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// --------------------------------------------------------
// AIDA / cinematic: Map the pinned section's scroll ratio
// directly onto the timelapse's complete video duration.
// Motion blur is controlled in CSS by .is-active.
// --------------------------------------------------------
const cinematic = $('#cinematic');
const constructionVideo = $('#constructionVideo');
const chapters = $$('.story__chapter');
const chapterButtons = $$('[data-go-chapter]');
const chapterNumber = $('#chapterNumber');
const chapterPercent = $('#chapterPercent');
const filmTimeline = $('#filmTimeline');
const pageProgress = $('#pageProgress');
const scrollCue = $('#scrollCue');
const CHAPTER_CENTERS = [0.10, 0.36, 0.62, 0.88];
const CHAPTER_THRESHOLDS = [0.25, 0.50, 0.75];
let activeChapter = 0;
let wantedProgress = 0;
let smoothedProgress = 0;
let ticking = false;
let canScrub = false;

let isSeeking = false;

// Robust even when preload finishes before the deferred JS executes.
function initializeTimelapse() {
  if (!Number.isFinite(constructionVideo.duration) || constructionVideo.duration <= 0) return;
  canScrub = true;
  constructionVideo.pause();
  seekVideo(wantedProgress, true);
}
constructionVideo.addEventListener('loadedmetadata', initializeTimelapse);
if (constructionVideo.readyState >= HTMLMediaElement.HAVE_METADATA) initializeTimelapse();
constructionVideo.addEventListener('seeked', () => {
  isSeeking = false;
});
constructionVideo.addEventListener('error', () => {
  cinematic.classList.add('cinematic--still');
});

function seekVideo(progress, force = false) {
  if (!canScrub || reducedMotion.matches || constructionVideo.seeking || isSeeking) return;
  const duration = constructionVideo.duration;
  if (!duration || !Number.isFinite(duration)) return;
  const targetTime = clamp(progress) * Math.max(0, duration - 0.045);
  if (force || Math.abs(constructionVideo.currentTime - targetTime) > 0.08) {
    try {
      isSeeking = true;
      constructionVideo.currentTime = targetTime;
    } catch (_) {
      isSeeking = false;
    }
  }
}

function showChapter(index) {
  if (index === activeChapter) return;
  activeChapter = index;
  chapters.forEach((chapter, i) => {
    chapter.classList.toggle('is-active', index === i);
    chapter.setAttribute('aria-hidden', String(index !== i));
  });
  chapterButtons.forEach((button, i) => {
    button.classList.toggle('is-active', index === i);
    if (i === index) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  });
  chapterNumber.textContent = String(index + 1).padStart(2, '0');
}

function queueFrame() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(updateFrame);
}

function updateFrame() {
  ticking = false;
  const pageMaxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const pageRatio = clamp(window.scrollY / pageMaxScroll);
  pageProgress.style.width = `${pageRatio * 100}%`;
  header.classList.toggle('is-scrolled', window.scrollY > 25);

  if (reducedMotion.matches) return;
  const rect = cinematic.getBoundingClientRect();
  const span = Math.max(1, cinematic.offsetHeight - window.innerHeight);
  wantedProgress = clamp(-rect.top / span);
  const visible = rect.bottom > 0 && rect.top < window.innerHeight;

  // Text reacts to actual scroll position; video receives a subtle
  // interpolation to make wheel/touchpad motion feel fluid.
  if (visible) {
    const nextIndex = CHAPTER_THRESHOLDS.reduce((count, threshold) =>
      count + Number(wantedProgress >= threshold), 0);
    showChapter(nextIndex);
    chapterPercent.textContent = `${Math.round(wantedProgress * 100).toString().padStart(2, '0')}%`;
    filmTimeline.style.width = `${wantedProgress * 100}%`;
    scrollCue.style.opacity = wantedProgress > .11 ? '.20' : '1';
    smoothedProgress += (wantedProgress - smoothedProgress) * 0.25;
    if (Math.abs(wantedProgress - smoothedProgress) < 0.002) smoothedProgress = wantedProgress;
    seekVideo(smoothedProgress);
    if (Math.abs(wantedProgress - smoothedProgress) > 0.002) queueFrame();
  }
}
window.addEventListener('scroll', queueFrame, { passive: true });
window.addEventListener('resize', queueFrame, { passive: true });
window.addEventListener('load', queueFrame, { once: true });
queueFrame();

chapterButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const sectionTop = cinematic.getBoundingClientRect().top + window.scrollY;
    const sectionScroll = Math.max(1, cinematic.offsetHeight - window.innerHeight);
    window.scrollTo({
      top: sectionTop + sectionScroll * CHAPTER_CENTERS[index],
      behavior: reducedMotion.matches ? 'instant' : 'smooth'
    });
  });
});

// --------------------------------------------------------
// Content reveal: optical blur / translate reveal.
// Immediately reveal on mobile to avoid unrendered or blurry states.
// --------------------------------------------------------
const isMobileDevice = window.innerWidth <= 768;
if (isMobileDevice) {
  $$('.reveal').forEach((el) => el.classList.add('is-revealed'));
} else if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01, rootMargin: '100px 0px 100px 0px' });
  $$('.reveal').forEach((el) => revealObserver.observe(el));
} else {
  $$('.reveal').forEach((el) => el.classList.add('is-revealed'));
}

if (reducedMotion.matches) {
  chapters.forEach((chapter) => chapter.setAttribute('aria-hidden', 'false'));
}

// --------------------------------------------------------
// Floor-plan explorer: 8 real plans sourced from the book.
// Tabs, arrows, numbered pager, keyboard and a native dialog.
// --------------------------------------------------------
const tabs = $$('[data-plan-kind]');
const planPager = $('#planPager');
const planKind = $('#planKind');
const planTitle = $('#planTitle');
const planArea = $('#planArea');
const planDescription = $('#planDescription');
const planImage = $('#planImage');
const planPanel = $('#planPanel');
const currentPlanNumber = $('#currentPlanNumber');
const totalPlansNumber = $('#totalPlansNumber');
const modal = $('#planModal');
const modalPlanImage = $('#modalPlanImage');
const modalPlanTitle = $('#modalPlanTitle');
let chosenKind = 'apartamento';
let chosenIndex = 0;
let transitionTimer = null;

function planAt() { return PLANS[chosenKind][chosenIndex]; }
function setPlanCategory(kind) {
  if (!PLANS[kind]) return;
  chosenKind = kind;
  chosenIndex = 0;
  tabs.forEach((tab) => {
    const selected = tab.dataset.planKind === kind;
    tab.classList.toggle('is-selected', selected);
    tab.setAttribute('aria-selected', String(selected));
    if (selected) planPanel.setAttribute('aria-labelledby', tab.id);
  });
  paintPager();
  paintPlan(false);
}
function paintPager() {
  planPager.replaceChildren();
  PLANS[chosenKind].forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = item.id.replace(' / ', ' / ');
    button.setAttribute('aria-label', `Ver ${chosenKind === 'apartamento' ? 'apartamento' : 'cobertura'} ${item.id}`);
    button.classList.toggle('is-selected', chosenIndex === index);
    button.setAttribute('aria-pressed', String(chosenIndex === index));
    button.addEventListener('click', () => setPlan(index));
    planPager.appendChild(button);
  });
}
function setPlan(index) {
  const length = PLANS[chosenKind].length;
  chosenIndex = (index + length) % length;
  paintPager();
  paintPlan(true);
}
function paintPlan(animate) {
  const plan = planAt();
  const alt = `Planta baixa ${chosenKind === 'apartamento' ? 'dos apartamentos' : 'da cobertura'} ${plan.id}, área privativa total ${plan.area} metros quadrados`;
  currentPlanNumber.textContent = String(chosenIndex + 1).padStart(2, '0');
  totalPlansNumber.textContent = String(PLANS[chosenKind].length).padStart(2, '0');
  planKind.textContent = plan.label;
  planTitle.innerHTML = plan.id.includes(' / ')
    ? plan.id.split(' / ').map((part, i) => i ? `<span class="plan-title-amp">&amp;</span> ${part}` : part).join(' ')
    : plan.id;
  planArea.innerHTML = `${plan.area} <small>m²</small>`;
  planDescription.textContent = plan.description;
  const updateImg = () => {
    const path = `assets/planta-${plan.file}.webp`;
    planImage.src = path;
    planImage.alt = alt;
    planImage.classList.remove('is-changing');
    modalPlanImage.src = path;
    modalPlanImage.alt = `${alt}, ampliada`;
    modalPlanTitle.textContent = `${chosenKind.toUpperCase()} ${plan.id}`;
  };
  clearTimeout(transitionTimer);
  if (animate && !reducedMotion.matches) {
    planImage.classList.add('is-changing');
    transitionTimer = setTimeout(updateImg, 200);
  } else updateImg();
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => setPlanCategory(tab.dataset.planKind));
  tab.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const nextTab = tabs[(tabs.indexOf(tab) + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
    setPlanCategory(nextTab.dataset.planKind);
    nextTab.focus();
  });
});
$('#planPrev').addEventListener('click', () => setPlan(chosenIndex - 1));
$('#planNext').addEventListener('click', () => setPlan(chosenIndex + 1));
$('#planZoom').addEventListener('click', () => {
  if (typeof modal.showModal === 'function') modal.showModal();
  else modal.setAttribute('open', '');
});
$('#planModalClose').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });

paintPager();
paintPlan(false);

// Optional swipe between blueprints on touch devices.
let touchStartX = null;
const planDisplay = $('#planDisplay');
planDisplay.addEventListener('touchstart', (event) => {
  touchStartX = event.touches[0]?.clientX ?? null;
}, { passive: true });
planDisplay.addEventListener('touchend', (event) => {
  if (touchStartX === null) return;
  const endX = event.changedTouches[0]?.clientX ?? touchStartX;
  const delta = endX - touchStartX;
  if (Math.abs(delta) > 65) setPlan(chosenIndex + (delta < 0 ? 1 : -1));
  touchStartX = null;
}, { passive: true });
