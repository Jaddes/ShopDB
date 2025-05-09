document.querySelectorAll('.side-category .side-btn').forEach(btn => {
  btn.addEventListener('click', () => {
      btn.parentElement.classList.toggle('open');
  });
});

document.querySelectorAll('.sub-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.parentElement.classList.toggle('open');
  });
});
