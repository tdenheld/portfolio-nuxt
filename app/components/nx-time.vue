<script setup lang="ts">
const getCentralEuropeanTime = (): string => {
  const now = new Date();

  // Check if it's daylight saving time (CEST) or standard time (CET)
  // DST in EU runs from last Sunday in March to last Sunday in October
  const year = now.getFullYear();

  // Find last Sunday in March
  const marchLastSunday = new Date(year, 2, 31);
  marchLastSunday.setDate(31 - marchLastSunday.getDay());

  // Find last Sunday in October
  const octoberLastSunday = new Date(year, 9, 31);
  octoberLastSunday.setDate(31 - octoberLastSunday.getDay());

  const isDST = now >= marchLastSunday && now < octoberLastSunday;

  // Calculate time in Central European timezone
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const offset = isDST ? 2 : 1; // CEST = UTC+2, CET = UTC+1
  const cetTime = new Date(utc + 3600000 * offset);

  const timeString = cetTime.toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return timeString + (isDST ? ' CEST' : ' CET');
};

const time = ref(getCentralEuropeanTime());
let interval: number | undefined;

onMounted(() => {
  interval = window.setInterval(() => {
    time.value = getCentralEuropeanTime();
  }, 1000 * 60); // update every minute
});
onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<template>
  <span>
    {{ time }}
  </span>
</template>
