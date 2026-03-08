export const CustomInput = (props: any) => {
  const {
    register,
    name,
    label,
    placeholder,
    type,
    validation,
    isRequired,
    ...rest
  } = props;
  return (
    <div className="mb-3">
      <label className="font-semibold" htmlFor="name">
        {label}
        {isRequired && <span className="text-red-500"> * </span>}
      </label>
      <input
        type={type}
        {...register(name, {
          ...validation,
        })}
        className="w-full px-3 py-2 border rounded"
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};
