import moment from "moment";

const DateTimeFormatter = (date) =>
moment(new Date(date)).format("MMM-DD-YYYY HH:mm");

const getSizeinKB = (bytes) => {
  return (bytes/1024).toFixed(2) + " Kb"
}


export {
  DateTimeFormatter,
  getSizeinKB,
};

