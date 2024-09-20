import moment from "moment";

const calculateDuration = (date) => {
  const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
  const commentDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
  // console.log("commentDate", commentDate);
  let duration = "";
  const diffDate = moment(currentDate).diff(commentDate);

  if (diffDate < 0) {
    return "Invalid date";
  }

  if (diffDate > 0 && diffDate < 60000) {
    duration = moment.duration(diffDate).asSeconds();
    const second = Math.floor(duration);
    return `${second} second${second > 1 ? "s" : ""} ago`;
  }

  if (diffDate > 60000 && diffDate < 3600000) {
    duration = moment.duration(diffDate).asMinutes();
    const minute = Math.floor(duration);
    return `${minute} minute${minute > 1 ? "s" : ""} ago`;
  }

  if (diffDate > 3600000 && diffDate < 86400000) {
    duration = moment.duration(diffDate).asHours();
    const hours = Math.floor(duration);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  if (diffDate > 86400000 && diffDate < 604800016.56) {
    duration = moment.duration(diffDate).asDays();
    const day = Math.floor(duration);
    return `${day} day${day > 1 ? "s" : ""} ago`;
  }

  if (diffDate > 604800016.56 && diffDate < 2629800000) {
    duration = moment.duration(diffDate).asWeeks();
    const week = Math.floor(duration);
    return `${week} week${week > 1 ? "s" : ""} ago`;
  }

  if (diffDate > 2629800000 && diffDate < 31557600000) {
    duration = moment.duration(diffDate).asMonths();
    const month = Math.floor(duration);
    return `${month} month${month > 1 ? "s" : ""} ago`;
  }

  if (diffDate > 31557600000) {
    duration = moment.duration(diffDate).asYears();
    const year = Math.floor(duration);
    return `${year} year${year > 1 ? "s" : ""} ago`;
  }
};

export default calculateDuration;
