import React, { useEffect, useState } from "react";
import {
  GetAllDayOff,
  GetAllStaff,
  PostAddDayOff,
  PostUpdateDayOff,
} from "../Api";

const AdminWorkTable = () => {
  const [staff, setStaff] = useState([]);
  const [staffWithDayOff, setStaffWithDayOff] = useState([]);
  const [staffWithOutDayOff, setStaffWithOutDayOff] = useState([]);

  useEffect(() => {
    GetAllStaff().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setStaff(msg);
        GetAllDayOff().then((response) => {
          if (response.status == "SUCCESS") {
            const data = response.msg;
            const haveDayOff = data.map((item) => item.staff_id);
            const newStaffWithOutDayOff = msg.filter(
              (item) => !haveDayOff.includes(item.id)
            );
            const newStaffWithDayOff = msg.filter((item) =>
              haveDayOff.includes(item.id)
            );
            setStaffWithDayOff(newStaffWithDayOff);
            setStaffWithOutDayOff(newStaffWithOutDayOff);
          } else {
            console.log(response);
          }
        });
      } else {
        console.log(data);
      }
    });
  }, []);

  const handleSubmitAddDayOff = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      staff_id: data.get("staff"),
      day_off: data.get("day_off"),
    };
    PostAddDayOff(jsonData).then((data) => console.log(data));
  };

  const handleSubmitUpdateDayOff = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      staff_id: data.get("staff"),
      day_off: data.get("day_off"),
    };
    PostUpdateDayOff(jsonData).then((data) => console.log(data));
  };

  return (
    <div>
      {staff && (
        <div>
          {staffWithOutDayOff ? (
            <form onSubmit={handleSubmitAddDayOff}>
              <label>Set Day-off</label>
              <select name="day_off">
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
              <label>Set Staff</label>
              <select name="staff">
                {staffWithOutDayOff.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button type="submit">Submit</button>
            </form>
          ) : (
            <p>All staff set day off already</p>
          )}
          {staffWithDayOff && (
            <form onSubmit={handleSubmitUpdateDayOff}>
              <label>Update Day-off</label>
              <select name="day_off">
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
              <label>Set Staff</label>
              <select name="staff">
                {staffWithDayOff.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminWorkTable;
