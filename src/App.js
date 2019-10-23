import React, {Component} from 'react';
import './App.css';
import ProductItem from './components/ProductItem';
import AddProduct from './components/AddProduct';
import FilterProduct from './components/FilterProduct';

class App extends Component {
  constructor(props){
    super(props);    
    this.state = {  
      products :   JSON.parse(localStorage.getItem('products')),
      books : []
    }    
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this);    
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onFilter = this.onFilter.bind(this);   
    this.onFilterClear = this.onFilterClear.bind(this);   
  }

  componentDidMount() {
    const products = this.getProducts();
    this.setState({ products});
  }
 
  getProducts(){      
      fetch('http://18.228.14.48/api/products?cmd=list')
        .then(res => res.json())
        .then((data) => {
          this.setState({ products: data });          
        })
        .catch(console.log)
        return this.state.products;
  } 

  onAdd(description, short_description, code, status, qty, value){       
      fetch('http://18.228.14.48/api/products' , {
        method: 'POST',
        body: JSON.stringify({            
          description : description,
          short_description : short_description,
          code : code,
          status : status,
          qty : qty,
          value: value
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => {
              return response.json()
      }).then(json => {
        this.setState({
          user:json
        }); 
        const products = this.getProducts();
        this.setState({ products });            
        
      })
      
      
  }
  
  onDelete(id){        
    fetch('http://18.228.14.48/api/products/'+id , {
        method: 'DELETE',
        body: JSON.stringify({            
          id : id         
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => {        
              return response.json()
      }).then(json => {
        const products = this.state.products;      

        const filteredProducts = products.filter(product => {
          return Number(product.id) !== id;
        })    
        this.setState({ products : filteredProducts})
      }); 
    
  }

  onEditSubmit(id, description, short_description, code, status, qty, value){
    let products = this.state.products;
    products = products.map(product =>{      
      if(product.id === Number(id)){        
        product.description = description;
        product.short_description = short_description;
        product.code = code;
        product.status = status;
        product.qty = qty;
        product.value = value;
        fetch('http://18.228.14.48/api/products/'+id , {
          method: 'PUT',
          body: JSON.stringify({
            id: id,
            description : description,
            short_description : short_description,
            code : code,
            status : status,
            qty : qty,
            value: value
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(response => {
                return response.json()
        })
      }
      return product;
    })  
    this.setState({ products });       
  }
  

  onFilter(search,field, isFiltered){
    let products = isFiltered ? this.state.products : this.getProducts();
    if (isFiltered){
      
      // eslint-disable-next-line
      const filteredProducts = products.filter(product => {      
        if(product[field].includes(search)){
          return product[field].includes(search);
        }
      })
      products = filteredProducts;
      this.setState({ products });
    }else{
      this.setState({ products });      
    }
    
  }
  onFilterClear(){
    const products = this.getProducts();    
    this.setState({ products });       
  }
  
  render() {
    return (
      <div className="App">        
            <h1>CRUD ReactJS</h1>  
            <AddProduct 
              onAdd={this.onAdd}
            
            />
        
            <div className="lista-produtos">
                  <FilterProduct 
                    onFilter = {this.onFilter}
                    onFilterClear = {this.onFilterClear}
                  />
                  <div className="product-list">
                  {
                    this.state.products.map(product=> {
                      return(
                        <ProductItem 
                          key={product.id}
                          {...product}  
                          onDelete={this.onDelete}              
                          onEditSubmit={this.onEditSubmit}                
                        />
                      )
                      
                    })
                  }
                  </div>
            </div>
        
      </div>
    );
  }
}
export default App;