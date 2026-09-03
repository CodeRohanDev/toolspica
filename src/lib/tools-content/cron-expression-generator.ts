import type { ToolContent } from "./types";

export const cronExpressionGeneratorContent: ToolContent = {
  heroSubtitle: "Build a Cron Expression Without Memorizing Field Order",
  overview: [
    "Cron's five-field syntax (minute, hour, day-of-month, month, day-of-week) is compact and powerful, but the field order is easy to mix up if you don't write cron jobs often — accidentally swapping minute and hour is a classic mistake that schedules a job at the wrong time entirely. This tool builds the expression from five clearly labeled fields, so you always know which value goes where.",
    "As you fill in each field, the full cron expression assembles live, along with a plain-language description for common patterns (every minute, daily at a specific time, hourly). Each field shows its valid range directly beneath it, so you don't need to look up cron syntax documentation mid-task.",
    "This is aimed at anyone setting up a scheduled task, GitHub Action, server cron job, or any system that uses standard five-field cron syntax — getting the expression right the first time avoids the classic experience of a job firing at 3am instead of 3pm because of a swapped field.",
  ],
  howItWorks: [
    { title: "Fill in each field", description: "Minute, hour, day of month, month, day of week." },
    { title: "Watch the expression build", description: "See the live cron string and a plain-language description." },
    { title: "Copy the expression", description: "Paste directly into your crontab or scheduler config." },
  ],
  examples: [
    { label: "Scheduling a daily task", input: "Minute: 0, Hour: 9, rest: *", output: "0 9 * * * — Every day at 09:00" },
  ],
  faqs: [
    { question: "What does an asterisk (*) mean in a field?", answer: "It means \"every value\" for that field — e.g. * in the hour field means every hour." },
    { question: "What's the difference between day-of-month and day-of-week?", answer: "Day-of-month is 1-31 (calendar date); day-of-week is 0-6 where 0 is Sunday. Using both together typically means \"OR\" in standard cron implementations." },
    { question: "Does this validate my expression is runnable?", answer: "It builds a correctly structured five-field expression from your inputs; always test against your specific scheduler, as some systems (like GitHub Actions) use slightly different conventions." },
    { question: "Can I use ranges or step values like 1-5 or */15?", answer: "Yes — type them directly into any field; the tool accepts any valid cron field syntax, not just single numbers or asterisks." },
    { question: "Does this generate expressions for Quartz or other 6/7-field cron variants?", answer: "No — this generates standard 5-field Unix cron syntax; Quartz-style schedulers add extra seconds/year fields not covered here." },
  ],
};
