import { Modal } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import PerUsers from "./DigiPointsDistributionModals/PerUsers";
import PerTeams from "./DigiPointsDistributionModals/PerTeams";
import { getDigipointsPa } from "../../store/reducers/sales.reducer";

const DigipointsDistribution = () => {
  const [opened, setOpened] = useState(false);
  const [t, i18n] = useTranslation("global");
  const user = useSelector((state) => state.user.user);
  const iduser = useSelector((state) => state.user.user.id);
  const teams = useSelector((state) => state.teams.teams);
  const users = useSelector((state) => state.user.companyUsers);
  const [salesOption, setSalesOption] = useState("salesRep");
  const [numModal, setNumModal] = useState(0);
  const [teamInfo, setTeamInfo] = useState({});
  const [searchByEmail, setSearchByEmail] = useState("");
  const [listUsers, setListUsers] = useState(false);
  const [hover, setHover] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const [invoiceData, setInvoiceData] = useState({});
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.sales.digipa);
  useEffect(() => {
    console.log(data);
    if (token && data.length === 0) {

      dispatch(getDigipointsPa(token, 3));

    }
  }, [token]);

  const searchUser = () => {
    const searchValue = users.filter(({ email }) =>
      email.startsWith(searchByEmail.toLocaleLowerCase())
    );

    if (searchValue.length !== 0) {
      return searchValue.map((data) => (
        <div
          className="flex flex-col bg-base-100 rounded-xl p-2 hover:bg-base-300 cursor-pointer"
          onClick={() => verifyUserInToTable(data)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <p>
            <strong className="text-primary">Nombre:</strong>
            <strong>{data.name}</strong>
          </p>
          <p>
            <strong className="text-primary">Email:</strong> {data.email}
          </p>
        </div>
      ));
    }

    if (searchByEmail === "") {
      return users.map((data) => (
        <div
          className="flex flex-col bg-base-100 rounded-xl p-2 hover:bg-base-300 cursor-pointer"
          onClick={() => verifyUserInToTable(data)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <p>
            <strong className="text-primary">Nombre:</strong>
            <strong>{data.name}</strong>
          </p>
          <p>
            <strong className="text-primary">Email:</strong> {data.email}
          </p>
        </div>
      ));
    }

    if (searchValue.length === 0 && searchByEmail !== "") {
      return (
        <div className="flex flex-col bg-base-100 rounded-xl p-2 hover:bg-base-300 cursor-pointer">
          <p>No hay concidencias encontradas</p>
        </div>
      );
    }
  };

  const verifyUserInToTable = (data) => {
    const dataModalFilter = dataModal.map(({ email }) => email);

    if (dataModalFilter.includes(data.email)) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      return (
        Toast.fire({
          icon: "error",
          title: "Este participante ya está dentro de la lista",
        }),
        setSearchByEmail(""),
        setListUsers(false)
      );
    } else {
      setSearchByEmail("");
      setListUsers(false);
      setDataModal([...dataModal, { ...data, porcentaje: 0 }]);
    }
  };

  const componentMenuUsers = useMemo(() => {
    if (listUsers) {
      return (
        <div className="w-full absolute bg-[#e6e6e6] p-5 max-h-52 flex flex-col gap-3 overflow-y-auto">
          {searchUser()}
        </div>
      );
    }
  }, [listUsers, searchByEmail]);

  const handleSubmit = (/* e */) => {
    /* e.preventDefault(); */

    /* const newData = data.filter(
      ({ factura }) => factura !== invoiceData.factura
    );
    setData([{ ...invoiceData, estatus: false }, ...newData]); */

    setSalesOption("salesRep");
    setNumModal(0);
    setOpened(false);
    setDataModal([]);
    setListUsers(false);
    setHover(false);
    setOpened(false);
  };

  const typeModal = useMemo(() => {
    if (numModal === 0) {
      return (
        <div className="flex flex-col gap-10">
          <h2 className="font-bold">Distribución de DigiPoints</h2>
          <p>Seleccione una opción para distribuir los DigiPoints</p>
          <select
            className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            onChange={(e) => setSalesOption(e.target.value)}
          >
            <option value="salesRep">Representante de ventas</option>
            <option value="salesTeam">Equipo de ventas</option>
          </select>
          {salesOption === "salesTeam" && (
            <select
              className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              onChange={(e) => {
                const team = teams.find(
                  (data) => Number(e.target.value) === data.id
                );
                return setTeamInfo(team);
              }}
            >
              <option value="">Elije tu equipo de ventas</option>
              {teams.map((data) => (
                <option value={data.id}>{data.name_group}</option>
              ))}
            </select>
          )}
          <button className="btn btn-primary" onClick={() => nextModal()}>
            Continuar
          </button>
        </div>
      );
    }
    if (numModal === 1) {
      return (
        <PerUsers
          invoiceData={invoiceData}
          dataModal={dataModal}
          setDataModal={setDataModal}
          searchByEmail={searchByEmail}
          setSearchByEmail={setSearchByEmail}
          setListUsers={setListUsers}
          componentMenuUsers={componentMenuUsers}
          handleSubmit={handleSubmit}
          hover={hover}
        />
      );
    }
    if (numModal === 2) {
      return (
        <PerTeams
          invoiceData={invoiceData}
          teamInfo={teamInfo}
          handleSubmit={handleSubmit}
        />
      );
    }
  }, [
    numModal,
    salesOption,
    listUsers,
    searchByEmail,
    hover,
    dataModal,
    teamInfo,
  ]);

  const nextModal = () => {
    if (salesOption === "salesTeam") {
      setSalesOption("salesRep");
      return setNumModal(2);
    } else {
      setSalesOption("salesRep");
      return setNumModal(1);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setSalesOption("salesRep");
          setNumModal(0);
          setOpened(false);
          setDataModal([]);
          setListUsers(false);
          setHover(false);
        }}
        size={numModal === 0 ? "40%" : "70%"}
        centered
      >
        {typeModal}
      </Modal>
      <div className="w-full md:w-2/2 shadow-xl p-5 rounded-lg bg-white">
        <div className="flex justify-between w-full">
          <select className="px-4 py-3 w-max rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
            <option value="">{t("tabla.ordenarFecha")}</option>
            <option value="upDown">{t("tabla.recienteA")}</option>
            <option value="downUp">{t("tabla.antiguoR")}</option>
          </select>
        </div>
        <br></br>
        <div className="container">
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-black-500">
              <thead className="text-xs text-black-500 uppercase">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    {t("tabla.nfactura")}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {t("tabla.fecha")}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Cliente
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {t("tabla.hproductos")}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {t("tabla.cantidad")}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Digipoints
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {t("tabla.asignar")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((array1) =>
                  array1.map((array2) =>
                    array2.map((obj) => (
                      <tr className="bg-white border-b dark:border-gray-500">
                        <td className="py-4 px-6">{obj?.digipoints}</td>
                        <td className="py-4 px-6">{obj?.invoices_included}</td>
                        {obj.invoiceDetails.map((details, index) => (
                          <td className="py-4 px-6" key={index}>
                            {details.end_user_name1}
                          </td>
                        ))[0]}
                        {obj.invoiceDetails.map((details, index) => (
                          <td className="py-4 px-6" key={index}>
                            {details.market_segment}
                          </td>
                        ))[0]}
                        {obj.invoiceDetails.map((details, index) => (
                          <td className="py-4 px-6" key={index}>
                            {details.deploy_to_country}
                          </td>
                        ))[0]}
                        {obj.invoiceDetails.map((details, index) => (
                          <td className="py-4 px-6" key={index}>
                            {details.billing_date}
                          </td>
                        ))[0]}
                        <td className="py-4 px-6">
                          {obj.status === false ? (
                            <button
                              className="btn btn-primary btn-xs"
                              onClick={() => {
                                setInvoiceData(obj);
                                setOpened(true);
                              }}
                            >
                              Asignar
                            </button>
                          ) : (
                            <button className="btn btn-secondary btn-xs">
                              Asignado
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigipointsDistribution;
