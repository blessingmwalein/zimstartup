import flatpickr from "flatpickr";
import { useEffect } from "react";
import { Controller } from "react-hook-form";


const CustomDatePicker = ({ control, name, rules }: any) => {
  useEffect(() => {
    flatpickr(`#${name}`, {
      mode: "single",
      static: true,
      monthSelectorType: "static",
      dateFormat: "M j, Y",
      prevArrow: '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
      nextArrow: '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    });
  }, [name]);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Date Picker
          </label>
          <div className="relative">
            <input
              id={name}
              className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)} // Update form state on change
              placeholder="mm/dd/yyyy"
              data-class="flatpickr-right"
            />
          </div>
        </div>
      )}
    />
  );
};

export default CustomDatePicker;
