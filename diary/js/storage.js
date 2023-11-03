function saveObjelerDizisi() {
  localStorage.setItem("objelerDizisi", JSON.stringify(objelerDizisi));
}

function loadObjelerDizisi() {
  let storageData = localStorage.getItem("objelerDizisi");

  if (storageData && storageData != null) {
    objelerDizisi = JSON.parse(storageData);
  } else {
    localStorage.setItem("objelerDizisi", []);
  }
}

loadObjelerDizisi();
