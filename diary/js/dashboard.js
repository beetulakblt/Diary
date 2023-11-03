const modeDegreesContainer = document.querySelector(".mode-degrees");

modes.forEach((mode) => {
  const modeIconId = mode.mode_id;
  const count = objelerDizisi.filter((obj) => obj.modID === modeIconId).length;
  const percentage = Math.round((count / objelerDizisi.length) * 100); // Round the percentage

  const barWidth = percentage + 12;

  const modeDegreeProgres = `
    <div class="mode-degree">
      <div class="mode-icon" id="${modeIconId}">
        <img src="${mode.mode_image_path}" alt="${mode.mode_name}" />
      </div>
      <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar" style="width: ${barWidth}%"><p>${percentage}%</p></div>
      </div>
    </div>`;

  modeDegreesContainer.innerHTML += modeDegreeProgres;
});
