export const AssistantResponseSample = {
    hasCode: true,
    text: "Here's a function to format dates in JavaScript.",
    emailTemplateName: "formatDateHelper",
    code: `function formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    }`,
    codeBreakdown: [
        "Defines a function `formatDate` that takes a date as an argument.",
        "Uses `toLocaleDateString` with options to format the date in a readable format.",
        "Returns the formatted date as a string."
    ],
    summary: "The function formats a given date into a human-readable string using JavaScript’s built-in `toLocaleDateString` method."
};
