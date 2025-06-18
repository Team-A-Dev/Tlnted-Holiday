// <!-- <script>
//     document.addEventListener('DOMContentLoaded', function () {
//       var calendarEl = document.getElementById('calendar');

//       var calendar = new FullCalendar.Calendar(calendarEl, {
//         initialView: 'dayGridMonth',
//         headerToolbar: {
//           left: 'prev,next today',
//           center: 'title',
//           right: 'dayGridMonth,timeGridWeek,timeGridDay'
//         },
//         editable: true, // ✅ Allow dragging/resizing events
//         selectable: true, // ✅ allow selecting multiple days
//         select: function(info) {
//           const title = prompt('Enter Event Title:');
//           if (title) {
//             calendar.addEvent({
//               title: title,
//               start: info.startStr,
//               end: info.endStr, // end is exclusive
//               allDay: true
//             });
//           }
//         },
//                 eventClick: function(info) {
//           const confirmDelete = confirm(`Delete the event: "${info.event.title}"?`);
//           if (confirmDelete) {
//             info.event.remove();
//           }
//         },
//         events: [
//           {
//             title: 'Example Event',
//             start: '2025-05-28',
//             end: '2025-05-30'
//           }
//         ]
//       });

//       calendar.render();
//     });
//   </script> -->
// <!-- <script>

//     document.addEventListener('DOMContentLoaded', function () {
//       const calendarEl = document.getElementById('calendar');
//       const addEventModal = document.getElementById('addEventModal');
//       const deleteEventModal = document.getElementById('deleteEventModal');
//       const eventTitleInput = document.getElementById('eventTitle');
//       const saveEventBtn = document.getElementById('saveEventBtn');
//       const cancelAddEvent = document.getElementById('cancelAddEvent');
//       const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
//       const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

//       let selectedInfo = null;
//       let eventToDelete = null;

//       const calendar = new FullCalendar.Calendar(calendarEl, {
//         initialView: 'dayGridMonth',
//         headerToolbar: {
//           left: 'prev,next today',
//           center: 'title',
//           right: 'dayGridMonth,timeGridWeek,timeGridDay'
//         },
//         selectable: true,
//         editable: true,

//         select: function(info) {
//           selectedInfo = info;
//           eventTitleInput.value = '';
//           addEventModal.style.display = 'flex';
//         },

//         eventClick: function(info) {
//           eventToDelete = info.event;
//           deleteEventModal.style.display = 'flex';
//         },

//         events: [
//           {
//             title: 'Example Event',
//             start: '2025-05-28',
//             end: '2025-05-30'
//           }
//         ]
//       });

//       calendar.render();

//       // Modal: Save Event
//       saveEventBtn.onclick = function () {
//         const title = eventTitleInput.value.trim();
//         if (title && selectedInfo) {
//           calendar.addEvent({
//             title: title,
//             start: selectedInfo.startStr,
//             end: selectedInfo.endStr,
//             allDay: true
//           });
//         }
//         addEventModal.style.display = 'none';
//         calendar.unselect();
//         selectedInfo = null;
//       };

//       cancelAddEvent.onclick = function () {
//         addEventModal.style.display = 'none';
//         calendar.unselect();
//         selectedInfo = null;
//       };

//       // Modal: Delete Event
//       confirmDeleteBtn.onclick = function () {
//         if (eventToDelete) {
//           eventToDelete.remove();
//         }
//         deleteEventModal.style.display = 'none';
//         eventToDelete = null;
//       };

//       cancelDeleteBtn.onclick = function () {
//         deleteEventModal.style.display = 'none';
//         eventToDelete = null;
//       };
      
//     });
//   </script> -->
// <!-- <script>
//     document.addEventListener('DOMContentLoaded', function () {
//       const calendarEl = document.getElementById('calendar');
//       const summaryContent = document.getElementById('summaryContent');

//       let selectedInfo = null;
//       let eventToDelete = null;

//       const calendar = new FullCalendar.Calendar(calendarEl, {
//         initialView: 'dayGridMonth',
//         headerToolbar: {
//           left: 'prev,next today',
//           center: 'title',
//           right: 'dayGridMonth,timeGridWeek,timeGridDay'
//         },
//         selectable: true,
//         editable: true,

//         select: function (info) {
//           const title = prompt('Enter Event Title (or leave blank to cancel):');
//           if (title && title.trim() !== '') {
//             calendar.addEvent({
//               title: title.trim(),
//               start: info.startStr,
//               end: info.endStr,
//               allDay: true,
//               backgroundColor: randomColor()
//             });
//             updateSummary();
//           }
//           calendar.unselect();
//         },

//         eventClick: function (info) {
//           if (confirm(`Delete the event: "${info.event.title}"?`)) {
//             info.event.remove();
//             updateSummary();
//           }
//         },

//         eventChange: function () {
//           // Called when event is dragged/resized
//           updateSummary();
//         },

//         events: [
//           {
//             title: 'Example Event',
//             start: '2025-05-28',
//             end: '2025-05-30',
//             backgroundColor: '#3788d8'
//           }
//         ]
//       });

//       calendar.render();

//       // Utility: Generate random pastel color for events
//       function randomColor() {
//         const hue = Math.floor(Math.random() * 360);
//         return `hsl(${hue}, 70%, 80%)`;
//       }

//       // Calculate days between two dates (inclusive start, exclusive end)
//       function daysBetween(start, end) {
//         const msPerDay = 1000 * 60 * 60 * 24;
//         return Math.round((new Date(end) - new Date(start)) / msPerDay);
//       }

//       // Group events by month and update the summary panel
//       function updateSummary() {
//         const events = calendar.getEvents();

//         if (events.length === 0) {
//           summaryContent.innerHTML = 'No events yet.';
//           return;
//         }

//         // Group by month: { "YYYY-MM": [events] }
//         const eventsByMonth = {};

//         events.forEach(event => {
//           const startDate = new Date(event.start);
//           const monthKey = startDate.toISOString().slice(0, 7); // "YYYY-MM"

//           if (!eventsByMonth[monthKey]) eventsByMonth[monthKey] = [];
//           eventsByMonth[monthKey].push(event);
//         });

//         // Build HTML
//         let html = '';

//         // Sort months ascending
//         const sortedMonths = Object.keys(eventsByMonth).sort();

//         sortedMonths.forEach(month => {
//           // Format month nicely, e.g. "2025-05" → "May 2025"
//           const date = new Date(month + '-01');
//           const monthName = date.toLocaleString('default', { month: 'long', year: 'numeric' });

//           html += `<div class="month-title">${monthName}</div>`;

//           eventsByMonth[month].forEach(event => {
//             // Duration in days (note: FullCalendar end is exclusive)
//             const durationDays = daysBetween(event.start, event.end);

//             // Use event.backgroundColor or default if undefined
//             const color = event.backgroundColor || '#3788d8';

//             html += `
//               <div class="event-summary">
//                 <div class="color-box" style="background-color: ${color};"></div>
//                 <div class="event-info">
//                   <div class="event-name">${event.title}</div>
//                   <div class="event-duration">${durationDays} day${durationDays > 1 ? 's' : ''}</div>
//                 </div>
//               </div>
//             `;
//           });
//         });

//         summaryContent.innerHTML = html;
//       }

//       // Initial summary update
//       updateSummary();

//     });
//   </script> -->
// <!-- <script>
//     document.addEventListener('DOMContentLoaded', function () {
//       const calendarEl = document.getElementById('calendar');
//       const summaryContent = document.getElementById('summaryContent');

//       const EVENT_COLOR = 'rgb(75, 245, 174)'; // ✅ Your fixed event color

//       const calendar = new FullCalendar.Calendar(calendarEl, {
//         initialView: 'dayGridMonth',
//         headerToolbar: {
//           left: 'prev,next today',
//           center: 'title',
//           right: 'dayGridMonth,timeGridWeek,timeGridDay'
//         },
//         selectable: true,
//         editable: true,
//         eventColor: EVENT_COLOR,
//         eventBorderColor: EVENT_COLOR,

//         select: function (info) {
//           const title = prompt('Enter Event Title (or leave blank to cancel):');
//           if (title && title.trim() !== '') {
//             calendar.addEvent({
//               title: title.trim(),
//               start: info.startStr,
//               end: info.endStr,
//               allDay: true,
//               backgroundColor: EVENT_COLOR,
//               borderColor: EVENT_COLOR
//             });
//             updateSummary();
//           }
//           calendar.unselect();
//         },

//         eventClick: function (info) {
//           if (confirm(`Delete the event: "${info.event.title}"?`)) {
//             info.event.remove();
//             updateSummary();
//           }
//         },

//         eventChange: function () {
//           updateSummary();
//         },

//         events: [
//           {
//             title: 'Example Event',
//             start: '2025-05-28',
//             end: '2025-05-30',
//             backgroundColor: EVENT_COLOR,
//             borderColor: EVENT_COLOR
//           }
//         ]
//       });

//       calendar.render();

//       function daysBetween(start, end) {
//         const msPerDay = 1000 * 60 * 60 * 24;
//         return Math.round((new Date(end) - new Date(start)) / msPerDay);
//       }

//       function updateSummary() {
//         const events = calendar.getEvents();

//         if (events.length === 0) {
//           summaryContent.innerHTML = 'No events yet.';
//           return;
//         }

//         const eventsByMonth = {};

//         events.forEach(event => {
//           const startDate = new Date(event.start);
//           const monthKey = startDate.toISOString().slice(0, 7);

//           if (!eventsByMonth[monthKey]) eventsByMonth[monthKey] = [];
//           eventsByMonth[monthKey].push(event);
//         });

//         let html = '';
//         const sortedMonths = Object.keys(eventsByMonth).sort();

//         sortedMonths.forEach(month => {
//           const date = new Date(month + '-01');
//           const monthName = date.toLocaleString('default', { month: 'long', year: 'numeric' });

//           html += `<div class="month-title">${monthName}</div>`;

//           eventsByMonth[month].forEach(event => {
//             const durationDays = daysBetween(event.start, event.end);
//             const color = EVENT_COLOR; // always fixed

//             html += `
//               <div class="event-summary">
//                 <div class="color-box" style="background-color: ${color};"></div>
//                 <div class="event-info">
//                   <div class="event-name">${event.title}</div>
//                   <div class="event-duration">${durationDays} day${durationDays > 1 ? 's' : ''}</div>
//                 </div>
//               </div>
//             `;
//           });
//         });

//         summaryContent.innerHTML = html;
//       }

//       updateSummary();
//     });
//   </script> -->
// <!-- <script>
//     document.addEventListener('DOMContentLoaded', function () {
//       const calendarEl = document.getElementById('calendar');
//       const summaryContent = document.getElementById('summaryContent');
//       const EVENT_COLOR = 'rgb(75, 245, 174)';

//       let calendar = new FullCalendar.Calendar(calendarEl, {
//         initialView: 'dayGridMonth',
//         headerToolbar: {
//           left: 'prev,next today',
//           center: 'title',
//           right: 'dayGridMonth,timeGridWeek,timeGridDay'
//         },
//         selectable: true,
//         editable: true,
//         eventColor: EVENT_COLOR,
//         eventBorderColor: EVENT_COLOR,

//         select: function (info) {
//           const title = prompt('Enter Event Title (or leave blank to cancel):');
//           if (title && title.trim() !== '') {
//             calendar.addEvent({
//               title: title.trim(),
//               start: info.startStr,
//               end: info.endStr,
//               allDay: true,
//               backgroundColor: EVENT_COLOR,
//               borderColor: EVENT_COLOR
//             });
//             updateSummary();
//           }
//           calendar.unselect();
//         },

//         eventClick: function (info) {
//           if (confirm(`Delete the event: "${info.event.title}"?`)) {
//             info.event.remove();
//             updateSummary();
//           }
//         },

//         eventChange: function () {
//           updateSummary();
//         },

//         datesSet: function () {
//           // Called whenever the visible calendar range changes (month/week/day)
//           updateSummary();
//         },

//         events: [
//           {
//             title: 'Example Event',
//             start: '2025-04-22',
//             end: '2025-04-30',
//             backgroundColor: EVENT_COLOR,
//             borderColor: EVENT_COLOR
//           }
//         ]
//       });

//       calendar.render();

//       function formatDate(dateStr) {
//         const date = new Date(dateStr);
//         const day = String(date.getDate()).padStart(2, '0');
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         return `${day}/${month}`;
//       }

//       function daysBetween(start, end) {
//         const msPerDay = 1000 * 60 * 60 * 24;
//         return Math.round((new Date(end) - new Date(start)) / msPerDay);
//       }

//       function updateSummary() {
//         const events = calendar.getEvents();
//         const currentStart = calendar.view.currentStart;
//         const currentEnd = calendar.view.currentEnd;

//         const visibleEvents = events.filter(event =>
//           event.start < currentEnd && event.end > currentStart
//         );

//         if (visibleEvents.length === 0) {
//           summaryContent.innerHTML = 'No events in this month.';
//           return;
//         }

//         // Month title
//         const currentMonthName = currentStart.toLocaleString('default', { month: 'long', year: 'numeric' });
//         let html = `<div class="month-title">${currentMonthName}</div>`;

//         visibleEvents.forEach(event => {
//           const durationDays = daysBetween(event.start, event.end);
//           const rangeText = `${formatDate(event.start)} to ${formatDate(event.end)}`;
//           html += `
//             <div class="event-summary">
//               <div class="color-box" style="background-color: ${EVENT_COLOR};"></div>
//               <div class="event-info">
//                 <div class="event-name">${event.title}</div>
//                 <div class="event-duration">${durationDays} day${durationDays > 1 ? 's' : ''}</div>
//                 <div class="event-range">${rangeText}</div>
//               </div>
//             </div>
//           `;
//         });

//         summaryContent.innerHTML = html;
//       }

//       updateSummary();
//     });
// </script> -->
// <!-- تعديل ال view الاخير -->
//   <!-- <script>
//     document.addEventListener('DOMContentLoaded', function () {
//       const calendarEl = document.getElementById('calendar');
//       const summaryContent = document.getElementById('summaryContent');

//       const modal = document.getElementById('eventModal');
//       const deleteModal = document.getElementById('deleteModal');
//       const backdrop = document.getElementById('modalBackdrop');

//       // Event Creation modal elements
//       const saveBtn = document.getElementById('saveEventBtn');
//       const cancelBtn = document.getElementById('cancelEventBtn');
//       const eventTitleInput = document.getElementById('eventTitle');

//       // Event Delete modal elements
//       const deleteMessage = document.getElementById('deleteMessage');
//       const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
//       const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

//       const EVENT_COLOR = 'rgb(75, 245, 174)';
//       let calendar;
//       let selectedInfo = null;
//       let eventToDelete = null;

//       // Open/Close modals
//       function openModal() {
//         modal.style.display = 'block';
//         backdrop.style.display = 'block';
//         eventTitleInput.value = '';
//         eventTitleInput.focus();
//       }

//       function closeModal() {
//         modal.style.display = 'none';
//         backdrop.style.display = 'none';
//         selectedInfo = null;
//       }

//       function openDeleteModal(event) {
//         eventToDelete = event;
//         deleteMessage.textContent = `Delete the event: "${event.title}"?`;
//         deleteModal.style.display = 'block';
//         backdrop.style.display = 'block';
//       }

//       function closeDeleteModal() {
//         deleteModal.style.display = 'none';
//         backdrop.style.display = 'none';
//         eventToDelete = null;
//       }

//       function formatDate(dateStr) {
//         const date = new Date(dateStr);
//         const day = String(date.getDate()).padStart(2, '0');
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         return `${day}/${month}`;
//       }

//       function daysBetween(start, end) {
//         const msPerDay = 1000 * 60 * 60 * 24;
//         return Math.round((new Date(end) - new Date(start)) / msPerDay);
//       }

//       function updateSummary() {
//         const events = calendar.getEvents();
//         const currentStart = calendar.view.currentStart;
//         const currentEnd = calendar.view.currentEnd;

//         const visibleEvents = events.filter(event =>
//           event.start < currentEnd && event.end > currentStart
//         );

//         if (visibleEvents.length === 0) {
//           summaryContent.innerHTML = 'No events in this month.';
//           return;
//         }

//         const currentMonthName = currentStart.toLocaleString('default', { month: 'long', year: 'numeric' });
//         let html = `<div class="month-title">${currentMonthName}</div>`;

//         visibleEvents.forEach(event => {
//           const durationDays = daysBetween(event.start, event.end);
//           const rangeText = `${formatDate(event.start)} to ${formatDate(event.end)}`;
//           html += `
//             <div class="event-summary">
//               <div class="color-box" style="background-color: ${EVENT_COLOR};"></div>
//               <div class="event-info">
//                 <div class="event-name">${event.title}</div>
//                 <div class="event-duration">${durationDays} day${durationDays > 1 ? 's' : ''}</div>
//                 <div class="event-range">${rangeText}</div>
//               </div>
//             </div>
//           `;
//         });

//         summaryContent.innerHTML = html;
//       }

// calendar = new FullCalendar.Calendar(calendarEl, {
//   initialView: 'dayGridMonth',
//   headerToolbar: {
//     left: 'today',
//     center: 'title',
//     right: 'prev,next'
//   },
//   selectable: true,
//   editable: true,
//   eventResizableFromStart: true,
//   eventColor: EVENT_COLOR,
//   eventBorderColor: EVENT_COLOR,

//   select: function (info) {
//     selectedInfo = info;
//     openModal();
//   },

//   eventClick: function (info) {
//     openDeleteModal(info.event);
//   },

//   eventDrop: function () {
//     updateSummary();
//   },

//   eventResize: function () {
//     updateSummary();
//   },

//   datesSet: function () {
//     updateSummary();
//   },

//   events: []
// });

// calendar.render();

// /// ✅ Add view buttons manually for mobile
// const toolbar = calendarEl.querySelector(".fc-header-toolbar");
// const customViewButtons = document.createElement("div");
// customViewButtons.className = "fc-custom-views";

// ["dayGridMonth", "timeGridWeek", "timeGridDay"].forEach(viewName => {
//   const btn = document.createElement("button");
//   btn.textContent = viewName;
//   btn.className = "fc-button fc-button-primary";
//   btn.addEventListener("click", () => {
//     calendar.changeView(viewName);
//   });
//   customViewButtons.appendChild(btn);
// });

// toolbar.appendChild(customViewButtons);

//       // ✅ Add view buttons manually
// const toolbar = calendarEl.querySelector(".fc-header-toolbar");

// // Create new div for custom view buttons
// const customViewButtons = document.createElement("div");
// customViewButtons.className = "fc-custom-views";

// // Create buttons and append them
// ["Month", "Week", "Day"].forEach(viewName => {
//   const btn = document.createElement("button");
//   btn.textContent = viewName;
//   btn.className = "fc-button fc-button-primary";
//   btn.addEventListener("click", () => {
//     calendar.changeView(viewName);
//   });
//   customViewButtons.appendChild(btn);
// });

// // Append buttons div to toolbar
// toolbar.appendChild(customViewButtons);
//       // Save new event from creation modal
//       saveBtn.addEventListener('click', function () {
//         const title = eventTitleInput.value.trim();
//         if (title && selectedInfo) {
//           calendar.addEvent({
//             title: title,
//             start: selectedInfo.startStr,
//             end: selectedInfo.endStr,
//             allDay: true,
//             backgroundColor: EVENT_COLOR,
//             borderColor: EVENT_COLOR
//           });
//         }
//         closeModal();
//         updateSummary();
//       });

//       cancelBtn.addEventListener('click', function () {
//         closeModal();
//       });

//       // Delete event modal buttons
//       confirmDeleteBtn.addEventListener('click', function () {
//         if (eventToDelete) {
//           eventToDelete.remove();
//           updateSummary();
//         }
//         closeDeleteModal();
//       });

//       cancelDeleteBtn.addEventListener('click', function () {
//         closeDeleteModal();
//       });

//       // Clicking outside modals closes any open modal
//       backdrop.addEventListener('click', function () {
//         if (modal.style.display === 'block') closeModal();
//         if (deleteModal.style.display === 'block') closeDeleteModal();
//       });
//     });
//   </script> -->