import React from "react";
import CardChart from "../../../cardReportes/CardChart";
import HorizontalBar from "../../../charts/HorizontalBar";
import StackedHorizontalBarChart from "../../../charts/StackedHorizontalBarChart";

const DigipointRedemptionSection = ({
  dataDigStatus = [
    {
      name: "",
      value: "",
      color: "",
    },
  ],
  isDataReady,
  digipointsRA,
}) => {
  return (
    <>
      {/* <CardChart title={"DigiPoints by status"} paragraph="">
        {!isDataReady && <div className="lds-dual-ring"></div>}
        {isDataReady && (
          <HorizontalBar datas={dataDigStatus} symbol="" />
        )}
      </CardChart> */}
      <CardChart title={"Redemptions by region and amound"} paragraph="">
        {!isDataReady && <div className="lds-dual-ring"></div>}
        {isDataReady && (
          <StackedHorizontalBarChart
            datas={digipointsRA.datas}
            yNames={digipointsRA.yNames}
            ySymbol="$"
          />
        )}
      </CardChart>
    </>
  );
};

export default DigipointRedemptionSection;
