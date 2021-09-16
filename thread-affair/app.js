class NewsletterForm extends React.Component {
  // v1
  state = {
    email: '',
    inputMessage: '',
  };

  valiateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onSubmit = (event) => {
    event.preventDefault();

    const email = this.state.email;

    if (!this.valiateEmail(email)) {
      this.setState({
        inputMessage: 'Please use a valid email',
      });
      return;
    }

    setTimeout(() => {
      alert(`hello, ${email} thank you for subscribing`);
    }, 300);
  };

  onInputChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="form-newsletter container">
        <label for="field-newsletter">
          Subscribe to our <span>newsletter</span>
        </label>

        <div>
          <input
            type="text"
            name="field-newsletter"
            id="field-newsletter"
            value={this.state.email}
            onChange={this.onInputChange}
            placeholder="enter your email address to receive the latest news!"
          ></input>

          {this.state.inputMessage.length > 0 ? (
            <div className="message">{this.state.inputMessage}</div>
          ) : null}
        </div>

        <button type="submit" title="Subscribe">
          Subscribe
        </button>
      </form>
    );
  }
}

const newsletterContainer = document.querySelector('.home-newsletter');
ReactDOM.render(<NewsletterForm></NewsletterForm>, newsletterContainer);
