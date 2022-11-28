import { utcToZonedTime } from 'date-fns-tz';

// The clock class which has all properties & functions for operation
class Clock
{
    constructor(el)
    {
        this.clockEl = el;
        this.UI = {};
        this.initializeClock();
    }

    // Update clock with seconds, minutes and hours, and set colors
    updateClock = () =>
    {
        // GETTING TIME
        const date = new Date();
        const now = utcToZonedTime(date, this.clockEl.dataset.locale);
        const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

        // const date = now.getDate();
        const seconds = now.getSeconds() / 60 * 360;
        const minutes = now.getMinutes() / 60 * 360;
        const hours = (now.getHours() + now.getMinutes() / 60) / 12 * 360;

        // UI Update
        this.UI.light.textContent = (now.getHours() >= 18 || now.getHours() < 6) ? '\u{262A}' : '\u{2600}';
        this.UI.light.style.fill = (now.getHours() >= 18 || now.getHours() < 6) ? '#FFFFFF' : '#F0E68C';
        this.UI.ringSec.style.fill = (now.getHours() >= 18 || now.getHours() < 6) ? '#121629' : '#0E86D4';
        this.UI.date.textContent = `${now.getDate()} | ${weekday[now.getDay()]}`;
        this.UI.am_pm.textContent = now.getHours() >= 12 ? '\u{33D8}' : '\u{33C2}';
        this.UI.second.style.transform = `rotate(${seconds}deg)`;
        this.UI.minute.style.transform = `rotate(${minutes}deg)`;
        this.UI.hour.style.transform = `rotate(${hours}deg)`;

        setTimeout(this.updateClock, 1000)
    }

    // Initialize the clock with svg clock face and clock design
    initializeClock()
    {
        this.clockEl.innerHTML = `
<svg class="clockface" width="250" height="250" viewBox="-150 -150 300 300">
    
    <circle class="ring ring--seconds" r="145" pathlength="60" />
    <circle class="ring ring--hours" r="145" pathlength="12" />
    <circle class="ring ring--center" r="3" />
    
    <rect x="50" y="-8" width="67" height="20" fill="#FFFFFF"/>
    <text x="50" y="7" class="date"></text>
    <text x="-9" y="-90" class="am-pm">am</text>
    
    <text x="60" y="-100" class="number">1</text>
    <text x="105" y="-55" class="number">2</text>
    <text x="125" y="10" class="number">3</text>
    <text x="105" y="70" class="number">4</text>
    <text x="60" y="115" class="number">5</text>
    <text x="-6" y="135" class="number">6</text>
    <text x="-70" y="120" class="number">7</text>
    <text x="-118" y="73" class="number">8</text>
    <text x="-137" y="9" class="number">9</text>
    <text x="-120" y="-55" class="number">10</text>
    <text x="-75" y="-100" class="number">11</text>
    <text x="-12" y="-120" class="number">12</text>
    <text x="-23" y="100" class="light"></text>

    <line class="hand hand--hour" x1="0" y1="2" x2="0" y2="-70" />
    <line class="hand hand--minute" x1="0" y1="2" x2="0" y2="-120" />
    <line class="hand hand--second" x1="0" y1="12" x2="0" y2="-140" />
</svg>`;

        this.UI.ringSec = this.clockEl.querySelector('.ring--seconds');
        this.UI.date = this.clockEl.querySelector('.date');
        this.UI.light = this.clockEl.querySelector('.light');
        this.UI.am_pm = this.clockEl.querySelector('.am-pm');
        this.UI.second = this.clockEl.querySelector('.hand--second');
        this.UI.minute = this.clockEl.querySelector('.hand--minute');
        this.UI.hour = this.clockEl.querySelector('.hand--hour');

        setTimeout(this.updateClock, 1000)
    }
}

// Create clock for all clocks present in html
const clocks = document.querySelectorAll('.clock');
clocks.forEach(el => new Clock(el))
