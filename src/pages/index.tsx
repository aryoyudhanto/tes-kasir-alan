import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import Modal from "../components/Modal";

import { DataMenu } from "../utils/Type";

function index() {
  const [data, setData] = useState<DataMenu[]>([]);
  const [id, setid] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [qty, setQty] = useState<string>("1");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    const getMenu = localStorage.getItem("MenuResto");
    if (getMenu) {
      setData(JSON.parse(getMenu));
    }
  }

  function submitMenuResto() {
    const menuResto =
      JSON.parse(localStorage.getItem("MenuResto") || "[]") || [];
    const menu = {
      id: id,
      name: name,
      image: image,
      price: price,
      qty: qty,
    };
    menuResto.push(menu);
    localStorage.setItem("MenuResto", JSON.stringify(menuResto));
    navigate(0);
  }

  return (
    <Layout
      food="border-b-2 border-blue-400 text-blue-400"
      transaksi="text-black"
    >
      <div className="m-5">
        <div className="w-full bg-white rounded-2xl border-2 border-blue-500">
          <div className="px-14 py-10">
            <p className="text-black my-5 text-xl mb-10 font-bold">
              Tambahkan menu makanan yang ada pada resto
            </p>
            <label
              htmlFor="my-modal-1"
              className="btn capitalize bg-blue-500 text-white border-none"
            >
              + Tambah Menu
            </label>
            <Modal no="1" titleModal="Tambah Menu">
              <div className="flex items-center justify-center w-full mb-5">
                <p className="w-1/4 text-black">No</p>
                <input
                  type="text"
                  className="input input-bordered bg-white w-3/4 border-black"
                  value={id}
                  onChange={(e) => setid(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center w-full mb-5">
                <p className="w-1/4 text-black">Nama Menu</p>
                <input
                  type="text"
                  className="input input-bordered bg-white w-3/4 border-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center w-full mb-5">
                <p className="w-1/4 text-black">Foto Menu</p>
                <input
                  type="text"
                  className="input input-bordered bg-white w-3/4 border-black"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center w-full mb-5">
                <p className="w-1/4 text-black">Harga Menu</p>
                <input
                  type="text"
                  className="input input-bordered bg-white w-3/4 border-black"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center w-full mb-5">
                <p className="w-1/4 text-black">Quantity Awal</p>
                <input
                  type="text"
                  className="input input-bordered bg-white w-3/4 border-black"
                  value={qty}
                  readOnly
                />
              </div>
              <div className="modal-action">
                <label
                  htmlFor="my-modal-1"
                  className="w-24 text-sm text-center border-2 border-blue-500 rounded-xl py-1 text-blue-500 font-medium duration-300 hover:cursor-pointer hover:bg-red-600 hover:text-white  active:scale-90"
                >
                  Cancel
                </label>
                <button
                  onClick={submitMenuResto}
                  className="w-24 text-sm text-center border-2 border-blue-500 rounded-xl py-1 text-blue-500 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900 hover:text-white  active:scale-90 "
                >
                  Submit
                </button>
              </div>
            </Modal>
            <table className="table table-zebra w-full my-7 ">
              {/* head */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-center text-lg capitalize">No</th>
                  <th className="text-lg capitalize">Name</th>
                  <th className="text-lg capitalize">Foto</th>
                  <th className="text-lg capitalize">Harga</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {data.map((data) => (
                    <tr>
                      <th className="text-center">{data.id}</th>
                      <td>{data.name}</td>
                      <td>
                        <img src={data.image} className="w-14 h-14"></img>
                      </td>
                      <td>Rp. {data.price}</td>
                    </tr>
                  ))}
                </>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default index;
