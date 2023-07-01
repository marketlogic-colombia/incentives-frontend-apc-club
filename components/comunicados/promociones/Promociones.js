import React from "react";
import { SearchInput, SelectInput } from "../../inputs";
import TitleWithIcon from "../../titles/TitleWithIcon";
import { SearchIcon, Star } from "../../icons";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import TargetPromociones from "./TargetPromociones";

const Promociones = ({ selectData = [], datas = [], dataContentful }) => {
  const [t, i18n] = useTranslation("global");

  return (
    <div>
      <div className="grid justify-items-center items-center pt-8 pb-8">
        {t("comunicado.bienvenida")}
      </div>
      <div className="grid justify-items-center">
        <div className="font-bold sm:text-4xl text-xl text-center">
          {t("comunicado.tituloPartUno")}
        </div>
        <div className="font-bold sm:text-4xl text-xl text-center">
          {t("comunicado.tituloPartDos")}
        </div>
        <div className="font-bold sm:text-4xl text-xl text-center text-red-600">
          {t("comunicado.tituloPartTres")}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 grid-rows-1 justify-items-center pt-8">
        <div className="grid grid-cols-2 gap-3">
          <TitleWithIcon
            icon={<Star width={40} height={40} />}
            title={t("comunicado.promocion")}
          />
          <div className="grid justify-items-end items-center">
            <SelectInput
              placeholder={t("comunicado.mostrar")}
              size={"sm"}
              data={selectData}
            />
          </div>
        </div>
        <div className="grid items-center justify-items-center w-full">
          <SearchInput
            image={<SearchIcon />}
            placeHolder={t("comunicado.buscar")}
            stylesContainer={""}
            stylesInput={
              "border-none pl-8 placeholder:text-sm rounded-full !w-full"
            }
          />
        </div>
      </div>
      <div className="flex justify-center items-center pt-10 pb-10">
        <div className="grid grid-cols-3 gap-3 gap-y-6">
          {dataContentful.map((data, index) => (
            <TargetPromociones data={data} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Promociones;
