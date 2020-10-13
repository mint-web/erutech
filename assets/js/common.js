// gnb navigation
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const snb = document.querySelectorAll('.snb');
let timeouts = [];
let clearTimers = () => {
  for (let i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i])
  }
  timeouts = [];
}

function gnbMenuOver() {
  clearTimers();
  header.classList.add('on');
  snb.forEach(snbmenu => {
    snbmenu.style.display = 'block';
    let timeout = setTimeout(() => {
      snbmenu.classList.add('on');
    }, 500);
    timeouts.push(timeout);
  });
}

function gnbMenuOut() {
  clearTimers();
  header.classList.remove('on');
  snb.forEach(snbmenu => {
    snbmenu.style.display = 'none';
    let timeout = setTimeout(() => {
      snbmenu.classList.remove('on');
    }, 500);
    timeouts.push(timeout);
  });
}

nav.addEventListener('mouseenter', gnbMenuOver);
nav.addEventListener('mouseleave', gnbMenuOut);

//header scroll fixed
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 0) {
    header.classList.add('fix');
  } else {
    header.classList.remove('fix');
  }
})