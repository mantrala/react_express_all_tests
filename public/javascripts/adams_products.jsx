var CategoryForm = React.createClass({
  getInitialState: function(){
    return {
      inputTxt: ''
    }
  },

  addCategory: function(e) {
    e.preventDefault();
    var textValue = this.refs.categoryInput.value.trim();
    if (textValue.length == 0) return;

    this.props.onAdd(textValue);
    this.setState({
      inputTxt: ''
    });
  },

  txtChange: function(e) {
    this.setState({
      inputTxt: e.target.value
    });
  },

  render: function(){
    return (
      <div>
        <h4>New Category Form</h4>
        <form onSubmit={this.addCategory}>
          <div className="form-group">
            <label for="name">Name</label>
            <input type="text" className="form-control" id="categoryInput" ref="categoryInput" placeholder="Product Name" value={this.state.inputTxt} onChange={this.txtChange} />
          </div>
          <button className='btn btn-primary' id="categoryBtn">Create Category</button>
        </form>
      </div>
    )
  }
});

var ProductForm = React.createClass({
  getInitialState: function(){
    return {
      name: '',
      price: '',
      desc: ''
    }
  },

  getCategoryCheckbox: function() {
    return this.props.categories.map(function(category, index){
      return (
        <li className='category' key={index}>
          <label>
            <input type="checkbox" /> {category.name}
          </label>
        </li>
      )
    })
  },

  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },

  handlePriceChange: function(e) {
    this.setState({price: e.target.value});
  },

  handleDescChange: function(e) {
    this.setState({desc: e.target.value});
  },

  addProduct: function(e) {
    e.preventDefault();
    this.props.onAdd(this.state);

    this.setState({
      name: '',
      price: '',
      desc: ''
    });
  },

  render: function(){
    return (
      <div>
        <h4>New Product Form</h4>
        <form onSubmit={this.addProduct}>
          <div className="form-group">
            <label for="name">Name</label>
            <input type="text" className="form-control" placeholder="Product Name" onChange={this.handleNameChange} />
          </div>
          <div className="form-group">
            <label for="price">Price</label>
            <input type="text" className="form-control" placeholder="Price" onChange={this.handlePriceChange}/>
          </div>
          <div className="form-group">
            <label for="description">Description</label>
            <textarea className="form-control" onChange={this.handleDescChange}/>
          </div>
          <div className="checkbox">
            <ul className='list-inline'>
              {this.getCategoryCheckbox()}
            </ul>
          </div>
          <button type="submit" className="btn btn-primary">Create Product</button>
        </form>
      </div>
    )
  }
})

var ProductList = React.createClass({
  getProductList: function() {
    return this.props.productList.map(function(product, index){
      return (
        <li className='product' key={index}>
          <label>
            <a href={product.name}> {product.name} </a>
          </label>
        </li>
      )
    })
  },

  render: function(){
    return(
      <div>
        <h3>Product List</h3>
        <ul>
          {this.getProductList()}
        </ul>
      </div>
    )
  }
})

var App = React.createClass({
  getInitialState: function(){
    return {
      categories: [],
      productList: []
    }
  },

  componentDidMount: function() {
    $.get('./products', function (result) {
      this.setState({
        productList: result
      });
    }.bind(this));

    $.get('./categories', function (result) {
      this.setState({
        categories: result
      });
    }.bind(this));
  },

  addCategory: function(newCagtegory) {
    $.post('./categories', {name: newCagtegory})
      .then(function(data) {
        console.log(data);
        return data;
      })
      .then(function(data) {
        $.get('./categories', function (result) {
          this.setState({
            categories: result
          });
        }.bind(this));
      }.bind(this));

  },

  addProduct: function(newProduct){
    this.state.productList.push(newProduct)

    this.setState({
      productList: this.state.productList
    })
  },

  render: function() {
    return (
      <div>
        <div className='row container'>
          <div className='col-md-8'>
            <ProductForm onAdd={this.addProduct} categories={this.state.categories}/>
          </div>
          <div className='col-md-4'>
            <CategoryForm onAdd={this.addCategory} />
          </div>
          <div className='row'>
            <ProductList productList={this.state.productList} />
          </div>
        </div>
      </div>
    )
  }

})



ReactDOM.render(<App />, document.getElementById('entry-point'));
