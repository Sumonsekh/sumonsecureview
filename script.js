document.getElementById('uploadForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const type = document.getElementById('contentType').value;
  const file = document.getElementById('contentFile').files[0];
  const message = document.getElementById('textMessage').value;

  // Simple validation
  if (!type) {
    alert('দয়া করে কন্টেন্ট টাইপ নির্বাচন করুন');
    return;
  }

  const formData = new FormData();
  formData.append('type', type);

  if (type === 'text') {
    if (!message) {
      alert('দয়া করে মেসেজ লিখুন');
      return;
    }
    formData.append('message', message);
  } else {
    if (!file) {
      alert('দয়া করে ফাইল নির্বাচন করুন');
      return;
    }
    formData.append('file', file);
  }

  // Backend API call
  const res = await fetch('https://your-backend-api.com/upload', {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  if (data.success) {
    document.getElementById('shareLink').value = data.link;
    document.getElementById('result').classList.remove('hidden');
  } else {
    alert('কিছু ভুল হয়েছে');
  }
});

document.getElementById('copyBtn').addEventListener('click', function() {
  const link = document.getElementById('shareLink');
  link.select();
  document.execCommand('copy');
  alert('লিংক কপি হয়েছে!');
});
