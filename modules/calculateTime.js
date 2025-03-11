export function calculateTime(startDate) {
  const today = new Date();

  if (!startDate || isNaN(startDate.getTime()) || startDate > today) {
    document.getElementById("days").innerText = `0`;
    document.getElementById("bg-1").style.width = `0%`;
    document.getElementById("hours").innerText = `0`;
    document.getElementById("bg-2").style.width = `0%`;
    document.getElementById("minutes").innerText = `0`;
    document.getElementById("bg-3").style.width = `0%`;
    document.getElementById("seconds").innerText = `0`;
    document.getElementById("bg-4").style.width = `0%`;
    return;
  }

  const timeDiff = today - startDate;
  const secondsSober = Math.floor(timeDiff / 1000);
  const minutesSober = Math.floor(secondsSober / 60);
  const hoursSober = Math.floor(minutesSober / 60);
  const daysSober = Math.floor(hoursSober / 24) < 2 ? Math.floor(hoursSober / 24) : String(Math.floor(hoursSober / 24)).padStart(2, "0");

  const remainingHours = hoursSober === 0 ? hoursSober % 24 : String(hoursSober % 24).padStart(2, "0");
  const remainingMinutes = minutesSober === 0 ? minutesSober % 60 : String(minutesSober % 60).padStart(2, "0");
  const remainingSeconds = secondsSober === 0 ? secondsSober % 60 : String(secondsSober % 60).padStart(2, "0");

  document.getElementById("days").innerText = daysSober === 1 ? `${daysSober} dia` : `${daysSober} dias`;
  document.getElementById("hours").innerText = remainingHours === 1 ? `${remainingHours} hora` : `${remainingHours} horas`;
  document.getElementById("minutes").innerText = remainingMinutes === 1 ? `${remainingMinutes} minuto` : `${remainingMinutes} minutos`;
  document.getElementById("seconds").innerText = remainingSeconds === 1 ? `${remainingSeconds} segundo` : `${remainingSeconds} segundos`;

  const dayPercentage = Math.min((daysSober / 365) * 100, 100);
  const hoursPercentage = (remainingHours / 23) * 100;
  const minutesPercentage = (remainingMinutes / 59) * 100;
  const secondsPercentage = (remainingSeconds / 59) * 100;

  document.getElementById("bg-1").style.width = `${dayPercentage}%`;
  document.getElementById("bg-2").style.width = `${hoursPercentage}%`;
  document.getElementById("bg-3").style.width = `${minutesPercentage}%`;
  document.getElementById("bg-4").style.width = `${secondsPercentage}%`;
}
