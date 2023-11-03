const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const eventsArr = [];
getEvents();
//console.log(eventsArr);

//takvimdeki günler
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    //check if event is present on that day
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      //updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

//önceki ay
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}
// sonraki ay
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//function to add active on day
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      // updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //remove active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //if clicked prev-date or next-date switch to that month
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //add active to clicked day afte month is change
        setTimeout(() => {
          //add active where no prev-date or next-date
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //add active to clicked day afte month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

//mevcut tarihe dönüş yapar.
todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

//geçerli tarihi ayarlar.
dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

//belirtilen tarihe gidilir
gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

//etkin günün adını ve tarihini günceller
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const options = { weekday: "long" };
  const dayName = day.toLocaleDateString("tr-TR", options);
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
  getActiveDayPost(day);
}

function getActiveDayPost(selectedDate) {
  let selectedDayPost = objelerDizisi.map((element) => {
    const date = moment(element.tarih).format("MMM Do YY");
    return {
      ...element, // Diğer özellikleri koruyun
      tarih: date, // Tarihi değiştirin
    };
  });

  let filterData = selectedDayPost.filter(
    (el) => el.tarih == moment(selectedDate).format("MMM Do YY")
  );
  updatePostList(filterData);
}
function updatePostList(filterArr) {
  let postGroup = "";

  filterArr.forEach((val, ind) => {
    const mode = modes.find((mode) => mode.mode_id === val.modID);
    let postItem = `<div class="event">
                      <input type="hidden" value="${val.image}">
                      <div class="event-mod"><img src="${mode.mode_image_path}"/></div>
                      <div class="event-content">${val.htmlContent}</div>
                    </div>`;
    postGroup += postItem;
  });
  eventsContainer.innerHTML = postGroup;
}

//etkin gün için etkinlikleri günceller
// function updateEvents(date) {
//   let events = "";
//   eventsArr.forEach((event) => {
//     if (
//       date === event.day &&
//       month + 1 === event.month &&
//       year === event.year
//     ) {
//       event.events.forEach((event) => {
//         events += `<div class="event">
//             <div class="title">
//               <i class="fas fa-circle"></i>
//               <h3 class="event-title">${event.title}</h3>
//             </div>
//             <div class="event-time">
//               <span class="event-time">${event.time}</span>
//             </div>
//         </div>`;
//       });
//     }
//   });
//   if (events === "") {
//     events = `<div class="no-event">
//             <h3>No Events</h3>
//         </div>`;
//   }
//   eventsContainer.innerHTML = events;
//   saveEvents();
// }

//etkinlikleri yerel depolama kullanarak kaydeder.
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

//etkinlikleri yerel depolamadan alır
function getEvents() {
  //check if events are already saved in local storage then return event else nothing
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}
