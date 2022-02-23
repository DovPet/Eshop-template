import React from "react";
import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { selectItems } from "../slices/basketSlice";
import { useSelector } from "react-redux";

function Header() {
  const {data: session} = useSession()
  const router = useRouter()
  const items = useSelector(selectItems)

  return (
    <header>
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push('/')}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/DotShop_gTLD_logo.svg/1200px-DotShop_gTLD_logo.svg.png"
            width={150}
            height={40}
            alt="logo"
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div onClick={session ? signOut : signIn} className="link">
            <p>
              {session ? `Hello, ${session.user.name}` : "Sign In"}
            </p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div onClick={() => router.push('/checkout')} className="relative flex items-center link">
            <span className="absolute top-0 right-0 md:right-11 rounded-full h-4 w-4 bg-yellow-400 text-center text-black font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="font-extrabold md:text-sm hidden md:inline mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center bg-amazon_blue-light text-white text-sm space-x-3 p-2 pl-6">
          <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1"/>
          All</p>
          <p className="link">Today`s Deals</p>
          <p className="link">Electronics</p>
          <p className="link">Clothing</p>
          <p className="link">Business</p>
          <p className="link hidden lg:inline-flex">Food & Grocery</p>
          <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;
