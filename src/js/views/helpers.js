import { TIMEOUT_SEC } from '../config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const data1 = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data2 = await data1.json();

    if (!data1.ok) throw new Error(`${data2.message} ${data1.status}`);
    return data2;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const data1 = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data2 = await data1.json();

    if (!data1.ok) throw new Error(`${data2.message} ${data1.status}`);
    return data2;
  } catch (err) {
    throw err;
  }
};
