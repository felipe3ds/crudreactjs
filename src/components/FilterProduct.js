import React, {Component} from 'react';
import Icon from '@material-ui/core/Icon';
import "./FilterProduct.css";



class FilterProduct extends Component {
  constructor (props){
    super(props)

    this.onSubmit = this.onSubmit.bind(this);
    this.onFilterClear = this.onFilterClear.bind(this);
    this.state = {
        isFiltered: false
    }
  }

  onSubmit(event){
    
    if ( this.searchInput.value !== "" ){
      this.setState({ isFiltered: true });
      this.props.onFilter(this.searchInput.value, this.fieldInput.value, true);      
    }else{      
      this.setState({ isFiltered: false },
            () => {this.props.onFilter(this.searchInput.value, this.fieldInput.value, this.state.isFiltered);
            }
      );
    }
    
  }
  onFilterClear(event){       
    this.searchInput.value = ""; 
    this.onSubmit(event);   
  }
  
  render() {
    return (
      <div>
        <div className="search-field" onSubmit={this.onSubmit} ref={formSearch => this.formSearch = formSearch}>
            <label htmlFor="search-select">filtrar por: </label>
            <select className="search-select" ref={fieldInput => this.fieldInput = fieldInput} >
                <option value="description">Descrição</option>
                <option value="short_description">Descrição curta</option>
                <option value="code">Cód.</option>
                <option value="status">Situação</option>
                <option value="qty">Qtd.</option>
                <option value="value">Valor R$</option>            
            </select>
            <input className="search-input" id="search-input" onChange={this.onSubmit} placeholder="palavra-chave" ref={searchInput => this.searchInput = searchInput} />
            
            
            
            {/*<button className="submit" onClick={this.onSubmit}>Buscar</button>*/}
            { this.state.isFiltered ? <Icon onClick={this.onFilterClear} className="search-icon">close</Icon> : <Icon onClick={this.onFilterClear} className="search-icon">search</Icon> }
          </div>
      </div>
        
      
    );
  }
}
export default FilterProduct;
