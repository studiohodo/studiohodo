// 1. 이미지 확대 오버레이 기능
document.addEventListener("DOMContentLoaded", () => {
  // 오버레이 동적 생성
  const overlay = document.createElement("div");
  overlay.id = "overlay";

  const overlayImg = document.createElement("img");
  overlayImg.alt = "Enlarged image";

  const closeBtn = document.createElement("span");
  closeBtn.id = "close";
  closeBtn.textContent = "×";
  closeBtn.setAttribute("role", "button");
  closeBtn.setAttribute("aria-label", "Close enlarged image");

  overlay.append(overlayImg, closeBtn);
  document.body.appendChild(overlay);

  // 모든 썸네일 이미지 클릭 이벤트
  document.querySelectorAll(".thumb img").forEach((thumbImg) => {
    thumbImg.addEventListener("click", () => {
      overlayImg.src = thumbImg.src;
      overlayImg.alt = thumbImg.alt || "Enlarged photo";
      overlay.classList.add("active");
      // 포커스 관리 (접근성)
      closeBtn.focus();
    });
  });

  // 닫기 이벤트들
  closeBtn.addEventListener("click", () => overlay.classList.remove("active"));

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.remove("active");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      overlay.classList.remove("active");
    }
  });
});

// 2. 스크롤 방향에 따른 헤더 숨김/보임
let lastScrollTop = 0;

window.addEventListener(
  "scroll",
  () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.getElementById("header");

    if (!header) return; // 헤더가 없으면 무시

    if (scrollTop > lastScrollTop && scrollTop > 400) {
      // 다운 + 어느 정도 내려갔을 때만 숨김
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  },
  { passive: true }
);