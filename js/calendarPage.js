
    document.addEventListener('DOMContentLoaded', function () {
      const calendarEl = document.getElementById('calendar');
      const summaryContent = document.getElementById('summaryContent');

      const modal = document.getElementById('eventModal');
      const deleteModal = document.getElementById('deleteModal');
      const backdrop = document.getElementById('modalBackdrop');

      // Event Creation modal elements
      const saveBtn = document.getElementById('saveEventBtn');
      const cancelBtn = document.getElementById('cancelEventBtn');
      const eventTitleInput = document.getElementById('eventTitle');

      // Event Delete modal elements
      const deleteMessage = document.getElementById('deleteMessage');
      const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
      const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

      const EVENT_COLOR = 'rgb(75, 245, 174)';
      let calendar;
      let selectedInfo = null;
      let eventToDelete = null;

      
      // Open/Close modals
      function openModal() {
        modal.style.display = 'block';
        backdrop.style.display = 'block';
        eventTitleInput.value = '';
        eventTitleInput.focus();
      }

      function closeModal() {
        modal.style.display = 'none';
        backdrop.style.display = 'none';
        selectedInfo = null;
      }

      function openDeleteModal(event) {
        eventToDelete = event;
        deleteMessage.textContent = `Delete the event: "${event.title}"?`;
        deleteModal.style.display = 'block';
        backdrop.style.display = 'block';
      }

      function closeDeleteModal() {
        deleteModal.style.display = 'none';
        backdrop.style.display = 'none';
        eventToDelete = null;
      }

      function formatDate(dateStr) {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day}/${month}`;
      }

      function daysBetween(start, end) {
        const msPerDay = 1000 * 60 * 60 * 24;
        return Math.round((new Date(end) - new Date(start)) / msPerDay);
      }

      function updateSummary() {
        const events = calendar.getEvents();
        const currentStart = calendar.view.currentStart;
        const currentEnd = calendar.view.currentEnd;

        const visibleEvents = events.filter(event =>
          event.start < currentEnd && event.end > currentStart
        );

        if (visibleEvents.length === 0) {
          summaryContent.innerHTML = 'No events in this month.';
          return;
        }

        const currentMonthName = currentStart.toLocaleString('default', { month: 'long', year: 'numeric' });
        let html = `<div class="month-title">${currentMonthName}</div>`;

        visibleEvents.forEach(event => {
          const durationDays = daysBetween(event.start, event.end);
          const rangeText = `${formatDate(event.start)} to ${formatDate(event.end)}`;
          html += `
            <div class="event-summary">
              <div class="color-box" style="background-color: ${EVENT_COLOR};"></div>
              <div class="event-info">
                <div class="event-name">${event.title}</div>
                <div class="event-duration">${durationDays} day${durationDays > 1 ? 's' : ''}</div>
                <div class="event-range">${rangeText}</div>
              </div>
            </div>
          `;
        });

        summaryContent.innerHTML = html;
      }

      const storedEvents = JSON.parse(localStorage.getItem('userEvents')) || [];

      calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        selectable: true,
        editable: true,
        eventResizableFromStart: true,
        eventColor: EVENT_COLOR,
        eventBorderColor: EVENT_COLOR,

        select: function (info) {
          selectedInfo = info;
          openModal();
        },

        eventClick: function (info) {
          openDeleteModal(info.event);
        },

        eventDrop: function () {
          updateSummary();
        },

        eventResize: function () {
          updateSummary();
        },

        datesSet: function () {
          updateSummary();
        },

        events: storedEvents
      });

      calendar.render();

      // Save new event from creation modal
      saveBtn.addEventListener('click', function () {
        const title = eventTitleInput.value.trim();
        if (title && selectedInfo) {
          calendar.addEvent({
            title: title,
            start: selectedInfo.startStr,
            end: selectedInfo.endStr,
            allDay: true,
            backgroundColor: EVENT_COLOR,
            borderColor: EVENT_COLOR
          });
        }
        closeModal();
        updateSummary();
      });

      cancelBtn.addEventListener('click', function () {
        closeModal();
      });

      // Delete event modal buttons
      confirmDeleteBtn.addEventListener('click', function () {
        if (eventToDelete) {
          eventToDelete.remove();
          updateSummary();
        }
        closeDeleteModal();
      });

      cancelDeleteBtn.addEventListener('click', function () {
        closeDeleteModal();
      });

      // Clicking outside modals closes any open modal
      backdrop.addEventListener('click', function () {
        if (modal.style.display === 'block') closeModal();
        if (deleteModal.style.display === 'block') closeDeleteModal();
      });
      document.getElementById('nextBtn').addEventListener('click', function (e) {
        const events = calendar.getEvents();
        const eventData = events.map(ev => ({
          title: ev.title,
          start: ev.startStr,
          end: ev.endStr
        }));
      
        localStorage.setItem('userEvents', JSON.stringify(eventData));
      });
    });


