// Die Alltagshelfer — Kundenbereich (Demo)

// Ansichten wechseln
const links = document.querySelectorAll(".sb-link");
const views = document.querySelectorAll(".view");
const viewTitle = document.getElementById("viewTitle");

const titles = {
  uebersicht: "Übersicht",
  dokumente: "Dokumente",
  assistent: "KI-Assistent",
  automatisierungen: "Automatisierungen",
  einstellungen: "Einstellungen",
};

links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    const view = link.dataset.view;
    views.forEach((v) => v.classList.toggle("active", v.id === "view-" + view));
    viewTitle.textContent = titles[view];
  });
});

// Kennzahlen hochzählen
const animateCount = (el) => {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  const suffix = el.dataset.suffix || "";
  const duration = 1200;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent =
      (eased * target).toFixed(decimals).replace(".", ",") + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
document.querySelectorAll("[data-count]").forEach(animateCount);

// Automatisierungs-Schalter
document.querySelectorAll(".switch").forEach((sw) => {
  sw.addEventListener("click", () => {
    sw.classList.toggle("on");
    sw.setAttribute("aria-checked", sw.classList.contains("on"));
  });
});

// Demo-Chat mit vorbereiteten Antworten
const chatForm = document.getElementById("chatForm");
const chatText = document.getElementById("chatText");
const chatLog = document.getElementById("chatLog");

const cannedReplies = [
  "Gern! Diese Woche wurden 248 Aufgaben automatisch erledigt und 12,5 Stunden eingespart. Die Details habe ich in der Übersicht hinterlegt.",
  "Ich habe 3 offene Auffälligkeiten in der Buchhaltung gefunden. Die wichtigste: eine mögliche Doppelbuchung über 1.240 €.",
  "Zusammenfassung erstellt: 42 Belege analysiert, 8 Dokumente zugeordnet, 1 Frist am 24.06. im Blick. Soll ich den Bericht als PDF vorbereiten?",
  "In dieser Demo antworte ich mit Beispieldaten. In der echten Anwendung greife ich sicher auf Ihre Unternehmensdaten zu.",
];
let replyIndex = 0;

if (chatForm) {
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatText.value.trim();
    if (!text) return;

    const userMsg = document.createElement("div");
    userMsg.className = "msg user";
    userMsg.textContent = text;
    chatLog.appendChild(userMsg);
    chatText.value = "";
    chatLog.scrollTop = chatLog.scrollHeight;

    setTimeout(() => {
      const botMsg = document.createElement("div");
      botMsg.className = "msg bot";
      botMsg.textContent = cannedReplies[replyIndex % cannedReplies.length];
      replyIndex++;
      chatLog.appendChild(botMsg);
      chatLog.scrollTop = chatLog.scrollHeight;
    }, 650);
  });
}
