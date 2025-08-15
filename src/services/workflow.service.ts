export const WorkflowService = {
  async triggerReminder(
    context: { run: (label: string, fn: () => Promise<void>) => Promise<void> },
    label: string,
  ): Promise<void> {
    return await context.run(label, async () => {
      console.log(`Triggering ${label} reminder.`);
      // Send email, push notification, etc.
    });
  },
};
