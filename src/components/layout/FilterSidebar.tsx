import { Layout, Slider, DatePicker, Select, Button, Input, Rate } from "antd";
import { Controller, FieldValues, useForm } from "react-hook-form";
const { Sider } = Layout;

const { RangePicker } = DatePicker;
const { Option } = Select;

const FilterSidebar = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data: FieldValues) => {
    // Handle form submission
    console.log(data);

    // const {
    //   price: [minPrice, maxPrice],
    //   brand,
    //   frontCamera,
    //   backCamera,
    //   model,
    //   os,
    //   ram,
    //   releaseDate: [dateObj1, dateObj2],
    //   screenSize,
    //   storage,
    // } = data;

    // let startDate;
    // let endDateDate;

    // if (dateObj1 && dateObj2) {
    //   startDate = `${dateObj1.$y}-${dateObj1.$M + 1}-${dateObj1.$D}`;
    //   endDateDate = `${dateObj2.$y}-${dateObj2.$M + 1}-${dateObj2.$D}`;
    // }

    // console.log(startDate, endDateDate);
  };

  const handleChange = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <Sider>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "10px" }}>
            <p style={{ fontSize: "18px" }}>Price</p>
            <Controller
              name="price"
              control={control}
              defaultValue={[0, 50]}
              render={({ field }) => <Slider range {...field} />}
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
              defaultValue={2.5}
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
                    style={{ width: 200 }}
                    placeholder="Filter by operating system"
                    {...field}
                  >
                    <Option value="android">Android</Option>
                    <Option value="ios">iOS</Option>
                  </Select>
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
                  style={{ width: 200 }}
                  placeholder="Filter by storage"
                  {...field}
                >
                  <Option value="2GB">2GB</Option>
                  <Option value="4GB">4GB</Option>
                  <Option value="8GB">8GB</Option>
                  <Option value="16GB">16GB</Option>
                  <Option value="32GB">32GB</Option>
                  <Option value="64GB">64GB</Option>
                  <Option value="128GB">128GB</Option>
                  <Option value="512GB">512GB</Option>
                  <Option value="1TB">1TB</Option>
                  {/* Add more options as needed */}
                </Select>
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
                  style={{ width: 200 }}
                  placeholder="Filter by RAM"
                  {...field}
                >
                  <Option value="2GB">2GB</Option>
                  <Option value="4GB">4GB</Option>
                  <Option value="8GB">8GB</Option>
                  <Option value="16GB">16GB</Option>
                  <Option value="32GB">32GB</Option>
                  <Option value="64GB">64GB</Option>
                  <Option value="128GB">128GB</Option>
                  {/* Add more options as needed */}
                </Select>
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
                  style={{ width: 200 }}
                  placeholder="Filter by screen size"
                  {...field}
                >
                  {/* Add screen size options */}
                </Select>
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
                  style={{ width: 200 }}
                  placeholder="Filter by front camera"
                  {...field}
                >
                  {/* Add front camera options */}
                </Select>
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
                  style={{ width: 200 }}
                  placeholder="Filter by back camera"
                  {...field}
                >
                  {/* Add back camera options */}
                </Select>
              )}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <Button htmlType="submit" block>
              Apply Filter
            </Button>
          </div>
        </form>
      </Sider>
    </>
  );
};

export default FilterSidebar;
