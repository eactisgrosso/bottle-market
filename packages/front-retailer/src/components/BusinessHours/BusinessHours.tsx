import React, { useState, useEffect } from 'react';
import CheckBox from '../CheckBox/CheckBox';
import TimePicker from '../TimePicker/TimePicker';
import { Row, Label, Days, Hours } from './BusinessHours.style';

type BusinessHoursProps = {
  onChange: Function;
  dataDelivery?: any;
};

const nineAM = 32400;
const sixPM = 64800;
const null_label = 0;

const BusinessHours: React.FC<BusinessHoursProps> = ({
  dataDelivery,
  onChange,
}) => {
  //Monday
  const [monday, setMonday] = useState(
    dataDelivery ? dataDelivery.monday : true
  );
  const [mondayFrom, setMondayFrom] = useState(
    dataDelivery ? dataDelivery.monday_hours_from : sixPM
  );
  const [mondayTo, setMondayTo] = useState(
    dataDelivery ? dataDelivery.monday_hours_to : nineAM
  );

  //Tuesday
  const [tuesday, setTuesday] = useState(
    dataDelivery ? dataDelivery.tuesday : true
  );
  const [tuesdayFrom, setTuesdayFrom] = useState(
    dataDelivery ? dataDelivery.tuesday_hours_from : sixPM
  );
  const [tuesdayTo, setTuesdayTo] = useState(
    dataDelivery ? dataDelivery.tuesday_hours_to : nineAM
  );

  //Wednesday
  const [wednesday, setWednesday] = useState(
    dataDelivery ? dataDelivery.wednesday : true
  );
  const [wednesdayFrom, setWednesdayFrom] = useState(
    dataDelivery ? dataDelivery.wednesday_hours_from : sixPM
  );
  const [wednesdayTo, setWednesdayTo] = useState(
    dataDelivery ? dataDelivery.wednesday_hours_to : nineAM
  );

  //Thursday
  const [thursday, setThursday] = useState(
    dataDelivery ? dataDelivery.thursday : true
  );
  const [thursdayFrom, setThursdayFrom] = useState(
    dataDelivery ? dataDelivery.thursday_hours_from : sixPM
  );
  const [thursdayTo, setThursdayTo] = useState(
    dataDelivery ? dataDelivery.thursday_hours_to : nineAM
  );

  //Friday
  const [friday, setFriday] = useState(
    dataDelivery ? dataDelivery.friday : true
  );
  const [fridayFrom, setFridayFrom] = useState(
    dataDelivery ? dataDelivery.friday_hours_from : sixPM
  );
  const [fridayTo, setFridayTo] = useState(
    dataDelivery ? dataDelivery.friday_hours_to : nineAM
  );

  //Saturday
  const [saturday, setSaturday] = useState(
    dataDelivery ? dataDelivery.saturday : true
  );
  const [saturdayFrom, setSaturdayFrom] = useState(
    dataDelivery ? dataDelivery.saturday_hours_from : sixPM
  );
  const [saturdayTo, setSaturdayTo] = useState(
    dataDelivery ? dataDelivery.saturday_hours_to : nineAM
  );

  //Sunday
  const [sunday, setSunday] = useState(
    dataDelivery ? dataDelivery.sunday : true
  );
  const [sundayFrom, setSundayFrom] = useState(
    dataDelivery ? dataDelivery.sunday_hours_from : sixPM
  );
  const [sundayTo, setSundayTo] = useState(
    dataDelivery ? dataDelivery.sunday_hours_to : nineAM
  );

  useEffect(() => {
    onChange({
      monday,
      mondayFrom: monday && mondayFrom ? mondayFrom : null_label,
      mondayTo: monday && mondayTo ? mondayTo : null_label,
      tuesday,
      tuesdayFrom: tuesday && tuesdayFrom ? tuesdayFrom : null_label,
      tuesdayTo: tuesday && tuesdayTo ? tuesdayTo : null_label,
      wednesday,
      wednesdayFrom: wednesday && wednesdayFrom ? wednesdayFrom : null_label,
      wednesdayTo: wednesday && wednesdayTo ? wednesdayTo : null_label,
      thursday,
      thursdayFrom: thursday && thursdayFrom ? thursdayFrom : null_label,
      thursdayTo: thursday && thursdayTo ? thursdayTo : null_label,
      friday,
      fridayFrom: friday && fridayFrom ? fridayFrom : null_label,
      fridayTo: friday && fridayTo ? fridayTo : null_label,
      saturday,
      saturdayFrom: saturday && saturdayFrom ? saturdayFrom : null_label,
      saturdayTo: saturday && saturdayTo ? saturdayTo : null_label,
      sunday,
      sundayFrom: sunday && sundayFrom ? sundayFrom : null_label,
      sundayTo: sunday && sundayTo ? sundayTo : null_label,
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
        mondayFrom,
        setMondayFrom,
        mondayTo,
        setMondayTo
      )}
      {renderRow(
        'Martes',
        tuesday,
        setTuesday,
        tuesdayFrom,
        setTuesdayFrom,
        tuesdayTo,
        setTuesdayTo
      )}
      {renderRow(
        'Miércoles',
        wednesday,
        setWednesday,
        wednesdayFrom,
        setWednesdayFrom,
        wednesdayTo,
        setWednesdayTo
      )}
      {renderRow(
        'Jueves',
        thursday,
        setThursday,
        thursdayFrom,
        setThursdayFrom,
        thursdayTo,
        setThursdayTo
      )}
      {renderRow(
        'Viernes',
        friday,
        setFriday,
        fridayFrom,
        setFridayFrom,
        fridayTo,
        setFridayTo
      )}
      {renderRow(
        'Sábado',
        saturday,
        setSaturday,
        saturdayFrom,
        setSaturdayFrom,
        saturdayTo,
        setSaturdayTo
      )}
      {renderRow(
        'Domingo',
        sunday,
        setSunday,
        sundayFrom,
        setSundayFrom,
        sundayTo,
        setSundayTo
      )}
    </>
  );
};

export default BusinessHours;
