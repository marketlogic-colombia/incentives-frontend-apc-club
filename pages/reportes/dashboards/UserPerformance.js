import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSalesvsGoalsUsePerformance,
  getUserSalePerformance,
} from "../../../store/reducers/sales.reducer";
import {
  ArrowDown,
  CloudDownload,
  SearchIcon,
  UserPerformance as User,
} from "../../../components/icons";
import { useTranslation } from "react-i18next";
import {
  BarChar,
  BtnFilter,
  BtnWithImage,
  CardChart,
  MultiLineChart,
  SearchInput,
  SelectInputValue,
  Table,
  TitleWithIcon,
} from "../../../components";
import jsonexport from "jsonexport";
import { saveAs } from "file-saver";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import { utils, write } from "xlsx";
import {importExcelFunction} from '../../../components/functions/reports/GenerateExcel'

const SalesPerformance = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [selectOne, setSelectOne] = useState("");
  const [searchByInvoice, setSearchByInvoice] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const products = useSelector((state) => state.sales.products);
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [t, i18n] = useTranslation("global");
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [loadingBarChart, setLoadingBarChart] = useState(true);
  const router = useRouter();
  const [dataBarChar, setDataBarChar] = useState([]);
  const xValues = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const sortedData = {};
  const [redeemPoints, setRedeemPoints] = useState([]);
  const [salesPoints, setSalesPoints] = useState([]);
  const redeemPointsArray = [];
  const salesPointsArray = [];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && token) {
      setLoading(true);
      dispatch(getUserSalePerformance(token))
        .then((response) => {
          setLoading(false);
          setData(response.payload);
        })
        .catch((error) => {
          console.log(error);
        });

      setLoading(true);
      dispatch(getSalesvsGoalsUsePerformance(token))
        .then((response) => {
          setLoading(false);
          setDataBarChar(response.payload[0].json_agg);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoaded]);

  useEffect(() => {
    if (dataBarChar) {
      for (let i = 1; i <= 12; i++) {
        const monthData = dataBarChar.find((item) => item.month_redeem === i);

        if (monthData) {
          redeemPointsArray.push(monthData.redeem_points);
          salesPointsArray.push(monthData.sales_points);
        } else {
          redeemPointsArray.push(0);
          salesPointsArray.push(0);
        }
      }
      setRedeemPoints(redeemPointsArray);
      setSalesPoints(salesPointsArray);
      setLoadingBarChart(false);
    }
  }, [dataBarChar]);

  const numberToMoney = (quantity = 0) => {
    return `$ ${Number(quantity)
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  /* Download */
  const importFile = (data) => {
    const columnMapping = {
      employ_id: "User Name",
      email: "Email",
      name: "FirstName",
      last_name: "LastName",
      country_id: "Country",
      region: "Region",
      reseller_or_dist_name: "Company Name",
      reseller_or_dist_id: "Company Type",
      rtype: "Company Level",
      dcname: "Company Status",
      rolname: "User Role",
      vip_cc_newbusiness: "VIP Renewal CC (USD)",
      vip_cc_renewal: "VIP Renewal DC (USD)",
      vip_dc_newbusiness: "VIP New Business CC (USD)",
      vip_dc_renewal: "VIP New Business DC (USD)",
      vmp_cc_newbusiness: "VMP Renewal CC (USD)",
      vmp_cc_renewal: "VMP Renewal DC (USD)",
      vmp_dc_newbusiness: "VMP New Business CC (USD)",
      vmp_dc_renewal: "VMP New Business DC (USD)",
      vip_revenue_q1: "VIP Revenue Q1 (USD)",
      vip_revenue_q2: "VIP Revenue Q2 (USD)",
      vip_revenue_q3: "VIP Revenue Q3 (USD)",
      vip_revenue_q4: "VIP Revenue Q4 (USD)",
      vmp_revenue_q1: "VMP Revenue Q1 (USD)",
      vmp_revenue_q2: "VMP Revenue Q2 (USD)",
      vmp_revenue_q3: "VMP Revenue Q3 (USD)",
      vmp_revenue_q4: "VMP Revenue Q4 (USD)",
      revenue_q1: "Revenue Q1 (USD)",
      revenue_q2: "Revenue Q2 (USD)",
      revenue_q3: "Revenue Q3 (USD)",
      revenue_q4: "Revenue Q4 (USD)",
      vip_revenue_total: "Total VIP Revenue (USD)",
      vmp_revenue_total: "Total VMP Revenue (USD)",
      revenue_actual: "Actual Revenue (USD)",
      rma: "RMA (USD)",
      sales_digipoints: "Sales DigiPoints",
      promotion_digipoints: "Promotion DigiPoints",
      behavior_digiPoints: "Behavior DigiPoints",
      total_digipoints: "Total DigiPoints",
      redenciones: "DigiPoints Redeemed",
      avg_effectiveness: "Total % effectiveness",
    };
    jsonexport(data, (error, csv) => {
      if (error) {
        console.error(error);
        return;
      }
      const csvContent =
        Object.keys(data[0])
          .map((key) => columnMapping[key] || key)
          .join(",") +
        "\n" +
        data
          .map((row) =>
            Object.values(row)
              .map((value) => {
                if (typeof value === "string" && value.includes(",")) {
                  return `"${value}"`;
                }
                return value;
              })
              .join(",")
          )
          .join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "User Performance.csv");
    });
  };

  const importFileExcel = (data) => {
    const headers = [
      "User Name",
      "Email",
      "FirstName",
      "LastName",
      "Country",
      "Region",
      "Company Name",
      "Company Type",
      "Company Level",
      "Company Status",
      "User Role",
      "VIP Renewal CC (USD)",
      "VIP Renewal DC (USD)",
      "VIP New Business CC (USD)",
      "VIP New Business DC (USD)",
      "VMP Renewal CC (USD)",
      "VMP Renewal DC (USD)",
      "VMP New Business CC (USD)",
      "VMP New Business DC (USD)",
      "VIP Revenue Q1 (USD)",
      "VIP Revenue Q2 (USD)",
      "VIP Revenue Q3 (USD)",
      "VIP Revenue Q4 (USD)",
      "VMP Revenue Q1 (USD)",
      "VMP Revenue Q2 (USD)",
      "VMP Revenue Q3 (USD)",
      "VMP Revenue Q4 (USD)",
      "Revenue Q1 (USD)",
      "Revenue Q2 (USD)",
      "Revenue Q3 (USD)",
      "Revenue Q4 (USD)",
      "Total VIP Revenue (USD)",
      "Total VMP Revenue (USD)",
      "Actual Revenue (USD)",
      "RMA (USD)",
      "Sales DigiPoints",
      "Promotion DigiPoints",
      "Behavior DigiPoints",
      "Total DigiPoints",
      "DigiPoints Redeemed",
      "Total % effectiveness",
    ];

    const dataRows = data.map((row) => {
      return [
        row.employ_id,
        row.email,
        row.name,
        row.last_name,
        row.country_id,
        row.region,
        row.reseller_or_dist_name,
        row.reseller_or_dist_id,
        row.rtype,
        row.dcname,
        row.rolname,
        row.vip_cc_newbusiness,
        row.vip_cc_renewal,
        row.vip_dc_newbusiness,
        row.vip_dc_renewal,
        row.vmp_cc_newbusiness,
        row.vmp_cc_renewal,
        row.vmp_dc_newbusiness,
        row.vmp_dc_renewal,
        row.vip_revenue_q1,
        row.vip_revenue_q2,
        row.vip_revenue_q3,
        row.vip_revenue_q4,
        row.vmp_revenue_q1,
        row.vmp_revenue_q2,
        row.vmp_revenue_q3,
        row.vmp_revenue_q4,
        row.revenue_q1,
        row.revenue_q2,
        row.revenue_q3,
        row.revenue_q4,
        row.vip_revenue_total,
        row.vmp_revenue_total,
        row.revenue_actual,
        row.rma,
        row.sales_digipoints,
        row.promotion_digipoints,
        row.total_digipoints,
        row.redenciones,
      ];
    });

    const allData = [headers, ...dataRows];

    const ws = utils.aoa_to_sheet('');
    const wb = utils.book_new();

    // Fusionar celdas A1 a C1 para el título
   /*  ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }]; */

    // Agregar el título en la celda A1
    /* ws["A1"] = {
      t: "s",
      v: "User Performance",
      s: { font: { bold: true } },
    }; */

    utils.sheet_add_aoa(ws, allData, { origin: "A1" });
    utils.book_append_sheet(wb, ws, "User Performance");
    const blob = new Blob([write(wb, { bookType: "xlsx", type: "array" })], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "User Performance.xlsx");
  };


  /* Selects */
  const handleSelectOneChange = (name, value) => {
    setSelectOne(value);
  };

  const dataOne = [...new Set(data.map((user) => user.reseller_or_dist_name))];

  const dataSelectOne = dataOne.sort().map((companyName) => ({
    value: companyName,
    label: companyName,
  }));

  /* Filter */
  const filteredUsers = data.filter((user) => {
    if (
      selectOne &&
      !user.reseller_or_dist_name
        .toString()
        .toLowerCase()
        .includes(selectOne.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  /* Clear Filter */
  const clearSelects = () => {
    setSelectOne("");
  };

  const currentItems = useMemo(() => {
    const endOffset = itemOffset + itemsPerPage;
    return filteredUsers.slice(itemOffset, endOffset);
  }, [itemOffset, filteredUsers]);

  /* Paginate */
  const pageCount = useMemo(
    () => Math.ceil(filteredUsers.length / itemsPerPage),
    [filteredUsers, itemsPerPage]
  );

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;

    setItemOffset(newOffset);
  };
  return (
    <div className="mt-8">
      <div className="pt-2 grid items-center grid-rows-1 gap-3">
        <TitleWithIcon icon={<User />} title={t("Reportes.user_performance")} />
      </div>
      <div className="flex w-full items-center gap-4 pt-10 pb-2 pl-0">
        <AiOutlineHome
          className="cursor-pointer"
          onClick={() => {
            router.push("/dashboard");
          }}
        />
        <span>
          <AiOutlineRight />
        </span>
        <span
          className="cursor-pointer"
          onClick={() => {
            router.push("/reportesDashboard");
          }}
        >
          My Reports
        </span>
        <span>
          <AiOutlineRight />
        </span>
        <span className="font-bold text-[#1473E6]">
          {t("Reportes.user_performance")}
        </span>
      </div>
      <div className="grid w-auto gap-2">
        <div className="pr-4">
          <CardChart title={"DigiPoints"} paragraph="">
            <MultiLineChart
              dataLeyend={["DigiPoints Redeemed", "Sale DigiPoints"]}
              dataX={months}
              dataOne={redeemPoints}
              dataTwo={salesPoints}
              colorsLine={["red", "green", "blue"]}
            />
          </CardChart>
        </div>
      </div>
      <div className="pt-2 grid items-center sm:grid-cols-5 grid-rows-1 gap-3">
        <SearchInput
          image={<SearchIcon />}
          placeHolder={"Email"}
          stylesContainer={""}
          value={searchByInvoice}
          onChange={(e) => setSearchByInvoice(e.target.value)}
          stylesInput={
            "border-none pl-8 placeholder:text-sm rounded-full w-full max-w-xs"
          }
        />
        <SelectInputValue
          placeholder={"Company Name"}
          value={selectOne}
          data={dataSelectOne}
          icon={<ArrowDown />}
          searchable={true}
          onChange={handleSelectOneChange}
          name={"business"}
        />
        <BtnFilter
          text={t("Reportes.limpiar_filtros")}
          styles="bg-white !text-blue-500 sm:!text-base hover:bg-white border-none hover:border-none m-1"
          onClick={clearSelects}
        />

        <BtnWithImage
          text={t("Reportes.descargar")}
          icon={<CloudDownload />}
          styles={
            "bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
          }
          onClick={() => importFile(data)}
        />
        <BtnWithImage
          text={t("Reportes.descargar") + " excel"}
          icon={<CloudDownload />}
          styles={
            "bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
          }
          onClick={() => importFileExcel(data)}
        />
      </div>
      <div className="grid sm:grid-cols-2 grid-rows-1">
        <div className="grid sm:grid-cols-3 grid-rows-1 sm:justify-items-start justify-items-center mt-3">
          <div className="font-bold flex items-center">
            <h2 className="lg:text-lg sm:text-xl">Users</h2>
          </div>
          {/* <div className="grid col-span-2 sm:w-[55%] w-[60%]">
            <DropDownReport icon={<ArrowDown />} title={t("Reportes.periodo")}>
              <li>
                <a>Período 1</a>
              </li>
              <li>
                <a>Período 2</a>
              </li>
            </DropDownReport>
          </div> */}
        </div>
        <div className="grid sm:grid-cols-2 grid-rows-1 sm:justify-items-end justify-items-center mt-3">
          {/* <InputReporte
            image={<SearchIcon />}
            placeHolder={t("Reportes.buscar")}
            stylesContainer={"mt-2"}
            stylesInput={
              "border-none pl-8 placeholder:text-sm rounded-full w-full max-w-xs"
            }
            stylesImage={"pb-0"}
          /> */}
        </div>
      </div>
      <div className="grid grid-rows-1 justify-items-center pt-5">
        {loading && <div className="lds-dual-ring"></div>}
        {!loading && (
          <>
            <Table
              containerStyles={"mt-4 !rounded-tl-lg !rounded-tr-lg max-h-max"}
              tableStyles={"table-zebra !text-sm"}
              colStyles={"p-2"}
              thStyles={"sticky text-white"}
              cols={[
                "User Name",
                "Name",
                "LastName",
                "Country",
                "Region",
                // "Company ID",
                "Company Name",
                "Company Level",
                // "Company Type",
                // "VIP CC Renewal",
                /* "VIP CC New business",
                "VIP DC Renewal",
                "VIP DC New Business",
                "VMP CC Renewal",
                "VMP CC New business",
                "VMP DC Renewal",
                "VMP DC New Business",
                "VIP Revenue Q1",
                "VIP Revenue Q2",
                "VIP Revenue Q3",
                "VIP Revenue Q4",
                "VMP Revenue Q1",
                "VMP Revenue Q2",
                "VMP Revenue Q3",
                "VMP Revenue Q4", */
                // "Revenue Q1",
                // "Revenue Q2",
                // "Revenue Q3",
                // "Revenue Q4",
                "Total VIP Revenue (USD)",
                "Total VMP Revenue (USD)",
                "Actual Revenue (USD)",
                "RMA (USD)",
                "Total DigiPoints",
                "DigiPoints Redeemed",
              ]}
            >
              {currentItems &&
                [...currentItems]
                  .filter((item) => {
                    if (searchByInvoice !== "") {
                      return item.email.startsWith(searchByInvoice);
                    }
                    return item;
                  })
                  .map((data, index) => (
                    <tr key={index}>
                      <th className="text-left py-3 px-2 mx-4">{data.email}</th>
                      <th className="text-left py-3 px-2 mx-4">
                        {data.name.split(" ")[0]}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {data.name.split(" ").length > 1
                          ? data.name.split(" ").pop()
                          : ""}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {data.country_id}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {data.region}
                      </th>
                      {/* <th className="text-left py-3 px-2 mx-4">{data.country_id}</th> */}
                      {/* <th className="text-left py-3 px-2 mx-4">
                        {data.reseller_or_dist_id}
                      </th> */}
                      <th className="text-left py-3 px-2 mx-4">
                        {data.reseller_or_dist_name}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {data.dcname}
                      </th>
                      {/* <th className="text-left py-3 px-2 mx-4">{data.rtype}</th> */}
                      {/* <th className="text-left py-3 px-2 mx-4">
                        {data.dcname}
                      </th> */}
                      {/* <th className="text-left py-3 px-2 mx-4">{data.rtype}</th> */}
                      {/* <th className="text-left py-3 px-2 mx-4">
                        {numberToMoney(data.vip_cc_renewal)}
                      </th> */}
                      {/* <th className="text-left py-3 px-2 mx-4">
                        {numberToMoney(data.vip_cc_newbusiness)}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {numberToMoney(data.vip_dc_renewal)}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {numberToMoney(data.vip_dc_newbusiness)}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {numberToMoney(data.vmp_cc_renewal)}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {numberToMoney(data.vmp_cc_newbusiness)}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {numberToMoney(data.vmp_dc_renewal)}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {numberToMoney(data.vmp_dc_newbusiness)}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {numberToMoney(data.vip_revenue_q1)}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {numberToMoney(data.vip_revenue_q2)}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {numberToMoney(data.vip_revenue_q3)}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {numberToMoney(data.vip_revenue_q4)}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {numberToMoney(data.vmp_revenue_q1)}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {numberToMoney(data.vmp_revenue_q2)}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {numberToMoney(data.vmp_revenue_q3)}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {numberToMoney(data.vmp_revenue_q4)}
                      </th> */}
                      {/* <th className="text-left py-3 px-2 mx-4">{numberToMoney(data.revenue_q1)}</th>
                      <th className="text-left py-3 px-2 mx-4">{numberToMoney(data.revenue_q2)}</th>
                      <th className="text-left py-3 px-2 mx-4">{numberToMoney(data.revenue_q3)}</th>
                      <th className="text-left py-3 px-2 mx-4">{numberToMoney(data.revenue_q4)}</th> */}
                      <th className="text-left py-3 px-2 mx-4">
                        ${data.vip_revenue_total}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        ${data.vmp_revenue_total}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        ${data.revenue_actual}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">${data.rma}</th>
                      <th className="text-left py-3 px-2 mx-4">
                        {data.total_digipoints}
                      </th>
                      <th className="text-left py-3 px-2 mx-4">
                        {data.redenciones}
                      </th>
                    </tr>
                  ))}
            </Table>
          </>
        )}
      </div>
      <div className="w-full pt-5">
        {!loading && (
          <>
            <ReactPaginate
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              nextClassName={"item next "}
              previousClassName={"item previous"}
              activeClassName={"item active "}
              breakClassName={"item break-me "}
              breakLabel={"..."}
              disabledClassName={"disabled-page"}
              pageClassName={"item pagination-page "}
              nextLabel={
                <FaChevronRight style={{ color: "#000", fontSize: "20" }} />
              }
              previousLabel={
                <FaChevronLeft style={{ color: "#000", fontSize: "20" }} />
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SalesPerformance;
