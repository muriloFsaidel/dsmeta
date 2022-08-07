import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Sale } from "../../models/sale";
import { BASE_URL } from "../../utils/request";
import NotificationButton from "../NotificationButton";
import './styles.css';

function SalesCard() {

    //Hook functions(usetState, useEffect) are binded with component life cycle and is always run when the component is called or if some state changes

     //current Date - 365 days
    const min = new Date(new Date().setDate(new Date().getDate() - 365));
     //current Date
    const max = new Date();
    
    const [minDate, setMinDate] = useState(min);
    const [maxDate, setMaxDate] = useState(max);

    //creating state of the type Sale array getting started with an empty list
    const [sales, setSales] = useState<Sale[]>([]);

    useEffect(() => {
        //axios, make the request for backend in route sales and then with the response in hands execute this instruction set
        axios.get(`${BASE_URL}/sales`)
        .then(response => {
            //updating list with sales objects
            setSales(response.data.content);
        })
    },[]);

    return (
        <div className="dsmeta-card">
            <h2 className="dsmeta-sales-title">Vendas</h2>
            <div>
                <div className="dsmeta-form-control-container">
                    <DatePicker                       
                        selected={minDate}
                        //quando tiver escolhido a data(date) atualiza o estado
                        onChange={(date: Date) => setMinDate(date) }
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={maxDate}
                        onChange={(date: Date) => setMaxDate(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
            </div>

            <div>
                <table className="dsmeta-sales-table">
                    <thead>
                        <tr>
                            <th className="show992">ID</th>
                            <th className="show576">Data</th>
                            <th>Vendedor</th>
                            <th className="show992">Visitas</th>
                            <th className="show992">Vendas</th>
                            <th>Total</th>
                            <th>Notificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   //for each sale object in sales array
                            sales.map(sale =>{
                                return (
                                    //render a line and its data columns with the attributes of sale,
                                    //identifying each line with a key
                                    <tr key={sale.id}>
                                        <td className="show992">{sale.id}</td>
                                        <td className="show576">{new Date(sale.date).toLocaleDateString()}</td>
                                        <td>{sale.sellerName}</td>
                                        <td className="show992">{sale.visited}</td>
                                        <td className="show992">{sale.deals}</td>
                                        <td>R$ {sale.amount.toFixed(2)}</td>
                                        <td>
                                            <div className="dsmeta-red-btn-container">
                                                <NotificationButton />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                            
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SalesCard;