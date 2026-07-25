/**
 * Delivery is deliberately a stub in the MVP (per PRD §6): the interface is
 * real so a real email/Slack integration is a drop-in adapter, but the
 * default implementation just logs, so the pipeline is fully runnable and
 * testable without credentials.
 */
export interface Notifier {
  notify(event: { founderId: string; message: string }): Promise<void>;
}

export const consoleNotifier: Notifier = {
  async notify({ founderId, message }) {
    // eslint-disable-next-line no-console
    console.log(`[notify -> ${founderId}] ${message}`);
  },
};
