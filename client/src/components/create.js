import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    analystId: "",
    canType: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    VIN: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newProject = { ...form };

    await fetch("http://localhost:5000/projects/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    })
      .catch(error => {
        window.alert(error);
        return;
      });
    setForm({ analyst: "",  canType: "", vehicleMake: "", vehicleModel: "", vehicleYear: "", VIN: ""});
    navigate("/");
  }

  return (
    <div>
      <h3>Create Project</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="analystId">analystId</label>
          <input
            type="text"
            className="form-control"
            id="analystId"
            value={form.analystId}
            onChange={(e) => updateForm({ analystId: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="canType">canType</label>
          <input
            type="text"
            className="form-control"
            id="canType"
            value={form.canType}
            onChange={(e) => updateForm({ canType: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="vehicleMake">vehicleMake</label>
          <input
            type="text"
            className="form-control"
            id="vehicleMake"
            value={form.vehicleMake}
            onChange={(e) => updateForm({ vehicleMake: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="vehicleModel">vehicleModel</label>
          <input
            type="text"
            className="form-control"
            id="vehicleModel"
            value={form.vehicleModel}
            onChange={(e) => updateForm({ vehicleModel: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="vehicleYear">vehicleYear</label>
          <input
            type="text"
            className="form-control"
            id="vehicleYear"
            value={form.vehicleYear}
            onChange={(e) => updateForm({ vehicleYear: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="VIN">VIN</label>
          <input
            type="text"
            className="form-control"
            id="VIN"
            value={form.VIN}
            onChange={(e) => updateForm({ VIN: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Project"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}