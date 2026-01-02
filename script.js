const dynamicText  = document.querySelector("h1 span")
const words = ["espresso","ristretto","lungo","latte","cappuccino","macchiato","frappé","moka"];
let wordIndex = 0;
let characterIndex = 1;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex]
    const currentCharacter = currentWord.substring(0, characterIndex);
    dynamicText.textContent = currentCharacter
    dynamicText.classList.add("stop-blinking")

    if (!isDeleting && characterIndex < currentWord.length) {
        characterIndex ++
        setTimeout(typeEffect, 200)
    } else if (isDeleting && characterIndex > 0) {
        characterIndex --
        setTimeout(typeEffect, 100)
    } else {
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking")
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex
        setTimeout(typeEffect, 1200)
    }
}

typeEffect()

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry)=>{
        if (entry.isIntersecting) {
            entry.target.classList.add("show")
        } else  {
            entry.target.classList.remove("show")
        }
    })
}, {})

const elements = document.querySelectorAll("img")
elements.forEach(el => observer.observe(el))

//  Calendar from https://github.com/WingsBRStudio/javascripts/blob/main/Calendar-with-Events

document.addEventListener('DOMContentLoaded', function() {
  const monthYearEl = document.getElementById('month-year');
  const daysEl = document.getElementById('days');
  const prevMonthBtn = document.getElementById('previous-month');
  const nextMonthBtn = document.getElementById('next-month');
  const todayBtn = document.getElementById('today-btn');
  const eventPanel = document.getElementById('event-panel');
  const eventDateEl = document.getElementById('event-date');
  const eventListEl = document.getElementById('event-list');
  
  let currentDate = new Date();
  let selectedDate = null;
  
  // Sample events data
  const events = {
    '2025-9-15': [
      { time: '10:00 AM', text: 'Team meeting' },
      { time: '02:30 PM', text: 'Project review' }
    ],
    '2025-9-20': [
      { time: '11:00 AM', text: 'Doctor appointment' }
    ],
    '2025-9-25': [
      { time: '07:00 PM', text: 'Birthday party' },
      { time: '09:00 PM', text: 'Dinner with friends' }
    ],
    '2025-10-2': [
      { time: '03:00 PM', text: 'Conference call' }
    ],
    '2025-10-10': [
      { time: 'All day', text: 'Project deadline' }
    ],
    '2025-10-18': [
      { time: '12:00 PM', text: 'Lunch with client' },
      { time: '04:00 PM', text: 'Product demo' }
    ]
  };
  
  // Render calendar
  function renderCalendar() {
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    
    const prevLastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();
    const nextDays = 7 - lastDayIndex - 1;
    
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    monthYearEl.innerHTML = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    
    let days = "";
    
    // Previous month days
    for (let x = firstDayIndex; x > 0; x--) {
      const prevDate = prevLastDay.getDate() - x + 1;
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${prevDate}`;
      const hasEvent = events[dateKey] !== undefined;
      
      days += `<div class="day other-month${hasEvent ? ' has-events' : ''}">${prevDate}</div>`;
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${i}`;
      const hasEvent = events[dateKey] !== undefined;
      
      let dayClass = 'day';
      
      if (
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
      ) {
        dayClass += ' today';
      }
      
      if (
        selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      ) {
        dayClass += ' selected';
      }
      
      if (hasEvent) {
        dayClass += ' has-events';
      }
      
      days += `<div class="${dayClass}" data-date="${dateKey}">${i}</div>`;
    }
    
    // Next month days
    for (let j = 1; j <= nextDays; j++) {
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 2}-${j}`;
      const hasEvent = events[dateKey] !== undefined;
      
      days += `<div class="day other-month${hasEvent ? ' has-events' : ''}">${j}</div>`;
    }
    
    daysEl.innerHTML = days;
  }
  
  
  // Previous month
  prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
    eventDateEl.textContent = 'Select a date';
    eventListEl.innerHTML = '<div class="no-events">Select a date with events to view them here</div>';
  });
  
  // Next month
  nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
    eventDateEl.textContent = 'Select a date';
    eventListEl.innerHTML = '<div class="no-events">Select a date with events to view them here</div>';
  });
  
  // Today button
  todayBtn.addEventListener('click', () => {
    currentDate = new Date();
    selectedDate = new Date();
    renderCalendar();
    
    const dateStr = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    showEvents(dateStr);
  });
  
  // Initialize calendar
  renderCalendar();
});

document.getElementById("confirm").addEventListener("click", function (e) {
  document.querySelector(".calendar-wrapper").classList.add("dontOpen")
})

document.getElementById("open-calendar").addEventListener("click", function (e) {
  document.querySelector(".calendar-wrapper").classList.remove("dontOpen")
})
