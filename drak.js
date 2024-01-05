// 深色模式預設狀態
let isDarkMode = false;

// 切換深色模式
function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  applyDarkMode();
  saveDarkModeState();
}

// 應用深色模式的樣式
function applyDarkMode() {
  const body = document.querySelector('body');
  if (isDarkMode) {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
}

// 儲存深色模式狀態
function saveDarkModeState() {
  localStorage.setItem('darkMode', isDarkMode);
}

// 初始設置深色模式
function initDarkMode() {
  const storedMode = localStorage.getItem('darkMode');
  if (storedMode === 'true') {
    isDarkMode = true;
  }
  applyDarkMode();
}

// 當頁面載入時初始化深色模式
// initDarkMode();