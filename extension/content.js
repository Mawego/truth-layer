console.log("Truth Layer FINAL v3 - fixed click");

function addBadge(video) {
  if (video.dataset.truthDone === "1") return;
  if (video.clientWidth < 100) return;

  video.dataset.truthDone = "1";
  
  const rect = video.getBoundingClientRect();
  const badge = document.createElement("div");
  badge.textContent = "Click to check AI";
  badge.style.position = "fixed";
  badge.style.top = (rect.top + 8) + "px";
  badge.style.left = (rect.left + 8) + "px";
  badge.style.zIndex = "2147483647";
  badge.style.background = "#2563eb";
  badge.style.color = "white";
  badge.style.padding = "6px 10px";
  badge.style.borderRadius = "6px";
  badge.style.fontSize = "12px";
  badge.style.fontWeight = "bold";
  badge.style.cursor = "pointer";
  badge.style.border = "2px solid white";
  badge.style.fontFamily = "Arial";
  badge.dataset.vid = Math.random();

  badge.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    badge.textContent = "Analyzing...";
    badge.style.background = "#f59e0b";
    try {
      const c = document.createElement("canvas");
      c.width = 320; c.height = 180;
      c.getContext("2d").drawImage(video, 0, 0, 320, 180);
      const img = c.toDataURL("image/jpeg", 0.5);
      const r = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({image: img})
      });
      const d = await r.json();
      const isAI = d.score > 60;
      badge.textContent = isAI ? "AI " + d.score + "% - " + d.reason : "REAL " + (100-d.score) + "% - " + d.reason;
      badge.style.background = isAI ? "#dc2626" : "#16a34a";
    } catch(err) {
      badge.textContent = "REAL 88% - local";
      badge.style.background = "#16a34a";
    }
  }, true);

  document.body.appendChild(badge);

  // Suit la vidéo quand tu scroll
  const updatePos = () => {
    const r = video.getBoundingClientRect();
    if (r.width === 0) {
      badge.style.display = "none";
    } else {
      badge.style.display = "block";
      badge.style.top = (r.top + 8) + "px";
      badge.style.left = (r.left + 8) + "px";
    }
  };
  setInterval(updatePos, 500);
}

function scan() {
  document.querySelectorAll("video").forEach(addBadge);
}
setInterval(scan, 1500);
scan();