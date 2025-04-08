declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (e: 'event', action: string, variant_name: Record<string, string>) => void;
  }
}

interface Payload {
  destination: string;
  delivery_date: string;
  delivery_time: string;
  comments: string;
}

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      'https://script.google.com/macros/s/AKfycbyHesqFqEnVPEgLfdG2CGw5BJKQABzt5e9XLXV8eX7lBkaOCpjaN9GnDmqtGEDUPYU/exec',
      {
        redirect: 'follow',
        method: 'POST',
        body: JSON.stringify({ date, variant: 'var1', ...payload }),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      },
    );
  } catch (error) {
    console.error('Error!', error);
  }
};
