import React, { useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";
import axios from "axios";

const ADSATable = () => {
  const [data, setData] = useState([]);
  useEffect(async () => {
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.get("/api/v1/admin/registrationStats", config);
        console.log(res.data.data.users);
        setData(res.data.data.users);
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) alert(err.response.data.message);
      }
    } else {
    }
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Student Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Contact No.",
        accessor: "phone",
      },
      {
        Header: "University Name",
        accessor: "university",
      },
      {
        Header: "Branch",
        accessor: "branch",
      },
      {
        Header: "Delete Data",
        Cell: <button className="btn btn-info">Delete</button>,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <>
      <div class="table-responsive">
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
    </>
  );
};

export default ADSATable;
