import {
  Layout,
  Slider,
  DatePicker,
  Select,
  Button,
  Input,
  Rate,
  Spin,
  SliderSingleProps,
} from "antd";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import { useEffect, useState } from "react";
import { TProduct } from "../../types/product.types";
import { useAppDispatch } from "../../redux/hooks";
import {
  addProductFilterQuery,
  removeProductFilterQuery,
} from "../../redux/features/filter/filterSlice";
import { StorageSizesArray } from "../../constant/storageSize.constant";
const { Sider } = Layout;

const { RangePicker } = DatePicker;

type TFilter = {
  price: number;
  screenSize: string[];
  frontCamera: string[];
  backCamera: string[];
};

const FilterSidebar = () => {
  const [filterInfo, setFilterInfo] = useState<TFilter>();
  const { handleSubmit, control } = useForm();
  const [query, setQuery] = useState("");
  const { data, isLoading } = useGetProductsQuery(query);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && data?.data) {
      const filterObj = data?.data.reduce(
        (acc: TFilter, cur: TProduct) => {
          if (cur.price > acc.price) acc.price = cur.price;

          if (!acc.screenSize.includes(cur.screenSize))
            acc.screenSize.push(cur.screenSize);

          if (!acc.frontCamera.includes(cur.camera.front))
            acc.frontCamera.push(cur.camera.front);

          if (!acc.backCamera.includes(cur.camera.back))
            acc.backCamera.push(cur.camera.back);

          return acc;
        },
        {
          price: 0,
          screenSize: [],
          frontCamera: [],
          backCamera: [],
        }
      );

      setFilterInfo(filterObj);
    }
  }, [isLoading, data]);

  // handle filter form submit
  const onSubmit = (data: FieldValues) => {
    const {
      price,
      brand,
      frontCamera,
      backCamera,
      model,
      os,
      ram,
      releaseDate,
      screenSize,
      storage,
      rating,
    } = data;

    const [dateObj1, dateObj2] = releaseDate || [];

    let startDate;
    let endDateDate;

    if (dateObj1 && dateObj2) {
      startDate = `${dateObj1.$y}-${dateObj1.$M + 1}-${dateObj1.$D}`;
      endDateDate = `${dateObj2.$y}-${dateObj2.$M + 1}-${dateObj2.$D}`;
    }

    const [minPrice, maxPrice] = price || [];

    // generate query params
    let queryParams = "";
    if (minPrice >= 0 && maxPrice) {
      queryParams = queryParams.concat(`price=${minPrice},${maxPrice}&`);
    }

    if (startDate && endDateDate) {
      queryParams = queryParams.concat(
        `releaseDate=${startDate},${endDateDate}&`
      );
    }

    if (brand) {
      queryParams = queryParams.concat(`brand=${brand}&`);
    }

    if (os) {
      queryParams = queryParams.concat(`operatingSystem=${os}&`);
    }

    if (ram) {
      queryParams = queryParams.concat(`ram=${ram}&`);
    }

    if (storage) {
      queryParams = queryParams.concat(`rom=${storage}&`);
    }

    if (screenSize) {
      queryParams = queryParams.concat(`screenSize=${screenSize}&`);
    }

    if (frontCamera) {
      queryParams = queryParams.concat(`frontCamera=${frontCamera}&`);
    }

    if (backCamera) {
      queryParams = queryParams.concat(`backCamera=${backCamera}&`);
    }

    if (model) {
      queryParams = queryParams.concat(`model=${model}&`);
    }

    if (rating >= 0) {
      queryParams = queryParams.concat(`rating=${rating}`);
    }

    dispatch(addProductFilterQuery(queryParams));
    setQuery(queryParams);
  };

  // handle filter form reset
  const resetForm = () => {
    // create form form default values object
    const defaultValues: FieldValues = {
      price: [0, 0],
      brand: "",
      frontCamera: "",
      backCamera: "",
      model: "",
      os: "",
      ram: "",
      releaseDate: null,
      screenSize: "",
      storage: "",
      rating: -1,
    };

    // reset the form using react-hook-form
    control._reset(defaultValues);
  };

  const handleChange = () => {
    handleSubmit(onSubmit)();
  };

  if (isLoading) return <Spin size="large" />;

  const marks: SliderSingleProps["marks"] = {
    0: {
      style: {
        color: "#f50",
      },
      label: <strong>0</strong>,
    },
    [filterInfo?.price || 0]: {
      style: {
        color: "#f50",
      },
      label: <strong>{filterInfo?.price}</strong>,
    },
  };

  const handleRemoveFilter = () => {
    setQuery("");
    resetForm();
    dispatch(removeProductFilterQuery());
  };

  return (
    <>
      <Sider>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "10px" }}>
            <p style={{ fontSize: "18px" }}>Price Range</p>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Slider
                  range
                  {...field}
                  min={0}
                  max={filterInfo?.price}
                  marks={marks}
                  defaultValue={[0, 0]}
                />
              )}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <p style={{ fontSize: "18px" }}>Release Date</p>
            <Controller
              name="releaseDate"
              control={control}
              defaultValue={null}
              render={({ field }) => <RangePicker size="middle" {...field} />}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <p style={{ fontSize: "18px" }}>Rating</p>
            <Controller
              name="rating"
              control={control}
              defaultValue={-1}
              render={({ field }) => (
                <div onBlur={handleChange}>
                  <Rate allowHalf defaultValue={2.5} {...field} />
                </div>
              )}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <p style={{ fontSize: "18px" }}>Brand</p>
            <Controller
              name="brand"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  style={{ width: 200 }}
                  placeholder="Search brand name"
                  {...field}
                />
              )}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <p style={{ fontSize: "18px" }}>Model</p>
            <Controller
              name="model"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  style={{ width: 200 }}
                  placeholder="Search model name"
                  {...field}
                />
              )}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <p style={{ fontSize: "18px" }}>Operating System</p>
            <Controller
              name="os"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div onBlur={handleChange}>
                  <Select
                    popupMatchSelectWidth={false}
                    style={{ width: 200 }}
                    placeholder="Filter by operating system"
                    {...field}
                    options={[
                      { value: "Android", label: <span>Android</span> },
                      { value: "iOS", label: <span>iOS</span> },
                    ]}
                  />
                </div>
              )}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <p style={{ fontSize: "18px" }}>Storage</p>
            <Controller
              name="storage"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  popupMatchSelectWidth={false}
                  style={{ width: 200 }}
                  placeholder="Filter by storage"
                  {...field}
                  options={StorageSizesArray.map((size) => ({
                    value: size,
                    label: <span>{size}</span>,
                  }))}
                />
              )}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <p style={{ fontSize: "18px" }}>RAM</p>
            <Controller
              name="ram"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  popupMatchSelectWidth={false}
                  style={{ width: 200 }}
                  placeholder="Filter by RAM"
                  {...field}
                  options={StorageSizesArray.map((size) => ({
                    value: size,
                    label: <span>{size}</span>,
                  }))}
                />
              )}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <p style={{ fontSize: "18px" }}>Screen Size</p>
            <Controller
              name="screenSize"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  popupMatchSelectWidth={false}
                  style={{ width: 200 }}
                  placeholder="Filter by screen size"
                  {...field}
                  options={filterInfo?.screenSize.map((size) => ({
                    value: size,
                    label: <span>{size}</span>,
                  }))}
                />
              )}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <p style={{ fontSize: "18px" }}>Front Camera</p>
            <Controller
              name="frontCamera"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  popupMatchSelectWidth={false}
                  style={{ width: 200 }}
                  placeholder="Filter by front camera"
                  {...field}
                  options={filterInfo?.frontCamera.map((size) => ({
                    value: size,
                    label: <span>{size}</span>,
                  }))}
                />
              )}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <p style={{ fontSize: "18px" }}>Back Camera</p>
            <Controller
              name="backCamera"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  popupMatchSelectWidth={false}
                  style={{ width: 200 }}
                  placeholder="Filter by back camera"
                  {...field}
                  options={filterInfo?.backCamera.map((size) => ({
                    value: size,
                    label: <span>{size}</span>,
                  }))}
                />
              )}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <Button htmlType="submit" block>
              Apply Filter
            </Button>
          </div>
        </form>

        <div style={{ marginTop: "20px" }}>
          <Button onClick={handleRemoveFilter} block>
            Remove Filter
          </Button>
        </div>
      </Sider>
    </>
  );
};

export default FilterSidebar;
