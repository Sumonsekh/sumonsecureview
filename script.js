function uploadContent() {
  const type = document.getElementById("type").value;
  const content = document.getElementById("content").value;
  const accessId = Math.random().toString(36).substring(2, 10);

  fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ type, content, accessId })
  })
  .then(res => res.json())
  .then(data => {
    if (data.message) {
      const link = `${window.location.origin}/view/${accessId}`;
      document.getElementById("generatedLink").href = link;
      document.getElementById("generatedLink").innerText = link;
      document.getElementById("linkSection").classList.remove("hidden");
    }
  });
}
