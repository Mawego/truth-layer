console.log("Truth Layer - Meta via Baseten LIVE");

function addTruthBadge(video) {
  if (video.dataset.truthLayerDone) return;
  video.dataset.truthLayerDone = "1";

  const badge = document.createElement("div");
  badge.textContent = "✓ Click to check AI";
  Object.assign(badge.style, {
    position: "absolute",
    top: "10px",
    left: "10px",
    zIndex: "999999",
    background: "#2563eb",
    color: "white",
    padding: "7px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "bold",
    fontFamily: "Arial, sans-serif",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.4)"
  });

  badge.onclick = async () => {
    badge.textContent = "🔍 Analyzing with Llama + SAM 3.1...";
    badge.style.background = "#f59e0b";
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 320;
      canvas.height = 180;
      canvas.getContext("2d").drawImage(video, 0, 0, 320, 180);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.5);

      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataUrl })
      });
      const data = await res.json();
      
      const score = data.score;
      const isAI = score > 60;
      
      if (isAI) {
        badge.textContent = `⚠️ AI ${score}% - ${data.reason}`;
        badge.style.background = "#dc2626";
      } else {
        badge.textContent = `✅ REAL ${100-score}% - ${data.reason}`;
        badge.style.background = "#16a34a";
      }
    } catch (err) {
      badge.textContent = "Click to retry - server offline?";
      badge.style.background = "#6b7280";
      console.error(err);
    }
  };

  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  wrapper.style.display = "inline-block";
  wrapper.style.width = "100%";
  video.parentNode.insertBefore(wrapper, video);
  wrapper.appendChild(video);
  wrapper.appendChild(badge);
}

setInterval(() => {
  document.querySelectorAll("video").forEach(addTruthBadge);
}, 1500);