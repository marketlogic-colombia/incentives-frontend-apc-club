import React, { useEffect, useState } from "react";
import ContainerContent from "../components/containerContent";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import SelectInputValue from "../components/inputs/SelectInputValue";
import { ArrowDown } from "../components/icons";
import client from "../contentful";
import HtwImage from "../components/htw/htwImage";
import { Select } from "@mantine/core";
import HTW24 from "../public/assets/htw/htw-24";
import Table2Htw from "../components/htw/Table2Htw";
import { RootState } from "store/store";
import { CurrentUser } from "services/User/user.service";
import Image from "next/image";

const howtowin = ({ htws }: { htws: any }) => {
  const { user } = useSelector((state: RootState) => state.currentUser);
  const [t, i18n] = useTranslation("global");
  const typeSegment = [
    t("htw.autoRenova"),
    t("htw.reactivation"),
    t("htw.nuevosn"),
  ];
  const [dataHTW2, setDataHTW2] = useState<string>("New Business");

  const htwRes =
    dataHTW2 === "Q3-Q4"
      ? {
          AcrobatPro: ["15", "10", "5", "30", "20", "20"],
          AcrobatSign: ["15", "10", "5", "30", "20", "20"],
          ForTeam: ["20", "10", "8", "40", "20", "30"],
          SDL: ["15", "10", "8", "30", "20", "25"],
          SLP: ["15", "10", "8", "30", "20", "25"],
        }
      : {
          AcrobatPro: ["15", "10", "-", "30", "20", "20"],
          AcrobatSign: ["15", "10", "-", "30", "20", "20"],
          ForTeam: ["20", "10", "-", "40", "20", "30"],
          SDL: ["15", "10", "-", "30", "20", "25"],
          SLP: ["15", "10", "-", "30", "20", "25"],
        };

  const htwDist =
    dataHTW2 === "Q3-Q4"
      ? {
          AcrobatPro: ["10", "5", "3", "15", "10", "5"],
          AcrobatSign: ["10", "5", "3", "15", "10", "5"],
          ForTeam: ["10", "5", "3", "15", "10", "5"],
          SDL: ["10", "5", "3", "15", "10", "5"],
          SLP: ["10", "5", "3", "15", "10", "5"],
        }
      : {
          AcrobatPro: ["10", "5", "-", "15", "10", "5"],
          AcrobatSign: ["10", "5", "-", "15", "10", "5"],
          ForTeam: ["10", "5", "-", "15", "10", "5"],
          SDL: ["10", "5", "-", "15", "10", "5"],
          SLP: ["10", "5", "-", "15", "10", "5"],
        };

  const htwData = htwRes;

  // return (
  //   <ContainerContent pageTitle={t("dashboard.htw")}>
  //     <div className="flex flex-col gap-10 mb-12 m-6">
  //       <div className="bg-[#01505b] w-full h-[35vh] relative overflow-hidden flex">
  //         <div className="bgCointainerHTW"></div>
  //         <div className="w-full h-full flex justify-center items-center">
  //           <h2
  //             className="2xl:!text-4xl font-bold text-white text-center"
  //             dangerouslySetInnerHTML={{ __html: String(t("htw.title")) }}
  //           ></h2>
  //         </div>
  //       </div>
  //       <div className="flex flex-col w-full justify-center items-center gap-10">
  //         <h3
  //           className="2xl:!text-3xl font-bold xl:!text-2xl lg:!text-xl text-center"
  //           dangerouslySetInnerHTML={{ __html: String(t("htw.secondTitle")) }}
  //         ></h3>
  //         {/* <p
  //           className="!text-xs text-center"
  //           dangerouslySetInnerHTML={{ __html: t("htw.phraseSecondTitle") }}
  //         ></p> */}
  //       </div>
  //       <div className="flex flex-col gap-6 shadow-xl rounded-lg lg:p-6 p-3">
  //         <Select
  //           value={dataHTW2}
  //           data={["Q1-Q2", "Q3-Q4"].map((data) => {
  //             return {
  //               value: data,
  //               label: data,
  //             };
  //           })}
  //           onChange={(data) => setDataHTW2(String(data))}
  //           name={"dateHTW"}
  //           classNames={{
  //             input:
  //               "rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white",
  //           }}
  //         />
  //         <div className="w-full grid grid-cols-4 lg:gap-0 gap-6">
  //           <div className="flex col-span-3 lg:col-span-2 lg:gap-2 xl:gap-6">
  //             <div className="lg:px-2 xl:px-6">
  //               <HTW24 />
  //             </div>
  //             <div className="flex flex-col justify-end gap-3 px-3">
  //               <p className="lg:!text-xl text-primary font-bold">
  //                 {t("htw.tabletitle1")}
  //               </p>
  //               <hr />
  //               <p className="lg:!text-[10px] xl:!text-sm text-[#1473E6] font-semibold">
  //                 {t("htw.tabledescription1")}
  //               </p>
  //               <p className="lg:!text-[10px] xl:!text-sm font-semibold">
  //                 {t("htw.business1")}
  //               </p>
  //             </div>
  //           </div>
  //           <div className="col-span-3 lg:col-span-2 grid grid-cols-3 lg:gap-x-6 gap-x-4 gap-y-2 place-items-center">
  //             {typeSegment.map((text, idx) => (
  //               <div
  //                 className={`flex flex-col lg:flex-row w-full bg-[#F4F4F4] rounded-lg items-center justify-center gap-3 lg:py-0 py-3 h-fit border-l-4 ${
  //                   (idx + 1) % 2 === 0
  //                     ? "border-info"
  //                     : (idx + 1) % 3 === 0
  //                     ? "border-[#2C2C2C]"
  //                     : "border-primary"
  //                 }`}
  //               >
  //                 <p className="!text-xs lg:!text-sm font-bold text-center py-3">
  //                   {text}
  //                 </p>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //         <div className="w-full lg:grid flex flex-col-reverse grid-cols-4">
  //           <div className="flex flex-col lg:flex-row w-full col-span-1 justify-center">
  //             <div className="w-full flex lg:flex-col flex-row gap-6 justify-center">
  //               <div className="flex items-center">
  //                 <div className="flex flex-col items-center gap-3 w-1/2 lg:w-1/3 lg:h-1/2 justify-center">
  //                   <figure className="w-[40px]">
  //                     <img src="/assets/dashboard/DC.webp"></img>
  //                   </figure>
  //                   <p className="font-bold xl:!text-base lg:!text-xs text-center">
  //                     Document <br /> Cloud
  //                   </p>
  //                 </div>
  //                 <div className="lg:w-2/3 flex flex-col gap-3">
  //                   <p className="py-6 flex justify-center items-center font-semibold shadow rounded-md text-sm bg-[#D5D5D5]">
  //                     Acrobat Pro
  //                   </p>
  //                   <p className="py-6 flex justify-center items-center font-semibold shadow rounded-md text-sm bg-[#F4F4F4]">
  //                     Acrobat Sign
  //                   </p>
  //                 </div>
  //               </div>
  //               <div className="flex items-center">
  //                 <div className="flex flex-col items-center gap-3 w-1/2 lg:w-1/3 lg:h-1/2 justify-center">
  //                   <figure className="w-[40px]">
  //                     <img src="/assets/dashboard/cc.webp"></img>
  //                   </figure>
  //                   <p className="font-bold xl:!text-base lg:!text-xs text-center">
  //                     Creative <br /> Cloud
  //                   </p>
  //                 </div>
  //                 <div className="lg:w-2/3 flex flex-col gap-3">
  //                   <p className="py-6 flex justify-center items-center font-semibold shadow rounded-md text-sm bg-[#D5D5D5]">
  //                     For Teams
  //                   </p>
  //                   <p className="py-6 flex justify-center items-center font-semibold shadow rounded-md text-sm bg-[#F4F4F4]">
  //                     SDL/Named
  //                   </p>
  //                   <p className="py-6 flex justify-center items-center font-semibold shadow rounded-md text-sm bg-[#F4F4F4]">
  //                     SLP
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="col-span-3 flex flex-col gap-6 ">
  //             <div className="flex flex-col gap-2">
  //               <div className="col-span-full grid grid-cols-6">
  //                 <div className="col-span-2 flex flex-col justify-center gap-3">
  //                   <p className="text-center">1 - 4 {t("htw.licences")}</p>
  //                   <p className="text-center">+ 5 {t("htw.licences")}</p>
  //                 </div>
  //                 <div className="col-span-4 grid grid-cols-3 gap-2">
  //                   {htwData.AcrobatPro.map((text, idx) => (
  //                     <div
  //                       className={`flex flex-col lg:flex-row w-full bg-[#F4F4F4] rounded-lg items-center justify-center gap-3 lg:py-0 py-3 h-fit border-l-4 ${
  //                         idx % 3 === 0
  //                           ? "border-primary"
  //                           : idx % 3 === 1
  //                           ? "border-info"
  //                           : "border-[#2C2C2C]"
  //                       }`}
  //                     >
  //                       <p className="!text-xs lg:!text-sm font-bold text-center py-1">
  //                         {text}
  //                       </p>
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //               <hr />
  //               <div className="col-span-full grid grid-cols-6">
  //                 <div className="col-span-2 flex flex-col justify-center gap-3">
  //                   <p className="text-center">
  //                     1 - 2999 {t("htw.transactions")}
  //                   </p>
  //                   <p className="text-center">
  //                     + 3000 {t("htw.transactions")}
  //                   </p>
  //                 </div>
  //                 <div className="col-span-4 grid grid-cols-3 gap-2">
  //                   {htwData.AcrobatPro.map((text, idx) => (
  //                     <div
  //                       className={`flex flex-col lg:flex-row w-full bg-[#F4F4F4] rounded-lg items-center justify-center gap-3 lg:py-0 py-3 h-fit border-l-4 ${
  //                         idx % 3 === 0
  //                           ? "border-primary"
  //                           : idx % 3 === 1
  //                           ? "border-info"
  //                           : "border-[#2C2C2C]"
  //                       }`}
  //                     >
  //                       <p className="!text-xs lg:!text-sm font-bold text-center py-1">
  //                         {text}
  //                       </p>
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="flex flex-col gap-2">
  //               <div className="col-span-full grid grid-cols-6">
  //                 <div className="col-span-2 flex flex-col justify-center gap-3">
  //                   <p className="text-center">1 - 9 {t("htw.licences")}</p>
  //                   <p className="text-center">+ 10 {t("htw.licences")}</p>
  //                 </div>
  //                 <div className="col-span-4 grid grid-cols-3 gap-2">
  //                   {htwData.ForTeam.map((text, idx) => (
  //                     <div
  //                       className={`flex flex-col lg:flex-row w-full bg-[#F4F4F4] rounded-lg items-center justify-center gap-3 lg:py-0 py-3 h-fit border-l-4 ${
  //                         idx % 3 === 0
  //                           ? "border-primary"
  //                           : idx % 3 === 1
  //                           ? "border-info"
  //                           : "border-[#2C2C2C]"
  //                       }`}
  //                     >
  //                       <p className="!text-xs lg:!text-sm font-bold text-center py-1">
  //                         {text}
  //                       </p>
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //               <hr />
  //               <div className="col-span-full grid grid-cols-6">
  //                 <div className="col-span-2 flex flex-col justify-center gap-3">
  //                   <p className="text-center">1 - 49 {t("htw.licences")}</p>
  //                   <p className="text-center">+ 50 {t("htw.licences")}</p>
  //                 </div>
  //                 <div className="col-span-4 grid grid-cols-3 gap-2">
  //                   {htwData.SLP.map((text, idx) => (
  //                     <div
  //                       className={`flex flex-col lg:flex-row w-full bg-[#F4F4F4] rounded-lg items-center justify-center gap-3 lg:py-0 py-3 h-fit border-l-4 ${
  //                         idx % 3 === 0
  //                           ? "border-primary"
  //                           : idx % 3 === 1
  //                           ? "border-info"
  //                           : "border-[#2C2C2C]"
  //                       }`}
  //                     >
  //                       <p className="!text-xs lg:!text-sm font-bold text-center py-1">
  //                         {text}
  //                       </p>
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //               <hr />
  //               <div className="col-span-full grid grid-cols-6">
  //                 <div className="col-span-2 flex flex-col justify-center gap-3">
  //                   <p className="text-center">1 - 24 {t("htw.licences")}</p>
  //                   <p className="text-center">+ 25 {t("htw.licences")}</p>
  //                 </div>
  //                 <div className="col-span-4 grid grid-cols-3 gap-2">
  //                   {htwData.SLP.map((text, idx) => (
  //                     <div
  //                       className={`flex flex-col lg:flex-row w-full bg-[#F4F4F4] rounded-lg items-center justify-center gap-3 lg:py-0 py-3 h-fit border-l-4 ${
  //                         idx % 3 === 0
  //                           ? "border-primary"
  //                           : idx % 3 === 1
  //                           ? "border-info"
  //                           : "border-[#2C2C2C]"
  //                       }`}
  //                     >
  //                       <p className="!text-xs lg:!text-sm font-bold text-center py-1">
  //                         {text}
  //                       </p>
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="w-full flex justify-center my-6">
  //           <div className="w-[80%]">
  //             <p className="text-sm">
  //               <strong className="text-primary">
  //                 {t("htw.autorenovaInput")}
  //               </strong>{" "}
  //               {t("htw.autorenovaDes")}
  //             </p>
  //             <p className="text-sm">
  //               <strong className="text-primary">
  //                 {t("htw.reactivationInput")}
  //               </strong>{" "}
  //               {t("htw.reactivationDes")}
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //       <Table2Htw user={user as CurrentUser} dataHTW={dataHTW2} />
  //     </div>
  //   </ContainerContent>
  // );

  const HTwlanguage=()=>{
    return i18n.resolvedLanguage === "por" ? <>
    {dataHTW2 === "New Business" ? (
            <Image
              src={
                "https://res.cloudinary.com/dechrcyu3/image/upload/v1739553126/ADOBE/HOW_TO_WIN_NEW_BUSINESS_FEBRERO_2025_jp44jf.jpg"
              }
              height={1200}
              width={1245}
              quality={100}
              style={{ width: "100%", height: "100%" }}
              className={`img-fluid`}
            />
          ) : (
            <Image
              src={
                "https://res.cloudinary.com/dechrcyu3/image/upload/v1739553125/ADOBE/HOW_TO_WIN_AUTORENEWAL_FEBRERO_2025_ojjsiz.jpg"
              }
              height={1200}
              width={1245}
              quality={100}
              style={{ width: "100%", height: "100%" }}
              className={`img-fluid`}
            />
          )}
    </>:<>
    {dataHTW2 === "New Business" ? (
            <Image
              src={
                "https://res.cloudinary.com/dechrcyu3/image/upload/v1739553126/ADOBE/HOW_TO_WIN_NEW_BUSINESS_FEBRERO_2025_jp44jf.jpg"
              }
              height={1200}
              width={1245}
              quality={100}
              style={{ width: "100%", height: "100%" }}
              className={`img-fluid`}
            />
          ) : (
            <Image
              src={
                "https://res.cloudinary.com/dechrcyu3/image/upload/v1739553125/ADOBE/HOW_TO_WIN_AUTORENEWAL_FEBRERO_2025_ojjsiz.jpg"
              }
              height={1200}
              width={1245}
              quality={100}
              style={{ width: "100%", height: "100%" }}
              className={`img-fluid`}
            />
          )}
    </>
  }

  return (
    <ContainerContent pageTitle={t("dashboard.htw")}>
      <div className="flex flex-col gap-10 mb-12 m-6">
        <div className="bg-[#01505b] w-full h-[35vh] relative overflow-hidden flex">
          <div className="bgCointainerHTW"></div>
          <div className="w-full h-full flex justify-center items-center">
            <h2
              className="2xl:!text-4xl font-bold text-white text-center"
              dangerouslySetInnerHTML={{ __html: String(t("htw.title")) }}
            ></h2>
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-center gap-10">
          <h3
            className="2xl:!text-3xl font-bold xl:!text-2xl lg:!text-xl text-center"
            dangerouslySetInnerHTML={{ __html: String(t("htw.secondTitle")) }}
          ></h3>
          {/* <p
            className="!text-xs text-center"
            dangerouslySetInnerHTML={{ __html: t("htw.phraseSecondTitle") }}
          ></p> */}
        </div>
        <div className="flex flex-col gap-6 shadow-xl rounded-lg lg:p-6 p-3">
          <Select
            value={dataHTW2}
            data={["New Business", "Autorenewal"].map((data) => {
              return {
                value: data,
                label: data,
              };
            })}
            onChange={(data) => setDataHTW2(String(data))}
            name={"dateHTW"}
            classNames={{
              input:
                "rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white",
            }}
          />
          {dataHTW2 === "New Business" ? (
            <Image
              src={
                "https://res.cloudinary.com/dechrcyu3/image/upload/v1739561802/ADOBE/HOW_TO_WIN_NEW_BUSINESS_FEBRERO_2025_Final_tggas1.webp"
              }
              height={1200}
              width={1245}
              quality={100}
              style={{ width: "100%", height: "100%" }}
              className={`img-fluid`}
            />
          ) : (
            <Image
              src={
                "https://res.cloudinary.com/dechrcyu3/image/upload/v1739561802/ADOBE/HOW_TO_WIN_AUTORENEWAL_FEBRERO_2025_Final_ko8zkh.webp"
              }
              height={1200}
              width={1245}
              quality={100}
              style={{ width: "100%", height: "100%" }}
              className={`img-fluid`}
            />
          )}
        </div>
      </div>
    </ContainerContent>
  );
};

export async function getServerSideProps() {
  const entries = await client.getEntries({
    content_type: "sectionHtw",
  });

  return {
    props: {
      htws: entries.items.map(({ fields }) => fields),
    },
  };
}

export default howtowin;
