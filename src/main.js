import generateSummary from "./requests/aiSummaryRequest";
import generateSummaryPortal from "./requests/aiSummaryRequestPortal";
import updateKintone from "./requests/kintonePUTRequest";
import addRecord from "./requests/kintonePOSTRequest";
const appID = import.meta.env.VITE_KINTONE_PART_ONE_APPID;

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
  if (kintone.app.getId() == appID) {
    handleBasicAppRequest()
  } else {
    handlePortalAppRequest()
  }
}

const handleBasicAppRequest = async () => {
  let summary = await generateSummary()
  if (summary) {
    let updateResponse = await updateKintone(summary)
    if (updateResponse) {
      success.open()
      spinner.close()
    } else {
      error.open()
      spinner.close()
    }
  } else {
    error.open()
    spinner.close()
    console.log(summary)
  }
}

const handlePortalAppRequest = async () => {
  let summary = await generateSummaryPortal()
  if (summary) {
    let updateResponse = await addRecord(summary)
    if (updateResponse) {
      success.open()
      spinner.close()
    } else {
      error.open()
      spinner.close()
    }
  } else {
    error.open()
    spinner.close()
    console.log(summary)
  }
}