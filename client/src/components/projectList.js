import React, { useEffect, useState } from "react";

const Project = (props) => (
    <tr>
        <td>{props.project.analystId}</td>
        <td>{props.project.canType}</td>
        <td>{props.project.vehicleMake}</td>
        <td>{props.project.vehicleModel}</td>
        <td>{props.project.vehicleYear}</td>
        <td>{props.project.VIN}</td>
        <td>
            <button className="btn btn-link"
                onClick={() => {
                    props.deleteProject(props.project._id);
                }}
                >
                Delete
            </button>
        </td>
    </tr>
);

export default function ProjectList() {
    const [projects, setProjects] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getProjects() {
            const response = await fetch(`http://localhost:5000/projects/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const projects = await response.json();
            setProjects(projects);
        }

        getProjects();

        return;
    }, [projects.length]);

    // This method will delete a record
    async function deleteProject(id) {
        await fetch(`http://localhost:5000/${id}`, {
            method: "DELETE"
        });

        const newProjects = projects.filter((el) => el._id !== id);
        setProjects(newProjects);
    }

    // This method will map out the records on the table
    function projectList() {
        return projects.map((project) => {
            return (
                <Project
                    project={project}
                    deleteProject={() => deleteProject(project._id)}
                    key={project._id}
                />
            );
        });
    }

    // This following section will display the table with the records of individuals.
    return (
        <div>
            <br />
            <h3>Project List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Analyst ID</th>
                        <th>CAN Type</th>
                        <th>Vehicle Make</th>
                        <th>Vehicle Model</th>
                        <th>Vehicle Year</th>
                        <th>VIN</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{projectList()}</tbody>
            </table>
        </div>
    );
}