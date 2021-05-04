import React, {useState, useEffect} from 'react';
import {ListGroup, ListGroupItem, Table} from 'react-bootstrap';

function Sale(props) {

    const [sale, setSale] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        setLoading(true);
        fetch(`https://nameless-crag-95054.herokuapp.com/api/sales/${props.id}`)
        .then(res => res.json())
        .then(data =>{
            if(data)
            {   
                if(data._id)
                {
                    props.viewedSale(data._id);
                }
                setSale(data);
                setLoading(false);
            }

            else{
                setLoading(false);
            }
        })
        .catch(err =>{
            console.log(err);
        });
    },[props.id]);

    let itemTotal = (items) =>
    {
        let total = 0;
        for(let i=0; i<items.length; i++)
        {
            total += (items[i].quantity * items[i].price);
        }

        return total;
    }

    if(loading)
    {
        return null;
    }

    else
    {
        if(sale._id)
        {
            return(
                <div>
                    <h1>Sale: {props.id}</h1>
                    <h2>Customer</h2>
    
                    <ListGroup>
                        <ListGroupItem><strong>email:</strong> {sale.customer.email}</ListGroupItem>
                        <ListGroupItem><strong>age:</strong> {sale.customer.age}</ListGroupItem>
                        <ListGroupItem><strong>satisfaction:</strong>  {sale.customer.satisfaction}/5</ListGroupItem>
                    </ListGroup>
    
                    <h2>Items: ${itemTotal(sale.items).toFixed(2)}</h2>
    
                    <Table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
    
                        <tbody>
                            {sale.items.map((item) =>(
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            );
        }

        else{
            return <div><h1>Unable to find Sale</h1><p>id: {this.props.id}</p></div>
        }
    }
}

export default Sale;