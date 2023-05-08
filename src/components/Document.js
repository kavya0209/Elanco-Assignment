/**
 * owner : Hitachi
 * author : Manish from Affine
 */
import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
	Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button";
import datasetService from "../services/documentService";
import { trackPromise } from "react-promise-tracker";
import "./Document.scss";


const pagination = paginationFactory({
	page: 1,
	sizePerPage: 10,
	lastPageText: ">>",
	firstPageText: "<<",
	nextPageText: ">",
	prePageText: "<",
	showTotal: true,
	alwaysShowAllBtns: true,
	hideSizePerPage: true,
	onPageChange: function (page, sizePerPage) { },
	onSizePerPageChange: function (page, sizePerPage) { },
});

const { SearchBar } = Search;

function DocumentsList() {
	
	const [datasetsList, setDatasetsList] = useState([]);
	const [previewData, setpreviewData] = useState("");
	const [modalShow, setModalShow] = useState(false);
	
	useEffect(() => {
	  getAllDocuments();
	  }, []);

	/**
	 * get All Documents List from db
	 */
	const getAllDocuments = () => {

		trackPromise(
			datasetService.getAllApplications()
				.then((response) => {
					const final_data = response.data.map((dataset, index) => ({
						id: index + 1,
						name : dataset
					}));
					setDatasetsList(final_data);
				})
				.catch((err) => {
					console.log(err)
				 })
		);
	
	};

	const Preview = (e,row,rowindex,column,columnIndex) => {
		
		var payloadObj = column.name;
		trackPromise(
			datasetService.getApplication(payloadObj)
				.then((response) => {
					const final_applicant_data = response.data.map((dataset, index) => ({
						...dataset,
						id: index + 1,
					}));
					setpreviewData(final_applicant_data);
				})
				.catch((err) => {
					console.log(err)
				 })
		);
	};

	const iconActionHandler = (cell, row, rowIndex) => {
		return (
			<>
			<i   className="fa fa-info-circle action-icon" title="Delet"></i>
			</>
		);
	};

	const columns = [
		{ dataField: "id", text: "Id", sort: true },
		{ dataField: "name", text: "Name", sort: true },
		{ dataField: "ActionId", text: "Action", formatter: iconActionHandler,sort: false, classes: "actions-column", 
		events: {
			onClick: (e, row, rowIndex, column, columnInde) => {
				setModalShow(true)
				Preview(e, row, rowIndex,column,columnInde)
			},
		},
	
	},
	];

	const applicantColumns = [
		{ dataField: "id", text: "Id", sort: true },
		{ dataField: "ConsumedQuantity", text: "Consumed Quantity", sort: true },
		{ dataField: "Cost", text: "Cost", sort: true },
		{ dataField: "Date", text: "Date", sort: true },
		{ dataField: "InstanceId", text: "Instance Id", sort: true },
		{ dataField: "Location", text: "Location", sort: true },
		{ dataField: "MeterCategory", text: "Meter Category", sort: true },
		{ dataField: "ResourceGroup", text: "Resource Group", sort: true },
		{ dataField: "ResourceLocation", text: "Resource Location", sort: true },
		{ dataField: "ServiceName", text: "Service Name", sort: true },
		
	];


	return (
		<div className="container" >
			
			<ToolkitProvider
				bootstrap4
				keyField="id"
				data={datasetsList}
				columns={columns}
				search
				bordered={false}
			>
				{(props) => (
					<div className="App">
						
						<div className="container-fluid">

						<div className="row">
								<div className="col card-pad">
									<Card className="card1">
										<Card.Body>
											<div className="d-flex flex-row">
												<div className="text1">Search</div>
												<div className="text1 serach-cls">
													<SearchBar placeholder="Search Documents" {...props.searchProps}/>
													<i className="fa-solid fa-magnifying-glass fa-search-icon" title="Search"></i>
												</div>
												
											</div>
										</Card.Body>
									</Card>
								</div>
							</div>
							
							<div className="row">
								<div className="col card-pad">
									<div>
										<Card className="card2">
											{<Card.Body className="table-container list-view">
												<BootstrapTable keyField="datasetName" pagination={pagination}
													{...props.baseProps}
													bordered={false}
													noDataIndication="No Documents"
												/>
											</Card.Body>}
										</Card>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</ToolkitProvider>
			<ToolkitProvider
				bootstrap4
				keyField="id"
				data={previewData}
				columns={applicantColumns}
				search
				bordered={false}
				
			>
				{(props) => (
					<Modal show={modalShow && previewData}>
						<Modal.Header>
							<Modal.Title>Application Details</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<BootstrapTable class="table-css" keyField="datasetName" 
								pagination={pagination}
								{...props.baseProps}
								bordered={false}
								noDataIndication="No Documents"
							/>						
						</Modal.Body>
						<Modal.Footer>
						<Button variant="secondary" onClick={() => { setModalShow(false)}}>Close Modal</Button>
						</Modal.Footer>
					</Modal>
				)}
			</ToolkitProvider>
		</div>
	);
}

export default DocumentsList;
