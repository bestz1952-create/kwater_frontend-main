// ==============================
// sidebar.js — 사이드바 토글
// ==============================

const sidebar       = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const mobileTrigger = document.getElementById('mobile-sidebar-btn');
const overlay       = document.getElementById('overlay');

// 데스크탑: collapse / expand
sidebarToggle?.addEventListener('click', () => {
  const isExpanded = sidebar.dataset.state === 'expanded';
  sidebar.dataset.state = isExpanded ? 'collapsed' : 'expanded';
  sidebarToggle.setAttribute('aria-expanded', String(!isExpanded));
  sidebarToggle.setAttribute('aria-label', isExpanded ? '사이드바 펼치기' : '사이드바 접기');
});

// 모바일: open / close
function openMobileSidebar() {
  sidebar.dataset.state = 'open';
  overlay.dataset.state = 'visible';
  overlay.removeAttribute('aria-hidden');
  mobileTrigger?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileSidebar() {
  sidebar.dataset.state = 'closed';
  overlay.dataset.state = 'hidden';
  overlay.setAttribute('aria-hidden', 'true');
  mobileTrigger?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

mobileTrigger?.addEventListener('click', openMobileSidebar);
overlay?.addEventListener('click', closeMobileSidebar);

// ESC 키로 닫기
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileSidebar();
});

// source-panel이 열린 상태에서 1024px 이하로 리사이즈 시 sidebar collapse
window.addEventListener('resize', () => {
  const sourcePanel = document.getElementById('source-panel');
  if (sourcePanel?.dataset.state === 'open' && window.innerWidth <= 1124) {
    if (sidebar?.dataset.state === 'expanded') {
      sidebar.dataset.state = 'collapsed';
      sidebarToggle?.setAttribute('aria-expanded', 'false');
      sidebarToggle?.setAttribute('aria-label', '사이드바 펼치기');
    }
  }
});
