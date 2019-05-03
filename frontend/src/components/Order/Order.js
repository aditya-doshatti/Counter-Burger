import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import counterburgersymbol from './counterburgersymbol.png';
import './Order.css';
var result=[]
var hostname=""

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            listed:[],
            error_status:" ",
            item_delete:"available",
            message:""
         }
         this.handleDelete=this.handleDelete.bind(this)
         this.handleRedirect=this.handleRedirect.bind(this)
    }

    async componentDidMount(){
        console.log("Inside cmpdidmount")
        var userId=localStorage.getItem('user')
        await axios.get(`http://54.193.117.14:8000/order/orders/${userId}`)
        .then((response,error) => { 
            console.log("Status",response.status)
            result=response.data
            console.log("Result(response.data):"+response.data," Length"+response.data.length)
            console.log("Result(Stringify)"+JSON.stringify(result))

            this.setState({
                listed : this.state.listed.concat(response.data),
                error_status:" "
            })
            console.log("listed"+this.state.listed)
         }) .catch((error) => {
             console.log("Error",error)
             console.log("Error response",error.response.data)
             this.setState({error_status:error.response.data})
         });
    }

    handleDelete(e1,e2,length){
       console.log("Delete handler being called with item id and order id",e1,e2) 
       console.log("Length",length) 
       var orderId=e2; 
       const data={
        ItemId:e1
       }
       if(length>1){
            console.log("inside delete greater than 1")
                axios.post(`http://54.193.117.14:8000/order/order/item/${orderId}`,data)
                .then((response) => { 
                 this.setState({
                 listed : this.state.listed.concat(response.data)
                })
              }); 
     } else{
         console.log("I am inside delete with 1 item remaining")
          axios.delete(`http://54.193.117.14:8000/order/order/${orderId}`,data)
                .then((response) => { 
                        this.setState({
                            listed:" ",
                            listed : this.state.listed.push(response.data),
                            error_status: " ",
                            item_delete:"deleted"
                    })
                    }); 
     }
    } 

    handleRedirect(order_Id,total_amount,user_id){
        console.log("Redirect handler being called",order_Id,total_amount)
        localStorage.setItem('orderId',order_Id)
        localStorage.setItem('price',total_amount)
        console.log("Checking localstorage value:",localStorage.getItem('price'))
        this.props.history.push('/payments')
    }

  

    render() {

      const templates = this.state.listed;
      console.log("length of listed:",this.state.listed.length)
      const fullrecord = this.state.listed;
           
        var amount=0.0
        var details=""
        if(this.state.error_status=="Given UserId Not Found"){
            details=<h2 className="noorder">You don't have any Active orders</h2>
        }else if(this.state.item_delete=="deleted"){
            details=<h2 className="noorder">You don't have any Active orders</h2>
        }
        else{
        details= this.state.listed.map((item) => {

            return(
            <div>
            <div class="maindiv">

                  {
                    item.items.map(detail_item => {
                      return(
                        <div >
                            <p>1x {detail_item.itemName} <span className="price" >${detail_item.price}</span> </p> 
                            <h4> <div className="description">{detail_item.description}
                       <button onClick={()=>this.handleDelete(detail_item.itemId,item.orderId,item.items.length)} className="btn_css">Delete</button></div> </h4>
            
                        <hr className="space"></hr>
                        </div>)
                    })
                  }
               
                <h3>Total Amount: <span className="price" >${item.totalAmount}</span></h3>
                </div>
                <button className="btn-primary submit_btn" onClick={()=>this.handleRedirect(item.orderId,item.totalAmount,item.userId)}> Proceed to Checkout</button>
            </div>
            
        )}) 
        }
        // } else{
        //   details="You have not placed any order yet!"
        // }

  
        return(
            <div>
                <img src = {counterburgersymbol} height="100" width="200" alt=""></img>
                <div class="ml-5">
                <h1 className="cart">Your Order Cart:</h1>
                {details}
                </div>
            </div>
        )
    }
}

export default Order;