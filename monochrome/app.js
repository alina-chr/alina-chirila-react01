class NewsletterForm extends React.Component {
  state = {
    email: '',
    inputMessage: '',
    busy: false,
    submitted: false,
    submittedValue: '',
  };

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onSubmit = (event) => {
    event.preventDefault();

    const email = this.state.email;

    if (!this.validateEmail(email)) {
      this.setState({
        inputMessage: 'Please use a valid email',
      });

      return;
    }

    this.setState({
      busy: true,
    });

    setTimeout(() => {
      this.setState({
        busy: false,
        email: '',
        inputMessage: '',
        submittedValue: this.state.email,
        submitted: true,
      });
    }, 3000);
  };

  onInputChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  render() {
    return (
      <div>
        {this.state.submitted === true ? (
          <div className="submitted-message">
            Hello {this.state.submittedValue}, thank you for submiting!
          </div>
        ) : (
          <form
            onSubmit={this.onSubmit}
            method="post"
            className="form-newsletter"
          >
            <label htmlFor="email-newsletter">sign up for our newsletter</label>

            <div>
              <input
                type="text"
                name="email"
                id="email-newsletter"
                value={this.state.email}
                onChange={this.onInputChange}
                placeholder="your email address"
              ></input>

              {this.state.inputMessage.length > 0 ? (
                <div className="message">{this.state.inputMessage}</div>
              ) : null}
            </div>

            <button
              type="submit"
              title="Sign Up"
              disabled={this.state.busy}
              className={`${this.state.busy === true ? 'busy' : ''}`}
            >
              {this.state.busy ? (
                <i className="fas fa-spinner icon"></i>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        )}
      </div>
    );
  }
}

const newsletterContainer = document.querySelector(
  '.footer-sign-up-newsletter',
);
ReactDOM.render(<NewsletterForm></NewsletterForm>, newsletterContainer);
