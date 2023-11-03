// "modes" dizisi
const modes = [
  { mode_id: 1, mode_name: "angry", mode_image_path: "./image/mood/angry.jpg" },
  { mode_id: 2, mode_name: "flirt", mode_image_path: "./image/mood/flirt.jpg" },
  { mode_id: 3, mode_name: "hapy", mode_image_path: "./image/mood/hapy.jpg" },
  { mode_id: 4, mode_name: "kiss", mode_image_path: "./image/mood/kiss.jpg" },
  {
    mode_id: 5,
    mode_name: "lovely",
    mode_image_path: "./image/mood/lovely.jpg",
  },
  { mode_id: 6, mode_name: "sad", mode_image_path: "./image/mood/sad.jpg" },
  { mode_id: 7, mode_name: "shame", mode_image_path: "./image/mood/shame.jpg" },
  {
    mode_id: 8,
    mode_name: "shocked",
    mode_image_path: "./image/mood/shocked.jpg",
  },
  { mode_id: 9, mode_name: "sick", mode_image_path: "./image/mood/sick.jpg" },
  {
    mode_id: 10,
    mode_name: "side-eyes",
    mode_image_path: "./image/mood/side-eyes.jpg",
  },
  {
    mode_id: 11,
    mode_name: "slepy",
    mode_image_path: "./image/mood/slepy.jpg",
  },
  {
    mode_id: 12,
    mode_name: "unresponsive",
    mode_image_path: "./image/mood/unresponsive.jpg",
  },
];

const modeContent = $(".mode-content");

const createModeCard = (mode) => {
  const modeCard = `
      <div data-id="${mode.mode_id}" class="mode animate__animated animate__shakeX">
        <button>
          <img src="${mode.mode_image_path}" alt="${mode.mode_name}" />
        </button>
      </div>
    `;
  return modeCard;
};

const addModesToContent = () => {
  modeContent.empty();
  modes.forEach((mode) => {
    const modeCard = createModeCard(mode);
    modeContent.append(modeCard);
  });
};

// Sayfa yüklendiğinde modları ekleyin
addModesToContent();
