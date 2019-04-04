window.onload = () => {
  fetch('./api')
    .then(res => res.json())
    .then(res => {
      console.log(res);
      document.getElementById('newTodo').innerHTML = JSON.stringify(res);
    })
};