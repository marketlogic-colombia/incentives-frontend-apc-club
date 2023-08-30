import React, { useState } from "react";
import { ArrowDown } from "../../../icons";
import { useTranslation } from "react-i18next";
import SelectSection from "./SelectSection";
import DigipointSection from "./DigipointSection";
import DigipointRedemptionSection from "./DigipointRedemptionSection";
import { useEffect } from "react";
import { getDigiPointPerformance } from "../../../../store/reducers/sales.reducer";
import { useDispatch, useSelector } from "react-redux";

const DigipoinstPerformance = () => {
  /* Variables and const */
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [filters, setFilters] = useState({
    quarter: "",
    month: "",
    region: "",
    country: "",
    partner_level: "",
    partner: "",
    market_segment: "",
    business_unit: "",
    business_type: "",
    licensing_type: "",
  });
  const [digipointUploaded, setDigipointUploaded] = useState([]);
  const [digipointSR, setDigipointSR] = useState({
    datas: {},
    yNames: [],
  });
  const [digipointsStatus, setDigipointStatus] = useState([]);
  const [digipointsRA, setDigipointRA] = useState({
    datas: {},
    yNames: [],
  });
  const [isDigipointsUploaded, setIsDigipointsUploaded] = useState(false);
  const [isDigipointSR, setIsDigipointSR] = useState(false);
  const [isDigipointStatus, setIsDigipointStatus] = useState(false);
  const [isDigipointRA, setIsDigipointRA] = useState(false);
  const multiSelect = [
    {
      placeholder: "Year",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "year",
    },
    {
      placeholder: "Quater",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "quater",
    },
    {
      placeholder: "Month",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "Month",
    },
    {
      placeholder: "Region",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "region",
    },
    {
      placeholder: "Country",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: <ArrowDown />,
      name: "country",
    },
    {
      placeholder: "Partner level",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: "",
      name: "partner_level",
    },
    {
      placeholder: "Partner",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: "",
      name: "partner",
    },
    {
      placeholder: "Market segment",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: "",
      name: "market_segment",
    },
    {
      placeholder: "Business unit",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: "",
      name: "business_unit",
    },
    {
      placeholder: "Business type",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: "",
      name: "business_type",
    },
    {
      placeholder: "Licensing type",
      value: [],
      dataSelect: [],
      searchable: true,
      icon: "",
      name: "licensiong",
    },
  ];
  const colorsData = [
    { name: "Digipoints", color: "#0149A0" },
    { name: "Expected", color: "#1473E6" },
    { name: "Assigned", color: "#75AFF5" },
    { name: "Redeemed", color: "#A4CDFF" },
  ];

  const mapColorsToData = (originalData, colorsData) => {
    const colorMap = colorsData.reduce((map, item) => {
      map[item.name] = item.color;
      return map;
    }, {});

    const modifiedData = originalData.map((item) => ({
      ...item,
      color: colorMap[item.name] || "#000000", // Color predeterminado si no se encuentra en el mapa
    }));

    return modifiedData;
  };

  /* GET DATA */
  useEffect(() => {
    dispatch(getDigiPointPerformance(token, filters)).then((res) => {
      console.log(res.payload);
      /* DIGIPOINTS UPLOADED */
      setIsDigipointsUploaded(false);
      setDigipointUploaded(res.payload.digipointsUploaded);
      setIsDigipointsUploaded(true);

      /* DIGIPOINTS BY STATUS AND REGION PENDING*/
      setIsDigipointSR(false);
      setDigipointSR({
        yNames: res.payload.digipointsByStatusAndRegion.yAxis.data,
      });
      setIsDigipointSR(true);

      /* DIGIPOINTS BY STATUS */
      setIsDigipointStatus(false);
      setDigipointStatus(
        mapColorsToData(res.payload.digipointsByStatus, colorsData)
      );
      setIsDigipointStatus(true);

      /* DIGIPOINTS BY REGION AND AMOUND */
      setIsDigipointRA(false);
      setDigipointRA({
        yNames: res.payload.redempionsByRegionAndAmount.yAxis.data,
      });
      setIsDigipointRA(true);
    });
  }, [filters]);

  return (
    <div className="m-5">
      {/* <div className="pt-2 grid items-center sm:grid-cols-6 grid-rows-1 gap-3">
        <SelectSection multiSelect={multiSelect} />
      </div> */}
      <div className="grid sm:grid-cols-2 grid-rows-1 pt-4 pb-4 gap-4">
        <DigipointSection
          dataUploaded={digipointUploaded}
          isDigipointsUploaded={isDigipointsUploaded}
          dataSR={digipointSR}
          isDigipointSR={isDigipointSR}
        />
      </div>
      <div className="grid sm:grid-cols-2 grid-rows-1 pt-4 pb-4 gap-4">
        <DigipointRedemptionSection
          dataDigStatus={digipointsStatus}
          isDigipointStatus={isDigipointStatus}
          digipointsRA={digipointsRA}
          isDigipointRA={isDigipointRA}
        />
      </div>
    </div>
  );
};

export default DigipoinstPerformance;
