const Input = (props: { label: string; type: string; name: string }) => {
  return (
    <div className="text-field">
      <label>{props.label}</label>
      <input type={props.type} name={props.name} />
    </div>
  );
};

export default Input;
