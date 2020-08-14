import React, { useState, useEffect } from 'react';
import CheckBox from '../CheckBox/CheckBox';
import TimePicker from '../TimePicker/TimePicker';
import { Row, Label, Days, Hours } from './BusinessHours.style';

type BusinessHoursProps = {
  onChange: Function;
  dataDelivery?:any
};

const nineAM = 32400;
const nineAM_label = '09:00';
const sixPM = 64800;
const sixPM_label = '18:00';
const null_label = '00:00';

const BusinessHours: React.FC<BusinessHoursProps> = ({ dataDelivery,onChange }) => {

  const [monday, setMonday] = useState(dataDelivery ? dataDelivery.monday : true);
  const [mondayFrom, setMondayFrom] = useState([
    { id: nineAM, label: dataDelivery ? dataDelivery.monday_hours_from : nineAM_label },
  ]);
  const [mondayTo, setMondayTo] = useState([{ id: sixPM, label: sixPM_label }]);

  const [tuesday, setTuesday] = useState(dataDelivery ? dataDelivery.tuesday : true);
  const [tuesdayFrom, setTuesdayFrom] = useState([
    { id: nineAM, label: nineAM_label },
  ]);
  const [tuesdayTo, setTuesdayTo] = useState([
    { id: sixPM, label: sixPM_label },
  ]);

  const [wednesday, setWednesday] = useState(dataDelivery ? dataDelivery.wednesday : true);
  const [wednesdayFrom, setWednesdayFrom] = useState([
    { id: nineAM, label: nineAM_label },
  ]);
  const [wednesdayTo, setWednesdayTo] = useState([
    { id: sixPM, label: sixPM_label },
  ]);

  const [thursday, setThursday] = useState(dataDelivery ? dataDelivery.thursday : true);
  const [thursdayFrom, setThursdayFrom] = useState([
    { id: nineAM, label: nineAM_label },
  ]);
  const [thursdayTo, setThursdayTo] = useState([
    { id: sixPM, label: sixPM_label },
  ]);

  const [friday, setFriday] = useState(dataDelivery ? dataDelivery.friday : true);
  const [fridayFrom, setFridayFrom] = useState([
    { id: nineAM, label: nineAM_label },
  ]);
  const [fridayTo, setFridayTo] = useState([{ id: sixPM, label: sixPM_label }]);

  const [saturday, setSaturday] = useState(dataDelivery ? dataDelivery.saturday : true);
  const [saturdayFrom, setSaturdayFrom] = useState([
    { id: nineAM, label: nineAM_label },
  ]);
  const [saturdayTo, setSaturdayTo] = useState([
    { id: sixPM, label: sixPM_label },
  ]);

  const [sunday, setSunday] = useState(dataDelivery ? dataDelivery.sunday : true);
  const [sundayFrom, setSundayFrom] = useState([
    { id: nineAM, label: nineAM_label },
  ]);
  const [sundayTo, setSundayTo] = useState([{ id: sixPM, label: sixPM_label }]);

  useEffect(() => {
    onChange({
      monday,
      mondayFrom: monday && mondayFrom ? mondayFrom[0].id : null_label,
      mondayTo: monday && mondayTo ? mondayTo[0].id : null_label,
      tuesday,
      tuesdayFrom: tuesday && tuesdayFrom ? tuesdayFrom[0].id : null_label,
      tuesdayTo: tuesday && tuesdayTo ? tuesdayTo[0].id : null_label,
      wednesday,
      wednesdayFrom:
        wednesday && wednesdayFrom ? wednesdayFrom[0].id : null_label,
      wednesdayTo: wednesday && wednesdayTo ? wednesdayTo[0].id : null_label,
      thursday,
      thursdayFrom: thursday && thursdayFrom ? thursdayFrom[0].id : null_label,
      thursdayTo: thursday && thursdayTo ? thursdayTo[0].id : null_label,
      friday,
      fridayFrom: friday && fridayFrom ? fridayFrom[0].id : null_label,
      fridayTo: friday && fridayTo ? fridayTo[0].id : null_label,
      saturday,
      saturdayFrom: saturday && saturdayFrom ? saturdayFrom[0].id : null_label,
      saturdayTo: saturday && saturdayTo ? saturdayTo[0].id : null_label,
      sunday,
      sundayFrom: sunday && sundayFrom ? sundayFrom[0].id : null_label,
      sundayTo: sunday && sundayTo ? sundayTo[0].id : null_label,
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
    initialFrom: number,
    onChangeFrom: Function,
    initialTo: number,
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
              marginRight: '15px',
            }}
          >
            {day}
          </Label>
        </Days>
        {checked && (
          <Hours>
            <TimePicker initialValue={initialFrom} onChange={onChangeFrom} />
            <div style={{ width: '18px' }} />
            <TimePicker initialValue={initialTo} onChange={onChangeTo} />
          </Hours>
        )}
      </Row>
    );
  };

  return (
    <>
      {renderRow(
        'Lunes',
        monday,
        setMonday,
        nineAM,
        setMondayFrom,
        sixPM,
        setMondayTo
      )}
      {renderRow(
        'Martes',
        tuesday,
        setTuesday,
        nineAM,
        setTuesdayFrom,
        sixPM,
        setTuesdayTo
      )}
      {renderRow(
        'Miércoles',
        wednesday,
        setWednesday,
        nineAM,
        setWednesdayFrom,
        sixPM,
        setWednesdayTo
      )}
      {renderRow(
        'Jueves',
        thursday,
        setThursday,
        nineAM,
        setThursdayFrom,
        sixPM,
        setThursdayTo
      )}
      {renderRow(
        'Viernes',
        friday,
        setFriday,
        nineAM,
        setFridayFrom,
        sixPM,
        setFridayTo
      )}
      {renderRow(
        'Sábado',
        saturday,
        setSaturday,
        nineAM,
        setSaturdayFrom,
        sixPM,
        setSaturdayTo
      )}
      {renderRow(
        'Domingo',
        sunday,
        setSunday,
        nineAM,
        setSundayFrom,
        sixPM,
        setSundayTo
      )}
    </>
  );
};

export default BusinessHours;
