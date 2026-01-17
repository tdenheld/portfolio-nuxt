<script setup lang="ts">
const getCentralEuropeanTime = (): string => {
  const now = new Date();

  // Use Intl.DateTimeFormat to get the actual time in Europe/Amsterdam timezone
  const timeString = new Intl.DateTimeFormat('nl-NL', {
    timeZone: 'Europe/Amsterdam',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now);

  // Determine if it's CEST or CET by checking the timezone offset
  const getOffset = (date: Date) => {
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const cetDate = new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Amsterdam' }));
    return (cetDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60);
  };
  
  const offset = getOffset(now);
  const isDST = offset === 2; // CEST = UTC+2, CET = UTC+1

  return timeString + (isDST ? ' CEST' : ' CET');
};

const time = ref(getCentralEuropeanTime());
let interval: number | undefined;

onMounted(() => {
  interval = window.setInterval(() => {
    time.value = getCentralEuropeanTime();
  }, 1000 * 10); // update every 10 seconds
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
