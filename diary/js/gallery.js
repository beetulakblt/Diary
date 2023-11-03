lightGallery(document.querySelector(".gallery"));

//objelerDizisinden fotoğrafları yükle
const gallery = document.querySelector(".gallery");
objelerDizisi.forEach((obje) => {
  const galleryPhoto = `<a href="${obje.image}">
            <img src="${obje.image}" alt="" />
            <button class="fav" data-id="${obje.id}"><i class="ri-heart-line"></i></button>
        </a>`;
  gallery.innerHTML += galleryPhoto;
});

//dizi oluştur-local den al
let favoriResimler = JSON.parse(localStorage.getItem("favoriResimler")) || [];
const favoriteButtons = document.querySelectorAll(".fav");
const carouselInner = document.querySelector(".carousel-inner");

//localStorage'dan alınan favoriResimler'i carouselInner'a ekle
favoriResimler.forEach((imgSrc) => {
  const slidePhoto = `
      <div class="carousel-item active">
        <img src="${imgSrc}" class="d-block" id="gallery-photo" alt="..." />
      </div>`;

  carouselInner.innerHTML += slidePhoto;
});

// Favori resimlerinizi carousel içeriğine göre güncelleyen fonksiyon
function updateCarouselWithFavorites() {
  carouselInner.innerHTML = "";

  // FavoriResimler dizisindeki her resmi carousel'e ekleyin
  favoriResimler.forEach((imgSrc) => {
    const slidePhoto = `
        <div class="carousel-item active">
          <img src="${imgSrc.image_path}" class="d-block" id="gallery-photo" alt="..." />
        </div>`;

    // Carousel içeriğine yeni resmi ekle
    carouselInner.innerHTML += slidePhoto;
  });
}

// Sayfa yenilendiğinde, localStorage'dan alınan favoriResimler'i carouselInner'a ekleyin
updateCarouselWithFavorites();

// Favori butonlarının tıklama işlevi

$("body").on("click", ".fav", function () {
  let $thisButton = $(this);
  let thisImageId = $thisButton.data("id");
  let thisImagePath = $thisButton.siblings("img").attr("src");
  let $thisButtonIcon = $thisButton.children("i");

  // icon durumu
  if ($thisButtonIcon.hasClass("ri-heart-fill")) {
    $thisButtonIcon
      .removeClass("ri-heart-fill")
      .addClass("ri-heart-line")
      .css("color", "black");
  } else {
    $thisButtonIcon
      .removeClass("ri-heart-line")
      .addClass("ri-heart-fill")
      .css("color", "red");
  }

  let carouselStatus = favoriResimler.some(
    (obje) => obje.image_id == thisImageId
  );
  console.log(carouselStatus);

  if (carouselStatus) {
    // Silme işlemi
    favoriResimler = favoriResimler.filter(
      (obje) => obje.image_id != thisImageId
    );
  } else {
    let favImageObj = { image_id: null, image_path: null };
    favImageObj.image_id = thisImageId;
    favImageObj.image_path = thisImagePath;
    favoriResimler.push(favImageObj);
  }

  localStorage.setItem("favoriResimler", JSON.stringify(favoriResimler));

  updateCarouselWithFavorites();
});

// favoriteButtons.forEach((favButton, index) => {
//   const icon = $(favButton).find("i");
//   favButton.addEventListener("click", function () {
//     const imageSrc = objelerDizisi[index].image;
//     const indexOfImage = favoriResimler.indexOf(imageSrc);

//     if (indexOfImage !== -1) {
//       // Eğer resim favorilerde varsa
//       if (confirm("Favorilerden kaldırmak istediğinize emin misiniz?")) {
//         // FavoriResimler dizisinden resmi kaldır
//         favoriResimler.splice(indexOfImage, 1);
//         localStorage.setItem("favoriResimler", JSON.stringify(favoriResimler));
//         updateCarouselWithFavorites();

//         // Iconu "ri-heart-fill" yap ve rengini siyah yap
//         icon
//           .removeClass("ri-heart-fill")
//           .addClass("ri-heart-line")
//           .css("color", "black");
//       }
//     } else {
//       // Eğer resim favorilerde yoksa
//       favoriResimler.push(imageSrc);
//       localStorage.setItem("favoriResimler", JSON.stringify(favoriResimler));
//       updateCarouselWithFavorites();

//       // Iconu "ri-heart-line" yap ve rengini kırmızı yap
//       icon
//         .removeClass("ri-heart-line")
//         .addClass("ri-heart-fill")
//         .css("color", "red");
//     }
//   });
// });
