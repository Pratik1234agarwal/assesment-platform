import React, { useState, useEffect } from "react";
import logo1 from "../../images/logo.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
import { Link } from "react-router-dom";

const L2ResultTable = (props) => {
  let history = useHistory();
  const [results, setresults] = useState([]);
  const [test, settest] = useState([]);

  function questionHome() {
    history.push("/modulewiseresult");
  }

  useEffect(async () => {
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.get(
          "/api/v1/admin/results/" + props.match.params.id,
          config
        );
        const res1 = await axios.get(
          "/api/v1/admin/test/" + props.match.params.id,
          config
        );
        console.log(res);
        console.log(res1);
        setresults(res.data.data.papers);
        settest(res1.data.data.test);
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push("/admin");
    }
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "user.name",
      },
      {
        Header: "Email",
        accessor: "user.email",
      },
      {
        Header: "Marks",
        accessor: "marks",
      },
      {
        Header: "Attempted",
        accessor: "attempted",
      },
      {
        Header: "Correct",
        accessor: "correct",
      },
      {
        Header: "Incorrect",
        accessor: "incorrect",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: results,
      },
      useSortBy
    );

  return (
    <>
      <div className="container-fluid admn">
        <div className="row ml-3 ">
          <Link to="/questionroutes">
            <img src={logo1} />
          </Link>
        </div>
      </div>

      <div className="container mt-3 text-white">
        <button
          className="btn float-right"
          style={{ backgroundColor: "#0E3B7D", color: "white" }}
          onClick={questionHome}
        >
          Go Back
        </button>
      </div>

      <div className="container text-center pt-5">
        <h2>Test Result</h2>
      </div>

      <div className="container text-center pt-4 ">
        <h5>{props.match.params.type}</h5>
        <h5>Test Name : {test && test.testName}</h5>
      </div>

      <div className="container text-center pt-2 text-danger">
        <h4>No. of Students : {results && results.length}</h4>
      </div>

      <div className="container pt-4 mb-3 text-center">
        <div class="table-responsive ">
          <table
            {...getTableProps()}
            className="table  table-hover mx-auto w-auto"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={{
                        // padding: "10px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        paddingRight: "30px",
                        paddingLeft: "30px",
                        border: "solid 1px gray",
                        cursor: "pointer",
                      }}
                    >
                      {column.render("Header")}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            " 🔽"
                          ) : (
                            " 🔼"
                          )
                        ) : (
                          <i class="fa fa-fw fa-sort"></i>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            padding: "10px",
                            border: "solid 1px gray",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default L2ResultTable;
