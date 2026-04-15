// ==============================
// toast.js — 토스트 알람
// ==============================

/**
 * 토스트 알람 표시
 * @param {string} message - 표시할 메시지
 * @param {'check'|'error'} [type='check'] - 아이콘 타입
 * @param {number} duration - 표시 시간 (ms, 기본값: 3000)
 */
function showToast(message, type = 'check', duration = 3000) {
  const container = document.getElementById('toast-container');

  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');

  toast.innerHTML = `
    <span>
      <i class="icon__${type}" aria-hidden="true"></i>
      ${message}
    </span>
    <button class="toast__close" aria-label="알람 닫기">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M10.2441 0.244078C10.5695 -0.0813593 11.097 -0.0813593 11.4225 0.244078C11.7478 0.569521 11.7479 1.09705 11.4225 1.42246L7.01166 5.83327L11.4225 10.2441C11.7478 10.5695 11.7479 11.0971 11.4225 11.4225C11.0971 11.7479 10.5695 11.7478 10.2441 11.4225L5.83327 7.01166L1.42246 11.4225C1.09705 11.7479 0.569521 11.7478 0.244078 11.4225C-0.0813593 11.097 -0.0813593 10.5695 0.244078 10.2441L4.65489 5.83327L0.244078 1.42246C-0.0813593 1.09703 -0.0813593 0.569515 0.244078 0.244078C0.569515 -0.0813593 1.09703 -0.0813593 1.42246 0.244078L5.83327 4.65489L10.2441 0.244078Z" fill="white"/>
      </svg>
    </button>
  `;

  container.appendChild(toast);

  const closeBtn = toast.querySelector('.toast__close');
  const timeout = setTimeout(() => removeToast(toast), duration);

  closeBtn.addEventListener('click', () => {
    clearTimeout(timeout);
    removeToast(toast);
  });
}

/**
 * 토스트 제거 (애니메이션 포함)
 * @param {HTMLElement} toast - 제거할 토스트 요소
 */
function removeToast(toast) {
  toast.classList.add('removing');
  setTimeout(() => toast.remove(), 300);
}
