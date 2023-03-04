import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { Card, CardAside } from "../components/Card";
import Layout from "../components/Layout";
import Modal from "../components/Modal";

import { DataMenu } from "../utils/Type";

const Transasksi = () => {
  const [data, setData] = useState<DataMenu[]>([]);
  const [pesanan, setPesanan] = useState<DataMenu[]>([]);
  const [total, setTotal] = useState<number>();
  const [bill, setBill] = useState<any>();
  const [change, setChange] = useState<number>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchDataPesanan();
  }, []);

  function fetchData() {
    const getMenu = localStorage.getItem("MenuResto");
    if (getMenu) {
      setData(JSON.parse(getMenu));
    }
  }
  function fetchDataPesanan() {
    const getPesanan = localStorage.getItem("Pesanan");
    if (getPesanan) {
      setPesanan(JSON.parse(getPesanan));
    }
  }

  function handlePesanan(data: DataMenu) {
    const checkExist = localStorage.getItem("Pesanan");
    if (checkExist) {
      let parsePesanan: DataMenu[] = JSON.parse(checkExist);
      parsePesanan.push(data);
      localStorage.setItem("Pesanan", JSON.stringify(parsePesanan));
      Swal.fire({
        title: "Menu added to Cart",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(0);
        }
      });
    } else {
      localStorage.setItem("Pesanan", JSON.stringify([data]));
      Swal.fire({
        title: "Menu Added to Cart",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(0);
        }
      });
    }
  }
  function deleteCart() {
    localStorage.removeItem("Pesanan");
    navigate(0);
  }

  function charge() {
    let numbers = pesanan.map((item) =>
      parseInt(item.price ? item.price : "1")
    );
    if (numbers) {
      let sum = numbers.reduce((acc, curr) => acc + curr);
      setTotal(sum);
    }
  }

  function changeBill() {
    if (bill && total) {
      if (total > bill) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your Money Isn't Enough",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(0);
          }
        });
      } else {
        let sum = bill - total;
        Swal.fire({
          title: "Transaction Success",
          icon: "success",
          text: `Your Change is Rp. ${sum}`,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("Pesanan");
            navigate(0);
          }
        });
      }
    }
  }

  function saveBill() {
    let menuCart = localStorage.getItem("Pesanan");
    if (menuCart) {
      Swal.fire({
        title: "Bill Has Been Save",
        icon: "success",
        text: `Pay Immediately by Pressing The Charge Button.`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(0);
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Add Menu To Cart First",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(0);
        }
      });
    }
  }
  function printBill() {
    let menuCart = localStorage.getItem("Pesanan");
    if (menuCart) {
      Swal.fire({
        title: "Bill Has Been Printed",
        icon: "success",
        text: `Thanks For The Order`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(0);
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Add Menu To Cart First",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(0);
        }
      });
    }
  }

  return (
    <Layout
      food="text-black"
      transaksi="border-b-2 border-blue-400 text-blue-400"
    >
      <div className="flex w-full">
        <div className="w-2/3 bg-white p-10 rounded-2xl mx-5 border-2 border-blue-500">
          <p className="text-xl font-bold">Menu Yang Tersedia</p>
          <div className="m-5 grid grid-cols-3 gap-3">
            {data.map((data) => (
              <Card
                key={data.id}
                name={data.name}
                image={data.image}
                price={data.price}
                addToCart={"Add To Cart"}
                onclick={() => handlePesanan(data)}
              />
            ))}
          </div>
        </div>
        <div className="w-1/3 bg-white p-10 rounded-2xl mr-5 border-2 border-blue-500">
          <p className="text-xl font-bold">Pesanan</p>
          {!pesanan ? (
            <p className="text-black text-7xl">Pilih Menu terlebih dahulu</p>
          ) : (
            pesanan.map((data) => (
              <CardAside
                name={data.name}
                price={data.price}
                image={data.image}
              />
            ))
          )}
          <button
            className="btn w-full bg-blue-500 text-white border-none mt-16 "
            onClick={() => deleteCart()}
          >
            Clear Cart
          </button>
          <div className="flex justify-center my-5">
            <div className="flex justify-center w-1/2 pr-2">
              <button
                className="btn w-full bg-blue-500 text-white border-none"
                onClick={() => saveBill()}
              >
                Save Bill
              </button>
            </div>
            <div className="flex justify-center w-1/2 pl-2">
              <button
                className="btn w-full bg-blue-500 text-white border-none"
                onClick={() => printBill()}
              >
                Print Bill
              </button>
            </div>
          </div>
          <label
            htmlFor="my-modal-1"
            className="btn w-full bg-blue-500 text-white border-none"
            onClick={() => charge()}
          >
            Charge
          </label>
          <Modal no="1" titleModal="Detail Pesanan">
            <table className="table table-zebra w-full my-7 ">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-lg capitalize">Name</th>
                  <th className="text-lg capitalize">Foto</th>
                  <th className="text-lg capitalize">Harga</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {pesanan.map((data) => (
                    <tr>
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
            <p className="capitalize text-lg">Total price: Rp. {total}</p>
            <div className="flex items-center justify-center w-full my-5">
              <p className="w-1/4 text-black">Bayar</p>
              <input
                type="text"
                className="input input-bordered bg-white w-3/4 border-black"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
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
                onClick={changeBill}
                className="w-24 text-sm text-center border-2 border-blue-500 rounded-xl py-1 text-blue-500 font-medium duration-300 hover:cursor-pointer  hover:bg-blue-900 hover:text-white  active:scale-90 "
              >
                Submit
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default Transasksi;
