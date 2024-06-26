// kintonePOSTRequest.js
export default async function addRecord(summaryText) {
  if (summaryText.includes('#BUSINESS#')) {
    let response = await addBusinessRecord(summaryText)
    return response
  } else if (summaryText.includes('#CASUAL#')) {
    let response = await addCasualRecord(summaryText)
    return response
  };
}

const addBusinessRecord = async (summary) => {
  const postBody = {
    app: import.meta.env.VITE_KINTONE_BUSINESS_APPID,
    record: {
      summary: {
        value: summary
      }
    }
  };
  const response = await kintone.api(kintone.api.url('/k/v1/record.json', true), 'POST', postBody);
  // Await the response from the update record API, and then return it.
  return response;
}

const addCasualRecord = async (summary) => {
  const postBody = {
    app: import.meta.env.VITE_KINTONE_CASUAL_APPID,
    record: {
      summary: {
        value: summary
      }
    }
  };
  const response = await kintone.api(kintone.api.url('/k/v1/record.json', true), 'POST', postBody);
  // Await the response from the update record API, and then return it.
  return response;
}