import React, { FC } from "react";

interface CardProps {
  name?: string;
  price?: string;
  addToCart?: string;
  image?: string;
  onclick?: () => void;
  qty?: string;
}

export const Card: FC<CardProps> = ({
  name,
  price,
  addToCart,
  image,
  onclick,
}) => {
  return (
    <div className="card card-compact bg-base-100 shadow-xl ">
      <figure>
        <img src={image} className="w-full h-[200px]" />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-semibold">{name}</h2>
        <p>Rp. {price}</p>
        <div className="card-actions justify-end">
          <button className="btn bg-blue-500 border-none" onClick={onclick}>
            {addToCart}
          </button>
        </div>
      </div>
    </div>
  );
};

export const CardAside: FC<CardProps> = ({ name, price, image, qty }) => {
  return (
    <div className="card card-side shadow-xl my-5">
      <figure>
        <img src={image} className="w-[120px] h-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Rp. {price}</p>
        <p>{qty}</p>
      </div>
    </div>
  );
};
