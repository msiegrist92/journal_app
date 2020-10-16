const ok_msg = document.getElementById('create_ok');
const alert_msg = document.getElementById('alert_msg');
const hide_msg = document.getElementById('hide_msg');

hide_msg.addEventListener('click', (e) => {
  ok_msg.style.display = 'none';
})

const displayMsg = msg => {
  ok_msg.style.display = 'block';
  window.scrollTo(0, 0);
  alert_msg.textContent = msg;
}
