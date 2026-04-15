// ==============================
// theme.js — 다크/라이트 모드
// ==============================

const STORAGE_KEY = 'ai-service-theme';
 
function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored;
 
  // localStorage 없으면 HTML data-theme 기본값 사용
  return document.documentElement.getAttribute('data-theme') || 'light';
}
 
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
}
 
applyTheme(getInitialTheme());
 
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}
 