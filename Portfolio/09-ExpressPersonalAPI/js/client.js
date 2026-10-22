async function loadPage(url, options) {
  try {
    const response = await fetch(url, options);
    const html = await response.text();
    const page = new DOMParser().parseFromString(html, "text/html");

    // Replace the content without changing the address in the browser.
    document.body.replaceWith(page.body);
    document.title = page.title;
  } catch (error) {
    const message = document.getElementById("request-message");

    if (message) {
      message.textContent = "The server could not be reached. Please try again.";
    }
  }
}

document.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.target;
  const method = form.dataset.method || form.method.toUpperCase();
  const data = new URLSearchParams(new FormData(form));

  if (event.submitter && event.submitter.name) {
    data.set(event.submitter.name, event.submitter.value);
  }

  if (method === "GET") {
    loadPage(form.action + "?" + data.toString());
  } else {
    loadPage(form.action, { method, body: data });
  }
});

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-page]");

  if (link) {
    event.preventDefault();
    loadPage(link.href);
  }
});
