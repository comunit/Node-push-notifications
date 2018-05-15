const publicVapidKey = 'BNox5DpG81o6pI7inaX0bI6427nIDGgBiG6IUMPXD1UcpIq1Kye4CYLZ4iKmRjtms8YnqtbQH80kdePIRt60HAc';

// check for service worker
if('serviceWorker' in navigator) {
  send().catch(err => console.error(err));
}

// register service worker, register push, send push
async function send() {
  // register service worker
  console.log('registring service worker...');
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  });
  console.log('service worker registered');

  // regiser push
  console.log('registered push...');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log('push registered');

  // send push notification
  console.log('sending push...');
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('push send....');
};

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}