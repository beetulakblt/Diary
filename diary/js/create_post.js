let objelerDizisi = [];

// Ekle butonuna tıkladığında
$(".add-btn button").on("click", function () {
  let yeniObj = {
    id: createID(),
    image: base64Image,
    modID: modeID,
    htmlContent: "",
    tarih: new Date(),
  };

  objelerDizisi.push(yeniObj);
  yeniObj.htmlContent = editor.getData();
  uploadedImage.attr("src", "image/addImage.jpg");
  editor.setData("");
  saveObjelerDizisi();
  iziToast.show({
    title: "Hey",
    message: "Başarı ile kaydedildi!",
    position: "topCenter",
    image: "./image/success.jpg",
  });
  // updateEvents();
});

$(".mode").on("click", function () {
  modeID = $(this).data("id");
});

function createID() {
  let random_id = 100 + ~~(Math.random() * 100);
  let check_id = objelerDizisi.some((obj) => obj.id === random_id);
  if (!check_id) return random_id;
  else createID();
}
