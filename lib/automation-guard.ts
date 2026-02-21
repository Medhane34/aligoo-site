export function isAutomationEnabled(): boolean {
    return process.env.AUTOMATION_ENABLED !== 'false';
}