import { useRouter } from "next/router";
import { Modal } from "@mantine/core";
import React, { useState, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  policyAndPassword,
  userUpdate,
} from "../../store/reducers/users.reducer";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const UserOptions = ({ user, token, logout, menuUser, setMenuUser }) => {
  const route = useRouter();

  const [opened, setOpened] = useState(false);
  const [modal, setModal] = useState(0);
  const [nInputs, setNInputs] = useState(0);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");
  const [image, setImage] = useState({});
  const [viewimage, setviewImage] = useState("");

  const sections = [
    {
      svg: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.25 9C2.25 9 1.6875 8.78907 1.6875 7.875C1.6875 6.96094 2.25 6.75 2.25 6.75M15.75 8.64844C15.75 8.64844 16.3125 8.49621 16.3125 7.875C16.3125 7.25379 15.75 7.10157 15.75 7.10157M9.00002 5.625V10.125M3.93751 5.625V10.125M14.3417 1.83586C14.3417 1.83586 11.2957 5.625 8.43752 5.625H2.8125C2.66332 5.625 2.52024 5.68427 2.41475 5.78976C2.30926 5.89524 2.25 6.03832 2.25 6.1875V9.5625C2.25 9.71169 2.30926 9.85476 2.41475 9.96025C2.52024 10.0657 2.66332 10.125 2.8125 10.125H8.43752C11.2957 10.125 14.3417 13.93 14.3417 13.93C14.5547 14.2112 15.1875 14.0186 15.1875 13.5844V2.17969C15.1875 1.74692 14.5899 1.51805 14.3417 1.83586Z"
            stroke="#232B2F"
            stroke-width="1.1875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.25 9C2.25 9 1.6875 8.78907 1.6875 7.875C1.6875 6.96094 2.25 6.75 2.25 6.75M15.75 8.64844C15.75 8.64844 16.3125 8.49621 16.3125 7.875C16.3125 7.25379 15.75 7.10157 15.75 7.10157M9.00002 5.625V10.125M3.93751 5.625V10.125M14.3417 1.83586C14.3417 1.83586 11.2957 5.625 8.43752 5.625H2.8125C2.66332 5.625 2.52024 5.68427 2.41475 5.78976C2.30926 5.89524 2.25 6.03832 2.25 6.1875V9.5625C2.25 9.71169 2.30926 9.85476 2.41475 9.96025C2.52024 10.0657 2.66332 10.125 2.8125 10.125H8.43752C11.2957 10.125 14.3417 13.93 14.3417 13.93C14.5547 14.2112 15.1875 14.0186 15.1875 13.5844V2.17969C15.1875 1.74692 14.5899 1.51805 14.3417 1.83586Z"
            stroke="black"
            stroke-opacity="0.2"
            stroke-width="1.1875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.0625 10.125V16.0313C5.0625 16.1058 5.09213 16.1774 5.14488 16.2301C5.19762 16.2829 5.26916 16.3125 5.34375 16.3125H7.20704C7.29515 16.3125 7.38204 16.2919 7.4607 16.2522C7.53937 16.2124 7.6076 16.1548 7.6599 16.0839C7.71221 16.013 7.74712 15.9308 7.76183 15.8439C7.77653 15.757 7.77063 15.6679 7.74458 15.5837C7.44997 14.6387 6.75 13.5731 6.75 11.8125H7.31251C7.46169 11.8125 7.60476 11.7532 7.71025 11.6478C7.81574 11.5423 7.87501 11.3992 7.87501 11.25V10.6875C7.87501 10.5383 7.81574 10.3952 7.71025 10.2898C7.60476 10.1843 7.46169 10.125 7.31251 10.125H6.75"
            stroke="#232B2F"
            stroke-width="1.1875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.0625 10.125V16.0313C5.0625 16.1058 5.09213 16.1774 5.14488 16.2301C5.19762 16.2829 5.26916 16.3125 5.34375 16.3125H7.20704C7.29515 16.3125 7.38204 16.2919 7.4607 16.2522C7.53937 16.2124 7.6076 16.1548 7.6599 16.0839C7.71221 16.013 7.74712 15.9308 7.76183 15.8439C7.77653 15.757 7.77063 15.6679 7.74458 15.5837C7.44997 14.6387 6.75 13.5731 6.75 11.8125H7.31251C7.46169 11.8125 7.60476 11.7532 7.71025 11.6478C7.81574 11.5423 7.87501 11.3992 7.87501 11.25V10.6875C7.87501 10.5383 7.81574 10.3952 7.71025 10.2898C7.60476 10.1843 7.46169 10.125 7.31251 10.125H6.75"
            stroke="black"
            stroke-opacity="0.2"
            stroke-width="1.1875"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      nombre: "Comunicados",
      page: "/releases",
    },
    {
      svg: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.99999 2.81253C7.77621 2.81253 6.57992 3.17542 5.56239 3.85531C4.54486 4.5352 3.75179 5.50156 3.28347 6.63217C2.81515 7.76279 2.69262 9.00689 2.93136 10.2071C3.17011 11.4074 3.75941 12.5099 4.62475 13.3752C5.49009 14.2406 6.5926 14.8299 7.79286 15.0686C8.99312 15.3074 10.2372 15.1848 11.3678 14.7165C12.4985 14.2482 13.4648 13.4551 14.1447 12.4376C14.8246 11.4201 15.1875 10.2238 15.1875 9.00003C15.1875 7.359 14.5356 5.78518 13.3752 4.6248C12.2148 3.46442 10.641 2.81253 8.99999 2.81253Z"
            stroke="#232B2F"
            stroke-width="1.25"
            stroke-miterlimit="10"
          />
          <path
            d="M8.99999 2.81253C7.77621 2.81253 6.57992 3.17542 5.56239 3.85531C4.54486 4.5352 3.75179 5.50156 3.28347 6.63217C2.81515 7.76279 2.69262 9.00689 2.93136 10.2071C3.17011 11.4074 3.75941 12.5099 4.62475 13.3752C5.49009 14.2406 6.5926 14.8299 7.79286 15.0686C8.99312 15.3074 10.2372 15.1848 11.3678 14.7165C12.4985 14.2482 13.4648 13.4551 14.1447 12.4376C14.8246 11.4201 15.1875 10.2238 15.1875 9.00003C15.1875 7.359 14.5356 5.78518 13.3752 4.6248C12.2148 3.46442 10.641 2.81253 8.99999 2.81253Z"
            stroke="black"
            stroke-opacity="0.2"
            stroke-width="1.25"
            stroke-miterlimit="10"
          />
          <path
            d="M7.03125 7.11176C7.03125 7.11176 7.06078 6.49652 7.71926 5.96672C8.10985 5.65207 8.57813 5.56102 9 5.55469C9.38426 5.54977 9.72739 5.6134 9.9327 5.71113C10.2843 5.87848 10.9688 6.28699 10.9688 7.1557C10.9688 8.06976 10.3711 8.48496 9.69012 8.94164C9.00915 9.39832 8.82422 9.89402 8.82422 10.4062"
            stroke="black"
            stroke-width="1.09375"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M8.78906 12.9375C9.17739 12.9375 9.49219 12.6227 9.49219 12.2344C9.49219 11.846 9.17739 11.5312 8.78906 11.5312C8.40074 11.5312 8.08594 11.846 8.08594 12.2344C8.08594 12.6227 8.40074 12.9375 8.78906 12.9375Z"
            fill="black"
          />
        </svg>
      ),
      nombre: "Preguntas frecuentes",
      page: "/ask",
    },
  ];

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

  const deleteProfileImage = () => {
    return axios
      .patch(
        `${process.env.BACKURL}/users/${user.id}`,
        {
          profilePhotoPath: "noImage",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        dispatch(userUpdate({ profilePhotoPath: "noImage" }));
        return Toast.fire({
          icon: "success",
          title: t("user.fotoDelete"),
        });
      });
  };

  const handleImgProfile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (e) => {
      const dataURL = e.target.result;
      setviewImage({ path: dataURL });
    };

    reader.readAsDataURL(file);
    setImage(file);
  };

  const handleSubmitImgProfile = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("file", image);
    form.append("upload_preset", "ADOBEAPC");

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
        form
      )
      .then((res) => {
        axios
          .patch(
            `${process.env.BACKURL}/users/${user.id}`,
            { profilePhotoPath: res.data.url },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res2) => {
            dispatch(userUpdate({ profilePhotoPath: res.data.url }));
            return Toast.fire({
              icon: "success",
              title: t("user.fotoUpdate"),
            });
          });
      })
      .catch((error) => console.log(error));
  };

  const typeModal = useMemo(() => {
    if (modal === 0) {
      return (
        <div>
          <p>¡Tus datos fueron actualizados!</p>
        </div>
      );
    }
    if (modal === 1) {
      return (
        <div className="flex flex-col w-auto justify-center items-center gap-10">
          <div className="w-1/5 relative">
            <div className="relative sm:absolute bg-red-500 hover:bg-red-600 sm:w-8 sm:h-8 w-5 h-5 text-center rounded-full sm:-right-4 -right-8 sm:top-0 top-2">
              <div
                className="rounded-full w-auto h-auto flex justify-center text-center p-1 cursor-pointer"
                onClick={deleteProfileImage}
              >
                <p className="text-white">X</p>
              </div>
            </div>
            <figure className="relative imgPhoto w-full h-full rounded-full">
              <img
                src={
                  viewimage === ""
                    ? user.profilePhotoPath === null ||
                      user.profilePhotoPath === "" ||
                      user.profilePhotoPath === "noImage"
                      ? "/assets/Icons/user.webp"
                      : user.profilePhotoPath
                    : viewimage.path
                }
                className={
                  viewimage.path
                    ? "rounded-full sm:w-40 sm:h-40 w-20 h-20"
                    : "rounded-full w-auto h-auto"
                }
              />
            </figure>
          </div>
          <div className="relative">
            <label className="flex flex-col justify-center transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="font-medium text-gray-600 text-center">
                Arrastra tu foto aquí o selecciona una de tu equipo
              </span>
              <input
                type="file"
                name="file_upload"
                className="file-input file-input-ghost w-auto h-auto"
                onChange={handleImgProfile}
              />
            </label>
          </div>
          <button
            className="btn bg-red-500 hover:bg-red-600"
            onClick={handleSubmitImgProfile}
          >
            Subir mi nueva foto
          </button>
        </div>
      );
    }
  }, [modal, opened, image, viewimage]);

  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,300,0,-25"
        />
      </head>
      <Modal
        opened={opened}
        onClose={() => {
          setviewImage("");
          setOpened(false);
        }}
        centered
        size={"50%"}
      >
        {typeModal}
      </Modal>
      <div
        className="w-full bg-[#FFFF] absolute top-[65px] right-0 p-4 max-w-[310px] flex flex-col gap-6 items-center mr-6"
        style={{
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "10px",
        }}
      >
        <div className="w-full flex justify-center">
          <div className="w-3/4 justify-center flex flex-col items-center gap-3">
            {/* START */}
            <div className="relative bg-[#1473E6] rounded-full w-[80px] h-[80px] flex items-center justify-center">
              {user.profilePhotoPath === null ||
              user.profilePhotoPath === "" ||
              user.profilePhotoPath === "noImage" ? (
                <p className="text-white absolute !text-base">
                  {user.names.split("")[0]}
                </p>
              ) : (
                <img
                  src={user.profilePhotoPath}
                  className="w-full h-full rounded-full"
                  alt="Avatar"
                />
              )}
              <div class="relative h-full w-full">
                {user.profilePhotoPath === null ||
                user.profilePhotoPath === "" ||
                user.profilePhotoPath === "noImage" ? (
                  <div class="absolute h-full w-full left-14 -top-0 ">
                    <label className="btn btn-circle btn-sm bg-gray-300	border-none hover:bg-gray-400 drop-shadow-lg text-black">
                      <span
                        class="material-symbols-outlined"
                        onClick={() => {
                          setModal(1);
                          setOpened(true);
                        }}
                      >
                        photo_camera
                      </span>
                    </label>
                  </div>
                ) : (
                  <div class="absolute h-full w-full -left-5 -top-1 ">
                    <button
                      className="btn btn-circle btn-sm bg-gray-300	border-none hover:bg-gray-400 drop-shadow-lg !text-black"
                      onClick={deleteProfileImage}
                    >
                      X
                    </button>
                    {/* <label className="btn btn-circle btn-sm bg-gray-300	border-none hover:bg-gray-400 drop-shadow-lg text-black">
                      <span
                        class="material-symbols-outlined"
                        onClick={deleteProfileImage}
                      >
                        close
                      </span>
                    </label> */}
                  </div>
                )}
              </div>
              {/* <svg
              width="43"
              height="43"
              viewBox="0 0 43 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-0 top-0 mr-[-10px]"
            >
              <g filter="url(#filter0_d_397_6749)">
                <circle cx="21.5" cy="17.5" r="17.5" fill="#F4F4F4" />
              </g>
              <g clip-path="url(#clip0_397_6749)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M30.6875 22.75V14.875C30.6875 14.5269 30.5492 14.1931 30.3031 13.9469C30.0569 13.7008 29.7231 13.5625 29.375 13.5625H27.8368C26.793 13.5619 25.7922 13.147 25.0543 12.4088L23.9649 11.3221C23.7194 11.0765 23.3867 10.9383 23.0396 10.9375H19.9618C19.6137 10.9376 19.2799 11.0759 19.0338 11.3221L17.9471 12.4088C17.2088 13.1473 16.2075 13.5623 15.1632 13.5625H13.625C13.2769 13.5625 12.9431 13.7008 12.6969 13.9469C12.4508 14.1931 12.3125 14.5269 12.3125 14.875V22.75C12.3125 23.0981 12.4508 23.4319 12.6969 23.6781C12.9431 23.9242 13.2769 24.0625 13.625 24.0625H29.375C29.7231 24.0625 30.0569 23.9242 30.3031 23.6781C30.5492 23.4319 30.6875 23.0981 30.6875 22.75ZM13.625 12.25C12.9288 12.25 12.2611 12.5266 11.7688 13.0188C11.2766 13.5111 11 14.1788 11 14.875V22.75C11 23.4462 11.2766 24.1139 11.7688 24.6062C12.2611 25.0984 12.9288 25.375 13.625 25.375H29.375C30.0712 25.375 30.7389 25.0984 31.2312 24.6062C31.7234 24.1139 32 23.4462 32 22.75V14.875C32 14.1788 31.7234 13.5111 31.2312 13.0188C30.7389 12.5266 30.0712 12.25 29.375 12.25H27.8368C27.1406 12.2499 26.473 11.9732 25.9809 11.4809L24.8941 10.3941C24.402 9.90181 23.7344 9.62515 23.0382 9.625H19.9618C19.2656 9.62515 18.598 9.90181 18.1059 10.3941L17.0191 11.4809C16.527 11.9732 15.8594 12.2499 15.1632 12.25H13.625Z"
                  fill="#8D8D8D"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.5 21.4375C22.3702 21.4375 23.2048 21.0918 23.8202 20.4764C24.4355 19.8611 24.7812 19.0265 24.7812 18.1562C24.7812 17.286 24.4355 16.4514 23.8202 15.8361C23.2048 15.2207 22.3702 14.875 21.5 14.875C20.6298 14.875 19.7952 15.2207 19.1798 15.8361C18.5645 16.4514 18.2188 17.286 18.2188 18.1562C18.2188 19.0265 18.5645 19.8611 19.1798 20.4764C19.7952 21.0918 20.6298 21.4375 21.5 21.4375V21.4375ZM21.5 22.75C22.7183 22.75 23.8868 22.266 24.7483 21.4045C25.6098 20.543 26.0938 19.3746 26.0938 18.1562C26.0938 16.9379 25.6098 15.7695 24.7483 14.908C23.8868 14.0465 22.7183 13.5625 21.5 13.5625C20.2817 13.5625 19.1132 14.0465 18.2517 14.908C17.3902 15.7695 16.9062 16.9379 16.9062 18.1562C16.9062 19.3746 17.3902 20.543 18.2517 21.4045C19.1132 22.266 20.2817 22.75 21.5 22.75V22.75Z"
                  fill="#8D8D8D"
                />
                <path
                  d="M14.9375 15.5312C14.9375 15.7053 14.8684 15.8722 14.7453 15.9953C14.6222 16.1184 14.4553 16.1875 14.2812 16.1875C14.1072 16.1875 13.9403 16.1184 13.8172 15.9953C13.6941 15.8722 13.625 15.7053 13.625 15.5312C13.625 15.3572 13.6941 15.1903 13.8172 15.0672C13.9403 14.9441 14.1072 14.875 14.2812 14.875C14.4553 14.875 14.6222 14.9441 14.7453 15.0672C14.8684 15.1903 14.9375 15.3572 14.9375 15.5312V15.5312Z"
                  fill="#8D8D8D"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_397_6749"
                  x="0"
                  y="0"
                  width="43"
                  height="43"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_397_6749"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_397_6749"
                    result="shape"
                  />
                </filter>
                <clipPath id="clip0_397_6749">
                  <rect
                    width="21"
                    height="21"
                    fill="white"
                    transform="translate(11 7)"
                  />
                </clipPath>
              </defs>
            </svg> */}
            </div>
            {/* END */}
            <div className="text-center">
              <p className="lg:!text-sm xl:!text-base">
                {user.name} {user.lastName}
              </p>
              <p className="xl:!text-xs">{user.email}</p>
            </div>
            <button
              className="btn !btn-outline btn-info w-3/4 min-h-[2.563rem] h-[2.563rem]"
              onClick={() => {
                route.push(`/user/${user.name}`);
                setMenuUser(!menuUser);
              }}
            >
              Ver perfil
            </button>
          </div>
        </div>
        {/* <div className="flex justify-center flex-col items-center w-auto gap-1">
        {sections.map(({ svg, nombre }) => (
          <div className="flex items-center self-start text-left gap-3 p-2 hover:underline underline-offset-8 cursor-pointer hover:font-semibold">
            {svg}
            <p>{nombre}</p>
          </div>
        ))}
      </div> */}
        <div className="w-[70%] flex flex-col items-center">
          <hr className="w-full" />
          <p
            className="!text-xs mt-6 font-bold cursor-pointer"
            onClick={logout}
          >
            Cerrar Sesión
          </p>
        </div>
      </div>
    </>
  );
};

export default UserOptions;
