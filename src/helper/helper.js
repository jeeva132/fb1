export const dateConverter = function (unformattedDate) {
  if (!unformattedDate) return "--/--/--";
  const date = unformattedDate.toDate();

  const timeDifferenceInMins = (new Date() - date) / 1000 / 60;

  if (timeDifferenceInMins < 1) return "Now";
  else if (timeDifferenceInMins < 60) {
    return `${Math.trunc(timeDifferenceInMins)}m`;
  } else if (timeDifferenceInMins / 60 <= 24) {
    return `${Math.trunc(timeDifferenceInMins / 60)}h`;
  }
  let newDate = date.toLocaleString("default", {
    month: "long",
    minute: "2-digit",
    day: "2-digit",
    hour: "2-digit",
  });
  return newDate;
};
