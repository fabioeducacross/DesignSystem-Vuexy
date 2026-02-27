/**
 * Calendar Interactive Story - E2E validation
 * Acessa o iframe diretamente para evitar interferência do Storybook Manager.
 * - Sidebar toggle
 * - Category filters
 * - Select2 + Flatpickr integration
 * - Add and edit event flow
 */

const { test, expect } = require('@playwright/test');

// Acessa o iframe diretamente: evita recriação do frame pelo Storybook Manager
// e elimina a necessidade de frameLocator.
const STORY_URL = '/iframe.html?id=vuexy-organisms-productivity-calendar--interactive&viewMode=story';

test.describe('Calendar Interactive Story', () => {
  test('sidebar, filters, create & edit event with select2 + flatpickr', async ({ page }) => {
    await page.goto(STORY_URL);
    await page.waitForLoadState('networkidle');

    // Aguarda o FullCalendar renderizar:
    // O FullCalendar adiciona .fc ao próprio calendarEl (não a um filho interno)
    await page.locator('#fullcalendar-interactive.fc').waitFor({ timeout: 30000 });

    const sidebar = page.locator('#app-calendar-sidebar');
    const overlay = page.locator('#app-overlay');

    // ── Sidebar toggle ────────────────────────────────────────────────────────
    await expect(sidebar).toBeVisible();
    const sidebarToggle = page.getByRole('button', { name: /sidebar/i });
    await sidebarToggle.click();
    await expect(overlay).toHaveClass(/show/);
    await overlay.click();
    await expect(overlay).not.toHaveClass(/show/);

    // ── Filters: desmarcar Business e verificar remoção ───────────────────────
    const businessFilter = page.locator('input.input-filter[data-value="Business"]');
    await businessFilter.uncheck();
    // Verifica que "Team Meeting" (Business) saiu do calendário
    await expect(page.locator('.fc-event-title', { hasText: 'Team Meeting' })).toHaveCount(0, { timeout: 10000 });
    // Restaura filtro e aguarda evento Business reaparecer
    await businessFilter.check();
    await page.locator('.fc-event-title').first().waitFor({ timeout: 10000 });

    // ── Abrir offcanvas de novo evento ────────────────────────────────────────
    await page.locator('#addEventBtn').click();
    const offcanvas = page.locator('#addEventSidebar');
    await expect(offcanvas).toBeVisible({ timeout: 5000 });

    // ── Select2: mudar label para "Holiday" ───────────────────────────────────
    const labelSelectRendered = offcanvas
      .locator('div.position-relative')
      .first()
      .locator('.select2-selection__rendered');
    await expect(labelSelectRendered).toBeVisible({ timeout: 15000 });
    await page.evaluate(() => {
      const $ = window.jQuery;
      if ($) $('#eventLabel').val('Holiday').trigger('change');
    });
    await expect(labelSelectRendered).toHaveText(/Holiday/i);

    // ── Flatpickr: definir datas via API interna ──────────────────────────────
    await page.evaluate(() => {
      const start = document.querySelector('#eventStartDate');
      const end = document.querySelector('#eventEndDate');
      if (start?._flatpickr) start._flatpickr.setDate('2026-02-21 09:00');
      if (end?._flatpickr) end._flatpickr.setDate('2026-02-21 10:30');
    });
    await expect(offcanvas.locator('#eventStartDate')).toHaveValue(/2026-02-21/);

    // ── Preencher campos restantes e salvar ───────────────────────────────────
    const titleField = offcanvas.locator('#eventTitle');
    await titleField.fill('PW Test Event');
    await offcanvas.locator('#eventLocation').fill('Room 101');
    await offcanvas.locator('#eventDescription').fill('Playwright created event');
    await offcanvas.getByRole('button', { name: 'Save' }).click();

    // Verifica que o novo evento aparece no calendário
    const newEvent = page.locator('.fc-event-title', { hasText: 'PW Test Event' });
    await expect(newEvent).toBeVisible({ timeout: 10000 });

    // Aguarda o offcanvas fechar completamente (animação CSS) antes de clicar no evento
    await expect(offcanvas).not.toBeVisible({ timeout: 10000 });
    await page.waitForTimeout(400); // margem extra para BS Offcanvas animation

    // ── Editar evento: clicar no evento criado e alterar título ───────────────
    await newEvent.click();
    await expect(offcanvas).toBeVisible({ timeout: 10000 });
    await titleField.fill('PW Edited Event');
    await offcanvas.getByRole('button', { name: 'Save' }).click();
    await expect(
      page.locator('.fc-event-title', { hasText: 'PW Edited Event' })
    ).toBeVisible({ timeout: 10000 });
  });
});
