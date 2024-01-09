import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function UI() {
  const localData = JSON.parse(localStorage.getItem("data")) || [];
  const [rows, setRows] = React.useState(localData);
  const [first, setFirst] = React.useState("");
  const [last, setLast] = React.useState("");
  const [age, setAge] = React.useState("");

  const handleFirst = (evt) => {
    setFirst(evt.target.value);
  };

  const handleLast = (evt) => {
    setLast(evt.target.value);
  };

  const handleAge = (evt) => {
    setAge(evt.target.value);
  };

  const handleCreate = () => {
    if (first && last && age) {
      const data = {
        id: rows.at()?.id ? rows.at()?.id + 1 : 1,
        firstname: first,
        lastname: last,
        ageyosh: age,
        full: first + last,
      };
      setRows([data, ...rows]);
      localStorage.setItem("data", JSON.stringify([data, ...rows]));
    } else {
      confirm("Ma'lumotni kirit!");
    }
  };

  const handleDelete = (delTodo) => {
    let filtered = rows.filter((todo) => todo.id != delTodo);

    setRows(filtered);
    localStorage.setItem("data", JSON.stringify(filtered));
  };

  const handleEdit = (todo) => {
    const firstPrompt = prompt("Edit First name", todo.firstname);
    const lastPrompt = prompt("Edit Last name", todo.lastname);
    const agePrompt = prompt("Edit age", todo.ageyosh);

    rows.forEach((element) => {
      if (element.id === todo.id) {
        element.firstname = firstPrompt;
        element.lastname = lastPrompt;
        element.ageyosh = agePrompt;
        element.full = firstPrompt + lastPrompt;

        setRows([...rows]);
        localStorage.setItem("data", JSON.stringify([...rows]));
      }
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <TextField
          onChange={handleFirst}
          style={{ marginRight: "20px" }}
          id="outlined-basic"
          label="First name"
          variant="outlined"
        />
        <TextField
          onChange={handleLast}
          style={{ marginRight: "20px" }}
          id="outlined-basic"
          label="Last name"
          variant="outlined"
        />
        <TextField
          onChange={handleAge}
          style={{ marginRight: "20px" }}
          id="outlined-basic"
          label="Age"
          variant="outlined"
        />
        <Button
          onClick={handleCreate}
          style={{ width: "150px", height: "53px" }}
          variant="contained"
        >
          Create
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">First name</TableCell>
              <TableCell align="right">Last name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Full name</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{item.id}</TableCell>
                <TableCell align="right">{item.firstname}</TableCell>
                <TableCell align="right">{item.lastname}</TableCell>
                <TableCell align="right">{item.ageyosh}</TableCell>
                <TableCell align="right">{item.full}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => handleEdit(item)}
                    style={{ marginRight: "10px" }}
                    variant="outlined"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    color="error"
                    variant="outlined"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
