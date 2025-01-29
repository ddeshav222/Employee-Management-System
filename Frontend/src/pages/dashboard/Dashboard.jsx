import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("error fetching employees", error.message);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/employee/${employeeId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setEmployees(
          employees.filter((employee) => employee.id !== employeeId)
        );
      }

      console.log(`Employee with ID ${employeeId} delete successfully`);
    } catch (error) {
      console.error("error deleting employee", error.message);
    }
  };

  const handleUpdate = (employeeId) => {
    navigate(`/employee/$(employeeId)`);
  };

  return (
    <>
      <Container className="dashboard-container mt-5">
        <Row>
          <Col>
            <h1 className="text-center mb-4">Employees</h1>
            <Table
              striped
              border
              hover
              responsive
              className="employee-table"
              style={{ tableLayout: "fixed" }}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.department}</td>
                    <td>
                      <div className="button-group">
                        <Button
                          variant=" btn-outline-primary"
                          size="m"
                          onClick={() => handleUpdate(employee.id)}
                        >
                          Update
                        </Button>{" "}
                        <Button
                          variant=" btn-outline-danger"
                          size="m"
                          onClick={() => handleDelete(employee.id)}
                        >
                          Delete
                        </Button>{" "}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
