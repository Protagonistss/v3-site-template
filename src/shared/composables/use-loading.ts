import { ref } from 'vue';

export function useLoading(initialValue = false) {
  const loading = ref(initialValue);

  async function withLoading<T>(runner: () => Promise<T>): Promise<T> {
    loading.value = true;

    try {
      return await runner();
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    withLoading
  };
}
