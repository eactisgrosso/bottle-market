import React, { useState, useEffect } from "react";
import CheckBox from "../CheckBox/CheckBox";
import TimePicker from "../TimePicker/TimePicker";
import { Row, Label, Days, Hours } from "./BusinessHours.style";

type BusinessHoursProps = {
  onChange: Function;
};

const nineAM = 32400;
const nineAM_label = "09:00";
const sixPM = 64800;
const sixPM_label = "18:00";
const null_label = "00:00";

const BusinessHours: React.FC<BusinessHoursProps> = ({ onChange }) => {
  const [monday, setMonday] = useState(true);
  const [mondayFrom, setMondayFrom] = useState([
    { id: nineAM, label: nineAM_label },
  ]);
  const [mondayTo, setMondayTo] = useState([{ id: sixPM, label: sixPM_label }]);
  const [tuesday, setTuesday] = useState(true);
  const [tuesdayFrom, setTuesdayFrom] = useState([
    { id: nineAM, label: nineAM_label },
  ]);
  const [tuesdayTo, setTuesdayTo] = useState([
    { id: sixPM, label: sixPM_label },
  ]);
  const [wednesday, setWednesday] = useState(true);
  const [wednesdayFrom, setWednesdayFrom] = useState([
    { id: nineAM, label: nineAM_label },
  ]);
  const [wednesdayTo, setWednesdayTo] = useState([
    { id: sixPM, label: sixPM_label },
  ]);
  const [thursday, setThursday] = useState(true);
  const [thursdayFrom, setThursdayFrom] = useState([
    { id: nineAM, label: nineAM_label },
  ]);
  const [thursdayTo, setThursdayTo] = useState([
    { id: sixPM, label: sixPM_label },
  ]);
  const [friday, setFriday] = useState(true);
  const [fridayFrom, setFridayFrom] = useState([
    { id: nineAM, label: nineAM_label },
  ]);
  const [fridayTo, setFridayTo] = useState([{ id: sixPM, label: sixPM_label }]);
  const [saturday, setSaturday] = useState(true);
  const [saturdayFrom, setSaturdayFrom] = useState([
    { id: nineAM, label: nineAM_label },
  ]);
  const [saturdayTo, setSaturdayTo] = useState([
    { id: sixPM, label: sixPM_label },
  ]);
  const [sunday, setSunday] = useState(true);
  const [sundayFrom, setSundayFrom] = useState([
    { id: nineAM, label: nineAM_label },
  ]);
  const [sundayTo, setSundayTo] = useState([{ id: sixPM, label: sixPM_label }]);

  useEffect(() => {
    onChange({
      monday,
      mondayFrom: monday && mondayFrom ? mondayFrom[0].label : null_label,
      mondayTo: monday && mondayTo ? mondayTo[0].label : null_label,
      tuesday,
      tuesdayFrom: tuesday && tuesdayFrom ? tuesdayFrom[0].label : null_label,
      tuesdayTo: tuesday && tuesdayTo ? tuesdayTo[0].label : null_label,
      wednesday,
      wednesdayFrom:
        wednesday && wednesdayFrom ? wednesdayFrom[0].label : null_label,
      wednesdayTo: wednesday && wednesdayTo ? wednesdayTo[0].label : null_label,
      thursday,
      thursdayFrom:
        thursday && thursdayFrom ? thursdayFrom[0].label : null_label,
      thursdayTo: thursday && thursdayTo ? thursdayTo[0].label : null_label,
      friday,
      fridayFrom: friday && fridayFrom ? fridayFrom[0].label : null_label,
      fridayTo: friday && fridayTo ? fridayTo[0].label : null_label,
      saturday,
      saturdayFrom:
        saturday && saturdayFrom ? saturdayFrom[0].label : null_label,
      saturdayTo: saturday && saturdayTo ? saturdayTo[0].label : null_label,
      sunday,
      sundayFrom: sunday && sundayFrom ? sundayFrom[0].label : null_label,
      sundayTo: sunday && sundayTo ? sundayTo[0].label : null_label,
    });
  }, [
    monday,
    mondayFrom,
    mondayTo,
    tuesday,
    tuesdayFrom,
    tuesdayTo,
    wednesday,
    wednesdayFrom,
    wednesdayTo,
    thursday,
    thursdayFrom,
    thursdayTo,
    friday,
    fridayFrom,
    fridayTo,
    saturday,
    saturdayFrom,
    saturdayTo,
    sunday,
    sundayFrom,
    sundayTo,
  ]);

  const renderRow = (
    day: string,
    checked: boolean,
    setChecked: Function,
    initialFrom: string,
    onChangeFrom: Function,
    initialTo: string,
    onChangeTo: Function
  ) => {
    return (
      <Row>
        <Days>
          <CheckBox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          ></CheckBox>
          <Label
            style={{
              marginRight: "15px",
            }}
          >
            {day}
          </Label>
        </Days>
        {checked && (
          <Hours>
            <TimePicker initialValue={initialFrom} onChange={onChangeFrom} />
            <div style={{ width: "18px" }}></div>
            <TimePicker initialValue={initialTo} onChange={onChangeTo} />
          </Hours>
        )}
      </Row>
    );
  };

  return (
    <>
      {renderRow(
        "Lunes",
        monday,
        setMonday,
        nineAM_label,
        setMondayFrom,
        sixPM_label,
        setMondayTo
      )}
      {renderRow(
        "Martes",
        tuesday,
        setTuesday,
        nineAM_label,
        setTuesdayFrom,
        sixPM_label,
        setTuesdayTo
      )}
      {renderRow(
        "Miércoles",
        wednesday,
        setWednesday,
        nineAM_label,
        setWednesdayFrom,
        sixPM_label,
        setWednesdayTo
      )}
      {renderRow(
        "Jueves",
        thursday,
        setThursday,
        nineAM_label,
        setThursdayFrom,
        sixPM_label,
        setThursdayTo
      )}
      {renderRow(
        "Viernes",
        friday,
        setFriday,
        nineAM_label,
        setFridayFrom,
        sixPM_label,
        setFridayTo
      )}
      {renderRow(
        "Sábado",
        saturday,
        setSaturday,
        nineAM_label,
        setSaturdayFrom,
        sixPM_label,
        setSaturdayTo
      )}
      {renderRow(
        "Domingo",
        sunday,
        setSunday,
        nineAM_label,
        setSundayFrom,
        sixPM_label,
        setSundayTo
      )}
    </>
  );
};

export default BusinessHours;
