// ==============================
// archive-actions.js — 대화 보관함 액션
// ==============================

// ==============================
// 이벤트 리스너 설정
// ==============================

document.addEventListener('DOMContentLoaded', () => {
  // tbody > tr > td 내 포커스 가능 요소에 포커스 시 tr에 클래스 부여
  const dataArchive = document.querySelector('.data-archive');
  if (dataArchive) {
    dataArchive.addEventListener('focusin', (e) => {
      const focusable = e.target.closest('td a, td button');
      if (focusable) {
        const tr = focusable.closest('tbody tr');
        if (tr) tr.classList.add('is-focused');
      }
    });
    dataArchive.addEventListener('focusout', (e) => {
      const focusable = e.target.closest('td a, td button');
      if (focusable) {
        const tr = focusable.closest('tbody tr');
        if (tr) tr.classList.remove('is-focused');
      }
    });
  }

  // 보관 취소 및 대화 삭제 버튼들
  const buttons = document.querySelectorAll('button[data-action]');

  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      const action = button.dataset.action;

      if (action === 'unarchive') {
        showToast('대화를 보관함에서 제거했습니다.');
      } else if (action === 'delete') {
        showToast('대화를 삭제했습니다.');
      }
    });
  });
});
