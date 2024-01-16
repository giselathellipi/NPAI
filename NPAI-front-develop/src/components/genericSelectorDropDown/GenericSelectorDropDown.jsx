import React from "react";
import "./style.css";
import Multiselect from "multiselect-react-dropdown";

function GenericSelectorDropDown(props) {
  // const [userId, setUserId] = useState([...props.usersId]);

  const userInfo = props.users;

  const options = userInfo
    .map((info) => [
      {
        username: `${info.username}`,
        id: info.id,
      },
    ])
    .flat();
  const selectedPropsUser = props.selectedUser
    .map((info) => [
      {
        username: `${info.username}`,
        id: info.id,
      },
    ])
    .flat();
  const handleprop = (event) => {
    props.getId(event);
  };

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
        <Multiselect
          placeholder="Click here to pick users:"
          isObject={true}
          onRemove={(selectedList, selectedItem) => {
            handleprop(selectedList);
          }}
          onSelect={(selectedList, selectedItem) => {
            handleprop(selectedList);
          }}
          options={options}
          displayValue="username"
          avoidHighlightFirstOption
          onChange={props.onChange}
          selectedValues={selectedPropsUser}
          showCheckbox
        />
      </div>
    </div>
  );
}

export default GenericSelectorDropDown;
