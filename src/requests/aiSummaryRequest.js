const domain = import.meta.env.VITE_KINTONE_BASE_URL; // our URL
const openAIToken = import.meta.env.VITE_OPEN_AI_TOKEN; // Our Open AI API token
const kintoneToken = import.meta.env.VITE_KINTONE_TOKEN; // Kintone API Token
const appID = import.meta.env.VITE_KINTONE_APPID; // Kintone App ID

export default async function generateSummary() {
  let transcriptFileKey = await fetchFileKeyFromKintone();
  let text = await getAttachment(transcriptFileKey);
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAIToken}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-16k",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: `Please summarize the following text as briefly as possible: ${text}` }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error generating summary: ${response.statusText}`, errorText);
      throw new Error(`Error generating summary: ${response.statusText}`);
    }

    const data = await response.json();
    const summary = data.choices[0].message.content;
    return summary;
  } catch (error) {
    console.error("Error generating summary:", error);
  }
}

const getAttachment = async (fileKey) => {
  console.log(domain);
  const url = `${domain}/k/v1/file.json?fileKey=${fileKey}`;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Cybozu-API-Token': kintoneToken,
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching file: ${response.statusText}`);
    }

    const blob = await response.blob();
    const text = await blob.text();
    return text;
  } catch (error) {
    console.error('Error fetching file from Kintone:', error);
  }
}

const fetchFileKeyFromKintone = async () => {
  const body = {
    'app': appID,
    'id': kintone.app.record.getId()
  };
  try {
    const response = await kintone.api(kintone.api.url('/k/v1/record.json', true), 'GET', body);
    const fileKey = response.record.transcript.value[0].fileKey;
    return fileKey;
  } catch (error) {
    console.error('Error fetching record:', error);
    throw error;
  }
}