import { expect, test } from '@playwright/test';

test('login and navigate to dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.getByPlaceholder('admin / editor').fill('admin');
  await page.getByPlaceholder('请输入密码').fill('123456');
  await page.getByRole('button', { name: '登录系统' }).click();

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText('当前权限')).toBeVisible();
});

test('root path resolves after persisted login', async ({ page }) => {
  await page.goto('/login');
  await page.getByPlaceholder('admin / editor').fill('admin');
  await page.getByPlaceholder('请输入密码').fill('123456');
  await page.getByRole('button', { name: '登录系统' }).click();

  await expect(page).toHaveURL(/dashboard/);

  await page.goto('/');

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText('当前权限')).toBeVisible();
});
