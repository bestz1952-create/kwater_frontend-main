// ==============================
// ui.js — UI 인터랙션
// ==============================

// textarea 높이 자동 조절 + 전송 버튼 활성화
const textarea   = document.getElementById('message-input');
const sendBtn    = document.getElementById('send-btn');
const inputInner = document.querySelector('.input-area__wrap');

// 초기 단일 행 높이 기준값 (defer 로드 시점에 측정)
const singleLineHeight = textarea ? textarea.scrollHeight : 0;
let hasAttachedFile = false;

function updateInputExpanded() {
  const isMultiLine = textarea.scrollHeight > singleLineHeight;
  inputInner?.classList.toggle('input-area__wrap--expanded', isMultiLine || hasAttachedFile);
}

textarea?.addEventListener('input', () => {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';

  const hasContent = textarea.value.trim().length > 0;
  sendBtn?.setAttribute('aria-disabled', String(!hasContent));
  sendBtn?.setAttribute('data-state', hasContent ? 'active' : 'disabled');

  updateInputExpanded();
});

// Enter 전송 (Shift+Enter 줄바꿈)
textarea?.addEventListener('keydown', (e) => {
  // Enter 전송
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    console.log('전송:', textarea.value);
  }

  // Tab → 다음 요소로 이동 (버튼으로)
  if (e.key === 'Tab' && !e.shiftKey) {
    e.preventDefault();
    document.querySelector('#send-btn')?.focus();
  }
});

// ==============================
// 파일 첨부 팝오버
// ==============================

const attachBtn   = document.getElementById('attach-btn');
const popover     = document.getElementById('attach-popover');
const uploadBtn   = document.getElementById('upload-pdf-btn');
const fileInput   = document.getElementById('file-input');

// 팝오버 열기/닫기
attachBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  const isHidden = popover.dataset.state === 'hidden';
  popover.dataset.state = isHidden ? 'visible' : 'hidden';
  attachBtn.setAttribute('aria-expanded', String(isHidden));
});

// 팝오버 외부 클릭 시 닫기
document.addEventListener('click', (e) => {
  if (!e.target.closest('.input-area__attach')) {
    popover.dataset.state = 'hidden';
    attachBtn?.setAttribute('aria-expanded', 'false');
  }
});

// ESC로 팝오버 닫기
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    popover.dataset.state = 'hidden';
    attachBtn?.setAttribute('aria-expanded', 'false');
    attachBtn?.focus();
  }
});

// "문서 파일 업로드" 클릭 → 파일 선택창 열기
uploadBtn?.addEventListener('click', () => {
  popover.dataset.state = 'hidden';
  attachBtn?.setAttribute('aria-expanded', 'false');
  fileInput?.click();
});

// ==============================
// 파일 칩 생성
// ==============================

const fileList = document.getElementById('file-list');

function createFileChip(file) {
  const li = document.createElement('li');
  li.className = 'file-chip';
  li.dataset.state = 'loading';
  li.setAttribute('role', 'listitem');

  const fileName = file.name;

  li.innerHTML = `
    <div class="file-chip__title">
      <span class="file-chip__name">${fileName}</span>
      <button class="file-chip__delete btn btn--icon" aria-label="${fileName} 삭제" type="button">
        <i class="icon__close" aria-hidden="true"></i>
      </button>
    </div>
    <span class="file-chip__status">
      <svg class="file-chip__spinner" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <g clip-path="url(#paint0_angular_62874_4736_clip_path)" data-figma-skip-parse="true"><g transform="matrix(0.00833333 0 0 0.00833333 9.99984 9.99996)"><foreignObject x="-1120" y="-1120" width="2240" height="2240"><div xmlns="http://www.w3.org/1999/xhtml" style="background:conic-gradient(from 90deg,rgba(76, 200, 195, 0) 0deg,rgba(0, 127, 127, 1) 360deg);height:100%;width:100%;opacity:1"></div></foreignObject></g></g><path fill-rule="evenodd" clip-rule="evenodd" d="M9.99984 1.66663C14.6022 1.66663 18.3332 5.39759 18.3332 9.99996C18.3332 14.6023 14.6022 18.3333 9.99984 18.3333C5.39746 18.3333 1.6665 14.6023 1.6665 9.99996C1.6665 5.39759 5.39746 1.66663 9.99984 1.66663ZM9.99984 3.33329C6.31794 3.33329 3.33317 6.31806 3.33317 9.99996C3.33317 13.6819 6.31794 16.6666 9.99984 16.6666C13.6817 16.6666 16.6665 13.6819 16.6665 9.99996C16.6665 6.31806 13.6817 3.33329 9.99984 3.33329Z" data-figma-gradient-fill="{&quot;type&quot;:&quot;GRADIENT_ANGULAR&quot;}"/>
        <path d="M18.3332 9.99996C18.3332 10.4602 17.9601 10.8333 17.4998 10.8333C17.0396 10.8333 16.6665 10.4602 16.6665 9.99996C16.6665 9.53972 17.0396 9.16663 17.4998 9.16663C17.9601 9.16663 18.3332 9.53972 18.3332 9.99996Z" fill="#005E66"/>
        <defs><clipPath id="paint0_angular_62874_4736_clip_path"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.99984 1.66663C14.6022 1.66663 18.3332 5.39759 18.3332 9.99996C18.3332 14.6023 14.6022 18.3333 9.99984 18.3333C5.39746 18.3333 1.6665 14.6023 1.6665 9.99996C1.6665 5.39759 5.39746 1.66663 9.99984 1.66663ZM9.99984 3.33329C6.31794 3.33329 3.33317 6.31806 3.33317 9.99996C3.33317 13.6819 6.31794 16.6666 9.99984 16.6666C13.6817 16.6666 16.6665 13.6819 16.6665 9.99996C16.6665 6.31806 13.6817 3.33329 9.99984 3.33329Z"/></clipPath></defs>
      </svg>
      <i class="icon__fileChip file-chip__icon" aria-hidden="true"></i>
      PDF
    </span>
  `;

  // 삭제 버튼
  li.querySelector('.file-chip__delete').addEventListener('click', () => {
    li.remove();
    hasAttachedFile = fileList.children.length > 0;
    updateInputExpanded();
  });

  // 로딩 → 완료 전환 (실제 업로드 완료 시 data-state="ready"로 변경)
  // TODO: 실제 업로드 API 연결 시 아래 setTimeout 대체
  setTimeout(() => {
    li.dataset.state = 'ready';
  }, 1500);

  return li;
}

// 파일 선택 후 처리
fileInput?.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;

  // PDF 확장자 재검증
  if (file.type !== 'application/pdf') {
    alert('PDF 파일만 업로드할 수 있습니다.');
    fileInput.value = '';
    return;
  }

  fileList.appendChild(createFileChip(file));
  fileInput.value = '';

  hasAttachedFile = true;
  updateInputExpanded();

  // TODO: 실제 업로드 로직 연결
  console.log('업로드할 파일:', file.name);
});

// ==============================
// 채팅 히스토리 액션 (고정, 이름변경, 삭제)
// ==============================

(function () {
  let targetItem = null;

  // 팝오버 버튼 클릭
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.popover__item[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    const item = btn.closest('.chat-history__item');

    if (action === 'pin') {
      const list = item.closest('ul');
      const isPinned = item.classList.toggle('chat-history__item--pinned');
      if (isPinned) {
        item.classList.remove('chat-history__item--todelete');
        list.prepend(item);
      }
    } else if (action === 'rename' || action === 'delete') {
      targetItem = item;
    }
  });

  // 모달 제출
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.modal__submit')) return;
    const modal = e.target.closest('.modal');
    if (!modal || !targetItem) return;

    if (modal.id === 'modal-rename') {
      const input = modal.querySelector('#rename-input');
      const newName = input?.value.trim();
      if (newName) {
        targetItem.querySelector('.chat-history__title').textContent = newName;
        showToast('이름이 변경되었습니다.');
      }
      input.value = '';
    } else if (modal.id === 'modal-delete') {
      targetItem.remove();
      showToast('대화를 삭제했습니다.');
    }

    targetItem = null;
    document.getElementById(modal.id).dataset.state = 'closed';
  });

  // 취소/닫기/배경 클릭 시 targetItem 초기화
  document.addEventListener('click', function (e) {
    const modal = e.target.closest('.modal');
    if (!modal) return;
    if (
      e.target.closest('.modal__close') ||
      e.target.closest('.modal__cancel') ||
      e.target.closest('.modal__backdrop')
    ) {
      targetItem = null;
    }
  });
})();

// ==============================
// 채팅 히스토리 옵션 팝오버
// ==============================

document.querySelectorAll('.chat-history__menu').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const popover = btn.nextElementSibling;
    const isHidden = popover.dataset.state === 'hidden';

    // 다른 열린 팝오버 모두 닫기
    document.querySelectorAll('.chat-history__popover[data-state="visible"]').forEach((p) => {
      p.dataset.state = 'hidden';
      p.previousElementSibling.setAttribute('aria-expanded', 'false');
    });

    popover.dataset.state = isHidden ? 'visible' : 'hidden';
    btn.setAttribute('aria-expanded', String(isHidden));

    // 팝오버 열릴 때 첫 번째 메뉴 항목으로 포커스
    if (isHidden) {
      popover.querySelector('.popover__item')?.focus();
    }
  });

  // ESC로 팝오버 닫기
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const popover = btn.nextElementSibling;
      popover.dataset.state = 'hidden';
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });
});

// 팝오버 내부 ESC 처리
document.querySelectorAll('.chat-history__popover').forEach((popover) => {
  popover.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      popover.dataset.state = 'hidden';
      const btn = popover.previousElementSibling;
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  });
});

// 외부 클릭 시 채팅 옵션 팝오버 닫기
document.addEventListener('click', (e) => {
  if (!e.target.closest('.chat-history__item')) {
    document.querySelectorAll('.chat-history__popover').forEach((popover) => {
      popover.dataset.state = 'hidden';
    });
    document.querySelectorAll('.chat-history__menu').forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
    });
  }
});

// ==============================
// 유저 프로필 팝오버
// ==============================

const userProfileBtn = document.querySelector('.user-profile');
const userProfilePopover = document.querySelector('.user-profile__popover');

userProfileBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  const isHidden = userProfilePopover.dataset.state === 'hidden';
  userProfilePopover.dataset.state = isHidden ? 'visible' : 'hidden';
  userProfileBtn.setAttribute('aria-expanded', String(isHidden));
});

userProfilePopover?.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    userProfilePopover.dataset.state = 'hidden';
    userProfileBtn.setAttribute('aria-expanded', 'false');
    userProfileBtn.focus();
  }
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.sidebar__footer')) {
    userProfilePopover?.setAttribute && (userProfilePopover.dataset.state = 'hidden');
    userProfileBtn?.setAttribute('aria-expanded', 'false');
  }
});

// ==============================
// 팝오버 포커스 이탈 시 닫기 (Tab 키 이동)
// ==============================

function closePopoverOnBlur(popover, trigger) {
  popover.addEventListener('focusout', (e) => {
    if (popover.contains(e.relatedTarget) || e.relatedTarget === trigger) return;
    popover.dataset.state = 'hidden';
    trigger?.setAttribute('aria-expanded', 'false');
  });
}

// 파일 첨부 팝오버
if (popover && attachBtn) closePopoverOnBlur(popover, attachBtn);

// 채팅 히스토리 팝오버
document.querySelectorAll('.chat-history__popover').forEach((p) => {
  closePopoverOnBlur(p, p.previousElementSibling);
});

// 유저 프로필 팝오버
if (userProfilePopover && userProfileBtn) closePopoverOnBlur(userProfilePopover, userProfileBtn);

// ==============================
// 토글 UI 처리 (드롭다운 & 아코디언)
// aria-controls로 트리거와 패널 연결 (클래스명 무관)
// ==============================
// 사용처:
// - dropdown: 모델 선택 (.dropdown__trigger, .dropdown__menu)
// - accordion: 추론 과정 확장/축소 (.accordion__trigger, .accordion__panel)

document.querySelectorAll('[aria-haspopup][aria-controls]').forEach((trigger) => {
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();

    const menuId = trigger.getAttribute('aria-controls');
    const menu = document.getElementById(menuId);
    if (!menu) return;

    const isOpen = menu.dataset.state === 'open';
    menu.dataset.state = isOpen ? 'closed' : 'open';
    trigger.setAttribute('aria-expanded', String(!isOpen));
  });
});

// dropdown 외부 클릭 또는 ESC 시 닫기
function closeAllDropdowns() {
  document.querySelectorAll('[aria-haspopup][aria-controls]').forEach((trigger) => {
    const menu = document.getElementById(trigger.getAttribute('aria-controls'));
    if (menu?.dataset.state === 'open') {
      menu.dataset.state = 'closed';
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
}

document.addEventListener('click', closeAllDropdowns);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllDropdowns();
});

// ==============================
// Search input clear 버튼 기능
// ==============================

document.querySelectorAll('input[type="search"]').forEach((input) => {
  input.addEventListener('mousedown', (e) => {
    // 값이 있고, X 버튼 영역(오른쪽 32px) 클릭 감지
    const inputRect = input.getBoundingClientRect();
    const clickX = e.clientX - inputRect.left;

    if (input.value && clickX > input.offsetWidth - 32) {
      input.value = '';
      input.dispatchEvent(new Event('change', { bubbles: true }));
      input.dispatchEvent(new Event('input', { bubbles: true }));
      e.preventDefault();
    }
  });
});

// ==============================
// 출처 패널 (Source Panel)
// ==============================

const sourceBtnContainer = document.querySelector('.source-btn');
const sourcePanel = document.getElementById('source-panel');
const closeSourcePanelBtn = document.getElementById('close-source-panel');
const sourcePanelDivider = document.getElementById('source-panel-divider');
const chatMessages = document.querySelector('.chat-messages');

if (sourceBtnContainer && sourcePanel) {
  const sourceBtn = sourceBtnContainer.querySelector('button');
  const minPanelWidth = 320; // panel의 최소 width
  const minMainWidth = 440; // main의 최소 width

  // 버튼 클릭 시 패널 열기/닫기
  sourceBtn?.addEventListener('click', () => {
    const isOpen = sourcePanel.dataset.state === 'open';
    sourcePanel.dataset.state = isOpen ? 'closed' : 'open';
    sourceBtn.setAttribute('aria-expanded', String(!isOpen));

    // 패널이 열렸을 때 close 버튼으로 focus 이동
    if (!isOpen) {
      closeSourcePanelBtn?.focus();
    }
  });

  // 버튼에서 Enter 키로 패널 열기 (키보드 접근성)
  sourceBtn?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const isOpen = sourcePanel.dataset.state === 'open';
      sourcePanel.dataset.state = isOpen ? 'closed' : 'open';
      sourceBtn.setAttribute('aria-expanded', String(!isOpen));

      // 패널이 열렸을 때 close 버튼으로 focus 이동
      if (!isOpen) {
        setTimeout(() => closeSourcePanelBtn?.focus(), 100);
      }
    }
  });

  // 닫기 버튼
  closeSourcePanelBtn?.addEventListener('click', () => {
    sourcePanel.dataset.state = 'closed';
    sourceBtn.setAttribute('aria-expanded', 'false');
    sourceBtn?.focus(); // 패널 닫히면 원래 버튼으로 포커스 복원
  });

  const sidebarEl = document.getElementById('sidebar');

  // sidebar 상태에 따른 source-panel 최대 너비 계산
  // expanded: body - 280px(sidebar) - 440px(main 최소)
  // collapsed: body - 52px(sidebar) - 440px(main 최소)
  const getMaxPanelWidth = () => {
    const sidebarWidth = sidebarEl?.dataset.state === 'collapsed' ? 52 : 280;
    return document.body.offsetWidth - sidebarWidth - minMainWidth;
  };

  // 드래그로 패널 크기 조절
  let isResizing = false;

  sourcePanelDivider?.addEventListener('mousedown', (e) => {
    isResizing = true;
    e.preventDefault();

    const startX = e.clientX;
    const startPanelWidth = sourcePanel.offsetWidth;

    const handleMouseMove = (e) => {
      if (!isResizing) return;

      const maxPanelWidth = getMaxPanelWidth();
      const deltaX = e.clientX - startX;
      const newWidth = startPanelWidth - deltaX;

      // 최소 & 최대 width 적용
      const clampedWidth = Math.max(minPanelWidth, Math.min(newWidth, maxPanelWidth));

      sourcePanel.style.width = clampedWidth + 'px';
      chatMessages.style.flex = '1 1 0';
    };

    const handleMouseUp = () => {
      isResizing = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  });

  // sidebar collapse/expand 시 source-panel 크기 재조정 (main 패널 아닌 source-panel을 줄임)
  const clampSourcePanel = () => {
    if (sourcePanel.dataset.state !== 'open') return;
    const maxPanelWidth = getMaxPanelWidth();
    const currentWidth = parseInt(sourcePanel.style.width, 10) || sourcePanel.offsetWidth;
    if (currentWidth > maxPanelWidth) {
      sourcePanel.style.width = maxPanelWidth + 'px';
      chatMessages.style.flex = '1 1 0';
    }
  };

  if (sidebarEl) {
    new MutationObserver(() => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        clampSourcePanel();
      };
      sidebarEl.addEventListener('transitionend', finish, { once: true });
      setTimeout(finish, 400); // transition이 없는 경우 fallback
    }).observe(sidebarEl, { attributes: true, attributeFilter: ['data-state'] });
  }
}

// ==============================
// 모달
// ==============================

(function () {
  function openModal(modal) {
    modal.dataset.state = 'open';
    modal.setAttribute('aria-hidden', 'false');
    const firstFocusable = modal.querySelector('button, textarea, input, [tabindex]:not([tabindex="-1"])');
    firstFocusable?.focus();
  }

  function closeModal(modal) {
    modal.dataset.state = 'closed';
    modal.setAttribute('aria-hidden', 'true');
    const trigger = document.querySelector('[data-modal-target="' + modal.id + '"]');
    trigger?.focus();
  }

  // 긍정 피드백: fill 클래스 토글 (부정 fill 제거)
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.feedback-good');
    if (btn) {
      const feedbackWrap = btn.closest('.feedback-btn');
      feedbackWrap?.querySelector('.icon__thumbDown')?.classList.remove('fill');
      btn.querySelector('.icon__thumbUp')?.classList.toggle('fill');
    }
  });

  // data-modal-target 버튼으로 열기
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-modal-target]');
    if (trigger) {
      const modal = document.getElementById(trigger.dataset.modalTarget);
      if (modal) openModal(modal);
    }
  });

  // 닫기 버튼 / 취소 버튼
  document.addEventListener('click', function (e) {
    const modal = e.target.closest('.modal');
    if (!modal) return;

    if (e.target.closest('.modal__close')) {
      closeModal(modal);
    }

    if (e.target.closest('.modal__cancel')) {
      closeModal(modal);
      showToast('의견을 제출하지 못했습니다.', 'error');
    }

    if (e.target.closest('.modal__submit')) {
      if (modal.id === 'modal-rename' || modal.id === 'modal-delete') return;
      const trigger = document.querySelector('[data-modal-target="' + modal.id + '"]');
      const feedbackWrap = trigger?.closest('.feedback-btn');
      feedbackWrap?.querySelector('.icon__thumbUp')?.classList.remove('fill');
      trigger?.querySelector('.icon__thumbDown')?.classList.add('fill');
      closeModal(modal);
      showToast('의견을 제출했습니다.');
    }

    // 배경 클릭
    if (e.target.closest('.modal__backdrop')) {
      closeModal(modal);
    }
  });

  // ESC
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    const openModal = document.querySelector('.modal[data-state="open"]');
    if (openModal) closeModal(openModal);
  });
})();

// ==============================
// 인용 출처 (Citation)
// ==============================

(function () {
  function closeAllCitations() {
    document.querySelectorAll('.citation__wrap').forEach(function (wrap) {
      wrap.style.display = 'none';
    });
  }

  function initMultiSlider(multi) {
    const items = multi.querySelectorAll('.citation__inner > li');
    const indicator = multi.querySelector('.indicator');
    const btnLeft = multi.querySelector('.arr_left');
    const btnRight = multi.querySelector('.arr_right');
    const total = items.length;

    if (total === 0) return;

    let current = 0;

    function showItem(index) {
      items.forEach(function (item, i) {
        item.style.display = i === index ? '' : 'none';
      });
      if (indicator) {
        indicator.textContent = (index + 1) + '/' + total;
      }
    }

    showItem(current);

    if (btnLeft) {
      btnLeft.addEventListener('click', function (e) {
        e.stopPropagation();
        current = (current - 1 + total) % total;
        showItem(current);
      });
    }

    if (btnRight) {
      btnRight.addEventListener('click', function (e) {
        e.stopPropagation();
        current = (current + 1) % total;
        showItem(current);
      });
    }
  }

  function initCitations() {
    document.querySelectorAll('.citation__wrap').forEach(function (wrap) {
      wrap.style.display = 'none';
    });

    document.querySelectorAll('.citation__multi').forEach(function (multi) {
      initMultiSlider(multi);
    });

    document.querySelectorAll('.answer__source > button').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const wrap = btn.closest('.answer__source').querySelector('.citation__wrap');
        if (!wrap) return;

        const isVisible = wrap.style.display === 'block';
        closeAllCitations();
        if (!isVisible) {
          wrap.style.marginLeft = '';
          wrap.style.display = 'block';
          const panel = document.getElementById('source-panel');
          const rightBoundary = (panel && panel.dataset.state === 'open')
            ? panel.getBoundingClientRect().left
            : document.documentElement.clientWidth;
          const overflow = wrap.getBoundingClientRect().right - rightBoundary + 24;
          if (overflow > 0) {
            wrap.style.marginLeft = -overflow + 'px';
          }
        }
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.citation__wrap') && !e.target.closest('.answer__source')) {
        closeAllCitations();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeAllCitations();
      }
    });

    window.addEventListener('resize', closeAllCitations);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCitations);
  } else {
    initCitations();
  }
})();