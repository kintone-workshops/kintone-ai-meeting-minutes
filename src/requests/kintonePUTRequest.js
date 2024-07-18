// kintonePUTRequest.js
export default async function updateKintone(summaryText) {
  let type;
  if (summaryText.includes('#BUSINESS#')) {
    type = 'Business';
  } else if (summaryText.includes('#CASUAL#')) {
    type = 'Casual';
  };
  
  const putBody = {
    app: import.meta.env.VITE_KINTONE_PART_ONE_APPID,
    id: kintone.app.record.getId(),
    record: {
      summary: {
        value: summaryText
      },
      type: {
        value: type
      }
    }
  };
  const response = await kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', putBody);
  // Await the response from the update record API, and then return it.
  return response;
}