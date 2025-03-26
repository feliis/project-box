<script setup lang="ts">
import { ref, defineExpose } from 'vue';

const notifications = ref<{ id: number; message: string }[]>([]);
let counter = 0;

function addNotification(message: string) {
  const id = counter++;
  notifications.value.push({ id, message });

  setTimeout(() => {
    removeNotification(id);
  }, 1500);
}

function removeNotification(id: number) {
  const index = notifications.value.findIndex(n => n.id === id);
  if (index !== -1) {
    const notification = notifications.value[index];
    notification.leaving = true;
    setTimeout(() => {
      notifications.value = notifications.value.filter((n) => n.id !== id);
    }, 500);
  }
}

defineExpose({ addNotification });
</script>

<template>
  <Teleport to="body">
    <div class="notifications-container">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification"
        :class="{ 'fade-out': notification.leaving }">
        {{ notification.message }}
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.notifications-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}


.notification {
  background: var(--primary);
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-out;
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}

.fade-out {
  opacity: 0;
  transform: translateX(100%);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
