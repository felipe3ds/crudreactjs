import React, {Component} from 'react';

class AddProduct extends Component {
  constructor (props){
    super(props)

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event){
    event.preventDefault();
    this.props.onAdd(this.descriptionInput.value, this.shortInput.value, this.codeInput.value,this.statusInput.value, this.qtyInput.value, this.valueInput.value);

    this.descriptionInput.value ="";
    this.shortInput.value ="";   
    this.codeInput.value ="";
    this.qtyInput.value ="";
    this.valueInput.value ="";
  }
  
  render() {
    return (
        <form onSubmit={this.onSubmit} >            
            <input placeholder="Descrição" maxLength="150" ref={descriptionInput => this.descriptionInput = descriptionInput} />
            <input placeholder="Descrição curta" maxLength="30" ref={shortInput => this.shortInput = shortInput} />
            <input placeholder="Código" maxLength="10" ref={codeInput => this.codeInput = codeInput} />
            <select placeholder="Situação" ref={statusInput => this.statusInput = statusInput} >
              <option value="enable">Habilitado</option>
              <option value="disable">Desabilidado</option>              
            </select>
            <input placeholder="Quantidade" min="0" type="number" ref={qtyInput => this.qtyInput = qtyInput} />            
            <input placeholder="Valor R$" type="value" ref={valueInput => this.valueInput = valueInput} />            


            <button className="btn btn-primary">Add</button>
            <hr/>
        </form>
    );
  }
}
export default AddProduct;

/*

            description STRING tam. max: 150
            short_description STRING tam. max: 30
            code STRING tam. max: 10
            status ENUM enable ou disable
            qty INTEGER

*/
