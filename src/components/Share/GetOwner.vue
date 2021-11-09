<template>
    <span style="font-size: 18px;">Owned by {{ customerName }}</span>
</template>

<script>
import { onMounted, ref } from 'vue';
import customerService from '@/services/customer-service';

export default {
  props: {
    customerId: String,
  },
  setup(props) {
    const customerName = ref('Loading');
    onMounted(() => {
      if (props.customerId) {
        customerService.getCustomerProducts(props.customerId).then((data) => {
          customerName.value = data.customerName ? data.customerName : '-';
        });
      }
    });
    return {
      customerName,
    };
  },
};
</script>
