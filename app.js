const storageKey = "finance-demo-amounts";
const formatter = new Intl.NumberFormat("da-DK", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function parseAmount(value) {
  const normalized = value
    .trim()
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : null;
}

function loadAmounts() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "{}");
  } catch {
    return {};
  }
}

function saveAmounts(amounts) {
  localStorage.setItem(storageKey, JSON.stringify(amounts));
}

const amounts = loadAmounts();

document.querySelectorAll(".money").forEach((button) => {
  const key = button.dataset.key;

  if (Object.prototype.hasOwnProperty.call(amounts, key)) {
    button.textContent = formatter.format(amounts[key]);
  }

  button.addEventListener("click", () => {
    const current = button.textContent || "0,00";
    const next = window.prompt("Indtast demobeløb", current);

    if (next === null) {
      return;
    }

    const parsed = parseAmount(next);

    if (parsed === null) {
      window.alert("Skriv et tal, fx 1234,56");
      return;
    }

    amounts[key] = parsed;
    button.textContent = formatter.format(parsed);
    saveAmounts(amounts);
  });
});
