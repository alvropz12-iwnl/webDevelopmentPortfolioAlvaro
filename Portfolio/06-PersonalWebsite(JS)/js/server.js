const scheduleForm = document.getElementById("activity-form");
const scheduleEntries = document.getElementById("schedule-entries");
const scheduleMessage = document.getElementById("schedule-message");
const startInput = scheduleForm.elements["start"];
const endInput = scheduleForm.elements["end"];
const activityInput = scheduleForm.elements["activity"];

function addToSchedule(event) {
  event.preventDefault();
  endInput.setCustomValidity("");
  activityInput.setCustomValidity("");

  if (endInput.value <= startInput.value) {
    endInput.setCustomValidity("End time must be later than start time.");
    endInput.reportValidity();
    scheduleMessage.textContent = "End time must be later than start time.";
    return;
  }

  const formData = new FormData(scheduleForm);
  const activity = activityInput.value.trim();

  if (!activity) {
    activityInput.setCustomValidity("Enter an activity.");
    activityInput.reportValidity();
    scheduleMessage.textContent = "Enter an activity.";
    return;
  }

  const busy = scheduleForm.elements["free-busy"].checked;
  const flag = formData.get("flag");
  const row = scheduleEntries.insertRow();
  const values = [
    formData.get("date"),
    startInput.value,
    endInput.value,
    activity,
    formData.get("place").trim(),
    scheduleForm.elements["type"].selectedOptions[0].textContent,
    formData.get("notes").trim()
  ];

  values.forEach((value) => {
    row.insertCell().textContent = value;
  });

  const statusCell = row.insertCell();
  const statusImage = document.createElement("img");
  statusImage.src = busy ? "images/busy.png" : "images/free.png";
  statusImage.alt = busy ? "Busy" : "Free";
  statusImage.width = 30;
  statusCell.appendChild(statusImage);

  // Show the chosen color as a compact marker in the new row.
  const flagCell = row.insertCell();
  const flagMarker = document.createElement("span");
  flagMarker.className = "schedule-flag";
  flagMarker.style.setProperty("--flag-color", flag);
  flagMarker.title = `Flag color: ${flag}`;
  flagCell.appendChild(flagMarker);

  // Confirm the added activity before clearing the form.
  scheduleMessage.textContent = `${activity} added to the schedule.`;
  scheduleForm.reset();
}

endInput.addEventListener("input", () => {
  endInput.setCustomValidity("");
});

startInput.addEventListener("input", () => {
  endInput.setCustomValidity("");
});

activityInput.addEventListener("input", () => {
  activityInput.setCustomValidity("");
});

scheduleForm.addEventListener("submit", addToSchedule);
