/**
 * Calendar Interactive Story - E2E validation
 * - Sidebar toggle
 * - Category filters
 * - Select2 + Flatpickr integration
 * - Add and edit event flow
 */

const { test, expect } = require('@playwright/test');

const STORY_PATH = '/?path=/story/vuexy-organisms-productivity-calendar--interactive';

test.describe('Calendar Interactive Story', () => {
  test('sidebar, filters, create & edit event with select2 + flatpickr', async ({ page }) => {
    await page.goto(STORY_PATH);
    await page.waitForLoadState('networkidle');

    const frame = page.frameLocator('#storybook-preview-iframe');

    // Wait core containers
    await frame.locator('#fullcalendar-interactive').waitFor({ timeout: 20000 });
    const sidebar = frame.locator('#app-calendar-sidebar');
    const overlay = frame.locator('#app-overlay');

    // Sidebar toggle
    await expect(sidebar).toBeVisible();
    const sidebarToggle = frame.getByRole('button', { name: /sidebar/i });
    await sidebarToggle.click();
    await expect(overlay).toHaveClass(/show/);
    await overlay.click();
    await expect(overlay).not.toHaveClass(/show/);

    // Filters: uncheck Business and verify removal
    const businessFilter = frame.locator('input.input-filter[data-value="Business"]');
    await businessFilter.uncheck();
    await frame.locator('.fc-event-title').first().waitFor({ timeout: 10000 });
    await expect(frame.locator('.fc-event-title', { hasText: 'Team Meeting' })).toHaveCount(0);
    // Restore filter
    await businessFilter.check();

    // Open add event offcanvas
    await frame.locator('#addEventBtn').click();
    const offcanvas = frame.locator('#addEventSidebar');
    await expect(offcanvas).toBeVisible();

    // Select2 label change (Calendar field)
    const labelSelectRendered = offcanvas.locator('div.position-relative').first().locator('.select2-selection__rendered');
    await expect(labelSelectRendered).toBeVisible({ timeout: 15000 });
    await frame.evaluate(() => {
      const $ = window.jQuery;
      if ($) {
        $('#eventLabel').val('Holiday').trigger('change');
      }
    });
    await expect(labelSelectRendered).toHaveText(/Holiday/i);

    // Flatpickr date controls
    await frame.evaluate(() => {
      const start = document.querySelector('#eventStartDate');
      const end = document.querySelector('#eventEndDate');
      if (start?._flatpickr) start._flatpickr.setDate('2026-02-21 09:00');
      if (end?._flatpickr) end._flatpickr.setDate('2026-02-21 10:30');
    });
    await expect(offcanvas.locator('#eventStartDate')).toHaveValue(/2026-02-21/);

    // Fill remaining fields and save
    const titleField = offcanvas.locator('#eventTitle');
    await titleField.fill('PW Test Event');
    await offcanvas.locator('#eventLocation').fill('Room 101');
    await offcanvas.locator('#eventDescription').fill('Playwright created event');
    await offcanvas.getByRole('button', { name: 'Save' }).click();

    // Verify new event appears
    const newEvent = frame.locator('.fc-event-title', { hasText: 'PW Test Event' });
    await expect(newEvent).toBeVisible({ timeout: 10000 });

    // Edit event
    await newEvent.click();
    await expect(offcanvas).toBeVisible();
    await titleField.fill('PW Edited Event');
    await offcanvas.getByRole('button', { name: 'Save' }).click();
    await expect(frame.locator('.fc-event-title', { hasText: 'PW Edited Event' })).toBeVisible({ timeout: 10000 });
  });
});
