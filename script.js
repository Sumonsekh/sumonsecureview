// Preview selected file
document.getElementById('fileInput').addEventListener('change', function (e) {
  const file = e.target.files[0];
  const preview = document.getElementById('preview');
  preview.innerHTML = '';

  if (file) {
    const url = URL.createObjectURL(file);
    if (file.type.startsWith('image')) {
      const img = document.createElement('img');
      img.src = url;
      img.style.maxWidth = '100%';
      preview.appendChild(img);
    } else if (file.type.startsWith('video')) {
      const vid = document.createElement('video');
      vid.src = url;
      vid.controls = true;
      vid.style.maxWidth = '100%';
      preview.appendChild(vid);
    } else if (file.type.startsWith('audio')) {
      const aud = document.createElement('audio');
      aud.src = url;
      aud.controls = true;
      preview.appendChild(aud);
    }
  }
});

// Try to detect screenshot
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    alert("⚠️ Warning: Screenshot or screen-recording might be happening!");
  }
});

// Form submission
document.getElementById('uploadForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert("✅ Form submitted! (No backend connected yet)");
});
