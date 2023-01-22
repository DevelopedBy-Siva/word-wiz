import React from "react";

import Wrapper from "../../components/wrapper";
import Header from "../../components/header";
import HistoryContainer from "./HistoryContainer";

export default function History() {
  return (
    <Wrapper stretch>
      <Wrapper contain spaceAround>
        <Header name="History" />
      </Wrapper>
      <HistoryContainer />
    </Wrapper>
  );
}
