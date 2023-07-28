export default function InputAuthComponent({
  label,
  placeholder,
  name,
  type,
  onChange,
  classLabel,
  classInput,
  value,
}) {
  return (
    <div className="form-input">
      <label
        htmlFor="email"
        className={["label-form-auth d-block mt-3", classLabel].join(" ")}
      >
        {label}
      </label>
      <input
        onChange={onChange}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        className={["input-form-auth w-100 mt-1", classInput].join(" ")}
      />
    </div>
  );
}
