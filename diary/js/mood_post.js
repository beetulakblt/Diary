$("body").on("click", ".up-down i", function () {
  var $modePost = $(this).closest(".mode-post");
  var $postContent = $modePost.find(".post-content");

  if ($postContent.height() === 100) {
    $postContent.css("height", "auto");
  } else {
    $postContent.css("height", "100px");
  }
});

$("body").on("click", ".mode-icon", function () {
  let iconId = $(this).attr("id");
  let iconImg = $(this).find("img").attr("src");
  $(".wheel").attr("src", iconImg);

  let moodPosts = objelerDizisi.filter((el) => el.modID == iconId);
  const modePostsContainer = $(".posts");

  modePostsContainer.empty();
  moodPosts.forEach((moodPost) => {
    const modePost = `
      <div class="mode-post">
        <div class="up-down"><i class="ri-arrow-down-s-line"></i></div>
        <div class="mode-postImg">
          <img src="${moodPost.image}" alt="" />
        </div>
        <div class="post-content">
            ${moodPost.htmlContent}
        </div>
      </div>`;

    modePostsContainer.append(modePost);
  });
});
