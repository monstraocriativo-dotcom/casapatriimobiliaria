/* Casapatri — Coberturas no Recreio dos Bandeirantes
   JavaScript sem dependências; vídeo sincronizado com a rolagem.
   CONFIGURAÇÃO COMERCIAL: atualize o WhatsApp abaixo antes da publicação. */
'use strict';

document.documentElement.classList.add('js-motion');

const CONTACT = {
  // Número do projeto original; CONFIRMAR se é o WhatsApp oficial desta campanha.
  whatsappNumber: '5521967456500',
  generalMessage: 'Olá! Vi a página das coberturas no Recreio dos Bandeirantes a partir de R$ 709 mil. Quero consultar unidades disponíveis e entender a obra por administração.'
};

const PLANS = [
  {
    kind: 'principal',
    label: 'PLANTA ILUSTRATIVA · NÍVEL PRINCIPAL',
    title: 'Área social',
    lead: 'Seu jeito.',
    description: 'Ambientes de convivência e áreas internas para imaginar a vida em uma cobertura com mais espaço.',
    img: 'assets/planta-principal.webp',
    alt: 'Planta ilustrativa do nível principal da cobertura, com áreas de convivência e quartos'
  },
  {
    kind: 'terraco',
    label: 'PLANTA ILUSTRATIVA · TERRAÇO SUPERIOR',
    title: 'Terraço',
    lead: 'Seu tempo.',
    description: 'Uma área superior ampla, com possibilidades para receber, descansar e personalizar conforme o projeto.',
    img: 'assets/planta-terraco.webp',
    alt: 'Planta ilustrativa do terraço superior de uma cobertura, mostrando área externa ampla'
  }
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const makeWhatsAppLink = (message) => `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;

$$('[data-whatsapp]').forEach(link => {
  link.href = makeWhatsAppLink(CONTACT.generalMessage);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});
$('#year').textContent = String(new Date().getFullYear());

// Menu e navegação
const header = $('#siteHeader');
const menuToggle = $('#menuToggle');
const headerNav = $('#headerNav');
function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  headerNav.classList.remove('is-open');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  headerNav.classList.toggle('is-open', open);
});
$$('a[href^="#"]', headerNav).forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

// Scroll-scrub: o progresso de toda a seção determina o tempo exato do vídeo.
// O arquivo foi transcodificado com keyframes próximos para buscar quadros sem travamentos.
const cinematic = $('#cinematic');
const constructionVideo = $('#constructionVideo');
const chapters = $$('.story__chapter');
const chapterButtons = $$('[data-go-chapter]');
const chapterNumber = $('#chapterNumber');
const chapterPercent = $('#chapterPercent');
const filmTimeline = $('#filmTimeline');
const pageProgress = $('#pageProgress');
const scrollCue = $('#scrollCue');
const CHAPTER_CENTERS = [0.105, 0.365, 0.62, 0.875];
const CHAPTER_THRESHOLDS = [0.25, 0.5, 0.75];
let activeChapter = 0;
let targetProgress = 0;
let animatedProgress = 0;
let readyToSeek = false;
let frameScheduled = false;
let isSeeking = false;

function scrubVideo(progress, force = false) {
  if (!readyToSeek || reducedMotion.matches || constructionVideo.seeking || isSeeking) return;
  const duration = constructionVideo.duration;
  if (!Number.isFinite(duration) || duration <= 0) return;
  const time = clamp(progress) * Math.max(0, duration - 0.07);
  if (force || Math.abs(constructionVideo.currentTime - time) > 0.08) {
    try {
      isSeeking = true;
      constructionVideo.currentTime = time;
    } catch (_) {
      isSeeking = false;
    }
  }
}
function prepareVideo() {
  if (!Number.isFinite(constructionVideo.duration) || constructionVideo.duration <= 0) return;
  readyToSeek = true;
  constructionVideo.pause();
  scrubVideo(targetProgress, true);
}
constructionVideo.addEventListener('loadedmetadata', prepareVideo);
if (constructionVideo.readyState >= HTMLMediaElement.HAVE_METADATA) prepareVideo();
constructionVideo.addEventListener('seeked', () => {
  isSeeking = false;
});
constructionVideo.addEventListener('error', () => cinematic.classList.add('cinematic--still'));

function showChapter(index) {
  if (index === activeChapter) return;
  activeChapter = index;
  chapters.forEach((chapter, i) => {
    chapter.classList.toggle('is-active', i === index);
    chapter.setAttribute('aria-hidden', String(i !== index));
    // When a chapter is hidden, remove links from keyboard focus order.
    $$('a,button', chapter).forEach(el => { el.tabIndex = i === index ? 0 : -1; });
  });
  chapterButtons.forEach((btn, i) => {
    btn.classList.toggle('is-active', i === index);
    if (i === index) btn.setAttribute('aria-current', 'step');
    else btn.removeAttribute('aria-current');
  });
  chapterNumber.textContent = String(index + 1).padStart(2, '0');
}
// CTA from last chapter starts unfocusable while invisible.
$$('a,button', chapters[3]).forEach(el => { el.tabIndex = -1; });

function scheduleFrame() {
  if (frameScheduled) return;
  frameScheduled = true;
  requestAnimationFrame(updateFrame);
}
function updateFrame() {
  frameScheduled = false;
  const maxPageScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  pageProgress.style.width = `${clamp(window.scrollY / maxPageScroll) * 100}%`;
  header.classList.toggle('is-scrolled', window.scrollY > 25);
  if (reducedMotion.matches) return;

  const rect = cinematic.getBoundingClientRect();
  const scrollSpan = Math.max(1, cinematic.offsetHeight - window.innerHeight);
  targetProgress = clamp(-rect.top / scrollSpan);
  if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

  const chapter = CHAPTER_THRESHOLDS.reduce((acc, threshold) => acc + Number(targetProgress >= threshold), 0);
  showChapter(chapter);
  chapterPercent.textContent = `${String(Math.round(targetProgress * 100)).padStart(2, '0')}%`;
  filmTimeline.style.width = `${targetProgress * 100}%`;
  scrollCue.style.opacity = targetProgress > 0.12 ? '0.20' : '1';
  animatedProgress += (targetProgress - animatedProgress) * 0.27;
  if (Math.abs(targetProgress - animatedProgress) < 0.002) animatedProgress = targetProgress;
  scrubVideo(animatedProgress);
  if (Math.abs(targetProgress - animatedProgress) >= 0.002) scheduleFrame();
}
window.addEventListener('scroll', scheduleFrame, { passive: true });
window.addEventListener('resize', scheduleFrame, { passive: true });
window.addEventListener('load', scheduleFrame, { once: true });
scheduleFrame();

chapterButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const top = cinematic.getBoundingClientRect().top + window.scrollY;
    const span = Math.max(1, cinematic.offsetHeight - window.innerHeight);
    window.scrollTo({ top: top + span * CHAPTER_CENTERS[index], behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  });
});

// Efeitos de entrada (revelação imediata no mobile para evitar telas em branco ou embaçadas)
const isMobileDevice = window.innerWidth <= 768;
if (isMobileDevice) {
  $$('.reveal').forEach(el => el.classList.add('is-revealed'));
} else if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries, io) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01, rootMargin: '100px 0px 100px 0px' });
  $$('.reveal').forEach(el => observer.observe(el));
} else {
  $$('.reveal').forEach(el => el.classList.add('is-revealed'));
}

if (reducedMotion.matches) {
  chapters.forEach(c => c.setAttribute('aria-hidden', 'false'));
  $$('a,button', chapters[3]).forEach(el => { el.tabIndex = 0; });
}

// Visualização das duas plantas extraídas da imagem fornecida pelo cliente.
const tabs = $$('[data-plan-kind]');
const planPanel = $('#planPanel');
const planPager = $('#planPager');
const planKind = $('#planKind');
const planTitle = $('#planTitle');
const planArea = $('#planArea');
const planDescription = $('#planDescription');
const planImage = $('#planImage');
const modal = $('#planModal');
const modalPlanImage = $('#modalPlanImage');
const modalPlanTitle = $('#modalPlanTitle');
let planIndex = 0;
let transitionTimer;

function paintPager() {
  planPager.replaceChildren();
  PLANS.forEach((plan, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = index === 0 ? 'NÍVEL PRINCIPAL' : 'TERRAÇO';
    button.classList.toggle('is-selected', index === planIndex);
    button.setAttribute('aria-pressed', String(index === planIndex));
    button.setAttribute('aria-label', `Visualizar ${plan.title.toLowerCase()}`);
    button.addEventListener('click', () => selectPlan(index));
    planPager.appendChild(button);
  });
}
function selectPlan(index) {
  planIndex = (index + PLANS.length) % PLANS.length;
  const plan = PLANS[planIndex];
  tabs.forEach(tab => {
    const selected = tab.dataset.planKind === plan.kind;
    tab.classList.toggle('is-selected', selected);
    tab.setAttribute('aria-selected', String(selected));
    if (selected) planPanel.setAttribute('aria-labelledby', tab.id);
  });
  paintPager();
  $('#currentPlanNumber').textContent = String(planIndex + 1).padStart(2, '0');
  $('#totalPlansNumber').textContent = String(PLANS.length).padStart(2, '0');
  planKind.textContent = plan.label;
  planTitle.textContent = plan.title;
  planArea.textContent = plan.lead;
  planDescription.textContent = plan.description;
  clearTimeout(transitionTimer);
  const swap = () => {
    planImage.src = plan.img;
    planImage.alt = plan.alt;
    planImage.classList.remove('is-changing');
    modalPlanImage.src = plan.img;
    modalPlanImage.alt = `${plan.alt}, ampliada`;
    modalPlanTitle.textContent = plan.title.toUpperCase();
  };
  if (planImage.src.endsWith(plan.img) || reducedMotion.matches) swap();
  else { planImage.classList.add('is-changing'); transitionTimer = setTimeout(swap, 190); }
}
tabs.forEach(tab => {
  tab.addEventListener('click', () => selectPlan(PLANS.findIndex(p => p.kind === tab.dataset.planKind)));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const step = event.key === 'ArrowRight' ? 1 : -1;
    const next = (planIndex + step + PLANS.length) % PLANS.length;
    selectPlan(next);
    tabs[next].focus();
  });
});
$('#planPrev').addEventListener('click', () => selectPlan(planIndex - 1));
$('#planNext').addEventListener('click', () => selectPlan(planIndex + 1));
$('#planZoom').addEventListener('click', () => {
  if (typeof modal.showModal === 'function') modal.showModal();
  else modal.setAttribute('open', '');
});
$('#planModalClose').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });
selectPlan(0);

let touchStartX = null;
$('#planDisplay').addEventListener('touchstart', event => {
  touchStartX = event.touches[0]?.clientX ?? null;
}, { passive: true });
$('#planDisplay').addEventListener('touchend', event => {
  if (touchStartX === null) return;
  const endX = event.changedTouches[0]?.clientX ?? touchStartX;
  if (Math.abs(endX - touchStartX) > 65) selectPlan(planIndex + (endX < touchStartX ? 1 : -1));
  touchStartX = null;
}, { passive: true });
