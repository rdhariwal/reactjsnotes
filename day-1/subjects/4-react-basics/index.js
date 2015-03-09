var React = require('react');

var ContentToggle = React.createClass({
  getInitialState () {
    return {
      isOpen: false
    };
  },

  handleClick () {
    this.setState({
      isOpen: !this.state.isOpen
    }, () => {
      if (this.props.onToggle)
        this.props.onToggle(this.state.isOpen);
    });
  },

  render () {
    var summaryClass = "ContentToggle__Summary";
    if (this.state.isOpen)
      summaryClass += " ContentToggle__Summary--is-open";
    return (
      <div className="ContentToggle">
        <div onClick={this.handleClick} className={summaryClass}>
          {this.props.summary}
        </div>
        <div className="ContentToggle__Details">
          {this.state.isOpen && this.props.children}
        </div>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState () {
    return {
      tacos: [
        { name: 'Carnitas', droolCount: 0, src: 'tacos/carnitas.png' },
        { name: 'Pollo', droolCount: 0, src: 'tacos/pollo.png' },
        { name: 'Asada', droolCount: 0, src: 'tacos/asada.png' },
      ]
    };
  },

  handleTacoToggle (taco, isOpen) {
    if (isOpen) {
      taco.droolCount += 1;
      this.setState({ tacos: this.state.tacos });
    }
  },

  render () {
    return (
      <div>
        <h1>Tacos!</h1>
        <div>
          {this.state.tacos.map(taco => (
            <ContentToggle
              summary={taco.name + ' - drools: ' + taco.droolCount}
              onToggle={this.handleTacoToggle.bind(this, taco)}
            >
              <img height="200" src={taco.src}/>
            </ContentToggle>
          ))}
        </div>
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('app'));
