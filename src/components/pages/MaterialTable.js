import React from 'react';
import MaterialTable, { MTableEditRow } from "material-table";
import { forwardRef } from "react";
import TextField from "@material-ui/core/TextField";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box'

import {fetchRMSLimits, postRMSLimits } from '../../redux/ActionCreators'

import {Button} from 'semantic-ui-react'

const mapStateToProps = state => {
  return {
    rmsLimits: state.rmsLimits
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRMSLimits: (server) => dispatch( fetchRMSLimits(server) ),
  postRMSLimits : ( server, data ) => dispatch( postRMSLimits(server, data) )
});

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

function CellEditable(props) {
    const { useState } = React;
  
    const [columns, setColumns] = useState([
      { title: 'Key', field: 'firstName', editable: 'never'},
      { title: 'Value', field: 'lastName', type: 'numeric',headerStyle: { textAlign: "Left"  } },
    ]);
  
    const [data, setData] = useState([
    ]);
    const [originalData,setOriginalData] = React.useState(data);

    const refreshData = (e) => {
        props.fetchRMSLimits(props.server)
        .then( rmsvalues => {
          //console.log("changing rmsvalues values",JSON.stringify(data)," ",JSON.stringify(rmsvalues));
          //console.log("changing1 rmsvalues values",data," ",rmsvalues);
          setData(rmsvalues);
          //setOriginalData(rmsvalues);
          //setSkipPageReset(true);
        })
    }
    
    React.useEffect(() => {
        //setSkipPageReset(false);
        props.fetchRMSLimits(props.server)
        .then( rmsvalues => {
          //console.log("changing rmsvalues values",JSON.stringify(data)," ",JSON.stringify(rmsvalues));
          //console.log("changing1 rmsvalues values",data," ",rmsvalues);
          setData(rmsvalues);
          setOriginalData(rmsvalues);
          //setSkipPageReset(true);
        })
      }, [] );

    const postData= (e) => {
        //console.log("data: ",JSON.stringify(data)," originalData: ",JSON.stringify(originalData) );
        if( JSON.stringify(data) === JSON.stringify(originalData) ) {
          //console.log("Updating same data");
          alert(" Updating same data");
        }
        else {
          //console.log( " sending post rms!");
          props.postRMSLimits(props.server,data)
          .then( rdata => {
            setOriginalData(data);
            alert(" values are updated!!");
          })
        }
    }

    //{ console.log( "data: ",data); }
    return (
     <Box mt="1rem" >
        <MaterialTable
            icons={tableIcons}
            title="RMS Limits"
            columns={columns}
            data={data}
            cellEditable={{
            onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                //console.log("data: ",data );
                return new Promise((resolve, reject) => {
                console.log('newValue: ',newValue," ",oldValue," ",rowData.tableData.id," ",columnDef.tableData.id," ",rowData," ",columnDef," ",data);
                setData(old =>
                    old.map((row, index) => {
                    if (index === rowData.tableData.id ) {
                        console.log(" index matched!!");
                        return {
                        ...old[index],
                        [columnDef.field]: newValue
                        };
                    }
                    console.log(" index doesn't matched!!");
                    return row;
                    })
                )
                console.log( "data1: ",data);
                setTimeout(resolve, 1000);
                });
            }
            }
        }
        />
        <Button className="button_cpy" onClick={postData}>Submit</Button>
        <Button className="button_cpy" onClick={refreshData}>Refresh</Button>
      </Box>
    )
  }

  export default connect(mapStateToProps,mapDispatchToProps)(CellEditable);