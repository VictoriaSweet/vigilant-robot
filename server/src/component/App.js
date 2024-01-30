const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
var now = new Date();
var currentHour = now.getHours();
let scheduleInfos = ["", "", "", "", "", "", "", "", ""];

const key = "scheduleData";

const localStorageSchedule = localStorage.getItem(key);

if (localStorageSchedule != null) {
  scheduleInfos = JSON.parse(localStorageSchedule);
}
const clock = document.getElementById("clock");
clock.innerHTML = now;

$(function () {
  const hourBlock = $("#hour-block");
  for (let index = 0; index < hours.length; index++) {
    const hour = hours[index];
    const scheduleInfo = scheduleInfos[index];
    let ampm = "AM";
    let time = `${hour}AM`;
    if (hour > 11) {
      ampm = "PM";
      time = `${hour - 12}${ampm}`;
    }

    if (hour == 12) {
      ampm = "PM";
      time = `${hour}${ampm}`;
    }

    let perspective = "past";

    if (currentHour == hour) {
      perspective = "present";
    }

    if (currentHour < hour) {
      perspective = "future";
    }

    $(hourBlock).append(
      `<div id="hour-${hour}" class="row time-block ${perspective}">
        <div class="col-2 col-md-1 hour text-center py-3">${time}</div>
        <textarea class="col-8 col-md-10 description" rows="3">${scheduleInfo}</textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>`
    );

    let button = $(`#hour-${hour} button`);
    button.on("click", function () {
      saveUserData();
    });

    function saveUserData() {
      const key = "scheduleData";

      const localStorageSchedule = localStorage.getItem(key);

      if (localStorageSchedule != null) {
        scheduleInfos = JSON.parse(localStorageSchedule);
      }

      let textarea = $(`#hour-${hour} textarea`);

      // put it in the array
      scheduleInfos[index] = textarea.val();

      const scheduleJSON = JSON.stringify(scheduleInfos);
      localStorage.setItem(key, scheduleJSON);
    }
  }
});