import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFilters,
  clearFilters,
  selectFilteredProducts,
  selectProducts,
} from "../slices/basketSlice";
import { getUniqueValues } from "../utils/helpers";
import styles from "../styles/Product.module.css";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

function Filter({ preActiveCategory }) {
  const dispatch = useDispatch();
  const all_products = useSelector(selectProducts);
  const [activeCategory, setActiveCategory] = useState("all");
  const [lastChange, setLastChange] = useState(null);
  const [showClear, setShowClear] = useState(false);
  const [price, setPrice] = useState({ min: 0, max: 0 });
  const [priceMax, setPriceMax] = useState(1);

  const categories = all_products
    ? getUniqueValues(all_products, "category")
    : null;
  const filterCategory = (value, item) => {
    setShowClear(true);
    if (item === "category") {
      setActiveCategory(value);
      setLastChange("category");
    }
  };

  useEffect(() => {
    const items = ["category"];
    const selected = {
      category: activeCategory,
    };
    if (all_products) {
      let filtered = all_products;

      if (selected[lastChange] !== "all") {
        filtered = all_products.filter(
          (product) => product[lastChange] === selected[lastChange]
        );
      } else {
        items.forEach((x) => {
          filtered =
            x == lastChange && selected[x] !== "all"
              ? filtered.filter((product) => product[x] === selected[x])
              : filtered;
        });
      }

      items.forEach((x) => {
        if (selected[x] !== "all") {
          filtered =
            x !== lastChange
              ? filtered.filter((product) => product[x] === selected[x])
              : filtered;
        }
      });
      dispatch(updateFilters(filtered));
    }
  }, [activeCategory, lastChange]);

  useEffect(() => {
    clearAllFilters(preActiveCategory);
    if (!all_products) return false;
    const max = all_products
      ?.map((product) => product.price)
      .reduce((a, b) => Math.max(a, b));
    setPriceMax(max);
    setPrice({ min: 0, max: max });

  }, [all_products]);

  const clearAllFilters = (filterValue) => {
    dispatch(clearFilters());
    setShowClear(false);
    setActiveCategory(filterValue ? filterValue : "all");
    setPrice({ min: 0, max: priceMax });
  };

  const priceFilter = (value) => {
    setPrice(value);
    const filtered = all_products.filter(
      (product) => product.price <= value.max && product.price >= value.min
    );
    dispatch(updateFilters(filtered));
    setShowClear(true);
  };

  return (
    <div className="flex flex-col mt-10">
      <div className="mb-4">
        <h2 className="font-bold text-base text-gray-600">Categories</h2>
        <div className="flex flex-col my-5">
          {categories &&
            categories.map((value) => (
              <p
                key={value}
                className={`${
                  value == activeCategory && styles.active_filter
                } text-gray-500 cursor-pointer mb-2 capitalize`}
                onClick={() => filterCategory(value, "category")}
              >
                {value}
              </p>
            ))}
        </div>
      </div>
      <div className="mb-4 pr-10">
        <h2 className="font-bold text-base text-gray-600">Price</h2>
        <div className="flex flex-col my-5">
          <InputRange
            maxValue={priceMax}
            minValue={0}
            value={price}
            formatLabel={(value) => `$ ${value}`}
            onChange={priceFilter}
          />
        </div>
      </div>

      {showClear && (
        <button onClick={clearAllFilters} className="button w-full">
          Clear Filter
        </button>
      )}
    </div>
  );
}

export default Filter;
