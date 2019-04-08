window.onload = () => {
  const textarea = document.querySelector('textarea');
  const edit = document.getElementById('edit');
  const cancel = document.getElementById('cancel');
  const submit = document.getElementById('submit');
  const pending = document.getElementById('pending');

  fetch('./api/all')
    .then(res => res.json())
    .then(res => {
      textarea.value = JSON.stringify(res, null, 4);
    });

  edit.addEventListener('click', () => {
    textarea.disabled = false;
    edit.style.display = 'none';
    cancel.style.display = 'block';
    submit.style.display = 'block';
    cancel.disabled = false;
    submit.disabled = false;
  });

  cancel.addEventListener('click', () => {
    fetch('./api/all')
      .then(res => res.json())
      .then(res => {
        textarea.value = JSON.stringify(res, null, 4);
      });
    textarea.disabled = true;
    edit.style.display = 'block';
    cancel.style.display = 'none';
    submit.style.display = 'none';
  });

  submit.addEventListener('click', () => {
    const data = textarea.value;
    const init = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    };
    fetch('./api/submit', init)
      .then(res => res.json())
      .then(res => {
        textarea.value = JSON.stringify(res, null, 4);
        edit.style.display = 'block';
        pending.style.display = 'none';
      });
    textarea.disabled = true;
    cancel.style.display = 'none';
    submit.style.display = 'none';
    pending.style.display = 'block';
  });

};