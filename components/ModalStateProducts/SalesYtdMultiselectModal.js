import React from "react";
import { ArrowDown, CloseCircle, Filter } from "../icons";
import { Modal, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import BtnWithImage from "../cardReportes/BtnWithImage";
import { useTranslation } from "react-i18next";
import SelectInputValue from "../inputs/SelectInputValue";
import BtnFilter from "../cardReportes/BtnFilter";

const SalesYtdMultiselectModal = ({
  title = "",
  datas = [
    {
      placeholder: "",
      value: [],
      dataSelect: [],
      searchable: false,
      icon: "",
      onChange: () => {},
      name: "",
    },
  ],
}) => {
  /* Variable and const */
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [t, i18n] = useTranslation("global");

  return (
    <>
      <Modal
        title={title}
        opened={opened}
        withCloseButton={true}
        onClose={close}
        centered
        size={"lg"}
        transitionProps={{ transition: "rotate-left" }}
        closeButtonProps={{
          variant: "none",
          size: "auto",
          children: <CloseCircle />,
        }}
        padding={10}
      >
        {datas.map((data, index) => (
          <div className="p-5 gap-3">
            <SelectInputValue
              placeholder={data.placeholder}
              /* value={data.value}
      data={data.dataSelect} */
              icon={data.icon}
              searchable={data.searchable}
              /* onChange={data.onChange} */
              name={data.name}
            />
          </div>
        ))}
        <BtnFilter
          text={t("Reportes.limpiar_filtros")}
          styles="bg-white !text-gray-400 sm:!text-base hover:bg-white hover:!text-blue-500 border-none hover:border-none m-1"
          /* onClick={clearSelects} */
        />
      </Modal>
      <BtnWithImage
        text={t("Más filtros")}
        icon={<Filter />}
        styles={
          "bg-white btn-sm !text-blue-500 hover:bg-white border-none mt-2"
        }
        onClick={open}
      />
    </>
  );
};

export default SalesYtdMultiselectModal;
