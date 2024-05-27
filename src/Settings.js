import React from "react";
import { Translation } from "./components/Translation";

export default function Settings({ translation }) {
  return <div>{Translation(translation, "this is settings page")}</div>;
}
