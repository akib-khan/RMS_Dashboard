import React from "react";
import styled from "styled-components";
import { useTable, usePagination } from "react-table";
import {Button} from 'semantic-ui-react'
import makeData from "./makeData";
import {fetchRMSLimits, postRMSLimits } from '../../redux/ActionCreators'
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    rmsLimits: state.rmsLimits
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRMSLimits: (server) => dispatch( fetchRMSLimits(server) ),
  postRMSLimits : ( server, data ) => dispatch( postRMSLimits(server, data) )
});


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }

  pre {
    background-color: #eee;
    padding: 5px;
    border: 1px #bbb solid;
  }
`;

// Create an editable cell renderer
const EditableCell = ({
  cell: { value: initialValue },
  row: { index },
  column: { id },
  updateMyData // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = e => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

// Create CUSTOM non-editable cell
// note: we'll probably have to change the CSS
const NonEditableCell = ({ cell }) => <div>{cell.value}</div>;

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell
};

// Be sure to pass our updateMyData and the skipPageReset option
function Table({ columns, data, updateMyData, skipPageReset }) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData
    },
    usePagination
  );

  // Render the UI for your table
  return (
    <React.Fragment>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </React.Fragment>
  );
}

function RMSTable(props) {
  
  
  const [data, setData] = React.useState([]);
  const [originalData,setOriginalData] = React.useState(data);
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  React.useEffect(() => {
    //setSkipPageReset(false);
    props.fetchRMSLimits(props.server)
    .then( rmsvalues => {
      //console.log("changing rmsvalues values",JSON.stringify(data)," ",JSON.stringify(rmsvalues));
      //console.log("changing1 rmsvalues values",data," ",rmsvalues);
      setData(rmsvalues);
      setOriginalData(rmsvalues);
      setSkipPageReset(true);
    })
  }, [] );
  
  
  
  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  
    //console.log(" Got props in rmstable? ",props);
  const columns = React.useMemo(
    () => [
      {
        Header: 'RMS Limits',
        columns: [
          {
            Header: 'Key',
            accessor: 'firstName',
            Cell: NonEditableCell
          },
          {
            Header: 'Value',
            accessor: 'lastName',
          },
        ],
      }
    ],
    []
  )
  //fetchMyData();

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value
          };
        }
        return row;
      })
    );
  };

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  /*React.useEffect(() => {
    setSkipPageReset(false);
  }, [data]);*/

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setData(originalData);
  const refreshData = (e) => {
    props.fetchRMSLimits(props.server)
    .then( rmsvalues => {
      //console.log("changing rmsvalues values",JSON.stringify(data)," ",JSON.stringify(rmsvalues));
      //console.log("changing1 rmsvalues values",data," ",rmsvalues);
      setData(rmsvalues);
      setOriginalData(rmsvalues);
      setSkipPageReset(true);
    })
  }

  const postData= (e) => {
    console.log("data: ",JSON.stringify(data)," originalData: ",JSON.stringify(originalData) );
    if( JSON.stringify(data) === JSON.stringify(originalData) ) {
      console.log("Updating same data");
      alert(" Updating same data");
    }
    else {
      console.log( " sending post rms!");
      props.postRMSLimits(props.server,data)
      .then( rdata => {
        setOriginalData(data);
        alert(" values are updated!!");
      })
    }
  }
  
  const onRowClick = (state, rowInfo, column, instance) => {
    console.log(" On ROwClick() rowInfo: ",rowInfo);
    return {
      onClick: e => {
        console.log(" On ROwClick() event ",e);
        //e.stopPropagation();
        //if (e.target.type == "submit") {
          alert(rowInfo.original.name)
        //}
        // console.log(e.target.type, rowInfo)
      }
    }
    
  }

  return(  
    <Styles>
      <Table
        columns={columns}
        getTrProps={onRowClick}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
      <Button className="button_cpy" onClick={postData}>Submit</Button>
      <Button className="button_cpy" onClick={refreshData}>Refresh</Button>
    </Styles>
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(RMSTable);
