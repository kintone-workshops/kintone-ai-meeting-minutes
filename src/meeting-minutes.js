const spinner = new Kuc.Spinner({
  text: 'now loading...',
  container: document.body
});

const error = new Kuc.Notification({
  text: 'Error occurred!',
  type: 'danger',
  className: 'options-class',
  duration: 2000,
  container: document.body
});

const success = new Kuc.Notification({
  text: 'Success!',
  type: 'success',
  className: 'options-class',
  duration: 2000,
  container: document.body
});


kintone.events.on('app.record.detail.show', event => {
  const header = kintone.app.record.getHeaderMenuSpaceElement();
  header.style.padding = "20px 0px 0px 20px"
  const button = new Kuc.Button({
    text: 'Generate Meeting Minutes',
    type: 'submit'
  });
  button.addEventListener('click', clickEvent => {
    console.log("Generating...");
    spinner.open();
  });

  header.appendChild(button);
  return event;
});