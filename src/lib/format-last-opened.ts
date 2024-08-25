export const formatLastOpened = (lastOpened: Date) => {
  const now = new Date();

  const isSameDay =
    now.getFullYear() === lastOpened.getFullYear() &&
    now.getMonth() === lastOpened.getMonth() &&
    now.getDate() === lastOpened.getDate();

  if (isSameDay) {
    return lastOpened.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(lastOpened);
};
