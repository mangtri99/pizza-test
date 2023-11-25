<script setup lang="ts">
import ModalBase from './ModalBase.vue'

interface Props {
  isOpen: boolean
}

const { isOpen } = defineProps<Props>()
defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <ModalBase :is-open="isOpen" @close="$emit('close')">
    <div>
      <div class="mt-2 text-center text-lg font-medium">
        Your order has been placed. <br />
        Thank you for your order!
      </div>
      <div class="flex justify-center">
        <button type="button" class="btn btn-secondary mt-4" @click="$emit('close')">Close</button>
      </div>
    </div>
  </ModalBase>
</template>
