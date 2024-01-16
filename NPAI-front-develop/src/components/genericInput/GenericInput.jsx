import React from "react";
import "./style.css";

function GenericInput(props) {
  let isPasswordInput = true;
  let isCentertoAssociate = true;

  const handleClick = () => {
    if (props.onClickIcon) {
      props.onClickIcon(props.value);
    }
  };
  // props.passwordInput === true ? setPasswordIcon(!passwordIcon) : null;

  return (
    <div className="generic-input-container" style={{ width: props.divWidth }}>
      <div className={props.input_label_style || "label_desc"}>
        {props.input_label}
        <span className="asterik">{props.asterik}</span>
      </div>
      <div className={props.className_input_icon || "input_icon_container"}>
        <div className="icon-div">
          <img src={props.icon} alt="Icon" className="img-tag" />
        </div>
        <input
          id={props.id}
          type={props.type}
          name={props.name}
          className={props.className || "input-tag"}
          onChange={props.onChange}
          onBlur={props.handleFocus}
          label={props.label}
          placeholder={props.placeholder}
          value={props.value}
          pattern={props.pattern}
          readOnly={props.readOnly}
          required={props.required}
          disabled={props.disabled}
          ref={props.inputRef}

        />
        {isCentertoAssociate === props.isCenter || false ? (
          <div className="icon-div-center">
            <img src={props.centerIcon} alt="Icon" className="img-tag" />
          </div>
        ) : null}
        {isPasswordInput === props.isPassword || false ? (
          <div className="icon-div-password">
            <img
              onClick={handleClick}
              src={props.passwordIcon}
              alt="Icon"
              className="img-tag"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default GenericInput;
