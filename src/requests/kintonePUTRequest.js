// kintonePUTRequest.js

// A function to update our Kintone record all in one go. We'll be calling the uploadFile function above in here.
export default async function updateKintone(recordID, summaryText) {
  const putBody = {
    app: import.meta.env.VITE_KINTONE_APPID,
    id: recordID,
    record: {
      summary: {
        value: summaryText
      },
    }
  };
  const response = await kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', putBody);
  // Await the response from the update record API, and then return it.
  return response;
}