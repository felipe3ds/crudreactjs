import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from '@material-ui/core/Icon';
import "./ProductItem.css";


class ProductItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEdit: false
    }
   
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }
  onDelete(){
    const { onDelete, id} = this.props;    
    onDelete(id);
  }
  onEdit(){
    this.setState({ isEdit: true });
  }
  onEditSubmit(event){
    event.preventDefault();
    this.props.onEditSubmit(this.idInput.value, 
                            this.descriptionInput.value, 
                            this.shortInput.value, 
                            this.codeInput.value, 
                            this.statusInput.value,
                            this.qtyInput.value,
                            this.valueInput.value,
                            this.props.description);
    this.setState({ isEdit: false});
  }

  onCancel(event){
    event.preventDefault();
    this.setState({ isEdit: false });
    
  }
  render() {
    const { id, description, short_description, code, status, qty, value} = this.props;
    const enumStatus = {
      enable : {
        value: "enable",      
      },
      disable : {
        value: "disable",  
      }    
    }
    return (
        <div className="product-items" key={description}>
            {
              this.state.isEdit
              ? (
              <div>  
                <form onSubmit={this.onEditSubmit}>                    
                  <div className="item">
                    <div className="card " >  
                      <div className="card-body container">                        
                        <div className="row float-left"> 
                          <h5 className="card-title col-9"><input name="short-description" className="card-title" placeholder="Short description" ref={shortInput => this.shortInput = shortInput} defaultValue={short_description}/></h5>                         
                          <div className="col-9">
                            <p className=""><input name="description" className="card-text edit-input-description " placeholder="Description" ref={descriptionInput => this.descriptionInput = descriptionInput} defaultValue={description} /></p>                                          
                            <select name="status" className="" placeholder="status" defaultValue={status} ref={statusInput => this.statusInput = statusInput} >
                                {Object.keys(enumStatus).map(key => (
                                  <option key={key} value={key}>
                                    {enumStatus[key].value}
                                  </option>
                                ))}            
                            </select>
                          </div>
                          <div className="col-2 float-text row">
                            <i><label htmlFor="id">id</label> <input name="id" className="" placeholder="id" ref={idInput => this.idInput = idInput} defaultValue={id}/></i>                                          
                            <i><label htmlFor="code">cód.</label><input name="code" className="" placeholder="Code" ref={codeInput => this.codeInput = codeInput} defaultValue={code}/>                    </i>                                          
                            <i><label htmlFor="quantidade">qtd.</label><input name="quantidade" className="" type="number" placeholder="Quantidade" ref={qtyInput => this.qtyInput = qtyInput} defaultValue={qty}/></i>
                            <i><label htmlFor="valor">R$</label><input name="valor" className="" placeholder="Valor" ref={valueInput => this.valueInput = valueInput} defaultValue={value}/></i>
                          </div> 
                          <div className="edit-options col-12">
                            <Icon onClick={this.onEditSubmit} className="list-icon-actions">check</Icon>
                            <Icon onClick={this.onCancel} className="list-icon-actions">cancel</Icon>    
                          </div>
                        </div>                    
                        
                      </div>
                    </div> 
                  </div>
                </form>                  
              </div>
              )
              : (
              <div className="item " >
                <div className="card " >  
                  <div className="card-body container">                                       
                    <div className="row float-left w-100"> 
                      <h5 className="card-title col-9 ">{short_description}</h5>                      
                      <div className="col-9">
                        <p className="card-text">{description}</p>                                          
                      </div>
                      <div className="col-3 float-text">
                        <i className="">id: {id}</i>                                          
                        <i className="">cód.: {qty}</i>                                          
                        <i className="">qtd.: {qty}</i>                                                              
                        <i className="">R$: {value}</i>                                          
                      </div>
                      <div className="col">
                        <Icon onClick={this.onEdit} className="list-icon-actions">edit</Icon>
                        <Icon onClick={this.onDelete} className="list-icon-actions">delete</Icon>
                      </div>                      
                    </div>                    
                  </div>
                </div> 
              </div>
              )
            }
            
        </div>
    );
  }
}
export default ProductItem;