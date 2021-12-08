const formatDate = dateStr => {
  const date = new Date(dateStr);

  const year = date.getFullYear(),
    month = date.toLocaleString("default", { month: "long" }),
    day = date.getDate(),
    hours = date.getHours(),
    minutes = date.getMinutes();

  const currentYear = new Date().getFullYear();

  return year === currentYear
    ? `${day} ${month} at ${hours}:${minutes}`
    : `${day} ${month} ${year} at ${hours}:${minutes}`;
};

export default formatDate;
