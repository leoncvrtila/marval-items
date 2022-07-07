import React from "react";
import moment from "moment";

export function formatDateTime(date: string) {
  return moment(date).format("DD/MM/YYYY h:mm:ss a");
}

export function returnItemRows({
  id,
  number,
  summary,
  isPrivate,
  status,
  service,
  author,
  createdOn,
  updatedOn,
  type,
}: FormatedItem) {
  return {
    id,
    number,
    summary,
    isPrivate,
    status,
    service,
    author,
    createdOn,
    updatedOn,
    type,
  };
}
