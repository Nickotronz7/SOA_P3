import React, {Component } from 'react'
import axios from 'axios'

//Employee Component 
//State: Array with json data from http request
class ResultsData extends Component{
    constructor(props) {
        super(props)

        this.state = {
            expenses: [],
            total: [],
            departments: []
        }
    }


    //invoked immediately after a component is mounted
    componentDidMount() {
        var host = process.env.REACT_APP_BACKEND;
        axios.get("http://34.139.142.87:4000/api/bills/month")
        .then(response => {
            console.log(response.data)
            this.setState({expenses: response.data.bills})
            this.setState({total: response.data.total})
            this.setState({departments: response.data.top3Departments})
        })
        .catch(error => {
            console.log(error)
        })
    }

    
    //Reload page to mount component
    refresh(){
        window.location.reload();
    }


    //gastos del mes, el total gastado ese mes y los 3 departamentos con más gastos. 

    render(){

        return (
            <header className="App-header">
            <div>
                
                <button className="button-32" onClick={this.refresh}>Refresh</button>
                <h1>Restultados</h1>
                
                <div className="header">
                    <p className="id" >Id</p>
                    <p className="creation_date">Fecha</p>
                    <p className="amount">Monto</p>
                    <p className="description">Descripción</p>
                    <p className="employee_name">Empleado</p>
                    <p className="department">Departamento</p>
                </div>
                <div className="container">
                
                    {this.state.expenses.map((element,index) => {
                        return (
                        <div key={index} className="tableLike">
                            <p className="id">{element.id}</p>
                            <p className="creation_date">{element.creation_date}</p>
                            <p className="amount">{element.amount}</p>
                            <p className="description">{element.description}</p>
                            <p className="employee_name">{element.employee_name}</p>
                            <p className="department">{element.department}</p>
                        </div>
                        );
                    })}
                </div>
                <div className="labelesUbication">
                    <div className="tableLike">
                        <label className="labelType">Gasto Total: </label>
                        <p className="name"> {this.state.total}</p>
                        
                    </div>
                    <p>
                        <label className="labelType">Departamentos con más gastos   </label>
                        <div className="header">
                            <p className="department">Departamento</p>
                            <p className="amount">Total</p>
                        </div>
                        <div className="subcontainer">
                            {this.state.departments.map((element,index) => {
                                return (
                                <div key={index} className="tableLike">
                                    <p className="department">{element.department}</p>
                                    <p className="amount">{element.total_department}</p>
                                </div>
                                );
                            })}
                        </div>

                        
                    </p>

                </div>

                        
                
            </div>

            
        </header>
        )
    }
    

}

export default ResultsData