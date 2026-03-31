import { createApplication } from './providers';

export async function bootstrapApp(): Promise<void> {
  const { app, router } = await createApplication();

  await router.isReady();
  app.mount('#app');
}
