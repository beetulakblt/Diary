const modalImage = $(".post-image");
const modalText = $(".day-text");

$("body").on("click", ".event", function () {
  const postImage = $(this).find("input").val();
  const eventContent = $(this).find(".event-content").html();
  modalImage.attr("src", postImage);
  modalText.html(eventContent);

  $(".modal").modal("show");
});
