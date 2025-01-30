import React from "react";
import { ShoppingCarProduct } from "services/Awards/awards.service";

const MiniTarget = ({ cardInfo }:{cardInfo:ShoppingCarProduct}) => {
  const backgroundColorCard = () => {
    const colorbg:any = {
      50: "#E63888",
      60: "#EB1000",
      100: "#1473E6",
      150: "#009C3B",
      200: "#000000",
      300: "#21A5A2",
      400: "#E9740A",
      500: "#6349E0",
    };

    return colorbg[Math.trunc(Number(cardInfo.price))];
  };

  return (
    <div
      className={`w-[102.52px] lg:h-[59px] h-[70px] rounded-lg p-2`}
      style={{ backgroundColor: backgroundColorCard() }}
    >
      <div>
        <div className="flex justify-between">
          <div className="text-white flex flex-col">
            <p className="!text-base font-bold">${cardInfo?.price}</p>
            <p
              className="!text-[5px] font-light px-1"
              style={{ whiteSpace: "nowrap" }}
            >
              Gift Card
            </p>
          </div>
          <figure className="flex items-center">
            <img
              src={cardInfo?.image}
              alt="apc_canales"
              className="w-[60%] ml-auto"
            />
          </figure>
        </div>
      </div>
      <div className="grid grid-cols-3 place-items-center gridMiniCards">
        <figure className="p-1">
          <img
            src="/assets/login/adobe.webp"
            alt="apc_canales"
            className="w-full"
          />
        </figure>
        <figure className="p-1">
          <img
            src="/assets/login/pcc.webp"
            alt="apc_canales"
            className="w-full"
          />
        </figure>
        <figure className="flex p-2">
          <img
            src="/assets/dashboard/logoapc.webp"
            alt="apc_canales"
            className="w-[100%]"
          />
        </figure>
      </div>
    </div>
  );
};

export default MiniTarget;
