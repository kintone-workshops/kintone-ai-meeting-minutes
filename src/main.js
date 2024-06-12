import generateSummary from "./requests/aiSummaryRequest";
import updateKintone from "./requests/kintonePUTRequest";

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

success.addEventListener('close', event => {
  location.reload()
});


kintone.events.on('app.record.detail.show', event => {
  const header = kintone.app.record.getHeaderMenuSpaceElement();
  header.style.padding = "20px 0px 0px 20px"
  const button = new Kuc.Button({
    text: 'Generate Meeting Minutes',
    type: 'submit'
  });
  button.addEventListener('click', () => {
    onGenerateButtonClicked()
  });

  header.appendChild(button);
  return event;
});

const onGenerateButtonClicked = async () => {
  spinner.open();
  let summary = await generateSummary()
  if (summary) {
    let updateResponse = await updateKintone(summary)
    console.log(updateResponse)
    if (updateResponse) {
      success.open()
      spinner.close()
    } else {
      error.open()
      spinner.close()
      console.log(updateResponse)
    }
  } else {
    error.open()
    spinner.close()
    console.log(summary)
  }
}