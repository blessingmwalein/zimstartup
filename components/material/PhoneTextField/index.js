import PhoneInput from "react-phone-input-2";

const PhoneTextField = ({ value, country, onChange }) => {
  return (
    <PhoneInput
      value={value}
      country={country}
      onChange={onChange}
      inputProps={{ required: true }}
      countryCodeEditable={false}
      containerClass="w-full mb-5"
      inputClass="w-full"
    />
  );
};

export default PhoneTextField;
